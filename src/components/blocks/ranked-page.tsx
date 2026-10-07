import { RankedList } from "./ranked-list";
import { RankedHero } from "./ranked-hero";
import type { RankedHeroContent, RankedRow, RankedVariant } from "./ranked-types";

interface RankedPageProps {
  readonly hero: RankedHeroContent;
  readonly rows: readonly RankedRow[];
  readonly variant: RankedVariant;
}

export function RankedPage({ hero, rows, variant }: RankedPageProps) {
  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen flex-col bg-[var(--design-canvas)] font-sans text-[var(--design-ink)]">
        <RankedHero hero={hero} />
        <RankedList rows={rows} variant={variant} />
      </div>
    </main>
  );
}
