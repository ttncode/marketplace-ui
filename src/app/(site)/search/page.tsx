import type { Metadata } from "next";
import { BrowseByCategory } from "@/components/blocks/browse-by-category";
import { SearchView } from "@/components/blocks/search-view";
import { CATEGORIES } from "@/content/categories";
import { LISTINGS } from "@/content/listings";
import { parseSearchParams, searchListings, type RawSearchParams } from "@/lib/search-index";

interface SearchPageProps {
  readonly searchParams: Promise<RawSearchParams>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { query } = parseSearchParams(await searchParams);
  return {
    title: query ? `Search results for "${query}"` : "Search",
    description: "Find a listing by name, summary or tag.",
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = parseSearchParams(await searchParams);
  const listings = searchListings(LISTINGS, params).map(({ slug, name, summary, icon, tags, stars }) => ({
    slug,
    name,
    summary,
    icon,
    tags,
    stars,
  }));
  return (
    <main className="min-h-screen">
      <SearchView
        params={params}
        listings={listings}
        categories={CATEGORIES}
        browse={<BrowseByCategory categories={CATEGORIES} />}
      />
    </main>
  );
}
