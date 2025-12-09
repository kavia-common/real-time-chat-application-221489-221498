"use client";

import React from "react";
import { ConnectionStatus } from "@/types";

type Props = {
  status: ConnectionStatus;
};

function statusStyles(status: ConnectionStatus) {
  switch (status) {
    case "connected":
      return "bg-green-500/90 text-white";
    case "reconnecting":
      return "bg-amber-500/90 text-white animate-pulse";
    case "offline":
    default:
      return "bg-red-500/90 text-white";
  }
}

/**
PUBLIC_INTERFACE
ChatHeader

Header displaying the app title and a connection status badge.
*/
export default function ChatHeader({ status }: Props) {
  return (
    <header
      className="w-full border-b border-black/5 bg-gradient-to-r from-blue-500/10 to-gray-50"
      aria-label="Application Header"
    >
      <div className="mx-auto max-w-3xl px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold text-[#111827] tracking-tight">
          <span className="inline-block rounded-lg bg-white shadow-sm px-3 py-1 ring-1 ring-black/5">
            Ocean <span className="text-[#2563EB]">Chat</span>
          </span>
        </h1>
        <div
          className={`text-xs sm:text-sm rounded-full px-3 py-1 shadow-sm ${statusStyles(
            status
          )}`}
          role="status"
          aria-live="polite"
        >
          {status === "connected"
            ? "Connected"
            : status === "reconnecting"
            ? "Reconnecting…"
            : "Offline"}
        </div>
      </div>
    </header>
  );
}
