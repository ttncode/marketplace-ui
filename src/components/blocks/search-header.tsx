"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { ChevronRightIcon, HomeIcon } from "@/components/icons/breadcrumb-icons";

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
            className="-ml-1 inline-flex items-center gap-1 rounded-[10px] px-1 py-1 transition-colors hover:bg-ink/[0.04] hover:text-[var(--design-ink)]"
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
            className="flex h-11 w-full rounded-[12px] border border-border bg-surface px-12 py-2 font-geist-mono text-sm leading-5 text-ink ring-offset-canvas backdrop-blur-xl transition-all duration-200 placeholder:text-ink-muted/50 hover:border-ink/20 focus:border-ink/30 focus:ring-1 focus:ring-ink/10 focus-visible:border-ink/25 focus-visible:bg-[var(--design-glass-focus)] focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-2 focus-visible:outline-none"
          />
          <Search
            aria-hidden
            strokeWidth={2}
            className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-muted transition-colors duration-200 group-focus-within:text-ink group-hover:text-ink"
          />
          {value && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                setValue("");
                onClear();
              }}
              className="absolute top-1/2 right-4 -translate-y-1/2 rounded-[12px] p-1 text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink"
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
