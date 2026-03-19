"use client";

import { useEffect, useRef } from "react";
import { Message } from "@/lib/types";
import { MessageBubble } from "./message-bubble";
import { TypingIndicator } from "./typing-indicator";

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function MessageList({
  messages,
  isTyping,
  onConfirm,
  onCancel,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto py-4">
      <div className="mx-auto max-w-3xl space-y-2">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            onConfirm={onConfirm}
            onCancel={onCancel}
          />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
