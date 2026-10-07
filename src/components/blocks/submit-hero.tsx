import { HeroDitherShader } from "@/components/blocks/dither-background";

export function SubmitHero({ title, description }: { readonly title: string; readonly description: string }) {
  return (
    <section className="design-hero-under-navigation relative overflow-hidden bg-[var(--design-canvas)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ maskImage: "var(--design-mask-hero-fade)", WebkitMaskImage: "var(--design-mask-hero-fade)" }}
      >
        <div className="design-dither-static absolute inset-0" />
        <HeroDitherShader />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid min-h-[480px] gap-10 py-10 md:min-h-[500px] md:py-12 lg:items-center lg:py-14">
          <div className="relative z-10 max-w-3xl">
            <h1 className="mb-6 text-left font-display text-[36px] leading-[40px] font-normal tracking-[-0.05em] text-balance text-foreground sm:text-[48px] sm:leading-[48px] md:text-[60px] md:leading-[60px] lg:text-[72px] lg:leading-[72px]">
              {title}
            </h1>
            <p className="max-w-xl font-sans text-[15px] leading-[1.65] font-normal tracking-[-0.018em] text-[var(--design-ink-muted)] sm:text-base sm:leading-6">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
