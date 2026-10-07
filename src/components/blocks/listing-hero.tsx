import type { ReactNode } from "react";
import { CategoryRail } from "@/components/blocks/category-rail";
import { ListingSearch } from "@/components/blocks/listing-search";
import { HeroDitherShader } from "@/components/blocks/dither-background";
import type { LinkRef } from "@/lib/types";

const HERO_MASK =
  "var(--design-mask-hero-fade)";

interface ListingHeroProps {
  readonly title: string;
  readonly mutedTitle: string;
  readonly description: ReactNode;
  readonly searchPlaceholder: string;
  /** /server and /client show the category rail ("All" active); category pages omit it. */
  readonly categoryLinks?: readonly LinkRef[];
}

export function ListingHero({ title, mutedTitle, description, searchPlaceholder, categoryLinks }: ListingHeroProps) {
  return (
    <section className="design-hero-under-navigation relative overflow-hidden bg-canvas">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ maskImage: HERO_MASK, WebkitMaskImage: HERO_MASK }}
      >
        <div className="design-dither-static absolute inset-0" />
        <HeroDitherShader />
      </div>
      <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="flex min-h-[410px] flex-col items-center justify-center pt-[42px] pb-[18px] text-center max-md:min-h-[480px] max-md:pt-[34px] max-md:pb-4">
          <h1 className="max-w-[940px] text-balance font-display text-[clamp(48px,6vw,82px)] leading-[0.94] font-normal tracking-[-0.055em] text-ink max-md:text-[clamp(42px,13vw,60px)]">
            {title} <span className="text-ink-secondary">{mutedTitle}</span>
          </h1>
          <p className="mt-6 max-w-[650px] font-sans text-base leading-[1.65] tracking-[-0.018em] text-ink/64 max-md:max-w-[94%] max-md:text-[15px]">
            {description}
          </p>
          <ListingSearch placeholder={searchPlaceholder} />
          {categoryLinks ? (
            <div className="mt-6 w-full pt-[22px] max-md:pt-2.5">
              <CategoryRail links={categoryLinks} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
