export interface WorkflowItem {
  id: string;
  name: string;
  description: string;
  color: string;
  emoji: string;
}

export interface WorkflowsTabData {
  mine: WorkflowItem[];
  shared: WorkflowItem[];
  community: WorkflowItem[];
}

// ─── Sales (used for ALL personas in this prototype) ─────────────────────────

const SALES_WORKFLOWS: WorkflowsTabData = {
  mine: [
    { id: "w1", name: "Lead Qualification Flow",   description: "Scores, enriches, and routes inbound leads to the right rep",           color: "bg-violet-100", emoji: "🎯" },
    { id: "w2", name: "Post-Demo Follow-up",        description: "Pulls call notes and sends a personalised follow-up email after demos",  color: "bg-blue-100",   emoji: "✉️" },
    { id: "w3", name: "Proposal Generator",         description: "Creates custom proposals from templates with live deal data",            color: "bg-emerald-100", emoji: "📋" },
    { id: "w4", name: "Deal Stage Updater",         description: "Listens to call transcripts and updates CRM stages automatically",       color: "bg-amber-100",  emoji: "💾" },
  ],
  shared: [
    { id: "s1", name: "Pipeline Review Prep",      description: "Generates pipeline summaries and flags at-risk deals before review meetings", color: "bg-pink-100",   emoji: "📊" },
    { id: "s2", name: "Contract Approval Flow",     description: "Routes contracts through legal and finance for sign-off",                    color: "bg-orange-100", emoji: "📑" },
    { id: "s3", name: "Win Announcement",           description: "Posts deal closures to Slack and updates the leaderboard",                   color: "bg-teal-100",   emoji: "🏆" },
  ],
  community: [
    { id: "c1",  name: "Cold Outreach Sequencer",     description: "Sends multi-step personalised outreach emails with smart timing",                 color: "bg-rose-100",    emoji: "📤" },
    { id: "c2",  name: "Renewal Reminder Pipeline",   description: "Alerts reps 90/60/30 days before contract renewals with health scores",            color: "bg-cyan-100",    emoji: "🔔" },
    { id: "c3",  name: "Competitive Battle Cards",    description: "Auto-updates competitive positioning docs from market intelligence",               color: "bg-lime-100",    emoji: "⚔️" },
    { id: "c4",  name: "Commission Calculator",       description: "Computes commissions on close and sends rep payout notifications",                 color: "bg-purple-100",  emoji: "💰" },
    { id: "c5",  name: "Handoff to CS",               description: "Transfers deal context and notes to customer success after close",                 color: "bg-indigo-100",  emoji: "🤝" },
    { id: "c6",  name: "Account Health Scorer",       description: "Evaluates product usage, engagement, and sentiment to produce a health score",     color: "bg-sky-100",     emoji: "❤️" },
    { id: "c7",  name: "Meeting Prep Briefing",       description: "Pulls CRM history, news, and LinkedIn data before every customer call",            color: "bg-amber-100",   emoji: "📋" },
    { id: "c8",  name: "Territory Quota Planner",     description: "Models quota allocation across territories based on market potential and history",  color: "bg-emerald-100", emoji: "🗺️" },
    { id: "c9",  name: "Demo Follow-up Tracker",      description: "Tracks post-demo tasks, nudges reps on overdue follow-ups, and logs progress",     color: "bg-pink-100",    emoji: "📌" },
    { id: "c10", name: "Deal Risk Detector",          description: "Flags stalled deals, missing next steps, and contacts who went dark",              color: "bg-red-100",     emoji: "⚠️" },
    { id: "c11", name: "Upsell Opportunity Finder",   description: "Scans usage data to surface expansion opportunities in existing accounts",          color: "bg-teal-100",    emoji: "📈" },
    { id: "c12", name: "Rep Onboarding Ramp",         description: "Guides new sales reps through product training, shadowing, and first call milestones", color: "bg-violet-100", emoji: "🚀" },
    { id: "c13", name: "NDA & Redline Tracker",       description: "Monitors legal back-and-forth on NDAs and flags unresolved redlines",              color: "bg-orange-100",  emoji: "📑" },
    { id: "c14", name: "Pricing Approval Router",     description: "Routes non-standard discount requests through sales ops and finance automatically", color: "bg-blue-100",    emoji: "💲" },
    { id: "c15", name: "Weekly Win Report",           description: "Compiles closed-won summaries and key themes for the weekly sales leadership sync",  color: "bg-green-100",   emoji: "🏆" },
  ],
};

// All personas share the same sales-focused workflows for this prototype
export const PERSONA_WORKFLOWS: Record<string, WorkflowsTabData> = {
  hr:           SALES_WORKFLOWS,
  marketing:    SALES_WORKFLOWS,
  sales:        SALES_WORKFLOWS,
  engineering:  SALES_WORKFLOWS,
  leadership:   SALES_WORKFLOWS,
  finance:      SALES_WORKFLOWS,
};
