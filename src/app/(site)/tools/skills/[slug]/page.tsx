import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillHero } from "@/components/sites/mcpmarket-com-1a9fdbee/tools-skills-slug-229a0ca0/SkillHero";
import { SkillSidebar } from "@/components/sites/mcpmarket-com-1a9fdbee/tools-skills-slug-229a0ca0/SkillSidebar";
import { SkillTabs } from "@/components/sites/mcpmarket-com-1a9fdbee/tools-skills-slug-229a0ca0/SkillTabs";
import { SKILLS } from "@/components/sites/mcpmarket-com-1a9fdbee/tools-skills-slug-229a0ca0/skills-data";

type Props = { readonly params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return SKILLS.map(({ slug }) => ({ slug }));
}

async function findSkill(params: Props["params"]) {
  const { slug } = await params;
  return SKILLS.find((skill) => skill.slug === slug) ?? notFound();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const skill = await findSkill(params);
  return { title: skill.metaTitle, description: skill.metaDescription };
}

export default async function SkillDetailPage({ params }: Props) {
  const skill = await findSkill(params);

  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen flex-col bg-[var(--design-canvas)] font-sans text-[var(--design-ink)] antialiased selection:bg-black/15 selection:text-black">
        <SkillHero skill={skill} />
        <div className="flex-1 py-4 md:py-6">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-7 lg:gap-10">
              <div className="space-y-8 lg:col-span-5">
                <SkillTabs skill={skill} />
              </div>
              <SkillSidebar skill={skill} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
