"use client";

import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  MessageCircle,
  Workflow,
  Bot,
  Zap,
  Shield,
  BarChart3,
  Users,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-[17px] font-bold tracking-tight">AgentSpot</span>
        </div>
        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-[14px] text-muted-foreground transition-colors hover:text-foreground">Features</a>
          <a href="#how-it-works" className="text-[14px] text-muted-foreground transition-colors hover:text-foreground">How it works</a>
          <a href="#use-cases" className="text-[14px] text-muted-foreground transition-colors hover:text-foreground">Use cases</a>
          <a href="#testimonials" className="text-[14px] text-muted-foreground transition-colors hover:text-foreground">Testimonials</a>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/onboarding"
            className="rounded-lg bg-primary px-4 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
          >
            Open App
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-indigo-50/40 to-white px-6 pb-24 pt-36">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[13px] font-medium text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Find peace in your workspace. Built with 💙 from ThoughtSpot
        </div>
        <h1 className="text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
          Your work is chaos.
          <br />
          <span className="bg-gradient-to-r from-primary to-indigo-400 bg-clip-text text-transparent">
            AgentSpot is the calm.
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          The busywork, the follow-ups, the repetitive tasks that drain your day —
          AgentSpot takes them off your plate. Create agents, build workflows, and
          reclaim your focus through simple conversation.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-[15px] font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
          >
            Find your calm <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-[15px] font-semibold text-foreground transition-colors hover:bg-muted/50"
          >
            See how it works
          </a>
        </div>
        <p className="mt-4 text-[13px] text-muted-foreground/60">
          No credit card required. Free for teams up to 10.
        </p>
      </div>
    </section>
  );
}

const FEATURES = [
  {
    icon: MessageCircle,
    title: "Just talk to it",
    description: "No manuals, no training. Tell AgentSpot what's overwhelming you and it gets to work — like handing tasks to a trusted teammate.",
  },
  {
    icon: Bot,
    title: "Agents that work for you",
    description: "Create AI agents that handle the repetitive stuff around the clock — screening resumes, answering FAQs, tracking approvals — so you don't have to.",
  },
  {
    icon: Workflow,
    title: "Workflows, not busywork",
    description: "Turn chaotic multi-step processes into smooth, automated workflows. No code, no complexity — just describe what you need.",
  },
  {
    icon: Zap,
    title: "Instant relief",
    description: "Describe a task that's been eating your time and AgentSpot builds the automation in seconds. That backlog of busywork? Gone.",
  },
  {
    icon: Shield,
    title: "Peace of mind, built in",
    description: "SOC 2 compliant, end-to-end encryption, and role-based access. Automate with confidence — your data never leaves your control.",
  },
  {
    icon: BarChart3,
    title: "See what you've reclaimed",
    description: "Track the hours saved, tasks automated, and bottlenecks eliminated. Watch your team's focus shift from busywork to meaningful work.",
  },
];

function Features() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Less noise. More focus.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            Every feature in AgentSpot is designed to take something off your plate — so you can focus on work that actually matters.
          </p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border bg-white p-6 transition-all hover:border-primary/20 hover:shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-[16px] font-semibold">{feature.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  {
    step: "1",
    title: "Tell AgentSpot what's draining your day",
    description: "Describe the task, process, or headache in your own words. No jargon, no setup — just say what you need.",
  },
  {
    step: "2",
    title: "AgentSpot creates an agent or workflow",
    description: "It understands what you're dealing with and builds the right solution — an always-on agent or a step-by-step workflow — ready for you to review.",
  },
  {
    step: "3",
    title: "Activate and breathe",
    description: "Approve it, tweak it if you want, and let it run. That task you used to dread? It's handled. Quietly, reliably, in the background.",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-muted/30 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            From overwhelmed to automated in minutes
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            No technical skills required. If you can describe what&apos;s stressing you out, AgentSpot can take it off your hands.
          </p>
        </div>
        <div className="mt-16 space-y-8">
          {STEPS.map((step) => (
            <div key={step.step} className="flex items-start gap-6 rounded-2xl border border-border bg-white p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-xl font-bold text-white">
                {step.step}
              </div>
              <div>
                <h3 className="text-[17px] font-semibold">{step.title}</h3>
                <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const USE_CASES = [
  { role: "HR Teams", tasks: ["Candidate experience agent", "Resume screener agent", "Schedule interview rounds", "Generate offer letters"] },
  { role: "Sales Teams", tasks: ["Summarize CRM pipeline", "Draft follow-up emails", "Generate proposals", "Log meeting notes"] },
  { role: "Finance Teams", tasks: ["Automate expense approvals", "Generate P&L summaries", "Reconcile invoices", "Track budgets"] },
  { role: "Marketing Teams", tasks: ["Analyze campaign performance", "Draft social media posts", "Monitor competitors", "Plan content calendars"] },
];

function UseCases() {
  return (
    <section id="use-cases" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Every team deserves peace
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            No matter your role, the chaos looks different but feels the same. Here&apos;s how teams are finding their calm with AgentSpot.
          </p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {USE_CASES.map((uc) => (
            <div key={uc.role} className="rounded-2xl border border-border bg-white p-6">
              <h3 className="text-[15px] font-semibold">{uc.role}</h3>
              <ul className="mt-4 space-y-2.5">
                {uc.tasks.map((task) => (
                  <li key={task} className="flex items-start gap-2 text-[13px] text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  {
    quote: "Our HR team used to dread Monday mornings — onboarding docs, PTO approvals, compliance reminders piling up. Now AgentSpot agents handle all of it. We actually have time to focus on our people.",
    name: "Priya Sharma",
    role: "Head of People Ops",
    company: "Notion",
  },
  {
    quote: "I told my team to try AgentSpot for a week. Within a day, they'd built follow-up agents and pipeline workflows on their own. No training, no IT tickets. Just calm.",
    name: "Marcus Johnson",
    role: "VP of Sales",
    company: "Stripe",
  },
  {
    quote: "Month-end used to be pure chaos — chasing invoices, reconciling reports, approving expenses. We set up three workflows in AgentSpot and got 60 hours back. It's a different team now.",
    name: "Lisa Chen",
    role: "CFO",
    company: "Figma",
  },
];

function Testimonials() {
  return (
    <section id="testimonials" className="bg-muted/30 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Teams that found their calm
          </h2>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="flex flex-col rounded-2xl border border-border bg-white p-6">
              <p className="flex-1 text-[14px] leading-relaxed text-foreground/80">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 border-t border-border pt-4">
                <p className="text-[13px] font-semibold">{t.name}</p>
                <p className="text-[12px] text-muted-foreground">
                  {t.role}, {t.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-3xl rounded-3xl bg-gradient-to-br from-primary to-indigo-500 p-12 text-center text-white">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Your workspace doesn&apos;t have to be chaotic
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base text-white/80">
          Let AgentSpot handle the noise — the follow-ups, the approvals, the repetitive tasks.
          You focus on the work that gives you energy.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-[15px] font-semibold text-primary shadow-lg transition-transform hover:scale-[1.02]"
          >
            Find your calm <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-[14px] font-semibold">AgentSpot</span>
        </div>
        <p className="text-[13px] text-muted-foreground">
          &copy; 2026 AgentSpot. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function WebsitePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <UseCases />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
