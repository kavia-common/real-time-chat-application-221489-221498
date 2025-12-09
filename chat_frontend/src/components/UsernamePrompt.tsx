"use client";

import React, { useEffect, useState } from "react";

type Props = {
  onSet: (username: string) => void;
  initial?: string | null;
};

/**
PUBLIC_INTERFACE
UsernamePrompt

Simple inline prompt to set the username, persisted in localStorage.
*/
export default function UsernamePrompt({ onSet, initial }: Props) {
  const [name, setName] = useState(initial ?? "");

  useEffect(() => {
    setName(initial ?? "");
  }, [initial]);

  return (
    <div className="w-full bg-[#f9fafb] border-b border-black/5">
      <div className="mx-auto max-w-3xl px-4 py-3 flex items-center gap-2">
        <label htmlFor="username" className="text-sm text-gray-700">
          Display name:
        </label>
        <input
          id="username"
          className="flex-1 rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-[#111827] placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition"
          placeholder="Enter your name (default: You)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSet(name.trim() || "You");
            }
          }}
          aria-label="Set your display name"
        />
        <button
          type="button"
          className="rounded-lg bg-[#2563EB] text-white px-3 py-2 text-sm font-medium shadow-sm hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 transition"
          onClick={() => onSet(name.trim() || "You")}
          aria-label="Confirm display name"
        >
          Save
        </button>
      </div>
    </div>
  );
}
