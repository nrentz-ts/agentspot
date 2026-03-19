"use client";

import { useState, useEffect, useRef, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Sparkles,
  ArrowUp,
  Check,
  Search,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { generateId } from "@/lib/mock-engine";
import { getHelperDetail } from "@/lib/helper-detail-data";

// ─── Connectors ────────────────────────────────────────────────────────────

const CONNECTOR_OPTIONS = [
  { id: "gmail",      name: "Gmail",           emoji: "✉️",  bg: "bg-red-100"    },
  { id: "gcal",       name: "Google Calendar", emoji: "📅",  bg: "bg-blue-100"   },
  { id: "slack",      name: "Slack",           emoji: "💬",  bg: "bg-violet-100" },
  { id: "notion",     name: "Notion",          emoji: "📓",  bg: "bg-gray-100"   },
  { id: "figma",      name: "Figma",           emoji: "🖌️",  bg: "bg-pink-100"   },
  { id: "hubspot",    name: "HubSpot",         emoji: "🟠",  bg: "bg-orange-100" },
  { id: "github",     name: "GitHub",          emoji: "🐙",  bg: "bg-gray-100"   },
  { id: "atlassian",  name: "Atlassian",       emoji: "🔷",  bg: "bg-sky-100"    },
  { id: "linear",     name: "Linear",          emoji: "⚡",  bg: "bg-indigo-100" },
  { id: "drive",      name: "Google Drive",    emoji: "📂",  bg: "bg-yellow-100" },
  { id: "salesforce", name: "Salesforce",      emoji: "☁️",  bg: "bg-sky-100"    },
  { id: "zoom",       name: "Zoom",            emoji: "📹",  bg: "bg-blue-100"   },
];

// ─── Tools ─────────────────────────────────────────────────────────────────

const TOOL_GROUPS = [
  { id: "search",       name: "Search & Research",      emoji: "🔍", bg: "bg-blue-100",   total: 5 },
  { id: "code",         name: "Code Execution",          emoji: "⚡", bg: "bg-green-100",  total: 2 },
  { id: "data",         name: "Data & Analytics",        emoji: "📊", bg: "bg-violet-100", total: 5 },
  { id: "integrations", name: "External Integrations",   emoji: "🔀", bg: "bg-amber-100",  total: 2 },
  { id: "memory",       name: "Learning & Memory",       emoji: "📖", bg: "bg-rose-100",   total: 2 },
  { id: "browser",      name: "Browser Automation",      emoji: "🌐", bg: "bg-teal-100",   total: 1 },
  { id: "human",        name: "Human-in-the-Loop",       emoji: "🙋", bg: "bg-orange-100", total: 1 },
  { id: "subagent",     name: "Subagent Orchestration",  emoji: "✨", bg: "bg-purple-100", total: 1 },
];

// ─── Types ─────────────────────────────────────────────────────────────────

interface HelperForm {
  name: string;
  description: string;
  instructions: string;
  connectors: Set<string>;
  tools: Set<string>;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  filledFields?: string[];
}

// ─── Form field extractor ──────────────────────────────────────────────────

function extractUpdates(msg: string, form: HelperForm): Partial<Omit<HelperForm, "connectors" | "tools">> & { connectors?: string[] } {
  const lower = msg.toLowerCase();
  const updates: ReturnType<typeof extractUpdates> = {};

  if (!form.name) {
    const quoted = msg.match(/["']([^"']{2,40})["']/);
    const named  = msg.match(/(?:call(?:ed)?|name(?:d)?|it's?|titled?|called?)\s+(?:it\s+)?["']?([A-Z][a-zA-Z\s&-]{1,35})["']?/i);
    if (quoted)      updates.name = quoted[1].trim();
    else if (named)  updates.name = named[1].trim();
  }

  if (!form.description && msg.length > 25 && msg.length < 200) {
    const purposeMatch = msg.match(/(?:that|which|to|for|it should|it will|it helps?|designed to|built to|I want|I need)[^.?!]{10,}/i);
    if (purposeMatch) updates.description = purposeMatch[0].replace(/^(that|which|to|for|it should|it will|it helps?|designed to|built to|I want|I need)\s+/i, "").trim();
  }

  const skillPhrases: string[] = [];
  const actionWords = ["screen", "draft", "send", "schedule", "summarize", "review", "track", "monitor", "generate", "analyze", "score", "rank", "update", "notify", "create", "write", "check", "detect", "flag", "approve", "reject", "remind", "collect", "compare"];
  actionWords.forEach((word) => {
    const m = msg.match(new RegExp(`${word}[^.,;!?]{3,50}`, "i"));
    if (m) skillPhrases.push(m[0].trim());
  });
  if (skillPhrases.length > 0 && form.instructions.length < 50) {
    updates.instructions = skillPhrases.map((p) => `• ${p}`).join("\n");
  }

  const connectorKeywords: Record<string, string[]> = {
    gmail:      ["gmail", "email", "inbox", "mail"],
    gcal:       ["calendar", "meeting", "schedule", "event"],
    slack:      ["slack", "message", "channel", "dm"],
    notion:     ["notion", "doc", "note", "wiki", "page"],
    github:     ["github", "repo", "pr", "pull request", "code", "commit"],
    hubspot:    ["hubspot", "crm", "lead", "deal", "contact"],
    atlassian:  ["jira", "confluence", "atlassian", "ticket", "sprint"],
    linear:     ["linear", "issue", "task"],
    drive:      ["drive", "sheet", "slides", "gdoc"],
    salesforce: ["salesforce", "opportunity", "account"],
    zoom:       ["zoom", "webinar", "video call"],
    figma:      ["figma", "design", "prototype"],
  };

  const foundConnectors: string[] = [];
  Object.entries(connectorKeywords).forEach(([id, keywords]) => {
    if (keywords.some((k) => lower.includes(k))) foundConnectors.push(id);
  });
  if (foundConnectors.length > 0) updates.connectors = foundConnectors;

  return updates;
}

// ─── AI response generator ─────────────────────────────────────────────────

function buildAIResponse(updates: ReturnType<typeof extractUpdates>, isFirst: boolean): string {
  const filled: string[] = [];
  if (updates.name)                filled.push(`named it **${updates.name}**`);
  if (updates.description)         filled.push("filled the description");
  if (updates.instructions)        filled.push("outlined core skills");
  if (updates.connectors?.length)  filled.push(`connected ${updates.connectors.join(", ")}`);

  if (isFirst && filled.length === 0) {
    return "I'd love to help you build this helper! Tell me — what should it do? Describe its main job and I'll start filling in the form for you.";
  }

  const acks = [
    filled.length > 0 ? `Got it — I've ${filled.join(", ")}. ` : "Noted. ",
    "What else should this helper be able to do? ",
    "You can also mention any apps it should connect to (Slack, Gmail, Jira…), or describe edge cases it should handle.",
  ];

  const followUps = [
    "Should it handle any escalations or edge cases on its own?",
    "Any tone or communication style it should follow?",
    "Should it ever ask you before taking action, or run fully autonomously?",
    "Are there things it should explicitly *not* do?",
    "What would a perfect response from this helper look like?",
  ];

  return acks.join("") + "\n\n" + followUps[Math.floor(Math.random() * followUps.length)];
}

// ─── Typing indicator ──────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="flex items-end gap-3 px-4 py-2">
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Sparkles className="h-3 w-3 text-primary" />
      </div>
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 shadow-sm">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:0ms]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:150ms]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:300ms]" />
      </div>
    </div>
  );
}

// ─── Field highlight wrapper ───────────────────────────────────────────────

function FieldWrap({ label, highlighted, children }: { label: string; highlighted: boolean; children: React.ReactNode }) {
  return (
    <div className={cn("rounded-xl border p-4 transition-all duration-500", highlighted ? "border-primary/40 bg-primary/[0.03] shadow-sm" : "border-border bg-white")}>
      <div className="mb-2.5 flex items-center justify-between">
        <label className="text-[12px] font-semibold uppercase tracking-wide text-muted-foreground/70">{label}</label>
        {highlighted && (
          <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
            <Sparkles className="h-2.5 w-2.5" /> AI filled
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────

function NewHelperContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromSlug = searchParams.get("from");
  const isEditing = !!fromSlug;

  const existingHelper = useMemo(() => fromSlug ? getHelperDetail(fromSlug) : null, [fromSlug]);

  const [form, setForm] = useState<HelperForm>({
    name: existingHelper?.name ?? "",
    description: existingHelper?.description ?? "",
    instructions: existingHelper ? `• ${existingHelper.activity.slice(0, 3).map(a => a.action).join("\n• ")}` : "",
    connectors: new Set<string>(),
    tools: new Set<string>(),
  });

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: generateId(),
      role: "assistant",
      text: isEditing
        ? `I can see you're editing **${existingHelper?.name}**. What would you like to change? You can describe new capabilities, adjust the description, or add connectors.`
        : "Let's build your helper together. Tell me what it should do — describe it in plain English and I'll fill in the form as we talk.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [highlighted, setHighlighted] = useState<Set<string>>(new Set());
  const [saved, setSaved] = useState(false);
  const [connectorSearch, setConnectorSearch] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isFirstUserMsg = useRef(true);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const filteredConnectors = useMemo(() => {
    const q = connectorSearch.toLowerCase().trim();
    if (!q) return CONNECTOR_OPTIONS;
    return CONNECTOR_OPTIONS.filter((c) => c.name.toLowerCase().includes(q));
  }, [connectorSearch]);

  function flash(fields: string[]) {
    setHighlighted(new Set(fields));
    setTimeout(() => setHighlighted(new Set()), 3000);
  }

  function sendMessage() {
    const text = input.trim();
    if (!text) return;
    setInput("");

    const userMsg: ChatMessage = { id: generateId(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setTyping(true);

    const isFirst = isFirstUserMsg.current;
    isFirstUserMsg.current = false;

    setTimeout(() => {
      const updates = extractUpdates(text, form);
      const aiText = buildAIResponse(updates, isFirst);

      const fieldsUpdated: string[] = [];
      setForm((prev) => {
        const next = { ...prev, connectors: new Set(prev.connectors), tools: new Set(prev.tools) };
        if (updates.name && !prev.name)               { next.name         = updates.name;         fieldsUpdated.push("name");         }
        if (updates.description && !prev.description)  { next.description  = updates.description;  fieldsUpdated.push("description");  }
        if (updates.instructions && prev.instructions.length < 50) { next.instructions = updates.instructions; fieldsUpdated.push("skills"); }
        if (updates.connectors) {
          updates.connectors.forEach((c) => next.connectors.add(c));
          if (updates.connectors.length) fieldsUpdated.push("connectors");
        }
        return next;
      });

      if (fieldsUpdated.length) flash(fieldsUpdated);

      const aiMsg: ChatMessage = { id: generateId(), role: "assistant", text: aiText, filledFields: fieldsUpdated };
      setMessages((prev) => [...prev, aiMsg]);
      setTyping(false);
    }, 900 + Math.random() * 600);
  }

  function toggleConnector(id: string) {
    setForm((prev) => {
      const next = new Set(prev.connectors);
      next.has(id) ? next.delete(id) : next.add(id);
      return { ...prev, connectors: next };
    });
  }

  function toggleTool(id: string) {
    setForm((prev) => {
      const next = new Set(prev.tools);
      next.has(id) ? next.delete(id) : next.add(id);
      return { ...prev, tools: next };
    });
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => router.push("/helpers"), 1200);
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#F8F9FC]">

      {/* ── Top bar ── */}
      <header className="flex shrink-0 items-center justify-between border-b border-border bg-white px-6 py-3">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {isEditing ? "Back to Helper" : "Back to Helpers"}
        </button>

        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
            <Sparkles className="h-3 w-3 text-primary" />
          </div>
          <span className="text-[14px] font-semibold text-foreground">
            {isEditing ? `Edit · ${existingHelper?.name ?? "Helper"}` : "New Helper"}
          </span>
        </div>

        <button
          onClick={handleSave}
          className={cn(
            "rounded-lg px-4 py-2 text-[13px] font-semibold transition-all",
            saved
              ? "bg-emerald-50 text-emerald-700"
              : "bg-primary text-white hover:opacity-90"
          )}
        >
          {saved ? "Saved ✓" : isEditing ? "Save changes" : "Create helper"}
        </button>
      </header>

      {/* ── Split body ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── LEFT: Chat ── */}
        <div className="flex w-1/2 shrink-0 flex-col border-r border-border bg-gradient-to-b from-blue-50/70 via-indigo-50/30 to-white/60">
          <div className="shrink-0 border-b border-border/50 px-5 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/50">
              Build with AI
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
            {messages.map((msg) => {
              const isUser = msg.role === "user";
              return (
                <div key={msg.id} className={cn("flex items-start gap-2.5 py-1.5", isUser && "flex-row-reverse")}>
                  <div className={cn(
                    "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] font-bold",
                    isUser ? "bg-foreground/8 text-foreground" : "bg-primary/10 text-primary"
                  )}>
                    {isUser ? "A" : <Sparkles className="h-3 w-3" />}
                  </div>
                  <div className={cn("max-w-[82%]", isUser && "flex flex-col items-end")}>
                    <div className={cn(
                      "rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-line",
                      isUser
                        ? "rounded-tr-sm bg-primary text-primary-foreground"
                        : "rounded-tl-sm bg-white shadow-sm text-foreground"
                    )}>
                      {msg.text.replace(/\*\*([^*]+)\*\*/g, "$1")}
                    </div>
                    {msg.filledFields && msg.filledFields.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {msg.filledFields.map((f) => (
                          <span key={f} className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary capitalize">
                            ✓ {f}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {typing && <TypingDots />}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="shrink-0 border-t border-border/50 p-4">
            <div className="flex items-end gap-2 rounded-xl border border-white/80 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm focus-within:border-primary/30 focus-within:bg-white transition-all">
              <textarea
                ref={inputRef}
                rows={3}
                placeholder="Describe your helper…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey && input.trim()) { e.preventDefault(); sendMessage(); } }}
                className="flex-1 resize-none bg-transparent text-[13px] leading-relaxed outline-none placeholder:text-muted-foreground/50"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || typing}
                className="mb-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-white transition-opacity disabled:opacity-30"
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Form ── */}
        <div className="flex-1 overflow-y-auto px-8 py-7">
          <div className="mx-auto max-w-xl space-y-4">

            {/* Name */}
            <FieldWrap label="Name" highlighted={highlighted.has("name")}>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Resume Screener"
                className="w-full bg-transparent text-[15px] font-semibold text-foreground outline-none placeholder:font-normal placeholder:text-muted-foreground/40"
              />
            </FieldWrap>

            {/* Description */}
            <FieldWrap label="Description" highlighted={highlighted.has("description")}>
              <textarea
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                placeholder="e.g. Screens incoming CVs against job criteria and ranks the top candidates."
                rows={3}
                className="w-full resize-none bg-transparent text-[14px] leading-relaxed text-foreground outline-none placeholder:text-muted-foreground/40"
              />
            </FieldWrap>

            {/* Skills */}
            <FieldWrap label="Skills" highlighted={highlighted.has("skills")}>
              <textarea
                value={form.instructions}
                onChange={(e) => setForm((p) => ({ ...p, instructions: e.target.value }))}
                placeholder={"• Screen every incoming CV against the job description\n• Score each candidate out of 100\n• Flag candidates missing required skills\n• Only escalate to Sarah when the score is above 80"}
                rows={9}
                className="w-full resize-none bg-transparent font-mono text-[13px] leading-relaxed text-foreground outline-none placeholder:font-sans placeholder:text-muted-foreground/40"
              />
            </FieldWrap>

            {/* Connectors */}
            <FieldWrap label="Connectors" highlighted={highlighted.has("connectors")}>
              {/* Search */}
              <div className="mb-3 flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2">
                <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
                <input
                  type="text"
                  placeholder="Search connectors…"
                  value={connectorSearch}
                  onChange={(e) => setConnectorSearch(e.target.value)}
                  className="flex-1 bg-transparent text-[12px] outline-none placeholder:text-muted-foreground/40"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {filteredConnectors.map((c) => {
                  const active = form.connectors.has(c.id);
                  return (
                    <button
                      key={c.id}
                      onClick={() => toggleConnector(c.id)}
                      className={cn(
                        "flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-[12px] font-medium transition-all",
                        active
                          ? "border-primary/30 bg-primary/5 text-primary"
                          : "border-border bg-white text-foreground/70 hover:border-primary/20 hover:bg-muted/40"
                      )}
                    >
                      <span className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[13px]", c.bg)}>
                        {c.emoji}
                      </span>
                      <span className="truncate">{c.name}</span>
                      {active && <Check className="ml-auto h-3 w-3 shrink-0 text-primary" />}
                    </button>
                  );
                })}
                {filteredConnectors.length === 0 && (
                  <p className="col-span-3 py-3 text-center text-[12px] text-muted-foreground/50">No connectors match "{connectorSearch}"</p>
                )}
              </div>
            </FieldWrap>

            {/* Tools */}
            <FieldWrap label="Tools" highlighted={false}>
              <div className="space-y-1.5">
                {TOOL_GROUPS.map((tool) => {
                  const active = form.tools.has(tool.id);
                  return (
                    <button
                      key={tool.id}
                      onClick={() => toggleTool(tool.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-all",
                        active
                          ? "border-primary/30 bg-primary/5"
                          : "border-border bg-white hover:border-primary/20 hover:bg-muted/30"
                      )}
                    >
                      <span className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[14px]", tool.bg)}>
                        {tool.emoji}
                      </span>
                      <span className={cn("flex-1 text-[13px] font-medium", active ? "text-primary" : "text-foreground/80")}>
                        {tool.name}
                      </span>
                      <span className={cn(
                        "text-[11px] font-medium",
                        active ? "text-primary" : "text-muted-foreground/50"
                      )}>
                        {active ? `${tool.total} active` : `0 of ${tool.total}`}
                      </span>
                      <ChevronRight className={cn("h-3.5 w-3.5 shrink-0", active ? "text-primary" : "text-muted-foreground/30")} />
                    </button>
                  );
                })}
              </div>
            </FieldWrap>

          </div>
        </div>
      </div>
    </div>
  );
}

export default function NewHelperPage() {
  return (
    <Suspense>
      <NewHelperContent />
    </Suspense>
  );
}
