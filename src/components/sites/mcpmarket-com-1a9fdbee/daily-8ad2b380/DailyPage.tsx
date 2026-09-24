import Link from "next/link";
import { DailyHero } from "./DailyHero";
import type { DailyHeroContent, DailySnapshot, DailyVariant } from "./types";

const ICON_PROPS = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

function ServerIcon() {
  return (
    <svg {...ICON_PROPS} className="h-5 w-5 text-primary">
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg {...ICON_PROPS} className="h-5 w-5 text-muted-foreground">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}

const SECTION = {
  server: { title: "MCP Servers", Icon: ServerIcon },
  skill: { title: "Agent Skills", Icon: SparklesIcon },
} as const;

// No shadow at rest or on hover: the source's glass shadow class compiles to a shadow colour in Tailwind v3.
const CARD =
  "relative overflow-hidden rounded-2xl border border-[var(--design-surface-glass-line)] bg-[var(--design-surface-glass)] px-5 py-4 backdrop-blur-md transition-[transform,translate,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-[var(--design-surface-glass-line-hover)] hover:bg-[var(--design-surface-glass-hover)]";

interface DailyPageProps {
  readonly hero: DailyHeroContent;
  readonly snapshots: readonly DailySnapshot[];
  readonly variant: DailyVariant;
}

export function DailyPage({ hero, snapshots, variant }: DailyPageProps) {
  const { title, Icon } = SECTION[variant];
  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen flex-col bg-[var(--design-canvas)] font-sans text-[var(--design-ink)]">
        <DailyHero hero={hero} />
        <div className="flex-1 py-8 md:py-16">
          <section className="mx-auto max-w-[1280px] px-6 md:px-8">
            <div className="mb-6 flex items-center gap-2">
              <Icon />
              <h2 className="font-display text-xl leading-7 font-medium tracking-[-0.025em] text-[var(--design-ink)]">{title}</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {snapshots.map((snapshot) => (
                <Link key={snapshot.href} href={snapshot.href} className={CARD}>
                  <p className="text-base leading-6 font-medium tracking-[-0.02em] text-[var(--design-ink)]">{snapshot.date}</p>
                  <p className="mt-1 text-xs leading-4 text-muted-foreground">{snapshot.count}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
