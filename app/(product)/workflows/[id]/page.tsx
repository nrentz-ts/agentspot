"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Loader2,
  XCircle,
  Play,
  ChevronRight,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PERSONA_WORKFLOWS, type WorkflowItem } from "@/lib/workflows-data";

// ─── Slug helpers ─────────────────────────────────────────────────────────────

function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

function findWorkflow(slug: string): WorkflowItem | null {
  for (const data of Object.values(PERSONA_WORKFLOWS)) {
    const all = [...data.mine, ...data.shared];
    const match = all.find((w) => toSlug(w.name) === slug);
    if (match) return match;
  }
  return null;
}

// ─── Step types ───────────────────────────────────────────────────────────────

type StepType = "trigger" | "action" | "check" | "output";

interface WorkflowStep {
  id: string;
  name: string;
  subtitle: string;
  type: StepType;
  emoji: string;
}

const STEP_STYLES: Record<StepType, { border: string; bg: string; badge: string }> = {
  trigger: { border: "border-violet-200", bg: "bg-violet-50",  badge: "bg-violet-100 text-violet-700"   },
  action:  { border: "border-sky-200",    bg: "bg-sky-50",     badge: "bg-sky-100 text-sky-700"         },
  check:   { border: "border-amber-200",  bg: "bg-amber-50",   badge: "bg-amber-100 text-amber-700"     },
  output:  { border: "border-emerald-200",bg: "bg-emerald-50", badge: "bg-emerald-100 text-emerald-700" },
};

const TYPE_LABEL: Record<StepType, string> = {
  trigger: "Trigger",
  action:  "Action",
  check:   "Check",
  output:  "Output",
};

// ─── Step templates ───────────────────────────────────────────────────────────

const WORKFLOW_TEMPLATES: Record<string, WorkflowStep[]> = {
  // ── My Workflows (Sales) ─────────────────────────────────────────────────
  "lead-qualification-flow": [
    { id: "1", name: "New Lead",            subtitle: "Form / webhook",       type: "trigger", emoji: "📬" },
    { id: "2", name: "Enrich Profile",      subtitle: "Clearbit / Clay",      type: "action",  emoji: "🔍" },
    { id: "3", name: "Score ICP Fit",       subtitle: "0–100 model",          type: "action",  emoji: "📊" },
    { id: "4", name: "Route Decision",      subtitle: "Score ≥ 70 = MQL",     type: "check",   emoji: "⚖️" },
    { id: "5", name: "Assign & Alert Rep",  subtitle: "Salesforce + Slack",   type: "output",  emoji: "📤" },
  ],
  "post-demo-follow-up": [
    { id: "1", name: "Demo Completed",      subtitle: "CRM stage change",     type: "trigger", emoji: "🎤" },
    { id: "2", name: "Pull Call Notes",     subtitle: "Gong / Notion",        type: "action",  emoji: "📋" },
    { id: "3", name: "Draft Follow-up",     subtitle: "Personalised email",   type: "action",  emoji: "✍️" },
    { id: "4", name: "Check Tone & Facts",  subtitle: "AI review pass",       type: "check",   emoji: "⚖️" },
    { id: "5", name: "Send & Log",          subtitle: "Gmail + Salesforce",   type: "output",  emoji: "📤" },
  ],
  "proposal-generator": [
    { id: "1", name: "Opportunity Moved",   subtitle: "Proposal stage",       type: "trigger", emoji: "🎯" },
    { id: "2", name: "Fetch Deal Context",  subtitle: "CRM + call transcripts",type: "action", emoji: "🔍" },
    { id: "3", name: "Build Proposal",      subtitle: "Template + AI copy",   type: "action",  emoji: "📄" },
    { id: "4", name: "Validate Pricing",    subtitle: "Discount rules check", type: "check",   emoji: "⚖️" },
    { id: "5", name: "Send to Prospect",    subtitle: "DocuSign + email",     type: "output",  emoji: "📤" },
  ],
  "deal-stage-updater": [
    { id: "1", name: "Call Transcript",     subtitle: "Gong / Zoom",          type: "trigger", emoji: "🎙️" },
    { id: "2", name: "Extract Signals",     subtitle: "NLP intent analysis",  type: "action",  emoji: "🤖" },
    { id: "3", name: "Map to Stage",        subtitle: "MEDDIC scoring",       type: "action",  emoji: "📊" },
    { id: "4", name: "Confirm Change",      subtitle: "Confidence ≥ 85%",     type: "check",   emoji: "⚖️" },
    { id: "5", name: "Update CRM + Notify", subtitle: "Salesforce + Slack",   type: "output",  emoji: "📤" },
  ],
  // ── Shared Workflows (Sales) ─────────────────────────────────────────────
  "pipeline-review-prep": [
    { id: "1", name: "Weekly Schedule",     subtitle: "Monday 7 AM",          type: "trigger", emoji: "⏰" },
    { id: "2", name: "Pull Pipeline Data",  subtitle: "Salesforce / HubSpot", type: "action",  emoji: "☁️" },
    { id: "3", name: "Generate Summary",    subtitle: "AI + charts",          type: "action",  emoji: "📊" },
    { id: "4", name: "Flag At-Risk Deals",  subtitle: "No activity > 7 days", type: "check",   emoji: "⚖️" },
    { id: "5", name: "Send Briefing",       subtitle: "Slack + Google Slides", type: "output", emoji: "📤" },
  ],
  "contract-approval-flow": [
    { id: "1", name: "Contract Ready",      subtitle: "Sales rep trigger",    type: "trigger", emoji: "📑" },
    { id: "2", name: "Extract Key Terms",   subtitle: "AI clause analysis",   type: "action",  emoji: "🔍" },
    { id: "3", name: "Route for Review",    subtitle: "Legal + Finance",      type: "action",  emoji: "🔄" },
    { id: "4", name: "Check Approvals",     subtitle: "All sign-offs present",type: "check",   emoji: "⚖️" },
    { id: "5", name: "Send to Customer",    subtitle: "DocuSign + CRM log",   type: "output",  emoji: "📤" },
  ],
  "win-announcement": [
    { id: "1", name: "Deal Closed Won",     subtitle: "CRM stage change",     type: "trigger", emoji: "🏆" },
    { id: "2", name: "Fetch Deal Details",  subtitle: "ARR, industry, rep",   type: "action",  emoji: "🔍" },
    { id: "3", name: "Compose Message",     subtitle: "AI-written shoutout",  type: "action",  emoji: "✍️" },
    { id: "4", name: "Check Sensitivity",   subtitle: "NDA / public flag",    type: "check",   emoji: "⚖️" },
    { id: "5", name: "Post & Update Board", subtitle: "Slack + leaderboard",  type: "output",  emoji: "📤" },
  ],
  // ── Community Workflows (Sales) ──────────────────────────────────────────
  "cold-outreach-sequencer": [
    { id: "1", name: "Target List Ready",   subtitle: "CSV / Clay segment",   type: "trigger", emoji: "📋" },
    { id: "2", name: "Research Prospect",   subtitle: "LinkedIn + news",      type: "action",  emoji: "🔍" },
    { id: "3", name: "Write Sequence",      subtitle: "3-step email series",  type: "action",  emoji: "✍️" },
    { id: "4", name: "Spam & Tone Check",   subtitle: "Deliverability score", type: "check",   emoji: "⚖️" },
    { id: "5", name: "Enroll & Track",      subtitle: "Outreach + CRM",       type: "output",  emoji: "📤" },
  ],
  "renewal-reminder-pipeline": [
    { id: "1", name: "90-Day Alert",        subtitle: "Contract date trigger", type: "trigger", emoji: "⏰" },
    { id: "2", name: "Fetch Usage Data",    subtitle: "Product analytics",    type: "action",  emoji: "📊" },
    { id: "3", name: "Draft Renewal Email", subtitle: "Personalised pitch",   type: "action",  emoji: "✍️" },
    { id: "4", name: "Check Health Score",  subtitle: "Risk flag if < 60",    type: "check",   emoji: "⚖️" },
    { id: "5", name: "Alert + Send",        subtitle: "CSM Slack + Gmail",    type: "output",  emoji: "📤" },
  ],
};

const DEFAULT_STEPS: WorkflowStep[] = [
  { id: "1", name: "Deal Event",         subtitle: "CRM / webhook",         type: "trigger", emoji: "⚡" },
  { id: "2", name: "Enrich Context",     subtitle: "Pull CRM + call data",  type: "action",  emoji: "🔍" },
  { id: "3", name: "AI Reasoning",       subtitle: "Score & decide",        type: "action",  emoji: "🤖" },
  { id: "4", name: "Validate Rules",     subtitle: "Policies + guardrails", type: "check",   emoji: "⚖️" },
  { id: "5", name: "Deliver Output",     subtitle: "CRM + rep notification",type: "output",  emoji: "📤" },
];

function deriveSteps(slug: string): WorkflowStep[] {
  return WORKFLOW_TEMPLATES[slug] ?? DEFAULT_STEPS;
}

// ─── Run types ────────────────────────────────────────────────────────────────

type RunStatus = "completed" | "running" | "failed";

interface WorkflowRun {
  id: string;
  label: string;
  date: string;
  duration: string;
  status: RunStatus;
  failedStepId?: string;
  activeStepId?: string;
}

const RUN_STATUS_CONFIG: Record<RunStatus, { label: string; bg: string; text: string; border: string }> = {
  completed: { label: "Completed", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  running:   { label: "Running",   bg: "bg-sky-50",     text: "text-sky-700",     border: "border-sky-200"     },
  failed:    { label: "Failed",    bg: "bg-red-50",     text: "text-red-600",     border: "border-red-200"     },
};

function getMockRuns(): WorkflowRun[] {
  return [
    { id: "r1", label: "Acme Corp · $120k",      date: "Mar 20, 2026 · 2:14 PM",  duration: "22.4s", status: "completed"                 },
    { id: "r2", label: "Stripe · $85k",           date: "Mar 20, 2026 · 9:01 AM",  duration: "18.7s", status: "completed"                 },
    { id: "r3", label: "Figma · $200k",           date: "Mar 19, 2026 · 4:33 PM",  duration: "—",     status: "failed",   failedStepId: "3" },
    { id: "r4", label: "Notion · $55k",           date: "Mar 18, 2026 · 11:20 AM", duration: "31.1s", status: "completed"                 },
  ];
}

type StepStatus = "completed" | "running" | "failed" | "pending";

function getStepStatus(step: WorkflowStep, run: WorkflowRun, steps: WorkflowStep[]): StepStatus {
  if (run.status === "completed") return "completed";
  if (run.status === "running") {
    if (run.activeStepId === step.id) return "running";
    const activeIdx = steps.findIndex((s) => s.id === run.activeStepId);
    const thisIdx   = steps.findIndex((s) => s.id === step.id);
    return thisIdx < activeIdx ? "completed" : "pending";
  }
  if (run.status === "failed") {
    if (run.failedStepId === step.id) return "failed";
    const failedIdx = steps.findIndex((s) => s.id === run.failedStepId);
    const thisIdx   = steps.findIndex((s) => s.id === step.id);
    return thisIdx < failedIdx ? "completed" : "pending";
  }
  return "pending";
}

// ─── Step status icon ─────────────────────────────────────────────────────────

function StepStatusIcon({ status }: { status: StepStatus }) {
  if (status === "completed") {
    return (
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
        <Check className="h-3 w-3 text-emerald-600" />
      </div>
    );
  }
  if (status === "running") {
    return <Loader2 className="h-5 w-5 animate-spin text-sky-500" />;
  }
  if (status === "failed") {
    return <XCircle className="h-5 w-5 text-red-500" />;
  }
  return <div className="h-5 w-5 rounded-full border-2 border-border bg-white" />;
}

// ─── Mock step detail content ─────────────────────────────────────────────────

const MOCK_OUTPUTS: Record<string, string> = {
  "1": `{"event": "opportunity_stage_changed", "account": "Acme Corp", "deal_id": "OPP-8821", "arr": 120000, "stage": "Proposal", "owner": "jordan.lee@company.com"}`,
  "2": `✓ Company: Acme Corp — Series C, 420 employees, SaaS\n✓ Champion: Maya Patel (VP Ops) — active on LinkedIn\n✓ Recent news: Raised $80M in Jan 2026\n✓ Competitor: currently using Workato\n✓ ICP score: 91 / 100`,
  "3": `Draft generated (487 words)\nSubject: "Your custom proposal — Acme Corp × Solace"\nPersonalisation tokens applied: 6\nDiscount applied: 12% (within policy)\nSent for internal review`,
  "4": `Pricing check passed ✓\nDiscount 12% ≤ 15% max for ARR tier\nLegal terms: standard MSA — no redlines needed\nConfidence: 94% — proceeding to send`,
  "5": `Proposal sent to: maya.patel@acmecorp.com\nDocuSign envelope ID: DS-29471\nSalesforce opportunity updated: Stage → "Proposal Sent"\nRep notified in #deals-slack: @jordan.lee`,
};

function StepDetailPanel({
  step,
  status,
  onClose,
}: {
  step: WorkflowStep;
  status: StepStatus;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<"input" | "output">("output");
  const s = STEP_STYLES[step.type];
  const statusConf = {
    completed: { label: "Completed", cls: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
    running:   { label: "Running",   cls: "bg-sky-50 text-sky-700 border border-sky-200"             },
    failed:    { label: "Failed",    cls: "bg-red-50 text-red-600 border border-red-200"             },
    pending:   { label: "Pending",   cls: "bg-muted text-muted-foreground border border-border"      },
  }[status];

  return (
    <div className="flex h-full flex-col border-l border-border bg-white">
      {/* Header */}
      <div className="shrink-0 border-b border-border px-5 py-4">
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-semibold text-muted-foreground/50">Step details</p>
          <button onClick={onClose} className="text-[11px] text-muted-foreground hover:text-foreground">
            ✕
          </button>
        </div>
        <div className="mt-3 flex items-center gap-2.5">
          <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[18px]", s.bg)}>
            {step.emoji}
          </div>
          <div>
            <p className="text-[14px] font-semibold text-foreground">{step.name}</p>
            <span className={cn("mt-0.5 inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold", s.badge)}>
              {TYPE_LABEL[step.type]}
            </span>
          </div>
        </div>
        <div className="mt-3">
          <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-semibold border", statusConf.cls)}>
            {status === "running" && <Loader2 className="h-3 w-3 animate-spin" />}
            {status === "completed" && <Check className="h-3 w-3" />}
            {status === "failed" && <XCircle className="h-3 w-3" />}
            {statusConf.label}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="shrink-0 border-b border-border px-5">
        <div className="flex gap-0">
          {(["input", "output"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "border-b-2 px-4 py-2.5 text-[13px] font-medium capitalize transition-colors",
                tab === t
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5">
        {tab === "input" ? (
          <div className="rounded-xl bg-muted/40 p-3">
            <p className="font-mono text-[12px] leading-relaxed text-muted-foreground">
              {`{"step_id": "${step.id}", "type": "${step.type}", "name": "${step.name}", "triggered_at": "2026-03-20T14:14:23Z"}`}
            </p>
          </div>
        ) : (
          status === "pending" ? (
            <p className="text-[13px] text-muted-foreground italic">Step has not run yet.</p>
          ) : status === "failed" ? (
            <div className="rounded-xl bg-red-50 border border-red-100 p-3">
              <p className="text-[12px] font-semibold text-red-600 mb-1">Error</p>
              <p className="font-mono text-[12px] leading-relaxed text-red-500">
                Step timed out after 30s. No response from downstream service.
              </p>
            </div>
          ) : (
            <div className="rounded-xl bg-muted/40 p-3">
              <p className="font-mono text-[12px] leading-relaxed text-muted-foreground whitespace-pre-line">
                {MOCK_OUTPUTS[step.id] ?? "Step completed successfully."}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WorkflowDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const workflow = findWorkflow(id);
  const steps = deriveSteps(id);
  const runs = getMockRuns();

  const [selectedRunId, setSelectedRunId] = useState(runs[0].id);
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);

  const selectedRun = runs.find((r) => r.id === selectedRunId) ?? runs[0];
  const selectedStep = steps.find((s) => s.id === selectedStepId) ?? null;
  const selectedStepStatus = selectedStep
    ? getStepStatus(selectedStep, selectedRun, steps)
    : null;

  const name = workflow?.name ?? id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const emoji = workflow?.emoji ?? "⚙️";
  const color = workflow?.color ?? "bg-violet-100";

  const runStatusConf = RUN_STATUS_CONFIG[selectedRun.status];

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#F8F9FC]">

      {/* ── Top bar ── */}
      <header className="flex shrink-0 items-center justify-between border-b border-border bg-white px-6 py-3">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Workflows
        </button>

        <div className="flex items-center gap-2.5">
          <div className={cn("flex h-7 w-7 items-center justify-center rounded-lg text-[15px]", color)}>
            {emoji}
          </div>
          <span className="text-[14px] font-semibold text-foreground">{name}</span>
          <span className={cn(
            "rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
            runStatusConf.bg, runStatusConf.text, runStatusConf.border
          )}>
            {runStatusConf.label}
          </span>
        </div>

        <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-90">
          <Play className="h-3.5 w-3.5" />
          Run now
        </button>
      </header>

      {/* ── Three-panel body ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── LEFT: Runs list ── */}
        <div className="flex w-[240px] shrink-0 flex-col border-r border-border bg-white">
          <div className="shrink-0 border-b border-border px-4 py-3">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-semibold text-foreground">Runs</p>
              <span className="rounded-full bg-muted px-1.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
                {runs.length}
              </span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-border">
            {runs.map((run) => {
              const conf = RUN_STATUS_CONFIG[run.status];
              const isSelected = selectedRunId === run.id;
              return (
                <button
                  key={run.id}
                  onClick={() => { setSelectedRunId(run.id); setSelectedStepId(null); }}
                  className={cn(
                    "flex w-full flex-col items-start px-4 py-3.5 text-left transition-colors hover:bg-muted/40",
                    isSelected && "bg-primary/[0.04] border-l-2 border-l-primary"
                  )}
                >
                  <div className="flex w-full items-center justify-between gap-2">
                    <span className={cn("text-[13px] font-semibold", isSelected ? "text-primary" : "text-foreground")}>
                      {run.label}
                    </span>
                    <span className={cn(
                      "rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                      conf.bg, conf.text, conf.border
                    )}>
                      {run.status === "completed" ? "Done" : run.status === "running" ? "Live" : "Failed"}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">{run.date}</p>
                  {run.duration !== "—" && (
                    <div className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground/60">
                      <Clock className="h-3 w-3" />
                      {run.duration}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── CENTER: Run graph ── */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="shrink-0 border-b border-border px-6 py-3">
            <p className="text-[13px] font-semibold text-foreground">Run graph</p>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="flex flex-col items-center gap-0">

              {/* START node */}
              <div className="flex w-[260px] items-center justify-between rounded-2xl border border-border bg-white px-5 py-3.5 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-muted text-[14px]">
                    ▶
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-foreground">Start</p>
                    <p className="text-[11px] text-muted-foreground">Workflow starts here</p>
                  </div>
                </div>
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
                  <Check className="h-3 w-3 text-emerald-600" />
                </div>
              </div>

              {/* Steps */}
              {steps.map((step) => {
                const s = STEP_STYLES[step.type];
                const stepStatus = getStepStatus(step, selectedRun, steps);
                const isActive = selectedStepId === step.id;

                return (
                  <div key={step.id} className="flex flex-col items-center gap-0">
                    {/* Connector */}
                    <div className="flex h-10 w-px flex-col items-center">
                      <div className="w-px flex-1 border-l-2 border-dashed border-border" />
                      <svg width="8" height="8" viewBox="0 0 8 8" className="shrink-0">
                        <path d="M4 0 L4 8 M1 5 L4 8 L7 5" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-border" />
                      </svg>
                    </div>

                    {/* Step node */}
                    <button
                      onClick={() => setSelectedStepId(isActive ? null : step.id)}
                      className={cn(
                        "group flex w-[260px] items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-150 hover:shadow-md",
                        isActive
                          ? "border-primary/40 shadow-sm ring-1 ring-primary/20 " + s.bg
                          : s.border + " " + s.bg + " hover:border-primary/30",
                        stepStatus === "failed" && "border-red-300 bg-red-50 hover:border-red-400"
                      )}
                    >
                      <div className="flex flex-col items-center gap-1 shrink-0">
                        <span className="text-[22px] leading-none">{step.emoji}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold leading-tight text-foreground">{step.name}</p>
                        <p className="mt-0.5 text-[11px] text-muted-foreground">{step.subtitle}</p>
                        <span className={cn(
                          "mt-1.5 inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold",
                          stepStatus === "failed" ? "bg-red-100 text-red-600" : s.badge
                        )}>
                          {TYPE_LABEL[step.type]}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <StepStatusIcon status={stepStatus} />
                        <ChevronRight className={cn(
                          "h-3.5 w-3.5 transition-colors",
                          isActive ? "text-primary" : "text-muted-foreground/30 group-hover:text-muted-foreground"
                        )} />
                      </div>
                    </button>
                  </div>
                );
              })}

              {/* Connector to end */}
              <div className="flex h-10 w-px flex-col items-center">
                <div className="w-px flex-1 border-l-2 border-dashed border-border" />
                <svg width="8" height="8" viewBox="0 0 8 8" className="shrink-0">
                  <path d="M4 0 L4 8 M1 5 L4 8 L7 5" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-border" />
                </svg>
              </div>

              {/* END node */}
              <div className="flex w-[260px] items-center justify-between rounded-2xl border border-border bg-white px-5 py-3.5 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-muted text-[14px]">
                    ⏹
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-foreground">End</p>
                    <p className="text-[11px] text-muted-foreground">Workflow completes here</p>
                  </div>
                </div>
                {selectedRun.status === "completed" && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
                    <Check className="h-3 w-3 text-emerald-600" />
                  </div>
                )}
                {selectedRun.status === "failed" && (
                  <XCircle className="h-5 w-5 text-red-400" />
                )}
              </div>

            </div>
          </div>
        </div>

        {/* ── RIGHT: Step details ── */}
        <div className={cn(
          "w-[300px] shrink-0 transition-all duration-200",
          selectedStep ? "opacity-100" : "opacity-0 pointer-events-none"
        )}>
          {selectedStep && selectedStepStatus && (
            <StepDetailPanel
              step={selectedStep}
              status={selectedStepStatus}
              onClose={() => setSelectedStepId(null)}
            />
          )}
          {!selectedStep && (
            <div className="flex h-full items-center justify-center border-l border-border bg-white">
              <p className="text-[13px] text-muted-foreground/40">Click a step to inspect</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
