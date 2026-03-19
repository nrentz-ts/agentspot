"use client";

import { useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Clock,
  Star,
  MessageSquare,
  AlertCircle,
  Pencil,
  Pause,
  Play,
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

/* ─── Suggestion chips per helper slug ─── */
const SUGGESTION_CHIPS: Record<string, string[]> = {};
const DEFAULT_CHIPS = [
  "Summarize today's activity",
  "What needs my attention?",
  "Show recent escalations",
  "How am I performing this week?",
];

function getChips(name: string): string[] {
  const slug = toSlug(name);
  return SUGGESTION_CHIPS[slug] ?? DEFAULT_CHIPS;
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
          <p className="mt-0.5 text-[12px] text-muted-foreground">Last 7 days</p>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-[12px] font-semibold text-primary">
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
                  className={cn(
                    "w-full rounded-t-md transition-all duration-300",
                    isLast ? "bg-primary" : "bg-primary/20 group-hover:bg-primary/40"
                  )}
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

function RecentActivity({ title, items }: { title: string; items: HelperDetailData["activity"] }) {
  return (
    <div className="rounded-2xl border border-border bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h3 className="text-[15px] font-semibold text-foreground">{title}</h3>
        <button className="flex items-center gap-1 text-[12px] font-medium text-primary hover:underline">
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
                <p className="truncate text-[13px] font-medium text-foreground">{item.action}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className={cn("inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold", cls.bg, cls.text)}>
                    {item.resolution}
                  </span>
                  <span className="text-[11px] text-muted-foreground/60">{item.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function KnowledgeGaps({ title, subtitle, items }: { title: string; subtitle: string; items: HelperDetailData["gaps"] }) {
  const [added, setAdded] = useState<Set<number>>(new Set());

  return (
    <div className="rounded-2xl border border-border bg-white shadow-sm">
      <div className="border-b border-border px-5 py-4">
        <h3 className="text-[15px] font-semibold text-foreground">{title}</h3>
        <p className="mt-0.5 text-[12px] text-muted-foreground">{subtitle}</p>
      </div>
      <div className="divide-y divide-border">
        {items.map((gap) => {
          const isAdded = added.has(gap.id);
          return (
            <div key={gap.id} className="px-5 py-4">
              <p className="text-[13px] font-medium leading-snug text-foreground">{gap.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[12px] text-muted-foreground">
                  Came up <span className="font-semibold text-foreground">{gap.count}×</span> this week
                </span>
                <button
                  onClick={() => setAdded((prev) => { const n = new Set(prev); n.add(gap.id); return n; })}
                  disabled={isAdded}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-all",
                    isAdded
                      ? "cursor-default bg-emerald-50 text-emerald-700"
                      : "bg-primary/8 text-primary hover:bg-primary/15"
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

/* ─── Page ─── */

export default function HelperDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [paused, setPaused] = useState(false);
  const [prompt, setPrompt] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  function openChat(q: string) {
    router.push(`/assistant?q=${encodeURIComponent(q)}`);
  }

  const slug = toSlug(decodeURIComponent(id ?? ""));
  const helper = getHelperDetail(slug);

  if (!helper) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
        <Bot className="h-12 w-12 text-muted-foreground/30" />
        <p className="text-[15px] font-semibold text-foreground">Helper not found</p>
        <p className="text-[13px] text-muted-foreground">We don&apos;t have a page for &ldquo;{id}&rdquo; yet.</p>
        <button onClick={() => router.back()} className="text-[13px] font-medium text-primary hover:underline">
          Go back
        </button>
      </div>
    );
  }

  const chips = getChips(helper.name);

  return (
    <div className="min-h-full">

      {/* ── Sticky page nav ── */}
      <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-white/90 px-6 py-3 backdrop-blur-md">
        {/* Left: back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back to Helpers</span>
        </button>

        {/* Center: helper identity */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-[15px] leading-none">
            {helper.emoji}
          </div>
          <span className="text-[14px] font-semibold text-foreground">{helper.name}</span>
          <span className={cn(
            "flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold",
            paused ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"
          )}>
            <span className={cn("h-1.5 w-1.5 rounded-full", paused ? "bg-amber-500" : "bg-emerald-500 animate-pulse")} />
            {paused ? "Paused" : "Active"}
          </span>
        </div>

        {/* Right: CTAs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push(`/helpers/new?from=${id}`)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-[12px] font-medium text-foreground shadow-sm transition-all hover:bg-muted/40"
          >
            <Pencil className="h-3 w-3 text-muted-foreground" />
            Edit
          </button>
          <button
            onClick={() => setPaused((v) => !v)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12px] font-medium transition-all",
              paused
                ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                : "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
            )}
          >
            {paused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
            {paused ? "Resume" : "Pause"}
          </button>
        </div>
      </div>

      {/* ── Hero / prompt area ── */}
      <div className="bg-gradient-to-b from-blue-100 via-indigo-50/60 to-[#F0F4FF] px-6 pb-14 pt-12">
        <div className="mx-auto max-w-2xl">

          {/* Helper identity hero */}
          <div className="mb-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md text-[30px] leading-none">
                  {helper.emoji}
                </div>
                <span className={cn(
                  "absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white",
                  paused ? "bg-amber-400" : "bg-emerald-400"
                )} />
              </div>
            </div>
            <h1 className="text-[26px] font-bold tracking-tight text-foreground">
              {helper.name}
            </h1>
            <p className="mx-auto mt-2 max-w-sm text-[14px] leading-relaxed text-muted-foreground">
              {helper.description}
            </p>
          </div>

          {/* ── Big prompt bar ── */}
          <div className="rounded-2xl border border-white/80 bg-white shadow-lg">
            {/* Input */}
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

            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 pb-3 pt-2">
              <div className="flex items-center gap-1.5">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground/60 transition-colors hover:bg-muted hover:text-foreground">
                  <Paperclip className="h-4 w-4" />
                </button>
                <button className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[12px] font-medium text-foreground/70 transition-colors hover:bg-muted">
                  All data
                  <span className="text-muted-foreground/40">▾</span>
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
                    prompt.trim()
                      ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                      : "bg-muted text-muted-foreground/40"
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
                onClick={() => {
                  setPrompt(chip);
                  inputRef.current?.focus();
                }}
                className="rounded-full border border-white/70 bg-white/60 px-3.5 py-1.5 text-[12px] font-medium text-foreground/70 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-white hover:text-primary"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Performance & Activity ── */}
      <div className="bg-[#F0F4FF]">
        <div className="mx-auto max-w-6xl px-6 py-10">

          {/* Section header */}
          <div className="mb-6 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-[15px] font-semibold text-foreground">Performance & Activity</h2>
          </div>

          {/* Metrics */}
          <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {helper.metrics.map((m) => {
              const Icon = METRIC_ICONS[m.iconId];
              const { icon: iconCls, bg: bgCls } = METRIC_ACCENT_CLASSES[m.accent];
              return (
                <div key={m.label} className="rounded-2xl border border-border bg-white px-5 py-5 shadow-sm">
                  <div className={cn("mb-3 flex h-9 w-9 items-center justify-center rounded-xl", bgCls)}>
                    <Icon className={cn("h-[18px] w-[18px]", iconCls)} />
                  </div>
                  <p className="text-[12px] font-medium text-muted-foreground">{m.label}</p>
                  <div className="mt-1 flex items-end gap-1.5">
                    <span className="text-[28px] font-bold leading-none tracking-tight text-foreground">{m.value}</span>
                    <span className="mb-0.5 text-[12px] text-muted-foreground">{m.sub}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    {m.up === true  && <TrendingUp   className="h-3 w-3 text-emerald-500" />}
                    {m.up === false && <TrendingDown  className="h-3 w-3 text-red-400" />}
                    <span className={cn(
                      "text-[11px] font-medium",
                      m.up === true ? "text-emerald-600" : m.up === false ? "text-red-500" : "text-muted-foreground"
                    )}>
                      {m.trend}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chart */}
          <div className="mb-6">
            <ActivityChart data={helper.chartData} label={helper.chartLabel} />
          </div>

          {/* Two-col */}
          <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
            <RecentActivity title={helper.activityTitle} items={helper.activity} />
            <KnowledgeGaps title={helper.gapsTitle} subtitle={helper.gapsSubtitle} items={helper.gaps} />
          </div>
        </div>
      </div>
    </div>
  );
}
