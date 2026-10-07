import type { Listing } from "@/lib/types";

export type RelatedListing = Pick<Listing, "slug" | "name" | "summary" | "icon">;
