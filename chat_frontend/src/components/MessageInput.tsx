"use client";

import React, { useState } from "react";

type Props = {
  onSend: (text: string) => Promise<void> | void;
};

const baseInput =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#111827] placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition";
const baseButton =
  "inline-flex items-center gap-2 rounded-xl bg-[#2563EB] text-white px-4 py-3 text-sm font-medium shadow-sm hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 disabled:opacity-50 disabled:cursor-not-allowed transition";

export default function MessageInput({ onSend }: Props) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const submit = async () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    try {
      setSending(true);
      await onSend(trimmed);
      setText("");
    } finally {
      setSending(false);
    }
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void submit();
    }
  };

  return (
    <form
      className="w-full border-t border-black/5 bg-white"
      onSubmit={(e) => {
        e.preventDefault();
        void submit();
      }}
      aria-label="Message input form"
    >
      <div className="mx-auto max-w-3xl px-4 py-4 flex items-center gap-3">
        <input
          aria-label="Type your message"
          className={baseInput}
          placeholder="Type your message…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={sending}
        />
        <button
          type="submit"
          aria-label="Send message"
          className={baseButton}
          disabled={!text.trim() || sending}
        >
          {sending ? "Sending…" : "Send"}
        </button>
      </div>
    </form>
  );
}
