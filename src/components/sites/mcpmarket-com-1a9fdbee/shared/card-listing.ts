import type { ListingCardData } from "@/components/blocks/listing-card";
import type { DirectoryCard } from "./types";

/** Clone cards -> the template card's data; goes when the clone pages are deleted. */
export function toListingCard(card: DirectoryCard): ListingCardData {
  return {
    slug: card.href.split("/").pop() ?? card.href,
    name: card.title,
    summary: card.description,
    icon: card.avatar,
    tags: card.categories,
    stars: card.footer.kind === "stars" ? card.footer.value : undefined,
  };
}
