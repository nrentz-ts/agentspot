"use client";

import { useRouter } from "next/navigation";
import { WelcomeCard } from "@/components/dashboard/welcome-card";
import { PromptBar } from "@/components/dashboard/prompt-bar";
import { AgentRoster } from "@/components/dashboard/agent-roster";
import { WorkflowStrip } from "@/components/dashboard/workflow-strip";
import { RecentAgentActivity } from "@/components/dashboard/recent-agent-activity";
import { useVariant } from "@/lib/variant-context";

export default function HomePage() {
  const router = useRouter();
  const { variant } = useVariant();

  return (
    <div className="min-h-full bg-background" style={{
      backgroundImage: [
        "radial-gradient(ellipse 70% 50% at 15% 0%, rgba(186,196,255,0.25) 0%, transparent 65%)",
        "radial-gradient(ellipse 55% 45% at 85% 5%, rgba(200,215,255,0.18) 0%, transparent 60%)",
        "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(214,222,255,0.15) 0%, transparent 70%)",
      ].join(", "),
    }}>
      <div className="flex flex-col items-center px-6 pb-16 pt-[calc(12vh-20px)]">
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
          </div>
          <AgentRoster />
          {variant.showWorkflowStrip && <WorkflowStrip />}
          <div className="space-y-3">
            <h2 className="text-[15px] font-semibold text-foreground">Activity Monitor</h2>
            <RecentAgentActivity />
          </div>
        </div>
      </div>
    </div>
  );
}
