import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "@/components/blocks/listing-card.module.css";
import type { Listing } from "@/lib/types";

const MAX_TAGS = 3;

export type ListingCardData = Pick<Listing, "slug" | "name" | "summary" | "icon" | "tags" | "stars">;

export function ListingCard({ listing }: { readonly listing: ListingCardData }) {
  return (
    <Link href={`/item/${listing.slug}`} className={cn("group block h-full", styles.link)}>
      <div className="relative flex h-full flex-col overflow-hidden rounded-[12px] border border-ink-soft/18 bg-surface shadow-[var(--design-shadow-card)] transition-[transform,translate,scale,rotate,border-color,box-shadow] duration-[180ms] ease-[ease] group-hover:-translate-y-px group-hover:border-ink-soft/34 group-hover:bg-accent/94 group-hover:shadow-[var(--design-shadow-card-hover)] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
        <span
          className={cn(
            "block h-[6px] border-b border-ink-soft/14 bg-surface-muted bg-[length:4px_4px,100%_100%] bg-[position:0_0,0_0] opacity-[0.72]",
            styles.dither,
          )}
        />
        <div className="flex flex-1 flex-col px-[19px] pt-[18px] pb-[17px]">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2.5">
              {listing.icon ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={listing.icon.src}
                  alt={listing.icon.alt}
                  width={20}
                  height={20}
                  loading="lazy"
                  className="size-5 shrink-0 rounded-full object-cover opacity-[0.72] grayscale transition-[filter,opacity] duration-[180ms] ease-[ease] group-hover:opacity-100 group-hover:grayscale-[0.3] motion-reduce:transition-none"
                />
              ) : (
                <span
                  aria-hidden
                  className="flex size-5 shrink-0 items-center justify-center rounded-full bg-surface-muted font-sans text-[10px] leading-none font-semibold text-ink-muted uppercase"
                >
                  {listing.name.charAt(0)}
                </span>
              )}
              <h3 className="line-clamp-1 font-display text-[16px] leading-[24px] font-semibold tracking-[-0.025em] text-ink">
                {listing.name}
              </h3>
            </div>
            <ArrowUpRight
              aria-hidden
              className="mt-0.5 size-4 shrink-0 text-ink-soft/38 transition-[color,transform,translate,scale,rotate] duration-[180ms] ease-[ease] group-hover:translate-x-px group-hover:-translate-y-px group-hover:text-ink motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
              strokeWidth={2}
            />
          </div>
          <p className="mb-4 line-clamp-2 flex-1 font-sans text-[13px] leading-[1.55] text-ink-muted">
            {listing.summary}
          </p>
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              {listing.tags.slice(0, MAX_TAGS).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-ink-soft/18 bg-surface/50 px-2.5 py-0.5 font-sans text-[9px] leading-[1.7] font-semibold tracking-[0.055em] text-ink-muted uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
            {listing.stars ? (
              <div className="flex items-center font-sans text-[12px] leading-[16px] text-ink-muted">
                <Star aria-hidden className="mr-1 size-3 fill-ink-muted/30 text-ink-muted" strokeWidth={2} />
                {listing.stars}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
}
