"use client";

import { useState } from "react";
import { Hash, MessageSquare, ArrowRight, Plug } from "lucide-react";
import { usePersona } from "@/lib/persona-context";
import { PERSONA_DASHBOARD_DATA } from "@/lib/persona-data";

function SlackDisconnected({ onConnect }: { onConnect: () => void }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-border bg-muted/20 px-6 py-8 text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
        <MessageSquare className="h-5 w-5 text-muted-foreground/60" />
      </div>
      <p className="mt-3 text-[13px] text-muted-foreground">
        Slack is not connected yet
      </p>
      <p className="mt-1 text-[11px] text-muted-foreground/50">
        Automate workflows and get summaries directly from your Slack channels.
      </p>
      <button
        onClick={onConnect}
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
      >
        <Plug className="h-3.5 w-3.5" />
        Connect to Slack
      </button>
    </div>
  );
}

function SlackConnected() {
  const { persona } = usePersona();
  const updates = PERSONA_DASHBOARD_DATA[persona.id].slackUpdates;

  return (
    <div className="divide-y divide-border rounded-xl border border-border bg-white">
      {updates.map((update, i) => (
        <div
          key={i}
          className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-muted/30"
        >
          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted">
            <Hash className="h-3 w-3 text-muted-foreground" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-semibold text-foreground">
                #{update.channel}
              </span>
              {update.unread && (
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              )}
              <span className="ml-auto shrink-0 text-[11px] text-muted-foreground/50">
                {update.time}
              </span>
            </div>
            <p className="mt-0.5 truncate text-[13px] text-muted-foreground">
              {update.message}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SlackUpdates() {
  const [connected, setConnected] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-primary" />
          <h2 className="text-[14px] font-semibold">Slack Updates</h2>
        </div>
        {connected && (
          <button className="flex items-center gap-1 text-[12px] text-primary hover:underline">
            View all <ArrowRight className="h-3 w-3" />
          </button>
        )}
      </div>
      {connected ? (
        <SlackConnected />
      ) : (
        <SlackDisconnected onConnect={() => setConnected(true)} />
      )}
    </div>
  );
}
