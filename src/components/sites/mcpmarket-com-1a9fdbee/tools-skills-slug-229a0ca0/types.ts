import type { FaqItem, ImageRef, LinkRef } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/types";

export interface RelatedItem {
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly avatar?: ImageRef;
}

export interface SkillDetail {
  readonly slug: string;
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly name: string;
  readonly author: { readonly name: string; readonly href: string; readonly avatar: string };
  readonly stars: string;
  readonly repoHref: string;
  readonly category: LinkRef;
  readonly summary: string;
  readonly about: string;
  readonly features: readonly string[];
  readonly useCases: readonly string[];
  readonly faq: readonly FaqItem[];
  /** Pre-rendered, sanitized SKILL.md body (frontmatter stripped, external links pointed at the 404). */
  readonly skillHtml: string;
  readonly cliCommand: string;
  readonly downloadHref: string;
  /** Whether mcpmarket.com already holds a security scan for this skill (changes the scan sheet's flow). */
  readonly hasExistingScan: boolean;
  readonly relatedSkillsHref: string;
  readonly relatedSkills: readonly RelatedItem[];
  readonly relatedMcps: readonly RelatedItem[];
}
