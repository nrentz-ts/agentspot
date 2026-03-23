"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  SlidersHorizontal,
  ArrowUp,
  Bell,
  ChevronDown,
  LayoutDashboard,
  Database,
  Code2,
  Sparkles,
  Zap,
  BookOpen,
  List,
  AlertCircle,
  FlaskConical,
  FolderOpen,
  Star,
  BarChart2,
  ChevronRight,
  TrendingDown,
  AtSign,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Mock data ──────────────────────────────────────────────────────────────

const RECENTS = [
  { id: 1, label: "Sales by state and region", time: "yesterday" },
  { id: 2, label: "Sales by state and region", time: "2 days ago" },
  { id: 3, label: "Sales by state and region", time: "4 days ago" },
  { id: 4, label: "Sales by state and region", time: "1 week ago" },
  { id: 5, label: "Sales by state and region", time: "2 weeks ago" },
];

const FAVOURITES = [
  { id: 1, label: "Retails Sales",                icon: BarChart2, dot: null  },
  { id: 2, label: "Total sales, Total quantity pu…", icon: BarChart2, dot: null  },
  { id: 3, label: "Cloud Clusters",               icon: BarChart2, dot: "red" },
  { id: 4, label: "Sales by state and region",    icon: BarChart2, dot: "red" },
  { id: 5, label: "Retails Sales",                icon: BarChart2, dot: null  },
];

const ACTION_CHIPS = [
  { label: "Quick search",        icon: Search    },
  { label: "Deep analysis",       icon: FlaskConical },
  { label: "Know your data",      icon: Database  },
  { label: "Create Liveboards",   icon: LayoutDashboard, badge: "New" },
];

// ─── Sidebar ────────────────────────────────────────────────────────────────

function TSNavItem({
  icon: Icon,
  label,
  active,
  indent,
  dot,
  href,
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  indent?: boolean;
  dot?: string | null;
  href?: string;
}) {
  const cls = cn(
    "flex w-full items-center gap-2.5 rounded-md px-2.5 py-[7px] text-[13px] transition-colors",
    active
      ? "bg-white/10 font-semibold text-white"
      : "text-[#8FA3C0] hover:bg-white/5 hover:text-white",
    indent && "pl-4"
  );

  if (href) {
    return (
      <Link href={href} className={cls}>
        <Icon className="h-4 w-4 shrink-0" />
        <span className="flex-1 truncate">{label}</span>
        {dot && <span className={cn("h-2 w-2 rounded-full", dot === "red" ? "bg-red-400" : "bg-emerald-400")} />}
      </Link>
    );
  }

  return (
    <button className={cls}>
      <Icon className="h-4 w-4 shrink-0" />
      <span className="flex-1 truncate text-left">{label}</span>
      {dot && <span className={cn("h-2 w-2 rounded-full", dot === "red" ? "bg-red-400" : "bg-emerald-400")} />}
    </button>
  );
}

function TSSidebar() {
  return (
    <aside className="flex h-screen w-[260px] shrink-0 flex-col overflow-y-auto bg-[#15192B]">
      {/* Logo row */}
      <div className="flex h-14 items-center gap-3 border-b border-white/8 px-4">
        {/* ThoughtSpot-style logo mark */}
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#4263EB]">
          <span className="text-[13px] font-bold text-white">T</span>
        </div>
        {/* Tab icons */}
        <div className="flex items-center gap-1 pl-1">
          <button className="flex h-7 w-7 items-center justify-center rounded text-white/80 hover:bg-white/10">
            <BarChart2 className="h-4 w-4" />
          </button>
          <button className="flex h-7 w-7 items-center justify-center rounded text-white/30 hover:bg-white/10 hover:text-white/80">
            <Database className="h-4 w-4" />
          </button>
          <button className="flex h-7 w-7 items-center justify-center rounded text-white/30 hover:bg-white/10 hover:text-white/80">
            <Code2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-3 pt-3 pb-2">
        <div className="flex items-center gap-2 rounded-md bg-white/8 px-2.5 py-2">
          <Search className="h-3.5 w-3.5 shrink-0 text-white/30" />
          <span className="text-[12px] text-white/30">Search in your library</span>
        </div>
      </div>

      {/* Insights section */}
      <div className="px-3 pb-1">
        <div className="flex items-center justify-between px-2.5 py-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-white/30">Insights</span>
          <button className="flex h-5 w-5 items-center justify-center rounded text-white/30 hover:bg-white/10 hover:text-white/60">
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
        <TSNavItem icon={LayoutDashboard} label="Home" active />
        <TSNavItem icon={Zap}             label="Spotter" />
        <TSNavItem icon={Sparkles}        label="AgentSpot" href="/onboarding" />
        <TSNavItem icon={Search}          label="Search data" />
      </div>

      {/* Library */}
      <div className="px-3 pb-1 pt-2">
        <div className="px-2.5 py-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-white/30">Library</span>
        </div>
        <TSNavItem icon={LayoutDashboard} label="Liveboards" />
        <TSNavItem icon={BookOpen}        label="Answers" />
      </div>

      {/* Analysis & Alerts */}
      <div className="px-3 pb-1 pt-2">
        <div className="px-2.5 py-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-white/30">Analysis &amp; Alerts</span>
        </div>
        <TSNavItem icon={AlertCircle}  label="Subscriptions" />
        <TSNavItem icon={FlaskConical} label="SpotIQ analysis" />
      </div>

      {/* Collections */}
      <div className="px-3 pb-1 pt-2">
        <TSNavItem icon={FolderOpen} label="Collections" />
      </div>

      {/* Favourites */}
      <div className="px-3 pb-2 pt-2">
        <div className="px-2.5 py-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-white/30">Favourites</span>
        </div>
        {FAVOURITES.map((f) => (
          <button
            key={f.id}
            className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-[6px] text-[12px] text-[#8FA3C0] transition-colors hover:bg-white/5 hover:text-white"
          >
            {f.dot ? (
              <span className={cn("h-2 w-2 shrink-0 rounded-full", f.dot === "red" ? "bg-red-400" : "bg-emerald-400")} />
            ) : (
              <f.icon className="h-3.5 w-3.5 shrink-0 text-white/30" />
            )}
            <span className="truncate text-left">{f.label}</span>
          </button>
        ))}
        <button className="mt-1 px-2.5 py-1 text-[12px] text-[#4263EB] hover:underline">
          Show more
        </button>
      </div>
    </aside>
  );
}

// ─── Top bar ────────────────────────────────────────────────────────────────

function TSTopBar() {
  return (
    <header className="flex h-12 shrink-0 items-center justify-end gap-3 border-b border-[#E1E8F4] bg-white px-5">
      {/* Search */}
      <div className="flex flex-1 max-w-xs items-center gap-2 rounded-lg border border-[#E1E8F4] bg-[#F3F6FB] px-3 py-1.5">
        <Search className="h-3.5 w-3.5 text-[#6B7A9A]" />
        <span className="text-[13px] text-[#9AABBD]">Search in your library</span>
      </div>

      <button className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6B7A9A] transition-colors hover:bg-[#F3F6FB]">
        <span className="text-[14px] font-bold">?</span>
      </button>

      <button className="relative flex h-8 w-8 items-center justify-center rounded-lg text-[#6B7A9A] transition-colors hover:bg-[#F3F6FB]">
        <Bell className="h-4 w-4" />
        <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-400" />
      </button>

      <button className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[13px] text-[#1A1D2E] transition-colors hover:bg-[#F3F6FB]">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#4263EB] text-[11px] font-bold text-white">
          R
        </div>
        <span className="font-medium">Royal Enfield</span>
        <ChevronDown className="h-3.5 w-3.5 text-[#6B7A9A]" />
      </button>
    </header>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function ThoughtSpotPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="flex h-screen overflow-hidden bg-[#F3F6FB]">
      <TSSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TSTopBar />

        <main className="flex-1 overflow-y-auto px-8 py-10">
          {/* Hero search */}
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 text-center text-[26px] font-bold leading-snug text-[#1A1D2E]">
              Lets take a{" "}
              <span className="text-[#4263EB]">deep dive</span>{" "}
              into your data.
            </h1>

            {/* Search bar */}
            <div className="rounded-xl border border-[#E1E8F4] bg-white shadow-sm">
              <div className="px-4 pt-4 pb-2">
                <div className="flex items-start gap-2">
                  <AtSign className="mt-0.5 h-4 w-4 shrink-0 text-[#9AABBD]" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask me a question. Use '@' to select columns and values."
                    className="flex-1 bg-transparent text-[14px] text-[#1A1D2E] outline-none placeholder:text-[#9AABBD]"
                  />
                </div>
              </div>

              {/* Toolbar */}
              <div className="flex items-center gap-2 border-t border-[#F3F6FB] px-4 py-2.5">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-[#4263EB] transition-colors hover:bg-[#4263EB]/10">
                  <BarChart2 className="h-4 w-4" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-[#4263EB] transition-colors hover:bg-[#4263EB]/10">
                  <List className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-1.5 rounded-full border border-[#E1E8F4] px-3 py-1 text-[13px] text-[#1A1D2E]">
                  All data model
                  <ChevronDown className="h-3.5 w-3.5 text-[#6B7A9A]" />
                </div>
                <button className="flex h-7 w-7 items-center justify-center rounded-full text-[#4263EB] transition-colors hover:bg-[#4263EB]/10">
                  <Plus className="h-4 w-4" />
                </button>
                <div className="flex-1" />
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6B7A9A] transition-colors hover:bg-[#F3F6FB]">
                  <SlidersHorizontal className="h-4 w-4" />
                </button>
                <button
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full transition-colors",
                    query.trim()
                      ? "bg-[#4263EB] text-white shadow-sm"
                      : "bg-[#E8EEF8] text-[#9AABBD]"
                  )}
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Action chips */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {ACTION_CHIPS.map((chip) => (
                <button
                  key={chip.label}
                  className="flex items-center gap-1.5 rounded-full border border-[#E1E8F4] bg-white px-3.5 py-1.5 text-[13px] text-[#1A1D2E] shadow-sm transition-colors hover:border-[#4263EB]/30 hover:bg-[#F0F4FF]"
                >
                  <chip.icon className="h-3.5 w-3.5 text-[#4263EB]" />
                  {chip.label}
                  {chip.badge && (
                    <span className="rounded-full bg-[#4263EB] px-1.5 py-0.5 text-[10px] font-semibold text-white">
                      {chip.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Recents + Watchlist */}
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-5">

            {/* Recents */}
            <div className="rounded-xl border border-[#E1E8F4] bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-[14px] font-semibold text-[#1A1D2E]">Recents</h2>
              <div className="space-y-1">
                {RECENTS.map((item) => (
                  <button
                    key={item.id}
                    className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-[#F3F6FB]"
                  >
                    <Zap className="h-4 w-4 shrink-0 text-[#4263EB]/40" />
                    <span className="flex-1 truncate text-[13px] text-[#1A1D2E]">{item.label}</span>
                    <span className="text-[11px] text-[#9AABBD]">{item.time}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Watchlist */}
            <div className="rounded-xl border border-[#E1E8F4] bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-[14px] font-semibold text-[#1A1D2E]">Watchlist</h2>
                <button className="flex items-center gap-1 text-[12px] font-medium text-[#4263EB] hover:underline">
                  <Plus className="h-3.5 w-3.5" />
                  Add KPI
                </button>
              </div>

              {/* KPI row */}
              <div className="flex items-center gap-3 rounded-lg px-2 py-2.5">
                <span className="flex-1 text-[13px] text-[#1A1D2E]">Website Conversion</span>
                {/* Mini sparkline */}
                <svg viewBox="0 0 60 24" className="h-6 w-14" fill="none">
                  <polyline
                    points="0,18 10,14 20,16 30,10 40,15 50,8 60,12"
                    stroke="#EF4444"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="rounded-md bg-red-50 px-1.5 py-0.5 text-[11px] font-semibold text-red-500">
                  0.2%
                </span>
                <span className="text-[13px] font-bold text-[#1A1D2E]">6.3%</span>
                <span className="text-[11px] text-[#9AABBD]">WoW</span>
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-lg border border-dashed border-[#E1E8F4] px-3 py-3 text-center">
                <Star className="h-4 w-4 text-[#9AABBD]" />
                <p className="text-[12px] text-[#9AABBD]">Add KPIs you want to keep an eye on</p>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
