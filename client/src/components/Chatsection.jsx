import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const defaultMessages = [];

const CodeBlock = ({ children }) => {
  const [copied, setCopied] = useState(false);

  const extractText = (node) => {
    if (!node) return "";
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(extractText).join("");
    if (node.props?.children) return extractText(node.props.children);
    return "";
  };

  const handleCopyCode = () => {
    const text = extractText(children);
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-3 rounded-xl overflow-hidden border border-[#2e3448] bg-[#141720]">
      <div className="flex items-center justify-between px-3.5 py-1.5 border-b border-[#242838] bg-[#1c2030]/80">
        <span className="text-[11px] text-[#5a6180] font-mono">code</span>
        <button
          type="button"
          onClick={handleCopyCode}
          className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] text-[#5a6180] hover:text-[#22d3ee] bg-transparent border-none cursor-pointer transition-colors"
          title="Copy code"
        >
          {copied ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-[#22d3ee]">Copied</span>
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto m-0 bg-transparent text-[#dde2f0] text-xs font-mono leading-6">
        {children}
      </pre>
    </div>
  );
};

const md = {
  h1: ({ children }) => <h1 className="text-lg font-semibold text-[#eef1fa] first:mt-0 mt-4 mb-2 leading-snug tracking-tight">{children}</h1>,
  h2: ({ children }) => <h2 className="text-base font-semibold text-[#eef1fa] first:mt-0 mt-3.5 mb-2 leading-snug tracking-tight">{children}</h2>,
  h3: ({ children }) => <h3 className="text-sm font-medium text-[#8a94b8] first:mt-0 mt-3 mb-1.5">{children}</h3>,
  p:  ({ children }) => <p  className="text-[#dde2f0] leading-7 mb-3 last:mb-0 text-[14px]">{children}</p>,
  strong: ({ children }) => <strong className="font-medium text-[#eef1fa]">{children}</strong>,
  em:     ({ children }) => <em className="italic text-[#5a6180]">{children}</em>,
  ul: ({ children }) => <ul className="my-2.5 space-y-1.5">{children}</ul>,
  ol: ({ children }) => <ol className="my-2.5 ml-4 space-y-1.5 list-decimal">{children}</ol>,
  li: ({ children }) => (
    <li className="flex gap-3 text-[#dde2f0] text-[14px] leading-6">
      <span className="mt-2.5 shrink-0 w-1 h-1 rounded-full bg-[#3a4260]" />
      <span>{children}</span>
    </li>
  ),
  hr: () => <hr className="my-3.5 border-[#2e3448]" />,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-[#22d3ee]/40 pl-3.5 my-2.5 text-[#8a94b8] italic">{children}</blockquote>
  ),
  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
  code: ({ inline, children }) =>
    inline ? (
      <code className="bg-[#141720] text-[#22d3ee] px-1.5 py-0.5 rounded text-[0.8em] font-mono border border-[#2e3448]">
        {children}
      </code>
    ) : (
      <code className="text-[#dde2f0] text-xs font-mono leading-6">{children}</code>
    ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-3">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-[#141720]">{children}</thead>,
  th: ({ children }) => (
    <th className="border border-[#2e3448] px-3 py-2 text-left text-[#5a6180] font-medium text-xs">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border border-[#2e3448] px-3 py-2 text-[#dde2f0]">{children}</td>
  ),
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="text-[#22d3ee] underline underline-offset-2 opacity-80 hover:opacity-100 transition-opacity">
      {children}
    </a>
  ),
};

const Chatsection = ({ messages = defaultMessages }) => {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id, text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <section className="w-full flex-1 min-h-0 overflow-x-hidden overflow-y-auto px-5 py-6 pb-36">
      <div className="flex min-h-full flex-col justify-end gap-5 max-w-[800px] mx-auto w-full">
        {messages.map((message) => {
          const isUser = message.role === "user";
          return (
            <div key={message.id} className={`flex w-full gap-3 ${isUser ? "justify-end" : "justify-start items-start"}`}>

              {/* AI avatar */}
              {!isUser && (
                <div className="w-[28px] h-[28px] bg-[#1c2030] border border-[#2e3448] rounded-[7px] flex items-center justify-center shrink-0 mt-0.5 text-[12px] font-bold text-[#22d3ee] select-none">
                  U
                </div>
              )}

              <div className={`max-w-[85%] md:max-w-[75%] ${!isUser ? "flex-1" : ""}`}>
                {/* AI label */}
                {!isUser && (
                  <span className="text-[12px] text-[#5a6180] mb-1.5 block">Ultrone</span>
                )}

                {/* AI message */}
                {!isUser && (
                  <div className="relative group bg-[#1c2030] border border-[#2e3448] text-[#dde2f0] rounded-2xl rounded-tl-sm px-5 py-3.5 text-[14px] leading-relaxed shadow-sm">
                    {/* Copy button in top-right corner */}
                    {message.text && (
                      <button
                        type="button"
                        onClick={() => handleCopy(message.id, message.text)}
                        title={copiedId === message.id ? "Copied!" : "Copy response"}
                        className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-md bg-[#141720]/80 hover:bg-[#141720] border border-[#242838] hover:border-[rgba(34,211,238,0.3)] text-[#5a6180] hover:text-[#22d3ee] transition-all duration-150 cursor-pointer"
                      >
                        {copiedId === message.id ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                        )}
                      </button>
                    )}

                    {message.text ? (
                      <div className="pr-7">
                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={md}>
                          {message.text}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <div className="flex gap-1.5 items-center py-1">
                        <span className="typing-dot w-2 h-2 rounded-full bg-[#22d3ee] inline-block" style={{ animationDelay: "0ms" }}/>
                        <span className="typing-dot w-2 h-2 rounded-full bg-[#22d3ee] inline-block" style={{ animationDelay: "200ms" }}/>
                        <span className="typing-dot w-2 h-2 rounded-full bg-[#22d3ee] inline-block" style={{ animationDelay: "400ms" }}/>
                      </div>
                    )}
                  </div>
                )}

                {/* User message */}
                {isUser && (
                  <div className="bg-[#1c2030] border border-[#2e3448] text-[#dde2f0] rounded-2xl rounded-br-sm px-4 py-2.5 text-[14px] leading-relaxed">
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
