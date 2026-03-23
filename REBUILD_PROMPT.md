# Solace.ai — Fresh Build Prompt

> Paste this into a new Claude Code session to scaffold the entire product from scratch.

---

## Overview

Build a **Next.js 16 App Router** prototype called **AgentSpot** — an AI work-assistant platform. All data is mocked (no backend, no auth). The product has a **dark navy sidebar** on the left and a **light content area** on the right. The overall aesthetic is clean, minimal, and enterprise-SaaS — inspired by ThoughtSpot's visual language.

**Tech stack:**
- Next.js 16 (App Router), React 19, TypeScript 5
- Tailwind CSS 4 with OKLCH color tokens in `globals.css`
- shadcn/ui (New York style, neutral base) via Radix UI
- Lucide React for icons
- React Context for state (no external state library)
- `cn()` utility using `clsx` + `tailwind-merge`

**Pages to build (5 total):**
1. **Home / Dashboard** (`/home`)
2. **Agents list** (`/agents`)
3. **Agent create / edit** (`/agents/new` and `/agents/[id]/edit`)
4. **Workflows list** (`/workflows`)
5. **Settings** (`/settings`)

---

## Directory Structure

```
app/
  (product)/
    layout.tsx          # Sidebar + main content shell
    home/page.tsx       # Dashboard
    agents/
      page.tsx          # Agents list (My / Shared / Community)
      new/page.tsx      # Create new agent (50/50 split: chat + form)
      [id]/
        page.tsx        # Agent detail
        edit/page.tsx   # Edit agent (same layout as create)
    workflows/
      page.tsx          # Workflows list (My / Shared / Community)
    settings/
      page.tsx          # Settings page

components/
  ui/                   # shadcn/ui primitives
  sidebar.tsx           # Collapsible dark navy sidebar
  dashboard/            # Home page widgets

lib/
  utils.ts              # cn() helper
  types.ts              # Shared TypeScript interfaces
  agents-data.ts        # Mock agent data (per persona)
  workflows-data.ts     # Mock workflow data
  persona-data.ts       # Dashboard data (agents, runs, stats, chips)
  persona-context.tsx   # Active persona context
  sidebar-context.tsx   # Sidebar open/close context
```

---

## Color System (OKLCH tokens in `globals.css`)

Use `@import "tailwindcss"`, `@import "tw-animate-css"`, `@import "shadcn/tailwind.css"` at the top.

```css
:root {
  --radius: 0.75rem;

  /* Page */
  --background: oklch(0.975 0.007 265);
  --foreground: oklch(0.19 0.03 265);

  /* Cards */
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.19 0.03 265);

  /* Primary — bright indigo */
  --primary: oklch(0.50 0.22 265);
  --primary-foreground: oklch(1 0 0);

  /* Secondary */
  --secondary: oklch(0.94 0.02 265);
  --secondary-foreground: oklch(0.35 0.1 265);

  /* Muted */
  --muted: oklch(0.945 0.009 265);
  --muted-foreground: oklch(0.55 0.04 265);

  /* Accent */
  --accent: oklch(0.94 0.025 265);
  --accent-foreground: oklch(0.35 0.1 265);

  /* Destructive */
  --destructive: oklch(0.577 0.245 27.325);

  /* Border & Input */
  --border: oklch(0.91 0.018 265);
  --input: oklch(0.91 0.018 265);
  --ring: oklch(0.50 0.22 265);

  /* Sidebar — dark navy */
  --sidebar: oklch(0.18 0.04 264);
  --sidebar-foreground: oklch(0.88 0.015 265);
  --sidebar-primary: oklch(0.50 0.22 265);
  --sidebar-primary-foreground: oklch(1 0 0);
  --sidebar-accent: oklch(0.25 0.04 264);
  --sidebar-accent-foreground: oklch(0.92 0.01 265);
  --sidebar-border: oklch(0.28 0.04 264);
  --sidebar-ring: oklch(0.50 0.22 265);

  /* Charts */
  --chart-1: oklch(0.50 0.22 265);
  --chart-2: oklch(0.65 0.15 170);
  --chart-3: oklch(0.55 0.12 230);
  --chart-4: oklch(0.75 0.15 85);
  --chart-5: oklch(0.65 0.2 30);
}
```

Dark mode tokens (`.dark` class):
```css
.dark {
  --background: oklch(0.14 0.025 264);
  --foreground: oklch(0.93 0.01 265);
  --card: oklch(0.19 0.03 264);
  --card-foreground: oklch(0.93 0.01 265);
  --primary: oklch(0.62 0.20 265);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.23 0.03 264);
  --secondary-foreground: oklch(0.85 0.02 265);
  --muted: oklch(0.23 0.03 264);
  --muted-foreground: oklch(0.60 0.04 265);
  --accent: oklch(0.25 0.035 264);
  --accent-foreground: oklch(0.85 0.02 265);
  --destructive: oklch(0.60 0.22 25);
  --border: oklch(0.27 0.03 264);
  --input: oklch(0.27 0.03 264);
  --ring: oklch(0.62 0.20 265);
  --sidebar: oklch(0.11 0.03 264);
  --sidebar-foreground: oklch(0.88 0.015 265);
  --sidebar-accent: oklch(0.20 0.035 264);
  --sidebar-border: oklch(0.22 0.035 264);
}
```

---

## Font

Use **Geist Sans** (`next/font/google`) as the default via `--font-geist-sans`. Apply `font-sans antialiased` on `<body>`.

---

## Sidebar (`components/sidebar.tsx`)

A collapsible dark navy sidebar — **260px expanded**, **60px collapsed**.

**Structure (top to bottom):**
1. **Header** (`h-14`): Sparkles icon in `bg-primary` rounded box + "AgentSpot" text (`text-[15px] font-semibold tracking-tight`) + collapse toggle button
2. **Nav items** (`space-y-1 pt-4 px-3`): Home, Agents, Workflows, Settings
   - Each item: icon (`h-[18px] w-[18px]`) + label (`text-[14px] font-medium`) in a `rounded-lg px-3 py-2.5 gap-3` button
   - Active state: `bg-sidebar-accent text-sidebar-accent-foreground shadow-sm`
   - Inactive: `text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground`
3. **Recent Chats** section (`mt-6`): Section header with MessageSquare icon + "RECENT CHATS" label (`text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/30`), then 7 chat items (`text-[13px] text-sidebar-foreground/60 truncate`, `rounded-lg px-2.5 py-1.5`)
4. **Spacer** (`flex-1`)
5. **Profile button** (bottom, `border-t border-sidebar-border py-3`): Avatar (`h-7 w-7`) + name + chevron. Clicking opens a profile menu popover (`rounded-xl border bg-white shadow-lg w-60`) with: Font picker, Help & Support, Log out

**Collapsed mode:** Icons only, centered (`h-10 w-10`). No labels, no recent chats text. Tooltip on hover.

**Transitions:** `transition-all duration-200 ease-in-out` on the sidebar width.

**Recent chats data (7 items, no timestamps):**
```
"Summarize today's activity"
"Top candidates for Marketing Lead"
"Draft follow-up for Alex Chen"
"Analyze Q3 pipeline health"
"Pipeline coverage for Q1 close"
"Generate proposal for Acme Corp"
"Renewal risk — Figma account"
```

---

## Page 1: Home / Dashboard (`/home`)

**Layout:**
- Background: `bg-background` with subtle multi-layer radial gradients (blue-tinted)
- Content: `flex flex-col items-center px-6 pb-16 pt-[calc(12vh-20px)]`
- Max width: `max-w-6xl`

**Sections (top to bottom, `space-y-[70px]`):**

### 1A. Welcome + Prompt (`space-y-[60px]`)
- **Greeting:** Time-of-day emoji + "Good morning, Sarah" (`text-[14px] font-medium text-foreground/60`)
- **Headline:** "What would you like to get done?" (`text-4xl font-bold tracking-tight`)
- **Prompt bar:** `rounded-2xl border border-white/80 bg-white/70 px-5 py-3.5 shadow-sm backdrop-blur-sm` with Sparkles icon, textarea, send button (`h-7 w-7 rounded-lg bg-primary`)
- **Suggestion chips** below: `rounded-full border border-border bg-white/70 px-4 py-1.5 text-[13px]`

### 1B. Your Active Agents (`space-y-3`)
- **Header:** "Your Active Agents" (`text-[15px] font-semibold`) + "View all" link to `/agents` (`text-[14px] font-medium text-primary` with ArrowUpRight icon)
- **Grid:** `grid gap-4 sm:grid-cols-2 lg:grid-cols-4`
- **Agent card (HelperGridCard)** — THE canonical card style:
  ```
  <button className="group flex flex-col items-start rounded-2xl border border-border bg-card p-5 text-left transition-all duration-150 hover:border-primary/20 hover:shadow-lg active:scale-[0.98]">
    <div className="flex h-12 w-12 items-center justify-center rounded-xl text-xl transition-transform group-hover:scale-110 {color}">
      {emoji}
    </div>
    <h3 className="mt-4 text-[14px] font-semibold text-foreground">{name}</h3>
    <p className="mt-1 text-[14px] leading-snug text-muted-foreground line-clamp-2">{description}</p>
    <div className="mt-3 flex items-center gap-2">
      <span className="flex items-center gap-1 text-[14px] text-muted-foreground/60">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        {timeText}
      </span>
    </div>
  </button>
  ```

### 1C. Your Workflows (`space-y-3`)
- **Header:** "Your Workflows" + "View all" link to `/workflows`
- **Empty state (default):** Dashed border card (`border-2 border-dashed border-border bg-card/50 rounded-2xl px-6 py-10`), icon, "No workflows running yet", CTA badge "Create your first workflow"
- **Populated state (toggled on click):** `grid gap-3 sm:grid-cols-2 lg:grid-cols-4` of workflow cards showing: emoji+name, status badge (Completed/Running/Failed), time

### 1D. Activity Monitor (`space-y-3`)
- **Header:** "Activity Monitor" (`text-[15px] font-semibold`)
- **Two-column layout:** `grid gap-4 lg:grid-cols-[3fr_2fr]`
- **Left — Recent Workflow Runs:** Card with header, KPI stats row (3 stat boxes: Active Processes, Runs This Week, Hours Saved), then activity rows (status dot + message + badge + time)
- **Right — Knowledge Gaps:** Card with gap items (description + "Add to Knowledge Base" button)

**Status badge styles:**
- Success: `bg-emerald-50 text-emerald-700 border border-emerald-200`
- Running: `bg-sky-50 text-sky-700 border border-sky-200`
- Error: `bg-red-50 text-red-600 border border-red-200`

---

## Page 2: Agents List (`/agents`)

**Layout:** `mx-auto max-w-6xl px-6 py-10`

**Header (sticky):** Icon badge (`h-10 w-10 rounded-xl bg-primary/10 text-primary`) + title "Agents" + subtitle + "New Agent" primary button (links to `/agents/new`)

**Three sections (`mt-10 space-y-14`):**

### 2A. My Agents
- Grid: `grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- Uses the same card style as home page HelperGridCard but without the time dot — just emoji, name, description
- Card: `rounded-2xl border border-border bg-white p-5`, emoji in `h-12 w-12 rounded-xl` colored circle, name `text-[14px] font-semibold`, description `text-[12px] text-muted-foreground`

### 2B. Shared with Me (6 cards max)
- Same grid + card style
- Section header with title + count

### 2C. Community Created
- Same grid + card style
- 15 cards from community data

**Sales persona mock data for agents:**
```typescript
mine: [
  { id: "a1", name: "Lead Scorer", description: "Ranks inbound leads by fit and buying intent signals", color: "bg-violet-100", emoji: "🎯" },
  { id: "a2", name: "Follow-up Drafter", description: "Writes personalized emails after calls and demos", color: "bg-blue-100", emoji: "✉️" },
  { id: "a3", name: "CRM Updater", description: "Logs call notes and updates deal stages automatically", color: "bg-emerald-100", emoji: "💾" },
  { id: "a4", name: "Proposal Generator", description: "Creates tailored sales proposals from approved templates", color: "bg-amber-100", emoji: "📋" },
],
shared: [
  { id: "s1", name: "Meeting Prep Bot", description: "Prepares briefing notes and talking points before prospect meetings", color: "bg-pink-100", emoji: "📝" },
  { id: "s2", name: "Quota Tracker", description: "Monitors progress toward individual and team quotas in real time", color: "bg-orange-100", emoji: "📈" },
  { id: "s3", name: "Objection Handler", description: "Suggests responses to common sales objections using past win data", color: "bg-teal-100", emoji: "💪" },
  { id: "s4", name: "Contract Summarizer", description: "Extracts key terms, dates, and obligations from sales contracts", color: "bg-rose-100", emoji: "📑" },
  { id: "s5", name: "Renewal Reminder", description: "Flags expiring contracts and drafts renewal outreach emails", color: "bg-sky-100", emoji: "🔔" },
  { id: "s6", name: "Competitive Intel Bot", description: "Summarizes competitor moves and suggests positioning responses", color: "bg-violet-100", emoji: "🔎" },
],
```

---

## Page 3: Agent Create / Edit (`/agents/new`, `/agents/[id]/edit`)

**Layout:** Full-screen 50/50 horizontal split with a draggable divider.

**Top bar:** Back button + centered title ("New Agent" with Sparkles icon) + Save button (primary)

**Left panel — Chat interface:**
- Background: `bg-gradient-to-b from-blue-50/70 via-indigo-50/30 to-white/60`
- AI avatar: Sparkles icon in `bg-primary/10 rounded-md h-6 w-6`
- User avatar: initials in `bg-foreground/8 rounded-md h-6 w-6`
- AI bubbles: `rounded-2xl rounded-tl-sm px-3.5 py-2.5 bg-white shadow-sm text-[15px]`
- User bubbles: `rounded-2xl rounded-tr-sm px-3.5 py-2.5 bg-muted/70 text-[15px]`
- Initial AI message: "Let's build your new agent. Pick a template or describe what you need."
- Below: 3 template cards in a grid. When clicked: show animated reasoning checklist (6 steps ticking sequentially), then auto-fill form fields on the right with highlight animation
- Chat input at bottom: `rounded-xl border border-white/80 bg-white/80 px-4 py-3 shadow-sm`

**Right panel — Form:**
- Fields: Name, Description, Instructions (textarea, `rows={9} font-mono`), Connectors (3-col grid of toggle buttons), Tools (vertical list of toggle buttons)
- Field wrapper: label (`text-[15px] font-semibold`) + content area (`rounded-2xl border border-border bg-white/60 px-5 py-4`)
- Highlight animation when filled: `ring-2 ring-primary/30 bg-primary/5` for 2.5s

**Template data (3 templates):**
```
{ name: "Lead Scorer", emoji: "🎯", color: "bg-violet-100", description: "Ranks inbound leads by fit and buying intent" }
{ name: "Follow-up Drafter", emoji: "✉️", color: "bg-blue-100", description: "Writes personalized emails after calls and demos" }
{ name: "CRM Updater", emoji: "💾", color: "bg-emerald-100", description: "Logs call notes and updates deal stages" }
```

**Connectors (toggle buttons, uniform light-blue selection: `bg-sky-50 border-sky-200`):**
```
Salesforce, HubSpot, Outreach, Gmail, Slack, Google Calendar, Notion, LinkedIn, Zoom
```

**Tools:**
```
Web Search, Data Analysis, Integrations, Document Reader, Code Interpreter
```

---

## Page 4: Workflows List (`/workflows`)

**Layout:** Same as Agents list — `mx-auto max-w-6xl px-6 py-10`

**Header:** Same pattern — icon badge + "Workflows" title + "New Workflow" button

**Three sections (`mt-10 space-y-14`):**

### 4A. My Workflows
```
{ name: "Lead Qualification Flow", description: "Scores, enriches, and routes inbound leads to the right rep", color: "bg-violet-100", emoji: "🎯" },
{ name: "Post-Demo Follow-up", description: "Pulls call notes and sends a personalised follow-up email after demos", color: "bg-blue-100", emoji: "✉️" },
{ name: "Proposal Generator", description: "Drafts and sends tailored proposals when deals hit the proposal stage", color: "bg-amber-100", emoji: "📋" },
{ name: "Deal Stage Updater", description: "Moves CRM deals to the next stage when trigger conditions are met", color: "bg-emerald-100", emoji: "💾" },
```

### 4B. Shared with Me
```
{ name: "Pipeline Review Prep", description: "Generates pipeline summaries and flags at-risk deals before review meetings", color: "bg-pink-100", emoji: "📊" },
{ name: "Contract Approval Flow", description: "Routes contracts through legal, finance, and management sign-off", color: "bg-teal-100", emoji: "📑" },
{ name: "Win Announcement", description: "Posts closed-won celebrations to Slack with deal highlights and kudos", color: "bg-sky-100", emoji: "🏆" },
```

### 4C. Community Created (15 items)
```
Cold Outreach Sequencer 📤, Renewal Risk Alerter 🔔, Territory Balancer 🗺️,
Competitive Deal Tracker 👀, Demo Follow-up Chain ✉️, Pricing Approval Flow 💲,
Lead Enrichment Pipeline 🔍, Quarterly Business Review Prep 📊, Upsell Opportunity Finder 💡,
Contract Expiry Monitor 📑, Meeting No-Show Recovery 📞, Commission Dispute Handler 💰,
Sales Forecast Updater 🔮, Partner Lead Router 🤝, Weekly Win Report 🏆
```

**Card style:** Same as agent cards — `rounded-2xl border border-border bg-white p-5`, emoji in colored circle, name, description. Clicking navigates to `/workflows/{slug}`.

---

## Page 5: Settings (`/settings`)

Simple settings page with sections:
- **Profile** — Name, email, role (read-only display)
- **Font** — Font picker (Default/Geist Sans, Inter, Roboto, Open Sans) — sets `--app-font` CSS variable
- **Notifications** — Toggle switches for email, Slack, in-app notifications
- **Danger Zone** — "Delete account" button (destructive style, non-functional)

Use `rounded-2xl border border-border bg-card p-6` cards for each section. Section headers: `text-[15px] font-semibold`. Keep it clean and minimal.

---

## Shared Design Patterns

### Card pattern
```
rounded-2xl border border-border bg-card p-5
hover:border-primary/20 hover:shadow-lg
transition-all duration-150
```

### Section header pattern
```
<div className="flex items-center justify-between">
  <div>
    <h2 className="text-[15px] font-semibold text-foreground">{title}</h2>
    <p className="mt-0.5 text-[12px] text-muted-foreground">{subtitle}</p>
  </div>
  {actionButton}
</div>
```

### Grid pattern
```
grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
```

### Emoji badge pattern (used everywhere for agents/workflows)
```
<div className="flex h-12 w-12 items-center justify-center rounded-xl text-xl {colorClass}">
  {emoji}
</div>
```
Color classes: `bg-violet-100`, `bg-blue-100`, `bg-emerald-100`, `bg-amber-100`, `bg-pink-100`, `bg-orange-100`, `bg-teal-100`, `bg-rose-100`, `bg-sky-100`

### Status dot pattern
```
<span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
```

### Primary button
```
inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-[13px] font-medium text-white hover:opacity-90
```

### Font sizes (consistent scale)
- Page headline: `text-4xl font-bold tracking-tight`
- Section title: `text-[15px] font-semibold`
- Card title: `text-[14px] font-semibold`
- Card body: `text-[14px] text-muted-foreground` or `text-[12px]`
- Small labels: `text-[11px]` or `text-[12px]`
- Badge text: `text-[10px] font-semibold`

---

## Data Types

```typescript
export interface AgentItem {
  id: string;
  name: string;
  description: string;
  color: string;   // Tailwind bg class like "bg-violet-100"
  emoji: string;    // Unicode emoji
}

export interface WorkflowItem {
  id: string;
  name: string;
  description: string;
  color: string;
  emoji: string;
}

export interface AutomationRun {
  workflow: string;
  message: string;
  time: string;
  status: "success" | "running" | "error";
}

export interface AutomationStats {
  processes: string;
  runsThisWeek: string;
  hoursSaved: string;
}
```

---

## Important Conventions

- Use `cn()` from `@/lib/utils` for conditional class merging (clsx + tailwind-merge)
- All shadcn components in `components/ui/`
- Custom components grouped by domain: `components/dashboard/`, `components/sidebar.tsx`
- Prefer React Server Components. Add `"use client"` only when needed (interactivity, hooks, context)
- No real API calls — all data is mocked in `lib/` files
- All content should be **sales-persona focused** (pipeline, leads, deals, proposals, CRM)
- The dashboard data (agents, runs, stats) lives in `lib/persona-data.ts`
- Agent and workflow list data lives in `lib/agents-data.ts` and `lib/workflows-data.ts`

---

## Build Order

1. Set up Next.js 16 project with Tailwind 4, shadcn/ui (New York), globals.css with all tokens
2. Create `lib/utils.ts`, `lib/types.ts`, context providers
3. Build the sidebar (`components/sidebar.tsx`) + product layout (`app/(product)/layout.tsx`)
4. Build the home page with all 4 sections
5. Build the agents list page
6. Build the agent create page (50/50 split with chat + form)
7. Build the workflows list page
8. Build the settings page
9. Wire up navigation between all pages
