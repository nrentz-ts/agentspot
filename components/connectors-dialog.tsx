"use client";

import { useState, useMemo } from "react";
import { X, Search, Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Data ──────────────────────────────────────────────────────────────────

interface Connector {
  id: string;
  name: string;
  desc: string;
  emoji: string;
  bg: string;
  rank: number | null;
  defaultConnected: boolean;
}

const ALL_CONNECTORS: Connector[] = [
  { id: "gmail",    name: "Gmail",           desc: "Draft replies, summarize threads, & search your inbox",                emoji: "✉️",  bg: "bg-red-100",    rank: 1,    defaultConnected: true  },
  { id: "gcal",     name: "Google Calendar", desc: "Manage your schedule and coordinate meetings effortlessly",             emoji: "📅",  bg: "bg-blue-100",   rank: 2,    defaultConnected: true  },
  { id: "notion",   name: "Notion",          desc: "Connect your Notion workspace to search, update, and power workflows",  emoji: "📓",  bg: "bg-gray-100",   rank: 3,    defaultConnected: false },
  { id: "canva",    name: "Canva",           desc: "Search, create, autofill, and export Canva designs",                   emoji: "🎨",  bg: "bg-violet-100", rank: 4,    defaultConnected: false },
  { id: "figma",    name: "Figma",           desc: "Generate diagrams and better code from Figma context",                 emoji: "🖌️",  bg: "bg-pink-100",   rank: 5,    defaultConnected: true  },
  { id: "slack",    name: "Slack",           desc: "Send messages, create canvases, and fetch Slack data",                 emoji: "💬",  bg: "bg-violet-100", rank: 6,    defaultConnected: true  },
  { id: "atlassian",name: "Atlassian",       desc: "Access Jira & Confluence for project and knowledge work",              emoji: "🔷",  bg: "bg-sky-100",    rank: 7,    defaultConnected: false },
  { id: "hubspot",  name: "HubSpot",         desc: "Chat with your CRM data to get personalized insights",                emoji: "🟠",  bg: "bg-orange-100", rank: 8,    defaultConnected: false },
  { id: "linear",   name: "Linear",          desc: "Manage issues, projects & team workflows in Linear",                  emoji: "⚡",  bg: "bg-indigo-100", rank: 9,    defaultConnected: false },
  { id: "monday",   name: "monday.com",      desc: "Manage projects, boards, and workflows in monday.com",                emoji: "📋",  bg: "bg-red-100",    rank: 10,   defaultConnected: false },
  { id: "intercom", name: "Intercom",        desc: "Access Intercom data for better customer insights",                   emoji: "💙",  bg: "bg-blue-100",   rank: 11,   defaultConnected: false },
  { id: "box",      name: "Box",             desc: "Search, access and get insights on your Box content",                 emoji: "📦",  bg: "bg-sky-100",    rank: 12,   defaultConnected: false },
  { id: "github",   name: "GitHub",          desc: "Search, read, and manage code repositories and PRs",                  emoji: "🐙",  bg: "bg-gray-100",   rank: 13,   defaultConnected: false },
  { id: "zoom",     name: "Zoom",            desc: "Schedule meetings and get summaries from Zoom sessions",              emoji: "📹",  bg: "bg-blue-100",   rank: null, defaultConnected: false },
  { id: "salesforce",name: "Salesforce",     desc: "Query records, summarize deals, and update CRM data",                emoji: "☁️",  bg: "bg-sky-100",    rank: null, defaultConnected: false },
  { id: "drive",    name: "Google Drive",    desc: "Search and summarize docs, sheets, and slides",                       emoji: "📂",  bg: "bg-yellow-100", rank: null, defaultConnected: false },
  { id: "asana",    name: "Asana",           desc: "Connect to Asana to coordinate tasks, projects, and goals",           emoji: "🎯",  bg: "bg-pink-100",   rank: null, defaultConnected: false },
  { id: "vercel",   name: "Vercel",          desc: "Analyze, debug, and manage projects and deployments",                 emoji: "▲",   bg: "bg-gray-100",   rank: null, defaultConnected: false },
  { id: "greenhouse",name: "Greenhouse",     desc: "Manage job postings, candidates, and hiring pipelines",               emoji: "🌱",  bg: "bg-green-100",  rank: null, defaultConnected: false },
];

// ─── Sub-components ────────────────────────────────────────────────────────

function ConnectorCard({
  connector,
  connected,
  onToggle,
}: {
  connector: Connector;
  connected: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-white p-3.5 transition-all duration-150 hover:border-primary/20 hover:shadow-sm">
      {/* Icon */}
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[18px] leading-none",
          connector.bg
        )}
      >
        {connector.emoji}
      </div>

      {/* Name + description */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="text-[13px] font-semibold text-foreground">{connector.name}</p>
          {connector.rank && (
            <span className="text-[10px] font-medium text-muted-foreground/60">
              {connector.rank === 1 ? "Most popular" : `#${connector.rank} popular`}
            </span>
          )}
        </div>
        <p className="mt-0.5 text-[12px] leading-snug text-muted-foreground line-clamp-2">
          {connector.desc}
        </p>
      </div>

      {/* Toggle button */}
      <button
        onClick={onToggle}
        className={cn(
          "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-150",
          connected
            ? "border-emerald-200 bg-emerald-50 text-emerald-600 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
            : "border-border bg-white text-muted-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
        )}
        title={connected ? "Disconnect" : "Connect"}
      >
        {connected ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}

// ─── Dialog ────────────────────────────────────────────────────────────────

export function ConnectorsDialog({ onClose }: { onClose: () => void }) {
  const [connected, setConnected] = useState<Set<string>>(
    () => new Set(ALL_CONNECTORS.filter((c) => c.defaultConnected).map((c) => c.id))
  );
  const [search, setSearch] = useState("");

  function toggle(id: string) {
    setConnected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return ALL_CONNECTORS;
    return ALL_CONNECTORS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)
    );
  }, [search]);

  const connectedList = filtered.filter((c) => connected.has(c.id));
  const moreList = filtered.filter((c) => !connected.has(c.id));

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-border px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-[20px] font-bold tracking-tight text-foreground">
                Connectors
              </h2>
              <p className="mt-0.5 text-[13px] text-muted-foreground">
                Connect SpotterWork to your apps, files, and services.
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Search row */}
          <div className="mt-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/50" />
              <input
                type="text"
                placeholder="Search connectors…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-border bg-muted/40 py-2 pl-9 pr-3 text-[13px] placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button className="rounded-lg border border-border bg-white px-3 py-2 text-[12px] font-medium text-foreground/70 transition-colors hover:bg-muted">
              Sort
            </button>
            <button className="rounded-lg border border-border bg-white px-3 py-2 text-[12px] font-medium text-foreground/70 transition-colors hover:bg-muted">
              Type
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-7">
          {/* Already connected */}
          {connectedList.length > 0 && (
            <section>
              <div className="mb-3 flex items-center gap-2">
                <h3 className="text-[12px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                  Already connected
                </h3>
                <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-100 px-1 text-[10px] font-semibold text-emerald-700">
                  {connectedList.length}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {connectedList.map((c) => (
                  <ConnectorCard
                    key={c.id}
                    connector={c}
                    connected={true}
                    onToggle={() => toggle(c.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* More connectors */}
          {moreList.length > 0 && (
            <section>
              <div className="mb-3 flex items-center gap-2">
                <h3 className="text-[12px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                  More connectors
                </h3>
                <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-muted px-1 text-[10px] font-semibold text-muted-foreground">
                  {moreList.length}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {moreList.map((c) => (
                  <ConnectorCard
                    key={c.id}
                    connector={c}
                    connected={false}
                    onToggle={() => toggle(c.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {filtered.length === 0 && (
            <div className="flex flex-col items-center py-16 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/60 text-2xl">
                🔌
              </div>
              <p className="mt-3 text-[14px] font-medium text-foreground">
                No connectors found
              </p>
              <p className="mt-1 text-[12px] text-muted-foreground">
                Try a different search term.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
