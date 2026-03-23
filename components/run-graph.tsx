"use client";

import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type StepType = "trigger" | "action" | "check" | "output";

interface RunStep {
  label: string;
  emoji: string;
  type: StepType;
  sublabel?: string;
}

// ─── Step colour map ─────────────────────────────────────────────────────────

const STEP_STYLES: Record<StepType, { border: string; bg: string; badge: string; dot: string }> = {
  trigger: { border: "border-violet-200", bg: "bg-violet-50",  badge: "bg-violet-100 text-violet-700",  dot: "bg-violet-400" },
  action:  { border: "border-sky-200",    bg: "bg-sky-50",     badge: "bg-sky-100    text-sky-700",     dot: "bg-sky-400"    },
  check:   { border: "border-amber-200",  bg: "bg-amber-50",   badge: "bg-amber-100  text-amber-700",   dot: "bg-amber-400"  },
  output:  { border: "border-emerald-200",bg: "bg-emerald-50", badge: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-400"},
};

const TYPE_LABEL: Record<StepType, string> = {
  trigger: "Trigger",
  action:  "Action",
  check:   "Check",
  output:  "Output",
};

// ─── Step templates keyed by first-word of agent name ────────────────────────

const TEMPLATES: Record<string, RunStep[]> = {
  resume: [
    { label: "New Application",    emoji: "📬", type: "trigger",  sublabel: "ATS / email" },
    { label: "Parse Resume",       emoji: "🔍", type: "action",   sublabel: "Extract fields" },
    { label: "Score vs Criteria",  emoji: "📊", type: "action",   sublabel: "0–100 rating" },
    { label: "Check Threshold",    emoji: "⚖️", type: "check",    sublabel: "≥ 80 = shortlist" },
    { label: "Notify Recruiter",   emoji: "📤", type: "output",   sublabel: "Slack + email" },
  ],
  onboarding: [
    { label: "Hire Confirmed",     emoji: "🎉", type: "trigger",  sublabel: "HRIS event" },
    { label: "Provision Accounts", emoji: "🔑", type: "action",   sublabel: "IT + tools" },
    { label: "Send Welcome Kit",   emoji: "📦", type: "action",   sublabel: "Email + Slack" },
    { label: "Check Completion",   emoji: "✅", type: "check",    sublabel: "Day 3 review" },
    { label: "Manager Alert",      emoji: "📤", type: "output",   sublabel: "Summary report" },
  ],
  interview: [
    { label: "Role Approved",      emoji: "📋", type: "trigger",  sublabel: "ATS stage change" },
    { label: "Find Slots",         emoji: "📅", type: "action",   sublabel: "Check calendars" },
    { label: "Send Invites",       emoji: "✉️", type: "action",   sublabel: "Candidate + panel" },
    { label: "Confirm Attendance", emoji: "⚖️", type: "check",    sublabel: "24h before" },
    { label: "Add Prep Notes",     emoji: "📤", type: "output",   sublabel: "Notion + Slack" },
  ],
  pipeline: [
    { label: "Daily Trigger",      emoji: "⏰", type: "trigger",  sublabel: "9 AM weekdays" },
    { label: "Fetch CRM Data",     emoji: "☁️", type: "action",   sublabel: "Salesforce query" },
    { label: "Analyze Deals",      emoji: "📊", type: "action",   sublabel: "Stage + velocity" },
    { label: "Flag At-Risk",       emoji: "⚖️", type: "check",    sublabel: "> 2 wks stalled" },
    { label: "Send Digest",        emoji: "📤", type: "output",   sublabel: "Slack + email" },
  ],
  lead: [
    { label: "New Lead",           emoji: "📬", type: "trigger",  sublabel: "Form / API" },
    { label: "Enrich Data",        emoji: "🔍", type: "action",   sublabel: "Clearbit / Clay" },
    { label: "Score ICP Fit",      emoji: "📊", type: "action",   sublabel: "0–100 model" },
    { label: "Route Decision",     emoji: "⚖️", type: "check",    sublabel: "Score ≥ 70" },
    { label: "Assign & Alert",     emoji: "📤", type: "output",   sublabel: "CRM + rep Slack" },
  ],
  content: [
    { label: "Brief Created",      emoji: "✍️", type: "trigger",  sublabel: "Notion / Asana" },
    { label: "Generate Draft",     emoji: "🤖", type: "action",   sublabel: "AI writing" },
    { label: "SEO Check",          emoji: "🔍", type: "action",   sublabel: "Keywords + score" },
    { label: "Review Gate",        emoji: "⚖️", type: "check",    sublabel: "Brand alignment" },
    { label: "Publish & Track",    emoji: "📤", type: "output",   sublabel: "CMS + analytics" },
  ],
  pr: [
    { label: "PR Opened",          emoji: "🔀", type: "trigger",  sublabel: "GitHub event" },
    { label: "Static Analysis",    emoji: "🔍", type: "action",   sublabel: "Lint + security" },
    { label: "Review Code",        emoji: "🤖", type: "action",   sublabel: "AI comments" },
    { label: "Check Thresholds",   emoji: "⚖️", type: "check",    sublabel: "Coverage + errors" },
    { label: "Post Review",        emoji: "📤", type: "output",   sublabel: "GitHub + Slack" },
  ],
};

const DEFAULT_STEPS: RunStep[] = [
  { label: "Trigger",          emoji: "⚡", type: "trigger", sublabel: "Event / schedule" },
  { label: "Gather Context",   emoji: "🔍", type: "action",  sublabel: "Fetch relevant data" },
  { label: "Process & Decide", emoji: "🤖", type: "action",  sublabel: "AI reasoning" },
  { label: "Validate",         emoji: "⚖️", type: "check",   sublabel: "Rules + guardrails" },
  { label: "Deliver Output",   emoji: "📤", type: "output",  sublabel: "Notify / update / log" },
];

function deriveSteps(name: string): RunStep[] {
  const first = name.split(" ")[0].toLowerCase();
  return TEMPLATES[first] ?? DEFAULT_STEPS;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function RunGraph({ name }: { name: string }) {
  const steps = deriveSteps(name);

  return (
    <div className="overflow-x-auto pb-1">
      <div className="flex min-w-max items-start gap-0">
        {steps.map((step, i) => {
          const s = STEP_STYLES[step.type];
          return (
            <div key={i} className="flex items-center">
              {/* Step node */}
              <div className={cn(
                "flex w-[130px] flex-col items-center rounded-2xl border px-3 py-3 text-center",
                s.border, s.bg
              )}>
                <span className="text-[22px] leading-none">{step.emoji}</span>
                <p className="mt-2 text-[13px] font-semibold leading-tight text-foreground">{step.label}</p>
                {step.sublabel && (
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{step.sublabel}</p>
                )}
                <span className={cn(
                  "mt-2 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                  s.badge
                )}>
                  {TYPE_LABEL[step.type]}
                </span>
              </div>

              {/* Connector arrow (not after last step) */}
              {i < steps.length - 1 && (
                <div className="flex w-8 shrink-0 flex-col items-center gap-0.5">
                  <div className="h-[1px] w-full border-t-2 border-dashed border-border" />
                  <svg width="10" height="10" className="-mt-[5px] -mr-[1px] self-end" viewBox="0 0 10 10">
                    <path d="M0 5 L10 5 M6 1 L10 5 L6 9" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-border" />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
