import {
  CONVERSATION_FLOWS,
  FALLBACK_RESPONSES,
  CONFIRMATION_RESPONSES,
} from "./mock-data";
import { RichContent } from "./types";

export function getResponse(userInput: string): RichContent[] {
  const input = userInput.toLowerCase().trim();

  if (
    input === "yes" ||
    input === "yes!" ||
    input.includes("set it up") ||
    input.includes("build it") ||
    input.includes("create it") ||
    input.includes("go ahead") ||
    input.includes("do it") ||
    input.includes("sure") ||
    input.includes("sounds good")
  ) {
    return CONFIRMATION_RESPONSES[0];
  }

  for (const flow of CONVERSATION_FLOWS) {
    const matches = flow.keywords.some((keyword) => input.includes(keyword));
    if (matches) {
      return flow.responses[0];
    }
  }

  const fallbackIndex = Math.floor(Math.random() * FALLBACK_RESPONSES.length);
  return FALLBACK_RESPONSES[fallbackIndex];
}

export function generateId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
