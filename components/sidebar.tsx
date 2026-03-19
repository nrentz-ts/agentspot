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
  UserCircle,
  Blocks,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/lib/sidebar-context";
import { usePersona } from "@/lib/persona-context";
import { PERSONAS } from "@/lib/personas";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ConnectorsDialog } from "@/components/connectors-dialog";

const NAV_ITEMS = [
  { label: "Home",     href: "/home",    icon: Home,     enabled: true },
  { label: "Helpers",  href: "/helpers", icon: Bot,      enabled: true },
  { label: "Activity", href: "/activity",icon: Activity, enabled: true },
];

function ProfileMenu({ onClose, onOpenConnectors }: { onClose: () => void; onOpenConnectors: () => void }) {
  const { persona, setPersona } = usePersona();
  const [showPersonas, setShowPersonas] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute bottom-full left-0 z-50 mb-2 w-56 rounded-xl border border-border bg-white p-1.5 shadow-lg">
        <button
          onClick={() => {
            onClose();
            onOpenConnectors();
          }}
          className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] text-foreground/70 transition-colors hover:bg-muted"
        >
          <Blocks className="h-4 w-4 text-muted-foreground" />
          <span>My Connectors</span>
        </button>

        <button
          onClick={() => {
            router.push("/workflows");
            onClose();
          }}
          className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] text-foreground/70 transition-colors hover:bg-muted"
        >
          <Workflow className="h-4 w-4 text-muted-foreground" />
          <span>Workflows</span>
        </button>

        <div className="my-1 border-t border-border" />

        <button
          onClick={() => {
            router.push("/");
            onClose();
          }}
          className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] text-foreground/70 transition-colors hover:bg-muted"
        >
          <Globe className="h-4 w-4 text-muted-foreground" />
          <span>View Marketing Site</span>
        </button>

        <div className="my-1 border-t border-border" />

        <div
          className="relative"
          onMouseEnter={() => setShowPersonas(true)}
          onMouseLeave={() => setShowPersonas(false)}
        >
          <button
            onClick={() => setShowPersonas(!showPersonas)}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] text-foreground/70 transition-colors hover:bg-muted",
              showPersonas && "bg-muted"
            )}
          >
            <UserCircle className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-1 flex-col">
              <span>Persona</span>
              <span className="text-[11px] text-muted-foreground/50">{persona.label}</span>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40" />
          </button>

          {showPersonas && (
            <div className="absolute bottom-0 left-full -ml-1 w-48 rounded-xl border border-border bg-white p-1.5 pl-2.5 shadow-lg">
              {PERSONAS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setPersona(p.id);
                    onClose();
                  }}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[12px] transition-colors",
                    persona.id === p.id
                      ? "bg-primary/8 font-medium text-primary"
                      : "text-foreground/60 hover:bg-muted"
                  )}
                >
                  <span className="flex-1">{p.label}</span>
                  {persona.id === p.id && <Check className="h-3 w-3" />}
                </button>
              ))}
            </div>
          )}
        </div>

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

  return (
    <aside
      className={cn(
        "flex h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-all duration-200 ease-in-out",
        open ? "w-[220px]" : "w-[60px]"
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
              SpotterWork
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
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);

          const link = (
            <Link
              href={item.enabled ? item.href : "#"}
              className={cn(
                "flex items-center rounded-lg font-medium transition-all duration-150",
                open
                  ? "gap-3 px-3 py-2.5 text-[14px]"
                  : "h-10 w-10 justify-center",
                isActive && item.enabled
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
              )}
              onClick={(e) => !item.enabled && e.preventDefault()}
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
