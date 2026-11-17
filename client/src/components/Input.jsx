import React, { useRef, useState } from "react";

const Input = ({ inputRef, handleSubmit }) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;
    recognitionRef.current = recognition;
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (e) => {
      const t = e.results[e.results.length - 1][0].transcript;
      if (inputRef.current) inputRef.current.value += " " + t;
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) handleSubmit(e);
  };

  return (
    <div className="w-full shrink-0 px-4 md:px-6 pb-5 pt-3 bg-[#0c0c0c] border-t border-[#1e1e1e]">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="flex items-center bg-[#141414] border border-[#2a2a2a] rounded-2xl hover:border-[#333] focus-within:border-[#444] transition-colors duration-150">

          <input
            ref={inputRef}
            type="text"
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            className="flex-1 bg-transparent text-[#e0e0e0] text-sm placeholder-[#444] py-3.5 pl-4 pr-2 outline-none"
          />

          <div className="flex items-center gap-1 pr-2">
            {/* Mic button */}
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              title={isListening ? "Stop" : "Voice input"}
              className={`p-2 rounded-lg transition-colors duration-100 ${
                isListening ? "text-[#f87171]" : "text-[#444] hover:text-[#777]"
              }`}
            >
              {isListening ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="6" width="12" height="12" rx="2"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" y1="19" x2="12" y2="22"/>
                  <line x1="8" y1="22" x2="16" y2="22"/>
                </svg>
              )}
            </button>

            {/* Send button */}
            <button
              type="submit"
              title="Send"
              className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#e8e8e8] text-[#0a0a0a] hover:bg-white active:scale-95 transition-all duration-100"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22,2 15,22 11,13 2,9"/>
              </svg>
            </button>
          </div>
        </div>

        <p className="text-center text-[11px] text-[#2e2e2e] mt-2.5">
          Ultrone can make mistakes — verify important information.
        </p>
      </form>
    </div>
  );
};

export default Input;
