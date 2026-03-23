"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Workflow,
  Bot,
  Activity,
  Sparkles,
  PanelLeftClose,
  PanelLeft,
  ChevronUp,
  ChevronRight,
  Check,
  Globe,
  Blocks,
  BarChart2,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/lib/sidebar-context";
import { usePersona } from "@/lib/persona-context";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ConnectorsDialog } from "@/components/connectors-dialog";
import { useVariant, VARIANTS, type VariantId } from "@/lib/variant-context";
import { FlaskConical } from "lucide-react";

// ─── Recent chats mock data ───────────────────────────────────────────────

const RECENT_CHATS = [
  { id: "rc1", title: "Summarize today's activity"           },
  { id: "rc2", title: "Top candidates for Marketing Lead"    },
  { id: "rc3", title: "Draft follow-up for Alex Chen"        },
  { id: "rc4", title: "Analyze Q3 pipeline health"           },
  { id: "rc5", title: "Pipeline coverage for Q1 close"       },
  { id: "rc6", title: "Generate proposal for Acme Corp"      },
  { id: "rc7", title: "Renewal risk — Figma account"         },
];

function MenuRow({ icon: Icon, label, onClick, sub }: {
  icon: React.ElementType; label: string; onClick: () => void; sub?: string;
}) {
  return (
    <button onClick={onClick} className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] text-foreground/70 transition-colors hover:bg-muted">
      <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
      <div className="flex flex-col">
        <span>{label}</span>
        {sub && <span className="text-[11px] text-muted-foreground/50">{sub}</span>}
      </div>
    </button>
  );
}

function ProfileMenu({ onClose, onOpenConnectors }: { onClose: () => void; onOpenConnectors: () => void }) {
  const { variant, setVariant } = useVariant();
  const [panel, setPanel] = useState<"main" | "variants">("main");
  const router = useRouter();

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute bottom-full left-0 z-50 mb-2 w-60 rounded-xl border border-border bg-white shadow-lg overflow-hidden">

        {/* ── Main panel ── */}
        {panel === "main" && (
          <div className="p-1.5">
            <MenuRow icon={Blocks}       label="My Connectors"   onClick={() => { onClose(); onOpenConnectors(); }} />
            <div className="my-1 border-t border-border" />
            <MenuRow icon={BarChart2}    label="ThoughtSpot Home" onClick={() => { router.push("/thoughtspot"); onClose(); }} />
            <MenuRow icon={Globe}        label="View Marketing Site" onClick={() => { router.push("/"); onClose(); }} />
            <div className="my-1 border-t border-border" />
            {/* Prototype variant trigger */}
            <button
              onClick={() => setPanel("variants")}
              className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] text-foreground/70 transition-colors hover:bg-muted"
            >
              <FlaskConical className="h-4 w-4 shrink-0 text-muted-foreground" />
              <div className="flex flex-1 flex-col">
                <span>Prototype version</span>
                <span className="text-[11px] text-muted-foreground/50 line-clamp-1">{variant.label}</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40" />
            </button>
          </div>
        )}

        {/* ── Prototype variant panel ── */}
        {panel === "variants" && (
          <div className="p-1.5">
            <button onClick={() => setPanel("main")} className="flex w-full items-center gap-1.5 rounded-lg px-2.5 py-2 text-[13px] text-muted-foreground transition-colors hover:bg-muted">
              <ChevronRight className="h-3.5 w-3.5 rotate-180" />
              <span>Back</span>
            </button>
            <div className="my-1 border-t border-border" />
            <p className="px-2.5 pb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/50">
              Prototype version
            </p>
            {(Object.values(VARIANTS) as typeof VARIANTS[VariantId][]).map((v) => (
              <button key={v.id} onClick={() => { setVariant(v.id); onClose(); }}
                className={cn("flex w-full flex-col rounded-lg px-2.5 py-2.5 text-left transition-colors",
                  variant.id === v.id ? "bg-primary/8" : "hover:bg-muted"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={cn("text-[13px] font-medium", variant.id === v.id ? "text-primary" : "text-foreground/80")}>
                    {v.label}
                  </span>
                  {variant.id === v.id && <Check className="h-3.5 w-3.5 shrink-0 text-primary" />}
                </div>
                <span className="text-[11px] text-muted-foreground/60">{v.description}</span>
              </button>
            ))}
          </div>
        )}

      </div>
    </>
  );
}

function ExpandedProfileButton() {
  const { persona } = usePersona();
  const [showMenu, setShowMenu] = useState(false);
  const [showConnectors, setShowConnectors] = useState(false);

  return (
    <div className="relative">
      {showMenu && (
        <ProfileMenu
          onClose={() => setShowMenu(false)}
          onOpenConnectors={() => setShowConnectors(true)}
        />
      )}
      {showConnectors && (
        <ConnectorsDialog onClose={() => setShowConnectors(false)} />
      )}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-sidebar-accent"
      >
        <Avatar className="h-7 w-7 shrink-0">
          <AvatarFallback className="bg-primary/10 text-[11px] font-semibold text-primary">
            S
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-col overflow-hidden text-left">
          <span className="truncate text-[13px] font-medium text-sidebar-foreground">
            Sarah
          </span>
          <span className="truncate text-[11px] text-sidebar-foreground/40">
            {persona.label}
          </span>
        </div>
        <ChevronUp className="h-3.5 w-3.5 shrink-0 text-sidebar-foreground/30" />
      </button>
    </div>
  );
}

function CollapsedProfileButton() {
  const { persona } = usePersona();
  const [showMenu, setShowMenu] = useState(false);
  const [showConnectors, setShowConnectors] = useState(false);

  return (
    <div className="relative">
      {showMenu && (
        <ProfileMenu
          onClose={() => setShowMenu(false)}
          onOpenConnectors={() => setShowConnectors(true)}
        />
      )}
      {showConnectors && (
        <ConnectorsDialog onClose={() => setShowConnectors(false)} />
      )}
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <button onClick={() => setShowMenu(!showMenu)}>
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary/10 text-[11px] font-semibold text-primary">
                S
              </AvatarFallback>
            </Avatar>
          </button>
        </TooltipTrigger>
        {!showMenu && (
          <TooltipContent side="right" sideOffset={8}>
            Sarah — {persona.label}
          </TooltipContent>
        )}
      </Tooltip>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { open, toggle } = useSidebar();
  const { variant } = useVariant();

  return (
    <aside
      className={cn(
        "flex h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-all duration-200 ease-in-out",
        open ? "w-[260px]" : "w-[60px]"
      )}
    >
      <div
        className={cn(
          "flex h-14 items-center gap-2.5 border-b border-sidebar-border",
          open ? "px-4" : "justify-center px-0"
        )}
      >
        <button
          onClick={toggle}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sidebar-foreground/50 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          {open ? (
            <PanelLeftClose className="h-[18px] w-[18px]" />
          ) : (
            <PanelLeft className="h-[18px] w-[18px]" />
          )}
        </button>

        {open && (
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
              <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="text-[15px] font-semibold tracking-tight text-sidebar-foreground">
              AgentSpot
            </span>
          </div>
        )}
      </div>

      <nav
        className={cn(
          "space-y-1 pt-4",
          open ? "px-3" : "flex flex-col items-center px-0"
        )}
      >
        {variant.navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);

          const link = (
            <Link
              href={item.href}
              className={cn(
                "flex items-center rounded-lg font-medium transition-all duration-150",
                open
                  ? "gap-3 px-3 py-2.5 text-[14px]"
                  : "h-10 w-10 justify-center",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className={cn("shrink-0", open ? "h-[18px] w-[18px]" : "h-5 w-5")} />
              {open && <span>{item.label}</span>}
            </Link>
          );

          if (!open) {
            return (
              <Tooltip key={item.label} delayDuration={0}>
                <TooltipTrigger asChild>{link}</TooltipTrigger>
                <TooltipContent side="right" sideOffset={8}>
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          }

          return <div key={item.label}>{link}</div>;
        })}
      </nav>

      {/* ── Recent Chats ── */}
      {open ? (
        <div className="mt-6 px-3">
          <div className="mb-2 flex items-center gap-2 px-1">
            <MessageSquare className="h-3.5 w-3.5 shrink-0 text-sidebar-foreground/30" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/30">
              Recent Chats
            </span>
          </div>
          <div className="space-y-0.5">
            {RECENT_CHATS.map((chat) => (
              <Link
                key={chat.id}
                href={`/assistant?q=${encodeURIComponent(chat.title)}`}
                className="group flex items-center rounded-lg px-2.5 py-1.5 transition-colors hover:bg-sidebar-accent/60"
              >
                <span className="truncate text-[13px] text-sidebar-foreground/60 group-hover:text-sidebar-foreground">
                  {chat.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-4 flex justify-center">
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <button className="flex h-10 w-10 items-center justify-center rounded-lg text-sidebar-foreground/40 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground">
                <MessageSquare className="h-5 w-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={8}>Recent Chats</TooltipContent>
          </Tooltip>
        </div>
      )}

      <div className="flex-1" />

      <div
        className={cn(
          "border-t border-sidebar-border py-3",
          open ? "px-3" : "flex justify-center px-0"
        )}
      >
        {open ? <ExpandedProfileButton /> : <CollapsedProfileButton />}
      </div>
    </aside>
  );
}
