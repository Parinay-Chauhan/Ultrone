import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const defaultMessages = [];

const md = {
  h1: ({ children }) => <h1 className="text-lg font-semibold text-[#eef1fa] mt-5 mb-2 leading-snug tracking-tight">{children}</h1>,
  h2: ({ children }) => <h2 className="text-base font-semibold text-[#eef1fa] mt-4 mb-2 leading-snug tracking-tight">{children}</h2>,
  h3: ({ children }) => <h3 className="text-sm font-medium text-[#8a94b8] mt-3 mb-1.5">{children}</h3>,
  p:  ({ children }) => <p  className="text-[#dde2f0] leading-7 mb-3 last:mb-0 text-[14px]">{children}</p>,
  strong: ({ children }) => <strong className="font-medium text-[#eef1fa]">{children}</strong>,
  em:     ({ children }) => <em className="italic text-[#5a6180]">{children}</em>,
  ul: ({ children }) => <ul className="my-3 space-y-1.5">{children}</ul>,
  ol: ({ children }) => <ol className="my-3 ml-4 space-y-1.5 list-decimal">{children}</ol>,
  li: ({ children }) => (
    <li className="flex gap-3 text-[#dde2f0] text-[14px] leading-6">
      <span className="mt-2.5 shrink-0 w-1 h-1 rounded-full bg-[#3a4260]" />
      <span>{children}</span>
    </li>
  ),
  hr: () => <hr className="my-4 border-[#242838]" />,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-[#2e3448] pl-4 my-3 text-[#5a6180]">{children}</blockquote>
  ),
  code: ({ inline, children }) =>
    inline ? (
      <code className="bg-[#1c2030] text-[#22d3ee] px-1.5 py-0.5 rounded text-[0.8em] font-mono border border-[#242838]">
        {children}
      </code>
    ) : (
      <pre className="bg-[#141720] border border-[#242838] rounded-xl p-4 my-3 overflow-x-auto">
        <code className="text-[#dde2f0] text-xs font-mono leading-6">{children}</code>
      </pre>
    ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-[#141720]">{children}</thead>,
  th: ({ children }) => (
    <th className="border border-[#242838] px-3 py-2 text-left text-[#5a6180] font-medium text-xs">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border border-[#242838] px-3 py-2 text-[#dde2f0]">{children}</td>
  ),
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="text-[#22d3ee] underline underline-offset-2 opacity-80 hover:opacity-100 transition-opacity">
      {children}
    </a>
  ),
};

const Chatsection = ({ messages = defaultMessages }) => {
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
                  message.text ? (
                    <div className="text-[14px]">
                      <ReactMarkdown remarkPlugins={[remarkGfm]} components={md}>
                        {message.text}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <div className="flex gap-1 items-center py-1">
                      <span className="typing-dot w-1.5 h-1.5 rounded-full bg-[#2e3448] inline-block" style={{ animationDelay: "0ms" }}/>
                      <span className="typing-dot w-1.5 h-1.5 rounded-full bg-[#2e3448] inline-block" style={{ animationDelay: "200ms" }}/>
                      <span className="typing-dot w-1.5 h-1.5 rounded-full bg-[#2e3448] inline-block" style={{ animationDelay: "400ms" }}/>
                    </div>
                  )
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
