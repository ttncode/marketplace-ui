import type { Metadata } from "next";
import { BrowseByCategory } from "@/components/sites/mcpmarket-com-1a9fdbee/search-6fb5b778/BrowseByCategory";
import { SearchView } from "@/components/sites/mcpmarket-com-1a9fdbee/search-6fb5b778/SearchView";
import {
  parseSearchParams,
  searchCards,
  type RawSearchParams,
} from "@/components/sites/mcpmarket-com-1a9fdbee/search-6fb5b778/search-index";

interface SearchPageProps {
  readonly searchParams: Promise<RawSearchParams>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { query, categorySlug } = parseSearchParams(await searchParams);
  // Reproduces the source's template, doubled "Search" and raw slug included.
  const results = query ? ` Search results for "${query}"` : "";
  const scope = categorySlug ? ` in ${categorySlug}` : "";
  return {
    title: `Search${results}${scope} | MCP Market`,
    description: "Browse all MCP servers to connect your AI agents with powerful tools and services.",
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = parseSearchParams(await searchParams);
  return (
    <main className="min-h-screen">
      <SearchView params={params} cards={searchCards(params)} browse={<BrowseByCategory />} />
    </main>
  );
}
