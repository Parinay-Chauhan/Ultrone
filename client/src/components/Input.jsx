import React, { useRef, useState, useEffect } from "react";

const Input = ({ inputRef, handleSubmit }) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const adjustHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      const nextHeight = Math.min(inputRef.current.scrollHeight, 180);
      inputRef.current.style.height = `${nextHeight}px`;
    }
  };

  const onFormSubmit = (e) => {
    handleSubmit(e);
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onFormSubmit(e);
    }
  };

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
      if (inputRef.current) {
        inputRef.current.value += " " + t;
        adjustHeight();
      }
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 flex justify-center px-6 pb-5 pt-3"
      style={{ background: "linear-gradient(to top, #0d0f14 55%, transparent)" }}
    >
      <div className="w-full max-w-[800px]">
        {/* Input row */}
        <div
          className="flex items-end gap-2 bg-[#141720] border border-[#2e3448] rounded-[12px] px-[15px] py-[9px] pr-[10px] transition-[border-color,box-shadow] duration-[180ms]"
          style={{ "--tw-shadow": "none" }}
          onFocusCapture={(e) => e.currentTarget.style.cssText = "border-color: rgba(34,211,238,0.28); box-shadow: 0 0 0 3px rgba(34,211,238,0.07);"}
          onBlurCapture={(e) => e.currentTarget.style.cssText = "border-color: #2e3448; box-shadow: none;"}
        >
          <textarea
            ref={inputRef}
            rows={1}
            onInput={adjustHeight}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything…"
            className="flex-1 bg-transparent border-none outline-none text-[14px] leading-[1.5] text-[#dde2f0] placeholder-[#5a6180] caret-[#22d3ee] resize-none overflow-y-auto max-h-[180px] min-h-[24px] py-[3px]"
          />

          {/* Mic */}
          <button
            type="button"
            onClick={isListening ? stopListening : startListening}
            title={isListening ? "Stop" : "Voice input"}
            className={`w-[30px] h-[30px] shrink-0 flex items-center justify-center rounded-md border-none cursor-pointer transition-colors duration-150 mb-[1px] ${
              isListening
                ? "text-[#f87171] bg-[#f87171]/10"
                : "text-[#5a6180] bg-transparent hover:text-[#dde2f0] hover:bg-[#1c2030]"
            }`}
          >
            {isListening ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="6" width="12" height="12" rx="2"/>
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/>
              </svg>
            )}
          </button>

          {/* Send */}
          <button
            type="button"
            onClick={onFormSubmit}
            title="Send"
            className="w-[30px] h-[30px] shrink-0 flex items-center justify-center bg-[#22d3ee] border-none rounded-md text-[#0d0f14] cursor-pointer hover:opacity-85 active:scale-95 transition-[opacity,transform] duration-100 mb-[1px]"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
            </svg>
          </button>
        </div>

        <p className="text-center text-[11px] text-[#3a4260] mt-[7px] opacity-55">
          Ultrone can make mistakes — verify important information.
        </p>
      </div>
    </div>
  );
};

export default Input;
