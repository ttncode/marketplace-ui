import Link from "next/link";
import { ArrowRight, Store } from "lucide-react";
import { toSiteHref } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/links";
import {
  PRIMARY_FACE,
  PRIMARY_SHELL,
} from "@/components/sites/mcpmarket-com-1a9fdbee/tools-skills-slug-229a0ca0/texture-button";
import { cn } from "@/lib/utils";
import { EarningsMockup } from "./Mockups";
import { SELL_URL } from "./sell-data";
import { HeroDitherShader } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/HeroDitherShader";

const HERO_MASK =
  "linear-gradient(to bottom, rgba(0,0,0,0.34) 0%, rgba(0,0,0,0.28) 20%, rgba(0,0,0,0.32) 38%, rgba(0,0,0,0.38) 56%, rgba(0,0,0,0.46) 70%, rgba(0,0,0,0.4) 78%, rgba(0,0,0,0.28) 86%, rgba(0,0,0,0.12) 94%, transparent 100%)";

function StartSellingButton() {
  return (
    <Link href={toSiteHref(SELL_URL)} className={cn(PRIMARY_SHELL, "mt-8 h-12 w-fit rounded-lg")}>
      <span className={cn(PRIMARY_FACE, "text-base leading-[24px]")}>
        Start selling
        <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" strokeWidth={1.5} />
      </span>
    </Link>
  );
}

export function SellHero() {
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
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 md:px-8">
        <div className="grid min-h-[480px] gap-10 py-10 md:min-h-[500px] md:py-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:items-center lg:gap-16 lg:py-14">
          <div className="relative z-10 max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-3 rounded-[999px] border border-[rgb(10_10_10/0.14)] bg-[#f5f5f5] px-3 py-1.5 font-sans text-[10px] leading-[10px] font-medium tracking-[0.8px] text-[#444444] uppercase shadow-[-4px_-4px_10px_rgba(255,255,255,0.62),5px_5px_12px_rgba(74,74,74,0.16),inset_0_1px_0_rgba(255,255,255,0.46)]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#10b981]" />
              <span>Sell on MCP Market</span>
            </div>
            <h1 className="mb-6 text-left font-display text-[36px] leading-[40px] font-normal tracking-[-0.05em] text-balance text-foreground sm:text-[48px] sm:leading-[48px] md:text-[60px] md:leading-[60px] lg:text-[72px] lg:leading-[72px]">
              Turn your agent skills <span className="text-foreground/40">into income</span>.
            </h1>
            <p className="max-w-xl font-sans text-[15px] leading-[1.65] font-normal tracking-[-0.018em] text-[var(--design-ink-muted)] sm:text-base sm:leading-[24px]">
              List your AI Agent skills, get a storefront you can share anywhere, and put them in front of the
              developers and AI teams already browsing MCP Market.
            </p>
            <StartSellingButton />
          </div>
          <div className="relative z-10 rounded-2xl border border-[var(--design-surface-glass-line)] bg-[var(--design-surface-glass)] p-3 backdrop-blur-md md:p-4">
            <EarningsMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

export function SellCta() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-6 text-center md:px-8">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-lg border border-border bg-card">
          <Store aria-hidden="true" className="h-7 w-7 text-foreground" strokeWidth={2} />
        </div>
        <h2 className="font-display text-[30px] leading-[36px] font-normal tracking-[-0.04em] text-foreground md:text-[36px] md:leading-[40px]">
          Ready to set up your store?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-[1.625] text-muted-foreground">
          Set up your seller account today and turn your agent skills into a storefront and a revenue stream.
        </p>
        <StartSellingButton />
      </div>
    </section>
  );
}
