"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, Globe } from "lucide-react";
import { usePersona } from "@/lib/persona-context";
import { PERSONA_SKILLS } from "@/lib/persona-skills";

export function ActionCards() {
  const router = useRouter();
  const { persona } = usePersona();
  const [expanded, setExpanded] = useState(false);
  const allSkills = PERSONA_SKILLS[persona.id];
  const firstRow = allSkills.slice(0, 4);
  const extraSkills = allSkills.slice(4, 11);

  function handleClick(query: string) {
    router.push(`/assistant?q=${encodeURIComponent(query)}`);
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {firstRow.map((skill) => (
          <button
            key={skill.label}
            onClick={() => handleClick(skill.query)}
            className="group flex flex-col gap-3 rounded-xl border border-white/80 bg-white/60 p-4 text-left backdrop-blur-sm transition-all duration-150 hover:border-primary/20 hover:bg-white/90 hover:shadow-md active:scale-[0.98]"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              <skill.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[14px] font-semibold leading-snug text-foreground">
                {skill.label}
              </p>
              <p className="mt-0.5 text-[14px] leading-snug text-muted-foreground">
                {skill.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      {expanded && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {extraSkills.map((skill) => (
            <button
              key={skill.label}
              onClick={() => handleClick(skill.query)}
              className="group flex flex-col gap-3 rounded-xl border border-white/80 bg-white/60 p-4 text-left backdrop-blur-sm transition-all duration-150 hover:border-primary/20 hover:bg-white/90 hover:shadow-md active:scale-[0.98]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <skill.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[14px] font-semibold leading-snug text-foreground">
                  {skill.label}
                </p>
                <p className="mt-0.5 text-[14px] leading-snug text-muted-foreground">
                  {skill.description}
                </p>
              </div>
            </button>
          ))}
          <a
            href="#"
            className="group flex flex-col gap-3 rounded-xl border border-dashed border-primary/30 bg-primary/[0.03] p-4 text-left backdrop-blur-sm transition-all duration-150 hover:border-primary/50 hover:bg-primary/[0.07] hover:shadow-md active:scale-[0.98]"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              <Globe className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[14px] font-semibold leading-snug text-primary">
                Community gallery
              </p>
              <p className="mt-0.5 text-[14px] leading-snug text-muted-foreground">
                See what the community is building &rarr;
              </p>
            </div>
          </a>
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-[14px] font-medium text-primary transition-colors hover:underline"
        >
          {expanded ? "Show less" : "Show more examples"}
          {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </button>
      </div>
    </div>
  );
}
