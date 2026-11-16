import React from "react";

// SVG icons — Lucide style, 1.5 stroke, 16×16
const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

const EditIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const ChartIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const TargetIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const prompts = [
  { Icon: MailIcon,  text: "Write a professional email to my manager about a project update" },
  { Icon: EditIcon,  text: "Draft a compelling LinkedIn post about a recent achievement" },
  { Icon: ChartIcon, text: "Create an executive summary for a quarterly business report" },
  { Icon: TargetIcon,text: "Write a persuasive proposal for a new marketing campaign" },
];

const Open = ({ inputRef, username, isGuest = false, onLoginClick }) => {

  function handleClick(e) {
    const text = e.currentTarget.querySelector("span.prompt-text")?.textContent;
    if (text && inputRef.current) {
      inputRef.current.value = text;
      inputRef.current.focus();
    }
  }

  const displayName = (!isGuest && username)
    ? username.charAt(0).toUpperCase() + username.slice(1)
    : null;

  return (
    <div className="w-full flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
      <div className="flex flex-col items-center justify-center min-h-full px-4 md:px-6 py-10 fade-up">

        {/* Logo mark */}
        <div className="w-10 h-10 rounded-xl bg-[#7c3aed] flex items-center justify-center mb-6">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>

        {/* Headline */}
        <h1 className="text-2xl md:text-[1.75rem] font-semibold text-[#fafafa] tracking-tight text-center leading-snug">
          {displayName ? `What would you like to write, ${displayName}?` : "What would you like to write?"}
        </h1>
        <p className="text-[#71717a] text-sm mt-2 text-center max-w-xs leading-relaxed">
          From first draft to final edit — just ask.
        </p>

        {/* Guest sign-in nudge */}
        {isGuest && (
          <button
            onClick={onLoginClick}
            className="mt-5 flex items-center gap-1.5 text-[#52525b] text-xs hover:text-[#a1a1aa] transition-colors duration-150"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10,17 15,12 10,7" /><line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            Sign in to save your conversation
          </button>
        )}

        {/* Suggestions */}
        <p className="text-[#3f3f46] text-xs font-medium mt-10 mb-3 self-start max-w-2xl w-full">
          Suggestions
        </p>

        {/* Prompt cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-2xl">
          {prompts.map((p, i) => (
            <button
              key={i}
              onClick={handleClick}
              className="group text-left flex items-start gap-3 px-4 py-3.5 rounded-xl bg-[#111113] border border-[#1f1f23] hover:border-[#27272a] hover:bg-[#141416] transition-colors duration-150 cursor-pointer"
            >
              <span className="shrink-0 mt-0.5 text-[#52525b] group-hover:text-[#71717a] transition-colors duration-150">
                <p.Icon />
              </span>
              <span className="prompt-text text-[#71717a] text-xs leading-relaxed group-hover:text-[#a1a1aa] transition-colors duration-150">
                {p.text}
              </span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Open;
