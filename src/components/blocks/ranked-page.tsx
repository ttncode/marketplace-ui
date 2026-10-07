import { LeaderboardGrid } from "./ranked-list";
import { LeaderboardHero } from "./ranked-hero";
import type { LeaderboardHeroContent, LeaderboardRow, LeaderboardVariant } from "./ranked-types";

interface LeaderboardPageProps {
  readonly hero: LeaderboardHeroContent;
  readonly rows: readonly LeaderboardRow[];
  readonly variant: LeaderboardVariant;
}

export function LeaderboardPage({ hero, rows, variant }: LeaderboardPageProps) {
  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen flex-col bg-[var(--design-canvas)] font-sans text-[var(--design-ink)]">
        <LeaderboardHero hero={hero} />
        <LeaderboardGrid rows={rows} variant={variant} />
      </div>
    </main>
  );
}
