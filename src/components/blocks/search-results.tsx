"use client";

import { useCallback, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ListingCard, type ListingCardData } from "@/components/blocks/listing-card";
import styles from "@/components/blocks/listing-card.module.css";
import { SECONDARY_FACE, SECONDARY_SHELL } from "@/components/ui/texture-button";

const PAGE_SIZE = 21;
const NEXT_PAGE_SKELETONS = 3;
const INITIAL_SKELETONS = 9;
// Stands in for the network round-trip so the "loading more" state stays visible.
const LOAD_MORE_DELAY_MS = 400;
const STATUS_TEXT = "text-sm leading-5 text-[#616161]";
const BAR = "rounded-[10px] bg-[#f5f5f5] motion-safe:animate-pulse";

function Spinner({ label, className }: { readonly label: string; readonly className?: string }) {
  return (
    <span role="status" aria-live="polite" className={cn("inline-flex items-center justify-center text-sm", className)}>
      <LoaderCircle aria-hidden className="mr-2 size-4 rounded-full motion-safe:animate-spin" strokeWidth={2} />
      {label}
    </span>
  );
}

/** Placeholder appended to the grid while the next page loads. */
function NextPageSkeleton() {
  return (
    <div aria-hidden className="h-full overflow-hidden rounded-[12px] border border-[rgba(34,34,34,0.18)] bg-white shadow-[0_12px_34px_rgba(10,10,10,0.04)]">
      <span className={cn("block h-[6px] border-b border-[rgba(34,34,34,0.14)] bg-[#f5f5f5] bg-[length:4px_4px,100%_100%] opacity-[0.72]", styles.dither)} />
      <div className="px-[19px] pt-[18px] pb-[17px]">
        <div className="mb-3 flex items-center justify-between">
          <div className={cn(BAR, "h-4 w-32")} />
          <div className={cn(BAR, "size-4")} />
        </div>
        <div className="mb-4 space-y-2">
          <div className={cn(BAR, "h-3 w-full")} />
          <div className={cn(BAR, "h-3 w-4/5")} />
        </div>
        <div className="flex items-center justify-between">
          <div className="h-4 w-16 rounded-[12px] bg-[#f5f5f5] motion-safe:animate-pulse" />
          <div className={cn(BAR, "h-3 w-10")} />
        </div>
      </div>
    </div>
  );
}

function InitialSkeletonCard() {
  return (
    <div className="h-full rounded-2xl border border-[var(--design-surface-glass-line)] bg-[var(--design-surface-glass)] text-[#0a0a0a] backdrop-blur-md">
      <div className="p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="size-10 rounded-[12px] bg-[#f5f5f5] motion-safe:animate-pulse" />
          <div className="min-w-0 flex-1">
            <div className={cn(BAR, "mb-1 h-5 w-32")} />
          </div>
          <div className={cn(BAR, "h-4 w-12")} />
        </div>
        <div className="mb-4 space-y-2">
          <div className={cn(BAR, "h-4 w-full")} />
          <div className={cn(BAR, "h-4 w-4/5")} />
        </div>
        <div className="h-6 w-20 rounded-full bg-[#f5f5f5] motion-safe:animate-pulse" />
      </div>
    </div>
  );
}

/** Shown while a tab, category or query change is in flight. */
export function ResultsSkeleton() {
  return (
    <div role="status" aria-busy="true" aria-live="polite" aria-label="Loading results" className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: INITIAL_SKELETONS }, (_, index) => (
        <InitialSkeletonCard key={index} />
      ))}
    </div>
  );
}

function NoResults({ query }: { readonly query: string }) {
  return (
    <div className="py-12 text-center">
      <h3 className="text-lg leading-7 font-medium">No results found</h3>
      <p className="mt-2 text-[#616161]">
        {query ? (
          <>
            No results found for “{query}”.
            <br />
            Try a different search or category.
          </>
        ) : (
          "No listings found. Try a different category or search."
        )}
      </p>
    </div>
  );
}

interface SearchResultsProps {
  readonly listings: readonly ListingCardData[];
  readonly query: string;
}

export function SearchResults({ listings, query }: SearchResultsProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const shown = listings.slice(0, visibleCount);
  const hasMore = visibleCount < listings.length;

  // The button is disabled while loading, so no re-entry guard.
  const loadMore = useCallback(() => {
    setLoading(true);
    window.setTimeout(() => {
      setVisibleCount((count) => count + PAGE_SIZE);
      setLoading(false);
    }, LOAD_MORE_DELAY_MS);
  }, []);

  if (listings.length === 0) return <NoResults query={query} />;

  return (
    <div>
      <div className="grid gap-[14px] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((listing) => (
          <ListingCard key={listing.slug} listing={listing} />
        ))}
        {loading &&
          Array.from({ length: NEXT_PAGE_SKELETONS }, (_, index) => <NextPageSkeleton key={index} />)}
      </div>
      <div className="mt-8 flex flex-col items-center gap-4 pt-6">
        {hasMore && (
          <button type="button" onClick={loadMore} disabled={loading} className={cn(SECONDARY_SHELL, "w-fit")}>
            <span className={cn(SECONDARY_FACE, "text-sm leading-5")}>
              {loading ? <Spinner label="Loading..." className="text-inherit" /> : "Load More Results"}
            </span>
          </button>
        )}
        {!hasMore && !loading && <p className={STATUS_TEXT}>All results loaded</p>}
      </div>
    </div>
  );
}
