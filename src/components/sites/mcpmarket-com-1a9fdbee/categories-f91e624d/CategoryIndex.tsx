import Link from "next/link";
import cardStyles from "@/components/sites/mcpmarket-com-1a9fdbee/shared/DirectoryCard.module.css";
import type { LinkRef } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/types";
import { cn } from "@/lib/utils";
import type { CategoryTile } from "./categories-data";
import { CategoryIcon, ICON_HOVER_SCOPE } from "./CategoryIcon";
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

function Breadcrumbs({ trail }: { readonly trail: readonly LinkRef[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-5 inline-flex w-fit max-w-full self-start overflow-x-auto rounded-full border border-[var(--design-surface-glass-line)] bg-[var(--design-surface-glass)] px-2.5 py-[5px] font-sans text-[9px] leading-[1.2] font-medium tracking-[0.045em] whitespace-nowrap text-[var(--design-ink-muted)] uppercase backdrop-blur-md [scrollbar-width:none] md:mb-6 [&::-webkit-scrollbar]:hidden"
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
        {trail.map((crumb, index) => (
          <li key={crumb.label} className="flex min-w-0 items-center gap-1.5">
            <svg {...CRUMB_SVG} className="h-3 w-3 shrink-0">
              <path d="m9 18 6-6-6-6" />
            </svg>
            {index === trail.length - 1 ? (
              <span
                aria-current="page"
                className="max-w-[150px] truncate px-1 py-1 text-[var(--design-ink-secondary)] sm:max-w-xs"
              >
                {crumb.label}
              </span>
            ) : (
              <Link href={crumb.href} className={CRUMB_LINK}>
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function CategoryCard({ tile, unit }: { readonly tile: CategoryTile; readonly unit: string }) {
  return (
    <Link href={tile.href} className={cn("group block", cardStyles.link, ICON_HOVER_SCOPE)}>
      <div className="relative h-full overflow-hidden rounded-[12px] border border-[rgba(34,34,34,0.18)] bg-white shadow-[var(--design-shadow-card)] transition-[translate,border-color,box-shadow] duration-[180ms] ease-[ease] group-hover:-translate-y-px group-hover:border-[rgba(34,34,34,0.34)] group-hover:bg-[rgba(242,242,242,0.94)] group-hover:shadow-[0_16px_36px_rgba(34,34,34,0.07)] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
        <span
          aria-hidden="true"
          className={cn(
            "block h-[6px] border-b border-[rgba(34,34,34,0.14)] bg-[#f5f5f5] bg-[length:4px_4px,100%_100%] bg-[position:0_0,0_0] opacity-[0.72]",
            cardStyles.dither,
          )}
        />
        <div className="relative px-[19px] pt-[18px] pb-[17px]">
          <div className="mb-4 flex items-center gap-2.5">
            <CategoryIcon name={tile.name} />
            <div className="min-w-0 flex-1">
              <h3 className="line-clamp-1 font-display text-[16px] leading-[24px] font-semibold tracking-[-0.025em] text-[var(--design-ink)]">
                {tile.name}
              </h3>
            </div>
          </div>
          <div className="flex justify-start">
            <p className="font-sans text-[13px] leading-[1.55] text-[var(--design-ink-muted)]">
              <span className="font-display text-base leading-6 text-foreground">{tile.count}</span> {unit}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

interface CategoryIndexProps {
  /** Crumbs after "Home"; the last one is the current page. */
  readonly trail: readonly LinkRef[];
  readonly title: string;
  readonly description: string;
  readonly tiles: readonly CategoryTile[];
  /** "MCP servers" or "skills", printed after each count. */
  readonly unit: string;
}

export function CategoryIndex({ trail, title, description, tiles, unit }: CategoryIndexProps) {
  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen flex-col bg-[var(--design-canvas)] font-sans text-[var(--design-ink)]">
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
              <Breadcrumbs trail={trail} />
              <div className="flex flex-col space-y-4">
                <h1 className="font-display text-3xl leading-[0.98] font-normal tracking-[-0.05em] text-foreground sm:text-4xl sm:leading-10 md:text-5xl md:leading-none lg:text-6xl lg:leading-none">
                  <span>{title} </span>
                  <span className="text-muted-foreground">Category</span>
                </h1>
                <p className="max-w-2xl text-lg leading-7 text-muted-foreground">{description}</p>
              </div>
            </div>
          </div>
        </section>
        <div className="flex-1 py-8 md:py-16">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="grid gap-[14px] sm:grid-cols-2 lg:grid-cols-3">
              {tiles.map((tile) => (
                <CategoryCard key={tile.href} tile={tile} unit={unit} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
