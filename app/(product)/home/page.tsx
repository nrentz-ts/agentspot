"use client";

import { useRouter } from "next/navigation";
import { Hammer } from "lucide-react";
import { WelcomeCard } from "@/components/dashboard/welcome-card";
import { PromptBar } from "@/components/dashboard/prompt-bar";
import { ActionCards } from "@/components/dashboard/action-cards";
import { AgentRoster } from "@/components/dashboard/agent-roster";
import { WorkUpdates } from "@/components/dashboard/work-updates";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-full">
      <div className="flex flex-col items-center bg-gradient-to-b from-blue-100 via-indigo-50/60 to-white px-6 pb-16 pt-[calc(12vh-20px)]">
        <div className="w-full max-w-6xl space-y-[70px]">
          <div className="space-y-[60px]">
            <div className="space-y-4">
              <WelcomeCard />
              <PromptBar onSubmit={(v) => router.push(`/assistant?q=${encodeURIComponent(v)}`)} />
              <div className="flex gap-2">
                {["Summarize today's activity", "What needs my attention?", "Show recent escalations"].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => router.push(`/assistant?q=${encodeURIComponent(chip)}`)}
                    className="rounded-full border border-border bg-white/70 px-4 py-1.5 text-[13px] text-muted-foreground backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-white hover:text-foreground"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
            <WorkUpdates />
          </div>
          <AgentRoster />
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Hammer className="h-4 w-4 text-primary" />
              <h2 className="text-[15px] font-semibold text-foreground">
                More helpers for you
              </h2>
            </div>
            <div className="pt-[10px]">
              <ActionCards />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
