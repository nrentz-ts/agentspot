"use client";

import { useRouter } from "next/navigation";
import { Workflow, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePersona } from "@/lib/persona-context";
import { PERSONA_WORKFLOWS, type WorkflowItem } from "@/lib/workflows-data";
import { WORKFLOW_LABEL, WORKFLOWS_LABEL } from "@/lib/labels";

function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

// ─── Workflow card ────────────────────────────────────────────────────────────

function WorkflowCard({ item }: { item: WorkflowItem }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`/workflows/${toSlug(item.name)}`)}
      className="group flex flex-col items-start rounded-2xl border border-border bg-white p-5 text-left transition-all duration-150 hover:border-primary/20 hover:shadow-lg active:scale-[0.98]"
    >
      <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl text-xl transition-transform group-hover:scale-110", item.color)}>
        {item.emoji}
      </div>
      <h3 className="mt-4 text-[14px] font-semibold text-foreground">{item.name}</h3>
      <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">{item.description}</p>
    </button>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WorkflowsPage() {
  const { persona } = usePersona();
  const data = PERSONA_WORKFLOWS[persona.id];

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      {/* Header */}
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
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-90">
          <Plus className="h-4 w-4" />
          New {WORKFLOW_LABEL}
        </button>
      </div>

      {/* Sections */}
      <div className="mt-10 space-y-14">
        <Section
          title={`My ${WORKFLOWS_LABEL}`}
          subtitle={`Your active ${WORKFLOWS_LABEL.toLowerCase()} — click any to see run details`}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.mine.map((item) => <WorkflowCard key={item.id} item={item} />)}
          </div>
        </Section>

        <Section
          title="Shared with Me"
          subtitle={`${WORKFLOWS_LABEL} your team has shared with you`}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.shared.map((item) => <WorkflowCard key={item.id} item={item} />)}
          </div>
        </Section>

        <Section
          title="Community Created"
          subtitle={`Popular ${WORKFLOWS_LABEL.toLowerCase()} built and shared by the Solace community`}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.community.map((item) => <WorkflowCard key={item.id} item={item} />)}
          </div>
        </Section>
      </div>
    </div>
  );
}
