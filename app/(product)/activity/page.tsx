"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Activity, ArrowUpRight } from "lucide-react";
import { ALL_HELPERS, toSlug } from "@/lib/helper-detail-data";
import type { ResolutionColor } from "@/lib/helper-detail-data";
import { cn } from "@/lib/utils";

// ─── Types ─────────────────────────────────────────────────────────────────

interface FeedItem {
  helperName: string;
  helperEmoji: string;
  helperSlug: string;
  initials: string;
  action: string;
  resolution: string;
  resolutionColor: ResolutionColor;
  time: string;
  sortKey: number;
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function parseMinutes(time: string): number {
  if (/^\d/.test(time) && time.includes("min")) return parseInt(time, 10);
  if (/^\d/.test(time) && time.includes("hr")) return parseInt(time, 10) * 60;
  if (time === "Yesterday") return 24 * 60;
  if (/^\d/.test(time) && time.includes("day")) return parseInt(time, 10) * 24 * 60;
  if (/^\d/.test(time) && time.includes("week")) return parseInt(time, 10) * 7 * 24 * 60;
  return 99999;
}

function getPeriod(sortKey: number): "Today" | "Yesterday" | "Earlier" {
  if (sortKey < 24 * 60) return "Today";
  if (sortKey < 2 * 24 * 60) return "Yesterday";
  return "Earlier";
}

const RESOLUTION_STYLES: Record<ResolutionColor, string> = {
  green:  "bg-emerald-50 text-emerald-700 border border-emerald-200",
  amber:  "bg-amber-50  text-amber-700  border border-amber-200",
  blue:   "bg-sky-50    text-sky-700    border border-sky-200",
  red:    "bg-red-50    text-red-700    border border-red-200",
  violet: "bg-violet-50 text-violet-700 border border-violet-200",
};

const RESOLUTION_DOT: Record<ResolutionColor, string> = {
  green:  "bg-emerald-400",
  amber:  "bg-amber-400",
  blue:   "bg-sky-400",
  red:    "bg-red-400",
  violet: "bg-violet-400",
};

// ─── Filter config ─────────────────────────────────────────────────────────

type FilterId = "all" | "attention" | "completed" | "escalated";

const FILTER_TABS: { id: FilterId; label: string }[] = [
  { id: "all",       label: "All activity"      },
  { id: "attention", label: "Needs attention"   },
  { id: "completed", label: "Completed"         },
  { id: "escalated", label: "Escalated"         },
];

const ATTENTION_COLORS: ResolutionColor[] = ["amber", "red"];
const COMPLETED_COLORS: ResolutionColor[] = ["green"];
const ESCALATED_KEYWORDS = ["escalat", "block", "flag", "p1"];

function matchesFilter(item: FeedItem, filter: FilterId): boolean {
  if (filter === "all") return true;
  if (filter === "attention") return ATTENTION_COLORS.includes(item.resolutionColor);
  if (filter === "completed") return COMPLETED_COLORS.includes(item.resolutionColor);
  if (filter === "escalated")
    return ESCALATED_KEYWORDS.some((k) =>
      item.resolution.toLowerCase().includes(k) ||
      item.action.toLowerCase().includes(k)
    );
  return true;
}

// ─── Build feed ────────────────────────────────────────────────────────────

const ALL_FEED_ITEMS: FeedItem[] = ALL_HELPERS.flatMap((helper) =>
  helper.activity.map((act) => ({
    helperName:  helper.name,
    helperEmoji: helper.emoji,
    helperSlug:  toSlug(helper.name),
    initials:    act.initials,
    action:      act.action,
    resolution:  act.resolution,
    resolutionColor: act.resolutionColor,
    time:        act.time,
    sortKey:     parseMinutes(act.time),
  }))
).sort((a, b) => a.sortKey - b.sortKey);

// ─── Sub-components ────────────────────────────────────────────────────────

function PeriodDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/50">
        {label}
      </span>
      <div className="flex-1 border-t border-border/50" />
    </div>
  );
}

function FeedCard({ item }: { item: FeedItem }) {
  return (
    <div className="group flex gap-4 rounded-2xl border border-border/60 bg-white px-5 py-4 shadow-sm transition-all duration-150 hover:border-primary/20 hover:shadow-md">
      {/* Left: helper emoji avatar */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-[20px] leading-none">
        {item.helperEmoji}
      </div>

      {/* Right: all content */}
      <div className="min-w-0 flex-1">
        {/* Header row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <Link
              href={`/helpers/${item.helperSlug}`}
              className="flex items-center gap-1 text-[13px] font-semibold text-foreground hover:text-primary truncate"
            >
              {item.helperName}
              <ArrowUpRight className="h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-60" />
            </Link>
            <span className="shrink-0 text-[12px] text-muted-foreground/50">·</span>
            <span className="shrink-0 text-[12px] text-muted-foreground/60">{item.time}</span>
          </div>

          {/* Resolution badge */}
          <span
            className={cn(
              "shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium",
              RESOLUTION_STYLES[item.resolutionColor]
            )}
          >
            {item.resolution}
          </span>
        </div>

        {/* Action text */}
        <p className="mt-2 text-[14px] leading-relaxed text-foreground/80">
          {item.action}
        </p>

        {/* Footer: person initials if present */}
        {item.initials !== "—" && (
          <div className="mt-3 flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-muted-foreground">
              {item.initials.replace(/\./g, "").slice(0, 2)}
            </div>
            <span className="text-[11px] text-muted-foreground/60">{item.initials}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function ActivityPage() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");

  const filtered = useMemo(
    () => ALL_FEED_ITEMS.filter((item) => matchesFilter(item, activeFilter)),
    [activeFilter]
  );

  // Group by period
  const grouped = useMemo(() => {
    const map = new Map<string, FeedItem[]>();
    for (const item of filtered) {
      const period = getPeriod(item.sortKey);
      if (!map.has(period)) map.set(period, []);
      map.get(period)!.push(item);
    }
    return map;
  }, [filtered]);

  const periods: ("Today" | "Yesterday" | "Earlier")[] = ["Today", "Yesterday", "Earlier"];

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Activity className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Activity</h1>
            <p className="text-[13px] text-muted-foreground">
              Everything your helpers have done, in one feed
            </p>
          </div>
        </div>

        {/* Live indicator */}
        <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          <span className="text-[12px] font-medium text-emerald-700">Live</span>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="mt-8 mx-auto max-w-3xl flex items-center gap-1.5 overflow-x-auto pb-1">
        {FILTER_TABS.map((tab) => {
          const count =
            tab.id === "all"
              ? ALL_FEED_ITEMS.length
              : ALL_FEED_ITEMS.filter((i) => matchesFilter(i, tab.id)).length;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-all",
                activeFilter === tab.id
                  ? "bg-primary text-white shadow-sm"
                  : "border border-border bg-white text-muted-foreground hover:border-primary/30 hover:text-foreground"
              )}
            >
              {tab.label}
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                  activeFilter === tab.id
                    ? "bg-white/20 text-white"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Feed — single centered column */}
      <div className="mt-6 mx-auto max-w-3xl space-y-8">
        {periods.map((period) => {
          const items = grouped.get(period);
          if (!items || items.length === 0) return null;

          return (
            <div key={period}>
              <PeriodDivider label={period} />
              <div className="mt-3 flex flex-col gap-2">
                {items.map((item, i) => (
                  <FeedCard key={`${item.helperSlug}-${i}`} item={item} />
                ))}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted/60 text-2xl">
              ✅
            </div>
            <p className="mt-4 text-[15px] font-medium text-foreground">All clear</p>
            <p className="mt-1 text-[13px] text-muted-foreground">
              No activity matches this filter right now.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
