"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Loader2,
  Users,
  Briefcase,
  Sprout,
  Target,
  DollarSign,
  Zap,
  CalendarDays,
  CalendarCheck,
  Video,
  PenLine,
  BarChart3,
  LayoutGrid,
  ClipboardList,
  Globe,
  Cloud,
  GitBranch,
  Layers,
  AlertTriangle,
  Headphones,
  HardDrive,
  FileText,
  Mail,
  MessageSquare,
  TrendingUp,
  Receipt,
  Calculator,
  Database,
  BookOpen,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PERSONA_SKILLS } from "@/lib/persona-skills";

const TOTAL_STEPS = 3;

const ROLE_OPTIONS = [
  "Human Resources",
  "Marketing",
  "Sales",
  "Engineering",
  "Leadership",
  "Finance",
  "Operations",
  "Design",
  "Customer Success",
  "Other",
];

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

/* ─── Integration type ─── */
interface Integration {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  border: string;
  selectedBg: string;
}

function tool(
  id: string, name: string, description: string,
  icon: LucideIcon,
  color: string, bg: string, border: string, selectedBg: string
): Integration {
  return { id, name, description, icon, color, bg, border, selectedBg };
}

/* ─── Tool catalogue ─── */
const TOOLS = {
  // ── HR / People systems
  bamboohr:    tool("bamboohr",    "BambooHR",        "Employee records & HR data",             Users,         "text-green-700",   "bg-green-50",   "border-green-200",  "bg-green-50"),
  workday:     tool("workday",     "Workday",         "HRIS, payroll & workforce management",   Briefcase,     "text-orange-600",  "bg-orange-50",  "border-orange-200", "bg-orange-50"),
  greenhouse:  tool("greenhouse",  "Greenhouse",      "Applicant tracking & recruiting",        Sprout,        "text-emerald-700", "bg-emerald-50", "border-emerald-200","bg-emerald-50"),
  lever:       tool("lever",       "Lever",           "Talent acquisition & pipeline",          Target,        "text-blue-600",    "bg-blue-50",    "border-blue-200",   "bg-blue-50"),
  adp:         tool("adp",         "ADP",             "Payroll, benefits & compliance",         DollarSign,    "text-red-600",     "bg-red-50",     "border-red-200",    "bg-red-50"),
  rippling:    tool("rippling",    "Rippling",        "HR, IT & finance in one place",          Zap,           "text-violet-600",  "bg-violet-50",  "border-violet-200", "bg-violet-50"),
  lattice:     tool("lattice",     "Lattice",         "Performance reviews & engagement",       LayoutGrid,    "text-pink-600",    "bg-pink-50",    "border-pink-200",   "bg-pink-50"),
  cultureamp:  tool("cultureamp",  "Culture Amp",     "Employee engagement & feedback",        BarChart3,     "text-rose-600",    "bg-rose-50",    "border-rose-200",   "bg-rose-50"),
  docusign:    tool("docusign",    "DocuSign",        "E-signatures for offers & contracts",    PenLine,       "text-yellow-600",  "bg-yellow-50",  "border-yellow-200", "bg-yellow-50"),
  zendesk:     tool("zendesk",     "Zendesk",         "Employee support tickets",               Headphones,    "text-green-600",   "bg-green-50",   "border-green-200",  "bg-green-50"),
  surveymonkey:tool("surveymonkey","SurveyMonkey",    "Surveys & feedback collection",          ClipboardList, "text-teal-600",    "bg-teal-50",    "border-teal-200",   "bg-teal-50"),
  calendly:    tool("calendly",    "Calendly",        "Candidate & interview scheduling",       CalendarCheck, "text-sky-600",     "bg-sky-50",     "border-sky-200",    "bg-sky-50"),
  zoom:        tool("zoom",        "Zoom",            "Video interviews & onboarding calls",    Video,         "text-blue-700",    "bg-blue-50",    "border-blue-200",   "bg-blue-50"),
  gcal:        tool("gcal",        "Google Calendar", "Scheduling & availability",              CalendarDays,  "text-sky-500",     "bg-sky-50",     "border-sky-200",    "bg-sky-50"),
  slack:       tool("slack",       "Slack",           "Team messaging & notifications",         MessageSquare, "text-violet-600",  "bg-violet-50",  "border-violet-200", "bg-violet-50"),
  notion:      tool("notion",      "Notion",          "Docs, wikis & knowledge base",           FileText,      "text-foreground",  "bg-muted",      "border-border",     "bg-muted"),
  gdrive:      tool("gdrive",      "Google Drive",    "Docs, Sheets & shared files",            HardDrive,     "text-yellow-600",  "bg-yellow-50",  "border-yellow-200", "bg-yellow-50"),
  confluence:  tool("confluence",  "Confluence",      "Internal wikis & policy docs",           BookOpen,      "text-blue-600",    "bg-blue-50",    "border-blue-200",   "bg-blue-50"),
  linkedin:    tool("linkedin",    "LinkedIn",        "Talent sourcing & job postings",         Globe,         "text-sky-700",     "bg-sky-50",     "border-sky-200",    "bg-sky-50"),
  // ── Sales / Marketing
  salesforce:  tool("salesforce",  "Salesforce",      "CRM & pipeline management",              Cloud,         "text-sky-600",     "bg-sky-50",     "border-sky-200",    "bg-sky-50"),
  hubspot:     tool("hubspot",     "HubSpot",         "Marketing, CRM & email automation",      TrendingUp,    "text-orange-600",  "bg-orange-50",  "border-orange-200", "bg-orange-50"),
  outreach:    tool("outreach",    "Outreach",        "Sales engagement & cadences",            Zap,           "text-violet-600",  "bg-violet-50",  "border-violet-200", "bg-violet-50"),
  ganalytics:  tool("ganalytics",  "Google Analytics","Website & campaign analytics",           BarChart3,     "text-amber-600",   "bg-amber-50",   "border-amber-200",  "bg-amber-50"),
  gads:        tool("gads",        "Google Ads",      "Paid search campaigns",                  TrendingUp,    "text-blue-600",    "bg-blue-50",    "border-blue-200",   "bg-blue-50"),
  gmail:       tool("gmail",       "Gmail",           "Email & calendar events",                Mail,          "text-red-500",     "bg-red-50",     "border-red-200",    "bg-red-50"),
  // ── Engineering
  github:      tool("github",      "GitHub",          "Code, pull requests & CI/CD",            GitBranch,     "text-foreground",  "bg-muted",      "border-border",     "bg-muted"),
  jira:        tool("jira",        "Jira",            "Issues, sprints & backlogs",             Layers,        "text-blue-600",    "bg-blue-50",    "border-blue-200",   "bg-blue-50"),
  sentry:      tool("sentry",      "Sentry",          "Error tracking & performance",           AlertTriangle, "text-rose-600",    "bg-rose-50",    "border-rose-200",   "bg-rose-50"),
  linear:      tool("linear",      "Linear",          "Project & issue tracking",               Target,        "text-violet-600",  "bg-violet-50",  "border-violet-200", "bg-violet-50"),
  datadog:     tool("datadog",     "Datadog",         "Monitoring, logs & alerting",            BarChart3,     "text-purple-600",  "bg-purple-50",  "border-purple-200", "bg-purple-50"),
  // ── Finance
  quickbooks:  tool("quickbooks",  "QuickBooks",      "Accounting & financial reporting",       Calculator,    "text-green-700",   "bg-green-50",   "border-green-200",  "bg-green-50"),
  netsuite:    tool("netsuite",    "NetSuite",        "ERP & financial management",             Database,      "text-sky-600",     "bg-sky-50",     "border-sky-200",    "bg-sky-50"),
  expensify:   tool("expensify",   "Expensify",       "Expense reports & receipts",             Receipt,       "text-pink-600",    "bg-pink-50",    "border-pink-200",   "bg-pink-50"),
  xero:        tool("xero",        "Xero",            "Accounting & invoicing",                 BookOpen,      "text-sky-700",     "bg-sky-50",     "border-sky-200",    "bg-sky-50"),
  concur:      tool("concur",      "SAP Concur",      "Travel & expense management",            Briefcase,     "text-blue-700",    "bg-blue-50",    "border-blue-200",   "bg-blue-50"),
};

/* ─── Helper → tools mapping ─── */
type ToolId = keyof typeof TOOLS;

const HELPER_TOOLS: Record<string, ToolId[]> = {
  // HR helpers
  "benefits-faq-agent":         ["bamboohr", "workday", "adp", "rippling", "zendesk", "confluence"],
  "benefits-faq":               ["bamboohr", "workday", "adp", "rippling", "zendesk", "confluence"],
  "resume-screener":            ["greenhouse", "lever", "linkedin", "workday", "gcal", "gdrive"],
  "resume-screener-helper":     ["greenhouse", "lever", "linkedin", "workday", "gcal", "gdrive"],
  "onboarding-bot":             ["bamboohr", "greenhouse", "slack", "notion", "gdrive", "zoom"],
  "candidate-experience-helper":["greenhouse", "lever", "gcal", "zoom", "slack", "linkedin"],
  "interview-scheduler":        ["gcal", "greenhouse", "calendly", "zoom", "slack", "lever"],
  "schedule-interviews":        ["gcal", "greenhouse", "calendly", "zoom", "slack", "lever"],
  "offer-letter-generator":     ["docusign", "bamboohr", "workday", "greenhouse", "gdrive", "lever"],
  "generate-offer-letters":     ["docusign", "bamboohr", "workday", "greenhouse", "gdrive", "lever"],
  "pto-tracker":                ["bamboohr", "workday", "rippling", "adp", "gcal", "slack"],
  "pto-management-workflow":    ["bamboohr", "workday", "rippling", "adp", "gcal", "slack"],
  "engagement-survey-agent":    ["cultureamp", "lattice", "surveymonkey", "slack", "workday", "notion"],
  "performance-review-agent":   ["lattice", "workday", "bamboohr", "slack", "notion", "gcal"],
  "job-description-agent":      ["greenhouse", "lever", "linkedin", "notion", "gdrive", "slack"],
  "offboarding-workflow":       ["bamboohr", "workday", "rippling", "slack", "gdrive", "zendesk"],
  "compliance-reminder-workflow":["bamboohr", "workday", "adp", "slack", "notion", "gcal"],
  // Marketing helpers
  "content-generator":          ["hubspot", "notion", "gdrive", "slack", "confluence", "ganalytics"],
  "analyze-campaigns":          ["ganalytics", "hubspot", "salesforce", "gads", "slack", "notion"],
  "campaign-analyst":           ["ganalytics", "hubspot", "salesforce", "gads", "slack", "notion"],
  "draft-social-posts":         ["slack", "notion", "gdrive", "hubspot", "ganalytics", "gmail"],
  "social-publisher":           ["slack", "notion", "gdrive", "hubspot", "ganalytics", "gmail"],
  "seo-keyword-analysis":       ["ganalytics", "gads", "hubspot", "notion", "gdrive", "slack"],
  "email-campaign-builder":     ["hubspot", "gmail", "salesforce", "ganalytics", "slack", "notion"],
  "plan-content-calendar":      ["notion", "gdrive", "slack", "hubspot", "gcal", "confluence"],
  // Sales helpers
  "lead-scorer":                ["salesforce", "hubspot", "linkedin", "outreach", "gmail", "slack"],
  "lead-scoring":               ["salesforce", "hubspot", "linkedin", "outreach", "gmail", "slack"],
  "follow-up-drafter":          ["salesforce", "hubspot", "outreach", "gmail", "slack", "gcal"],
  "draft-follow-ups":           ["salesforce", "hubspot", "outreach", "gmail", "slack", "gcal"],
  "crm-updater":                ["salesforce", "hubspot", "slack", "gcal", "gmail", "notion"],
  "pipeline-summary":           ["salesforce", "hubspot", "slack", "ganalytics", "gdrive", "notion"],
  "generate-proposals":         ["salesforce", "gdrive", "docusign", "slack", "hubspot", "gmail"],
  // Engineering helpers
  "pr-reviewer":                ["github", "jira", "slack", "linear", "notion", "confluence"],
  "pr-review-summary":          ["github", "jira", "slack", "linear", "notion", "confluence"],
  "bug-triager":                ["jira", "github", "sentry", "slack", "linear", "datadog"],
  "bug-triage":                 ["jira", "github", "sentry", "slack", "linear", "datadog"],
  "deploy-monitor":             ["github", "datadog", "sentry", "slack", "jira", "linear"],
  "sprint-report":              ["jira", "github", "linear", "slack", "notion", "gdrive"],
  "incident-post-mortem":       ["sentry", "datadog", "jira", "slack", "github", "notion"],
  // Leadership helpers
  "status-aggregator":          ["slack", "notion", "jira", "gcal", "gdrive", "confluence"],
  "meeting-prep-bot":           ["gcal", "slack", "notion", "gdrive", "salesforce", "confluence"],
  "okr-tracking":               ["lattice", "notion", "jira", "slack", "gdrive", "gcal"],
  "board-deck-builder":         ["gdrive", "notion", "salesforce", "quickbooks", "slack", "gcal"],
  "weekly-status-report":       ["slack", "notion", "jira", "gcal", "gdrive", "confluence"],
  "team-performance":           ["lattice", "jira", "slack", "notion", "bamboohr", "gcal"],
  // Finance helpers
  "expense-processor":          ["expensify", "concur", "rippling", "quickbooks", "slack", "gdrive"],
  "expense-approvals":          ["expensify", "concur", "rippling", "quickbooks", "slack", "gdrive"],
  "invoice-matcher":            ["quickbooks", "netsuite", "xero", "gdrive", "slack", "gmail"],
  "reconcile-invoices":         ["quickbooks", "netsuite", "xero", "gdrive", "slack", "gmail"],
  "budget-monitor":             ["quickbooks", "netsuite", "gdrive", "slack", "notion", "ganalytics"],
  "budget-tracking":            ["quickbooks", "netsuite", "gdrive", "slack", "notion", "ganalytics"],
  "monthly-pl":                 ["quickbooks", "netsuite", "xero", "gdrive", "slack", "notion"],
  "cash-flow-forecast":         ["quickbooks", "netsuite", "xero", "salesforce", "gdrive", "slack"],
};

/* Role-level fallbacks when no helper-specific match */
const ROLE_TOOLS: Record<string, ToolId[]> = {
  hr:          ["bamboohr", "workday", "greenhouse", "slack", "gcal", "gdrive"],
  marketing:   ["hubspot", "ganalytics", "salesforce", "slack", "notion", "gdrive"],
  sales:       ["salesforce", "hubspot", "outreach", "gmail", "slack", "gcal"],
  engineering: ["github", "jira", "slack", "sentry", "notion", "linear"],
  leadership:  ["slack", "notion", "gcal", "gdrive", "salesforce", "lattice"],
  finance:     ["quickbooks", "netsuite", "expensify", "slack", "gdrive", "xero"],
};

function getToolsForHelper(role: string, helperLabel: string): Integration[] {
  const slug = helperLabel.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  const personaId = ROLE_TO_PERSONA[role] ?? "hr";
  const ids: ToolId[] = HELPER_TOOLS[slug] ?? ROLE_TOOLS[personaId] ?? ["slack", "gdrive", "notion", "gcal", "gmail", "confluence"];
  return ids.map((id) => TOOLS[id]).filter(Boolean);
}

/* ─── Progress bar ─── */
function ProgressBar({ step }: { step: number }) {
  const progress = (step / TOTAL_STEPS) * 100;
  return (
    <div className="h-1 w-full bg-muted">
      <div
        className="h-full rounded-r-full bg-primary transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

/* ─── Step 1: Role Picker ─── */
function StepOne({
  role,
  setRole,
}: {
  role: string;
  setRole: (v: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2.5">
        {ROLE_OPTIONS.map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={cn(
              "rounded-lg border px-4 py-2 text-[13px] font-medium transition-all",
              role === r
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-foreground/60 hover:border-primary/30 hover:bg-primary/5"
            )}
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Step 2: Pick ONE helper ─── */
function StepTwo({
  role,
  selectedHelper,
  setSelectedHelper,
}: {
  role: string;
  selectedHelper: string;
  setSelectedHelper: (v: string) => void;
}) {
  const personaId = ROLE_TO_PERSONA[role] ?? "hr";
  const skills = (PERSONA_SKILLS[personaId] ?? PERSONA_SKILLS.hr).slice(0, 6);

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((skill) => {
        const selected = selectedHelper === skill.label;
        const Icon = skill.icon;
        return (
          <button
            key={skill.label}
            onClick={() => setSelectedHelper(skill.label)}
            className={cn(
              "relative flex items-start gap-3 rounded-xl border p-4 text-left transition-all duration-150",
              selected
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border bg-white hover:border-primary/30 hover:bg-primary/[0.03]"
            )}
          >
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                selected ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1 pr-5">
              <p className={cn("text-[13px] font-semibold leading-snug", selected ? "text-primary" : "text-foreground")}>
                {skill.label}
              </p>
              <p className="mt-0.5 text-[12px] leading-snug text-muted-foreground">{skill.description}</p>
            </div>
            {selected && (
              <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                <Check className="h-3 w-3 text-white" />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Step 3: Connect tools ─── */
function StepThree({
  role,
  selectedHelper,
  connected,
  setConnected,
}: {
  role: string;
  selectedHelper: string;
  connected: Set<string>;
  setConnected: (v: Set<string>) => void;
}) {
  const integrations = getToolsForHelper(role, selectedHelper);

  function toggle(id: string) {
    const next = new Set(connected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setConnected(next);
  }

  return (
    <div className="space-y-4">
      {selectedHelper && (
        <div className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-2.5">
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary" />
          <p className="text-[13px] text-primary/80">
            Showing tools that work best with{" "}
            <span className="font-semibold text-primary">{selectedHelper}</span>
          </p>
        </div>
      )}

      <div className="grid gap-2.5 sm:grid-cols-2">
        {integrations.map((app) => {
          const isOn = connected.has(app.id);
          const Icon = app.icon;
          return (
            <button
              key={app.id}
              onClick={() => toggle(app.id)}
              className={cn(
                "flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all duration-150",
                isOn
                  ? `${app.border} ${app.selectedBg} shadow-sm`
                  : "border-border bg-white hover:border-primary/20 hover:bg-muted/30"
              )}
            >
              <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", isOn ? app.bg : "bg-muted")}>
                <Icon className={cn("h-4 w-4", isOn ? app.color : "text-muted-foreground")} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn("text-[13px] font-semibold", isOn ? "text-foreground" : "text-foreground/70")}>
                  {app.name}
                </p>
                <p className="text-[11px] text-muted-foreground leading-snug">{app.description}</p>
              </div>
              <div
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                  isOn ? "border-primary bg-primary" : "border-border bg-white"
                )}
              >
                {isOn && <Check className="h-3 w-3 text-white" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Building overlay ─── */
function BuildingOverlay({ helperName }: { helperName: string }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-white">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/30">
        <Sparkles className="h-7 w-7 text-white" />
      </div>
      <div className="space-y-1.5 text-center">
        <p className="text-[18px] font-bold tracking-tight text-foreground">Building your helper…</p>
        <p className="text-[13px] text-muted-foreground">
          Setting up <span className="font-medium text-foreground">{helperName || "your first helper"}</span>
        </p>
      </div>
      <Loader2 className="h-5 w-5 animate-spin text-primary/50" />
    </div>
  );
}

/* ─── Main page ─── */
export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [building, setBuilding] = useState(false);

  const [role, setRole] = useState("");
  const [selectedHelper, setSelectedHelper] = useState("");
  const [connected, setConnected] = useState<Set<string>>(new Set());

  function handleNext() {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      try {
        localStorage.setItem("spotterwork_first_helper", selectedHelper);
        localStorage.setItem("spotterwork_role", role);
        if (selectedHelper) {
          localStorage.setItem("spotterwork_selected_skills", JSON.stringify([selectedHelper]));
        }
      } catch { /* ignore */ }
      setBuilding(true);
      setTimeout(() => router.push("/home"), 2200);
    }
  }

  function handlePrevious() {
    if (step > 1) setStep(step - 1);
  }

  function handleSkip() {
    router.push("/home");
  }

  const titles: Record<number, { heading: string; sub: string }> = {
    1: {
      heading: "What best describes your role?",
      sub: "SpotterWork tailors your experience based on how you work.",
    },
    2: {
      heading: "What do you want to build first?",
      sub: "Pick one area — your helper will be ready the moment you land.",
    },
    3: {
      heading: "Connect your tools",
      sub: "Give your helper the context it needs. Skip anything you'd like.",
    },
  };

  const canAdvance = step === 1 ? !!role : step === 2 ? !!selectedHelper : true;

  if (building) return <BuildingOverlay helperName={selectedHelper} />;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-[15px] font-semibold tracking-tight">SpotterWork</span>
        </div>
        <button
          onClick={handleSkip}
          className="text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Skip
        </button>
      </header>

      <ProgressBar step={step} />

      <div
        className={cn(
          "mx-auto w-full px-6 pt-[10vh]",
          step === 2 ? "max-w-3xl" : step === 3 ? "max-w-xl" : "max-w-md"
        )}
      >
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">{titles[step].heading}</h1>
          <p className="text-[14px] text-muted-foreground">{titles[step].sub}</p>
        </div>

        <div className="mt-8">
          {step === 1 && (
            <StepOne role={role} setRole={setRole} />
          )}
          {step === 2 && (
            <StepTwo role={role} selectedHelper={selectedHelper} setSelectedHelper={setSelectedHelper} />
          )}
          {step === 3 && (
            <StepThree
              role={role}
              selectedHelper={selectedHelper}
              connected={connected}
              setConnected={setConnected}
            />
          )}
        </div>

        <div className="mt-8 flex items-center justify-between pb-12">
          <div>
            {step > 1 && (
              <button
                onClick={handlePrevious}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-muted/50"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {step === 3 && (
              <button
                onClick={handleSkip}
                className="text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Connect later
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!canAdvance}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-5 py-2 text-[13px] font-medium transition-all",
                canAdvance
                  ? "bg-primary text-white hover:opacity-90"
                  : "cursor-not-allowed bg-muted text-muted-foreground"
              )}
            >
              {step === TOTAL_STEPS ? "Build my Helper" : "Next"}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
