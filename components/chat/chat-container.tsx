"use client";

import { useState, useCallback, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Sparkles, ArrowLeft } from "lucide-react";
import { Message } from "@/lib/types";
import { CONFIRMATION_RESPONSES } from "@/lib/mock-data";
import { getResponse, generateId } from "@/lib/mock-engine";
import { usePersona } from "@/lib/persona-context";
import { PERSONA_DASHBOARD_DATA } from "@/lib/persona-data";
import { MessageList } from "./message-list";
import { InputBar } from "./input-bar";
import { SuggestionChips } from "./suggestion-chips";

export function ChatContainer() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q");
  const { persona } = usePersona();
  const router = useRouter();
  const chips = PERSONA_DASHBOARD_DATA[persona.id].suggestionChips;

  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [previewText, setPreviewText] = useState("");
  const [lockedText, setLockedText] = useState("");

  const sendMessage = useCallback((text: string) => {
    setHasInteracted(true);

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: [{ type: "text", text }],
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    const delay = 1000 + Math.random() * 1500;
    setTimeout(() => {
      const responseContent = getResponse(text);
      const assistantMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, delay);
  }, []);

  useEffect(() => {
    if (initialQuery && !hasInteracted) {
      const timer = setTimeout(() => sendMessage(initialQuery), 500);
      return () => clearTimeout(timer);
    }
  }, [initialQuery, hasInteracted, sendMessage]);

  function handleConfirm() {
    setIsTyping(true);
    setTimeout(() => {
      const msg: Message = {
        id: generateId(),
        role: "assistant",
        content: CONFIRMATION_RESPONSES[0],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, msg]);
      setIsTyping(false);
    }, 1500);
  }

  function handleCancel() {
    const msg: Message = {
      id: generateId(),
      role: "assistant",
      content: [
        {
          type: "text",
          text: "No problem! Let me know whenever you're ready, or if you'd like me to adjust anything first.",
        },
      ],
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, msg]);
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center gap-3 border-b border-border bg-white px-6 py-3">
        <button
          onClick={() => router.back()}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
        </div>
        <div>
          <h1 className="text-[13px] font-semibold">AgentSpot Assistant</h1>
          <p className="text-[11px] text-muted-foreground">Your personal AI work assistant</p>
        </div>
      </header>

      <MessageList
        messages={messages}
        isTyping={isTyping}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />

      {!hasInteracted && (
        <div className="mx-auto w-full max-w-3xl px-4 pb-2">
          <SuggestionChips
            suggestions={chips}
            onSelect={(suggestion) => {
              setLockedText(suggestion);
              setPreviewText("");
            }}
            onHover={(suggestion) => {
              if (!lockedText) setPreviewText(suggestion);
            }}
            onHoverEnd={() => {
              if (!lockedText) setPreviewText("");
            }}
          />
        </div>
      )}

      <InputBar
        onSend={sendMessage}
        disabled={isTyping}
        previewValue={previewText}
        initialValue={lockedText}
      />
    </div>
  );
}
