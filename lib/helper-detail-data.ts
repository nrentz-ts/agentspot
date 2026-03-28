export type MetricAccent = "primary" | "amber" | "sky" | "emerald" | "violet" | "rose" | "teal";
export type MetricIconId = "message" | "alert" | "clock" | "star" | "check" | "trending" | "users" | "file" | "zap" | "target";
export type ResolutionColor = "green" | "amber" | "blue" | "red" | "violet";

export interface HelperMetricData {
  label: string;
  value: string;
  sub: string;
  trend: string;
  up: boolean | null;
  iconId: MetricIconId;
  accent: MetricAccent;
}

export interface ActivityItemData {
  initials: string;
  action: string;
  resolution: string;
  resolutionColor: ResolutionColor;
  time: string;
}

export interface GapItemData {
  id: number;
  description: string;
  count: number;
}

export interface HelperDetailData {
  name: string;
  description: string;
  emoji: string;
  lastActive: string;
  metrics: HelperMetricData[];
  chartData: { day: string; count: number }[];
  chartLabel: string;
  activityTitle: string;
  activity: ActivityItemData[];
  gapsTitle: string;
  gapsSubtitle: string;
  gaps: GapItemData[];
}

function d(
  name: string,
  description: string,
  emoji: string,
  lastActive: string,
  metrics: HelperMetricData[],
  chart: number[],
  chartLabel: string,
  activityTitle: string,
  activity: ActivityItemData[],
  gapsTitle: string,
  gapsSubtitle: string,
  gaps: GapItemData[]
): HelperDetailData {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return {
    name, description, emoji, lastActive, metrics,
    chartData: days.map((day, i) => ({ day, count: chart[i] })),
    chartLabel, activityTitle, activity, gapsTitle, gapsSubtitle, gaps,
  };
}

const a = (i: string, action: string, resolution: string, resolutionColor: ResolutionColor, time: string): ActivityItemData =>
  ({ initials: i, action, resolution, resolutionColor, time });

const g = (id: number, description: string, count: number): GapItemData => ({ id, description, count });

// ─── HR ───────────────────────────────────────────────────────────────────────

const BENEFITS_FAQ_AGENT = d(
  "Benefits FAQ Agent",
  "Answers employee questions about benefits, expenses, and leave policies",
  "💬", "Answered a question 12 min ago",
  [
    { label: "Questions Answered", value: "47", sub: "this week", trend: "+12 from last week", up: true, iconId: "message", accent: "primary" },
    { label: "Escalated to Sarah", value: "3", sub: "this week", trend: "needed your judgment", up: null, iconId: "alert", accent: "amber" },
    { label: "Avg Response Time", value: "8s", sub: "per reply", trend: "−2s from last week", up: true, iconId: "clock", accent: "sky" },
    { label: "Employee Satisfaction", value: "4.6", sub: "out of 5", trend: "+0.3 from last week", up: true, iconId: "star", accent: "emerald" },
  ],
  [5, 9, 7, 12, 8, 2, 4], "Questions answered per day",
  "Recent Activity",
  [
    a("R.K.", "How many sick days do I have left this year?", "Answered", "green", "12 min ago"),
    a("P.M.", "Can I carry over unused PTO to next year?", "Clarified then answered", "blue", "41 min ago"),
    a("T.O.", "My dental claim was rejected — what do I do?", "Escalated", "amber", "1 hr ago"),
    a("A.S.", "What's the reimbursement limit for home office equipment?", "Answered", "green", "2 hrs ago"),
    a("L.W.", "Does the health plan cover physiotherapy?", "Answered", "green", "3 hrs ago"),
    a("C.B.", "I need parental leave info — when does it start and for how long?", "Clarified then answered", "blue", "5 hrs ago"),
    a("D.N.", "My gym reimbursement hasn't been processed in 6 weeks.", "Escalated", "amber", "Yesterday"),
    a("F.R.", "Is vision insurance included in the standard plan?", "Answered", "green", "Yesterday"),
  ],
  "Where your Helper needs help", "Questions it couldn't answer confidently",
  [
    g(1, "How does the FSA rollover work if I change plans mid-year?", 6),
    g(2, "Are mental health sessions covered under the standard policy?", 4),
    g(3, "What happens to my benefits during an unpaid leave of absence?", 3),
    g(4, "Can dependents be added outside of open enrollment?", 2),
  ]
);

const RESUME_SCREENER = d(
  "Resume Screener",
  "Scores and ranks candidates against job criteria automatically",
  "📄", "Screened 6 resumes 18 min ago",
  [
    { label: "Resumes Screened", value: "84", sub: "this week", trend: "+21 from last week", up: true, iconId: "file", accent: "primary" },
    { label: "Shortlisted", value: "19", sub: "this week", trend: "23% pass rate", up: null, iconId: "check", accent: "emerald" },
    { label: "Avg Screen Time", value: "14s", sub: "per resume", trend: "−3s from last week", up: true, iconId: "clock", accent: "sky" },
    { label: "Accuracy Rating", value: "91%", sub: "manager-confirmed", trend: "+4% from last month", up: true, iconId: "star", accent: "violet" },
  ],
  [12, 18, 14, 22, 11, 3, 4], "Resumes screened per day",
  "Recent Screens",
  [
    a("J.P.", "Senior Product Manager — 8 yrs exp, strong PM track record", "Shortlisted", "green", "18 min ago"),
    a("M.L.", "Product Designer — missing required Figma portfolio", "Rejected", "red", "34 min ago"),
    a("K.T.", "Senior Engineer — excellent match, 2 yrs below seniority bar", "Flagged for review", "amber", "52 min ago"),
    a("R.A.", "Marketing Manager — all criteria met, referred internally", "Shortlisted", "green", "1 hr ago"),
    a("S.C.", "Data Analyst — strong SQL skills, no Python as required", "Flagged for review", "amber", "2 hrs ago"),
    a("B.N.", "UX Researcher — portfolio links broken, can't assess", "Escalated", "amber", "3 hrs ago"),
    a("I.M.", "Operations Lead — overqualified for level, flagged for senior role", "Flagged for review", "amber", "4 hrs ago"),
    a("V.H.", "Frontend Engineer — met all criteria, fast-track recommended", "Shortlisted", "green", "Yesterday"),
  ],
  "Where your Helper needs help", "Criteria it struggles to evaluate",
  [
    g(1, "How to score candidates with non-traditional career paths?", 8),
    g(2, "Evaluating international qualifications and certifications", 5),
    g(3, "Assessing culture fit from a resume alone", 4),
    g(4, "Comparing candidates across multiple open roles simultaneously", 3),
  ]
);

const ONBOARDING_BOT = d(
  "Onboarding Bot",
  "Guides new hires through day-one checklists and setup tasks",
  "🎯", "Sent setup reminder to 2 new hires 22 min ago",
  [
    { label: "New Hires Guided", value: "12", sub: "this month", trend: "+4 from last month", up: true, iconId: "users", accent: "primary" },
    { label: "Completion Rate", value: "94%", sub: "of all tasks", trend: "+6% from last month", up: true, iconId: "check", accent: "emerald" },
    { label: "Avg Onboarding Time", value: "2.1d", sub: "to full setup", trend: "−1.4 days vs benchmark", up: true, iconId: "clock", accent: "sky" },
    { label: "New Hire CSAT", value: "4.8", sub: "out of 5", trend: "+0.2 from last cohort", up: true, iconId: "star", accent: "amber" },
  ],
  [0, 3, 5, 2, 0, 0, 2], "New hires started per day",
  "Recent Onboardings",
  [
    a("M.P.", "Day 1 checklist — IT setup, badge, and Slack access", "Completed", "green", "22 min ago"),
    a("A.K.", "Benefits enrolment reminder sent — deadline in 3 days", "Pending", "amber", "1 hr ago"),
    a("T.R.", "Manager intro meeting scheduled for tomorrow 10am", "Completed", "green", "2 hrs ago"),
    a("L.S.", "Tool access request for Jira — awaiting IT approval", "Escalated", "amber", "3 hrs ago"),
    a("D.W.", "Week 1 check-in survey sent and completed", "Completed", "green", "Yesterday"),
    a("P.F.", "Role-specific training modules assigned and accepted", "Completed", "green", "Yesterday"),
    a("O.M.", "Payroll setup incomplete — bank details not submitted", "Escalated", "amber", "2 days ago"),
    a("R.J.", "30-day onboarding review scheduled with manager", "Completed", "green", "2 days ago"),
  ],
  "Where your Helper needs help", "Steps it can't complete automatically",
  [
    g(1, "Role-specific tool access varies by team — no standard list", 7),
    g(2, "Contractor vs full-time onboarding steps differ significantly", 5),
    g(3, "Remote-only new hires have different equipment shipping needs", 4),
    g(4, "Visa or work-permit documentation requires manual HR review", 3),
  ]
);

const INTERVIEW_SCHEDULER = d(
  "Interview Scheduler",
  "Coordinates interview panels across multiple calendars automatically",
  "📅", "Scheduled 2 interview panels 35 min ago",
  [
    { label: "Interviews Scheduled", value: "31", sub: "this week", trend: "+8 from last week", up: true, iconId: "check", accent: "primary" },
    { label: "Conflicts Resolved", value: "7", sub: "this week", trend: "auto-resolved 5 of 7", up: null, iconId: "alert", accent: "amber" },
    { label: "Avg Scheduling Time", value: "3.2m", sub: "per interview", trend: "−1.8m from last week", up: true, iconId: "clock", accent: "sky" },
    { label: "Reschedule Rate", value: "11%", sub: "of bookings", trend: "−4% from last month", up: true, iconId: "trending", accent: "emerald" },
  ],
  [4, 7, 6, 9, 5, 0, 0], "Interviews scheduled per day",
  "Recent Scheduling Activity",
  [
    a("K.B.", "Senior PM panel — 4 interviewers, 90 min slot found for Thursday", "Scheduled", "green", "35 min ago"),
    a("H.T.", "Design lead final round — cross-timezone, manual input needed", "Escalated", "amber", "1 hr ago"),
    a("N.R.", "Engineering take-home review slot — candidate confirmed", "Scheduled", "green", "2 hrs ago"),
    a("W.P.", "Marketing Manager — 2 interviewers unavailable, rescheduled", "Rescheduled", "blue", "3 hrs ago"),
    a("Z.A.", "Recruiter screen — self-serve calendar link sent to candidate", "Scheduled", "green", "4 hrs ago"),
    a("E.S.", "Exec interview for COO role — founder availability needed", "Escalated", "amber", "Yesterday"),
    a("Y.L.", "Culture fit round — Zoom link generated and shared", "Scheduled", "green", "Yesterday"),
    a("F.C.", "Final offer stage debrief — team calendar blocked", "Scheduled", "green", "Yesterday"),
  ],
  "Where your Helper needs help", "Scheduling scenarios it can't handle alone",
  [
    g(1, "Multi-timezone panels with more than 3 interviewers", 9),
    g(2, "Candidates who don't respond to calendar invites", 6),
    g(3, "Last-minute cancellations needing same-day reschedules", 5),
    g(4, "Debrief meetings that require specific room bookings", 2),
  ]
);

const PTO_TRACKER = d(
  "PTO Tracker",
  "Monitors leave balances and routes approval requests automatically",
  "🏖️", "Processed 3 PTO requests 8 min ago",
  [
    { label: "Requests Processed", value: "38", sub: "this week", trend: "+9 from last week", up: true, iconId: "check", accent: "primary" },
    { label: "Auto-Approved", value: "29", sub: "this week", trend: "76% auto-rate", up: true, iconId: "zap", accent: "emerald" },
    { label: "Avg Processing Time", value: "4m", sub: "per request", trend: "−2m from last month", up: true, iconId: "clock", accent: "sky" },
    { label: "Policy Conflicts", value: "4", sub: "this week", trend: "needed manual review", up: null, iconId: "alert", accent: "amber" },
  ],
  [6, 9, 7, 11, 3, 1, 1], "Requests processed per day",
  "Recent Requests",
  [
    a("C.P.", "5-day vacation — sufficient balance, no team conflicts", "Approved", "green", "8 min ago"),
    a("D.O.", "Sick leave — 3 days, balance confirmed, manager notified", "Approved", "green", "31 min ago"),
    a("S.F.", "Extended leave — 14 days, overlaps with team deadline", "Escalated", "amber", "55 min ago"),
    a("L.K.", "Half-day mental health day — approved, no documentation needed", "Approved", "green", "1 hr ago"),
    a("M.W.", "Bereavement leave — 5 days, special policy rules applied", "Escalated", "amber", "2 hrs ago"),
    a("N.T.", "Annual leave in December peak period — conflict flagged", "Flagged for review", "amber", "3 hrs ago"),
    a("A.B.", "Work from abroad — not a PTO type, routed to HR policy", "Clarified", "blue", "4 hrs ago"),
    a("R.H.", "Comp time for weekend work — balance calculated correctly", "Approved", "green", "Yesterday"),
  ],
  "Where your Helper needs help", "Leave scenarios requiring your judgment",
  [
    g(1, "Requests during blackout periods with business justification", 8),
    g(2, "Leave spanning two different accrual years", 5),
    g(3, "Parental leave that combines paid and unpaid days", 4),
    g(4, "Part-time employees with pro-rated leave calculations", 3),
  ]
);

const OFFER_LETTER_GENERATOR = d(
  "Offer Letter Generator",
  "Drafts customised offer letters from approved templates",
  "✉️", "Generated an offer letter 27 min ago",
  [
    { label: "Letters Generated", value: "14", sub: "this month", trend: "+5 from last month", up: true, iconId: "file", accent: "primary" },
    { label: "Accepted", value: "11", sub: "this month", trend: "79% acceptance rate", up: true, iconId: "check", accent: "emerald" },
    { label: "Avg Generation Time", value: "22s", sub: "per letter", trend: "templates all current", up: null, iconId: "clock", accent: "sky" },
    { label: "Revision Requests", value: "2", sub: "this month", trend: "−3 from last month", up: true, iconId: "alert", accent: "amber" },
  ],
  [0, 3, 2, 4, 3, 0, 2], "Letters generated per day",
  "Recent Letters",
  [
    a("M.P.", "Senior Engineer — offer generated, awaiting signature", "Sent", "green", "27 min ago"),
    a("J.K.", "Product Designer — compensation outside standard band", "Escalated", "amber", "2 hrs ago"),
    a("T.N.", "Sales Manager — commission structure needed custom clause", "Clarified", "blue", "Yesterday"),
    a("A.R.", "Operations Analyst — standard letter, signed within 1 hr", "Accepted", "green", "Yesterday"),
    a("C.M.", "Head of Marketing — exec template used, C-suite approved", "Sent", "green", "2 days ago"),
    a("V.S.", "Data Scientist — relocation bonus clause added manually", "Accepted", "green", "2 days ago"),
    a("P.L.", "UX Researcher — offer accepted, start date confirmed", "Accepted", "green", "3 days ago"),
    a("D.W.", "Finance Analyst — standard letter generated in 18 seconds", "Accepted", "green", "3 days ago"),
  ],
  "Where your Helper needs help", "Situations it can't generate automatically",
  [
    g(1, "Offers with equity grants that need legal review", 5),
    g(2, "International hires requiring country-specific addendums", 4),
    g(3, "Counteroffers where salary is above the approved band", 3),
    g(4, "Part-time or job-share arrangements with custom schedules", 2),
  ]
);

const ENGAGEMENT_SURVEY_AGENT = d(
  "Engagement Survey Agent",
  "Creates, distributes, and analyses employee pulse surveys",
  "📊", "Distributed a pulse survey 1 hr ago",
  [
    { label: "Surveys Distributed", value: "3", sub: "this month", trend: "to 340 employees", up: null, iconId: "message", accent: "primary" },
    { label: "Avg Response Rate", value: "78%", sub: "this month", trend: "+6% from last survey", up: true, iconId: "users", accent: "emerald" },
    { label: "Sentiment Score", value: "7.9", sub: "out of 10", trend: "+0.4 from last month", up: true, iconId: "star", accent: "amber" },
    { label: "Issues Flagged", value: "5", sub: "this month", trend: "need your attention", up: null, iconId: "alert", accent: "violet" },
  ],
  [0, 0, 280, 310, 295, 12, 8], "Responses collected per day",
  "Recent Survey Activity",
  [
    a("—", "Q1 pulse survey distributed to all 340 employees", "Sent", "green", "1 hr ago"),
    a("—", "Engineering team sentiment flagged as low — 6.1/10", "Flagged", "amber", "3 hrs ago"),
    a("—", "Marketing team scores highest at 8.9 — shared with leadership", "Completed", "green", "Yesterday"),
    a("—", "Anonymous comment flagged: concerns about promotion process", "Escalated", "amber", "Yesterday"),
    a("—", "Q4 survey summary report generated and distributed to managers", "Completed", "green", "2 days ago"),
    a("—", "Follow-up question added based on low scores in benefits section", "Clarified", "blue", "2 days ago"),
    a("—", "Reminder sent to 68 employees who hadn't responded by day 3", "Sent", "green", "3 days ago"),
    a("—", "New onboarding pulse (30-day) created for current new hires", "Completed", "green", "4 days ago"),
  ],
  "Where your Helper needs help", "Scenarios requiring your input",
  [
    g(1, "Designing questions that don't lead or bias responses", 6),
    g(2, "Setting appropriate anonymity thresholds for small teams", 4),
    g(3, "Handling free-text responses that contain personal information", 3),
    g(4, "Comparing results across teams of very different sizes", 2),
  ]
);

const CANDIDATE_EXPERIENCE_HELPER = d(
  "Candidate Experience Helper",
  "Sets up new hire checklists, documents, and welcome flows",
  "🤝", "Sent a welcome email 14 min ago",
  [
    { label: "Candidates Touched", value: "52", sub: "this week", trend: "+14 from last week", up: true, iconId: "users", accent: "primary" },
    { label: "Positive Feedback", value: "89%", sub: "of responses", trend: "+5% from last month", up: true, iconId: "star", accent: "emerald" },
    { label: "Avg Response Time", value: "6m", sub: "to candidate queries", trend: "−2m from last week", up: true, iconId: "clock", accent: "sky" },
    { label: "Dropped Off", value: "4", sub: "this week", trend: "after no response", up: null, iconId: "alert", accent: "amber" },
  ],
  [7, 11, 9, 14, 8, 2, 1], "Candidate interactions per day",
  "Recent Interactions",
  [
    a("S.W.", "Application status update sent — moved to phone screen", "Sent", "green", "14 min ago"),
    a("R.N.", "Candidate asked about relocation support — escalated to HR", "Escalated", "amber", "38 min ago"),
    a("T.B.", "Post-interview thank-you and next steps email sent", "Sent", "green", "1 hr ago"),
    a("P.A.", "Offer stage — prep guide and FAQ sent automatically", "Sent", "green", "2 hrs ago"),
    a("D.K.", "Candidate did not respond to 3 follow-ups — marked inactive", "Flagged", "amber", "3 hrs ago"),
    a("M.O.", "Rejection email sent with personalised note from template", "Sent", "green", "4 hrs ago"),
    a("L.F.", "Salary expectation query — directed to recruiter to handle", "Escalated", "amber", "Yesterday"),
    a("J.I.", "Pre-boarding pack sent to accepted offer candidate", "Sent", "green", "Yesterday"),
  ],
  "Where your Helper needs help", "Situations needing a human touch",
  [
    g(1, "Candidates who negotiate aggressively over email", 7),
    g(2, "Questions about visa sponsorship eligibility", 5),
    g(3, "Responding to candidates who leave negative Glassdoor reviews mid-process", 3),
    g(4, "Customising rejection messages for senior-level candidates", 2),
  ]
);

// ─── MARKETING ────────────────────────────────────────────────────────────────

const CONTENT_GENERATOR = d(
  "Content Generator",
  "Drafts blog posts and social copy from campaign briefs",
  "✍️", "Drafted 2 blog posts 20 min ago",
  [
    { label: "Pieces Created", value: "34", sub: "this week", trend: "+11 from last week", up: true, iconId: "file", accent: "primary" },
    { label: "Published", value: "22", sub: "this week", trend: "65% publish rate", up: true, iconId: "check", accent: "emerald" },
    { label: "Avg Draft Time", value: "48s", sub: "per piece", trend: "consistent this month", up: null, iconId: "clock", accent: "sky" },
    { label: "Editor Rating", value: "4.2", sub: "out of 5", trend: "+0.3 from last month", up: true, iconId: "star", accent: "amber" },
  ],
  [5, 8, 6, 9, 4, 1, 1], "Pieces drafted per day",
  "Recent Drafts",
  [
    a("K.L.", "Blog: '5 ways AI changes HR workflows' — draft ready for review", "Draft ready", "green", "20 min ago"),
    a("P.R.", "LinkedIn post for product update — published after minor edits", "Published", "green", "1 hr ago"),
    a("B.T.", "Email newsletter intro — tone flagged as too formal", "Revision needed", "amber", "2 hrs ago"),
    a("N.S.", "Twitter thread on campaign launch — all 8 tweets drafted", "Published", "green", "3 hrs ago"),
    a("M.A.", "Case study intro — client name placeholder needs filling", "Escalated", "amber", "4 hrs ago"),
    a("C.V.", "Instagram caption set — 3 variations provided for A/B test", "Draft ready", "green", "Yesterday"),
    a("D.H.", "Press release draft — legal review required before publish", "Escalated", "amber", "Yesterday"),
    a("F.G.", "SEO blog post on industry trends — published, 1.4K views", "Published", "green", "2 days ago"),
  ],
  "Where your Helper needs help", "Content it can't create confidently",
  [
    g(1, "Thought leadership articles that require personal anecdotes", 9),
    g(2, "Highly technical product content requiring engineering input", 6),
    g(3, "Content that references real customer quotes or case studies", 5),
    g(4, "Crisis communications or sensitive PR messaging", 3),
  ]
);

const CAMPAIGN_ANALYST = d(
  "Campaign Analyst",
  "Monitors ad performance and flags anomalies in real time",
  "📊", "Flagged a CTR anomaly 15 min ago",
  [
    { label: "Campaigns Monitored", value: "12", sub: "active", trend: "across 4 channels", up: null, iconId: "target", accent: "primary" },
    { label: "Anomalies Flagged", value: "5", sub: "this week", trend: "3 resolved automatically", up: null, iconId: "alert", accent: "amber" },
    { label: "Avg Analysis Time", value: "2.1m", sub: "per report", trend: "−0.4m from last week", up: true, iconId: "clock", accent: "sky" },
    { label: "ROI Improvement", value: "+15%", sub: "this quarter", trend: "via budget reallocation", up: true, iconId: "trending", accent: "emerald" },
  ],
  [2, 3, 4, 3, 5, 1, 2], "Anomalies flagged per day",
  "Recent Analysis",
  [
    a("—", "Spring campaign CTR dropped 0.8% — competitor ad surge detected", "Flagged", "amber", "15 min ago"),
    a("—", "LinkedIn paid campaign ROAS up 22% — budget increase recommended", "Insight", "green", "1 hr ago"),
    a("—", "Email click-through hit weekly low — subject line A/B test launched", "Action taken", "blue", "2 hrs ago"),
    a("—", "Google Ads spend pacing 14% over weekly budget — paused 2 ad sets", "Action taken", "blue", "3 hrs ago"),
    a("—", "Facebook retargeting frequency above 8 — audience fatigue risk", "Flagged", "amber", "Yesterday"),
    a("—", "Q1 campaign performance digest generated and sent to team", "Completed", "green", "Yesterday"),
    a("—", "Influencer partnership post drove 3x expected engagement", "Insight", "green", "2 days ago"),
    a("—", "Display ads conversion rate below threshold — escalated to agency", "Escalated", "amber", "2 days ago"),
  ],
  "Where your Helper needs help", "Analysis gaps to address",
  [
    g(1, "Attributing conversions across mixed online/offline touchpoints", 8),
    g(2, "Understanding why organic and paid results contradict each other", 5),
    g(3, "Evaluating brand awareness campaigns with no direct CTA", 4),
    g(4, "Comparing performance across channels with different buying cycles", 3),
  ]
);

const SOCIAL_PUBLISHER = d(
  "Social Publisher",
  "Schedules and publishes posts across all platforms automatically",
  "📱", "Published 3 posts 5 min ago",
  [
    { label: "Posts Published", value: "61", sub: "this week", trend: "+18 from last week", up: true, iconId: "check", accent: "primary" },
    { label: "Avg Engagement Rate", value: "3.8%", sub: "this week", trend: "+0.6% from last week", up: true, iconId: "trending", accent: "emerald" },
    { label: "Scheduling Accuracy", value: "99%", sub: "on-time rate", trend: "1 delay this month", up: null, iconId: "clock", accent: "sky" },
    { label: "Failed Posts", value: "2", sub: "this week", trend: "API errors, retried", up: null, iconId: "alert", accent: "amber" },
  ],
  [8, 12, 11, 14, 9, 4, 3], "Posts published per day",
  "Recent Posts",
  [
    a("—", "LinkedIn: product update announcement — 840 impressions so far", "Published", "green", "5 min ago"),
    a("—", "Instagram: behind-the-scenes team photo — caption approved", "Published", "green", "1 hr ago"),
    a("—", "Twitter/X: campaign launch thread — API rate limit hit, retrying", "Failed", "amber", "2 hrs ago"),
    a("—", "Facebook: customer testimonial — image size rejected, resized", "Retried", "blue", "3 hrs ago"),
    a("—", "LinkedIn: job posting shared — 3x normal engagement", "Published", "green", "4 hrs ago"),
    a("—", "All platforms: Friday weekly recap — scheduled for 9am Monday", "Scheduled", "blue", "Yesterday"),
    a("—", "Instagram story: product demo — link sticker not supported, escalated", "Escalated", "amber", "Yesterday"),
    a("—", "Twitter/X: live event coverage thread published in real time", "Published", "green", "2 days ago"),
  ],
  "Where your Helper needs help", "Publishing situations needing your input",
  [
    g(1, "Posts requiring image creation or design work", 11),
    g(2, "Responding to comments that contain complaints or negativity", 7),
    g(3, "Deciding whether to post during breaking news or sensitive events", 4),
    g(4, "Platform policy changes that affect content approval rules", 3),
  ]
);

const ANALYZE_CAMPAIGNS = d(
  "Analyze Campaigns",
  "Get performance summaries across all active campaigns",
  "📈", "Generated a campaign summary 30 min ago",
  [
    { label: "Reports Generated", value: "18", sub: "this week", trend: "+4 from last week", up: true, iconId: "file", accent: "primary" },
    { label: "Insights Surfaced", value: "23", sub: "this week", trend: "7 acted on immediately", up: true, iconId: "zap", accent: "emerald" },
    { label: "Avg Report Time", value: "1.8m", sub: "per summary", trend: "−0.3m from last week", up: true, iconId: "clock", accent: "sky" },
    { label: "Budget Saved", value: "$4.2K", sub: "this month", trend: "from paused underperformers", up: true, iconId: "trending", accent: "amber" },
  ],
  [3, 4, 3, 5, 2, 0, 1], "Reports generated per day",
  "Recent Reports",
  [
    a("—", "Spring launch 7-day performance — CTR 3.2%, CPA within target", "Completed", "green", "30 min ago"),
    a("—", "Email nurture sequence — open rate up 4%, unsubscribes low", "Completed", "green", "2 hrs ago"),
    a("—", "Paid social Q1 summary — ROAS 4.1x, LinkedIn outperforming", "Completed", "green", "Yesterday"),
    a("—", "SEO performance — 12 keywords moved to page 1 this week", "Completed", "green", "Yesterday"),
    a("—", "Webinar campaign — registration below target, boosted spend", "Flagged", "amber", "2 days ago"),
    a("—", "Competitor pricing page change detected — mentioned in report", "Insight", "blue", "2 days ago"),
    a("—", "Display retargeting — frequency above 7, budget reallocated", "Action taken", "blue", "3 days ago"),
    a("—", "Brand awareness campaign — lift measurement needs manual setup", "Escalated", "amber", "3 days ago"),
  ],
  "Where your Helper needs help", "Analysis it can't complete alone",
  [
    g(1, "Multi-touch attribution for campaigns with 6+ touchpoints", 7),
    g(2, "Seasonal benchmarks — not enough historical data yet", 5),
    g(3, "Qualitative feedback from sales on lead quality", 4),
    g(4, "Cross-regional campaign comparisons with different currencies", 2),
  ]
);

// ─── SALES ────────────────────────────────────────────────────────────────────

const LEAD_SCORER = d(
  "Lead Scorer",
  "Ranks inbound leads by fit and buying intent signals",
  "🎯", "Scored 14 new leads 6 min ago",
  [
    { label: "Leads Scored", value: "186", sub: "this week", trend: "+42 from last week", up: true, iconId: "users", accent: "primary" },
    { label: "High-Priority Leads", value: "31", sub: "this week", trend: "17% conversion predicted", up: true, iconId: "target", accent: "emerald" },
    { label: "Avg Scoring Time", value: "4s", sub: "per lead", trend: "consistent", up: null, iconId: "clock", accent: "sky" },
    { label: "Scoring Accuracy", value: "88%", sub: "rep-confirmed", trend: "+3% from last month", up: true, iconId: "star", accent: "amber" },
  ],
  [28, 35, 29, 44, 31, 9, 10], "Leads scored per day",
  "Recent Scores",
  [
    a("—", "Acme Corp — VP of Ops, $200K budget signal, score: 94/100", "High priority", "green", "6 min ago"),
    a("—", "TechStart Inc — free trial user, low engagement, score: 28/100", "Low priority", "amber", "22 min ago"),
    a("—", "Globex Ltd — matched ICP, demo requested, score: 87/100", "High priority", "green", "45 min ago"),
    a("—", "Solo consultant — outside target segment, score: 12/100", "Filtered out", "red", "1 hr ago"),
    a("—", "MedCore Systems — healthcare vertical, compliance flag noted", "Flagged for review", "amber", "2 hrs ago"),
    a("—", "RetailCo — webinar attendee, revisited pricing page 4 times", "High priority", "green", "3 hrs ago"),
    a("—", "Startup XYZ — small team, strong intent, routed to SMB rep", "Routed", "blue", "4 hrs ago"),
    a("—", "Enterprise Inc — decision maker identified in LinkedIn data", "High priority", "green", "Yesterday"),
  ],
  "Where your Helper needs help", "Scoring gaps to address",
  [
    g(1, "Leads from partner referrals with no digital footprint", 9),
    g(2, "Evaluating inbound leads from new, unfamiliar industries", 6),
    g(3, "Scoring accuracy drops when contact data is incomplete", 5),
    g(4, "Leads with multiple stakeholders involved in the decision", 4),
  ]
);

const FOLLOW_UP_DRAFTER = d(
  "Follow-up Drafter",
  "Writes personalised follow-up emails after calls and demos",
  "✉️", "Drafted 4 follow-up emails 20 min ago",
  [
    { label: "Emails Drafted", value: "63", sub: "this week", trend: "+17 from last week", up: true, iconId: "message", accent: "primary" },
    { label: "Sent by Reps", value: "54", sub: "this week", trend: "86% send rate", up: true, iconId: "check", accent: "emerald" },
    { label: "Avg Open Rate", value: "48%", sub: "of sent emails", trend: "+6% above team avg", up: true, iconId: "trending", accent: "sky" },
    { label: "Reply Rate", value: "31%", sub: "of sent emails", trend: "+4% from last month", up: true, iconId: "zap", accent: "amber" },
  ],
  [9, 13, 10, 16, 11, 2, 2], "Emails drafted per day",
  "Recent Drafts",
  [
    a("—", "Acme Corp follow-up — referenced pain points from call notes", "Sent", "green", "20 min ago"),
    a("—", "Globex demo recap — included custom ROI calc from the call", "Sent", "green", "1 hr ago"),
    a("—", "MedCore cold re-engage — tone flagged too salesy, revised", "Revision needed", "amber", "2 hrs ago"),
    a("—", "TechStart trial nudge — personalised to their use case", "Sent", "green", "3 hrs ago"),
    a("—", "RetailCo proposal send — PDF attached, tracking link included", "Sent", "green", "4 hrs ago"),
    a("—", "Enterprise Inc exec follow-up — C-suite tone applied", "Draft ready", "blue", "Yesterday"),
    a("—", "Lost deal re-engage — competitive loss reason referenced", "Revision needed", "amber", "Yesterday"),
    a("—", "Upsell nudge to existing customer — escalated to account manager", "Escalated", "amber", "2 days ago"),
  ],
  "Where your Helper needs help", "Email situations it handles less confidently",
  [
    g(1, "Emails referencing specific financial commitments or discounts", 8),
    g(2, "Re-engaging prospects who ghosted after a pricing discussion", 5),
    g(3, "Multi-stakeholder emails that need different tones for each contact", 4),
    g(4, "Post-loss follow-ups that are part of a longer-term nurture", 3),
  ]
);

const CRM_UPDATER = d(
  "CRM Updater",
  "Logs call notes and updates deal stages automatically",
  "💾", "Updated 3 deal stages 35 min ago",
  [
    { label: "Records Updated", value: "142", sub: "this week", trend: "+38 from last week", up: true, iconId: "check", accent: "primary" },
    { label: "Auto-Logged Calls", value: "87", sub: "this week", trend: "61% of all calls", up: true, iconId: "zap", accent: "emerald" },
    { label: "Data Accuracy", value: "96%", sub: "rep-verified", trend: "+2% from last month", up: true, iconId: "star", accent: "sky" },
    { label: "Missed Updates", value: "6", sub: "this week", trend: "needed manual entry", up: null, iconId: "alert", accent: "amber" },
  ],
  [20, 28, 22, 34, 27, 6, 5], "Records updated per day",
  "Recent Updates",
  [
    a("—", "Acme Corp — moved to Negotiation stage, next step logged", "Updated", "green", "35 min ago"),
    a("—", "TechNova — deal closed-won, $95K ARR, commission queued", "Updated", "green", "1 hr ago"),
    a("—", "Globex — call notes transcribed, 3 action items added", "Updated", "green", "2 hrs ago"),
    a("—", "RetailCo — no contact data found for new stakeholder", "Escalated", "amber", "3 hrs ago"),
    a("—", "Enterprise Inc — stage update blocked, duplicate record detected", "Flagged", "amber", "4 hrs ago"),
    a("—", "MedCore — call log attached, demo scheduled auto-added to calendar", "Updated", "green", "Yesterday"),
    a("—", "Startup XYZ — deal marked stale after 21 days no contact", "Flagged", "amber", "Yesterday"),
    a("—", "Upsell opp — new product interest noted from call transcript", "Updated", "green", "2 days ago"),
  ],
  "Where your Helper needs help", "CRM scenarios needing manual input",
  [
    g(1, "Calls where multiple deals are discussed in one conversation", 7),
    g(2, "Contacts who aren't yet in the CRM but appear in call notes", 5),
    g(3, "Complex multi-product deals with different close timelines", 4),
    g(4, "Deals where the decision maker changed mid-cycle", 3),
  ]
);

const PIPELINE_SUMMARY = d(
  "Pipeline Summary",
  "Get an overview of deals by stage and value",
  "📋", "Generated a pipeline report 22 min ago",
  [
    { label: "Total Pipeline", value: "$2.4M", sub: "active deals", trend: "+$340K from last week", up: true, iconId: "trending", accent: "primary" },
    { label: "Deals in Negotiation", value: "14", sub: "this week", trend: "4 stalled 2+ weeks", up: null, iconId: "alert", accent: "amber" },
    { label: "Avg Deal Size", value: "$72K", sub: "this quarter", trend: "+$8K from last quarter", up: true, iconId: "target", accent: "emerald" },
    { label: "Pipeline Coverage", value: "3.2x", sub: "vs. target", trend: "healthy for Q1 close", up: true, iconId: "check", accent: "sky" },
  ],
  [1, 2, 1, 3, 2, 0, 1], "Pipeline reports generated per day",
  "Recent Pipeline Events",
  [
    a("—", "Acme Corp ($180K) entered Negotiation — flagged as at risk", "Flagged", "amber", "22 min ago"),
    a("—", "TechNova ($95K) closed-won — updated in summary automatically", "Updated", "green", "1 hr ago"),
    a("—", "Q1 pipeline health report sent to VP Sales and leadership", "Completed", "green", "3 hrs ago"),
    a("—", "Globex ($120K) — demo scheduled, moved to Demo stage", "Updated", "green", "Yesterday"),
    a("—", "3 deals over $50K stalled — nudge emails drafted for reps", "Action taken", "blue", "Yesterday"),
    a("—", "New ICP leads added — pipeline coverage now 3.2x target", "Insight", "green", "2 days ago"),
    a("—", "Enterprise Inc ($210K) — legal review delaying close, flagged", "Flagged", "amber", "2 days ago"),
    a("—", "Weekly pipeline digest sent to all account executives", "Completed", "green", "3 days ago"),
  ],
  "Where your Helper needs help", "Pipeline situations needing your judgment",
  [
    g(1, "Deals where the original champion has left the company", 6),
    g(2, "Multi-year contracts that close in stages across quarters", 4),
    g(3, "Pipeline data that conflicts between Salesforce and spreadsheets", 3),
    g(4, "Deals with strategic value that don't fit standard scoring", 2),
  ]
);

// ─── ENGINEERING ──────────────────────────────────────────────────────────────

const PR_REVIEWER = d(
  "PR Reviewer",
  "Provides automated code review feedback on pull requests",
  "🔍", "Reviewed 3 pull requests 10 min ago",
  [
    { label: "PRs Reviewed", value: "38", sub: "this week", trend: "+9 from last week", up: true, iconId: "check", accent: "primary" },
    { label: "Issues Flagged", value: "14", sub: "this week", trend: "3 were critical bugs", up: null, iconId: "alert", accent: "amber" },
    { label: "Avg Review Time", value: "42s", sub: "per PR", trend: "consistent this month", up: null, iconId: "clock", accent: "sky" },
    { label: "False Positive Rate", value: "8%", sub: "of flagged items", trend: "−3% from last month", up: true, iconId: "target", accent: "emerald" },
  ],
  [5, 9, 7, 11, 4, 1, 1], "PRs reviewed per day",
  "Recent Reviews",
  [
    a("K.R.", "Auth module refactor — 2 security issues flagged, 1 style note", "Changes requested", "amber", "10 min ago"),
    a("J.S.", "API rate limiting — looks good, approved with minor comment", "Approved", "green", "28 min ago"),
    a("M.T.", "Database migration — breaking change detected, blocked", "Blocked", "red", "55 min ago"),
    a("A.P.", "Frontend component update — no issues, merged automatically", "Approved", "green", "1 hr ago"),
    a("L.B.", "Dependency upgrade — 1 vulnerability introduced, flagged", "Changes requested", "amber", "2 hrs ago"),
    a("D.C.", "Test coverage for payments — below 80% threshold, noted", "Flagged", "amber", "3 hrs ago"),
    a("N.W.", "Performance fix — benchmark improvement confirmed in tests", "Approved", "green", "Yesterday"),
    a("H.F.", "Large PR (1,200 lines) — split into smaller PRs recommended", "Escalated", "amber", "Yesterday"),
  ],
  "Where your Helper needs help", "Review situations needing a human engineer",
  [
    g(1, "Architectural decisions that affect multiple systems", 10),
    g(2, "Business logic changes that need product context to evaluate", 7),
    g(3, "Performance trade-offs where benchmarks are ambiguous", 5),
    g(4, "PRs that touch third-party integrations with undocumented behaviour", 4),
  ]
);

const BUG_TRIAGER = d(
  "Bug Triager",
  "Categorises and prioritises incoming bug reports",
  "🐛", "Triaged 5 new tickets 25 min ago",
  [
    { label: "Bugs Triaged", value: "67", sub: "this week", trend: "+14 from last week", up: true, iconId: "check", accent: "primary" },
    { label: "P1 / Critical", value: "4", sub: "this week", trend: "all assigned within 1 hr", up: null, iconId: "alert", accent: "amber" },
    { label: "Avg Triage Time", value: "28s", sub: "per ticket", trend: "−6s from last week", up: true, iconId: "clock", accent: "sky" },
    { label: "Duplicate Rate", value: "18%", sub: "of incoming", trend: "auto-closed and linked", up: null, iconId: "target", accent: "emerald" },
  ],
  [9, 14, 11, 17, 10, 3, 3], "Bugs triaged per day",
  "Recent Triage",
  [
    a("—", "Auth token expiry causing logout — P1, assigned to security team", "P1 assigned", "red", "25 min ago"),
    a("—", "UI layout broken on Safari 16 — P3, CSS fix queued", "Assigned", "green", "40 min ago"),
    a("—", "Export function timing out — P2, likely related to #4821", "Linked", "blue", "1 hr ago"),
    a("—", "Duplicate of #5012 — closed and linked automatically", "Closed", "blue", "1 hr ago"),
    a("—", "Mobile app crash on iOS 17 — needs device to reproduce, escalated", "Escalated", "amber", "2 hrs ago"),
    a("—", "Incorrect VAT calculation in invoices — P2, finance team notified", "Assigned", "green", "3 hrs ago"),
    a("—", "Slow dashboard load — performance ticket opened, profiling needed", "Assigned", "green", "4 hrs ago"),
    a("—", "Report export includes deleted records — data issue, P1 raised", "P1 assigned", "red", "Yesterday"),
  ],
  "Where your Helper needs help", "Triage situations needing an engineer",
  [
    g(1, "Bugs that could be either a feature request or a defect", 8),
    g(2, "Intermittent bugs that can't be reproduced consistently", 6),
    g(3, "Issues that require access to production data to diagnose", 4),
    g(4, "Security-related reports that may need responsible disclosure", 3),
  ]
);

const DEPLOY_MONITOR = d(
  "Deploy Monitor",
  "Watches deployments and alerts on regressions in real time",
  "🚀", "Verified v2.14.0 health checks 15 min ago",
  [
    { label: "Deploys Monitored", value: "23", sub: "this week", trend: "+5 from last week", up: true, iconId: "check", accent: "primary" },
    { label: "Regressions Caught", value: "3", sub: "this week", trend: "auto-rolled back 2 of 3", up: null, iconId: "alert", accent: "amber" },
    { label: "Avg Check Time", value: "1.8m", sub: "per deploy", trend: "−0.2m from last week", up: true, iconId: "clock", accent: "sky" },
    { label: "Uptime", value: "99.7%", sub: "last 30 days", trend: "within SLA target", up: null, iconId: "zap", accent: "emerald" },
  ],
  [3, 5, 4, 6, 4, 0, 1], "Deploys monitored per day",
  "Recent Deploy Events",
  [
    a("—", "v2.14.0 to production — all health checks passed, traffic shifted", "Healthy", "green", "15 min ago"),
    a("—", "v2.13.9 hotfix — latency spike detected, auto-rollback triggered", "Rolled back", "red", "2 hrs ago"),
    a("—", "v2.14.0 to staging — smoke tests passed, promoted to production", "Promoted", "green", "3 hrs ago"),
    a("—", "Feature flag deploy — 5% canary, error rate nominal", "Monitoring", "blue", "4 hrs ago"),
    a("—", "v2.13.8 — database migration ran successfully, no data loss", "Healthy", "green", "Yesterday"),
    a("—", "CDN cache invalidation — manual trigger needed, escalated to ops", "Escalated", "amber", "Yesterday"),
    a("—", "v2.13.7 — memory leak detected post-deploy, team notified", "Flagged", "amber", "2 days ago"),
    a("—", "Weekly deploy summary sent to engineering and product leads", "Completed", "green", "2 days ago"),
  ],
  "Where your Helper needs help", "Deploy scenarios needing manual review",
  [
    g(1, "Deploys that require database migrations with long lock times", 7),
    g(2, "Third-party API changes that break integrations after deploy", 5),
    g(3, "Canary deploys where user segmentation needs business input", 3),
    g(4, "Post-deploy incidents that span multiple services simultaneously", 3),
  ]
);

const SPRINT_REPORT = d(
  "Sprint Report",
  "Generates velocity and burndown charts for sprints",
  "📊", "Generated sprint 24 report 1 hr ago",
  [
    { label: "Reports Generated", value: "8", sub: "this month", trend: "2 per sprint on average", up: null, iconId: "file", accent: "primary" },
    { label: "Velocity This Sprint", value: "48 pts", sub: "vs. 43 avg", trend: "+12% above average", up: true, iconId: "trending", accent: "emerald" },
    { label: "Stories Completed", value: "34", sub: "of 38 planned", trend: "89% completion rate", up: true, iconId: "check", accent: "sky" },
    { label: "Carry-overs", value: "4", sub: "to next sprint", trend: "2 blocked by dependencies", up: null, iconId: "alert", accent: "amber" },
  ],
  [0, 0, 1, 2, 1, 0, 0], "Sprint reports generated this week",
  "Recent Reports",
  [
    a("—", "Sprint 24 velocity report — 48pts, highest this quarter", "Completed", "green", "1 hr ago"),
    a("—", "Sprint 24 burndown — smooth, no last-day crunch detected", "Completed", "green", "1 hr ago"),
    a("—", "Retro action items from sprint 23 — 4 of 5 addressed this sprint", "Insight", "blue", "1 hr ago"),
    a("—", "Carry-over analysis — 2 tickets blocked by external dependency", "Flagged", "amber", "2 hrs ago"),
    a("—", "Sprint 23 retrospective summary distributed to team", "Completed", "green", "2 weeks ago"),
    a("—", "Tech debt ratio increased to 18% — above 15% threshold", "Flagged", "amber", "2 weeks ago"),
    a("—", "Sprint 22 velocity dip explained by 3 planned absences", "Insight", "blue", "4 weeks ago"),
    a("—", "Quarterly engineering metrics digest sent to leadership", "Completed", "green", "4 weeks ago"),
  ],
  "Where your Helper needs help", "Reporting gaps to fill",
  [
    g(1, "Measuring actual vs. estimated effort for complex tickets", 6),
    g(2, "Accounting for unplanned work that wasn't in the sprint plan", 5),
    g(3, "Comparing velocity across teams with different story point scales", 4),
    g(4, "Attribution when tickets are shared across two sprint teams", 2),
  ]
);

// ─── LEADERSHIP ───────────────────────────────────────────────────────────────

const STATUS_AGGREGATOR = d(
  "Status Aggregator",
  "Compiles weekly status reports from all team leads",
  "📋", "Aggregated 8 team updates 12 min ago",
  [
    { label: "Updates Collected", value: "8", sub: "of 8 teams", trend: "100% response this week", up: true, iconId: "check", accent: "primary" },
    { label: "Issues Flagged", value: "3", sub: "this week", trend: "2 need your attention", up: null, iconId: "alert", accent: "amber" },
    { label: "Avg Compile Time", value: "2.4m", sub: "per digest", trend: "−0.6m from last week", up: true, iconId: "clock", accent: "sky" },
    { label: "Digest Open Rate", value: "94%", sub: "of leadership team", trend: "above target", up: true, iconId: "star", accent: "emerald" },
  ],
  [0, 1, 0, 0, 1, 0, 0], "Weekly digests compiled",
  "Recent Activity",
  [
    a("—", "Friday digest compiled from 8 teams — 3 risks flagged", "Completed", "green", "12 min ago"),
    a("—", "Engineering flagged: deploy freeze next week due to audit", "Flagged", "amber", "12 min ago"),
    a("—", "Sales flagged: 2 enterprise deals at risk of slipping to Q2", "Flagged", "amber", "12 min ago"),
    a("—", "HR: headcount 4 behind plan — escalated to you directly", "Escalated", "amber", "12 min ago"),
    a("—", "Marketing: campaign ROI above target — highlighted in digest", "Insight", "green", "12 min ago"),
    a("—", "Finance: monthly close on track, no issues", "Completed", "green", "12 min ago"),
    a("—", "Product: 3 of 5 milestones delivered ahead of schedule", "Insight", "green", "12 min ago"),
    a("—", "Design team update missing — followed up, received 30 min later", "Completed", "blue", "1 hr ago"),
  ],
  "Where your Helper needs help", "Situations needing your judgment",
  [
    g(1, "Status updates that are vague or don't map to OKR outcomes", 5),
    g(2, "Cross-team conflicts that appear in separate updates", 4),
    g(3, "Distinguishing genuine risks from habitual over-flagging", 3),
    g(4, "Teams that consistently under-report challenges until too late", 2),
  ]
);

const MEETING_PREP_BOT = d(
  "Meeting Prep Bot",
  "Generates agendas and talking points for 1-on-1s and key meetings",
  "📝", "Prepared 3 meeting briefs 1 hr ago",
  [
    { label: "Meetings Prepped", value: "22", sub: "this week", trend: "+6 from last week", up: true, iconId: "check", accent: "primary" },
    { label: "Talking Points Generated", value: "88", sub: "this week", trend: "avg 4 per meeting", up: null, iconId: "file", accent: "primary" },
    { label: "Avg Prep Time", value: "1.1m", sub: "per meeting", trend: "−0.3m from last week", up: true, iconId: "clock", accent: "sky" },
    { label: "Feedback Score", value: "4.7", sub: "out of 5", trend: "+0.2 from last month", up: true, iconId: "star", accent: "emerald" },
  ],
  [3, 5, 4, 6, 3, 0, 1], "Meeting briefs prepared per day",
  "Recent Prep Briefs",
  [
    a("—", "1-on-1 with Head of Engineering — OKR progress + deploy freeze topic", "Ready", "green", "1 hr ago"),
    a("—", "Board deck review — financial summary and open items compiled", "Ready", "green", "1 hr ago"),
    a("—", "All-hands planning — agenda drafted, speakers listed", "Ready", "green", "2 hrs ago"),
    a("—", "1-on-1 with Head of Sales — pipeline risk + enterprise account flag", "Ready", "green", "3 hrs ago"),
    a("—", "Investor update call — metrics pulled, talking points drafted", "Ready", "green", "Yesterday"),
    a("—", "Performance review for direct report — feedback themes summarised", "Ready", "green", "Yesterday"),
    a("—", "Strategy offsite — pre-read doc created from submitted inputs", "Ready", "green", "2 days ago"),
    a("—", "Exec sync — competitive intel briefing added based on new data", "Ready", "green", "2 days ago"),
  ],
  "Where your Helper needs help", "Prep situations it can't handle alone",
  [
    g(1, "Conversations involving sensitive HR or performance issues", 6),
    g(2, "Meetings where political context or relationship history matters", 5),
    g(3, "Preparing for conversations with board members or investors", 3),
    g(4, "1-on-1s where the agenda needs to stay confidential from the team", 2),
  ]
);

const OKR_TRACKING = d(
  "OKR Tracking",
  "Monitors quarterly OKR progress across all teams",
  "🎯", "Updated OKR progress 2 hrs ago",
  [
    { label: "Key Results Tracked", value: "25", sub: "this quarter", trend: "across 6 teams", up: null, iconId: "target", accent: "primary" },
    { label: "On Track", value: "18", sub: "of 25 KRs", trend: "72% on-track rate", up: true, iconId: "check", accent: "emerald" },
    { label: "At Risk", value: "5", sub: "of 25 KRs", trend: "need your attention", up: null, iconId: "alert", accent: "amber" },
    { label: "Blocked", value: "2", sub: "of 25 KRs", trend: "waiting on dependencies", up: null, iconId: "zap", accent: "rose" },
  ],
  [0, 3, 0, 4, 0, 0, 2], "OKR updates processed per day",
  "Recent OKR Updates",
  [
    a("—", "Engineering: test coverage KR at 76% — just below 80% target", "At risk", "amber", "2 hrs ago"),
    a("—", "Sales: Q1 revenue on track at 94% of target", "On track", "green", "2 hrs ago"),
    a("—", "HR: time-to-hire reduced to 28 days — ahead of 30-day target", "Completed", "green", "2 hrs ago"),
    a("—", "Marketing: MQL target 85% complete with 3 weeks to go", "On track", "green", "2 hrs ago"),
    a("—", "Finance: monthly close KR blocked — ERP integration pending", "Blocked", "red", "2 hrs ago"),
    a("—", "Product: feature delivery KR at 60% — behind schedule", "At risk", "amber", "2 hrs ago"),
    a("—", "Design: brand refresh KR completed 2 weeks ahead of plan", "Completed", "green", "Yesterday"),
    a("—", "Leadership: board deck KR — on track for Q1 board meeting", "On track", "green", "Yesterday"),
  ],
  "Where your Helper needs help", "OKR situations needing your input",
  [
    g(1, "Key results where the measurement method changed mid-quarter", 5),
    g(2, "Cascaded KRs where a team OKR depends on another team delivering", 4),
    g(3, "Deciding whether a partially-met KR counts as complete", 3),
    g(4, "KRs that were set too ambitiously and need recalibration", 2),
  ]
);

const BOARD_DECK_BUILDER = d(
  "Board Deck Builder",
  "Pulls metrics and creates presentation-ready slides for the board",
  "📊", "Generated draft board deck 30 min ago",
  [
    { label: "Decks Created", value: "4", sub: "this quarter", trend: "1 per board meeting", up: null, iconId: "file", accent: "primary" },
    { label: "Slides Auto-Generated", value: "28", sub: "this quarter", trend: "avg 7 per deck", up: null, iconId: "check", accent: "emerald" },
    { label: "Avg Build Time", value: "4.2m", sub: "per deck", trend: "−1.1m from last quarter", up: true, iconId: "clock", accent: "sky" },
    { label: "Board Feedback Score", value: "4.4", sub: "out of 5", trend: "+0.3 from last deck", up: true, iconId: "star", accent: "amber" },
  ],
  [0, 0, 1, 2, 1, 0, 0], "Deck sections built per day",
  "Recent Deck Sections",
  [
    a("—", "Q1 financial summary slide — revenue, burn, and runway pulled", "Generated", "green", "30 min ago"),
    a("—", "Hiring plan vs. actual — 4 roles behind, chart created", "Generated", "green", "30 min ago"),
    a("—", "OKR scorecard — 18/25 on track, visualised by team", "Generated", "green", "30 min ago"),
    a("—", "Competitive landscape slide — needs your narrative additions", "Draft ready", "blue", "1 hr ago"),
    a("—", "Product roadmap slide — version from product team attached", "Escalated", "amber", "1 hr ago"),
    a("—", "Key risks slide — 3 items flagged from status aggregator", "Generated", "green", "2 hrs ago"),
    a("—", "Customer metrics — NPS 68, ARR growth 22%, churn 1.4%", "Generated", "green", "2 hrs ago"),
    a("—", "Legal / compliance section — manual input required from GC", "Escalated", "amber", "2 hrs ago"),
  ],
  "Where your Helper needs help", "Sections it can't build automatically",
  [
    g(1, "Forward-looking narrative and strategic priorities for next quarter", 8),
    g(2, "Slides that require sign-off from CFO or GC before sharing", 5),
    g(3, "Sensitive personnel or M&A topics that shouldn't be auto-drafted", 4),
    g(4, "Board-specific context about individual members' priorities", 2),
  ]
);

// ─── FINANCE ──────────────────────────────────────────────────────────────────

const EXPENSE_PROCESSOR = d(
  "Expense Processor",
  "Auto-reviews and routes expense submissions for approval",
  "🧾", "Processed 12 expense receipts 5 min ago",
  [
    { label: "Expenses Processed", value: "148", sub: "this week", trend: "+31 from last week", up: true, iconId: "check", accent: "primary" },
    { label: "Auto-Approved", value: "119", sub: "this week", trend: "80% auto-approval rate", up: true, iconId: "zap", accent: "emerald" },
    { label: "Avg Processing Time", value: "8s", sub: "per expense", trend: "−3s from last month", up: true, iconId: "clock", accent: "sky" },
    { label: "Policy Violations", value: "7", sub: "this week", trend: "flagged for review", up: null, iconId: "alert", accent: "amber" },
  ],
  [21, 28, 24, 34, 27, 8, 6], "Expenses processed per day",
  "Recent Submissions",
  [
    a("R.P.", "Team lunch $180 — within limit, approved automatically", "Approved", "green", "5 min ago"),
    a("K.S.", "Software subscription $2,400 — above $500 threshold, escalated", "Escalated", "amber", "22 min ago"),
    a("T.M.", "Travel: flight to NYC $840 — pre-approved trip, auto-approved", "Approved", "green", "45 min ago"),
    a("A.L.", "Client dinner $620 — over $500 limit, needs manager approval", "Escalated", "amber", "1 hr ago"),
    a("D.F.", "Home office chair $380 — within remote work allowance", "Approved", "green", "2 hrs ago"),
    a("N.B.", "Receipt missing from $240 submission — flagged, reminder sent", "Flagged", "amber", "3 hrs ago"),
    a("P.O.", "Conference registration $950 — learning budget approved", "Approved", "green", "4 hrs ago"),
    a("M.C.", "Hotel: duplicate submission detected — blocked automatically", "Blocked", "red", "Yesterday"),
  ],
  "Where your Helper needs help", "Expense situations needing your judgment",
  [
    g(1, "Expenses in currencies with volatile exchange rates", 6),
    g(2, "Mixed personal/business expenses from a single receipt", 4),
    g(3, "Retroactive expense submissions from prior periods", 3),
    g(4, "Expenses related to potential compliance or legal concerns", 2),
  ]
);

const INVOICE_MATCHER = d(
  "Invoice Matcher",
  "Matches invoices to purchase orders and flags discrepancies",
  "🔗", "Matched 9 invoices, flagged 3 — 18 min ago",
  [
    { label: "Invoices Processed", value: "94", sub: "this week", trend: "+18 from last week", up: true, iconId: "check", accent: "primary" },
    { label: "Auto-Matched", value: "79", sub: "this week", trend: "84% match rate", up: true, iconId: "zap", accent: "emerald" },
    { label: "Discrepancies Found", value: "11", sub: "this week", trend: "9 resolved, 2 open", up: null, iconId: "alert", accent: "amber" },
    { label: "Avg Match Time", value: "6s", sub: "per invoice", trend: "consistent", up: null, iconId: "clock", accent: "sky" },
  ],
  [13, 18, 15, 22, 17, 5, 4], "Invoices processed per day",
  "Recent Matches",
  [
    a("—", "Acme Supplies invoice $4,200 — matched to PO-3821, approved", "Matched", "green", "18 min ago"),
    a("—", "TechCo SaaS renewal $12,400 — 8% over PO amount, flagged", "Flagged", "amber", "35 min ago"),
    a("—", "Office Supplies Co $780 — PO reference missing, chased vendor", "Escalated", "amber", "1 hr ago"),
    a("—", "Cloud services invoice $6,100 — matched, within 1% of PO", "Matched", "green", "2 hrs ago"),
    a("—", "Consulting firm $28,000 — matched to SOW, payment scheduled", "Matched", "green", "3 hrs ago"),
    a("—", "Vendor X $3,400 — duplicate invoice detected and blocked", "Blocked", "red", "4 hrs ago"),
    a("—", "Facilities maintenance $1,950 — split PO, matched both lines", "Matched", "green", "Yesterday"),
    a("—", "Agency retainer — amount dispute, escalated to procurement", "Escalated", "amber", "Yesterday"),
  ],
  "Where your Helper needs help", "Matching scenarios needing manual review",
  [
    g(1, "Invoices that partially match multiple POs simultaneously", 8),
    g(2, "Vendor invoices in a different currency than the PO", 5),
    g(3, "Amended invoices that replace previously approved versions", 4),
    g(4, "Invoices where the vendor name doesn't match the contract", 3),
  ]
);

const BUDGET_MONITOR = d(
  "Budget Monitor",
  "Tracks departmental spend vs. budget and sends threshold alerts",
  "📉", "Sent a budget alert for Engineering 1 hr ago",
  [
    { label: "Depts Monitored", value: "8", sub: "active", trend: "all departments covered", up: null, iconId: "target", accent: "primary" },
    { label: "Alerts Sent", value: "6", sub: "this week", trend: "3 at 80% threshold", up: null, iconId: "alert", accent: "amber" },
    { label: "Depts Over Budget", value: "2", sub: "this week", trend: "Engineering +8%, Sales +3%", up: null, iconId: "zap", accent: "rose" },
    { label: "Forecast Accuracy", value: "93%", sub: "this quarter", trend: "+2% from last quarter", up: true, iconId: "trending", accent: "emerald" },
  ],
  [1, 2, 1, 3, 2, 0, 1], "Budget alerts sent per day",
  "Recent Alerts",
  [
    a("—", "Engineering reached 92% of Q1 budget — alert sent to VP Eng", "Alerted", "amber", "1 hr ago"),
    a("—", "Sales T&E: 3% over budget — flagged to Sales Ops for review", "Flagged", "amber", "2 hrs ago"),
    a("—", "Marketing spend 6% under budget — reallocation opportunity", "Insight", "green", "3 hrs ago"),
    a("—", "HR training budget at 80% — routine mid-quarter alert sent", "Alerted", "amber", "Yesterday"),
    a("—", "Finance department on track at 67% utilisation", "On track", "green", "Yesterday"),
    a("—", "Product team: unplanned cloud cost spike — $14K above forecast", "Escalated", "amber", "2 days ago"),
    a("—", "Ops: facilities renewal will push dept 4% over — needs approval", "Escalated", "amber", "2 days ago"),
    a("—", "Monthly budget summary distributed to all department heads", "Completed", "green", "3 days ago"),
  ],
  "Where your Helper needs help", "Budget situations needing your judgment",
  [
    g(1, "Unplanned spend that has a clear business justification", 7),
    g(2, "Reforecasting when business priorities shift mid-quarter", 5),
    g(3, "Inter-departmental cost allocations that cross budget lines", 4),
    g(4, "Capital vs. operating expense classification edge cases", 3),
  ]
);

const MONTHLY_PL = d(
  "Monthly P&L",
  "Generates monthly profit and loss summaries automatically",
  "💰", "Generated March P&L draft 45 min ago",
  [
    { label: "Reports Generated", value: "3", sub: "this quarter", trend: "one per month", up: null, iconId: "file", accent: "primary" },
    { label: "Revenue Recognised", value: "$4.8M", sub: "this month", trend: "+12% from last month", up: true, iconId: "trending", accent: "emerald" },
    { label: "Margin", value: "34%", sub: "gross margin", trend: "+2pts from last month", up: true, iconId: "check", accent: "sky" },
    { label: "Items Flagged", value: "4", sub: "this month", trend: "need your review", up: null, iconId: "alert", accent: "amber" },
  ],
  [0, 0, 1, 2, 1, 0, 0], "P&L sections generated per day",
  "Recent P&L Activity",
  [
    a("—", "Revenue section complete — $4.8M recognised, deferred $380K", "Completed", "green", "45 min ago"),
    a("—", "COGS line: contractor costs 8% above prior month — flagged", "Flagged", "amber", "45 min ago"),
    a("—", "OPEX: marketing overspend adjusted and noted in commentary", "Completed", "green", "1 hr ago"),
    a("—", "One-time item: $42K legal fee — needs categorisation decision", "Escalated", "amber", "1 hr ago"),
    a("—", "EBITDA calculated automatically — $1.63M this month", "Completed", "green", "2 hrs ago"),
    a("—", "P&L distributed to CFO and board via secure link", "Completed", "green", "2 hrs ago"),
    a("—", "February P&L comparison included — margin improvement noted", "Completed", "green", "2 hrs ago"),
    a("—", "Intercompany eliminations flagged — manual review required", "Escalated", "amber", "2 hrs ago"),
  ],
  "Where your Helper needs help", "P&L situations needing your expertise",
  [
    g(1, "Non-recurring items that need judgement on classification", 6),
    g(2, "Revenue recognition for multi-year contracts with variable terms", 4),
    g(3, "FX gains/losses from international operations", 3),
    g(4, "Adjustments following an audit finding or restatement", 2),
  ]
);

// ─── Master lookup ─────────────────────────────────────────────────────────────

const ALL_HELPERS: HelperDetailData[] = [
  // HR
  BENEFITS_FAQ_AGENT,
  RESUME_SCREENER,
  ONBOARDING_BOT,
  INTERVIEW_SCHEDULER,
  PTO_TRACKER,
  OFFER_LETTER_GENERATOR,
  ENGAGEMENT_SURVEY_AGENT,
  CANDIDATE_EXPERIENCE_HELPER,
  // Marketing
  CONTENT_GENERATOR,
  CAMPAIGN_ANALYST,
  SOCIAL_PUBLISHER,
  ANALYZE_CAMPAIGNS,
  // Sales
  LEAD_SCORER,
  FOLLOW_UP_DRAFTER,
  CRM_UPDATER,
  PIPELINE_SUMMARY,
  // Engineering
  PR_REVIEWER,
  BUG_TRIAGER,
  DEPLOY_MONITOR,
  SPRINT_REPORT,
  // Leadership
  STATUS_AGGREGATOR,
  MEETING_PREP_BOT,
  OKR_TRACKING,
  BOARD_DECK_BUILDER,
  // Finance
  EXPENSE_PROCESSOR,
  INVOICE_MATCHER,
  BUDGET_MONITOR,
  MONTHLY_PL,
];

export { ALL_HELPERS };

export function toSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

// Build lookup map — also adds common alias slugs
const DETAIL_MAP = new Map<string, HelperDetailData>();

for (const h of ALL_HELPERS) {
  DETAIL_MAP.set(toSlug(h.name), h);
}

// Aliases: skill-label names → same data as their dashboard counterpart
const ALIASES: [string, HelperDetailData][] = [
  ["resume-screener-helper", RESUME_SCREENER],
  ["candidate-experience-helper", CANDIDATE_EXPERIENCE_HELPER],
  ["schedule-interviews", INTERVIEW_SCHEDULER],
  ["generate-offer-letters", OFFER_LETTER_GENERATOR],
  ["pto-management-workflow", PTO_TRACKER],
  ["engagement-survey-agent", ENGAGEMENT_SURVEY_AGENT],
  ["job-description-agent", ENGAGEMENT_SURVEY_AGENT],
  ["performance-review-agent", ENGAGEMENT_SURVEY_AGENT],
  ["benefits-faq-agent", BENEFITS_FAQ_AGENT],
  ["benefits-faq", BENEFITS_FAQ_AGENT],
  ["offboarding-workflow", ONBOARDING_BOT],
  ["compliance-reminder-workflow", ONBOARDING_BOT],
  ["referral-tracking-workflow", ONBOARDING_BOT],
  // Marketing
  ["analyze-campaigns", ANALYZE_CAMPAIGNS],
  ["draft-social-posts", SOCIAL_PUBLISHER],
  ["competitor-research", CAMPAIGN_ANALYST],
  ["plan-content-calendar", CONTENT_GENERATOR],
  ["email-campaign-builder", CONTENT_GENERATOR],
  ["seo-keyword-analysis", CAMPAIGN_ANALYST],
  ["brand-voice-review", CONTENT_GENERATOR],
  ["event-promotion", SOCIAL_PUBLISHER],
  ["ab-test-analysis", CAMPAIGN_ANALYST],
  ["influencer-outreach", CAMPAIGN_ANALYST],
  ["press-release-drafting", CONTENT_GENERATOR],
  ["utm-link-generator", CAMPAIGN_ANALYST],
  // Sales
  ["draft-follow-ups", FOLLOW_UP_DRAFTER],
  ["generate-proposals", FOLLOW_UP_DRAFTER],
  ["log-meeting-notes", CRM_UPDATER],
  ["lead-scoring", LEAD_SCORER],
  ["competitive-battle-cards", PIPELINE_SUMMARY],
  ["quota-tracking", PIPELINE_SUMMARY],
  ["demo-scheduling", INTERVIEW_SCHEDULER],
  ["contract-review", INVOICE_MATCHER],
  ["winloss-analysis", PIPELINE_SUMMARY],
  ["territory-planning", PIPELINE_SUMMARY],
  ["commission-estimates", MONTHLY_PL],
  // Engineering
  ["pr-review-summary", PR_REVIEWER],
  ["bug-triage", BUG_TRIAGER],
  ["draft-tech-spec", SPRINT_REPORT],
  ["release-notes", SPRINT_REPORT],
  ["incident-post-mortem", DEPLOY_MONITOR],
  ["dependency-audit", DEPLOY_MONITOR],
  ["api-documentation", SPRINT_REPORT],
  ["test-coverage-report", SPRINT_REPORT],
  ["performance-profiling", DEPLOY_MONITOR],
  ["migration-planning", SPRINT_REPORT],
  ["on-call-scheduling", STATUS_AGGREGATOR],
  // Leadership
  ["team-performance", STATUS_AGGREGATOR],
  ["prepare-board-deck", BOARD_DECK_BUILDER],
  ["weekly-status-report", STATUS_AGGREGATOR],
  ["schedule-1-on-1s", MEETING_PREP_BOT],
  ["hiring-plan-review", OKR_TRACKING],
  ["strategy-summarizer", BOARD_DECK_BUILDER],
  ["investor-update", BOARD_DECK_BUILDER],
  ["all-hands-planning", MEETING_PREP_BOT],
  ["budget-review", BUDGET_MONITOR],
  ["competitor-intelligence", CAMPAIGN_ANALYST],
  ["team-health-check", STATUS_AGGREGATOR],
  // Finance
  ["expense-approvals", EXPENSE_PROCESSOR],
  ["monthly-pl", MONTHLY_PL],
  ["reconcile-invoices", INVOICE_MATCHER],
  ["budget-tracking", BUDGET_MONITOR],
  ["cash-flow-forecast", MONTHLY_PL],
  ["revenue-recognition", MONTHLY_PL],
  ["vendor-payment-scheduling", INVOICE_MATCHER],
  ["tax-filing-prep", MONTHLY_PL],
  ["audit-documentation", INVOICE_MATCHER],
  ["subscription-tracking", BUDGET_MONITOR],
  ["procurement-requests", INVOICE_MATCHER],
];

for (const [alias, data] of ALIASES) {
  if (!DETAIL_MAP.has(alias)) DETAIL_MAP.set(alias, data);
}

export function getHelperDetail(slug: string): HelperDetailData | null {
  return DETAIL_MAP.get(slug) ?? null;
}
