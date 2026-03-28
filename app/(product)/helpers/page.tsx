"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bot, Plus } from "lucide-react";
import { TileGrid } from "@/components/tile-grid";
import { usePersona } from "@/lib/persona-context";
import { PERSONA_HELPERS, type HelperItem } from "@/lib/agents-data";
import { PERSONA_DASHBOARD_DATA } from "@/lib/persona-data";
import { PERSONA_SKILLS } from "@/lib/persona-skills";
import { COMMUNITY_HELPERS } from "@/lib/community-helpers";
import { CommunityModal } from "@/components/community-modal";
import { cn } from "@/lib/utils";
import { useVariant } from "@/lib/variant-context";

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

function Section({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-[15px] font-semibold text-foreground">{title}</h2>
          <p className="mt-0.5 text-[12px] text-muted-foreground">{subtitle}</p>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function HelpersPage() {
  const { persona } = usePersona();
  const { variant } = useVariant();
  const agentLabel  = variant.agentLabel;
  const agentsLabel = variant.agentsLabel;
  const router = useRouter();
  const data = PERSONA_HELPERS[persona.id];
  const [activeHelpers, setActiveHelpers] = useState<HelperItem[]>([]);
  const [showCommunity, setShowCommunity] = useState(false);
  const modalTitle = variant.id === "helpers" ? "Pick Helper Templates" : "Pick Agent Templates";

  useEffect(() => {
    const all = [...data.mine, ...data.shared, ...data.community];

    try {
      const raw = localStorage.getItem("agentspot_selected_skills");
      const roleRaw = localStorage.getItem("agentspot_role");

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

    // Prepend any newly created agent as the first card
    try {
      const raw = localStorage.getItem("agentspot_new_agent");
      if (raw) {
        const newAgent: HelperItem = JSON.parse(raw);
        // Only prepend if not already in the list
        if (!items.some((it) => it.id === newAgent.id)) {
          items.unshift(newAgent);
        }
      }
    } catch { /* ignore */ }

    setActiveHelpers(items);
  }, [persona.id, data]);

  return (
    <>
      {showCommunity && <CommunityModal onClose={() => setShowCommunity(false)} title={modalTitle} />}

      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">{agentsLabel}</h1>
              <p className="text-[13px] text-muted-foreground">
                AI {agentsLabel.toLowerCase()} that work on your behalf
              </p>
            </div>
          </div>

          {/* Header buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push("/helpers/new")}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
            >
              <Plus className="h-4 w-4" />
              New {agentLabel}
            </button>
          </div>
        </div>

        {/* Sections */}
        <div className="mt-10 space-y-14">
          <Section
            title={`My ${agentsLabel}`}
            subtitle={`Your active ${agentsLabel.toLowerCase()} — click any to see their dashboard`}
          >
            <TileGrid
              items={activeHelpers}
              emptyMessage={`No active ${agentsLabel.toLowerCase()} yet. Complete onboarding to get started.`}
            />
          </Section>

          <Section
            title="Shared with Me"
            subtitle={`${agentsLabel} your team has shared with you`}
          >
            <TileGrid
              items={data.shared.slice(0, 6)}
              emptyMessage="Nothing shared with you yet."
            />
          </Section>

          <Section
            title="Community Created"
            subtitle={`Popular ${agentsLabel.toLowerCase()} built and shared by the Solace community`}
          >
            <TileGrid
              items={COMMUNITY_HELPERS.slice(0, 15) as HelperItem[]}
              emptyMessage="No community agents yet."
            />
          </Section>
        </div>
      </div>
    </>
  );
}
