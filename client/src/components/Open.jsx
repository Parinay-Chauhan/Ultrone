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
        <div className="w-10 h-10 rounded-xl bg-[#f0f0f0] flex items-center justify-center mb-7">
          <span style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="text-[#0a0a0a] text-base font-semibold leading-none select-none">U</span>
        </div>

        {/* Headline */}
        <h1
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          className="text-2xl md:text-3xl font-semibold text-[#e8e8e8] text-center tracking-tight leading-snug max-w-sm"
        >
          {displayName ? `Hi, ${displayName}` : "What can I help you write?"}
        </h1>

        <p className="text-[#555] text-sm mt-2.5 text-center max-w-xs leading-relaxed">
          Describe what you need — email, post, report, proposal.
        </p>

        {/* Guest nudge */}
        {isGuest && (
          <button
            onClick={onLoginClick}
            className="mt-3 text-xs text-[#444] hover:text-[#777] transition-colors duration-100"
          >
            Sign in to save history →
          </button>
        )}

        {/* Suggestion cards */}
        <div className="mt-8 w-full max-w-lg flex flex-col gap-2">
          {prompts.map((text, i) => (
            <button
              key={i}
              onClick={() => handleClick(text)}
              className="w-full text-left px-4 py-3 rounded-xl bg-[#141414] border border-[#222] text-[#888] text-sm leading-snug hover:bg-[#1c1c1c] hover:border-[#333] hover:text-[#ccc] transition-all duration-150 group"
            >
              <span className="line-clamp-1">{text}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Open;
