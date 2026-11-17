import React, { useRef, useState, useEffect } from 'react'
import Header from './Header'
import Input from './Input'
import Chatsection, { defaultMessages } from './Chatsection'
import Open from './Open'
import LoginModal from './LoginModal'
import { StreamChat } from 'stream-chat'
import axios from 'axios'

const apiKey = import.meta.env.VITE_STREAM_API_KEY || "YOUR_STREAM_API_KEY";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || (window.location.hostname === 'localhost' ? 'http://localhost:3001' : 'https://mejor-backend.onrender.com');

const Chat = () => {

  const inputRef = useRef(null);
  const [messages, setMessages] = useState(defaultMessages);
  const [channel, setChannel] = useState(null);
  const [client, setClient] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let chatClient = null;

    const initChat = async () => {
      try {
        // Extract session token from URL if present (after redirect from backend)
        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get('session_token');
        if (urlToken) {
          localStorage.setItem('mejor_session_token', urlToken);
          window.history.replaceState({}, document.title, window.location.pathname);
        }

        const sessionToken = localStorage.getItem('mejor_session_token');

        if (sessionToken) {
          // ── LOGGED-IN MODE ──────────────────────────────────────────────
          await initLoggedInMode(sessionToken);
        } else {
          // ── GUEST MODE ──────────────────────────────────────────────────
          await initGuestMode();
        }

      } catch (error) {
        console.error("Failed to initialize chat:", error);
        // Reset state before falling back to guest mode — prevents stale logged-in state
        setClient(null);
        setIsGuest(false);
        setIsInitialized(false);
        try {
          await initGuestMode();
        } catch (guestErr) {
          console.error("Guest mode also failed:", guestErr);
          setIsInitialized(true); // show something even if both fail
        }
      }
    };

    const initLoggedInMode = async (sessionToken) => {
      const axiosConfig = {
        withCredentials: true,
        headers: { Authorization: `Bearer ${sessionToken}` }
      };

      // Fetch Stream token from backend
      const response = await axios.post(`${API_BASE_URL}/token`, {}, axiosConfig);
      const { token, userId } = response.data;

      chatClient = StreamChat.getInstance(apiKey);
      await chatClient.connectUser({ id: userId, name: userId }, token);
      setClient(chatClient);
      setIsGuest(false);

      // Use persistent session ID so chat history survives refresh for logged-in users
      let sessionId = sessionStorage.getItem('chat_session_id');
      if (!sessionId) {
        sessionId = Date.now().toString();
        sessionStorage.setItem('chat_session_id', sessionId);
      }

      const channelId = `react-chat-${userId}-${sessionId}`;
      const newChannel = chatClient.channel('messaging', channelId, {
        name: 'AI Companion Chat'
      });

      await newChannel.watch();
      setChannel(newChannel);

      // Load existing messages if any
      if (newChannel.state.messages.length > 0) {
        const history = newChannel.state.messages.map(msg => ({
          id: msg.id,
          role: msg.user.id.startsWith('ai-bot') ? 'assistant' : 'user',
          text: msg.text
        }));
        setMessages(history);
      }

      // Start AI agent in background
      axios.post(`${API_BASE_URL}/start-ai-agent`, { channel_id: channelId }, axiosConfig)
           .catch(err => console.error("Error starting AI agent:", err));

      listenToChannel(newChannel);
      setIsInitialized(true);
    };

    const initGuestMode = async () => {
      // Guest: unique ID per session — chat clears on refresh ✅
      const guestId = `guest-${Date.now()}`;

      // For guest mode we need a Stream token — use anonymous/guest token from backend
      const response = await axios.post(`${API_BASE_URL}/token/guest`, { guestId });
      const { token } = response.data;

      chatClient = StreamChat.getInstance(apiKey);
      await chatClient.connectUser({ id: guestId, name: 'Guest' }, token);
      setClient(chatClient);
      setIsGuest(true);

      const channelId = `guest-chat-${guestId}`;
      const newChannel = chatClient.channel('messaging', channelId, {
        name: 'Guest Chat'
      });

      await newChannel.watch();
      setChannel(newChannel);

      // Start AI agent in background
      axios.post(`${API_BASE_URL}/start-ai-agent`, { channel_id: channelId })
           .catch(err => console.error("Error starting AI agent:", err));

      listenToChannel(newChannel);
      setIsInitialized(true);
    };

    const listenToChannel = (ch) => {
      ch.on('message.new', event => {
        if (event.message.text && event.message.text.includes("exceeded your current quota")) return;
        setMessages(prev => {
          if (prev.find(m => m.id === event.message.id)) return prev;
          return [...prev, {
            id: event.message.id,
            role: event.message.user.id.startsWith('ai-bot') ? 'assistant' : 'user',
            text: event.message.text
          }];
        });
      });

      ch.on('message.updated', event => {
        setMessages(prev => prev.map(m =>
          m.id === event.message.id ? { ...m, text: event.message.text } : m
        ));
      });
    };

    initChat();

    return () => {
      if (chatClient) {
        chatClient.disconnectUser();
      }
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const text = inputRef.current?.value.trim();
    if (!text || !channel) return;

    const tempId = `${Date.now()}-user`;
    setMessages(prev => [...prev, { id: tempId, role: "user", text }]);
    inputRef.current.value = "";

    try {
      await channel.sendMessage({ id: tempId, text });
    } catch (err) {
      console.error("Error sending message", err);
    }
  }

  // Loading screen — shown while chat initializes
  if (!isInitialized) {
    return (
      <div
        style={{ backgroundColor: '#0d0f14', width: '100vw', height: '100dvh' }}
        className="flex items-center justify-center"
      >
        <div className="loader">
          {/* innermost box with logo */}
          <div className="box">
            <div className="logo">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 56 68" className="svg">
                <path d="M38.0481 4.82927C38.0481 2.16214 40.018 0 42.4481 0H51.2391C53.6692 0 55.6391 2.16214 55.6391 4.82927V40.1401C55.6391 48.8912 53.2343 55.6657 48.4248 60.4636C43.6153 65.2277 36.7304 67.6098 27.7701 67.6098C18.8099 67.6098 11.925 65.2953 7.11548 60.6663C2.37183 56.0036 3.8147e-06 49.2967 3.8147e-06 40.5456V4.82927C3.8147e-06 2.16213 1.96995 0 4.4 0H13.2405C15.6705 0 17.6405 2.16214 17.6405 4.82927V39.1265C17.6405 43.7892 18.4805 47.2018 20.1605 49.3642C21.8735 51.5267 24.4759 52.6079 27.9678 52.6079C31.4596 52.6079 34.0127 51.5436 35.6268 49.4149C37.241 47.2863 38.0481 43.8399 38.0481 39.0758V4.82927Z" />
              </svg>
            </div>
          </div>
          {/* ripple rings */}
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
        </div>
      </div>
    );
  }

  return (
    <div className='relative z-0 w-full h-[100dvh] flex flex-col overflow-hidden' style={{ backgroundColor: '#0d0f14' }}>
      <Header
        isGuest={isGuest}
        onLoginClick={() => setShowLoginModal(true)}
      />
      {messages.length > 0
        ? <Chatsection messages={messages} />
        : <Open inputRef={inputRef} username={client?.user?.id} isGuest={isGuest} onLoginClick={() => setShowLoginModal(true)} />
      }
      <Input inputRef={inputRef} handleSubmit={handleSubmit} />

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          apiBaseUrl={API_BASE_URL}
        />
      )}
    </div>
  )
}

export default Chat
