import { TRUST_STATS } from "./submit-data";
import { HeroDitherShader } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/HeroDitherShader";

const HERO_MASK =
  "linear-gradient(to bottom, rgba(0,0,0,0.34) 0%, rgba(0,0,0,0.28) 20%, rgba(0,0,0,0.32) 38%, rgba(0,0,0,0.38) 56%, rgba(0,0,0,0.46) 70%, rgba(0,0,0,0.4) 78%, rgba(0,0,0,0.28) 86%, rgba(0,0,0,0.12) 94%, transparent 100%)";

/** The source's marketing hero: copy on the left, a glass "proof" card of trust stats on the right. */
export function SubmitHero() {
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
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid min-h-[480px] gap-10 py-10 md:min-h-[500px] md:py-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:items-center lg:gap-16 lg:py-14">
          <div className="relative z-10 max-w-3xl">
            <h1 className="mb-6 text-left font-display text-[36px] leading-[40px] font-normal tracking-[-0.05em] text-balance text-foreground sm:text-[48px] sm:leading-[48px] md:text-[60px] md:leading-[60px] lg:text-[72px] lg:leading-[72px]">
              Submit MCPs &amp; Skills
            </h1>
            <p className="max-w-xl font-sans text-[15px] leading-[1.65] font-normal tracking-[-0.018em] text-[var(--design-ink-muted)] sm:text-base sm:leading-6">
              Have an MCP server or Agent Skill you&apos;d like to feature? Submit the related GitHub repository below and
              we&apos;ll review it for inclusion.
            </p>
          </div>
          <div className="relative z-10 rounded-2xl border border-[var(--design-surface-glass-line)] bg-[var(--design-surface-glass)] p-3 backdrop-blur-md md:p-4">
            <dl className="divide-y divide-[var(--design-line)]">
              {TRUST_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-baseline justify-between gap-6 px-3 py-5 first:pt-3 last:pb-3 md:px-5 md:py-6"
                >
                  <dt className="font-sans text-sm leading-5 font-normal tracking-[-0.01em] text-[var(--design-ink-muted)] sm:text-base sm:leading-6">
                    {stat.label}
                  </dt>
                  <dd className="font-sans text-4xl leading-none font-medium tracking-[-0.055em] text-[var(--design-ink)] md:text-5xl md:leading-none">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
