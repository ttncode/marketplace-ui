import Link from "next/link";
import { ArrowRight, ArrowUpRight, BadgeCheck } from "lucide-react";
import cardStyles from "@/components/sites/mcpmarket-com-1a9fdbee/shared/DirectoryCard.module.css";
import { cn } from "@/lib/utils";
import type { OfficialPublisher, OfficialSkill } from "./official-data";

const CARD =
  "relative h-full overflow-hidden rounded-[12px] border border-[rgba(34,34,34,0.18)] bg-white shadow-[var(--design-shadow-card)] transition-[transform,translate,scale,rotate,border-color,box-shadow] duration-[180ms] ease-[ease] group-hover:-translate-y-px group-hover:border-[rgba(34,34,34,0.34)] group-hover:bg-[rgba(242,242,242,0.94)] group-hover:shadow-[0_16px_36px_rgba(34,34,34,0.07)] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0";

const AVATAR =
  "shrink-0 object-cover opacity-[0.72] grayscale transition-[filter,opacity] duration-[180ms] ease-[ease] group-hover:opacity-100 group-hover:grayscale-[0.3] motion-reduce:transition-none";

const TITLE = "font-display text-[16px] leading-[24px] font-semibold tracking-[-0.025em] text-[var(--design-ink)]";

const ARROW =
  "size-4 shrink-0 text-[rgba(34,34,34,0.38)] transition-[color,transform,translate,scale,rotate] duration-[180ms] ease-[ease] group-hover:translate-x-px group-hover:-translate-y-px group-hover:text-[var(--design-ink)] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0";

const DESCRIPTION = "mb-4 line-clamp-2 font-sans text-[13px] leading-[1.55] text-[var(--design-ink-muted)]";

function CardDither() {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "block h-[6px] border-b border-[rgba(34,34,34,0.14)] bg-[var(--design-surface-muted)] bg-[length:4px_4px,100%_100%] bg-[position:0_0,0_0] opacity-[0.72]",
        cardStyles.dither,
      )}
    />
  );
}

function OfficialChip() {
  return (
    <div className="inline-flex items-center rounded-full border border-[rgba(34,34,34,0.3)] bg-[var(--design-ink)] px-2 py-0.5 font-sans text-[9px] leading-[1.7] font-semibold tracking-[0.055em] text-[var(--design-surface)] uppercase transition-colors duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[var(--design-ink-secondary)]">
      <BadgeCheck aria-hidden className="mr-1 size-3" strokeWidth={2} />
      Official
    </div>
  );
}

export function PublisherCard({ publisher }: { readonly publisher: OfficialPublisher }) {
  return (
    <Link href={publisher.href} className={cn("group block", cardStyles.link)}>
      <div className={CARD}>
        <CardDither />
        <div className="px-[19px] pt-[18px] pb-[17px]">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={publisher.avatar}
                alt={publisher.name}
                width={28}
                height={28}
                loading="lazy"
                className={cn("size-7 rounded-[12px]", AVATAR)}
              />
              <div className="min-w-0">
                <h2 className={cn("truncate", TITLE)}>{publisher.name}</h2>
                <p className="text-xs leading-4 text-muted-foreground">{publisher.count} official skills</p>
              </div>
            </div>
            <ArrowRight aria-hidden strokeWidth={2} className={ARROW} />
          </div>
          <p className={DESCRIPTION}>
            Official Agent Skills published by {publisher.name} for skills-enabled AI assistants.
          </p>
          <OfficialChip />
        </div>
      </div>
    </Link>
  );
}

export function OfficialSkillCard({ skill }: { readonly skill: OfficialSkill }) {
  return (
    <Link href={skill.href} className={cn("group block h-full", cardStyles.link)}>
      <div className={CARD}>
        <CardDither />
        <div className="flex h-full flex-col px-[19px] pt-[18px] pb-[17px]">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={skill.avatar.src}
                alt={skill.avatar.alt}
                width={20}
                height={20}
                loading="lazy"
                className={cn("size-5 rounded-full", AVATAR)}
              />
              <h3 className={cn("line-clamp-1", TITLE)}>{skill.title}</h3>
            </div>
            <ArrowUpRight aria-hidden strokeWidth={2} className={cn("mt-0.5", ARROW)} />
          </div>
          <p className={cn("min-h-10", DESCRIPTION)}>{skill.description}</p>
          <div className="mt-auto flex items-center justify-between">
            <div className="flex min-w-0 flex-wrap items-center gap-[5px]">
              <OfficialChip />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
