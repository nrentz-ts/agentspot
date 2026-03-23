"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Loader2, XCircle, Plus, Zap } from "lucide-react";
import { usePersona } from "@/lib/persona-context";
import { PERSONA_DASHBOARD_DATA } from "@/lib/persona-data";
import { PERSONA_WORKFLOWS } from "@/lib/workflows-data";
import { WORKFLOWS_LABEL } from "@/lib/labels";
import { cn } from "@/lib/utils";

type RunStatus = "success" | "running" | "error";

const STATUS_ICON: Record<RunStatus, React.ReactNode> = {
  success: <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />,
  running: <Loader2 className="h-3.5 w-3.5 animate-spin text-sky-500" />,
  error:   <XCircle   className="h-3.5 w-3.5 text-red-500" />,
};

const STATUS_LABEL: Record<RunStatus, string> = {
  success: "Completed",
  running: "Running",
  error:   "Failed",
};

export function WorkflowStrip() {
  const { persona } = usePersona();
  const [revealed, setRevealed] = useState(false);

  const workflows = PERSONA_WORKFLOWS[persona.id].mine.slice(0, 4);
  const runs      = PERSONA_DASHBOARD_DATA[persona.id].automationRuns;

  // Match each workflow to the closest automation run by first-word overlap
  function matchRun(name: string) {
    const firstWord = name.split(" ")[0].toLowerCase();
    return runs.find((r) => r.workflow.toLowerCase().includes(firstWord));
  }

  return (
    <div className="space-y-3">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[15px] font-semibold text-foreground">
          Your {WORKFLOWS_LABEL}
        </h2>
        {revealed && (
          <Link
            href="/workflows"
            className="flex items-center gap-1 text-[14px] font-medium text-primary hover:underline"
          >
            View all
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>

      {!revealed ? (
        /* ── Empty state ── */
        <button
          onClick={() => setRevealed(true)}
          className="group w-full rounded-2xl border-2 border-dashed border-border bg-card/50 px-6 py-10 text-center transition-all duration-200 hover:border-primary/30 hover:bg-primary/5"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
              <Zap className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <p className="text-[14px] font-semibold text-foreground">No workflows running yet</p>
              <p className="text-[13px] text-muted-foreground">
                Your automated workflows will appear here as they run.
              </p>
            </div>
            <span className="mt-1 inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-[13px] font-medium text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              <Plus className="h-3.5 w-3.5" />
              Create your first workflow
            </span>
          </div>
        </button>
      ) : (
        /* ── Populated cards ── */
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {workflows.map((wf) => {
            const run = matchRun(wf.name);
            const status = (run?.status ?? "success") as RunStatus;

            return (
              <div
                key={wf.id}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 transition-all duration-150 hover:border-primary/20 hover:shadow-md"
              >
                {/* Emoji + name */}
                <div className="flex items-center gap-3">
                  <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg", wf.color)}>
                    {wf.emoji}
                  </div>
                  <p className="text-[14px] font-semibold leading-snug text-foreground line-clamp-2">
                    {wf.name}
                  </p>
                </div>

                {/* Last run info */}
                <div className="mt-auto flex items-center justify-between border-t border-border pt-2.5">
                  <div className="flex items-center gap-1.5">
                    {STATUS_ICON[status]}
                    <span className="text-[14px] text-muted-foreground">
                      {STATUS_LABEL[status]}
                    </span>
                  </div>
                  <span className="text-[14px] text-muted-foreground/60">
                    {run?.time ?? "2 hrs ago"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
