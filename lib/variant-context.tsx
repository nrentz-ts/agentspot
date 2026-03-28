"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Bot, Workflow, Home, Activity, Wrench, type LucideIcon } from "lucide-react";

// ─── Variant definition ───────────────────────────────────────────────────────

export type VariantId = "helpers" | "agents-workflow" | "workflow-iteration";

export interface NavItemDef {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface VariantConfig {
  id: VariantId;
  label: string;
  description: string;
  agentLabel: string;
  agentsLabel: string;
  workflowLabel: string;
  workflowsLabel: string;
  showWorkflows: boolean;
  showWorkflowStrip: boolean;
  showKnowledgeGaps: boolean;
  navItems: NavItemDef[];
}

// ─── Variant definitions ──────────────────────────────────────────────────────

export const VARIANTS: Record<VariantId, VariantConfig> = {
  "helpers": {
    id: "helpers",
    label: "Option 1 — Helpers",
    description: "Personal AI helper experience",
    agentLabel:    "Helper",
    agentsLabel:   "Helpers",
    workflowLabel: "Workflow",
    workflowsLabel:"Workflows",
    showWorkflows:      false,
    showWorkflowStrip:  false,
    showKnowledgeGaps:  true,
    navItems: [
      { label: "Home",    href: "/home",     icon: Home },
      { label: "Helpers", href: "/helpers",  icon: Wrench },
      { label: "Activity",href: "/activity", icon: Activity },
    ],
  },

  "agents-workflow": {
    id: "agents-workflow",
    label: "Option 2 — Agents + Workflow",
    description: "Enterprise agents and automation",
    agentLabel:    "Agent",
    agentsLabel:   "Agents",
    workflowLabel: "Workflow",
    workflowsLabel:"Workflows",
    showWorkflows:      true,
    showWorkflowStrip:  true,
    showKnowledgeGaps:  true,
    navItems: [
      { label: "Home",      href: "/home",       icon: Home },
      { label: "Agents",    href: "/helpers",    icon: Bot },
      { label: "Workflows", href: "/workflows",  icon: Workflow },
      { label: "Activity",  href: "/activity",   icon: Activity },
    ],
  },

  "workflow-iteration": {
    id: "workflow-iteration",
    label: "Option 3 — Workflow Iteration",
    description: "Redesigned workflow creation & scheduling",
    agentLabel:    "Agent",
    agentsLabel:   "Agents",
    workflowLabel: "Workflow",
    workflowsLabel:"Workflows",
    showWorkflows:      true,
    showWorkflowStrip:  true,
    showKnowledgeGaps:  true,
    navItems: [
      { label: "Home",      href: "/home",       icon: Home },
      { label: "Agents",    href: "/helpers",    icon: Bot },
      { label: "Workflows", href: "/workflows",  icon: Workflow },
      { label: "Activity",  href: "/activity",   icon: Activity },
    ],
  },
};

// ─── Context ──────────────────────────────────────────────────────────────────

const VariantContext = createContext<{
  variant: VariantConfig;
  setVariant: (id: VariantId) => void;
}>({
  variant: VARIANTS["workflow-iteration"],
  setVariant: () => {},
});

export function VariantProvider({ children }: { children: React.ReactNode }) {
  const [variantId, setVariantId] = useState<VariantId>("workflow-iteration");

  useEffect(() => {
    const stored = localStorage.getItem("agentspot_variant") as VariantId | null;
    if (stored && VARIANTS[stored]) setVariantId(stored);
  }, []);

  function setVariant(id: VariantId) {
    localStorage.setItem("agentspot_variant", id);
    setVariantId(id);
  }

  return (
    <VariantContext.Provider value={{ variant: VARIANTS[variantId], setVariant }}>
      {children}
    </VariantContext.Provider>
  );
}

export const useVariant = () => useContext(VariantContext);
