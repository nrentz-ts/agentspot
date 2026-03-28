import { RichContent } from "./types";

export const WELCOME_MESSAGE: RichContent[] = [
  {
    type: "text",
    text: "Hi there! I'm AgentSpot, your personal work assistant. I can help you automate repetitive tasks, manage workflows, and get things done faster. What would you like help with today?",
  },
];

export const SUGGESTION_CHIPS = [
  "What can you do?",
  "Help me automate expense reports",
  "Summarize my emails",
  "Schedule a weekly team standup",
  "Create a workflow for invoice approvals",
];

interface ConversationFlow {
  keywords: string[];
  responses: RichContent[][];
}

export const CONVERSATION_FLOWS: ConversationFlow[] = [
  {
    keywords: ["what can you do", "help", "capabilities", "what do you do"],
    responses: [
      [
        {
          type: "text",
          text: "I'm here to make your work life easier! Here's what I can help with:",
        },
        {
          type: "step-list",
          title: "My Capabilities",
          steps: [
            "Automate repetitive tasks \u2014 like expense reports, approvals, and data entry",
            "Summarize information \u2014 emails, documents, meeting notes",
            "Create workflows \u2014 build step-by-step automations without any coding",
            "Schedule and remind \u2014 set up recurring tasks and never miss a deadline",
            "Answer questions \u2014 about your work, your team's processes, or company policies",
          ],
        },
        {
          type: "text",
          text: "Just tell me what's taking up too much of your time, and I'll figure out how to help!",
        },
      ],
    ],
  },
  {
    keywords: ["expense", "expense report", "expenses", "reimbursement"],
    responses: [
      [
        {
          type: "text",
          text: "I'd love to help you automate expense reports! Let me set up a workflow for you. Here's what it will do:",
        },
        {
          type: "action-card",
          title: "Expense Report Automation",
          description:
            "Automatically captures receipts from your email, categorizes expenses, fills out the report form, and submits it for approval \u2014 all you need to do is confirm.",
        },
        {
          type: "step-list",
          title: "How it works",
          steps: [
            "I scan your email for receipts and invoices",
            "I extract the amount, date, vendor, and category",
            "I fill in your expense report template automatically",
            "You review and confirm with one click",
            "I submit it to your manager for approval",
          ],
        },
        {
          type: "confirmation",
          title: "Set up this workflow?",
          description:
            "I'll create this automation and have it ready for you in about a minute.",
          confirmLabel: "Yes, set it up!",
          cancelLabel: "Not right now",
        },
      ],
    ],
  },
  {
    keywords: ["email", "emails", "summarize", "inbox", "mail"],
    responses: [
      [
        {
          type: "text",
          text: "Here's a summary of your recent emails:",
        },
        {
          type: "email-summary",
          title: "Inbox Summary",
          items: [
            {
              from: "Sarah Chen",
              subject: "Q4 Budget Review \u2014 Action Needed",
              snippet:
                "Hi, please review the attached Q4 budget proposal by Friday. Key changes include a 15% increase in the marketing allocation...",
            },
            {
              from: "David Park",
              subject: "Team Offsite \u2014 Date Poll",
              snippet:
                "Hey team! I've set up a poll for our offsite dates. Please vote by end of day Wednesday. Options are March 15-17 or March 22-24...",
            },
            {
              from: "IT Support",
              subject: "Password Reset Reminder",
              snippet:
                "Your corporate password will expire in 5 days. Please update it at security.company.com to avoid any access interruptions...",
            },
            {
              from: "Jessica Liu",
              subject: "Re: Client Proposal Draft",
              snippet:
                "Looks great overall! I left a few comments in the margins. Main suggestion: let's highlight the ROI section more prominently...",
            },
          ],
        },
        {
          type: "text",
          text: "The most urgent one looks like Sarah's budget review \u2014 it needs your attention by Friday. Want me to draft a response or set a reminder?",
        },
      ],
    ],
  },
  {
    keywords: ["schedule", "standup", "meeting", "calendar", "recurring"],
    responses: [
      [
        {
          type: "text",
          text: "I can help set that up! Let me create a recurring event for you.",
        },
        {
          type: "action-card",
          title: "Weekly Team Standup",
          description:
            "Every Monday at 9:30 AM \u00b7 15 minutes \u00b7 Your team channel\nAutomatically sends a reminder 10 minutes before and collects async updates from anyone who can't attend.",
        },
        {
          type: "confirmation",
          title: "Create this recurring meeting?",
          description:
            "I'll add it to everyone's calendar and set up the reminders.",
          confirmLabel: "Create it",
          cancelLabel: "Let me adjust",
        },
      ],
    ],
  },
  {
    keywords: ["invoice", "approval", "approve", "workflow", "process"],
    responses: [
      [
        {
          type: "text",
          text: "Great idea \u2014 let me build an invoice approval workflow for you!",
        },
        {
          type: "action-card",
          title: "Invoice Approval Workflow",
          description:
            "A streamlined approval pipeline: invoices come in \u2192 auto-categorized \u2192 routed to the right approver \u2192 approved/rejected with one click \u2192 logged automatically.",
        },
        {
          type: "step-list",
          title: "Workflow steps",
          steps: [
            "Invoice received via email or upload",
            "AI extracts vendor, amount, due date, and PO number",
            "Routed to appropriate approver based on amount thresholds",
            "Approver gets a notification with one-click approve/reject",
            "Approved invoices are logged and sent to accounting",
            "You get a weekly summary of all processed invoices",
          ],
        },
        {
          type: "confirmation",
          title: "Build this workflow?",
          description:
            "I'll set this up with default thresholds. You can customize the rules anytime.",
          confirmLabel: "Build it",
          cancelLabel: "Tell me more first",
        },
      ],
    ],
  },
];

export const FALLBACK_RESPONSES: RichContent[][] = [
  [
    {
      type: "text",
      text: "That's an interesting request! I'm still learning, but I'd love to help. Could you tell me a bit more about what you're trying to accomplish? For example, is this something you do daily, weekly, or just occasionally?",
    },
  ],
  [
    {
      type: "text",
      text: "I want to make sure I help you the right way. Can you walk me through how you currently do this task? That way I can figure out the best way to automate it for you.",
    },
  ],
  [
    {
      type: "text",
      text: "I'm on it! While I'm still expanding my skills, I can definitely help you think through this. What part of this task takes up the most time for you?",
    },
  ],
];

export const CONFIRMATION_RESPONSES: RichContent[][] = [
  [
    {
      type: "text",
      text: "Awesome! I'm setting that up for you now...",
    },
    {
      type: "action-card",
      title: "Workflow Created Successfully",
      description:
        "Your new automation is live and ready to go. I'll monitor it and let you know how it's performing after the first few runs.",
    },
    {
      type: "text",
      text: "You can find this in your Workflows tab anytime. Is there anything else you'd like to automate?",
    },
  ],
];
