import React, { useState, useEffect, useRef } from "react";

const demos = [
  "Subject: Project Alpha — Status Update\n\nHi [Name],\n\nQuick update on Project Alpha. Backend integration is complete and we're on track for the Friday deadline. One blocker: awaiting sign-off on the API contracts from the client side.",
  "Just shipped something I'm proud of.\n\nOur team reduced page load time by 40% — not through magic, but through three weeks of profiling, cutting unused dependencies, and rethinking how we fetch data.",
  "Executive Summary — Q3 2024\n\nRevenue grew 18% year-over-year. Enterprise accounts drove the majority of new ARR. Churn held below 6%, and NPS improved by 11 points across all customer segments.",
];

const TypingWindow = () => {
  const [displayText, setDisplayText] = useState("");
  const stateRef = useRef({ di: 0, ci: 0, deleting: false });

  useEffect(() => {
    let timer;
    function tick() {
      const s = stateRef.current;
      const str = demos[s.di];
      if (!s.deleting) {
        s.ci++;
        setDisplayText(str.slice(0, s.ci));
        if (s.ci === str.length) {
          s.deleting = true;
          timer = setTimeout(tick, 2600);
        } else {
          timer = setTimeout(tick, s.ci < 18 ? 60 : 22);
        }
      } else {
        s.ci = Math.max(0, s.ci - 4);
        setDisplayText(str.slice(0, s.ci));
        if (s.ci === 0) {
          s.deleting = false;
          s.di = (s.di + 1) % demos.length;
          timer = setTimeout(tick, 500);
        } else {
          timer = setTimeout(tick, 10);
        }
      }
    }
    timer = setTimeout(tick, 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-[800px] bg-[#141720] border border-[#242838] rounded-[10px] mb-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-[11px] border-b border-[#242838] bg-[#1c2030]">
        <div className="w-[7px] h-[7px] rounded-full bg-[#22d3ee] glow-pulse shrink-0" />
        <span className="text-[12px] text-[#5a6180]">Ultrone is writing</span>
      </div>
      {/* Body */}
      <div className="px-[18px] py-4 h-[160px] text-[14px] leading-[1.65] text-[#dde2f0] overflow-hidden">
        {displayText.split("\n").map((line, i, arr) => (
          <span key={i}>
            {line}
            {i < arr.length - 1 && <br />}
          </span>
        ))}
        <span className="inline-block w-[2px] h-[1em] bg-[#22d3ee] ml-[1px] align-text-bottom cursor-blink" />
      </div>
    </div>
  );
};

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
      <div className="flex flex-col items-center px-6 pt-14 pb-36 fade-up">

        {/* Hero */}
        <div className="text-center max-w-[640px] mb-9">
          <h1 className="text-[clamp(26px,4vw,38px)] font-semibold tracking-[-0.03em] leading-[1.18] text-[#eef1fa] mb-[10px]">
            {displayName ? `What can I help you write, ${displayName}?` : "What can I help you write?"}
          </h1>
          <p className="text-[14px] text-[#5a6180] leading-[1.6]">
            Describe what you need — email, post, report, or proposal.
          </p>
          {isGuest && (
            <p className="text-[12px] text-[#3a4260] mt-[6px]">
              <button
                onClick={onLoginClick}
                className="text-[#22d3ee] opacity-80 hover:opacity-100 transition-opacity duration-150 bg-transparent border-none cursor-pointer font-inherit text-[12px]"
              >
                Sign in
              </button>
              {" "}to save history
            </p>
          )}
        </div>

        {/* Typing window */}
        <TypingWindow />

        {/* Suggestion cards — 2×2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-[800px]">
          {prompts.map((text, i) => (
            <button
              key={i}
              onClick={() => handleClick(text)}
              className="
                relative text-left px-[15px] py-[13px] rounded-lg
                bg-[#141720] border border-[#242838]
                text-[13px] text-[#8a94b8] leading-[1.5]
                cursor-pointer font-['Inter',sans-serif]
                hover:text-[#dde2f0] hover:border-[rgba(34,211,238,0.28)] hover:bg-[#1c2030]
                transition-colors duration-[180ms]
                before:content-[''] before:absolute before:left-0 before:top-[20%] before:bottom-[20%]
                before:w-[2px] before:bg-[#22d3ee] before:rounded-r-sm
                before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-[180ms]
                overflow-hidden
              "
            >
              {text}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Open;
