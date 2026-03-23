"use client";

import { Sparkles } from "lucide-react";
import { Message } from "@/lib/types";
import { RichResponse } from "./rich-response";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: Message;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function MessageBubble({ message, onConfirm, onCancel }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex items-start gap-3 px-4 py-2",
        isUser && "flex-row-reverse"
      )}
    >
      <div
        className={cn(
          "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
          isUser ? "bg-foreground/8 text-foreground" : "bg-primary/10 text-primary"
        )}
      >
        {isUser ? (
          <span className="text-[11px] font-bold">A</span>
        ) : (
          <Sparkles className="h-3.5 w-3.5" />
        )}
      </div>

      <div
        className={cn(
          "max-w-[80%] space-y-3",
          isUser && "flex flex-col items-end"
        )}
      >
        {message.content.map((block, i) => {
          if (isUser && block.type === "text") {
            return (
              <div
                key={i}
                className="rounded-2xl rounded-tr-sm bg-muted/70 px-4 py-2.5 text-[14px] leading-relaxed text-foreground"
              >
                {block.text}
              </div>
            );
          }

          const hasConfirmation = block.type === "confirmation";

          return (
            <div
              key={i}
              className={cn(
                block.type === "text" &&
                  "rounded-2xl rounded-tl-sm bg-muted px-4 py-2.5"
              )}
            >
              <RichResponse
                content={block}
                onConfirm={hasConfirmation ? onConfirm : undefined}
                onCancel={hasConfirmation ? onCancel : undefined}
              />
            </div>
          );
        })}

        <span className="text-[10px] text-muted-foreground/40">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
