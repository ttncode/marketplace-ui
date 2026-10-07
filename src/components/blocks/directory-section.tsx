import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ListingCard, type ListingCardData } from "@/components/blocks/listing-card";
import type { LinkRef } from "@/lib/types";

const TONE_BACKGROUND = { canvas: "bg-canvas", subtle: "bg-surface-subtle" } as const;

const PILL_LINK =
  "rounded-full border border-ink/14 bg-surface/42 font-sans text-[11px] tracking-[0.02em] text-ink-muted transition-colors duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-ink-soft/40 hover:bg-surface-subtle hover:text-ink motion-reduce:transition-none";

const TITLE =
  "font-display text-[clamp(24px,2.3vw,34px)] leading-[28px] font-normal tracking-[-0.045em] text-ink md:leading-[32px]";

export function DirectorySection({
  title,
  badge,
  viewAll,
  listings,
  tone,
}: {
  readonly title: string;
  readonly badge?: LinkRef;
  readonly viewAll: LinkRef;
  readonly listings: readonly ListingCardData[];
  readonly tone: "canvas" | "subtle";
}) {
  return (
    <section
      className={cn(
        "border-b border-ink/14 py-8 font-sans text-ink md:py-12",
        TONE_BACKGROUND[tone],
      )}
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="mb-[22px] flex flex-col justify-between gap-4 md:mb-[30px] md:flex-row md:items-end">
          <div>
            {badge ? (
              <div className="mb-1 flex items-center gap-3">
                <h2 className={TITLE}>
                  <span>{title}</span>
                </h2>
                <a
                  href={badge.href}
                  className={cn(PILL_LINK, "inline-flex items-center px-2 py-0.5 leading-[16.5px] font-medium uppercase")}
                >
                  {badge.label}
                </a>
              </div>
            ) : (
              <h2 className={cn(TITLE, "mb-1")}>
                <span>{title}</span>
              </h2>
            )}
          </div>
          <a
            href={viewAll.href}
            className={cn(PILL_LINK, "group inline-flex h-[34px] items-center gap-1.5 px-3 py-1.5 leading-[20px]")}
          >
            {viewAll.label}
            <ArrowRight
              aria-hidden
              className="size-3.5 transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
              strokeWidth={2}
            />
          </a>
        </div>
        <div className="grid gap-[14px] md:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing.slug} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
}
