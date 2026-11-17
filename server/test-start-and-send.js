import axios from 'axios';
import { StreamChat } from 'stream-chat';
import 'dotenv/config';

async function test() {
  try {
    const client = StreamChat.getInstance(process.env.STREAM_API_KEY, process.env.STREAM_API_SECRET);
    const channels = await client.queryChannels({ type: 'messaging' }, { last_message_at: -1 }, { limit: 1 });
    if (channels.length === 0) { console.log("No channels"); return; }
    const channel = channels[0];
    console.log("Channel:", channel.id);
    
    console.log("Calling start-ai-agent...");
    const startRes = await axios.post('http://localhost:3001/start-ai-agent', { channel_id: channel.id });
    console.log("Agent started:", startRes.data);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const members = await channel.queryMembers({});
    const userId = members.members.find(m => !m.user_id.startsWith('ai-bot'))?.user_id || 'test_user';
    console.log("Sending message as:", userId);
    
    const res = await channel.sendMessage({ text: 'Hello, what is 2 + 2?', user_id: userId });
    console.log("Sent message id:", res.message.id);

    console.log("Waiting 5s for AI reply...");
    await new Promise(resolve => setTimeout(resolve, 5000));

    const updatedChannel = await client.queryChannels({ id: channel.id });
    const lastMessages = updatedChannel[0].state.messages.slice(-3);
    console.log("Last 3 messages in channel:");
    lastMessages.forEach(m => console.log(`[${m.user.id}]: ${m.text}`));
  } catch (err) {
    if (err.response) console.error("Error from backend:", err.response.data);
    else console.error(err);
  }
}
test();
