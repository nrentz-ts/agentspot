import type { HelperItem } from "./agents-data";

export type CommunityCategory =
  | "All"
  | "HR & People"
  | "Marketing"
  | "Sales"
  | "Engineering"
  | "Leadership"
  | "Finance";

export interface CommunityHelperItem extends HelperItem {
  category: CommunityCategory;
  author: string;
  installs: number;
}

export const COMMUNITY_HELPERS: CommunityHelperItem[] = [
  // ── HR & People ────────────────────────────────────────────────────────────
  { id: "cc01", name: "Culture Pulse",          description: "Runs anonymous pulse surveys and generates sentiment trend reports",               color: "bg-rose-100",   emoji: "💡", category: "HR & People",  author: "PeopleFirst",    installs: 3200 },
  { id: "cc02", name: "Referral Tracker",        description: "Manages employee referral programs and tracks bonus payouts",                      color: "bg-cyan-100",   emoji: "🤝", category: "HR & People",  author: "TeamLink",       installs: 1870 },
  { id: "cc03", name: "Compliance Checker",      description: "Validates HR documents and policies against regional labor regulations",           color: "bg-lime-100",   emoji: "✅", category: "HR & People",  author: "LegalOps",       installs: 2640 },
  { id: "cc04", name: "DEI Dashboard Bot",       description: "Generates diversity and inclusion metrics from hiring and retention data",         color: "bg-purple-100", emoji: "🌍", category: "HR & People",  author: "InclusionLab",   installs: 1540 },
  { id: "cc05", name: "Training Scheduler",      description: "Assigns, tracks, and reminds employees of mandatory training completions",         color: "bg-indigo-100", emoji: "📚", category: "HR & People",  author: "LearnBot",       installs: 2890 },
  { id: "cc06", name: "Comp Benchmarker",        description: "Pulls market pay data and flags roles that are out of band",                       color: "bg-amber-100",  emoji: "💵", category: "HR & People",  author: "CompData",       installs: 1320 },
  { id: "cc07", name: "Engagement Analyzer",     description: "Spots engagement drop signals early across survey and activity data",              color: "bg-teal-100",   emoji: "📊", category: "HR & People",  author: "PeopleFirst",    installs: 980  },
  { id: "cc08", name: "Headcount Planner",       description: "Models hiring scenarios against budget and organizational growth targets",         color: "bg-orange-100", emoji: "👥", category: "HR & People",  author: "OrgDesign",      installs: 740  },

  // ── Marketing ──────────────────────────────────────────────────────────────
  { id: "cc09", name: "Influencer Finder",       description: "Identifies relevant influencers based on niche, reach, and audience fit",          color: "bg-pink-100",   emoji: "⭐", category: "Marketing",    author: "CreatorHQ",      installs: 4100 },
  { id: "cc10", name: "Competitor Tracker",      description: "Monitors competitor content, pricing changes, and positioning shifts daily",       color: "bg-sky-100",    emoji: "👀", category: "Marketing",    author: "CompIntel",      installs: 3560 },
  { id: "cc11", name: "Press Release Writer",    description: "Drafts press releases following AP style with SEO best practices baked in",        color: "bg-lime-100",   emoji: "📰", category: "Marketing",    author: "PRBot",          installs: 2230 },
  { id: "cc12", name: "UTM Builder",             description: "Generates, validates, and manages UTM parameters across all campaigns",            color: "bg-violet-100", emoji: "🔗", category: "Marketing",    author: "TrackStack",     installs: 5600 },
  { id: "cc13", name: "Testimonial Collector",   description: "Requests, organizes, and formats customer testimonials for all channels",          color: "bg-orange-100", emoji: "💬", category: "Marketing",    author: "SocialProof",    installs: 1890 },
  { id: "cc14", name: "Newsletter Builder",      description: "Curates highlights and drafts weekly newsletters from your content sources",       color: "bg-green-100",  emoji: "📧", category: "Marketing",    author: "MailFlow",       installs: 3120 },
  { id: "cc15", name: "Webinar Prompter",        description: "Generates live polling questions, chat prompts, and post-event follow-ups",        color: "bg-rose-100",   emoji: "🎙️", category: "Marketing",    author: "LiveStream",     installs: 870  },
  { id: "cc16", name: "Ad Copy Tester",          description: "Generates headline and description variants and scores them for predicted CTR",    color: "bg-amber-100",  emoji: "🎯", category: "Marketing",    author: "AdLab",          installs: 2450 },

  // ── Sales ──────────────────────────────────────────────────────────────────
  { id: "cc17", name: "Territory Mapper",        description: "Assigns and visualizes sales territories based on zip, revenue, and rep capacity",  color: "bg-emerald-100",emoji: "🗺️", category: "Sales",        author: "RevOps",         installs: 1230 },
  { id: "cc18", name: "Win/Loss Analyzer",       description: "Surfaces patterns in closed-won and closed-lost deals across rep and segment",      color: "bg-cyan-100",   emoji: "🏆", category: "Sales",        author: "DealDesk",       installs: 2780 },
  { id: "cc19", name: "Commission Calculator",   description: "Computes commissions in real time based on deal structure, tiers, and SPIFFs",      color: "bg-lime-100",   emoji: "💰", category: "Sales",        author: "CompPlan",       installs: 4900 },
  { id: "cc20", name: "Demo Scheduler",          description: "Books product demos with qualified leads and sends personalized calendar invites",   color: "bg-purple-100", emoji: "🖥️", category: "Sales",        author: "DemoBot",        installs: 3300 },
  { id: "cc21", name: "Churn Predictor",         description: "Flags accounts at risk of churn using engagement, usage, and sentiment signals",    color: "bg-red-100",    emoji: "⚠️", category: "Sales",        author: "RetainIQ",       installs: 2100 },
  { id: "cc22", name: "Pricing Advisor",         description: "Suggests optimal discount levels based on deal size, competitive context, and history",color: "bg-sky-100",  emoji: "💲", category: "Sales",        author: "DealDesk",       installs: 1670 },
  { id: "cc23", name: "Cold Outreach Writer",    description: "Personalises cold email sequences using prospect's LinkedIn and company context",   color: "bg-indigo-100", emoji: "✉️", category: "Sales",        author: "OutboundHQ",     installs: 5800 },
  { id: "cc24", name: "Sales Coach",             description: "Reviews call recordings and highlights coachable moments with suggested scripts",   color: "bg-orange-100", emoji: "🎓", category: "Sales",        author: "CoachIQ",        installs: 1420 },

  // ── Engineering ────────────────────────────────────────────────────────────
  { id: "cc25", name: "Tech Spec Writer",        description: "Outlines technical design documents and RFC drafts from brief descriptions",        color: "bg-rose-100",   emoji: "📐", category: "Engineering",  author: "DevFlow",        installs: 3400 },
  { id: "cc26", name: "Test Generator",          description: "Creates unit and integration tests from function signatures and docstrings",        color: "bg-teal-100",   emoji: "🧪", category: "Engineering",  author: "QABot",          installs: 4200 },
  { id: "cc27", name: "Migration Planner",       description: "Plans and tracks database and API migration steps with rollback strategies",        color: "bg-amber-100",  emoji: "🔄", category: "Engineering",  author: "SchemaFlow",     installs: 1950 },
  { id: "cc28", name: "Security Auditor",        description: "Scans code changes for common vulnerabilities and OWASP top-10 violations",         color: "bg-red-100",    emoji: "🔒", category: "Engineering",  author: "SecureStack",    installs: 2760 },

  // ── Leadership ─────────────────────────────────────────────────────────────
  { id: "cc29", name: "Board Report Builder",    description: "Generates board-ready narrative decks from OKR, finance, and product updates",     color: "bg-blue-100",   emoji: "📑", category: "Leadership",   author: "ExecOps",        installs: 1180 },
  { id: "cc30", name: "Risk Detector",           description: "Identifies emerging business risks by scanning signals across ops, finance, and HR", color: "bg-red-100",   emoji: "🚨", category: "Leadership",   author: "RiskOps",        installs: 890  },

  // ── Finance ────────────────────────────────────────────────────────────────
  { id: "cc31", name: "Budget Forecaster",       description: "Models multi-scenario budget forecasts and variance explanations automatically",    color: "bg-emerald-100",emoji: "📈", category: "Finance",      author: "FinOps",         installs: 2340 },
  { id: "cc32", name: "Vendor Evaluator",        description: "Compares vendor proposals against scorecard criteria and total cost of ownership",  color: "bg-violet-100", emoji: "🔍", category: "Finance",      author: "ProcureBot",     installs: 1560 },
];

export const COMMUNITY_CATEGORIES: CommunityCategory[] = [
  "All", "HR & People", "Marketing", "Sales", "Engineering", "Leadership", "Finance",
];
