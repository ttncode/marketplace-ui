import Link from "next/link";
import { ArrowUpRight, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "@/components/sites/mcpmarket-com-1a9fdbee/shared/DirectoryCard.module.css";
import type { SkillBadge, SkillCard } from "./types";

const CHIP =
  "inline-flex items-center rounded-full border font-sans text-[9px] leading-[1.7] font-semibold tracking-[0.055em] uppercase";

function Badge({ badge }: { readonly badge: SkillBadge }) {
  if (badge.kind === "premium") {
    return (
      <span className={cn(CHIP, "border-[rgba(34,34,34,0.3)] bg-[#0a0a0a] px-1.5 text-white")}>
        <Award aria-hidden className="mr-1 size-3" strokeWidth={2} />
        Premium
      </span>
    );
  }
  return (
    <span className={cn(CHIP, "border-[rgba(34,34,34,0.18)] bg-[rgba(255,255,255,0.5)] px-2.5 py-0.5 text-[#626262]")}>
      {badge.label}
    </span>
  );
}

/**
 * "featured" avatars are a bare image; "latest" avatars sit in a gradient frame that is itself dimmed,
 * as on the source.
 */
function Avatar({ card, variant }: { readonly card: SkillCard; readonly variant: SkillCardVariant }) {
  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={card.avatar.src}
      alt={card.avatar.alt}
      width={20}
      height={20}
      loading="lazy"
      className={cn(
        "size-5 shrink-0 rounded-full object-cover grayscale transition-[filter,opacity] duration-[180ms] ease-[ease] group-hover:grayscale-[0.3] motion-reduce:transition-none",
        variant === "featured" ? "opacity-[0.72] group-hover:opacity-100" : "opacity-70 group-hover:opacity-100 group-hover:grayscale-0",
      )}
    />
  );
  if (variant === "featured") return image;
  return (
    <span className="relative inline-flex size-5 shrink-0 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-[rgba(10,10,10,0.7)] to-[rgba(10,10,10,0.3)] opacity-[0.72] grayscale transition-[filter,opacity] duration-[180ms] ease-[ease] group-hover:opacity-100 group-hover:grayscale-[0.3] motion-reduce:transition-none">
      {image}
    </span>
  );
}

export type SkillCardVariant = "featured" | "latest";

export function SkillCardTile({ card, variant }: { readonly card: SkillCard; readonly variant: SkillCardVariant }) {
  return (
    <Link href={card.href} className={cn("group block h-full", styles.link)}>
      <div className="relative h-full overflow-hidden rounded-[12px] border border-[rgba(34,34,34,0.18)] bg-white shadow-[0_12px_34px_rgba(10,10,10,0.04)] transition-[transform,translate,scale,rotate,border-color,box-shadow] duration-[180ms] ease-[ease] group-hover:-translate-y-px group-hover:border-[rgba(34,34,34,0.34)] group-hover:bg-[rgba(242,242,242,0.94)] group-hover:shadow-[0_16px_36px_rgba(34,34,34,0.07)] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
        <span
          className={cn(
            "block h-[6px] border-b border-[rgba(34,34,34,0.14)] bg-[#f5f5f5] bg-[length:4px_4px,100%_100%] bg-[position:0_0,0_0] opacity-[0.72]",
            styles.dither,
          )}
        />
        <div className="flex h-full flex-col px-[19px] pt-[18px] pb-[17px]">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2.5">
              <Avatar card={card} variant={variant} />
              <h3 className="line-clamp-1 font-display text-[16px] leading-[24px] font-semibold tracking-[-0.025em] text-[#0a0a0a] transition-colors duration-150 group-hover:text-[rgba(10,10,10,0.8)] motion-reduce:transition-none">
                {card.title}
              </h3>
            </div>
            <ArrowUpRight
              aria-hidden
              className="mt-0.5 size-4 shrink-0 text-[rgba(34,34,34,0.38)] transition-[color,transform,translate,scale,rotate] duration-[180ms] ease-[ease] group-hover:translate-x-px group-hover:-translate-y-px group-hover:text-[#0a0a0a] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
              strokeWidth={2}
            />
          </div>
          <p className="mb-4 line-clamp-2 min-h-10 font-sans text-[13px] leading-[1.55] text-[#626262]">
            {card.description}
          </p>
          <div className="mt-auto flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-[5px]">
              <Badge badge={card.badge} />
            </div>
            {card.price ? (
              <div className="font-sans text-[12px] leading-4 font-medium text-[#626262]">{card.price}</div>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
}
