"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { SEARCH_CATEGORIES } from "./search-data";

const VISIBLE_CHIPS = 5;
const CHIPS = SEARCH_CATEGORIES.slice(0, VISIBLE_CHIPS);
const MENU_ITEMS = SEARCH_CATEGORIES.slice(VISIBLE_CHIPS);

interface CategoryRailProps {
  readonly selectedSlug: string;
  readonly onSelect: (slug: string) => void;
}

/**
 * The menu sits inside the rail's horizontal scroller, so (as on the source) the
 * scroller clips it to a sliver; kept that way for fidelity.
 */
export function CategoryRail({ selectedSlug, onSelect }: CategoryRailProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRoot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnOutsidePress = (event: MouseEvent) => {
      if (!menuRoot.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutsidePress);
    return () => document.removeEventListener("mousedown", closeOnOutsidePress);
  }, []);

  const select = (slug: string) => {
    onSelect(slug);
    setMenuOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {CHIPS.map((category) => {
          const selected = category.slug === selectedSlug;
          return (
            <button
              key={category.slug}
              type="button"
              onClick={() => select(category.slug)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-[12px] border px-4 py-2 font-sans text-sm leading-5 font-normal tracking-[-0.01em] whitespace-nowrap transition-all duration-200",
                selected
                  ? "border-[#0a0a0a] bg-[#0a0a0a] text-white"
                  : "border-[#dbdbdb] bg-white text-[#616161] hover:text-[#0a0a0a]",
              )}
            >
              <span className="truncate">{category.name}</span>
              <span
                className={cn(
                  "inline-flex items-center rounded-full border border-transparent px-1.5 py-0.5 font-sans text-xs leading-4 font-medium transition-colors",
                  selected ? "bg-[rgba(255,255,255,0.2)] text-white" : "bg-[#f5f5f5] text-[#616161]",
                )}
              >
                {category.count}
              </span>
            </button>
          );
        })}
        <div ref={menuRoot} className="relative shrink-0">
          <button
            type="button"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className={cn(
              "flex items-center gap-2 rounded-[12px] border border-[#dbdbdb] px-4 py-2 font-geist-mono text-sm leading-5 font-medium whitespace-nowrap transition-all duration-200",
              menuOpen ? "bg-[#f5f5f5] text-[#0a0a0a]" : "bg-white text-[#616161] hover:text-[#0a0a0a]",
            )}
          >
            <span>More categories</span>
            {menuOpen ? <ChevronUp aria-hidden className="size-4" /> : <ChevronDown aria-hidden className="size-4" />}
          </button>
          {menuOpen && (
            <div className="absolute top-full right-0 z-50 mt-2 max-h-[80vh] w-64 origin-top-right animate-in overflow-y-auto rounded-[12px] border border-[#dbdbdb] bg-white p-2 duration-200 fade-in zoom-in-95">
              <div className="space-y-1">
                {MENU_ITEMS.map((category) => (
                  <button
                    key={category.slug}
                    type="button"
                    onClick={() => select(category.slug)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-[12px] px-3 py-2 text-left font-sans text-sm leading-5 font-normal tracking-[-0.01em] transition-all duration-200",
                      category.slug === selectedSlug
                        ? "bg-[#f5f5f5] text-[#0a0a0a]"
                        : "text-[#616161] hover:bg-[#fbfbfb] hover:text-[#0a0a0a]",
                    )}
                  >
                    <span className="truncate pr-2">{category.name}</span>
                    <span className="inline-flex items-center rounded-full border border-transparent bg-[#f5f5f5] px-2.5 py-0.5 text-xs leading-4 font-medium text-[#616161]">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
