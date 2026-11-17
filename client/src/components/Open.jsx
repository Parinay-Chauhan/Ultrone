import React from "react";

const prompts = [
  "Write a professional email to my manager about a project update",
  "Draft a compelling LinkedIn post about a recent achievement",
  "Create an executive summary for a quarterly business report",
  "Write a persuasive proposal for a new marketing campaign",
];

const Open = ({ inputRef, username, isGuest = false, onLoginClick }) => {

  function handleClick(text) {
    if (inputRef.current) {
      inputRef.current.value = text;
      inputRef.current.focus();
    }
  }

  const displayName = (!isGuest && username)
    ? username.charAt(0).toUpperCase() + username.slice(1)
    : null;

  return (
    <div className="w-full flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
      <div className="flex flex-col items-center justify-center min-h-full px-5 py-12 fade-up">

        {/* Logo mark */}
        <div className="w-8 h-8 rounded-lg bg-[#f0f0f0] flex items-center justify-center mb-5">
          <span style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="text-[#0a0a0a] text-sm font-semibold leading-none select-none">U</span>
        </div>

        {/* Headline */}
        <h1
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          className="text-2xl md:text-[1.75rem] font-semibold text-[#e8e8e8] text-center tracking-tight leading-snug"
        >
          {displayName ? `Hi, ${displayName}` : "What can I help you write?"}
        </h1>

        <p className="text-[#555] text-sm mt-2 text-center leading-relaxed">
          Describe what you need — email, post, report, or proposal.
        </p>

        {/* Guest nudge */}
        {isGuest && (
          <button
            onClick={onLoginClick}
            className="mt-2 text-xs text-[#3a3a3a] hover:text-[#666] transition-colors duration-100"
          >
            Sign in to save history →
          </button>
        )}

        {/* Suggestion cards — 2×2 grid */}
        <div className="mt-7 w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-2">
          {prompts.map((text, i) => (
            <button
              key={i}
              onClick={() => handleClick(text)}
              className="w-full text-left px-4 py-3.5 rounded-xl bg-[#141414] border border-[#222] text-[#777] text-sm leading-snug hover:bg-[#1a1a1a] hover:border-[#2e2e2e] hover:text-[#bbb] transition-all duration-150 min-h-[64px] flex items-start"
            >
              <span>{text}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Open;
