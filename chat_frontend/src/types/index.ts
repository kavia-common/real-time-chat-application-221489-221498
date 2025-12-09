export type ConnectionStatus = "connected" | "reconnecting" | "offline";

// PUBLIC_INTERFACE
export interface Message {
  /** Unique id for this message */
  id: string;
  /** Username of the sender */
  user: string;
  /** Message text content */
  text: string;
  /** Unix epoch milliseconds */
  ts: number;
  /** Mark if message is from self for UI styling */
  self?: boolean;
}
