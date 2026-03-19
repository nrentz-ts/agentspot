"use client";

import { useRouter } from "next/navigation";
import { Bot, Users, MessageSquare, ArrowRight } from "lucide-react";
import { usePersona } from "@/lib/persona-context";
import { PERSONA_DASHBOARD_DATA } from "@/lib/persona-data";
import { PERSONA_HELPERS } from "@/lib/agents-data";

export function AgentPerformance() {
  const router = useRouter();
  const { persona } = usePersona();
  const agents = PERSONA_DASHBOARD_DATA[persona.id].agents;

  const tabData = PERSONA_HELPERS[persona.id];
  const allHelperItems = [...tabData.mine, ...tabData.shared, ...tabData.community];
  const getAgentId = (name: string) => allHelperItems.find((a) => a.name === name)?.id;

  const totalEngagements = agents.reduce((sum, a) => sum + a.interactions, 0);
  const totalUsers = agents.reduce((sum, a) => sum + a.users, 0);

  const stats = [
    { label: "Active helpers", value: agents.length },
    { label: "Total engagements", value: totalEngagements.toLocaleString() },
    { label: "Users served", value: totalUsers },
  ];

  return (
    <div className="flex flex-col rounded-xl border border-border bg-white">
      <div className="flex items-center gap-2 px-5 pt-5 pb-4">
        <Bot className="h-4 w-4 text-primary" />
        <h2 className="text-[16px] font-semibold">Your Helpers</h2>
      </div>

      <div className="grid grid-cols-3 gap-3 px-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg bg-muted/40 px-3 py-2.5 text-center"
          >
            <p className="text-xl font-bold text-foreground">{stat.value}</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex-1 divide-y divide-border border-t border-border">
        {agents.map((agent) => (
          <button
            key={agent.name}
            onClick={() => {
              const id = getAgentId(agent.name);
              if (id) router.push(`/helpers/${id}`);
            }}
            className="flex w-full items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-muted/20"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Bot className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold">{agent.name}</p>
              <p className="truncate text-[11px] text-muted-foreground">
                {agent.description}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 text-muted-foreground/60" />
                <span className="text-[11px] font-medium text-foreground/70">
                  {agent.users}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3 text-muted-foreground/60" />
                <span className="text-[11px] font-medium text-foreground/70">
                  {agent.interactions.toLocaleString()}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="border-t border-border px-5 py-3">
        <button className="flex items-center gap-1 text-[12px] font-medium text-primary hover:underline">
          Manage helpers <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
