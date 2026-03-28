"use client";

import { useRef, useState } from "react";
import { ArrowUp, Sparkles } from "lucide-react";
import { useVariant } from "@/lib/variant-context";

interface PromptBarProps {
  onSubmit?: (value: string) => void;
  placeholder?: string;
}

export function PromptBar({
  onSubmit,
  placeholder,
}: PromptBarProps) {
  const { variant } = useVariant();
  const resolvedPlaceholder = placeholder ?? `Ask your ${variant.agentsLabel.toLowerCase()} anything, or describe a task to get started…`;
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function resize() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(e.target.value);
    resize();
  }

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!value.trim()) return;
    onSubmit?.(value.trim());
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="group flex w-full items-center gap-3 rounded-2xl border border-white/80 bg-white/70 px-5 py-3.5 shadow-sm backdrop-blur-sm transition-all duration-200 focus-within:border-primary/30 focus-within:bg-white/90 focus-within:shadow-md">
        <Sparkles className="h-4 w-4 shrink-0 text-primary/50" />
        <textarea
          ref={textareaRef}
          rows={1}
          placeholder={resolvedPlaceholder}
          className="flex-1 resize-none overflow-hidden bg-transparent text-[15px] leading-relaxed outline-none placeholder:text-muted-foreground/50"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button
          type="submit"
          disabled={!value.trim()}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity disabled:opacity-30"
        >
          <ArrowUp className="h-3.5 w-3.5" />
        </button>
      </div>
    </form>
  );
}
