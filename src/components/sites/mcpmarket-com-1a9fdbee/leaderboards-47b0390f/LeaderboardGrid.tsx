import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "@/components/sites/mcpmarket-com-1a9fdbee/shared/DirectoryCard.module.css";
import type { LeaderboardRow, LeaderboardVariant } from "./types";

const TOP_RANKS = 3;

/**
 * The server board's card is a flex column; the skill board's card is a block whose
 * `h-full` body ignores the 6px dither strip, so its footer sits 6px lower (clipped padding).
 */
const LAYOUT: Record<LeaderboardVariant, { card: string; body: string; description: string }> = {
  server: { card: "flex flex-col", body: "flex-1", description: "flex-1" },
  skill: { card: "", body: "h-full", description: "min-h-10" },
};

/** `homepage_rankChip` / `homepage_rankChipTop` from the source stylesheet; the top three are inverted. */
function RankChip({ rank }: { readonly rank: number }) {
  return (
    <span
      aria-label={`Rank ${rank}`}
      className={cn(
        "inline-flex h-[22px] min-w-[30px] shrink-0 items-center justify-center rounded-[999px] border px-[7px] font-sans text-[9px] leading-none font-semibold tracking-[0.02em] tabular-nums",
        rank <= TOP_RANKS
          ? "border-[var(--design-ink)] bg-[var(--design-ink)] text-[var(--design-surface)]"
          : "border-[rgba(34,34,34,0.16)] bg-[rgba(247,247,247,0.9)] text-[var(--design-ink-muted)]",
      )}
    >
      #{rank}
    </span>
  );
}

/** The listing grid's card (see `ListingCard`) with a rank chip before the avatar. */
function LeaderboardCard({ row, variant }: { readonly row: LeaderboardRow; readonly variant: LeaderboardVariant }) {
  const layout = LAYOUT[variant];
  return (
    <Link id={row.id} href={row.href} className={cn("group block h-full", styles.link)}>
      <div
        className={cn(
          "relative h-full overflow-hidden rounded-[12px] border border-[rgba(34,34,34,0.18)] bg-white shadow-[0_12px_34px_rgba(10,10,10,0.04)] transition-[transform,translate,scale,rotate,border-color,box-shadow] duration-[180ms] ease-[ease] group-hover:-translate-y-px group-hover:border-[rgba(34,34,34,0.34)] group-hover:bg-[rgba(242,242,242,0.94)] group-hover:shadow-[0_16px_36px_rgba(34,34,34,0.07)] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0",
          layout.card,
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "block h-[6px] border-b border-[rgba(34,34,34,0.14)] bg-[#f5f5f5] bg-[length:4px_4px,100%_100%] bg-[position:0_0,0_0] opacity-[0.72]",
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
              <h3 className="line-clamp-1 font-display text-[16px] leading-[24px] font-semibold tracking-[-0.025em] text-[#0a0a0a]">
                {row.title}
              </h3>
            </div>
            <ArrowUpRight
              aria-hidden
              className="mt-0.5 size-4 shrink-0 text-[rgba(34,34,34,0.38)] transition-[color,transform,translate,scale,rotate] duration-[180ms] ease-[ease] group-hover:translate-x-px group-hover:-translate-y-px group-hover:text-[#0a0a0a] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
              strokeWidth={2}
            />
          </div>
          <p className={cn("mb-4 line-clamp-2 font-sans text-[13px] leading-[1.55] text-[#626262]", layout.description)}>{row.description}</p>
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full border border-[rgba(34,34,34,0.18)] bg-[rgba(255,255,255,0.5)] px-2.5 py-0.5 font-sans text-[9px] leading-[1.7] font-semibold tracking-[0.055em] text-[#626262] uppercase">
                {row.category}
              </span>
            </div>
            <div className="flex items-center font-sans text-[12px] leading-[16px] text-[#626262]">
              <Star aria-hidden className="mr-1 size-3 fill-[rgba(97,97,97,0.3)] text-[#616161]" strokeWidth={2} />
              {row.stars}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

interface LeaderboardGridProps {
  readonly rows: readonly LeaderboardRow[];
  readonly variant: LeaderboardVariant;
}

export function LeaderboardGrid({ rows, variant }: LeaderboardGridProps) {
  return (
    <main className="flex-1 bg-[var(--design-canvas)] py-8 md:py-12">
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="grid gap-[14px] md:grid-cols-2 lg:grid-cols-3">
          {rows.map((row) => (
            <LeaderboardCard key={row.id} row={row} variant={variant} />
          ))}
        </div>
      </div>
    </main>
  );
}
