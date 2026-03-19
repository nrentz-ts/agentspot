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

const HR_WORKFLOWS: WorkflowsTabData = {
  mine: [
    { id: "w1", name: "New Hire Onboarding", description: "Sends welcome emails, provisions accounts, and assigns training", color: "bg-violet-100", emoji: "🚀" },
    { id: "w2", name: "Resume Screening Pipeline", description: "Ingests resumes, scores against criteria, and shortlists candidates", color: "bg-blue-100", emoji: "📄" },
    { id: "w3", name: "Interview Coordination", description: "Finds available slots, sends invites, and collects feedback", color: "bg-emerald-100", emoji: "📅" },
    { id: "w4", name: "Offer Letter Workflow", description: "Generates offer letter, routes for approval, and sends to candidate", color: "bg-amber-100", emoji: "✉️" },
  ],
  shared: [
    { id: "s1", name: "PTO Request Flow", description: "Auto-routes leave requests to managers and updates the calendar", color: "bg-pink-100", emoji: "🏖️" },
    { id: "s2", name: "Performance Review Cycle", description: "Distributes review forms, collects ratings, and compiles reports", color: "bg-orange-100", emoji: "⭐" },
    { id: "s3", name: "Employee Offboarding", description: "Revokes access, collects equipment, and schedules exit interview", color: "bg-teal-100", emoji: "👋" },
  ],
  community: [
    { id: "c1", name: "Pulse Survey Automation", description: "Sends weekly pulse surveys and generates trend reports", color: "bg-rose-100", emoji: "📊" },
    { id: "c2", name: "Referral Bonus Tracker", description: "Tracks referral hires and triggers bonus payouts", color: "bg-cyan-100", emoji: "🤝" },
    { id: "c3", name: "Compliance Training Reminders", description: "Assigns mandatory training and sends deadline reminders", color: "bg-lime-100", emoji: "📚" },
    { id: "c4", name: "Birthday & Anniversary Bot", description: "Sends celebration messages on employee milestones", color: "bg-purple-100", emoji: "🎂" },
    { id: "c5", name: "Headcount Reporting", description: "Generates weekly headcount and attrition reports for leadership", color: "bg-indigo-100", emoji: "📈" },
  ],
};

const MARKETING_WORKFLOWS: WorkflowsTabData = {
  mine: [
    { id: "w1", name: "Content Publishing Pipeline", description: "Drafts, reviews, and publishes blog posts on schedule", color: "bg-violet-100", emoji: "✍️" },
    { id: "w2", name: "Campaign Launch Checklist", description: "Coordinates creative, copy, and channel setup before launch", color: "bg-blue-100", emoji: "🚀" },
    { id: "w3", name: "Social Media Scheduler", description: "Queues posts across platforms with optimal timing", color: "bg-emerald-100", emoji: "📱" },
    { id: "w4", name: "Weekly Analytics Digest", description: "Pulls metrics from all channels into a single report", color: "bg-amber-100", emoji: "📊" },
  ],
  shared: [
    { id: "s1", name: "Email Drip Campaigns", description: "Sends nurture sequences based on lead behavior and stage", color: "bg-pink-100", emoji: "📧" },
    { id: "s2", name: "Event Registration Flow", description: "Manages signups, confirmations, and follow-up emails for events", color: "bg-orange-100", emoji: "🎉" },
    { id: "s3", name: "Brand Asset Review", description: "Routes creative assets through compliance and brand review", color: "bg-teal-100", emoji: "🎨" },
  ],
  community: [
    { id: "c1", name: "Competitor Alert System", description: "Monitors competitor websites and notifies on major changes", color: "bg-rose-100", emoji: "👀" },
    { id: "c2", name: "PR Distribution Workflow", description: "Formats and distributes press releases to media contacts", color: "bg-cyan-100", emoji: "📰" },
    { id: "c3", name: "UTM Link Generator", description: "Creates tracked links for every campaign asset automatically", color: "bg-lime-100", emoji: "🔗" },
    { id: "c4", name: "Webinar Follow-up Flow", description: "Sends recording, deck, and follow-up emails to attendees", color: "bg-purple-100", emoji: "🎥" },
    { id: "c5", name: "Influencer Outreach Pipeline", description: "Identifies, contacts, and tracks influencer collaborations", color: "bg-indigo-100", emoji: "⭐" },
  ],
};

const SALES_WORKFLOWS: WorkflowsTabData = {
  mine: [
    { id: "w1", name: "Lead Qualification Flow", description: "Scores, enriches, and routes inbound leads to the right rep", color: "bg-violet-100", emoji: "🎯" },
    { id: "w2", name: "Post-Demo Follow-up", description: "Sends personalized follow-up emails after product demos", color: "bg-blue-100", emoji: "✉️" },
    { id: "w3", name: "Proposal Generator", description: "Creates custom proposals from templates with deal data", color: "bg-emerald-100", emoji: "📋" },
    { id: "w4", name: "Deal Stage Updater", description: "Listens to call transcripts and updates CRM stages", color: "bg-amber-100", emoji: "💾" },
  ],
  shared: [
    { id: "s1", name: "Pipeline Review Prep", description: "Generates pipeline summaries before weekly review meetings", color: "bg-pink-100", emoji: "📊" },
    { id: "s2", name: "Contract Approval Flow", description: "Routes contracts through legal and finance for sign-off", color: "bg-orange-100", emoji: "📑" },
    { id: "s3", name: "Win Announcement", description: "Posts deal closures to Slack and updates the leaderboard", color: "bg-teal-100", emoji: "🏆" },
  ],
  community: [
    { id: "c1", name: "Cold Outreach Sequencer", description: "Sends multi-step outreach emails with smart timing", color: "bg-rose-100", emoji: "📤" },
    { id: "c2", name: "Renewal Reminder Pipeline", description: "Alerts reps 90/60/30 days before contract renewals", color: "bg-cyan-100", emoji: "🔔" },
    { id: "c3", name: "Competitive Battle Cards", description: "Auto-updates competitive positioning docs from market data", color: "bg-lime-100", emoji: "⚔️" },
    { id: "c4", name: "Commission Calculator", description: "Computes commissions on close and sends rep notifications", color: "bg-purple-100", emoji: "💰" },
    { id: "c5", name: "Handoff to CS", description: "Transfers deal context and notes to customer success after close", color: "bg-indigo-100", emoji: "🤝" },
  ],
};

const ENGINEERING_WORKFLOWS: WorkflowsTabData = {
  mine: [
    { id: "w1", name: "CI/CD Pipeline Monitor", description: "Watches builds, runs tests, and alerts on failures", color: "bg-violet-100", emoji: "🔄" },
    { id: "w2", name: "PR Review Assignment", description: "Auto-assigns reviewers based on code ownership rules", color: "bg-blue-100", emoji: "👀" },
    { id: "w3", name: "Bug Report Triage", description: "Categorizes, prioritizes, and assigns incoming bug reports", color: "bg-emerald-100", emoji: "🐛" },
    { id: "w4", name: "Release Notes Generator", description: "Compiles merged PRs into formatted release notes", color: "bg-amber-100", emoji: "📝" },
  ],
  shared: [
    { id: "s1", name: "Incident Response Runbook", description: "Triggers pager, creates war room, and tracks timeline", color: "bg-pink-100", emoji: "🚨" },
    { id: "s2", name: "Sprint Retrospective", description: "Collects retro feedback and generates action items", color: "bg-orange-100", emoji: "🔁" },
    { id: "s3", name: "Dependency Update Flow", description: "Scans for outdated packages and creates upgrade PRs", color: "bg-teal-100", emoji: "📦" },
  ],
  community: [
    { id: "c1", name: "Tech Debt Tracker", description: "Logs and prioritizes technical debt across the codebase", color: "bg-rose-100", emoji: "🗂️" },
    { id: "c2", name: "API Deprecation Notifier", description: "Alerts consumers when API endpoints are being deprecated", color: "bg-cyan-100", emoji: "⚠️" },
    { id: "c3", name: "Load Test Scheduler", description: "Runs performance tests on schedule and reports results", color: "bg-lime-100", emoji: "⚡" },
    { id: "c4", name: "Database Migration Runner", description: "Manages migration scripts across environments safely", color: "bg-purple-100", emoji: "🗄️" },
    { id: "c5", name: "On-Call Rotation Manager", description: "Rotates on-call schedules and handles swap requests", color: "bg-indigo-100", emoji: "📟" },
  ],
};

const LEADERSHIP_WORKFLOWS: WorkflowsTabData = {
  mine: [
    { id: "w1", name: "Weekly Status Roll-up", description: "Aggregates team lead updates into an executive summary", color: "bg-violet-100", emoji: "📋" },
    { id: "w2", name: "Board Deck Preparation", description: "Pulls metrics and generates presentation-ready slides", color: "bg-blue-100", emoji: "📊" },
    { id: "w3", name: "1-on-1 Agenda Builder", description: "Generates talking points from team signals before each meeting", color: "bg-emerald-100", emoji: "📝" },
    { id: "w4", name: "OKR Progress Tracker", description: "Updates quarterly OKR status from team inputs", color: "bg-amber-100", emoji: "🎯" },
  ],
  shared: [
    { id: "s1", name: "All-Hands Coordination", description: "Plans agenda, assigns speakers, and sends calendar invites", color: "bg-pink-100", emoji: "🎤" },
    { id: "s2", name: "Hiring Approval Flow", description: "Routes headcount requests through finance and exec approval", color: "bg-orange-100", emoji: "👥" },
    { id: "s3", name: "Investor Update Pipeline", description: "Compiles data and drafts monthly investor communications", color: "bg-teal-100", emoji: "💼" },
  ],
  community: [
    { id: "c1", name: "Strategic Planning Workflow", description: "Coordinates annual planning inputs across departments", color: "bg-rose-100", emoji: "🗓️" },
    { id: "c2", name: "M&A Due Diligence Tracker", description: "Manages due diligence checklists and document collection", color: "bg-cyan-100", emoji: "🔍" },
    { id: "c3", name: "Executive Dashboard Refresh", description: "Updates KPI dashboards with latest data from all sources", color: "bg-lime-100", emoji: "📈" },
    { id: "c4", name: "Offsite Planning Flow", description: "Coordinates venue, travel, agenda, and follow-ups for offsites", color: "bg-purple-100", emoji: "✈️" },
    { id: "c5", name: "Employee NPS Workflow", description: "Distributes eNPS surveys and reports trends to leadership", color: "bg-indigo-100", emoji: "❤️" },
  ],
};

const FINANCE_WORKFLOWS: WorkflowsTabData = {
  mine: [
    { id: "w1", name: "Expense Approval Pipeline", description: "Routes expense reports through managers and finance for sign-off", color: "bg-violet-100", emoji: "🧾" },
    { id: "w2", name: "Invoice Processing Flow", description: "Extracts data from invoices, matches to POs, and queues payment", color: "bg-blue-100", emoji: "🔗" },
    { id: "w3", name: "Monthly Close Checklist", description: "Tracks all month-end close tasks and deadlines", color: "bg-emerald-100", emoji: "📅" },
    { id: "w4", name: "Budget vs. Actuals Report", description: "Generates variance reports by department each month", color: "bg-amber-100", emoji: "📉" },
  ],
  shared: [
    { id: "s1", name: "Vendor Payment Scheduler", description: "Processes vendor payments on due dates with approval checks", color: "bg-pink-100", emoji: "💳" },
    { id: "s2", name: "Tax Filing Prep", description: "Organizes documents and calculations for quarterly filings", color: "bg-orange-100", emoji: "🏛️" },
    { id: "s3", name: "Audit Documentation Flow", description: "Collects and organizes evidence for SOX and external audits", color: "bg-teal-100", emoji: "📜" },
  ],
  community: [
    { id: "c1", name: "Revenue Recognition Workflow", description: "Applies ASC 606 rules and generates journal entries", color: "bg-rose-100", emoji: "📊" },
    { id: "c2", name: "Cash Flow Forecasting", description: "Projects cash positions using AR, AP, and pipeline data", color: "bg-cyan-100", emoji: "💧" },
    { id: "c3", name: "SaaS Subscription Tracker", description: "Monitors vendor subscriptions, renewals, and cost trends", color: "bg-lime-100", emoji: "🔄" },
    { id: "c4", name: "Intercompany Reconciliation", description: "Matches and reconciles transactions between entities", color: "bg-purple-100", emoji: "🔀" },
    { id: "c5", name: "Procurement Request Flow", description: "Routes purchase requests through budget checks and approvals", color: "bg-indigo-100", emoji: "🛒" },
  ],
};

export const PERSONA_WORKFLOWS: Record<string, WorkflowsTabData> = {
  hr: HR_WORKFLOWS,
  marketing: MARKETING_WORKFLOWS,
  sales: SALES_WORKFLOWS,
  engineering: ENGINEERING_WORKFLOWS,
  leadership: LEADERSHIP_WORKFLOWS,
  finance: FINANCE_WORKFLOWS,
};
