"use client";

import { useOptimistic, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { DirectoryCard } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/types";
import { CategoryRail } from "./CategoryRail";
import { SearchBar, SearchBreadcrumbs, SearchTabs } from "./SearchHeader";
import { ResultsSkeleton, SearchResults } from "./SearchResults";
import { SEARCH_CATEGORIES } from "./search-data";
import type { SearchParams } from "./search-index";

const PLACEHOLDERS = { mcp: "Search for MCP servers...", skills: "Search for Agent Skills..." } as const;

/** Builds `/search?…` with the source's alphabetical key order (category_slug, q, type). */
function searchHref({ categorySlug, query, type }: SearchParams): string {
  const params = new URLSearchParams();
  if (categorySlug) params.set("category_slug", categorySlug);
  if (query.trim()) params.set("q", query.trim());
  if (type === "skills") params.set("type", type);
  const search = params.toString();
  return search ? `/search?${search}` : "/search";
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

interface SearchViewProps {
  readonly params: SearchParams;
  readonly cards: readonly DirectoryCard[];
  readonly browse: ReactNode;
}

export function SearchView({ params, cards, browse }: SearchViewProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  // Tabs and chips switch at once, like the source; results follow when the navigation lands.
  const [shown, setShown] = useOptimistic(params);

  const navigate = (next: SearchParams) =>
    startTransition(() => {
      setShown(next);
      router.push(searchHref(next), { scroll: false });
    });

  const category = SEARCH_CATEGORIES.find((candidate) => candidate.slug === shown.categorySlug);
  const placeholder = `${PLACEHOLDERS[shown.type]}${category ? ` ${category.name}` : ""}`;

  const selectCategory = (slug: string) => {
    if (slug === shown.categorySlug) return;
    navigate({ ...params, categorySlug: slug });
    scrollToTop();
  };
  const submitQuery = (query: string) => {
    navigate({ ...params, query, categorySlug: query.trim() ? "" : params.categorySlug });
    scrollToTop();
  };
  const clearSearch = () => {
    navigate({ ...params, query: "", categorySlug: "" });
    scrollToTop();
  };

  return (
    <div className="relative min-h-screen bg-[#fbfbfb] font-sans text-[#0a0a0a] antialiased selection:bg-[rgba(10,10,10,0.1)] selection:text-[#0a0a0a]">
      <header className="sticky top-14 z-40 border-b border-[rgba(219,219,219,0.4)] bg-[rgba(251,251,251,0.9)] backdrop-blur-md md:top-16">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(219,219,219,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(219,219,219,0.5)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,white_60%,transparent)]" />
        <section className="py-4">
          <div className="mx-auto max-w-[1280px] px-6 md:px-8">
            <div className="flex flex-col gap-4">
              <SearchBreadcrumbs query={params.query} />
              <SearchTabs active={shown.type} onChange={(type) => navigate({ ...params, type, categorySlug: "" })} />
              <SearchBar
                key={params.query}
                initialQuery={params.query}
                placeholder={placeholder}
                onSubmit={submitQuery}
                onClear={clearSearch}
              />
            </div>
          </div>
        </section>
        <section className="border-t border-[rgba(219,219,219,0.4)] py-3">
          <div className="mx-auto max-w-[1280px] px-6 md:px-8">
            <div className="flex flex-col gap-3">
              <CategoryRail selectedSlug={shown.categorySlug} onSelect={selectCategory} />
              {params.query && (
                <div className="text-sm leading-5 text-[#616161]">
                  Search results for <span className="font-medium text-[#0a0a0a]">&quot;{params.query}&quot;</span>
                  {category && (
                    <span>
                      {" "}
                      in <span className="font-medium text-[#0a0a0a]">{category.name}</span>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </header>
      <main className="relative">
        <div className="py-8 md:py-12">
          <div className="mx-auto max-w-[1280px] px-6 md:px-8">
            <div className="mb-8">
              {isPending ? (
                <ResultsSkeleton />
              ) : (
                <SearchResults
                  key={searchHref(params)}
                  cards={cards}
                  query={params.query}
                  loadMode={params.type === "skills" ? "scroll" : "button"}
                />
              )}
            </div>
            {!params.query && !shown.categorySlug && shown.type === "mcp" && browse}
          </div>
        </div>
      </main>
    </div>
  );
}
