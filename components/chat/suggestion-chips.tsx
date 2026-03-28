"use client";

import { cn } from "@/lib/utils";

interface SuggestionChipsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  onHover?: (suggestion: string) => void;
  onHoverEnd?: () => void;
  className?: string;
}

export function SuggestionChips({
  suggestions,
  onSelect,
  onHover,
  onHoverEnd,
  className,
}: SuggestionChipsProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {suggestions.map((suggestion) => (
        <button
          key={suggestion}
          onClick={() => onSelect(suggestion)}
          onMouseEnter={() => onHover?.(suggestion)}
          onMouseLeave={() => onHoverEnd?.()}
          className="rounded-full border border-border bg-card px-3.5 py-1.5 text-[14px] font-medium text-foreground/70 shadow-sm transition-all duration-150 hover:border-primary/30 hover:bg-primary/5 hover:text-primary active:scale-[0.97]"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}
