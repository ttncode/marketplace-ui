"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChevronRightIcon, HomeIcon } from "@/components/sites/mcpmarket-com-1a9fdbee/tools-skills-slug-229a0ca0/icons";
import { PlugIcon, SparklesIcon } from "./icons";
import type { SearchType } from "./search-index";

export function SearchBreadcrumbs({ query }: { readonly query: string }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="inline-flex w-fit max-w-full self-start overflow-x-auto rounded-full border border-[var(--design-surface-glass-line)] bg-[var(--design-surface-glass)] px-2.5 py-[5px] font-sans text-[9px] leading-[1.2] font-medium tracking-[0.045em] whitespace-nowrap text-[var(--design-ink-muted)] uppercase backdrop-blur-md [scrollbar-width:none] md:mb-6 [&::-webkit-scrollbar]:hidden"
    >
      <ol className="flex w-max min-w-0 items-center gap-1.5">
        <li className="flex items-center">
          <Link
            href="/"
            className="-ml-1 inline-flex items-center gap-1 rounded-[10px] px-1 py-1 transition-colors hover:bg-black/[0.04] hover:text-[var(--design-ink)]"
          >
            <HomeIcon className="h-3 w-3" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </li>
        <li className="flex min-w-0 items-center gap-1.5">
          <ChevronRightIcon className="h-3 w-3 shrink-0" />
          <span aria-current="page" className="max-w-[150px] truncate px-1 py-1 text-[var(--design-ink-secondary)] sm:max-w-xs">
            {query ? `Search for "${query}"` : "Search"}
          </span>
        </li>
      </ol>
    </nav>
  );
}

const TABS = [
  { type: "mcp", label: "MCP Servers", Icon: PlugIcon },
  { type: "skills", label: "Agent Skills", Icon: SparklesIcon },
] as const;

interface SearchTabsProps {
  readonly active: SearchType;
  readonly onChange: (type: SearchType) => void;
}

/** Radix-style tablist: arrow keys, Home and End move focus and activate. */
export function SearchTabs({ active, onChange }: SearchTabsProps) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const current = TABS.findIndex((tab) => tab.type === active);
    const last = TABS.length - 1;
    const target =
      event.key === "ArrowRight" ? (current + 1) % TABS.length
      : event.key === "ArrowLeft" ? (current + last) % TABS.length
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : -1;
    if (target < 0) return;
    event.preventDefault();
    tabRefs.current[target]?.focus();
    onChange(TABS[target].type);
  };

  return (
    <div className="flex items-center">
      <div
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={handleKeyDown}
        className="inline-flex h-auto items-end justify-center gap-1 overflow-y-hidden border-b border-[#dbdbdb] bg-[rgba(245,245,245,0.5)] p-1 text-[#616161]"
      >
        {TABS.map(({ type, label, Icon }, index) => {
          const selected = type === active;
          return (
            <button
              key={type}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => !selected && onChange(type)}
              className={cn(
                "-mb-px flex items-center justify-center gap-2 border-b-2 border-transparent px-4 py-2 font-sans text-sm leading-5 font-medium whitespace-nowrap ring-offset-[#fbfbfb] transition-[border-color,color] focus-visible:ring-2 focus-visible:ring-[rgba(10,10,10,0.3)] focus-visible:ring-offset-2 focus-visible:outline-none",
                selected && "border-[#0a0a0a] bg-[#fbfbfb] text-[#0a0a0a]",
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface SearchBarProps {
  readonly initialQuery: string;
  readonly placeholder: string;
  readonly onSubmit: (query: string) => void;
  readonly onClear: () => void;
}

export function SearchBar({ initialQuery, placeholder, onSubmit, onClear }: SearchBarProps) {
  const [value, setValue] = useState(initialQuery);

  return (
    <div className="flex-1">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(value);
        }}
      >
        <div className="group relative">
          <input
            type="text"
            name="search"
            autoComplete="off"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={placeholder}
            aria-label={placeholder}
            className="flex h-11 w-full rounded-[12px] border border-[#dbdbdb] bg-white px-12 py-2 font-geist-mono text-sm leading-5 text-[#0a0a0a] ring-offset-[#fbfbfb] backdrop-blur-xl transition-all duration-200 placeholder:text-[rgba(97,97,97,0.5)] hover:border-[rgba(10,10,10,0.2)] focus:border-[rgba(10,10,10,0.3)] focus:ring-1 focus:ring-[rgba(10,10,10,0.1)] focus-visible:border-[rgba(10,10,10,0.25)] focus-visible:bg-[var(--design-glass-focus)] focus-visible:ring-2 focus-visible:ring-[rgba(10,10,10,0.2)] focus-visible:ring-offset-2 focus-visible:outline-none"
          />
          <Search
            aria-hidden
            strokeWidth={2}
            className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-[#616161] transition-colors duration-200 group-focus-within:text-[#0a0a0a] group-hover:text-[#0a0a0a]"
          />
          {value && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                setValue("");
                onClear();
              }}
              className="absolute top-1/2 right-4 -translate-y-1/2 rounded-[12px] p-1 text-[#616161] transition-colors hover:bg-[#f5f5f5] hover:text-[#0a0a0a]"
            >
              <X aria-hidden strokeWidth={2} className="size-4" />
            </button>
          )}
          <button type="submit" className="sr-only" aria-label="Search">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
