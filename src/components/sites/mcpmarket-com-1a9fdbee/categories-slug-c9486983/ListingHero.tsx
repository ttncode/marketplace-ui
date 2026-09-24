import type { ReactNode } from "react";
import { CategoryRail } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/CategoryRail";
import { ListingSearch } from "./ListingSearch";
import { HeroDitherShader } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/HeroDitherShader";

const HERO_MASK =
  "linear-gradient(to bottom, rgba(0,0,0,0.34) 0%, rgba(0,0,0,0.28) 20%, rgba(0,0,0,0.32) 38%, rgba(0,0,0,0.38) 56%, rgba(0,0,0,0.46) 70%, rgba(0,0,0,0.4) 78%, rgba(0,0,0,0.28) 86%, rgba(0,0,0,0.12) 94%, transparent 100%)";

interface ListingHeroProps {
  readonly title: string;
  readonly mutedTitle: string;
  readonly description: ReactNode;
  readonly searchPlaceholder: string;
  /** /server and /client show the category rail ("All" active); category pages don't. */
  readonly withCategoryRail?: boolean;
}

export function ListingHero({ title, mutedTitle, description, searchPlaceholder, withCategoryRail }: ListingHeroProps) {
  return (
    <section className="design-hero-under-navigation relative overflow-hidden bg-[#fbfbfb]">
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
          <h1 className="max-w-[940px] text-balance font-display text-[clamp(48px,6vw,82px)] leading-[0.94] font-normal tracking-[-0.055em] text-[#0a0a0a] max-md:text-[clamp(42px,13vw,60px)]">
            {title} <span className="text-[#444444]">{mutedTitle}</span>
          </h1>
          <p className="mt-6 max-w-[650px] font-sans text-base leading-[1.65] tracking-[-0.018em] text-[rgba(10,10,10,0.64)] max-md:max-w-[94%] max-md:text-[15px]">
            {description}
          </p>
          <ListingSearch placeholder={searchPlaceholder} />
          {withCategoryRail ? (
            <div className="mt-6 w-full pt-[22px] max-md:pt-2.5">
              <CategoryRail />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
