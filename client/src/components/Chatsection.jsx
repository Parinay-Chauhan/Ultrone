import React from "react";
import bot from "../assets/white-robo.svg";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const defaultMessages = [];

// Custom markdown components — focused, quiet, content-first
const markdownComponents = {
  h1: ({ children }) => (
    <h1 className="text-lg font-semibold text-[#fafafa] mt-5 mb-2 leading-snug">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-base font-semibold text-[#fafafa] mt-4 mb-2 leading-snug">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-sm font-medium text-[#a1a1aa] mt-3 mb-1.5">{children}</h3>
  ),

  p: ({ children }) => (
    <p className="text-[#d4d4d8] leading-7 mb-3 last:mb-0">{children}</p>
  ),

  strong: ({ children }) => (
    <strong className="font-medium text-[#fafafa]">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-[#a1a1aa]">{children}</em>
  ),

  ul: ({ children }) => (
    <ul className="my-3 ml-1 space-y-1.5">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-3 ml-2 space-y-1.5 list-decimal list-inside">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="flex gap-2.5 text-[#d4d4d8] leading-6">
      <span className="mt-2.5 shrink-0 w-1 h-1 rounded-full bg-[#52525b]" />
      <span>{children}</span>
    </li>
  ),

  hr: () => <hr className="my-4 border-[#1f1f23]" />,

  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-[#27272a] pl-4 my-3 text-[#71717a]">
      {children}
    </blockquote>
  ),

  code: ({ inline, children }) =>
    inline ? (
      <code className="bg-[#141416] text-[#e4e4e7] px-1.5 py-0.5 rounded text-[0.8em] font-mono border border-[#27272a]">
        {children}
      </code>
    ) : (
      <pre className="bg-[#0c0c0e] border border-[#1f1f23] rounded-xl p-4 my-3 overflow-x-auto">
        <code className="text-[#d4d4d8] text-xs font-mono leading-6">{children}</code>
      </pre>
    ),

  table: ({ children }) => (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-[#111113]">{children}</thead>,
  th: ({ children }) => (
    <th className="border border-[#1f1f23] px-3 py-2 text-left text-[#71717a] font-medium text-xs">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-[#1f1f23] px-3 py-2 text-[#d4d4d8]">{children}</td>
  ),

  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#7c3aed] underline underline-offset-2 hover:text-[#8b5cf6] transition-colors"
    >
      {children}
    </a>
  ),
};

const Chatsection = ({ messages = defaultMessages }) => {
  return (
    <section className="w-full flex-1 min-h-0 px-4 md:px-8 py-6 overflow-x-hidden overflow-y-auto">
      <div className="flex min-h-full flex-col justify-end gap-6 max-w-3xl mx-auto w-full">
        {messages.map((message) => {
          const isUser = message.role === "user";

          return (
            <div
              key={message.id}
              className={`flex w-full items-start gap-3 ${
                isUser ? "justify-end" : "justify-start"
              }`}
            >
              {/* AI avatar */}
              {!isUser && (
                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#7c3aed] mt-0.5">
                  <img className="size-4" src={bot} alt="Ultron AI" />
                </div>
              )}

              <div
                className={`max-w-[88%] md:max-w-[72%] ${
                  isUser
                    ? "rounded-2xl rounded-br-sm bg-[#7c3aed] text-white text-sm leading-6 px-4 py-2.5"
                    : "text-sm pl-3 border-l border-[#27272a]"
                }`}
              >
                {/* AI name */}
                {!isUser && (
                  <p className="text-[11px] font-medium text-[#52525b] mb-2">Ultron</p>
                )}

                {/* Message content */}
                {isUser ? (
                  <p className="text-sm leading-6">{message.text}</p>
                ) : message.text ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                    {message.text}
                  </ReactMarkdown>
                ) : (
                  // Loading dots
                  <div className="flex gap-1 items-center py-2">
                    <div className="w-1.5 h-1.5 bg-[#3f3f46] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-1.5 h-1.5 bg-[#3f3f46] rounded-full animate-bounce" style={{ animationDelay: "120ms" }} />
                    <div className="w-1.5 h-1.5 bg-[#3f3f46] rounded-full animate-bounce" style={{ animationDelay: "240ms" }} />
                  </div>
                )}
              </div>

              {/* User avatar */}
              {isUser && (
                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-[#27272a] bg-[#18181b] text-xs font-medium text-[#a1a1aa] mt-0.5">
                  U
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Chatsection;
