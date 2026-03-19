export type ActionCategory = "helper" | "workflow" | "task";

export interface Persona {
  id: string;
  label: string;
  subtitle: string;
}

export const PERSONAS: Persona[] = [
  { id: "hr",          label: "Human Resources", subtitle: "Streamline people operations and hiring"      },
  { id: "marketing",   label: "Marketing",        subtitle: "Create content and track campaign performance" },
  { id: "sales",       label: "Sales",            subtitle: "Close deals faster and manage your pipeline"  },
  { id: "engineering", label: "Engineering",      subtitle: "Ship faster with less overhead"               },
  { id: "leadership",  label: "Leadership",       subtitle: "Stay on top of your team and strategy"        },
  { id: "finance",     label: "Finance",          subtitle: "Automate financial operations and reporting"   },
];
