"use client";

import { Workflow, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TileGrid } from "@/components/tile-grid";
import { AutomationActivity } from "@/components/dashboard/automation-activity";
import { usePersona } from "@/lib/persona-context";
import { PERSONA_WORKFLOWS } from "@/lib/workflows-data";

export default function WorkflowsPage() {
  const { persona } = usePersona();
  const data = PERSONA_WORKFLOWS[persona.id];

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Workflow className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Workflows</h1>
            <p className="text-[13px] text-muted-foreground">
              Multi-step automations that run on your behalf
            </p>
          </div>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-90">
          <Plus className="h-4 w-4" />
          New Workflow
        </button>
      </div>

      <Tabs defaultValue="activity" className="mt-8">
        <TabsList>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="mine">My Workflows</TabsTrigger>
          <TabsTrigger value="shared">Shared with Me</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>
        <TabsContent value="activity" className="mt-6">
          <div className="max-w-2xl">
            <AutomationActivity />
          </div>
        </TabsContent>
        <TabsContent value="mine" className="mt-6">
          <TileGrid items={data.mine} emptyMessage="You haven't created any workflows yet." />
        </TabsContent>
        <TabsContent value="shared" className="mt-6">
          <TileGrid items={data.shared} emptyMessage="No workflows have been shared with you." />
        </TabsContent>
        <TabsContent value="community" className="mt-6">
          <TileGrid items={data.community} emptyMessage="No community workflows available." />
        </TabsContent>
      </Tabs>
    </div>
  );
}
