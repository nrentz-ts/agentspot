"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Send, Sparkles, Play, Check, ChevronRight,
  Loader2, XCircle, X, Zap, LayoutGrid, Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { WORKFLOW_LABEL } from "@/lib/labels";

// ─── Step types (mirrors the run graph in the detail page) ────────────────────

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

// ─── Chat message types ───────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
}

// ─── Example prompts ─────────────────────────────────────────────────────────

const EXAMPLE_PROMPTS = [
  "Build me a workflow that qualifies new leads and assigns them to the right rep.",
  "Create a workflow that drafts and sends post-demo follow-up emails automatically.",
  "Create a competitive intelligence weekly digest and send it to my team on Slack.",
];

// ─── Simulated AI build sequence ──────────────────────────────────────────────

function getAiResponse(userMessage: string): { reply: string; steps: BuildStep[] } {
  const lower = userMessage.toLowerCase();

  if (lower.includes("lead") || lower.includes("qualif")) {
    return {
      reply: "Got it — a lead qualification workflow. I'll score and enrich incoming leads, then route the best ones to the right rep. Here's what I'm building:",
      steps: [
        { id: "1", name: "New Lead",           subtitle: "Form / webhook",     type: "trigger", emoji: "📬" },
        { id: "2", name: "Enrich Profile",      subtitle: "Clearbit / Clay",    type: "action",  emoji: "🔍" },
        { id: "3", name: "Score ICP Fit",       subtitle: "0–100 model",        type: "action",  emoji: "📊" },
        { id: "4", name: "Route Decision",      subtitle: "Score ≥ 70 = MQL",   type: "check",   emoji: "⚖️" },
        { id: "5", name: "Assign & Alert Rep",  subtitle: "Salesforce + Slack", type: "output",  emoji: "📤" },
      ],
    };
  }

  if (lower.includes("follow") || lower.includes("demo") || lower.includes("email")) {
    return {
      reply: "Perfect — a post-demo follow-up workflow. I'll pull your call notes, draft a personalised email, and send it once it passes a quality check. Here's the plan:",
      steps: [
        { id: "1", name: "Demo Completed",     subtitle: "CRM stage change",    type: "trigger", emoji: "🎤" },
        { id: "2", name: "Pull Call Notes",    subtitle: "Gong / Notion",       type: "action",  emoji: "📋" },
        { id: "3", name: "Draft Follow-up",    subtitle: "Personalised email",  type: "action",  emoji: "✍️" },
        { id: "4", name: "Check Tone & Facts", subtitle: "AI review pass",      type: "check",   emoji: "⚖️" },
        { id: "5", name: "Send & Log",         subtitle: "Gmail + Salesforce",  type: "output",  emoji: "📤" },
      ],
    };
  }

  if (lower.includes("competitive") || lower.includes("digest") || lower.includes("slack")) {
    return {
      reply: "Nice — a weekly competitive intelligence digest sent to your team on Slack. I'll pull the latest signals, summarise them, and deliver every week. Here's what I'm putting together:",
      steps: [
        { id: "1", name: "Weekly Schedule",      subtitle: "Every Monday 8 AM",   type: "trigger", emoji: "⏰" },
        { id: "2", name: "Gather Signals",        subtitle: "News + G2 + LinkedIn",type: "action",  emoji: "🔍" },
        { id: "3", name: "Summarise & Rank",      subtitle: "AI digest",           type: "action",  emoji: "✍️" },
        { id: "4", name: "Relevance Check",       subtitle: "Filter low signal",   type: "check",   emoji: "⚖️" },
        { id: "5", name: "Post to Slack",         subtitle: "#competitive channel",type: "output",  emoji: "📤" },
      ],
    };
  }

  // Generic fallback
  return {
    reply: "Sounds good — let me build that workflow for you. I've put together an initial structure based on what you described. Does this look right, or would you like to adjust any steps?",
    steps: [
      { id: "1", name: "Trigger Event",    subtitle: "Define trigger",        type: "trigger", emoji: "⚡" },
      { id: "2", name: "Gather Context",   subtitle: "Fetch relevant data",   type: "action",  emoji: "🔍" },
      { id: "3", name: "AI Processing",    subtitle: "Analyse & decide",      type: "action",  emoji: "🤖" },
      { id: "4", name: "Validate Output",  subtitle: "Quality check",         type: "check",   emoji: "⚖️" },
      { id: "5", name: "Deliver Result",   subtitle: "Notify / update / send",type: "output",  emoji: "📤" },
    ],
  };
}

// ─── Step detail panel (right pane) ──────────────────────────────────────────

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
            This step will be configured automatically based on your workflow description. You can customise it after saving.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Run graph (center pane) ──────────────────────────────────────────────────

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
              Building…
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
            <p className="text-[13px] font-semibold text-foreground">Your workflow will appear here</p>
            <p className="text-[12px] text-muted-foreground max-w-[200px]">
              Describe what you want to automate in the chat and I'll build it for you.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-0">

            {/* Start node */}
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

            {/* End connector + node */}
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

export default function NewWorkflowPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "intro",
      role: "assistant",
      text: `Hi! I'm here to help you build a new ${WORKFLOW_LABEL.toLowerCase()}. Describe what you'd like to automate and I'll put it together for you.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [steps, setSteps] = useState<BuildStep[]>([]);
  const [isBuilding, setIsBuilding] = useState(false);
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [workflowName, setWorkflowName] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const selectedStep = steps.find((s) => s.id === selectedStepId) ?? null;
  const canSave = steps.length > 0 && !isBuilding;

  function handleSend(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setInput("");

    const userMsg: Message = { id: Date.now().toString(), role: "user", text: msg };
    setMessages((prev) => [...prev, userMsg]);
    setIsBuilding(true);

    setTimeout(() => {
      const { reply, steps: newSteps } = getAiResponse(msg);
      const name = newSteps[0]?.name ? msg.slice(0, 40) : "New Workflow";
      setWorkflowName(name.length > 40 ? name.slice(0, 40) + "…" : name);
      setSteps(newSteps);
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", text: reply },
      ]);
      setIsBuilding(false);
    }, 1400);
  }

  function handleSave() {
    setIsSaving(true);
    setTimeout(() => {
      router.push("/workflows/lead-qualification-flow");
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
            {workflowName || `New ${WORKFLOW_LABEL}`}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {canSave && (
            <button
              onClick={() => router.push("/workflows/lead-qualification-flow")}
              className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[13px] font-medium text-muted-foreground hover:bg-muted transition-colors"
            >
              <Eye className="h-3.5 w-3.5" />
              Preview
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={!canSave || isSaving}
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
            <p className="text-[13px] font-semibold text-foreground">Build with AI</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed",
                    msg.role === "user"
                      ? "bg-primary text-white rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  )}
                >
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

          {/* Example prompts — only if no steps yet */}
          {steps.length === 0 && !isBuilding && (
            <div className="shrink-0 px-4 pb-3 space-y-1.5">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide px-0.5">Try an example</p>
              {EXAMPLE_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="w-full rounded-xl border border-border bg-muted/40 px-3 py-2.5 text-left text-[12px] text-muted-foreground hover:bg-muted hover:text-foreground transition-colors leading-relaxed"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="shrink-0 border-t border-border px-4 py-3">
            <div className="flex items-end gap-2">
              <textarea
                rows={2}
                placeholder="Describe what you want to automate…"
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
        <div className={cn("flex flex-col overflow-hidden transition-all duration-200", selectedStep ? "flex-1" : "flex-1")}>
          <RunGraph
            steps={steps}
            selectedStepId={selectedStepId}
            onSelectStep={(id) => setSelectedStepId(selectedStepId === id ? null : id)}
            isBuilding={isBuilding}
          />
        </div>

        {/* ── RIGHT: Step detail (optional) ── */}
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
