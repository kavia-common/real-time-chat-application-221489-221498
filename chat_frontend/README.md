# Ocean Chat – Frontend

A modern Next.js UI for a simple real-time chat using the Ocean Professional theme (blue + amber accents). Includes a resilient WebSocket client with mock fallback so the UI works even without backend configuration.

## Quick Start

- Dev: `npm run dev` then open http://localhost:3000
- Build: `npm run build`
- Start: `npm run start`

No extra scripts were added; the app works with the current preview system.

## Features

- Header with gradient background and connection status badge
- Scrollable message list with auto-scroll-to-bottom
- Message input with Enter to send, disabled/“sending…” state
- Username prompt persisted in localStorage (defaults to "You")
- WebSocket client using `NEXT_PUBLIC_WS_URL`, with exponential backoff reconnect
- Mock in-memory transport when WS is not configured or fails (echo)
- Ocean Professional theme: rounded corners, subtle shadows, modern focus states

## Environment Variables

- `NEXT_PUBLIC_WS_URL` (optional) – WebSocket endpoint.
- `NEXT_PUBLIC_API_BASE`, `NEXT_PUBLIC_BACKEND_URL` (optional, for future use).

If `NEXT_PUBLIC_WS_URL` is not set, the app uses a mock transport that echoes messages to demonstrate real-time behavior.

## Code Structure

- `src/app/page.tsx` – Main page wiring state and transport
- `src/components/ChatHeader.tsx` – Header and status
- `src/components/MessageList.tsx` – Scrollable list with bubbles
- `src/components/MessageInput.tsx` – Input form
- `src/components/UsernamePrompt.tsx` – Inline username setter
- `src/lib/ws.ts` – WebSocket helper (with mock fallback)
- `src/lib/time.ts` – Time formatting utilities
- `src/types/index.ts` – Shared types

## Styling

Tailwind CSS v4 is configured. The Ocean Professional palette is reflected via classes and CSS variables defined in `src/app/globals.css`.

## Accessibility

- Input and buttons have aria labels
- Keyboard submit via Enter
- Focus-visible outlines for keyboard users
