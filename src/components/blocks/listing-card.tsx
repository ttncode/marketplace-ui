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
      <div className="relative flex h-full flex-col overflow-hidden rounded-[12px] border border-[rgba(34,34,34,0.18)] bg-white shadow-[0_12px_34px_rgba(10,10,10,0.04)] transition-[transform,translate,scale,rotate,border-color,box-shadow] duration-[180ms] ease-[ease] group-hover:-translate-y-px group-hover:border-[rgba(34,34,34,0.34)] group-hover:bg-[rgba(242,242,242,0.94)] group-hover:shadow-[0_16px_36px_rgba(34,34,34,0.07)] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
        <span
          className={cn(
            "block h-[6px] border-b border-[rgba(34,34,34,0.14)] bg-[#f5f5f5] bg-[length:4px_4px,100%_100%] bg-[position:0_0,0_0] opacity-[0.72]",
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
                  className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#f5f5f5] font-sans text-[10px] leading-none font-semibold text-[#616161] uppercase"
                >
                  {listing.name.charAt(0)}
                </span>
              )}
              <h3 className="line-clamp-1 font-display text-[16px] leading-[24px] font-semibold tracking-[-0.025em] text-[#0a0a0a]">
                {listing.name}
              </h3>
            </div>
            <ArrowUpRight
              aria-hidden
              className="mt-0.5 size-4 shrink-0 text-[rgba(34,34,34,0.38)] transition-[color,transform,translate,scale,rotate] duration-[180ms] ease-[ease] group-hover:translate-x-px group-hover:-translate-y-px group-hover:text-[#0a0a0a] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
              strokeWidth={2}
            />
          </div>
          <p className="mb-4 line-clamp-2 flex-1 font-sans text-[13px] leading-[1.55] text-[#626262]">
            {listing.summary}
          </p>
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              {listing.tags.slice(0, MAX_TAGS).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-[rgba(34,34,34,0.18)] bg-[rgba(255,255,255,0.5)] px-2.5 py-0.5 font-sans text-[9px] leading-[1.7] font-semibold tracking-[0.055em] text-[#626262] uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
            {listing.stars ? (
              <div className="flex items-center font-sans text-[12px] leading-[16px] text-[#626262]">
                <Star aria-hidden className="mr-1 size-3 fill-[rgba(97,97,97,0.3)] text-[#616161]" strokeWidth={2} />
                {listing.stars}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
}
