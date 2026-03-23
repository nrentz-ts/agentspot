"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { usePersona } from "@/lib/persona-context";
import { PERSONA_SKILLS } from "@/lib/persona-skills";

export function ActionCards() {
  const router = useRouter();
  const { persona } = usePersona();
  const [expanded, setExpanded] = useState(false);
  const allSkills = PERSONA_SKILLS[persona.id];

  // 2 rows visible by default, 3 more rows revealed on expand
  const defaultSkills = allSkills.slice(0, 8);
  const extraSkills = allSkills.slice(8, 20);

  function handleClick(query: string) {
    router.push(`/assistant?q=${encodeURIComponent(query)}`);
  }

  const cardClass =
    "group flex flex-col items-start rounded-2xl border border-border bg-card p-5 text-left transition-all duration-150 hover:border-primary/20 hover:shadow-lg active:scale-[0.98]";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {defaultSkills.map((skill) => (
          <button
            key={skill.label}
            onClick={() => handleClick(skill.query)}
            className={cardClass}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              <skill.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-[14px] font-semibold text-foreground">
              {skill.label}
            </h3>
            <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
              {skill.description}
            </p>
          </button>
        ))}
      </div>

      {expanded && extraSkills.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {extraSkills.map((skill) => (
            <button
              key={skill.label}
              onClick={() => handleClick(skill.query)}
              className={cardClass}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <skill.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-[14px] font-semibold text-foreground">
                {skill.label}
              </h3>
              <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                {skill.description}
              </p>
            </button>
          ))}
        </div>
      )}

      <div className="flex justify-center pt-1">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-[14px] font-medium text-primary transition-colors hover:underline"
        >
          {expanded ? "Show less" : "Show more"}
          {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  );
}
