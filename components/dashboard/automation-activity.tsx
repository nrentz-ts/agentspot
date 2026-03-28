"use client";

import { Zap, CheckCircle2, Clock, AlertCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePersona } from "@/lib/persona-context";
import { PERSONA_DASHBOARD_DATA } from "@/lib/persona-data";

const statusConfig = {
  success: { icon: CheckCircle2, color: "text-emerald-500" },
  running: { icon: Clock, color: "text-blue-500" },
  error: { icon: AlertCircle, color: "text-red-500" },
};

export function AutomationActivity() {
  const { persona } = usePersona();
  const { automationStats, automationRuns } = PERSONA_DASHBOARD_DATA[persona.id];

  const stats = [
    { label: "Processes automated", value: automationStats.processes },
    { label: "Runs this week", value: automationStats.runsThisWeek },
    { label: "Hours saved", value: automationStats.hoursSaved },
  ];

  return (
    <div className="flex flex-col rounded-xl border border-border bg-white">
      <div className="flex items-center gap-2 px-5 pt-5 pb-4">
        <Zap className="h-4 w-4 text-primary" />
        <h2 className="text-[16px] font-semibold">Automation Activity</h2>
      </div>

      <div className="grid grid-cols-3 gap-3 px-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg bg-muted/40 px-3 py-2.5 text-center"
          >
            <p className="text-xl font-bold text-foreground">{stat.value}</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex-1 divide-y divide-border border-t border-border">
        {automationRuns.map((run, i) => {
          const { icon: StatusIcon, color } = statusConfig[run.status];
          return (
            <div
              key={i}
              className="flex items-start gap-3 px-5 py-3 transition-colors hover:bg-muted/20"
            >
              <StatusIcon className={cn("mt-0.5 h-4 w-4 shrink-0", color)} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-semibold text-foreground">
                    {run.workflow}
                  </span>
                  <span className="ml-auto shrink-0 text-[11px] text-muted-foreground/50">
                    {run.time}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                  {run.message}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-border px-5 py-3">
        <button className="flex items-center gap-1 text-[14px] font-medium text-primary hover:underline">
          View all runs <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
