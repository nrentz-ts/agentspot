"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePersona } from "@/lib/persona-context";
import { PERSONA_DASHBOARD_DATA } from "@/lib/persona-data";

const trendIcon = {
  up: TrendingUp,
  down: TrendingDown,
  neutral: Minus,
};

const trendStyle = {
  up: { icon: "text-emerald-500", bg: "bg-emerald-50" },
  down: { icon: "text-amber-500", bg: "bg-amber-50" },
  neutral: { icon: "text-muted-foreground", bg: "bg-muted" },
};

export function DataInsights() {
  const { persona } = usePersona();
  const insights = PERSONA_DASHBOARD_DATA[persona.id].insights;

  return (
    <div className="space-y-3">
      <h2 className="text-[16px] font-semibold text-foreground">Insights from your data</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {insights.map((insight, i) => {
          const Icon = trendIcon[insight.trend];
          const style = trendStyle[insight.trend];
          return (
            <div
              key={i}
              className="flex items-start gap-3.5 rounded-xl border border-border bg-white px-4 py-4 transition-all hover:border-primary/20 hover:shadow-md"
            >
              <div
                className={cn(
                  "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                  style.bg
                )}
              >
                <Icon className={cn("h-5 w-5", style.icon)} />
              </div>
              <p className="text-[14px] leading-relaxed text-foreground/80">
                {insight.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
