import Link from "next/link";
import { toSiteHref } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/links";
import { ChevronRightIcon, HomeIcon } from "@/components/sites/mcpmarket-com-1a9fdbee/tools-skills-slug-229a0ca0/icons";
import {
  PRIMARY_FACE,
  PRIMARY_SHELL,
  SECONDARY_FACE,
  SECONDARY_SHELL,
} from "@/components/sites/mcpmarket-com-1a9fdbee/tools-skills-slug-229a0ca0/texture-button";
import { cn } from "@/lib/utils";
import type { HeroContent } from "./types";
import { HeroDitherShader } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/HeroDitherShader";

const HERO_MASK =
  "linear-gradient(to bottom, rgba(0,0,0,0.34) 0%, rgba(0,0,0,0.28) 20%, rgba(0,0,0,0.32) 38%, rgba(0,0,0,0.38) 56%, rgba(0,0,0,0.46) 70%, rgba(0,0,0,0.4) 78%, rgba(0,0,0,0.28) 86%, rgba(0,0,0,0.12) 94%, transparent 100%)";

const CRUMB_LINK = "rounded-md px-1 py-1 transition-colors hover:bg-black/[0.04] hover:text-[var(--design-ink)]";

function Breadcrumbs({ crumbs, current }: Pick<HeroContent, "crumbs" | "current">) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-5 inline-flex w-fit max-w-full self-start overflow-x-auto rounded-full border border-[var(--design-surface-glass-line)] bg-[var(--design-surface-glass)] px-2.5 py-[5px] font-sans text-[9px] leading-[1.2] font-medium tracking-[0.045em] whitespace-nowrap text-[var(--design-ink-muted)] uppercase backdrop-blur-md [scrollbar-width:none] md:mb-6 [&::-webkit-scrollbar]:hidden"
    >
      <ol className="flex w-max min-w-0 items-center gap-1.5">
        <li className="flex items-center">
          <Link href="/" className={`-ml-1 inline-flex items-center gap-1 ${CRUMB_LINK}`}>
            <HomeIcon className="h-3 w-3" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </li>
        {crumbs.map((crumb) => (
          <li key={crumb.href} className="flex min-w-0 items-center gap-1.5">
            <ChevronRightIcon className="h-3 w-3 shrink-0" />
            <Link href={crumb.href} className={CRUMB_LINK}>
              {crumb.label}
            </Link>
          </li>
        ))}
        <li className="flex min-w-0 items-center gap-1.5">
          <ChevronRightIcon className="h-3 w-3 shrink-0" />
          <span aria-current="page" className="max-w-[150px] truncate px-1 py-1 text-[var(--design-ink-secondary)] sm:max-w-xs">
            {current}
          </span>
        </li>
      </ol>
    </nav>
  );
}

function HeroActions({ actions }: Pick<HeroContent, "actions">) {
  if (!actions) return null;
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <Link href={toSiteHref(actions.primary.href)} className={cn(PRIMARY_SHELL, "w-fit")}>
        <span className={cn(PRIMARY_FACE, "text-base")}>{actions.primary.label}</span>
      </Link>
      <Link href={toSiteHref(actions.secondary.href)} className={cn(SECONDARY_SHELL, "w-fit")}>
        <span className={cn(SECONDARY_FACE, "text-base")}>{actions.secondary.label}</span>
      </Link>
    </div>
  );
}

/** Dithered page hero shared by the explainer articles and the install guide; `minHeightClass` is the only layout difference. */
export function ExplainerHero({ hero, minHeightClass }: { readonly hero: HeroContent; readonly minHeightClass: string }) {
  return (
    <section className="design-hero-under-navigation relative overflow-hidden bg-[var(--design-canvas)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ maskImage: HERO_MASK, WebkitMaskImage: HERO_MASK }}
      >
        <div className="design-dither-static absolute inset-0" />
        <HeroDitherShader />
      </div>
      <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-8">
        <div className={cn("flex flex-col py-8 md:py-10", minHeightClass)}>
          <Breadcrumbs crumbs={hero.crumbs} current={hero.current} />
          <div className="flex flex-1 items-center pt-4 pb-8 md:pt-6 md:pb-10">
            <div className="relative z-10 w-full max-w-3xl">
              <h1 className="max-w-4xl font-display text-[36px] leading-[40px] font-normal tracking-[-0.05em] text-balance text-[var(--design-ink)] sm:text-[48px] sm:leading-[48px] md:text-[60px] md:leading-[60px] lg:text-[72px] lg:leading-[72px]">
                {hero.title}
                <span className="text-[var(--design-ink-secondary)]">{hero.mutedTitle}</span>
              </h1>
              <p className="mt-6 max-w-2xl font-sans text-[15px] leading-[1.65] font-normal tracking-[-0.018em] text-[var(--design-ink-muted)] sm:text-base sm:leading-[24px]">
                {hero.description}
              </p>
              <HeroActions actions={hero.actions} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
