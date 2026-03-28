"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Workflow, Plus, Search, Play, Pencil, CheckCircle2, Loader2, XCircle, Clock, CalendarClock } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePersona } from "@/lib/persona-context";
import { PERSONA_WORKFLOWS, type WorkflowItem, type WorkflowRunStatus } from "@/lib/workflows-data";
import { WORKFLOW_LABEL, WORKFLOWS_LABEL } from "@/lib/labels";
import { useVariant } from "@/lib/variant-context";
import WorkflowsListV2 from "./_v2/list";

function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

// ─── Run status badge ────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  Exclude<WorkflowRunStatus, null>,
  { label: string; icon: React.ReactNode; bg: string; text: string; border: string }
> = {
  completed: {
    label: "Completed",
    icon: <CheckCircle2 className="h-3 w-3" />,
    bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200",
  },
  running: {
    label: "Running",
    icon: <Loader2 className="h-3 w-3 animate-spin" />,
    bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200",
  },
  failed: {
    label: "Failed",
    icon: <XCircle className="h-3 w-3" />,
    bg: "bg-red-50", text: "text-red-600", border: "border-red-200",
  },
};

function StatusBadge({ status }: { status: WorkflowRunStatus }) {
  if (!status) return null;
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={cn(
      "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold",
      cfg.bg, cfg.text, cfg.border
    )}>
      {cfg.icon}
      {cfg.label}
    </span>
  );
}

// ─── Workflow card ────────────────────────────────────────────────────────────

function WorkflowCard({ item, section }: { item: WorkflowItem; section: "mine" | "shared" | "community" }) {
  const router = useRouter();
  const isOwned = section === "mine";

  return (
    <div className="group flex flex-col rounded-2xl border border-border bg-white transition-all duration-150 hover:border-primary/20 hover:shadow-lg overflow-hidden">
      {/* Main clickable area */}
      <button
        onClick={() => router.push(`/workflows/${toSlug(item.name)}`)}
        className="flex flex-col items-start p-5 text-left flex-1"
      >
        <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl text-xl transition-transform group-hover:scale-105", item.color)}>
          {item.emoji}
        </div>
        <h3 className="mt-4 text-[14px] font-semibold text-foreground leading-snug">{item.name}</h3>
        <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground flex-1">{item.description}</p>

        {/* Last run status */}
        {item.lastRunStatus && (
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <StatusBadge status={item.lastRunStatus} />
            {item.lastRunTime && (
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground/60">
                <Clock className="h-3 w-3" />
                {item.lastRunTime}
              </span>
            )}
          </div>
        )}

        {/* Schedule label */}
        {item.isScheduled && item.scheduleLabel && (
          <div className="mt-1.5 flex items-center gap-1 text-[11px] text-muted-foreground/60">
            <CalendarClock className="h-3 w-3" />
            {item.scheduleLabel}
          </div>
        )}
      </button>

      {/* Quick action bar — only for owned and shared workflows */}
      {section !== "community" && (
        <div className="flex items-center gap-1 border-t border-border px-4 py-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => { e.stopPropagation(); router.push(`/workflows/${toSlug(item.name)}`); }}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-medium text-white bg-primary hover:opacity-90 transition-opacity"
          >
            <Play className="h-3 w-3" />
            Run now
          </button>
          {isOwned && (
            <button
              onClick={(e) => { e.stopPropagation(); router.push(`/workflows/${toSlug(item.name)}/edit`); }}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-medium text-muted-foreground hover:bg-muted transition-colors"
            >
              <Pencil className="h-3 w-3" />
              Edit
            </button>
          )}
        </div>
      )}

      {/* Community: single "Use this workflow" CTA */}
      {section === "community" && (
        <div className="flex items-center gap-1 border-t border-border px-4 py-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => { e.stopPropagation(); router.push(`/workflows/new?template=${toSlug(item.name)}`); }}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-medium text-primary hover:bg-primary/5 transition-colors"
          >
            <Plus className="h-3 w-3" />
            Use this workflow
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Dispatcher ───────────────────────────────────────────────────────────────

export default function WorkflowsPage() {
  const { variant } = useVariant();
  return variant.id === "workflow-iteration" ? <WorkflowsPageV3 /> : <WorkflowsListV2 />;
}
// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({
  title,
  subtitle,
  children,
  count,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  count: number;
}) {
  return (
    <div>
      <div className="mb-5 flex items-baseline gap-2">
        <h2 className="text-[15px] font-semibold text-foreground">{title}</h2>
        <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">{count}</span>
        <p className="ml-1 text-[12px] text-muted-foreground">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function WorkflowsPageV3() {
  const { persona } = usePersona();
  const data = PERSONA_WORKFLOWS[persona.id];
  const [query, setQuery] = useState("");

  function filter(items: WorkflowItem[]) {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (w) => w.name.toLowerCase().includes(q) || w.description.toLowerCase().includes(q)
    );
  }

  const filteredMine      = filter(data.mine);
  const filteredShared    = filter(data.shared);
  const filteredCommunity = filter(data.community);
  const noResults = query && filteredMine.length === 0 && filteredShared.length === 0 && filteredCommunity.length === 0;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Workflow className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">{WORKFLOWS_LABEL}</h1>
            <p className="text-[13px] text-muted-foreground">
              Multi-step automations that run on your behalf
            </p>
          </div>
        </div>
        <button
          onClick={() => window.location.href = "/workflows/new"}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          New {WORKFLOW_LABEL}
        </button>
      </div>

      {/* ── Search ── */}
      <div className="relative mt-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
        <input
          type="text"
          placeholder={`Search ${WORKFLOWS_LABEL.toLowerCase()}…`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-border bg-white py-2.5 pl-9 pr-4 text-[13px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
        />
      </div>

      {/* ── No results ── */}
      {noResults && (
        <div className="mt-16 flex flex-col items-center gap-2 text-center">
          <p className="text-[14px] font-semibold text-foreground">No workflows matched "{query}"</p>
          <p className="text-[13px] text-muted-foreground">Try a different search term or create a new workflow.</p>
        </div>
      )}

      {/* ── Sections ── */}
      {!noResults && (
        <div className="mt-10 space-y-14">

          {filteredMine.length > 0 && (
            <Section
              title={`My ${WORKFLOWS_LABEL}`}
              subtitle={`Your automations — click any to see run history`}
              count={filteredMine.length}
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredMine.map((item) => <WorkflowCard key={item.id} item={item} section="mine" />)}
              </div>
            </Section>
          )}

          {filteredShared.length > 0 && (
            <Section
              title="Shared with Me"
              subtitle={`${WORKFLOWS_LABEL} your team has shared with you`}
              count={filteredShared.length}
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredShared.map((item) => <WorkflowCard key={item.id} item={item} section="shared" />)}
              </div>
            </Section>
          )}

          {filteredCommunity.length > 0 && (
            <Section
              title="Community Created"
              subtitle={`Popular ${WORKFLOWS_LABEL.toLowerCase()} built and shared by the community`}
              count={filteredCommunity.length}
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredCommunity.map((item) => <WorkflowCard key={item.id} item={item} section="community" />)}
              </div>
            </Section>
          )}

        </div>
      )}
    </div>
  );
}
