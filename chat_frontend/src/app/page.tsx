"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ChatHeader from "@/components/ChatHeader";
import MessageList from "@/components/MessageList";
import MessageInput from "@/components/MessageInput";
import UsernamePrompt from "@/components/UsernamePrompt";
import { Message, ConnectionStatus } from "@/types";
import { createWebSocket } from "@/lib/ws";

const LS_USERNAME_KEY = "ocean_chat_username";

export default function Home() {
  const [username, setUsername] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<ConnectionStatus>("offline");

  // Transport (ws or mock)
  const transportRef = useRef<ReturnType<typeof createWebSocket> | null>(null);

  // Initialize username from localStorage on mount (client)
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(LS_USERNAME_KEY);
      setUsername(stored || "You");
    } catch {
      setUsername("You");
    }
  }, []);

  // Setup transport once on mount
  useEffect(() => {
    const transport = createWebSocket();
    transportRef.current = transport;

    transport.onStatus((s) => setStatus(s));
    transport.onMessage((m) => {
      setMessages((prev) => [...prev, m]);
    });

    return () => {
      transport.close();
      transportRef.current = null;
    };
  }, []);

  const onSetUsername = useCallback((name: string) => {
    setUsername(name);
    try {
      window.localStorage.setItem(LS_USERNAME_KEY, name);
    } catch {
      // ignore
    }
  }, []);

  const onSend = useCallback(
    async (text: string) => {
      const msg: Message = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        user: username ?? "You",
        text,
        ts: Date.now(),
      };
      transportRef.current?.send(msg);
    },
    [username]
  );

  // Derived title
  const pageTitle = useMemo(() => "Ocean Chat", []);

  return (
    <main className="min-h-dvh flex flex-col bg-[#f9fafb] text-[#111827]">
      <ChatHeader status={status} />
      <div className="mx-auto w-full max-w-3xl mt-3 px-4">
        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden">
          <UsernamePrompt onSet={onSetUsername} initial={username} />
          <MessageList messages={messages} />
          <MessageInput onSend={onSend} />
        </div>
      </div>
      <footer className="py-6 text-center text-xs text-gray-400">
        {pageTitle} • Modern UI with Ocean Professional theme
      </footer>
    </main>
  );
}
