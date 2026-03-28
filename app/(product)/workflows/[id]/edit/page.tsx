"use client";

import { useState, useRef, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Send, Sparkles, Check, ChevronRight,
  Loader2, X, Zap, LayoutGrid,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { WORKFLOW_LABEL } from "@/lib/labels";
import { PERSONA_WORKFLOWS } from "@/lib/workflows-data";

// ─── Step types ───────────────────────────────────────────────────────────────

type StepType = "trigger" | "action" | "check" | "output";

interface BuildStep {
  id: string;
  name: string;
  subtitle: string;
  type: StepType;
  emoji: string;
}

const STEP_STYLES: Record<StepType, { border: string; bg: string; badge: string }> = {
  trigger: { border: "border-violet-200", bg: "bg-violet-50",  badge: "bg-violet-100 text-violet-700" },
  action:  { border: "border-sky-200",    bg: "bg-sky-50",     badge: "bg-sky-100 text-sky-700"       },
  check:   { border: "border-amber-200",  bg: "bg-amber-50",   badge: "bg-amber-100 text-amber-700"   },
  output:  { border: "border-emerald-200",bg: "bg-emerald-50", badge: "bg-emerald-100 text-emerald-700"},
};

const TYPE_LABEL: Record<StepType, string> = {
  trigger: "Trigger", action: "Action", check: "Check", output: "Output",
};

// ─── Slug helpers ─────────────────────────────────────────────────────────────

function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

// ─── Step templates (mirrors detail page) ────────────────────────────────────

const WORKFLOW_TEMPLATES: Record<string, BuildStep[]> = {
  "lead-qualification-flow": [
    { id: "1", name: "New Lead",           subtitle: "Form / webhook",     type: "trigger", emoji: "📬" },
    { id: "2", name: "Enrich Profile",     subtitle: "Clearbit / Clay",    type: "action",  emoji: "🔍" },
    { id: "3", name: "Score ICP Fit",      subtitle: "0–100 model",        type: "action",  emoji: "📊" },
    { id: "4", name: "Route Decision",     subtitle: "Score ≥ 70 = MQL",   type: "check",   emoji: "⚖️" },
    { id: "5", name: "Assign & Alert Rep", subtitle: "Salesforce + Slack", type: "output",  emoji: "📤" },
  ],
  "post-demo-follow-up": [
    { id: "1", name: "Demo Completed",     subtitle: "CRM stage change",   type: "trigger", emoji: "🎤" },
    { id: "2", name: "Pull Call Notes",    subtitle: "Gong / Notion",      type: "action",  emoji: "📋" },
    { id: "3", name: "Draft Follow-up",    subtitle: "Personalised email", type: "action",  emoji: "✍️" },
    { id: "4", name: "Check Tone & Facts", subtitle: "AI review pass",     type: "check",   emoji: "⚖️" },
    { id: "5", name: "Send & Log",         subtitle: "Gmail + Salesforce", type: "output",  emoji: "📤" },
  ],
  "proposal-generator": [
    { id: "1", name: "Opportunity Moved",  subtitle: "Proposal stage",          type: "trigger", emoji: "🎯" },
    { id: "2", name: "Fetch Deal Context", subtitle: "CRM + call transcripts",  type: "action",  emoji: "🔍" },
    { id: "3", name: "Build Proposal",     subtitle: "Template + AI copy",      type: "action",  emoji: "📄" },
    { id: "4", name: "Validate Pricing",   subtitle: "Discount rules check",    type: "check",   emoji: "⚖️" },
    { id: "5", name: "Send to Prospect",   subtitle: "DocuSign + email",        type: "output",  emoji: "📤" },
  ],
  "deal-stage-updater": [
    { id: "1", name: "Call Transcript",    subtitle: "Gong / Zoom",         type: "trigger", emoji: "🎙️" },
    { id: "2", name: "Extract Signals",    subtitle: "NLP intent analysis", type: "action",  emoji: "🤖" },
    { id: "3", name: "Map to Stage",       subtitle: "MEDDIC scoring",      type: "action",  emoji: "📊" },
    { id: "4", name: "Confirm Change",     subtitle: "Confidence ≥ 85%",    type: "check",   emoji: "⚖️" },
    { id: "5", name: "Update CRM + Notify",subtitle: "Salesforce + Slack",  type: "output",  emoji: "📤" },
  ],
};

const DEFAULT_STEPS: BuildStep[] = [
  { id: "1", name: "Trigger Event",   subtitle: "Define trigger",         type: "trigger", emoji: "⚡" },
  { id: "2", name: "Gather Context",  subtitle: "Fetch relevant data",    type: "action",  emoji: "🔍" },
  { id: "3", name: "AI Processing",   subtitle: "Analyse & decide",       type: "action",  emoji: "🤖" },
  { id: "4", name: "Validate Output", subtitle: "Quality check",          type: "check",   emoji: "⚖️" },
  { id: "5", name: "Deliver Result",  subtitle: "Notify / update / send", type: "output",  emoji: "📤" },
];

function deriveSteps(slug: string): BuildStep[] {
  return WORKFLOW_TEMPLATES[slug] ?? DEFAULT_STEPS;
}

function findWorkflowName(slug: string): string {
  for (const data of Object.values(PERSONA_WORKFLOWS)) {
    const all = [...data.mine, ...data.shared];
    const match = all.find((w) => toSlug(w.name) === slug);
    if (match) return match.name;
  }
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// ─── Chat message types ───────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
}

// ─── AI edit responses ────────────────────────────────────────────────────────

function getAiEditResponse(userMessage: string, currentSteps: BuildStep[]): { reply: string; steps: BuildStep[] } {
  const lower = userMessage.toLowerCase();

  if (lower.includes("add") && (lower.includes("notif") || lower.includes("slack") || lower.includes("alert"))) {
    const newSteps = currentSteps.map((s) =>
      s.type === "output"
        ? { ...s, name: s.name.includes("Notify") ? s.name : s.name + " + Notify", subtitle: s.subtitle + " + Slack alert" }
        : s
    );
    return {
      reply: "Done — I've updated the output step to include a Slack notification. Anything else you'd like to adjust?",
      steps: newSteps,
    };
  }

  if (lower.includes("remov") || lower.includes("delet") || lower.includes("skip")) {
    const withoutCheck = currentSteps.filter((s) => s.type !== "check");
    if (withoutCheck.length < currentSteps.length) {
      return {
        reply: "Removed the check step. The workflow will now flow directly from the last action to the output. Want to add anything else?",
        steps: withoutCheck,
      };
    }
  }

  if (lower.includes("rename") || lower.includes("change the name") || lower.includes("call it")) {
    return {
      reply: "I've noted the rename. In a live environment I'd update the step names — for now the structure stays the same. What else would you like to tweak?",
      steps: currentSteps,
    };
  }

  return {
    reply: "Got it — I've noted your changes. In a fully wired environment I'd apply those edits directly to the graph. Is there anything else you'd like to adjust before saving?",
    steps: currentSteps,
  };
}

// ─── Step detail panel ────────────────────────────────────────────────────────

function StepDetailPanel({ step, onClose }: { step: BuildStep; onClose: () => void }) {
  const s = STEP_STYLES[step.type];
  return (
    <div className="flex h-full flex-col border-l border-border bg-white">
      <div className="shrink-0 border-b border-border px-5 py-4">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-semibold text-muted-foreground/50 uppercase tracking-wide">Step definition</p>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
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
      </div>
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        <div>
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Subtitle / source</p>
          <p className="text-[13px] text-foreground">{step.subtitle}</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Type</p>
          <span className={cn("inline-flex rounded-full px-2.5 py-1 text-[12px] font-semibold", s.badge)}>
            {TYPE_LABEL[step.type]}
          </span>
        </div>
        <div className="rounded-xl border border-border bg-muted/30 p-3">
          <p className="text-[12px] text-muted-foreground italic">
            Ask the AI to rename, remove, or change this step — or save the workflow as-is.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Run graph ────────────────────────────────────────────────────────────────

function RunGraph({
  steps,
  selectedStepId,
  onSelectStep,
  isBuilding,
}: {
  steps: BuildStep[];
  selectedStepId: string | null;
  onSelectStep: (id: string) => void;
  isBuilding: boolean;
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="shrink-0 border-b border-border px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-[13px] font-semibold text-foreground">Run graph</p>
          {isBuilding && (
            <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
              <Loader2 className="h-3 w-3 animate-spin" />
              Updating…
            </span>
          )}
        </div>
        {steps.length > 0 && !isBuilding && (
          <span className="text-[11px] text-muted-foreground/60">{steps.length} steps · click a step to inspect</span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8">
        {steps.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
              <LayoutGrid className="h-5 w-5 text-muted-foreground/40" />
            </div>
            <p className="text-[13px] font-semibold text-foreground">Run graph will appear here</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-0">
            <div className="flex w-[260px] items-center gap-2.5 rounded-2xl border border-border bg-white px-5 py-3.5 shadow-sm">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-muted text-[14px]">▶</div>
              <div>
                <p className="text-[13px] font-semibold text-foreground">Start</p>
                <p className="text-[11px] text-muted-foreground">Workflow starts here</p>
              </div>
            </div>

            {steps.map((step, i) => {
              const s = STEP_STYLES[step.type];
              const isSelected = selectedStepId === step.id;
              const isNew = i === steps.length - 1 && isBuilding;
              return (
                <div key={step.id} className="flex flex-col items-center gap-0">
                  <div className="flex h-8 w-px flex-col items-center">
                    <div className="w-px flex-1 border-l-2 border-dashed border-border" />
                  </div>
                  <button
                    onClick={() => onSelectStep(step.id)}
                    className={cn(
                      "group flex w-[260px] items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-200 hover:shadow-md",
                      isNew && "animate-pulse",
                      isSelected
                        ? "border-primary/40 shadow-sm ring-1 ring-primary/20 " + s.bg
                        : s.border + " " + s.bg + " hover:border-primary/30"
                    )}
                  >
                    <span className="text-[22px] leading-none shrink-0">{step.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold leading-tight text-foreground">{step.name}</p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">{step.subtitle}</p>
                      <span className={cn("mt-1.5 inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold", s.badge)}>
                        {TYPE_LABEL[step.type]}
                      </span>
                    </div>
                    <ChevronRight className={cn(
                      "h-3.5 w-3.5 shrink-0 transition-colors",
                      isSelected ? "text-primary" : "text-muted-foreground/30 group-hover:text-muted-foreground"
                    )} />
                  </button>
                </div>
              );
            })}

            <div className="flex h-8 w-px flex-col items-center">
              <div className="w-px flex-1 border-l-2 border-dashed border-border" />
            </div>
            <div className="flex w-[260px] items-center gap-2.5 rounded-2xl border border-border bg-white px-5 py-3.5 shadow-sm">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-muted text-[14px]">⏹</div>
              <div>
                <p className="text-[13px] font-semibold text-foreground">End</p>
                <p className="text-[11px] text-muted-foreground">Workflow completes here</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EditWorkflowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const workflowName = findWorkflowName(id);
  const initialSteps = deriveSteps(id);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "intro",
      role: "assistant",
      text: `I've loaded "${workflowName}" for you. You can ask me to add, remove, or rename steps — or just save it as-is.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [steps, setSteps] = useState<BuildStep[]>(initialSteps);
  const [isBuilding, setIsBuilding] = useState(false);
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const selectedStep = steps.find((s) => s.id === selectedStepId) ?? null;

  function handleSend(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setInput("");

    const userMsg: Message = { id: Date.now().toString(), role: "user", text: msg };
    setMessages((prev) => [...prev, userMsg]);
    setIsBuilding(true);

    setTimeout(() => {
      const { reply, steps: newSteps } = getAiEditResponse(msg, steps);
      setSteps(newSteps);
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", text: reply },
      ]);
      setIsBuilding(false);
    }, 1200);
  }

  function handleSave() {
    setIsSaving(true);
    setTimeout(() => {
      router.push(`/workflows/${id}`);
    }, 900);
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#F8F9FC]">

      {/* ── Top bar ── */}
      <header className="flex shrink-0 items-center justify-between border-b border-border bg-white px-6 py-3 gap-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="flex items-center gap-2 min-w-0">
          <Zap className="h-4 w-4 text-primary shrink-0" />
          <span className="text-[14px] font-semibold text-foreground truncate">
            Editing: {workflowName}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-1.5 text-[13px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {isSaving ? (
              <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving…</>
            ) : (
              <><Check className="h-3.5 w-3.5" /> Save {WORKFLOW_LABEL}</>
            )}
          </button>
        </div>
      </header>

      {/* ── Three-pane body ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── LEFT: AI Chat — takes half the canvas ── */}
        <div className="flex flex-1 min-w-0 flex-col border-r border-border bg-white">

          {/* Header */}
          <div className="shrink-0 border-b border-border px-4 py-3 flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
            </div>
            <p className="text-[13px] font-semibold text-foreground">Edit with AI</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}
              >
                <div className={cn(
                  "max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed",
                  msg.role === "user"
                    ? "bg-primary text-white rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm"
                )}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isBuilding && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-bl-sm px-3.5 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0ms]" />
                    <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:150ms]" />
                    <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="shrink-0 border-t border-border px-4 py-3">
            <div className="flex items-end gap-2">
              <textarea
                rows={2}
                placeholder="Ask me to add, remove, or change a step…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
                }}
                className="flex-1 resize-none rounded-xl border border-border bg-muted/40 px-3 py-2 text-[13px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isBuilding}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white transition-opacity hover:opacity-90 disabled:opacity-30"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── CENTER: Run graph ── */}
        <div className="flex flex-1 min-w-0 flex-col overflow-hidden">
          <RunGraph
            steps={steps}
            selectedStepId={selectedStepId}
            onSelectStep={(stepId) => setSelectedStepId(selectedStepId === stepId ? null : stepId)}
            isBuilding={isBuilding}
          />
        </div>

        {/* ── RIGHT: Step detail — only mounted when a step is selected ── */}
        {selectedStep && (
          <div className="w-[280px] shrink-0">
            <StepDetailPanel
              step={selectedStep}
              onClose={() => setSelectedStepId(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
