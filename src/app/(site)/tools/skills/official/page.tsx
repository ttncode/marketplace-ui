import type { Metadata } from "next";
import {
  OfficialSkillCard,
  PublisherCard,
} from "@/components/sites/mcpmarket-com-1a9fdbee/tools-skills-official-c4dc80e5/OfficialCards";
import { OfficialHero } from "@/components/sites/mcpmarket-com-1a9fdbee/tools-skills-official-c4dc80e5/OfficialHero";
import {
  OFFICIAL_PUBLISHERS,
  OFFICIAL_SKILLS,
} from "@/components/sites/mcpmarket-com-1a9fdbee/tools-skills-official-c4dc80e5/official-data";

export const metadata: Metadata = {
  title: "Official Agent Skills | MCP Market",
  description: "Browse first-party Agent Skills published by official brands and teams.",
};

export default function OfficialSkillsPage() {
  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen flex-col bg-[var(--design-canvas)] font-sans text-[var(--design-ink)]">
        <OfficialHero />
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="grid grid-cols-1 gap-[14px] md:grid-cols-2 lg:grid-cols-3">
              {OFFICIAL_PUBLISHERS.map((publisher) => (
                <PublisherCard key={publisher.href} publisher={publisher} />
              ))}
              {OFFICIAL_SKILLS.map((skill) => (
                <OfficialSkillCard key={skill.href} skill={skill} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
