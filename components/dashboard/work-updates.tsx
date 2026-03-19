"use client";

import { useState, useEffect } from "react";
import { MessageSquare, CalendarDays, BarChart3, Sparkles, Reply, X } from "lucide-react";
import { usePersona } from "@/lib/persona-context";
import { PERSONA_DASHBOARD_DATA, type WorkUpdateCard, type WorkUpdateType } from "@/lib/persona-data";

const typeConfig: Record<WorkUpdateType, { icon: typeof MessageSquare; accent: string; iconBg: string }> = {
  slack: { icon: MessageSquare, accent: "text-violet-600", iconBg: "bg-violet-100" },
  calendar: { icon: CalendarDays, accent: "text-sky-600", iconBg: "bg-sky-100" },
  data: { icon: BarChart3, accent: "text-amber-600", iconBg: "bg-amber-100" },
};

export function WorkUpdates() {
  const { persona } = usePersona();
  const source = PERSONA_DASHBOARD_DATA[persona.id].workUpdates;
  const [cards, setCards] = useState<WorkUpdateCard[]>(source);

  // Reset when persona changes
  useEffect(() => {
    setCards(PERSONA_DASHBOARD_DATA[persona.id].workUpdates);
  }, [persona.id]);

  function dismiss(index: number) {
    setCards((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <h2 className="text-[15px] font-semibold text-foreground">
          Things that need your attention
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {cards.slice(0, 4).map((card, i) => {
          const { icon: Icon, accent, iconBg } = typeConfig[card.type];
          return (
            <div
              key={`${card.text}-${i}`}
              className="flex flex-col justify-between rounded-xl border border-white/80 bg-white/60 p-4 backdrop-blur-sm transition-all duration-150 hover:border-primary/20 hover:bg-white/90 hover:shadow-md"
            >
              <div className="space-y-2.5">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconBg}`}>
                  <Icon className={`h-4 w-4 ${accent}`} />
                </div>
                <p className="text-[13px] font-medium leading-relaxed text-foreground/90">
                  {card.text}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-[11px] text-muted-foreground/40">
                  {card.source}
                </p>
                <div className="flex items-center gap-1">
                  <button className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground/40 transition-colors hover:bg-primary/10 hover:text-primary">
                    <Reply className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => dismiss(i)}
                    className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground/40 transition-colors hover:bg-red-50 hover:text-red-400"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
