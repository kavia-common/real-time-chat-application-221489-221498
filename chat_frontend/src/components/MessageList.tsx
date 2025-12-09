"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { Message } from "@/types";
import { formatFull, formatTime } from "@/lib/time";

type Props = {
  messages: Message[];
};

/**
PUBLIC_INTERFACE
MessageList

Scrollable message list that auto-scrolls to bottom on new messages.
*/
export default function MessageList({ messages }: Props) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll behavior
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const rendered = useMemo(
    () =>
      messages.map((m) => (
        <li key={m.id} className={`flex ${m.self ? "justify-end" : "justify-start"}`}>
          <div
            className={[
              "max-w-[80%] rounded-2xl px-4 py-2 shadow-sm transition-colors",
              m.self
                ? "bg-[#2563EB] text-white rounded-br-sm"
                : "bg-white text-[#111827] ring-1 ring-black/5 rounded-bl-sm",
            ].join(" ")}
            title={formatFull(m.ts)}
          >
            <div
              className={`text-xs mb-1 ${
                m.self ? "text-blue-100/90" : "text-gray-500"
              }`}
            >
              {m.self ? "You" : m.user}
              <span className="mx-1">•</span>
              {formatTime(m.ts)}
            </div>
            <div className="text-sm whitespace-pre-wrap break-words">{m.text}</div>
          </div>
        </li>
      )),
    [messages]
  );

  return (
    <section
      className="flex-1 overflow-y-auto bg-[#f9fafb]"
      ref={containerRef}
      aria-label="Message list"
    >
      <ol className="mx-auto max-w-3xl px-4 py-6 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 text-sm">
            No messages yet. Say hello to start the conversation!
          </div>
        ) : (
          rendered
        )}
        <div ref={bottomRef} />
      </ol>
    </section>
  );
}
