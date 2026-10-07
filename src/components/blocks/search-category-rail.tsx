"use client";

import { cn } from "@/lib/utils";
import type { Category } from "@/lib/types";

interface CategoryRailProps {
  readonly categories: readonly Category[];
  readonly selectedSlug: string;
  readonly onSelect: (slug: string) => void;
}

export function CategoryRail({ categories, selectedSlug, onSelect }: CategoryRailProps) {
  return (
    <div className="relative">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {[{ slug: "", name: "All" }, ...categories].map((category) => {
          const selected = category.slug === selectedSlug;
          return (
            <button
              key={category.slug}
              type="button"
              onClick={() => onSelect(category.slug)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-[12px] border px-4 py-2 font-sans text-sm leading-5 font-normal tracking-[-0.01em] whitespace-nowrap transition-all duration-200",
                selected
                  ? "border-[#0a0a0a] bg-[#0a0a0a] text-white"
                  : "border-[#dbdbdb] bg-white text-[#616161] hover:text-[#0a0a0a]",
              )}
            >
              <span className="truncate">{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
