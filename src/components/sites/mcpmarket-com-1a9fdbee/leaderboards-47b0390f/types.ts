import type { ImageRef, LinkRef } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/types";

export interface LeaderboardRow {
  /** The source's anchor id (`tool-card-<slug>` / `skill-card-<slug>`). */
  readonly id: string;
  readonly rank: number;
  readonly title: string;
  readonly href: string;
  readonly avatar: ImageRef;
  readonly description: string;
  readonly category: string;
  readonly stars: string;
}

export interface LeaderboardHeroContent {
  /** Every crumb but the last links; the last is the current page. */
  readonly crumbs: readonly LinkRef[];
  readonly current: string;
  readonly title: string;
  readonly mutedTitle: string;
  readonly subtitle: string;
  readonly primary: LinkRef;
  readonly secondary: LinkRef;
}

export type LeaderboardVariant = "server" | "skill";
