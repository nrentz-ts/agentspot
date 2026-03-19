"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Bot,
  Brain,
  Cpu,
  Sparkles,
  Zap,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { usePersona } from "@/lib/persona-context";
import { PERSONA_DASHBOARD_DATA } from "@/lib/persona-data";
import { PERSONA_HELPERS } from "@/lib/agents-data";
import { PERSONA_SKILLS } from "@/lib/persona-skills";
import { getHelperDetail, toSlug } from "@/lib/helper-detail-data";

// ─── Fallbacks ────────────────────────────────────────────────────────────────

const FALLBACK_COLORS = [
  "bg-violet-100", "bg-sky-100", "bg-amber-100",
  "bg-emerald-100", "bg-rose-100", "bg-teal-100",
];
const FALLBACK_EMOJIS = ["🤖", "🧠", "⚡", "✨", "🎯", "🛡️"];

// Lucide icons still used for sidebar compact layout
const AVATAR_STYLES: { icon: LucideIcon; bg: string; fg: string }[] = [
  { icon: Bot,      bg: "bg-violet-100", fg: "text-violet-600" },
  { icon: Brain,    bg: "bg-sky-100",    fg: "text-sky-600"    },
  { icon: Cpu,      bg: "bg-amber-100",  fg: "text-amber-600"  },
  { icon: Sparkles, bg: "bg-emerald-100",fg: "text-emerald-600"},
  { icon: Zap,      bg: "bg-rose-100",   fg: "text-rose-600"   },
  { icon: Shield,   bg: "bg-teal-100",   fg: "text-teal-600"   },
];

const ROLE_TO_PERSONA: Record<string, string> = {
  "Human Resources": "hr",
  "Marketing":       "marketing",
  "Sales":           "sales",
  "Engineering":     "engineering",
  "Leadership":      "leadership",
  "Finance":         "finance",
  "Operations":      "leadership",
  "Design":          "marketing",
  "Customer Success":"sales",
  "Other":           "hr",
};

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useHelperLookup() {
  const { persona } = usePersona();
  const tabData = PERSONA_HELPERS[persona.id];
  const all = [...tabData.mine, ...tabData.shared, ...tabData.community];
  return (name: string) => all.find((a) => a.name === name);
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface RosterItem {
  label: string;
  description: string;
  emoji: string;
  color: string;
  // kept for sidebar layout
  Icon: LucideIcon;
}

// ─── Grid card (matches tile-grid style) ─────────────────────────────────────

function HelperGridCard({ item, onClick }: { item: RosterItem; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-start rounded-2xl border border-border bg-white p-5 text-left transition-all duration-150 hover:border-primary/20 hover:shadow-lg active:scale-[0.98]"
    >
      {/* Emoji avatar */}
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl transition-transform group-hover:scale-110 ${item.color}`}
      >
        {item.emoji}
      </div>

      {/* Name + description */}
      <h3 className="mt-4 text-[14px] font-semibold text-foreground">
        {item.label}
      </h3>
      <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
        {item.description}
      </p>
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function AgentRoster({ layout = "grid" }: { layout?: "grid" | "sidebar" }) {
  const router = useRouter();
  const { persona } = usePersona();
  const lookupHelper = useHelperLookup();

  const [onboardingSkills, setOnboardingSkills] = useState<RosterItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("spotterwork_selected_skills");
      const roleRaw = localStorage.getItem("spotterwork_role");
      if (!raw) return;
      const selected: string[] = JSON.parse(raw);
      if (!selected.length) return;
      const personaId = roleRaw ? (ROLE_TO_PERSONA[roleRaw] ?? persona.id) : persona.id;
      const skills = PERSONA_SKILLS[personaId] ?? PERSONA_SKILLS[persona.id];

      const matched: RosterItem[] = selected
        .map((label, i) => {
          const skill = skills.find((s) => s.label === label);
          if (!skill) return null;
          const detail = getHelperDetail(toSlug(label));
          const helperEntry = lookupHelper(label);
          return {
            label,
            description: skill.description,
            emoji: detail?.emoji ?? helperEntry?.emoji ?? FALLBACK_EMOJIS[i % FALLBACK_EMOJIS.length],
            color: helperEntry?.color ?? FALLBACK_COLORS[i % FALLBACK_COLORS.length],
            Icon: skill.icon,
          };
        })
        .filter(Boolean)
        .slice(0, 4) as RosterItem[];

      setOnboardingSkills(matched);
    } catch { /* ignore */ }
  }, [persona.id]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleClick(name: string) {
    const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    router.push(`/helpers/${slug}`);
  }

  const useOnboarding = onboardingSkills.length > 0;
  const defaultAgents = PERSONA_DASHBOARD_DATA[persona.id].agents.slice(0, 4);

  // ── Sidebar layout (compact, unchanged visually) ──────────────────────────
  if (layout === "sidebar") {
    const items: RosterItem[] = (
      useOnboarding
        ? onboardingSkills
        : defaultAgents.map((a, idx) => {
            const detail = getHelperDetail(toSlug(a.name));
            const helperEntry = lookupHelper(a.name);
            return {
              label: a.name,
              description: a.lastAction,
              emoji: detail?.emoji ?? helperEntry?.emoji ?? FALLBACK_EMOJIS[idx % FALLBACK_EMOJIS.length],
              color: helperEntry?.color ?? FALLBACK_COLORS[idx % FALLBACK_COLORS.length],
              Icon: AVATAR_STYLES[idx % AVATAR_STYLES.length].icon,
            };
          })
    ).slice(0, 4);

    return (
      <div className="sticky top-6 space-y-3">
        <h2 className="text-[15px] font-semibold text-foreground">Your Active Helpers</h2>
        <div className="flex flex-col gap-2">
          {items.map((item, idx) => {
            const style = AVATAR_STYLES[idx % AVATAR_STYLES.length];
            const Icon = item.Icon;
            return (
              <button
                key={item.label}
                onClick={() => handleClick(item.label)}
                className="group flex items-center gap-3 rounded-xl border border-white/80 bg-white/60 p-3 text-left backdrop-blur-sm transition-all duration-150 hover:border-primary/20 hover:bg-white/90 hover:shadow-md active:scale-[0.98]"
              >
                <div className="relative shrink-0">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full ${style.bg}`}>
                    <Icon className={`h-4 w-4 ${style.fg}`} />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold text-foreground">{item.label}</p>
                  <p className="mt-0.5 line-clamp-1 text-[12px] leading-snug text-muted-foreground">{item.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Grid layout ───────────────────────────────────────────────────────────
  const gridItems: RosterItem[] = (
    useOnboarding
      ? onboardingSkills
      : defaultAgents.map((a, idx) => {
          const detail = getHelperDetail(toSlug(a.name));
          const helperEntry = lookupHelper(a.name);
          return {
            label: a.name,
            description: a.description ?? a.lastAction,
            emoji: detail?.emoji ?? helperEntry?.emoji ?? FALLBACK_EMOJIS[idx % FALLBACK_EMOJIS.length],
            color: helperEntry?.color ?? FALLBACK_COLORS[idx % FALLBACK_COLORS.length],
            Icon: AVATAR_STYLES[idx % AVATAR_STYLES.length].icon,
          };
        })
  ).slice(0, 4);

  return (
    <div className="space-y-3">
      <h2 className="text-[15px] font-semibold text-foreground">Your Active Helpers</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {gridItems.map((item) => (
          <HelperGridCard
            key={item.label}
            item={item}
            onClick={() => handleClick(item.label)}
          />
        ))}
      </div>
    </div>
  );
}
