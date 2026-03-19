"use client";

import { useState } from "react";
import { ArrowUp, Sparkles } from "lucide-react";

interface PromptBarProps {
  onSubmit?: (value: string) => void;
  placeholder?: string;
}

export function PromptBar({ onSubmit, placeholder = "What can SpotterWork do for you today?" }: PromptBarProps) {
  const [value, setValue] = useState("");

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!value.trim()) return;
    onSubmit?.(value.trim());
    setValue("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="group flex w-full items-center gap-3 rounded-2xl border border-white/80 bg-white/70 px-5 py-3 shadow-sm backdrop-blur-sm transition-all duration-200 focus-within:border-primary/30 focus-within:bg-white/90 focus-within:shadow-md">
        <Sparkles className="h-4 w-4 shrink-0 text-primary/50" />
        <input
          type="text"
          placeholder={placeholder}
          className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground/50"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && value.trim()) handleSubmit();
          }}
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
