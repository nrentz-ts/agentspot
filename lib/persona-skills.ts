import {
  FileText,
  Mail,
  CalendarDays,
  Users,
  Target,
  TrendingUp,
  PenTool,
  BarChart3,
  GitPullRequest,
  Bug,
  FileCode,
  ClipboardList,
  Presentation,
  DollarSign,
  Receipt,
  Calculator,
  Bot,
  Zap,
  Shield,
  Search,
  Globe,
  Megaphone,
  Share2,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";

import type { ActionCategory } from "@/lib/personas";

export interface Skill {
  label: string;
  description: string;
  icon: LucideIcon;
  query: string;
  category: ActionCategory;
}

const HR_SKILLS: Skill[] = [
  { label: "Candidate experience helper", description: "Set up new hire checklists, documents, and welcome flows", icon: Users, query: "Help me automate the new hire onboarding process", category: "helper" },
  { label: "Resume screener helper", description: "AI-powered resume screening against job criteria", icon: FileText, query: "Help me screen resumes for our open positions", category: "helper" },
  { label: "Schedule interviews", description: "Coordinate interview rounds across multiple calendars", icon: CalendarDays, query: "Help me schedule interview rounds for candidates", category: "task" },
  { label: "Generate offer letters", description: "Draft customized offer letters from templates", icon: Mail, query: "Help me generate an offer letter for a new hire", category: "task" },
  { label: "PTO management workflow", description: "Monitor leave balances and auto-route approval requests", icon: ClipboardList, query: "Help me manage and track PTO requests", category: "workflow" },
  { label: "Engagement survey agent", description: "Create, distribute, and analyze employee pulse surveys", icon: BarChart3, query: "Help me run an employee engagement survey", category: "helper" },
  { label: "Offboarding workflow", description: "Automate exit checklists, access revocation, and final pay", icon: Shield, query: "Help me set up an offboarding workflow", category: "workflow" },
  { label: "Job description agent", description: "Generate compelling job posts from role requirements", icon: PenTool, query: "Help me draft a job description for a new role", category: "helper" },
  { label: "Compliance reminder workflow", description: "Track mandatory training and send deadline alerts", icon: Zap, query: "Help me automate compliance training reminders", category: "workflow" },
  { label: "Performance review agent", description: "Compile feedback and generate review summaries", icon: Target, query: "Help me prepare for performance reviews", category: "helper" },
  { label: "Benefits FAQ agent", description: "Answer common employee questions about benefits and policies", icon: MessageSquare, query: "Help me set up a benefits FAQ bot", category: "helper" },
  { label: "Referral tracking workflow", description: "Manage employee referral programs and bonus payouts", icon: Share2, query: "Help me track employee referrals and payouts", category: "workflow" },
];

const MARKETING_SKILLS: Skill[] = [
  { label: "Analyze campaigns", description: "Get performance summaries across all active campaigns", icon: BarChart3, query: "Analyze my marketing campaign performance this quarter", category: "task" },
  { label: "Draft social posts", description: "Generate on-brand posts for any platform", icon: PenTool, query: "Help me draft social media posts for our product launch", category: "task" },
  { label: "Competitor research", description: "Summarize what competitors are doing this month", icon: Target, query: "Summarize recent competitor activity and positioning", category: "task" },
  { label: "Plan content calendar", description: "Build a structured content schedule", icon: CalendarDays, query: "Help me plan our content calendar for next month", category: "task" },
  { label: "Email campaign builder", description: "Design and schedule drip email sequences", icon: Mail, query: "Help me create an email nurture campaign", category: "workflow" },
  { label: "SEO keyword analysis", description: "Track rankings and find optimization opportunities", icon: Search, query: "Analyze our SEO keyword rankings and suggest improvements", category: "task" },
  { label: "Brand voice review", description: "Check content for brand consistency and tone", icon: Shield, query: "Review this content for brand voice consistency", category: "helper" },
  { label: "Event promotion", description: "Generate promotional materials for upcoming events", icon: Megaphone, query: "Help me promote our upcoming webinar", category: "task" },
  { label: "A/B test analysis", description: "Evaluate experiment results and pick winning variants", icon: Zap, query: "Analyze the results of my latest A/B test", category: "task" },
  { label: "Influencer outreach", description: "Identify relevant influencers and draft outreach", icon: Globe, query: "Help me find and reach out to relevant influencers", category: "task" },
  { label: "Press release drafting", description: "Write press releases following AP style guidelines", icon: FileText, query: "Help me draft a press release for our announcement", category: "task" },
  { label: "UTM link generator", description: "Create tracked links for all campaign assets", icon: Share2, query: "Generate UTM links for my campaign", category: "task" },
];

const SALES_SKILLS: Skill[] = [
  { label: "Pipeline summary", description: "Get an overview of deals by stage and value", icon: TrendingUp, query: "Summarize my current sales pipeline", category: "task" },
  { label: "Draft follow-ups", description: "Write personalized follow-up emails after meetings", icon: Mail, query: "Help me draft follow-up emails for my recent prospects", category: "task" },
  { label: "Generate proposals", description: "Create tailored sales proposals from templates", icon: FileText, query: "Help me generate a sales proposal for a new client", category: "task" },
  { label: "Log meeting notes", description: "Auto-capture and organize meeting takeaways", icon: ClipboardList, query: "Help me log and organize my sales meeting notes", category: "task" },
  { label: "Lead scoring", description: "Rank inbound leads by fit and buying intent", icon: Target, query: "Score and rank my latest inbound leads", category: "helper" },
  { label: "Competitive battle cards", description: "Generate talking points against specific competitors", icon: Shield, query: "Create a competitive battle card for our main competitor", category: "task" },
  { label: "Quota tracking", description: "Monitor progress toward individual and team targets", icon: BarChart3, query: "Show me my quota progress for this quarter", category: "workflow" },
  { label: "Demo scheduling", description: "Book product demos with qualified leads", icon: CalendarDays, query: "Help me schedule demos for this week's qualified leads", category: "task" },
  { label: "Contract review", description: "Summarize contract terms and flag key clauses", icon: FileCode, query: "Review this contract and highlight important terms", category: "task" },
  { label: "Win/loss analysis", description: "Identify patterns in closed-won and closed-lost deals", icon: Search, query: "Analyze our win/loss patterns for the last quarter", category: "task" },
  { label: "Territory planning", description: "Optimize territory assignments across the team", icon: Globe, query: "Help me plan territory assignments for next quarter", category: "task" },
  { label: "Commission estimates", description: "Calculate expected commissions based on pipeline", icon: Calculator, query: "Estimate my commissions based on current pipeline", category: "task" },
];

const ENGINEERING_SKILLS: Skill[] = [
  { label: "PR review summary", description: "Summarize open pull requests and review status", icon: GitPullRequest, query: "Summarize the open pull requests that need my review", category: "task" },
  { label: "Sprint report", description: "Generate a sprint retrospective and velocity report", icon: BarChart3, query: "Generate a sprint report for the current iteration", category: "task" },
  { label: "Bug triage", description: "Prioritize and categorize incoming bug reports", icon: Bug, query: "Help me triage and prioritize the current bug backlog", category: "task" },
  { label: "Draft tech spec", description: "Outline a technical design document", icon: FileCode, query: "Help me draft a technical spec for a new feature", category: "task" },
  { label: "Release notes", description: "Compile merged PRs into formatted release notes", icon: FileText, query: "Generate release notes from this sprint's merged PRs", category: "task" },
  { label: "Incident post-mortem", description: "Create a structured incident timeline and RCA", icon: Shield, query: "Help me write a post-mortem for the recent incident", category: "task" },
  { label: "Dependency audit", description: "Check for vulnerable or outdated packages", icon: Search, query: "Audit our dependencies for vulnerabilities", category: "workflow" },
  { label: "API documentation", description: "Auto-generate docs from code and comments", icon: ClipboardList, query: "Generate API documentation for our endpoints", category: "task" },
  { label: "Test coverage report", description: "Identify untested code paths and suggest tests", icon: Target, query: "Show me test coverage gaps and suggest improvements", category: "task" },
  { label: "Performance profiling", description: "Identify bottlenecks and suggest optimizations", icon: Zap, query: "Help me profile and optimize this slow endpoint", category: "task" },
  { label: "Migration planning", description: "Plan database or API migration steps", icon: CalendarDays, query: "Help me plan the database migration for the new schema", category: "task" },
  { label: "On-call scheduling", description: "Manage rotations and handle swap requests", icon: Users, query: "Set up the on-call rotation for next month", category: "workflow" },
];

const LEADERSHIP_SKILLS: Skill[] = [
  { label: "Team performance", description: "Summarize team metrics and highlights this week", icon: Users, query: "Summarize my team's performance and key metrics this week", category: "task" },
  { label: "Prepare board deck", description: "Draft key slides and talking points for the board", icon: Presentation, query: "Help me prepare a board presentation deck", category: "task" },
  { label: "Weekly status report", description: "Auto-generate a status update from team inputs", icon: ClipboardList, query: "Generate a weekly status report from my team's updates", category: "workflow" },
  { label: "Schedule 1-on-1s", description: "Set up recurring check-ins with direct reports", icon: CalendarDays, query: "Help me schedule 1-on-1 meetings with my direct reports", category: "task" },
  { label: "OKR tracking", description: "Monitor quarterly OKR progress across teams", icon: Target, query: "Show me OKR progress across all teams", category: "workflow" },
  { label: "Hiring plan review", description: "Track headcount plan vs. actual across departments", icon: BarChart3, query: "Review our hiring plan progress by department", category: "task" },
  { label: "Strategy summarizer", description: "Distill long strategy docs into executive summaries", icon: FileText, query: "Summarize this strategy document for the exec team", category: "helper" },
  { label: "Investor update", description: "Draft monthly investor communications from metrics", icon: Mail, query: "Help me draft this month's investor update", category: "task" },
  { label: "All-hands planning", description: "Coordinate agenda, speakers, and logistics", icon: Megaphone, query: "Help me plan the next all-hands meeting", category: "task" },
  { label: "Budget review", description: "Summarize departmental budgets and flag overages", icon: DollarSign, query: "Review department budgets and highlight concerns", category: "task" },
  { label: "Competitor intelligence", description: "Aggregate competitive insights from public sources", icon: Search, query: "Compile a competitive intelligence briefing", category: "helper" },
  { label: "Team health check", description: "Track morale, velocity, and attrition signals", icon: Shield, query: "Run a team health check across all departments", category: "workflow" },
];

const FINANCE_SKILLS: Skill[] = [
  { label: "Expense approvals", description: "Set up automated expense review and approval flows", icon: Receipt, query: "Help me automate the expense approval workflow", category: "workflow" },
  { label: "Monthly P&L", description: "Generate a profit & loss summary from recent data", icon: DollarSign, query: "Generate a monthly P&L summary report", category: "task" },
  { label: "Reconcile invoices", description: "Match invoices to POs and flag discrepancies", icon: FileText, query: "Help me reconcile invoices against purchase orders", category: "task" },
  { label: "Budget tracking", description: "Monitor spend vs. budget across departments", icon: Calculator, query: "Show me budget utilization across all departments", category: "workflow" },
  { label: "Cash flow forecast", description: "Project cash positions using AR, AP, and pipeline data", icon: TrendingUp, query: "Generate a cash flow forecast for next quarter", category: "task" },
  { label: "Revenue recognition", description: "Apply ASC 606 rules and generate journal entries", icon: BarChart3, query: "Help me with revenue recognition for this period", category: "workflow" },
  { label: "Vendor payment scheduling", description: "Process payments on due dates with approval checks", icon: CalendarDays, query: "Schedule vendor payments for this month", category: "workflow" },
  { label: "Tax filing prep", description: "Organize documents and data for quarterly filings", icon: ClipboardList, query: "Help me prepare for the quarterly tax filing", category: "task" },
  { label: "Audit documentation", description: "Collect and organize evidence for SOX compliance", icon: Shield, query: "Help me prepare audit documentation", category: "task" },
  { label: "Subscription tracking", description: "Monitor SaaS renewals, costs, and usage trends", icon: Zap, query: "Show me all SaaS subscriptions and their renewal dates", category: "workflow" },
  { label: "Contract review", description: "Scan contracts for financial terms and obligations", icon: Search, query: "Review this contract for financial terms and risks", category: "task" },
  { label: "Procurement requests", description: "Route purchase requests through budget checks", icon: Globe, query: "Help me process a procurement request", category: "workflow" },
];

export const PERSONA_SKILLS: Record<string, Skill[]> = {
  hr: HR_SKILLS,
  marketing: MARKETING_SKILLS,
  sales: SALES_SKILLS,
  engineering: ENGINEERING_SKILLS,
  leadership: LEADERSHIP_SKILLS,
  finance: FINANCE_SKILLS,
};
