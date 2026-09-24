import type { ImageRef } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/types";

export interface OfficialSkill {
  readonly label: string;
  readonly initials: string;
  readonly href: string;
  readonly avatar: string;
}

export type SkillBadge = { readonly kind: "premium" } | { readonly kind: "category"; readonly label: string };

export interface SkillCard {
  readonly title: string;
  readonly href: string;
  readonly avatar: ImageRef;
  readonly description: string;
  readonly badge: SkillBadge;
  readonly price?: string;
}

export type CategoryIconName = "star" | "layers" | "database" | "code" | "penTool" | "users" | "terminal";

export interface CategoryStat {
  readonly name: string;
  readonly href: string;
  readonly count: string;
  readonly icon: CategoryIconName;
}

export interface TopSkill {
  readonly rank: string;
  readonly title: string;
  readonly href: string;
  readonly avatar: ImageRef;
  readonly category: string;
  readonly count: string;
}

export interface SkillFaq {
  readonly question: string;
  readonly answer: string;
}
