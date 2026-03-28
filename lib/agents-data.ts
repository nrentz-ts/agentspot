export interface HelperItem {
  id: string;
  name: string;
  description: string;
  color: string;
  emoji: string;
}

export interface HelpersTabData {
  mine: HelperItem[];
  shared: HelperItem[];
  community: HelperItem[];
}

const HR_HELPERS: HelpersTabData = {
  mine: [
    { id: "a1", name: "Resume Screener", description: "Scores and ranks candidates against job criteria automatically", color: "bg-violet-100", emoji: "📄" },
    { id: "a2", name: "Onboarding Bot", description: "Guides new hires through day-one checklists and setup", color: "bg-blue-100", emoji: "🎯" },
    { id: "a3", name: "Interview Scheduler", description: "Coordinates interview panels across multiple calendars", color: "bg-emerald-100", emoji: "📅" },
    { id: "a4", name: "Offer Letter Generator", description: "Drafts customized offer letters from approved templates", color: "bg-amber-100", emoji: "✉️" },
  ],
  shared: [
    { id: "s1", name: "PTO Tracker",          description: "Monitors leave balances and auto-approves simple requests",          color: "bg-pink-100",   emoji: "🏖️" },
    { id: "s2", name: "Exit Interview Bot",    description: "Conducts structured exit interviews and summarizes feedback",        color: "bg-orange-100", emoji: "👋" },
    { id: "s3", name: "Benefits FAQ",          description: "Answers common employee questions about benefits and policies",      color: "bg-teal-100",   emoji: "❓" },
    { id: "s4", name: "Engagement Surveyor",   description: "Runs quarterly pulse surveys and generates sentiment trend reports", color: "bg-rose-100",   emoji: "📊" },
    { id: "s5", name: "Compliance Tracker",    description: "Monitors mandatory training completion and sends reminders",        color: "bg-sky-100",    emoji: "✅" },
    { id: "s6", name: "Job Description Writer",description: "Drafts role-specific JDs from a brief and hiring manager input",   color: "bg-violet-100", emoji: "📝" },
    { id: "s7", name: "Payroll Verifier",      description: "Cross-checks payroll data against timesheets and flags gaps",      color: "bg-emerald-100",emoji: "💰" },
    { id: "s8", name: "HR Metrics Reporter",   description: "Compiles monthly HR KPIs into a shareable report deck",            color: "bg-amber-100",  emoji: "📈" },
  ],
  community: [
    { id: "c1", name: "Culture Pulse", description: "Runs anonymous pulse surveys and generates sentiment reports", color: "bg-rose-100", emoji: "💡" },
    { id: "c2", name: "Referral Tracker", description: "Manages employee referral programs and tracks payouts", color: "bg-cyan-100", emoji: "🤝" },
    { id: "c3", name: "Compliance Checker", description: "Validates HR documents against regional labor regulations", color: "bg-lime-100", emoji: "✅" },
    { id: "c4", name: "DEI Dashboard Bot", description: "Generates diversity and inclusion metrics from hiring data", color: "bg-purple-100", emoji: "🌍" },
    { id: "c5", name: "Training Scheduler", description: "Assigns and tracks mandatory training across the organization", color: "bg-indigo-100", emoji: "📚" },
  ],
};

const MARKETING_HELPERS: HelpersTabData = {
  mine: [
    { id: "a1", name: "Content Generator", description: "Drafts blog posts and social copy from campaign briefs", color: "bg-violet-100", emoji: "✍️" },
    { id: "a2", name: "Campaign Analyst", description: "Monitors ad performance and flags anomalies in real time", color: "bg-blue-100", emoji: "📊" },
    { id: "a3", name: "Social Publisher", description: "Schedules and publishes posts across all platforms", color: "bg-emerald-100", emoji: "📱" },
    { id: "a4", name: "SEO Monitor", description: "Tracks keyword rankings and suggests optimization actions", color: "bg-amber-100", emoji: "🔍" },
  ],
  shared: [
    { id: "s1", name: "Brand Voice Checker",  description: "Reviews content for brand consistency and tone guidelines",         color: "bg-pink-100",   emoji: "🎨" },
    { id: "s2", name: "Email A/B Tester",      description: "Runs and evaluates subject line and content experiments",           color: "bg-orange-100", emoji: "📧" },
    { id: "s3", name: "Event Promoter",        description: "Generates and distributes event promotional materials",             color: "bg-teal-100",   emoji: "🎉" },
    { id: "s4", name: "Landing Page Analyst",  description: "Audits landing pages for conversion gaps and quick wins",          color: "bg-rose-100",   emoji: "🔬" },
    { id: "s5", name: "Newsletter Curator",    description: "Aggregates top content and formats weekly newsletters",            color: "bg-sky-100",    emoji: "📬" },
    { id: "s6", name: "Keyword Researcher",    description: "Finds high-impact keywords and clusters them by intent",           color: "bg-violet-100", emoji: "🔍" },
    { id: "s7", name: "Ad Copy Generator",     description: "Writes and A/B tests ad copy across Google and Meta formats",     color: "bg-emerald-100",emoji: "✍️" },
    { id: "s8", name: "Webinar Recap Writer",  description: "Turns webinar transcripts into highlight reels and blog posts",   color: "bg-amber-100",  emoji: "🎥" },
  ],
  community: [
    { id: "c1", name: "Influencer Finder", description: "Identifies relevant influencers based on audience fit", color: "bg-rose-100", emoji: "⭐" },
    { id: "c2", name: "Competitor Tracker", description: "Monitors competitor content, pricing, and positioning changes", color: "bg-cyan-100", emoji: "👀" },
    { id: "c3", name: "Press Release Writer", description: "Drafts press releases following AP style guidelines", color: "bg-lime-100", emoji: "📰" },
    { id: "c4", name: "UTM Builder", description: "Generates and manages UTM parameters for campaign tracking", color: "bg-purple-100", emoji: "🔗" },
    { id: "c5", name: "Testimonial Collector", description: "Requests, organizes, and formats customer testimonials", color: "bg-indigo-100", emoji: "💬" },
  ],
};

const SALES_HELPERS: HelpersTabData = {
  mine: [
    { id: "a1", name: "Lead Scorer", description: "Ranks inbound leads by fit and buying intent signals", color: "bg-violet-100", emoji: "🎯" },
    { id: "a2", name: "Follow-up Drafter", description: "Writes personalized emails after calls and demos", color: "bg-blue-100", emoji: "✉️" },
    { id: "a3", name: "CRM Updater", description: "Logs call notes and updates deal stages automatically", color: "bg-emerald-100", emoji: "💾" },
    { id: "a4", name: "Proposal Generator", description: "Creates tailored sales proposals from approved templates", color: "bg-amber-100", emoji: "📋" },
  ],
  shared: [
    { id: "s1", name: "Meeting Prep Bot",      description: "Prepares briefing notes and talking points before prospect meetings", color: "bg-pink-100",   emoji: "📝" },
    { id: "s2", name: "Quota Tracker",         description: "Monitors progress toward individual and team quotas in real time",    color: "bg-orange-100", emoji: "📈" },
    { id: "s3", name: "Objection Handler",     description: "Suggests responses to common sales objections using past win data",  color: "bg-teal-100",   emoji: "💪" },
    { id: "s4", name: "Contract Summarizer",   description: "Extracts key terms, dates, and obligations from sales contracts",    color: "bg-rose-100",   emoji: "📑" },
    { id: "s5", name: "Renewal Reminder",      description: "Flags expiring contracts and drafts renewal outreach emails",       color: "bg-sky-100",    emoji: "🔔" },
    { id: "s6", name: "Competitive Intel Bot", description: "Summarizes competitor moves and suggests positioning responses",     color: "bg-violet-100", emoji: "🔎" },
    { id: "s7", name: "Call Transcriber",      description: "Transcribes sales calls and extracts next steps automatically",     color: "bg-emerald-100",emoji: "🎙️" },
    { id: "s8", name: "Forecast Updater",      description: "Pulls CRM data and updates forecast slides before pipeline calls",  color: "bg-amber-100",  emoji: "🔮" },
  ],
  community: [
    { id: "c1", name: "Territory Mapper", description: "Assigns and visualizes sales territories across regions", color: "bg-rose-100", emoji: "🗺️" },
    { id: "c2", name: "Win/Loss Analyzer", description: "Identifies patterns in closed-won and closed-lost deals", color: "bg-cyan-100", emoji: "🏆" },
    { id: "c3", name: "Commission Calculator", description: "Computes commissions based on deal structure and tiers", color: "bg-lime-100", emoji: "💰" },
    { id: "c4", name: "Demo Scheduler", description: "Books product demos with qualified leads automatically", color: "bg-purple-100", emoji: "🖥️" },
    { id: "c5", name: "Churn Predictor", description: "Flags accounts at risk of churn based on engagement signals", color: "bg-indigo-100", emoji: "⚠️" },
  ],
};

const ENGINEERING_HELPERS: HelpersTabData = {
  mine: [
    { id: "a1", name: "PR Reviewer", description: "Provides automated code review feedback on pull requests", color: "bg-violet-100", emoji: "🔍" },
    { id: "a2", name: "Bug Triager", description: "Categorizes and prioritizes incoming bug reports", color: "bg-blue-100", emoji: "🐛" },
    { id: "a3", name: "Deploy Monitor", description: "Watches deployments and alerts on regressions", color: "bg-emerald-100", emoji: "🚀" },
    { id: "a4", name: "Docs Generator", description: "Auto-generates API documentation from code comments", color: "bg-amber-100", emoji: "📖" },
  ],
  shared: [
    { id: "s1", name: "Sprint Reporter",       description: "Generates velocity and burndown charts at the end of each sprint",  color: "bg-pink-100",   emoji: "📊" },
    { id: "s2", name: "Incident Responder",    description: "Coordinates incident response, logs timelines, and drafts postmortems", color: "bg-orange-100", emoji: "🚨" },
    { id: "s3", name: "Dependency Scanner",    description: "Checks for vulnerable or outdated dependencies in CI pipelines",    color: "bg-teal-100",   emoji: "🛡️" },
    { id: "s4", name: "API Doc Generator",     description: "Auto-generates and publishes API docs from OpenAPI specs",          color: "bg-rose-100",   emoji: "📖" },
    { id: "s5", name: "Load Test Runner",      description: "Schedules load tests and reports degradation thresholds",           color: "bg-sky-100",    emoji: "⚡" },
    { id: "s6", name: "Code Quality Monitor",  description: "Tracks code coverage, lint errors, and complexity over time",      color: "bg-violet-100", emoji: "🧹" },
    { id: "s7", name: "Release Note Writer",   description: "Compiles changelog entries into release notes from merged PRs",    color: "bg-emerald-100",emoji: "🗒️" },
    { id: "s8", name: "Env Config Auditor",    description: "Detects config drift between staging and production environments",  color: "bg-amber-100",  emoji: "🔧" },
  ],
  community: [
    { id: "c1", name: "Tech Spec Writer", description: "Outlines technical design documents from brief descriptions", color: "bg-rose-100", emoji: "📐" },
    { id: "c2", name: "Test Generator", description: "Creates unit and integration tests from function signatures", color: "bg-cyan-100", emoji: "🧪" },
    { id: "c3", name: "Migration Planner", description: "Plans and tracks database and API migration steps", color: "bg-lime-100", emoji: "🔄" },
    { id: "c4", name: "Performance Profiler", description: "Identifies bottlenecks and suggests optimization strategies", color: "bg-purple-100", emoji: "⚡" },
    { id: "c5", name: "On-Call Scheduler", description: "Manages on-call rotations and escalation policies", color: "bg-indigo-100", emoji: "📟" },
  ],
};

const LEADERSHIP_HELPERS: HelpersTabData = {
  mine: [
    { id: "a1", name: "Status Aggregator", description: "Compiles weekly status reports from all team leads", color: "bg-violet-100", emoji: "📋" },
    { id: "a2", name: "Meeting Prep Bot", description: "Generates agendas and talking points for 1-on-1s", color: "bg-blue-100", emoji: "📝" },
    { id: "a3", name: "Decision Tracker", description: "Logs decisions and action items from leadership meetings", color: "bg-emerald-100", emoji: "✅" },
    { id: "a4", name: "Board Deck Builder", description: "Pulls metrics and creates presentation-ready slides", color: "bg-amber-100", emoji: "📊" },
  ],
  shared: [
    { id: "s1", name: "OKR Tracker",           description: "Monitors quarterly OKR progress and sends weekly nudges to owners", color: "bg-pink-100",   emoji: "🎯" },
    { id: "s2", name: "All-Hands Planner",     description: "Coordinates all-hands agendas, speakers, and live logistics",      color: "bg-orange-100", emoji: "🎤" },
    { id: "s3", name: "Headcount Planner",     description: "Tracks hiring plan vs. actuals and flags capacity gaps by team",   color: "bg-teal-100",   emoji: "👥" },
    { id: "s4", name: "Executive Briefer",     description: "Summarizes news, internal updates, and key metrics before calls",  color: "bg-rose-100",   emoji: "📰" },
    { id: "s5", name: "Risk Radar",            description: "Surfaces project risks and blockers from team status updates",     color: "bg-sky-100",    emoji: "⚠️" },
    { id: "s6", name: "Town Hall Q&A Bot",     description: "Collects and clusters employee questions before all-hands events", color: "bg-violet-100", emoji: "🙋" },
    { id: "s7", name: "Retention Monitor",     description: "Tracks early attrition signals and flags at-risk top performers",  color: "bg-emerald-100",emoji: "❤️" },
    { id: "s8", name: "Partnership Tracker",   description: "Monitors key partner commitments and surfaces renewal milestones", color: "bg-amber-100",  emoji: "🤝" },
  ],
  community: [
    { id: "c1", name: "Strategy Summarizer", description: "Distills long strategy docs into executive summaries", color: "bg-rose-100", emoji: "📄" },
    { id: "c2", name: "Investor Update Writer", description: "Drafts monthly investor updates from key metrics", color: "bg-cyan-100", emoji: "💼" },
    { id: "c3", name: "Competitor Intel", description: "Aggregates competitive intelligence from public sources", color: "bg-lime-100", emoji: "🔎" },
    { id: "c4", name: "Team Health Monitor", description: "Tracks team morale, velocity, and attrition signals", color: "bg-purple-100", emoji: "❤️" },
    { id: "c5", name: "Budget Reviewer", description: "Summarizes departmental budgets and flags overages", color: "bg-indigo-100", emoji: "💰" },
  ],
};

const FINANCE_HELPERS: HelpersTabData = {
  mine: [
    { id: "a1", name: "Expense Processor", description: "Auto-reviews and routes expense submissions for approval", color: "bg-violet-100", emoji: "🧾" },
    { id: "a2", name: "Invoice Matcher", description: "Matches invoices to POs and flags discrepancies", color: "bg-blue-100", emoji: "🔗" },
    { id: "a3", name: "Budget Monitor", description: "Tracks spend vs. budget and sends threshold alerts", color: "bg-emerald-100", emoji: "📉" },
    { id: "a4", name: "P&L Generator", description: "Creates monthly profit and loss summaries automatically", color: "bg-amber-100", emoji: "📊" },
  ],
  shared: [
    { id: "s1", name: "Vendor Payment Bot",    description: "Schedules and processes vendor payments automatically on due dates", color: "bg-pink-100",   emoji: "💳" },
    { id: "s2", name: "Tax Prep Assistant",    description: "Organizes documents and data for quarterly tax filings",             color: "bg-orange-100", emoji: "🏛️" },
    { id: "s3", name: "Audit Trail Logger",    description: "Maintains SOX-compliant logs of all financial transactions",         color: "bg-teal-100",   emoji: "📜" },
    { id: "s4", name: "Spend Analyzer",        description: "Categorizes and benchmarks company spending against industry norms", color: "bg-rose-100",   emoji: "🔍" },
    { id: "s5", name: "Approval Router",       description: "Routes purchase requests to the right approvers based on policy",   color: "bg-sky-100",    emoji: "✅" },
    { id: "s6", name: "Headcount Cost Model",  description: "Projects people costs against headcount plan and flags variances",  color: "bg-violet-100", emoji: "👥" },
    { id: "s7", name: "Close Checklist Bot",   description: "Guides the finance team through month-end close with task reminders", color: "bg-emerald-100",emoji: "📋" },
    { id: "s8", name: "Reimbursement Checker", description: "Validates employee reimbursement requests against expense policy",  color: "bg-amber-100",  emoji: "🧾" },
  ],
  community: [
    { id: "c1", name: "Revenue Forecaster", description: "Projects revenue using historical trends and pipeline data", color: "bg-rose-100", emoji: "🔮" },
    { id: "c2", name: "Cash Flow Analyzer", description: "Monitors cash flow patterns and predicts shortfalls", color: "bg-cyan-100", emoji: "💧" },
    { id: "c3", name: "Contract Reviewer", description: "Scans contracts for financial terms and obligations", color: "bg-lime-100", emoji: "📑" },
    { id: "c4", name: "Subscription Tracker", description: "Manages SaaS and vendor subscription renewals and costs", color: "bg-purple-100", emoji: "🔄" },
    { id: "c5", name: "Expense Policy Bot", description: "Validates expense claims against company policy rules", color: "bg-indigo-100", emoji: "📏" },
  ],
};

export const PERSONA_HELPERS: Record<string, HelpersTabData> = {
  hr: HR_HELPERS,
  marketing: MARKETING_HELPERS,
  sales: SALES_HELPERS,
  engineering: ENGINEERING_HELPERS,
  leadership: LEADERSHIP_HELPERS,
  finance: FINANCE_HELPERS,
};
