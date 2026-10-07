"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

export function ListingSearch({ placeholder }: { readonly placeholder: string }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form role="search" onSubmit={handleSubmit} className="mt-6 w-full max-w-[576px]">
      <div className="group relative overflow-hidden rounded-[10px] bg-surface/78 shadow-[var(--design-shadow-hero-search)] backdrop-blur-[14px] backdrop-saturate-[0.86] transition-[background-color,box-shadow] duration-[180ms] ease-[ease] focus-within:bg-surface/90 focus-within:shadow-[var(--design-shadow-hero-search-focus)] motion-reduce:transition-none">
        <input
          type="text"
          name="search"
          autoComplete="off"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className="flex h-[52px] w-full rounded-[10px] border-0 bg-transparent px-12 py-2 font-sans text-sm leading-5 tracking-[-0.14px] text-ink shadow-none outline-none placeholder:text-ink-soft/48"
        />
        <Search
          aria-hidden="true"
          strokeWidth={2}
          className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-soft/58"
        />
        {query ? (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setQuery("")}
            className="absolute top-1/2 right-4 -translate-y-1/2 rounded-[12px] p-1 text-ink-muted transition-colors duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-surface-muted hover:text-ink motion-reduce:transition-none"
          >
            <X aria-hidden="true" strokeWidth={2} className="size-4" />
          </button>
        ) : null}
        <button type="submit" className="sr-only">
          Search
        </button>
      </div>
    </form>
  );
}
