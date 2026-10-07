import type { ImageRef, LinkRef } from "@/lib/types";

export interface RankedRow {
  /** Anchor id, e.g. `rank-<slug>`. */
  readonly id: string;
  readonly rank: number;
  readonly title: string;
  readonly href: string;
  readonly avatar: ImageRef;
  readonly description: string;
  readonly category: string;
  readonly stars: string;
}

export interface RankedHeroContent {
  /** Every crumb but the last links; the last is the current page. */
  readonly crumbs: readonly LinkRef[];
  readonly current: string;
  readonly title: string;
  readonly mutedTitle: string;
  readonly subtitle: string;
  readonly primary: LinkRef;
  readonly secondary: LinkRef;
}

/** Card layout; see `LAYOUT` in ranked-list.tsx. */
export type RankedVariant = "default" | "compact";
