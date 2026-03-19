export interface SlackUpdate {
  channel: string;
  message: string;
  time: string;
  unread: boolean;
}

export interface Insight {
  text: string;
  trend: "up" | "down" | "neutral";
}

export interface Agent {
  name: string;
  description: string;
  users: number;
  interactions: number;
  status: "active";
  lastAction: string;
}

export interface AutomationStats {
  processes: string;
  runsThisWeek: string;
  hoursSaved: string;
}

export interface AutomationRun {
  workflow: string;
  message: string;
  time: string;
  status: "success" | "running" | "error";
}

export type WorkUpdateType = "slack" | "calendar" | "data";

export interface WorkUpdateCard {
  text: string;
  source: string;
  type: WorkUpdateType;
}

export interface PersonaDashboardData {
  slackUpdates: SlackUpdate[];
  insights: Insight[];
  agents: Agent[];
  automationStats: AutomationStats;
  automationRuns: AutomationRun[];
  suggestionChips: string[];
  workUpdates: WorkUpdateCard[];
}

const HR_DATA: PersonaDashboardData = {
  slackUpdates: [
    { channel: "recruiting", message: "3 new candidates passed the phone screen for the Senior PM role — scheduling next rounds", time: "10 min ago", unread: true },
    { channel: "people-ops", message: "Updated the PTO policy doc in Notion. Please review before we announce on Monday", time: "25 min ago", unread: true },
    { channel: "onboarding", message: "Welcome kit shipped for 4 new hires starting March 3rd. IT setup confirmed.", time: "1 hr ago", unread: false },
    { channel: "benefits", message: "Open enrollment deadline extended to March 15. Reminder going out tomorrow.", time: "2 hrs ago", unread: false },
    { channel: "culture", message: "Employee survey results are in — 87% engagement score, up 4 pts from Q3", time: "3 hrs ago", unread: false },
  ],
  insights: [
    { text: "Time-to-hire decreased by 3 days this month — now averaging 28 days across all roles.", trend: "up" },
    { text: "5 offer letters are pending acceptance, 2 expiring within 48 hours.", trend: "down" },
    { text: "Employee engagement score hit 87% — highest in the last 4 quarters.", trend: "up" },
    { text: "Attrition rate is holding steady at 8.2%, in line with industry benchmarks.", trend: "neutral" },
    { text: "Referral hires account for 34% of all new hires this quarter — up 8% from last quarter.", trend: "up" },
    { text: "Average onboarding completion time reduced to 2.1 days from 3.5 days last month.", trend: "up" },
  ],
  agents: [
    { name: "Resume Screener", description: "Scores and ranks candidates against job criteria", users: 32, interactions: 1840, status: "active", lastAction: "Screened 14 resumes · 8 min ago" },
    { name: "Onboarding Bot", description: "Guides new hires through day-one checklists", users: 128, interactions: 3200, status: "active", lastAction: "Sent setup checklist to 4 new hires · 45 min ago" },
    { name: "Interview Scheduler", description: "Coordinates panels across multiple calendars", users: 45, interactions: 890, status: "active", lastAction: "Scheduled 3 interview panels · 1 hr ago" },
    { name: "Benefits FAQ Agent", description: "Answers employee questions about policies and benefits", users: 210, interactions: 4600, status: "active", lastAction: "Answered 12 benefit questions · 30 min ago" },
    { name: "PTO Tracker", description: "Monitors leave balances and routes approval requests", users: 185, interactions: 2750, status: "active", lastAction: "Approved 6 PTO requests · 2 hrs ago" },
  ],
  automationStats: { processes: "18", runsThisWeek: "1,240", hoursSaved: "48" },
  automationRuns: [
    { workflow: "Resume Screening", message: "Scored 14 new applicants for the Product Designer role", time: "8 min ago", status: "success" },
    { workflow: "Offer Letter Generation", message: "Generated offer letter for Maya Patel — Senior Engineer", time: "22 min ago", status: "success" },
    { workflow: "Onboarding Checklist", message: "Sending IT setup and badge requests for 4 new hires...", time: "45 min ago", status: "running" },
    { workflow: "Calendar Sync", message: "Failed to sync interview slots with Outlook — token expired", time: "1 hr ago", status: "error" },
    { workflow: "Employee Survey", message: "Distributed Q1 engagement survey to 340 employees", time: "3 hrs ago", status: "success" },
  ],
  suggestionChips: [
    "What can you do?",
    "Candidate experience helper",
    "Resume screener helper",
    "Schedule interview rounds",
    "Generate an offer letter",
  ],
  workUpdates: [
    { text: "3 candidates passed the phone screen for the Senior PM role — scheduling next rounds", source: "#recruiting", type: "slack" },
    { text: "Interview panel for Product Designer role at 2:00 PM — prep notes ready", source: "Google Calendar", type: "calendar" },
    { text: "5 offer letters pending acceptance, 2 expiring within 48 hours", source: "Greenhouse", type: "data" },
    { text: "PTO policy doc updated in Notion — review needed before Monday announcement", source: "#people-ops", type: "slack" },
    { text: "New hire onboarding checklist sent to 4 starting Monday — IT hasn't confirmed setup yet", source: "#onboarding", type: "slack" },
    { text: "Q1 performance review cycle kicks off next week — manager prep docs needed", source: "HR System", type: "data" },
    { text: "Benefits open enrollment closes Friday — 38 employees yet to complete selection", source: "#benefits", type: "data" },
  ],
};

const MARKETING_DATA: PersonaDashboardData = {
  slackUpdates: [
    { channel: "campaigns", message: "Spring launch campaign is live — first 2 hours showing 3.2% CTR on paid ads", time: "8 min ago", unread: true },
    { channel: "content", message: "Blog post on AI automation hit 12K views. Highest performing piece this quarter.", time: "20 min ago", unread: true },
    { channel: "brand", message: "New brand toolkit is finalized. Uploading to the shared drive today.", time: "1 hr ago", unread: false },
    { channel: "analytics", message: "Website traffic up 22% WoW. Organic search is the top driver.", time: "2 hrs ago", unread: false },
    { channel: "social-media", message: "LinkedIn post about the product update got 840 reactions overnight", time: "4 hrs ago", unread: false },
  ],
  insights: [
    { text: "Campaign ROI is up 15% this quarter — paid social driving the most conversions.", trend: "up" },
    { text: "Content pipeline has 3 drafts overdue by more than a week.", trend: "down" },
    { text: "Email open rates improved to 34% after the subject line A/B test.", trend: "up" },
    { text: "Marketing spend is tracking 6% under budget with 3 weeks remaining.", trend: "neutral" },
    { text: "Organic search traffic grew 18% MoM — top-performing channel for lead gen.", trend: "up" },
    { text: "Webinar registration-to-attendance ratio dropped to 38% — below the 45% benchmark.", trend: "down" },
  ],
  agents: [
    { name: "Content Generator", description: "Drafts blog posts and social copy from briefs", users: 18, interactions: 2100, status: "active", lastAction: "Drafted 3 blog posts · 20 min ago" },
    { name: "Campaign Analyst", description: "Monitors ad performance and flags anomalies", users: 12, interactions: 960, status: "active", lastAction: "Flagged CTR drop on spring campaign · 15 min ago" },
    { name: "Social Publisher", description: "Schedules and publishes posts across platforms", users: 8, interactions: 1450, status: "active", lastAction: "Published 6 posts across 3 platforms · 5 min ago" },
  ],
  automationStats: { processes: "21", runsThisWeek: "1,680", hoursSaved: "55" },
  automationRuns: [
    { workflow: "Social Media Scheduling", message: "Published 6 posts across LinkedIn, Twitter, and Instagram", time: "5 min ago", status: "success" },
    { workflow: "Campaign Report", message: "Generating weekly performance digest for spring campaign...", time: "15 min ago", status: "running" },
    { workflow: "Competitor Monitor", message: "Detected new pricing page from CompetitorX — summary attached", time: "40 min ago", status: "success" },
    { workflow: "Email A/B Test", message: "Variant B outperforming by 12% — auto-switching to winning subject line", time: "1 hr ago", status: "success" },
    { workflow: "Content Calendar Sync", message: "Failed to pull assignments from Asana — API rate limit hit", time: "2 hrs ago", status: "error" },
  ],
  suggestionChips: [
    "What can you do?",
    "Analyze campaign performance",
    "Draft social media posts",
    "Summarize competitor activity",
    "Plan the content calendar",
  ],
  workUpdates: [
    { text: "Spring launch campaign is live — first 2 hours showing 3.2% CTR on paid ads", source: "#campaigns", type: "slack" },
    { text: "Campaign performance review with leadership at 11:00 AM", source: "Google Calendar", type: "calendar" },
    { text: "Campaign ROI is up 15% this quarter — paid social driving the most conversions", source: "Google Ads", type: "data" },
    { text: "3 blog drafts overdue by more than a week in the content pipeline", source: "Asana", type: "data" },
    { text: "Webinar registration-to-attendance dropped to 38% — needs a follow-up strategy", source: "#marketing", type: "slack" },
    { text: "Monthly content review at 3:00 PM — 3 drafts need sign-off before publishing", source: "Google Calendar", type: "calendar" },
    { text: "Email A/B test concluded — variant B winning by 12%, ready to set as default", source: "Mailchimp", type: "data" },
  ],
};

const SALES_DATA: PersonaDashboardData = {
  slackUpdates: [
    { channel: "deals", message: "Acme Corp moved to negotiation stage — $180K deal, close expected this week", time: "12 min ago", unread: true },
    { channel: "pipeline", message: "Q1 pipeline is at $2.4M, 68% of target. 14 deals in active stage.", time: "30 min ago", unread: true },
    { channel: "sales-wins", message: "Closed TechNova — $95K ARR! Great team effort on the demo.", time: "1 hr ago", unread: false },
    { channel: "prospecting", message: "New lead list from the webinar: 340 signups, 82 fit our ICP", time: "2 hrs ago", unread: false },
    { channel: "demos", message: "Demo with Globex scheduled for Thursday. Prep doc shared in the thread.", time: "3 hrs ago", unread: false },
  ],
  insights: [
    { text: "Close rate improved to 28% this month — up from 22% last quarter.", trend: "up" },
    { text: "4 deals over $50K have been in negotiation for more than 2 weeks.", trend: "down" },
    { text: "Average deal size increased to $72K, driven by enterprise segment.", trend: "up" },
    { text: "Pipeline coverage ratio is 3.2x target — healthy for Q1 close.", trend: "neutral" },
    { text: "Demo-to-close conversion improved to 42% — up 6 points after new demo framework.", trend: "up" },
    { text: "3 enterprise accounts flagged at risk of churn based on declining engagement.", trend: "down" },
  ],
  agents: [
    { name: "Lead Scorer", description: "Ranks inbound leads by fit and intent signals", users: 24, interactions: 3800, status: "active", lastAction: "Scored 48 new leads · 6 min ago" },
    { name: "Follow-up Drafter", description: "Writes personalized emails after calls and demos", users: 36, interactions: 2100, status: "active", lastAction: "Drafted 8 follow-up emails · 20 min ago" },
    { name: "CRM Updater", description: "Logs call notes and updates deal stages automatically", users: 42, interactions: 4600, status: "active", lastAction: "Updated 6 deal stages · 35 min ago" },
  ],
  automationStats: { processes: "16", runsThisWeek: "2,340", hoursSaved: "71" },
  automationRuns: [
    { workflow: "Lead Scoring", message: "Scored 48 new leads from the webinar — 12 flagged as high priority", time: "6 min ago", status: "success" },
    { workflow: "Follow-up Emails", message: "Drafted 8 personalized follow-ups after yesterday's demos", time: "20 min ago", status: "success" },
    { workflow: "CRM Sync", message: "Updating deal stages for 6 accounts from call transcripts...", time: "35 min ago", status: "running" },
    { workflow: "Proposal Generator", message: "Generated proposal for Globex Corp — $120K annual contract", time: "1 hr ago", status: "success" },
    { workflow: "Pipeline Alert", message: "Failed to fetch pipeline data from Salesforce — connection timeout", time: "2 hrs ago", status: "error" },
  ],
  suggestionChips: [
    "What can you do?",
    "Summarize my sales pipeline",
    "Draft follow-up emails",
    "Generate a proposal",
    "Log my meeting notes",
  ],
  workUpdates: [
    { text: "Acme Corp moved to negotiation stage — $180K deal, close expected this week", source: "#deals", type: "slack" },
    { text: "Demo with Globex Corp scheduled for Thursday — prep doc ready", source: "Google Calendar", type: "calendar" },
    { text: "Close rate improved to 28% this month — up from 22% last quarter", source: "Salesforce", type: "data" },
    { text: "4 deals over $50K stalled in negotiation for 2+ weeks", source: "Salesforce", type: "data" },
    { text: "TechNova deal closed at $95K ARR — commission processing needed this week", source: "#sales-wins", type: "slack" },
    { text: "Weekly pipeline review with VP Sales at 2:00 PM", source: "Google Calendar", type: "calendar" },
    { text: "3 enterprise accounts flagged at risk of churn — outreach needed this week", source: "Salesforce", type: "data" },
  ],
};

const ENGINEERING_DATA: PersonaDashboardData = {
  slackUpdates: [
    { channel: "deployments", message: "v2.14.0 deployed to production. All health checks passing.", time: "15 min ago", unread: true },
    { channel: "code-review", message: "5 PRs waiting for review — 2 are blocking the release branch", time: "25 min ago", unread: true },
    { channel: "incidents", message: "Resolved: API latency spike was caused by a misconfigured cache TTL", time: "1 hr ago", unread: false },
    { channel: "architecture", message: "RFC for the new event-driven pipeline is up for comments — deadline Friday", time: "2 hrs ago", unread: false },
    { channel: "engineering", message: "Sprint retro notes posted. Top action item: improve test coverage on auth module.", time: "4 hrs ago", unread: false },
  ],
  insights: [
    { text: "Sprint velocity increased to 48 points — highest this quarter, up 12% from last sprint.", trend: "up" },
    { text: "2 P1 bugs remain unresolved for more than 3 days.", trend: "down" },
    { text: "Deployment frequency is at 4.2 deploys/week — meeting the team's DORA target.", trend: "up" },
    { text: "Test coverage is at 78%, just below the 80% threshold.", trend: "neutral" },
    { text: "Mean time to recovery improved to 22 minutes — down from 38 minutes last quarter.", trend: "up" },
    { text: "Tech debt backlog grew by 14 tickets this sprint — needs prioritization.", trend: "down" },
  ],
  agents: [
    { name: "PR Reviewer", description: "Provides automated code review feedback on PRs", users: 38, interactions: 5200, status: "active", lastAction: "Reviewed 6 pull requests · 10 min ago" },
    { name: "Bug Triager", description: "Categorizes and prioritizes incoming bug reports", users: 22, interactions: 1600, status: "active", lastAction: "Triaged 9 new tickets · 25 min ago" },
    { name: "Deploy Monitor", description: "Watches deploys and alerts on regressions", users: 45, interactions: 3100, status: "active", lastAction: "Verified v2.14.0 health checks · 15 min ago" },
  ],
  automationStats: { processes: "28", runsThisWeek: "3,120", hoursSaved: "85" },
  automationRuns: [
    { workflow: "PR Review", message: "Auto-reviewed 6 pull requests — 2 flagged with potential issues", time: "10 min ago", status: "success" },
    { workflow: "Bug Triage", message: "Categorized 9 new Jira tickets — 1 marked as P1", time: "25 min ago", status: "success" },
    { workflow: "Deploy Pipeline", message: "Running smoke tests on staging for v2.14.1...", time: "40 min ago", status: "running" },
    { workflow: "Sprint Report", message: "Generated velocity and burndown charts for Sprint 24", time: "1 hr ago", status: "success" },
    { workflow: "Dependency Scan", message: "Failed to scan node_modules — memory limit exceeded on CI runner", time: "3 hrs ago", status: "error" },
  ],
  suggestionChips: [
    "What can you do?",
    "Summarize open pull requests",
    "Generate a sprint report",
    "Triage the bug backlog",
    "Draft a tech spec",
  ],
  workUpdates: [
    { text: "5 PRs waiting for review, 2 blocking the release branch", source: "#code-review", type: "slack" },
    { text: "Sprint retrospective at 10:00 AM — action items from last sprint", source: "Google Calendar", type: "calendar" },
    { text: "Sprint velocity at 48 points — highest this quarter, up 12%", source: "Jira", type: "data" },
    { text: "2 P1 bugs remain unresolved for more than 3 days", source: "Jira", type: "data" },
    { text: "RFC for the event-driven pipeline — community comments due Friday EOD", source: "#architecture", type: "slack" },
    { text: "Sprint 25 planning session on Thursday at 10:00 AM", source: "Google Calendar", type: "calendar" },
    { text: "Dependency scan failed on CI runner — memory limit exceeded, needs fix", source: "GitHub Actions", type: "data" },
  ],
};

const LEADERSHIP_DATA: PersonaDashboardData = {
  slackUpdates: [
    { channel: "exec-team", message: "Revenue update: tracking at 94% of Q1 target with 3 weeks to go", time: "18 min ago", unread: true },
    { channel: "all-hands", message: "All-hands agenda for Friday finalized. CEO to cover product roadmap and hiring.", time: "40 min ago", unread: true },
    { channel: "strategy", message: "New market expansion analysis shared by the strategy team — APAC focus", time: "1 hr ago", unread: false },
    { channel: "board-updates", message: "Board deck draft v2 uploaded. Feedback due by Wednesday EOD.", time: "3 hrs ago", unread: false },
    { channel: "offsites", message: "Leadership offsite confirmed for April 10-12 in Austin. Logistics doc incoming.", time: "5 hrs ago", unread: false },
  ],
  insights: [
    { text: "Company revenue is at $4.8M for Q1 — on track to hit the $5.1M target.", trend: "up" },
    { text: "Headcount is 4 behind plan — 3 engineering roles and 1 design role open.", trend: "down" },
    { text: "OKR completion is at 72% with 3 weeks remaining — on track overall.", trend: "up" },
    { text: "Customer NPS improved to 68, up from 61 last quarter.", trend: "neutral" },
    { text: "Cross-functional initiatives delivered 3 of 5 milestones ahead of schedule.", trend: "up" },
    { text: "Employee voluntary attrition ticked up to 6.4% — monitor engineering and design teams.", trend: "down" },
  ],
  agents: [
    { name: "Status Aggregator", description: "Compiles weekly status from all team leads", users: 14, interactions: 890, status: "active", lastAction: "Aggregated 8 team updates · 12 min ago" },
    { name: "Meeting Prep Bot", description: "Generates agendas and talking points for 1-on-1s", users: 8, interactions: 620, status: "active", lastAction: "Prepared 5 talking-point docs · 1 hr ago" },
    { name: "Decision Tracker", description: "Logs decisions and action items from meetings", users: 12, interactions: 1050, status: "active", lastAction: "Logged 3 decisions from exec sync · 2 hrs ago" },
  ],
  automationStats: { processes: "12", runsThisWeek: "680", hoursSaved: "34" },
  automationRuns: [
    { workflow: "Weekly Status Roll-up", message: "Aggregated updates from 8 team leads into executive summary", time: "12 min ago", status: "success" },
    { workflow: "Board Deck Generator", message: "Pulling latest financials and metrics for the board deck...", time: "30 min ago", status: "running" },
    { workflow: "1-on-1 Prep", message: "Generated talking points for 5 upcoming direct report meetings", time: "1 hr ago", status: "success" },
    { workflow: "OKR Tracker", message: "Updated Q1 OKR progress — 18 of 25 key results on track", time: "2 hrs ago", status: "success" },
    { workflow: "All-Hands Reminder", message: "Failed to send calendar invite — distribution list error", time: "4 hrs ago", status: "error" },
  ],
  suggestionChips: [
    "What can you do?",
    "Summarize team performance",
    "Prepare a board deck",
    "Generate a status report",
    "Schedule my 1-on-1s",
  ],
  workUpdates: [
    { text: "Revenue tracking at 94% of Q1 target with 3 weeks to go", source: "#exec-team", type: "slack" },
    { text: "Board deck review with CFO at 11:30 AM", source: "Google Calendar", type: "calendar" },
    { text: "Company revenue at $4.8M for Q1 — on track to hit the $5.1M target", source: "Finance Dashboard", type: "data" },
    { text: "Headcount is 4 behind plan — 3 engineering and 1 design role open", source: "Greenhouse", type: "data" },
    { text: "All-hands agenda for Friday still needs final approval from CEO", source: "#all-hands", type: "slack" },
    { text: "Q1 OKR check-in with all department heads tomorrow at 3:00 PM", source: "Google Calendar", type: "calendar" },
    { text: "Employee attrition ticked up to 6.4% — engineering and design flagged for review", source: "HR Dashboard", type: "data" },
  ],
};

const FINANCE_DATA: PersonaDashboardData = {
  slackUpdates: [
    { channel: "finance", message: "Monthly close is 90% complete. Awaiting final revenue recognition entries.", time: "14 min ago", unread: true },
    { channel: "accounting", message: "12 vendor invoices processed today. 3 flagged for amount discrepancies.", time: "35 min ago", unread: true },
    { channel: "budget-reviews", message: "Engineering is 8% over budget this quarter — review meeting scheduled", time: "1 hr ago", unread: false },
    { channel: "compliance", message: "SOX audit prep checklist updated. All documentation due by March 10.", time: "3 hrs ago", unread: false },
    { channel: "invoices", message: "Acme Corp payment of $45K received and reconciled against PO-2847", time: "4 hrs ago", unread: false },
  ],
  insights: [
    { text: "Accounts receivable days decreased to 32 — a 4-day improvement from last month.", trend: "up" },
    { text: "3 invoices over $10K are pending approval for more than 5 days.", trend: "down" },
    { text: "Monthly burn rate is $1.2M, in line with the approved budget.", trend: "up" },
    { text: "Revenue recognition for Q1 is 92% complete — on track for deadline.", trend: "neutral" },
    { text: "Vendor payment cycle time improved to 14 days — meeting the net-15 target.", trend: "up" },
    { text: "2 department budgets exceeded 95% utilization with 3 weeks left in the quarter.", trend: "down" },
  ],
  agents: [
    { name: "Expense Processor", description: "Auto-reviews and routes expense submissions", users: 128, interactions: 3420, status: "active", lastAction: "Processed 12 expense receipts · 5 min ago" },
    { name: "Invoice Matcher", description: "Matches invoices to POs and flags discrepancies", users: 18, interactions: 2800, status: "active", lastAction: "Matched 9 invoices, flagged 3 · 18 min ago" },
    { name: "Budget Monitor", description: "Tracks spend vs. budget and sends alerts", users: 24, interactions: 1560, status: "active", lastAction: "Sent budget alert for Engineering · 1 hr ago" },
  ],
  automationStats: { processes: "24", runsThisWeek: "1,847", hoursSaved: "62" },
  automationRuns: [
    { workflow: "Expense Report Submission", message: "Processed 12 receipts and submitted report for Sarah Chen", time: "5 min ago", status: "success" },
    { workflow: "Invoice Approval", message: "Routed 3 invoices to David Park for approval ($18.4K total)", time: "18 min ago", status: "success" },
    { workflow: "Monthly Close", message: "Generating journal entries for deferred revenue...", time: "32 min ago", status: "running" },
    { workflow: "Budget Alert", message: "Engineering dept exceeded 90% of Q1 budget allocation", time: "1 hr ago", status: "success" },
    { workflow: "Vendor Payment Sync", message: "Failed to sync with banking API — scheduled maintenance window", time: "2 hrs ago", status: "error" },
  ],
  suggestionChips: [
    "What can you do?",
    "Help me automate expense reports",
    "Generate a P&L summary",
    "Reconcile invoices",
    "Show budget utilization",
  ],
  workUpdates: [
    { text: "Monthly close is 90% complete — awaiting final revenue recognition entries", source: "#finance", type: "slack" },
    { text: "Budget review meeting with Engineering at 10:00 AM", source: "Google Calendar", type: "calendar" },
    { text: "Accounts receivable days decreased to 32 — a 4-day improvement", source: "NetSuite", type: "data" },
    { text: "Engineering is 8% over budget this quarter — review scheduled", source: "Adaptive Planning", type: "data" },
    { text: "3 invoices over $10K pending approval for more than 5 days", source: "#accounting", type: "slack" },
    { text: "Q1 tax prep meeting with external auditors at 2:00 PM", source: "Google Calendar", type: "calendar" },
    { text: "SOX audit documentation due March 10 — 4 checklist items still outstanding", source: "Compliance System", type: "data" },
  ],
};

export const PERSONA_DASHBOARD_DATA: Record<string, PersonaDashboardData> = {
  hr: HR_DATA,
  marketing: MARKETING_DATA,
  sales: SALES_DATA,
  engineering: ENGINEERING_DATA,
  leadership: LEADERSHIP_DATA,
  finance: FINANCE_DATA,
};
