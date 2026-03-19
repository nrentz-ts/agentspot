# Solace.ai — Claude Code Context

## Project Overview

Solace.ai is an AI work-assistant platform (Next.js 16 prototype) with a marketing site, onboarding flow, and a product dashboard featuring an AI chat interface, workflow management, and agent management. Currently all data is mocked — no real backend or auth yet.

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router), React 19, TypeScript 5
- **Styling**: Tailwind CSS 4 (OKLCH color variables in `globals.css`)
- **UI Components**: shadcn/ui (New York style) via Radix UI
- **Icons**: Lucide React
- **State**: React Context (no external state library)

## Commands

```bash
npm run dev     # start dev server (localhost:3000)
npm run build   # production build
npm run lint    # ESLint
```

## Directory Structure

```
app/
  (marketing)/          # Public-facing pages (no auth)
    page.tsx            # Landing page
    onboarding/page.tsx # 3-step onboarding form
  (product)/            # Authenticated product shell
    layout.tsx          # Wraps all product pages with Sidebar
    home/page.tsx       # Dashboard home
    assistant/page.tsx  # AI chat interface
    workflows/page.tsx  # Workflow management
    agents/
      page.tsx          # Agents list
      [id]/page.tsx     # Agent detail

components/
  ui/                   # shadcn/ui primitives (avatar, badge, button, card, dialog, input, scroll-area, separator, tabs, tooltip)
  chat/                 # Chat UI: chat-container, message-bubble, message-list, input-bar, rich-response, suggestion-chips, typing-indicator
  dashboard/            # Dashboard widgets: welcome-card, prompt-bar, action-cards, agent-roster, work-updates, slack-updates, automation-activity, agent-performance, data-insights
  sidebar.tsx           # Collapsible nav with persona/font switcher menus
  tile-grid.tsx         # Reusable grid for agents/workflows

lib/
  types.ts              # Message, RichContentType, RichContent interfaces
  utils.ts              # cn() (clsx + tailwind-merge)
  persona-context.tsx   # Active persona (HR, Marketing, Sales, Engineering, Leadership, Finance)
  font-context.tsx      # Active font (Default, Inter, Roboto, Open Sans, Neuton)
  sidebar-context.tsx   # Sidebar open/closed state
  personas.ts           # Persona definitions + action cards
  persona-data.ts       # Persona-specific dashboard data
  persona-skills.ts     # Extended skill list per persona
  agents-data.ts        # Mock agent definitions per persona
  workflows-data.ts     # Mock workflow definitions per persona
  mock-data.ts          # WELCOME_MESSAGE, SUGGESTION_CHIPS, CONVERSATION_FLOWS, FALLBACK_RESPONSES
  mock-engine.ts        # getResponse() — generates chat responses; generateId()
```

## Architecture Notes

- **Route groups**: `(marketing)` and `(product)` keep layouts separate without affecting URLs.
- **Persona system**: `PersonaProvider` (in root layout) drives context-aware content across dashboard, sidebar, agents, workflows, and chat. All persona data lives in `lib/`.
- **Mock engine**: `lib/mock-engine.ts` simulates AI responses. Extend `CONVERSATION_FLOWS` in `lib/mock-data.ts` to add new conversation paths.
- **Rich responses**: The chat supports multiple content types (`text`, `action-card`, `step-list`, `confirmation`, `email-summary`) rendered by `components/chat/rich-response.tsx`.
- **shadcn/ui config**: `components.json` — style: new-york, baseColor: neutral, aliases use `@/`.

## Conventions

- Use `cn()` from `@/lib/utils` for conditional class merging.
- All new shadcn components go in `components/ui/`.
- Custom components go in `components/` (grouped by domain: `chat/`, `dashboard/`, etc.).
- New lib utilities/contexts go in `lib/`.
- Prefer React Server Components where possible; add `"use client"` only when needed (interactivity, hooks, context consumers).
- No auth or real API calls yet — extend mock data first, then wire in real APIs later.
