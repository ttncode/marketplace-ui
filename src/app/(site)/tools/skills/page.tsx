import type { Metadata } from "next";
import {
  CategoryGrid,
  HubPromo,
  ResourceLinks,
  TopSkillsList,
} from "@/components/sites/mcpmarket-com-1a9fdbee/tools-skills-cb22ba36/LandingBlocks";
import { OfficialSkillsScroller } from "@/components/sites/mcpmarket-com-1a9fdbee/tools-skills-cb22ba36/OfficialSkillsScroller";
import {
  SkillCardTile,
  type SkillCardVariant,
} from "@/components/sites/mcpmarket-com-1a9fdbee/tools-skills-cb22ba36/SkillCardTile";
import { SkillsFaq } from "@/components/sites/mcpmarket-com-1a9fdbee/tools-skills-cb22ba36/SkillsFaq";
import { SkillsHero } from "@/components/sites/mcpmarket-com-1a9fdbee/tools-skills-cb22ba36/SkillsHero";
import { SkillsSection } from "@/components/sites/mcpmarket-com-1a9fdbee/tools-skills-cb22ba36/SkillsSection";
import {
  FEATURED_SKILLS,
  LATEST_SKILLS,
} from "@/components/sites/mcpmarket-com-1a9fdbee/tools-skills-cb22ba36/skills-landing-data";
import type { SkillCard } from "@/components/sites/mcpmarket-com-1a9fdbee/tools-skills-cb22ba36/types";

export const metadata: Metadata = {
  title: "Agent Skills Directory & Marketplace for Claude, ChatGPT & Codex | MCP Market",
  description:
    "The Agent Skills marketplace for Claude.ai, Claude Code, Codex and ChatGPT — discover, install, and sell skills that give your AI agents new capabilities.",
};

function CardGrid({ cards, variant }: { readonly cards: readonly SkillCard[]; readonly variant: SkillCardVariant }) {
  return (
    <div className="grid gap-[14px] md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <SkillCardTile key={card.href} card={card} variant={variant} />
      ))}
    </div>
  );
}

export default function SkillsDirectoryPage() {
  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen flex-col bg-[var(--design-canvas)] font-sans text-[var(--design-ink)]">
        <SkillsHero />
        <div className="flex-1">
          <SkillsSection tone="canvas" title="Official Skills">
            <OfficialSkillsScroller />
          </SkillsSection>
          <SkillsSection tone="subtle" title="Featured Agent Skills" viewAll={{ label: "View All Skills", href: "/tools/skills/all" }}>
            <CardGrid cards={FEATURED_SKILLS} variant="featured" />
          </SkillsSection>
          <SkillsSection
            tone="canvas"
            title="Browse by Category"
            viewAll={{ label: "View All Categories", href: "/tools/skills/categories" }}
          >
            <CategoryGrid />
          </SkillsSection>
          <SkillsSection tone="subtle" title="Top Agent Skills" viewAll={{ label: "View Top 100", href: "/tools/skills/leaderboard" }}>
            <TopSkillsList />
          </SkillsSection>
          <SkillsSection tone="canvas" title="Latest Agent Skills" viewAll={{ label: "View All Skills", href: "/tools/skills/all" }}>
            <CardGrid cards={LATEST_SKILLS} variant="latest" />
          </SkillsSection>
          <SkillsSection tone="subtle">
            <HubPromo />
          </SkillsSection>
          <ResourceLinks />
          <SkillsFaq />
        </div>
      </div>
    </main>
  );
}
