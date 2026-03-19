"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Bot, Plus, X, Search, Users, Globe } from "lucide-react";
import { TileGrid } from "@/components/tile-grid";
import { usePersona } from "@/lib/persona-context";
import { PERSONA_HELPERS, type HelperItem } from "@/lib/agents-data";
import { PERSONA_DASHBOARD_DATA } from "@/lib/persona-data";
import { PERSONA_SKILLS } from "@/lib/persona-skills";
import {
  COMMUNITY_HELPERS,
  COMMUNITY_CATEGORIES,
  type CommunityCategory,
  type CommunityHelperItem,
} from "@/lib/community-helpers";
import { cn } from "@/lib/utils";

const ROLE_TO_PERSONA: Record<string, string> = {
  "Human Resources": "hr",
  "Marketing": "marketing",
  "Sales": "sales",
  "Engineering": "engineering",
  "Leadership": "leadership",
  "Finance": "finance",
  "Operations": "leadership",
  "Design": "marketing",
  "Customer Success": "sales",
  "Other": "hr",
};

const FALLBACK_COLORS = [
  "bg-violet-100", "bg-sky-100", "bg-amber-100",
  "bg-emerald-100", "bg-rose-100", "bg-teal-100",
];
const FALLBACK_EMOJIS = ["🤖", "🧠", "⚡", "✨", "🎯", "🛡️"];

// ─── Section wrapper ────────────────────────────────────────────────────────

function Section({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-5">
        <h2 className="text-[15px] font-semibold text-foreground">{title}</h2>
        <p className="mt-0.5 text-[12px] text-muted-foreground">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

// ─── Community Ideas Modal ──────────────────────────────────────────────────

function CommunityModal({ onClose }: { onClose: () => void }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CommunityCategory>("All");
  const [added, setAdded] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return COMMUNITY_HELPERS.filter((h) => {
      const matchCat = category === "All" || h.category === category;
      const matchQ =
        !q ||
        h.name.toLowerCase().includes(q) ||
        h.description.toLowerCase().includes(q) ||
        h.category.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [search, category]);

  function toggle(id: string) {
    setAdded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex h-[88vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="shrink-0 border-b border-border px-7 py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-[18px] font-bold tracking-tight text-foreground">
                  Community Ideas
                </h2>
                <p className="mt-0.5 text-[13px] text-muted-foreground">
                  {COMMUNITY_HELPERS.length} helpers built and shared by the SpotterWork community
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Search + category filters */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/50" />
              <input
                type="text"
                placeholder="Search community helpers…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-border bg-muted/40 py-2 pl-9 pr-3 text-[13px] placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
              {COMMUNITY_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "shrink-0 rounded-full px-3 py-1.5 text-[12px] font-medium transition-all",
                    category === cat
                      ? "bg-primary text-white"
                      : "border border-border bg-white text-muted-foreground hover:border-primary/30 hover:text-foreground"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Grid ── */}
        <div className="flex-1 overflow-y-auto px-7 py-6">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/60 text-2xl">🔍</div>
              <p className="mt-3 text-[14px] font-medium text-foreground">No helpers found</p>
              <p className="mt-1 text-[12px] text-muted-foreground">Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-3">
              {filtered.map((h) => (
                <CommunityCard key={h.id} helper={h} added={added.has(h.id)} onToggle={() => toggle(h.id)} />
              ))}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        {added.size > 0 && (
          <div className="shrink-0 flex items-center justify-between border-t border-border bg-muted/30 px-7 py-3">
            <p className="text-[13px] text-muted-foreground">
              <span className="font-semibold text-foreground">{added.size}</span> helper{added.size !== 1 ? "s" : ""} selected
            </p>
            <button
              onClick={onClose}
              className="rounded-lg bg-primary px-4 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
            >
              Add to My Helpers
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function CommunityCard({
  helper,
  added,
  onToggle,
}: {
  helper: CommunityHelperItem;
  added: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="group flex flex-col rounded-2xl border border-border bg-white p-4 transition-all duration-150 hover:border-primary/20 hover:shadow-md">
      {/* Emoji icon */}
      <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl text-[18px] leading-none transition-transform group-hover:scale-110", helper.color)}>
        {helper.emoji}
      </div>

      {/* Name + description */}
      <h3 className="mt-3 text-[13px] font-semibold leading-snug text-foreground">{helper.name}</h3>
      <p className="mt-1 flex-1 text-[11px] leading-relaxed text-muted-foreground line-clamp-2">
        {helper.description}
      </p>

      {/* Footer: installs + add button */}
      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground/60">
          <Users className="h-3 w-3" />
          {helper.installs.toLocaleString()}
        </div>
        <button
          onClick={onToggle}
          className={cn(
            "flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all",
            added
              ? "bg-emerald-50 text-emerald-700 hover:bg-red-50 hover:text-red-600"
              : "bg-primary/8 text-primary hover:bg-primary/15"
          )}
        >
          {added ? "Added ✓" : <><Plus className="h-3 w-3" />Add</>}
        </button>
      </div>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function HelpersPage() {
  const { persona } = usePersona();
  const router = useRouter();
  const data = PERSONA_HELPERS[persona.id];
  const [activeHelpers, setActiveHelpers] = useState<HelperItem[]>([]);
  const [showCommunity, setShowCommunity] = useState(false);

  useEffect(() => {
    const all = [...data.mine, ...data.shared, ...data.community];

    try {
      const raw = localStorage.getItem("spotterwork_selected_skills");
      const roleRaw = localStorage.getItem("spotterwork_role");

      if (raw) {
        const selected: string[] = JSON.parse(raw);
        if (selected.length > 0) {
          const personaId = roleRaw ? (ROLE_TO_PERSONA[roleRaw] ?? persona.id) : persona.id;
          const skills = PERSONA_SKILLS[personaId] ?? PERSONA_SKILLS[persona.id];

          const items: HelperItem[] = selected.slice(0, 4).map((label, i) => {
            const match = all.find((h) => h.name.toLowerCase() === label.toLowerCase());
            if (match) return match;
            const skill = skills.find((s) => s.label === label);
            return {
              id: `onboarding-${i}`,
              name: label,
              description: skill?.description ?? "",
              color: FALLBACK_COLORS[i % FALLBACK_COLORS.length],
              emoji: FALLBACK_EMOJIS[i % FALLBACK_EMOJIS.length],
            };
          });

          setActiveHelpers(items);
          return;
        }
      }
    } catch { /* ignore */ }

    const dashboardNames = PERSONA_DASHBOARD_DATA[persona.id].agents
      .slice(0, 4)
      .map((a) => a.name);

    const items: HelperItem[] = dashboardNames.map((name, i) => {
      const match = all.find((h) => h.name === name);
      if (match) return match;
      return {
        id: `default-${i}`,
        name,
        description: PERSONA_DASHBOARD_DATA[persona.id].agents[i]?.description ?? "",
        color: FALLBACK_COLORS[i % FALLBACK_COLORS.length],
        emoji: FALLBACK_EMOJIS[i % FALLBACK_EMOJIS.length],
      };
    });

    setActiveHelpers(items);
  }, [persona.id, data]);

  return (
    <>
      {showCommunity && <CommunityModal onClose={() => setShowCommunity(false)} />}

      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Helpers</h1>
              <p className="text-[13px] text-muted-foreground">
                AI helpers that work on your behalf
              </p>
            </div>
          </div>

          {/* Header buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCommunity(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2 text-[13px] font-medium text-foreground shadow-sm transition-all hover:bg-muted/40"
            >
              <Globe className="h-4 w-4 text-muted-foreground" />
              Community Ideas
            </button>
            <button
              onClick={() => router.push("/helpers/new")}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
            >
              <Plus className="h-4 w-4" />
              New Helper
            </button>
          </div>
        </div>

        {/* Sections */}
        <div className="mt-10 space-y-14">
          <Section
            title="My Helpers"
            subtitle="Your active helpers — click any to see their dashboard"
          >
            <TileGrid
              items={activeHelpers}
              emptyMessage="No active helpers yet. Complete onboarding to get started."
            />
          </Section>

          <Section
            title="Shared with Me"
            subtitle="Helpers your team has shared with you"
          >
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 px-8 py-16 text-center">
              {/* Stacked avatars illustration */}
              <div className="relative mb-5 flex items-center justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-[26px] shadow-sm">
                  🤝
                </div>
                <div className="absolute -right-4 -top-2 flex h-9 w-9 items-center justify-center rounded-xl bg-sky-100 text-[16px] shadow-sm">
                  🤖
                </div>
                <div className="absolute -bottom-2 -left-4 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-[16px] shadow-sm">
                  ✨
                </div>
              </div>
              <p className="mt-2 text-[15px] font-semibold text-foreground">
                Nothing shared with you yet
              </p>
              <p className="mt-2 max-w-xs text-[13px] leading-relaxed text-muted-foreground">
                When someone on your team shares a helper with you, it will show up here.
              </p>
            </div>
          </Section>
        </div>
      </div>
    </>
  );
}
