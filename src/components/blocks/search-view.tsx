"use client";

import { useOptimistic, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { ListingCardData } from "@/components/blocks/listing-card";
import { CategoryRail } from "./search-category-rail";
import { SearchBar, SearchBreadcrumbs } from "./search-header";
import { ResultsSkeleton, SearchResults } from "./search-results";
import type { SearchParams } from "@/lib/search-index";
import type { Category } from "@/lib/types";

function searchHref({ categorySlug, query }: SearchParams): string {
  const params = new URLSearchParams();
  if (categorySlug) params.set("category", categorySlug);
  if (query.trim()) params.set("q", query.trim());
  const search = params.toString();
  return search ? `/search?${search}` : "/search";
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

interface SearchViewProps {
  readonly params: SearchParams;
  readonly listings: readonly ListingCardData[];
  readonly categories: readonly Category[];
  readonly browse: ReactNode;
}

export function SearchView({ params, listings, categories, browse }: SearchViewProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  // Chips switch at once; results follow when the navigation lands.
  const [shown, setShown] = useOptimistic(params);

  const navigate = (next: SearchParams) =>
    startTransition(() => {
      setShown(next);
      router.push(searchHref(next), { scroll: false });
    });

  const category = categories.find((candidate) => candidate.slug === shown.categorySlug);
  const placeholder = `Search listings${category ? ` in ${category.name}` : ""}...`;

  const selectCategory = (slug: string) => {
    if (slug === shown.categorySlug) return;
    navigate({ ...params, categorySlug: slug });
    scrollToTop();
  };
  const submitQuery = (query: string) => {
    navigate({ ...params, query });
    scrollToTop();
  };
  const clearSearch = () => {
    navigate({ ...params, query: "", categorySlug: "" });
    scrollToTop();
  };

  return (
    <div className="relative min-h-screen bg-canvas font-sans text-ink antialiased selection:bg-ink/10 selection:text-ink">
      <header className="sticky top-14 z-40 border-b border-border/40 bg-canvas/90 backdrop-blur-md md:top-16">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--border)_50%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--border)_50%,transparent)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,white_60%,transparent)]" />
        <section className="py-4">
          <div className="mx-auto max-w-[1280px] px-6 md:px-8">
            <div className="flex flex-col gap-4">
              <SearchBreadcrumbs query={params.query} />
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
        <section className="border-t border-border/40 py-3">
          <div className="mx-auto max-w-[1280px] px-6 md:px-8">
            <div className="flex flex-col gap-3">
              <CategoryRail categories={categories} selectedSlug={shown.categorySlug} onSelect={selectCategory} />
              {params.query && (
                <div className="text-sm leading-5 text-ink-muted">
                  Search results for <span className="font-medium text-ink">&quot;{params.query}&quot;</span>
                  {category && (
                    <span>
                      {" "}
                      in <span className="font-medium text-ink">{category.name}</span>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </header>
      <div className="relative">
        <div className="py-8 md:py-12">
          <div className="mx-auto max-w-[1280px] px-6 md:px-8">
            <div className="mb-8">
              {isPending ? (
                <ResultsSkeleton />
              ) : (
                <SearchResults
                  key={searchHref(params)}
                  listings={listings}
                  query={params.query}
                />
              )}
            </div>
            {!params.query && !shown.categorySlug && browse}
          </div>
        </div>
      </div>
    </div>
  );
}
