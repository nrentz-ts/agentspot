"use client";

import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { usePersona } from "@/lib/persona-context";
import { useVariant } from "@/lib/variant-context";
import { PERSONA_DASHBOARD_DATA } from "@/lib/persona-data";
import { getHelperDetail, toSlug } from "@/lib/helper-detail-data";
import { cn } from "@/lib/utils";

type RunStatus = "success" | "running" | "error";

const STATUS_CONFIG: Record<RunStatus, { label: string; className: string }> = {
  success: { label: "Completed",   className: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
  running: { label: "In progress", className: "bg-sky-50    text-sky-700    border border-sky-200"     },
  error:   { label: "Failed",      className: "bg-red-50    text-red-600    border border-red-200"     },
};

export function RecentAgentActivity() {
  const { persona } = usePersona();
  const { variant } = useVariant();
  const data = PERSONA_DASHBOARD_DATA[persona.id];

  // Left panel — automation runs
  const runs = data.automationRuns.slice(0, 7);

  // KPI stats
  const stats = [
    { label: "Processes automated", value: data.automationStats.processes },
    { label: "Runs this week",       value: data.automationStats.runsThisWeek },
    { label: "Hours saved",          value: data.automationStats.hoursSaved },
  ];

  // Right panel — knowledge gaps from first two active agents
  const gaps = data.agents
    .slice(0, 3)
    .flatMap((agent) => getHelperDetail(toSlug(agent.name))?.gaps ?? [])
    .filter((g, i, arr) => arr.findIndex((x) => x.id === g.id) === i)
    .slice(0, 4);

  return (
    <div className="grid gap-4 lg:grid-cols-[3fr_2fr]">

      {/* ── Left: Recent Activity ─────────────────────────────────────── */}
      <div className="rounded-2xl border border-border bg-card">
        {/* Header row */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-[15px] font-semibold text-foreground">
            Recent Workflow Runs
          </h2>
          <Link
            href="/activity"
            className="flex items-center gap-1 text-[13px] font-medium text-primary hover:underline"
          >
            View all
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-3 gap-3 border-b border-border px-5 py-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-lg bg-muted/40 px-3 py-2.5 text-center">
              <p className="text-xl font-bold text-foreground">{s.value}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Rows */}
        <div className="divide-y divide-border">
          {runs.map((run, i) => {
            const cfg = STATUS_CONFIG[run.status];
            return (
              <div key={i} className="flex items-start gap-3 px-5 py-3.5">
                {/* Status dot */}
                <div className="mt-1 h-6 w-6 shrink-0 flex items-center justify-center rounded-md bg-muted">
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      run.status === "success" ? "bg-emerald-400" :
                      run.status === "running" ? "bg-sky-400 animate-pulse" :
                      "bg-red-400"
                    )}
                  />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium text-foreground leading-snug">
                    {run.message}
                  </p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[11px] font-medium",
                        cfg.className
                      )}
                    >
                      {cfg.label}
                    </span>
                    <span className="text-[11px] text-muted-foreground/50">
                      {run.time}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Right: Knowledge Gaps ─────────────────────────────────────── */}
      <div className="rounded-2xl border border-border bg-card">
        {/* Header */}
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-[15px] font-semibold text-foreground">
            Where your {variant.agentLabel} needs help
          </h2>
          <p className="mt-0.5 text-[12px] text-muted-foreground">
            Situations needing your judgment
          </p>
        </div>

        {/* Rows */}
        <div className="divide-y divide-border">
          {gaps.map((gap) => (
            <div key={gap.id} className="px-5 py-4">
              <p className="text-[13px] font-medium leading-snug text-foreground">
                {gap.description}
              </p>
              <div className="mt-2.5 flex items-center justify-between gap-3">
                <p className="text-[12px] text-muted-foreground">
                  Came up{" "}
                  <span className="font-semibold text-foreground">{gap.count}×</span>{" "}
                  this week
                </p>
                <button className="flex shrink-0 items-center gap-1 rounded-lg border border-primary/20 bg-primary/5 px-2.5 py-1 text-[12px] font-medium text-primary transition-colors hover:bg-primary/10">
                  <Plus className="h-3 w-3" />
                  Add to Knowledge Base
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
