"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUp } from "lucide-react";

interface InputBarProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  initialValue?: string;
  previewValue?: string;
}

export function InputBar({ onSend, disabled, initialValue, previewValue }: InputBarProps) {
  const [value, setValue] = useState(initialValue ?? "");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (initialValue) setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const displayValue = value || previewValue || "";
  const isPreview = !value && !!previewValue;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const textToSend = value.trim() || previewValue?.trim();
    if (!textToSend || disabled) return;
    onSend(textToSend);
    setValue("");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-border bg-white p-4">
      <div className="mx-auto flex max-w-3xl items-end gap-3 rounded-xl border border-border bg-white px-4 py-3 transition-all duration-200 focus-within:border-primary/40 focus-within:shadow-md">
        <textarea
          ref={inputRef}
          rows={1}
          placeholder="Ask me anything..."
          className={`max-h-32 flex-1 resize-none bg-transparent text-[14px] outline-none placeholder:text-muted-foreground/50 transition-colors duration-150 ${isPreview ? "text-muted-foreground/60" : ""}`}
          value={displayValue}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
        <button
          type="submit"
          disabled={!displayValue.trim() || disabled}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity disabled:opacity-30"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
