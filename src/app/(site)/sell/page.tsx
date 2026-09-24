import type { Metadata } from "next";
import {
  CheckList,
  FeatureSplit,
  HubSection,
  IconList,
  SectionIntro,
} from "@/components/sites/mcpmarket-com-1a9fdbee/hub-2382ac74/HubSections";
import {
  ListingMockup,
  ReachMockup,
  StorefrontMockup,
  SyncMockup,
} from "@/components/sites/mcpmarket-com-1a9fdbee/sell-04d85308/Mockups";
import {
  LISTING_CHECKS,
  REACH_CHECKS,
  STEPS,
  STOREFRONT_CHECKS,
  SYNC_CHECKS,
} from "@/components/sites/mcpmarket-com-1a9fdbee/sell-04d85308/sell-data";
import { SellFaq } from "@/components/sites/mcpmarket-com-1a9fdbee/sell-04d85308/SellFaq";
import { SellCta, SellHero } from "@/components/sites/mcpmarket-com-1a9fdbee/sell-04d85308/SellSections";

export const metadata: Metadata = {
  title: "Sell Your Agent Skills | MCP Market",
  description:
    "List and sell your agent skills on MCP Market. Create your seller account, publish paid listings, and reach over a million unique visitors.",
};

export default function SellPage() {
  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen flex-col bg-[var(--design-canvas)] font-sans text-foreground">
        <SellHero />
        <HubSection id="listing" topLine>
          <FeatureSplit
            intro={
              <>
                <SectionIntro
                  eyebrow="List & sell"
                  title="List and sell your own agent skills."
                  body="Turn any agent skill into a paid listing. Set your price, publish a version, and keep selling as you ship updates — buyers always get the latest."
                />
                <CheckList items={LISTING_CHECKS} />
              </>
            }
            mockup={<ListingMockup />}
          />
        </HubSection>
        <HubSection id="storefront" topLine muted>
          <FeatureSplit
            reversed
            intro={
              <>
                <SectionIntro
                  eyebrow="Your storefront"
                  title="Your own storefront to share."
                  body="Share your storefront with your audience — one link for your bio, your socials, your newsletter. Your skills, your brand, in one place."
                />
                <CheckList items={STOREFRONT_CHECKS} />
              </>
            }
            mockup={<StorefrontMockup />}
          />
        </HubSection>
        <HubSection id="reach" topLine>
          <FeatureSplit
            intro={
              <>
                <SectionIntro
                  eyebrow="Marketplace reach"
                  title="Reach over a million users."
                  body="Tap into MCP Market's audience of over a million unique visitors. Get your skills in front of users already searching for a solution."
                />
                <CheckList items={REACH_CHECKS} />
              </>
            }
            mockup={<ReachMockup />}
          />
        </HubSection>
        <HubSection id="sync" topLine muted>
          <FeatureSplit
            reversed
            intro={
              <>
                <SectionIntro
                  eyebrow="Distribution"
                  title="Syncs everywhere with MCP Market Hub."
                  body="Your users can download your skills directly, or use the MCP Market Hub plugin to sync them across all their agents — Claude, Codex, and Openclaw."
                />
                <CheckList items={SYNC_CHECKS} />
              </>
            }
            mockup={<SyncMockup />}
          />
        </HubSection>
        <HubSection>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <SectionIntro
              eyebrow="How it works"
              title="From skill to sale in four steps."
              body="Create your seller account, connect a skill, set your price, and publish it for buyers."
            />
            <IconList items={STEPS} />
          </div>
        </HubSection>
        <SellFaq />
        <SellCta />
      </div>
    </main>
  );
}
