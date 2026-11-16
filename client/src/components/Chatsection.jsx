import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const defaultMessages = [];

const md = {
  h1: ({ children }) => (
    <h1 className="text-lg font-semibold text-[#e8e8e8] mt-5 mb-2 leading-snug">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-base font-semibold text-[#e8e8e8] mt-4 mb-2 leading-snug">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-sm font-medium text-[#999] mt-3 mb-1.5">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-[#c8c8c8] leading-7 mb-3 last:mb-0">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-medium text-[#e8e8e8]">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-[#888]">{children}</em>
  ),
  ul: ({ children }) => <ul className="my-3 space-y-1.5">{children}</ul>,
  ol: ({ children }) => (
    <ol className="my-3 ml-4 space-y-1.5 list-decimal">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="flex gap-3 text-[#c8c8c8] leading-6">
      <span className="mt-2.5 shrink-0 w-1 h-1 rounded-full bg-[#444]" />
      <span>{children}</span>
    </li>
  ),
  hr: () => <hr className="my-4 border-[#1e1e1e]" />,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-[#2a2a2a] pl-4 my-3 text-[#666]">
      {children}
    </blockquote>
  ),
  code: ({ inline, children }) =>
    inline ? (
      <code className="bg-[#1a1a1a] text-[#c8c8c8] px-1.5 py-0.5 rounded text-[0.8em] font-mono border border-[#222]">
        {children}
      </code>
    ) : (
      <pre className="bg-[#111] border border-[#1e1e1e] rounded-xl p-4 my-3 overflow-x-auto">
        <code className="text-[#c8c8c8] text-xs font-mono leading-6">{children}</code>
      </pre>
    ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-[#141414]">{children}</thead>,
  th: ({ children }) => (
    <th className="border border-[#1e1e1e] px-3 py-2 text-left text-[#555] font-medium text-xs">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-[#1e1e1e] px-3 py-2 text-[#c8c8c8]">{children}</td>
  ),
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="text-[#e0e0e0] underline underline-offset-2 decoration-[#333] hover:decoration-[#666] transition-colors">
      {children}
    </a>
  ),
};

const Chatsection = ({ messages = defaultMessages }) => {
  return (
    <section className="w-full flex-1 min-h-0 overflow-x-hidden overflow-y-auto px-4 md:px-6 py-6">
      <div className="flex min-h-full flex-col justify-end gap-6 max-w-2xl mx-auto w-full">
        {messages.map((message) => {
          const isUser = message.role === "user";
          return (
            <div
              key={message.id}
              className={`flex w-full gap-3 ${isUser ? "justify-end" : "justify-start items-start"}`}
            >
              {/* AI avatar */}
              {!isUser && (
                <div className="w-6 h-6 rounded-md bg-[#e8e8e8] flex items-center justify-center shrink-0 mt-0.5">
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="text-[#0a0a0a] text-[10px] font-semibold leading-none">U</span>
                </div>
              )}

              <div className={`max-w-[85%] md:max-w-[75%] ${!isUser ? "flex-1" : ""}`}>
                {/* AI label */}
                {!isUser && (
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="text-[11px] font-medium text-[#333] mb-1.5 block">
                    Ultrone
                  </span>
                )}

                {/* AI message — flat */}
                {!isUser && (
                  message.text ? (
                    <div className="text-sm">
                      <ReactMarkdown remarkPlugins={[remarkGfm]} components={md}>
                        {message.text}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <div className="flex gap-1 items-center py-1">
                      <span className="typing-dot w-1.5 h-1.5 rounded-full bg-[#333] inline-block" style={{ animationDelay: "0ms" }}/>
                      <span className="typing-dot w-1.5 h-1.5 rounded-full bg-[#333] inline-block" style={{ animationDelay: "200ms" }}/>
                      <span className="typing-dot w-1.5 h-1.5 rounded-full bg-[#333] inline-block" style={{ animationDelay: "400ms" }}/>
                    </div>
                  )
                )}

                {/* User message — white bubble */}
                {isUser && (
                  <div className="bg-[#e8e8e8] text-[#0c0c0c] rounded-2xl rounded-br-sm px-4 py-2.5 text-sm leading-relaxed">
                    {message.text}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Chatsection;
