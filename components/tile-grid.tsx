"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface TileItem {
  id: string;
  name: string;
  description: string;
  color: string;
  emoji: string;
}

interface TileGridProps {
  items: TileItem[];
  emptyMessage?: string;
}

export function TileGrid({ items, emptyMessage = "Nothing here yet." }: TileGridProps) {
  const router = useRouter();

  if (items.length === 0) {
    return (
      <p className="py-12 text-center text-[13px] text-muted-foreground">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => router.push(`/helpers/${item.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`)}
          className="group flex flex-col items-start rounded-2xl border border-border bg-white p-5 text-left transition-all hover:border-primary/20 hover:shadow-lg"
        >
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl text-xl transition-transform group-hover:scale-110",
              item.color
            )}
          >
            {item.emoji}
          </div>
          <h3 className="mt-4 text-[14px] font-semibold text-foreground">
            {item.name}
          </h3>
          <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        </button>
      ))}
    </div>
  );
}
