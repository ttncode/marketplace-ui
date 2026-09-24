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
      <div className="group relative overflow-hidden rounded-[10px] bg-[rgba(255,255,255,0.78)] shadow-[0_18px_42px_rgba(10,10,10,0.1),inset_0_1px_0_rgba(255,255,255,0.64),inset_0_-1px_0_rgba(34,34,34,0.06)] backdrop-blur-[14px] backdrop-saturate-[0.86] transition-[background-color,box-shadow] duration-[180ms] ease-[ease] focus-within:bg-[rgba(255,255,255,0.9)] focus-within:shadow-[0_20px_46px_rgba(34,34,34,0.16),inset_0_1px_0_rgba(255,255,255,0.42),inset_0_-1px_0_rgba(34,34,34,0.08)] motion-reduce:transition-none">
        <input
          type="text"
          name="search"
          autoComplete="off"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className="flex h-[52px] w-full rounded-[10px] border-0 bg-transparent px-12 py-2 font-sans text-sm leading-5 tracking-[-0.14px] text-[#0a0a0a] shadow-none outline-none placeholder:text-[rgba(34,34,34,0.48)]"
        />
        <Search
          aria-hidden="true"
          strokeWidth={2}
          className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-[rgba(34,34,34,0.58)]"
        />
        {query ? (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setQuery("")}
            className="absolute top-1/2 right-4 -translate-y-1/2 rounded-[12px] p-1 text-[#616161] transition-colors duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[#f5f5f5] hover:text-[#0a0a0a] motion-reduce:transition-none"
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
