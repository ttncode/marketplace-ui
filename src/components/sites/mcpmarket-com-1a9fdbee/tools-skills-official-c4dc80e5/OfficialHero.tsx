import Link from "next/link";
import { HeroDitherShader } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/HeroDitherShader";

const HERO_MASK =
  "linear-gradient(to bottom, rgba(0,0,0,0.34) 0%, rgba(0,0,0,0.28) 20%, rgba(0,0,0,0.32) 38%, rgba(0,0,0,0.38) 56%, rgba(0,0,0,0.46) 70%, rgba(0,0,0,0.4) 78%, rgba(0,0,0,0.28) 86%, rgba(0,0,0,0.12) 94%, transparent 100%)";

const CRUMB_LINK = "rounded-md px-1 py-1 transition-colors hover:bg-black/[0.04] hover:text-[var(--design-ink)]";

const CRUMB_SVG = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

function Breadcrumbs() {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-8 inline-flex w-fit max-w-full self-start overflow-x-auto rounded-full border border-[var(--design-surface-glass-line)] bg-[var(--design-surface-glass)] px-2.5 py-[5px] font-sans text-[9px] leading-[1.2] font-medium tracking-[0.045em] whitespace-nowrap text-[var(--design-ink-muted)] uppercase backdrop-blur-md [scrollbar-width:none] md:mb-6 [&::-webkit-scrollbar]:hidden"
    >
      <ol className="flex w-max min-w-0 items-center gap-1.5">
        <li className="flex items-center">
          <Link href="/" className={`-ml-1 inline-flex items-center gap-1 ${CRUMB_LINK}`}>
            <svg {...CRUMB_SVG} className="h-3 w-3">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="hidden sm:inline">Home</span>
          </Link>
        </li>
        <li className="flex min-w-0 items-center gap-1.5">
          <svg {...CRUMB_SVG} className="h-3 w-3 shrink-0">
            <path d="m9 18 6-6-6-6" />
          </svg>
          <Link href="/tools/skills" className={CRUMB_LINK}>
            Skills
          </Link>
        </li>
        <li className="flex min-w-0 items-center gap-1.5">
          <svg {...CRUMB_SVG} className="h-3 w-3 shrink-0">
            <path d="m9 18 6-6-6-6" />
          </svg>
          <span aria-current="page" className="max-w-[150px] truncate px-1 py-1 text-[var(--design-ink-secondary)] sm:max-w-xs">
            Official
          </span>
        </li>
      </ol>
    </nav>
  );
}

export function OfficialHero() {
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
        <div className="flex min-h-[300px] flex-col justify-center pt-[38px] pb-[46px]">
          <Breadcrumbs />
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-3xl leading-[0.98] font-normal tracking-[-0.05em] text-foreground sm:text-4xl sm:leading-10 md:text-5xl md:leading-none lg:text-6xl lg:leading-none">
              Official Agent <span className="text-muted-foreground">Skills</span>
            </h1>
            <p className="mx-auto mt-[18px] max-w-[650px] font-sans text-base leading-[1.65] tracking-[-0.018em] text-[rgba(10,10,10,0.64)] max-md:max-w-[92%] max-md:text-[15px]">
              Explore first-party skills from publishers that maintain their own Agent Skills for Claude, Cursor, Codex,
              ChatGPT, and other compatible assistants.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
