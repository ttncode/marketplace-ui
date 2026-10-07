import type { DirectoryCard } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/types";

export interface CategoryListing {
  readonly slug: string;
  readonly name: string;
  readonly serverCount: number;
  readonly pageCount: number;
  readonly cards: readonly DirectoryCard[];
}

/** The source's footer under the grid: infinite scroll still pending, or everything loaded. */
export type ResultsStatus = "more" | "all";
