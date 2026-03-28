"use client";

import { useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Clock,
  Star,
  MessageSquare,
  AlertCircle,
  Pencil,
  Plus,
  ChevronRight,
  FileText,
  CheckCircle2,
  Users,
  Target,
  Zap,
  Bot,
  Send,
  Paperclip,
  SlidersHorizontal,
  Workflow,
  ArrowUpRight,
  Share2,
  Link2,
  X,
  UserPlus,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getHelperDetail,
  toSlug,
  type HelperDetailData,
  type MetricIconId,
  type MetricAccent,
  type ResolutionColor,
} from "@/lib/helper-detail-data";
import { useVariant } from "@/lib/variant-context";
import { usePersona } from "@/lib/persona-context";
import { PERSONA_HELPERS } from "@/lib/agents-data";
import { PERSONA_WORKFLOWS } from "@/lib/workflows-data";

/* ─── icon / accent maps ─── */
const METRIC_ICONS: Record<MetricIconId, typeof MessageSquare> = {
  message:  MessageSquare,
  alert:    AlertCircle,
  clock:    Clock,
  star:     Star,
  check:    CheckCircle2,
  trending: TrendingUp,
  users:    Users,
  file:     FileText,
  zap:      Zap,
  target:   Target,
};

const METRIC_ACCENT_CLASSES: Record<MetricAccent, { icon: string; bg: string }> = {
  primary:  { icon: "text-primary",     bg: "bg-primary/10"  },
  amber:    { icon: "text-amber-600",   bg: "bg-amber-50"    },
  sky:      { icon: "text-sky-600",     bg: "bg-sky-50"      },
  emerald:  { icon: "text-emerald-600", bg: "bg-emerald-50"  },
  violet:   { icon: "text-violet-600",  bg: "bg-violet-50"   },
  rose:     { icon: "text-rose-600",    bg: "bg-rose-50"     },
  teal:     { icon: "text-teal-600",    bg: "bg-teal-50"     },
};

const RESOLUTION_CLASSES: Record<ResolutionColor, { text: string; bg: string }> = {
  green:  { text: "text-emerald-700", bg: "bg-emerald-50" },
  amber:  { text: "text-amber-700",   bg: "bg-amber-50"   },
  blue:   { text: "text-sky-700",     bg: "bg-sky-50"     },
  red:    { text: "text-red-700",     bg: "bg-red-50"     },
  violet: { text: "text-violet-700",  bg: "bg-violet-50"  },
};

/* ─── Suggestion chips ─── */
const SUGGESTION_CHIPS: Record<string, string[]> = {};
const DEFAULT_CHIPS = [
  "Summarize today's activity",
  "What needs my attention?",
  "Show recent escalations",
  "How am I performing this week?",
];
function getChips(name: string): string[] {
  return SUGGESTION_CHIPS[toSlug(name)] ?? DEFAULT_CHIPS;
}

/* ─── Sub-components ─── */

function ActivityChart({ data, label }: { data: { day: string; count: number }[]; label: string }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  const total = data.reduce((s, d) => s + d.count, 0);

  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-[15px] font-semibold text-foreground">{label}</h3>
          <p className="mt-0.5 text-[13px] text-muted-foreground">Last 7 days</p>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-[13px] font-semibold text-primary">
          {total} total
        </span>
      </div>
      <div className="flex items-end gap-2.5" style={{ height: 120 }}>
        {data.map((d, i) => {
          const heightPct = (d.count / max) * 100;
          const isLast = i === data.length - 1;
          return (
            <div key={d.day} className="group flex flex-1 flex-col items-center gap-1.5">
              <span className="text-[11px] font-medium text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                {d.count}
              </span>
              <div className="relative flex w-full flex-1 items-end">
                <div
                  className={cn("w-full rounded-t-md transition-all duration-300",
                    isLast ? "bg-primary" : "bg-primary/20 group-hover:bg-primary/40")}
                  style={{ height: `${heightPct}%`, minHeight: d.count > 0 ? 4 : 0 }}
                />
              </div>
              <span className={cn("text-[11px] font-medium", isLast ? "text-primary" : "text-muted-foreground")}>
                {d.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RecentActivity({ title, items, agentLabel }: { title: string; items: HelperDetailData["activity"]; agentLabel: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h3 className="text-[15px] font-semibold text-foreground">{title}</h3>
        <button className="flex items-center gap-1 text-[13px] font-medium text-primary hover:underline">
          View all <ChevronRight className="h-3 w-3" />
        </button>
      </div>
      <div className="divide-y divide-border">
        {items.map((item, i) => {
          const cls = RESOLUTION_CLASSES[item.resolutionColor];
          return (
            <div key={i} className="flex items-start gap-3.5 px-5 py-3.5 transition-colors hover:bg-muted/30">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-bold text-muted-foreground">
                {item.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-medium text-foreground">{item.action}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className={cn("inline-block rounded-full px-2 py-0.5 text-[12px] font-semibold", cls.bg, cls.text)}>
                    {item.resolution}
                  </span>
                  <span className="text-[12px] text-muted-foreground/60">{item.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function KnowledgeGaps({ title, subtitle, items, agentLabel }: { title: string; subtitle: string; items: HelperDetailData["gaps"]; agentLabel: string }) {
  const [added, setAdded] = useState<Set<number>>(new Set());
  // Rephrase title/subtitle for helper variant
  const displayTitle = title.replace(/helper/gi, agentLabel).replace(/agent/gi, agentLabel);

  return (
    <div className="rounded-2xl border border-border bg-white shadow-sm">
      <div className="border-b border-border px-5 py-4">
        <h3 className="text-[15px] font-semibold text-foreground">{displayTitle}</h3>
        <p className="mt-0.5 text-[13px] text-muted-foreground">{subtitle}</p>
      </div>
      <div className="divide-y divide-border">
        {items.map((gap) => {
          const isAdded = added.has(gap.id);
          return (
            <div key={gap.id} className="px-5 py-4">
              <p className="text-[14px] font-medium leading-snug text-foreground">{gap.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[13px] text-muted-foreground">
                  Came up <span className="font-semibold text-foreground">{gap.count}×</span> this week
                </span>
                <button
                  onClick={() => setAdded((prev) => { const n = new Set(prev); n.add(gap.id); return n; })}
                  disabled={isAdded}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-semibold transition-all",
                    isAdded ? "cursor-default bg-emerald-50 text-emerald-700" : "bg-primary/8 text-primary hover:bg-primary/15"
                  )}
                >
                  {isAdded ? "Added ✓" : <><Plus className="h-3 w-3" />Add to Knowledge Base</>}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Share modal ─── */

type ShareAccessLevel = "run" | "edit";

interface ShareEntry {
  id: string;
  type: "person" | "group";
  name: string;
  sub: string;
  initials: string;
  color: string;
  access: ShareAccessLevel;
}

const MOCK_PEOPLE: Omit<ShareEntry, "access">[] = [
  { id: "t1", type: "person", name: "Sarah Chen",    sub: "sarah.chen@company.com",  initials: "SC", color: "bg-violet-100 text-violet-700" },
  { id: "t2", type: "person", name: "Marcus Rivera", sub: "marcus.r@company.com",    initials: "MR", color: "bg-sky-100 text-sky-700" },
  { id: "t3", type: "person", name: "Priya Nair",    sub: "priya.nair@company.com",  initials: "PN", color: "bg-emerald-100 text-emerald-700" },
  { id: "t4", type: "person", name: "James Okafor",  sub: "james.o@company.com",     initials: "JO", color: "bg-amber-100 text-amber-700" },
  { id: "t5", type: "person", name: "Lena Müller",   sub: "lena.m@company.com",      initials: "LM", color: "bg-rose-100 text-rose-700" },
  { id: "t6", type: "person", name: "Tom Bradfield", sub: "tom.b@company.com",       initials: "TB", color: "bg-teal-100 text-teal-700" },
];

const MOCK_GROUPS: Omit<ShareEntry, "access">[] = [
  { id: "g1", type: "group", name: "Sales Team",       sub: "12 members", initials: "S",  color: "bg-orange-100 text-orange-700" },
  { id: "g2", type: "group", name: "Marketing Team",   sub: "8 members",  initials: "M",  color: "bg-pink-100 text-pink-700" },
  { id: "g3", type: "group", name: "Engineering",      sub: "15 members", initials: "E",  color: "bg-indigo-100 text-indigo-700" },
  { id: "g4", type: "group", name: "Customer Success", sub: "6 members",  initials: "CS", color: "bg-teal-100 text-teal-700" },
];

function AccessPill({ value, onChange }: { value: ShareAccessLevel; onChange: (v: ShareAccessLevel) => void }) {
  return (
    <div className="flex shrink-0 overflow-hidden rounded-lg border border-border bg-white text-[12px] font-medium">
      <button
        onClick={() => onChange("run")}
        className={cn(
          "px-2.5 py-1 transition-colors",
          value === "run" ? "bg-primary text-white" : "text-muted-foreground hover:bg-muted/40"
        )}
      >
        Can run
      </button>
      <button
        onClick={() => onChange("edit")}
        className={cn(
          "px-2.5 py-1 transition-colors",
          value === "edit" ? "bg-primary text-white" : "text-muted-foreground hover:bg-muted/40"
        )}
      >
        Can edit
      </button>
    </div>
  );
}

function OrgToggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div
      role="switch"
      aria-checked={value}
      onClick={() => onChange(!value)}
      className={cn(
        "relative flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200",
        value ? "bg-primary" : "bg-muted-foreground/30"
      )}
    >
      <span
        className={cn(
          "absolute h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200",
          value ? "translate-x-[22px]" : "translate-x-[2px]"
        )}
      />
    </div>
  );
}

function ShareModal({ helperName, onClose }: { helperName: string; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [orgOpen, setOrgOpen] = useState(false);
  const [shared, setShared] = useState<ShareEntry[]>([
    { ...MOCK_PEOPLE[0], access: "run" },
    { ...MOCK_GROUPS[0], access: "run" },
  ]);
  const [copied, setCopied] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const allOptions = [...MOCK_PEOPLE, ...MOCK_GROUPS];
  const filtered = allOptions.filter(
    (o) => !shared.find((s) => s.id === o.id) &&
      (o.name.toLowerCase().includes(query.toLowerCase()) ||
       o.sub.toLowerCase().includes(query.toLowerCase()))
  );

  function addEntry(entry: Omit<ShareEntry, "access">) {
    setShared((prev) => [...prev, { ...entry, access: "run" }]);
    setQuery("");
    setShowDropdown(false);
  }

  function removeEntry(id: string) {
    setShared((prev) => prev.filter((e) => e.id !== id));
  }

  function setEntryAccess(id: string, access: ShareAccessLevel) {
    setShared((prev) => prev.map((e) => e.id === id ? { ...e, access } : e));
  }

  function handleCopy() {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-[480px] rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <h2 className="text-[15px] font-semibold text-foreground">Share "{helperName}"</h2>
            <p className="mt-0.5 text-[13px] text-muted-foreground">Invite people or groups</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">

          {/* Add people / groups input */}
          <div className="relative">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 transition-all focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10">
              <UserPlus className="h-4 w-4 shrink-0 text-muted-foreground/60" />
              <input
                type="text"
                placeholder="Add people or groups..."
                value={query}
                onChange={(e) => { setQuery(e.target.value); setShowDropdown(true); }}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                className="flex-1 bg-transparent text-[14px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
              />
            </div>

            {showDropdown && (
              <div className="absolute top-full left-0 right-0 z-10 mt-1 rounded-xl border border-border bg-white shadow-lg overflow-hidden">
                {query.length === 0 && (
                  <div className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground/60">Suggestions</div>
                )}
                {filtered.length === 0 ? (
                  <div className="px-4 py-3 text-[13px] text-muted-foreground">No matches found</div>
                ) : (
                  filtered.slice(0, 6).map((entry) => (
                    <button
                      key={entry.id}
                      onMouseDown={() => addEntry(entry)}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-muted/40"
                    >
                      <div className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold", entry.color)}>
                        {entry.initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-medium text-foreground">{entry.name}</p>
                        <p className="text-[12px] text-muted-foreground">{entry.sub}</p>
                      </div>
                      {entry.type === "group" && (
                        <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">Group</span>
                      )}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Shared with list */}
          {shared.length > 0 && (
            <div>
              <p className="mb-2.5 text-[12px] font-semibold uppercase tracking-wide text-muted-foreground">Shared with</p>
              <div className="space-y-1">
                {shared.map((entry) => (
                  <div key={entry.id} className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted/30 transition-colors group">
                    <div className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold", entry.color)}>
                      {entry.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <p className="text-[13px] font-medium text-foreground truncate">{entry.name}</p>
                        {entry.type === "group" && (
                          <span className="shrink-0 rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">Group</span>
                        )}
                      </div>
                      <p className="text-[12px] text-muted-foreground truncate">{entry.sub}</p>
                    </div>
                    <AccessPill value={entry.access} onChange={(v) => setEntryAccess(entry.id, v)} />
                    <button
                      onClick={() => removeEntry(entry.id)}
                      className="hidden group-hover:flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Org-wide access */}
          <div className="rounded-xl border border-border bg-muted/20 p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-foreground">Anyone in your org</p>
                  <p className="text-[12px] text-muted-foreground">
                    {orgOpen ? "All teammates can find and use this agent" : "Only invited people can access"}
                  </p>
                </div>
              </div>
              <OrgToggle value={orgOpen} onChange={setOrgOpen} />
            </div>
          </div>

          {/* Copy link */}
          <button
            onClick={handleCopy}
            className="flex w-full items-center justify-between rounded-xl border border-border bg-white px-4 py-3 text-left transition-all hover:bg-muted/30"
          >
            <div className="flex items-center gap-2.5">
              <Link2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-[13px] font-medium text-foreground">Copy link</span>
            </div>
            {copied ? (
              <span className="flex items-center gap-1 text-[12px] font-semibold text-emerald-600">
                <Check className="h-3.5 w-3.5" /> Copied!
              </span>
            ) : (
              <span className="text-[12px] text-muted-foreground">Share via link</span>
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-border px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-border px-4 py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-muted/40"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="rounded-lg bg-primary px-4 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── KPI section title derivation ─── */

function deriveKPITitle(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("pipeline") || n.includes("deal") || n.includes("proposal") || n.includes("crm"))
    return "Top Pipeline KPIs";
  if (n.includes("lead") || n.includes("prospect") || n.includes("outreach") || n.includes("follow-up"))
    return "Top Sales KPIs";
  if (n.includes("resume") || n.includes("recruit") || n.includes("candidate") || n.includes("interview") || n.includes("offer") || n.includes("hire"))
    return "Top Recruitment KPIs";
  if (n.includes("content") || n.includes("blog") || n.includes("social") || n.includes("campaign") || n.includes("marketing"))
    return "Top Marketing KPIs";
  if (n.includes("onboard") || n.includes("employee") || n.includes("pto") || n.includes("benefits") || n.includes("hr"))
    return "Top HR KPIs";
  if (n.includes("revenue") || n.includes("forecast") || n.includes("finance") || n.includes("budget") || n.includes("invoice"))
    return "Top Finance KPIs";
  if (n.includes("code") || n.includes("pr") || n.includes("deploy") || n.includes("bug") || n.includes("incident") || n.includes("sprint"))
    return "Top Engineering KPIs";
  if (n.includes("board") || n.includes("okr") || n.includes("executive") || n.includes("strategy"))
    return "Top Leadership KPIs";
  return "Top Business KPIs";
}

/* ─── Page ─── */

export default function HelperDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { variant } = useVariant();
  const { persona } = usePersona();
  const [showShare, setShowShare] = useState(false);
  const [prompt, setPrompt] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const agentLabel  = variant.agentLabel;   // "Helper" or "Agent"
  const agentsLabel = variant.agentsLabel;  // "Helpers" or "Agents"

  function openChat(q: string) {
    router.push(`/assistant?q=${encodeURIComponent(q)}`);
  }

  const slug   = toSlug(decodeURIComponent(id ?? ""));
  const helper = getHelperDetail(slug);



  // Related workflows this helper can trigger
  const relatedWorkflows = (PERSONA_WORKFLOWS[persona.id]?.mine ?? []).slice(0, 3);

  if (!helper) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
        <Bot className="h-12 w-12 text-muted-foreground/30" />
        <p className="text-[15px] font-semibold text-foreground">{agentLabel} not found</p>
        <p className="text-[14px] text-muted-foreground">We don&apos;t have a page for &ldquo;{id}&rdquo; yet.</p>
        <button onClick={() => router.back()} className="text-[14px] font-medium text-primary hover:underline">
          Go back
        </button>
      </div>
    );
  }

  const chips = getChips(helper.name);

  return (
    <div className="min-h-full">

      {showShare && <ShareModal helperName={helper.name} onClose={() => setShowShare(false)} />}

      {/* ── Sticky page nav ── */}
      <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-white/90 px-6 py-3 backdrop-blur-md">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-[14px] font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back to {agentsLabel}</span>
        </button>

        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-[15px] leading-none">
            {helper.emoji}
          </div>
          <span className="text-[14px] font-semibold text-foreground">{helper.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowShare(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-[13px] font-medium text-foreground shadow-sm transition-all hover:bg-muted/40"
          >
            <Share2 className="h-3 w-3 text-muted-foreground" />
            Share
          </button>
          <button
            onClick={() => router.push(`/helpers/new?from=${id}`)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-[13px] font-medium text-foreground shadow-sm transition-all hover:bg-muted/40"
          >
            <Pencil className="h-3 w-3 text-muted-foreground" />
            Edit
          </button>
        </div>
      </div>

      {/* ── Hero / prompt area ── */}
      <div className="bg-gradient-to-b from-blue-100 via-indigo-50/60 to-[#F0F4FF] px-6 pb-14 pt-12">
        <div className="mx-auto max-w-2xl">

          {/* Helper identity */}
          <div className="mb-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md text-[30px] leading-none">
                  {helper.emoji}
                </div>
                <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-400" />
              </div>
            </div>
            <h1 className="text-[26px] font-bold tracking-tight text-foreground">{helper.name}</h1>
            <p className="mx-auto mt-2 max-w-sm text-[14px] leading-relaxed text-muted-foreground">
              {helper.description}
            </p>

            {/* Workflows callout — shown in Helpers variant */}
            {variant.id === "helpers" && relatedWorkflows.length > 0 && (
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-3 py-1.5 text-[13px] text-muted-foreground backdrop-blur-sm">
                <Workflow className="h-3.5 w-3.5 text-primary" />
                <span>This {agentLabel.toLowerCase()} can trigger{" "}
                  <span className="font-semibold text-foreground">{relatedWorkflows.length} workflows</span>
                </span>
                <Link href="/workflows" className="flex items-center gap-0.5 font-medium text-primary hover:underline">
                  View <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            )}
          </div>

          {/* ── Prompt bar ── */}
          <div className="rounded-2xl border border-white/80 bg-white shadow-lg">
            <div className="px-5 pt-4">
              <textarea
                ref={inputRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (prompt.trim()) { openChat(prompt.trim()); setPrompt(""); }
                  }
                }}
                placeholder={`Ask ${helper.name} anything…`}
                rows={2}
                className="w-full resize-none bg-transparent text-[15px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-between px-4 pb-3 pt-2">
              <div className="flex items-center gap-1.5">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground/60 transition-colors hover:bg-muted hover:text-foreground">
                  <Paperclip className="h-4 w-4" />
                </button>
                <button className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[13px] font-medium text-foreground/70 transition-colors hover:bg-muted">
                  All data <span className="text-muted-foreground/40">▾</span>
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground/60 transition-colors hover:bg-muted hover:text-foreground">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground/60 transition-colors hover:bg-muted hover:text-foreground">
                  <SlidersHorizontal className="h-4 w-4" />
                </button>
                <button
                  onClick={() => { if (prompt.trim()) { openChat(prompt.trim()); setPrompt(""); } }}
                  disabled={!prompt.trim()}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full transition-all",
                    prompt.trim() ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90" : "bg-muted text-muted-foreground/40"
                  )}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Suggestion chips */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {chips.map((chip) => (
              <button
                key={chip}
                onClick={() => { setPrompt(chip); inputRef.current?.focus(); }}
                className="rounded-full border border-white/70 bg-white/60 px-3.5 py-1.5 text-[13px] font-medium text-foreground/70 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-white hover:text-primary"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Performance & Activity ── */}
      <div className="bg-[#F0F4FF]">
        <div className="mx-auto max-w-6xl space-y-12 px-6 py-10">

          {/* ── Section 1: KPI cards ── */}
          <div>
            <div className="mb-5 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-[15px] font-semibold text-foreground">{deriveKPITitle(helper.name)}</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {helper.metrics.map((m) => {
                const Icon = METRIC_ICONS[m.iconId];
                const { icon: iconCls, bg: bgCls } = METRIC_ACCENT_CLASSES[m.accent];
                return (
                  <div key={m.label} className="rounded-2xl border border-border bg-white px-5 py-5 shadow-sm">
                    <div className={cn("mb-3 flex h-9 w-9 items-center justify-center rounded-xl", bgCls)}>
                      <Icon className={cn("h-[18px] w-[18px]", iconCls)} />
                    </div>
                    <p className="text-[13px] font-medium text-muted-foreground">{m.label}</p>
                    <div className="mt-1 flex items-end gap-1.5">
                      <span className="text-[28px] font-bold leading-none tracking-tight text-foreground">{m.value}</span>
                      <span className="mb-0.5 text-[13px] text-muted-foreground">{m.sub}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-1">
                      {m.up === true  && <TrendingUp   className="h-3 w-3 text-emerald-500" />}
                      {m.up === false && <TrendingDown  className="h-3 w-3 text-red-400" />}
                      <span className={cn("text-[12px] font-medium",
                        m.up === true ? "text-emerald-600" : m.up === false ? "text-red-500" : "text-muted-foreground"
                      )}>
                        {m.trend}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="border-t border-border/60" />

          {/* ── Section 2: Agent Activity ── */}
          <div>
            <div className="mb-5 flex items-center gap-2">
              <Zap className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-[15px] font-semibold text-foreground">{agentLabel} Activity</h2>
            </div>

            {/* Chart */}
            <div className="mb-6">
              <ActivityChart data={helper.chartData} label={helper.chartLabel} />
            </div>

            {/* Two-col */}
            <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
              <RecentActivity title={helper.activityTitle} items={helper.activity} agentLabel={agentLabel} />
              <KnowledgeGaps title={helper.gapsTitle} subtitle={helper.gapsSubtitle} items={helper.gaps} agentLabel={agentLabel} />
            </div>
          </div>

          {/* ── Workflows this helper can run (Helpers variant) ── */}
          {variant.id === "helpers" && relatedWorkflows.length > 0 && (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Workflow className="h-4 w-4 text-primary" />
                  <h2 className="text-[15px] font-semibold text-foreground">
                    Workflows this {agentLabel} can run
                  </h2>
                </div>
                <Link
                  href="/workflows"
                  className="flex items-center gap-1 text-[14px] font-medium text-primary hover:underline"
                >
                  View all <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {relatedWorkflows.map((wf) => (
                  <div key={wf.id} className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4 shadow-sm transition-all hover:border-primary/20 hover:shadow-md">
                    <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg", wf.color)}>
                      {wf.emoji}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[14px] font-semibold text-foreground">{wf.name}</p>
                      <p className="mt-0.5 text-[13px] leading-snug text-muted-foreground line-clamp-2">{wf.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}



        </div>
      </div>
    </div>
  );
}
