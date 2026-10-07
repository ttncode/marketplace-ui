import Link from "next/link";
import type { LinkRef } from "@/lib/types";
import { ListingCard, type ListingCardData } from "@/components/blocks/listing-card";
import type { ResultsStatus } from "@/components/blocks/listing-types";

const STATUS_TEXT = "text-sm text-ink-muted";

interface ListingResultsProps {
  readonly listings: readonly ListingCardData[];
  readonly status: ResultsStatus;
  /** Visually hidden crawler pagination; later pages are unbuilt and 404. */
  readonly pageLinks: readonly LinkRef[];
}

export function ListingResults({ listings, status, pageLinks }: ListingResultsProps) {
  return (
    <>
      <div className="sr-only">
        {pageLinks.map((link) => (
          <Link key={link.href} href={link.href} aria-label={link.label} prefetch={false}>
            {link.label}
          </Link>
        ))}
      </div>
      <section className="flex-grow bg-canvas pt-6 pb-10 md:pt-8 md:pb-16">
        <div className="mx-auto max-w-[1280px] px-6 md:px-8">
          <div className="grid gap-[14px] md:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <ListingCard key={listing.slug} listing={listing} />
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center gap-4 pt-6">
            {status === "more" ? (
              <>
                <div className={`text-center ${STATUS_TEXT}`}>{listings.length} results loaded • More available</div>
                <div className="flex items-center justify-center p-4">
                  <p className={STATUS_TEXT}>Scroll for more results...</p>
                </div>
              </>
            ) : (
              <>
                <div className={`text-center ${STATUS_TEXT}`}>{listings.length} results loaded</div>
                <p className={STATUS_TEXT}>All results loaded</p>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
