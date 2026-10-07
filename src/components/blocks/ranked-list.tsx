import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "@/components/blocks/listing-card.module.css";
import type { RankedRow, RankedVariant } from "./ranked-types";

const TOP_RANKS = 3;

/**
 * The default card is a flex column; the compact card is a block whose
 * `h-full` body ignores the 6px dither strip, so its footer sits 6px lower (clipped padding).
 */
const LAYOUT: Record<RankedVariant, { card: string; body: string; description: string }> = {
  default: { card: "flex flex-col", body: "flex-1", description: "flex-1" },
  compact: { card: "", body: "h-full", description: "min-h-10" },
};

/** homepage_rankChip styling; the top three are inverted. */
function RankChip({ rank }: { readonly rank: number }) {
  return (
    <span
      aria-label={`Rank ${rank}`}
      className={cn(
        "inline-flex h-[22px] min-w-[30px] shrink-0 items-center justify-center rounded-[999px] border px-[7px] font-sans text-[9px] leading-none font-semibold tracking-[0.02em] tabular-nums",
        rank <= TOP_RANKS
          ? "border-[var(--design-ink)] bg-[var(--design-ink)] text-[var(--design-surface)]"
          : "border-ink-soft/16 bg-surface-subtle/90 text-[var(--design-ink-muted)]",
      )}
    >
      #{rank}
    </span>
  );
}

/** The listing grid's card (see `ListingCard`) with a rank chip before the avatar. */
function RankedCard({ row, variant }: { readonly row: RankedRow; readonly variant: RankedVariant }) {
  const layout = LAYOUT[variant];
  return (
    <Link id={row.id} href={row.href} className={cn("group block h-full", styles.link)}>
      <div
        className={cn(
          "relative h-full overflow-hidden rounded-[12px] border border-ink-soft/18 bg-surface shadow-[var(--design-shadow-card)] transition-[transform,translate,scale,rotate,border-color,box-shadow] duration-[180ms] ease-[ease] group-hover:-translate-y-px group-hover:border-ink-soft/34 group-hover:bg-accent/94 group-hover:shadow-[var(--design-shadow-card-hover)] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0",
          layout.card,
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "block h-[6px] border-b border-ink-soft/14 bg-surface-muted bg-[length:4px_4px,100%_100%] bg-[position:0_0,0_0] opacity-[0.72]",
            styles.dither,
          )}
        />
        <div className={cn("flex flex-col px-[19px] pt-[18px] pb-[17px]", layout.body)}>
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2.5">
              <RankChip rank={row.rank} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={row.avatar.src}
                alt={row.avatar.alt}
                width={20}
                height={20}
                loading="lazy"
                className="size-5 shrink-0 rounded-full object-cover opacity-[0.72] grayscale transition-[filter,opacity] duration-[180ms] ease-[ease] group-hover:opacity-100 group-hover:grayscale-[0.3] motion-reduce:transition-none"
              />
              <h3 className="line-clamp-1 font-display text-[16px] leading-[24px] font-semibold tracking-[-0.025em] text-ink">
                {row.title}
              </h3>
            </div>
            <ArrowUpRight
              aria-hidden
              className="mt-0.5 size-4 shrink-0 text-ink-soft/38 transition-[color,transform,translate,scale,rotate] duration-[180ms] ease-[ease] group-hover:translate-x-px group-hover:-translate-y-px group-hover:text-ink motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
              strokeWidth={2}
            />
          </div>
          <p className={cn("mb-4 line-clamp-2 font-sans text-[13px] leading-[1.55] text-ink-muted", layout.description)}>{row.description}</p>
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full border border-ink-soft/18 bg-surface/50 px-2.5 py-0.5 font-sans text-[9px] leading-[1.7] font-semibold tracking-[0.055em] text-ink-muted uppercase">
                {row.category}
              </span>
            </div>
            <div className="flex items-center font-sans text-[12px] leading-[16px] text-ink-muted">
              <Star aria-hidden className="mr-1 size-3 fill-ink-muted/30 text-ink-muted" strokeWidth={2} />
              {row.stars}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

interface RankedListProps {
  readonly rows: readonly RankedRow[];
  readonly variant: RankedVariant;
}

export function RankedList({ rows, variant }: RankedListProps) {
  return (
    <main className="flex-1 bg-[var(--design-canvas)] py-8 md:py-12">
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="grid gap-[14px] md:grid-cols-2 lg:grid-cols-3">
          {rows.map((row) => (
            <RankedCard key={row.id} row={row} variant={variant} />
          ))}
        </div>
      </div>
    </main>
  );
}
