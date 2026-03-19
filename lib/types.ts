export type MessageRole = "user" | "assistant";

export type RichContentType =
  | "text"
  | "action-card"
  | "step-list"
  | "confirmation"
  | "email-summary";

export interface RichContent {
  type: RichContentType;
  text?: string;
  title?: string;
  description?: string;
  steps?: string[];
  items?: { subject: string; from: string; snippet: string }[];
  confirmLabel?: string;
  cancelLabel?: string;
}

export interface Message {
  id: string;
  role: MessageRole;
  content: RichContent[];
  timestamp: Date;
}
