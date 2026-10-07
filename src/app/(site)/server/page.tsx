import type { Metadata } from "next";
import { ListingHero } from "@/components/blocks/listing-hero";
import { ListingResults } from "@/components/blocks/listing-results";
import { toListingCard } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/card-listing";
import { CATEGORY_LINKS } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/site-data";
import {
  SERVER_CARDS,
  SERVER_PAGE_COUNT,
} from "@/components/sites/mcpmarket-com-1a9fdbee/categories-slug-c9486983/listing-data";
import { paginationLinks } from "@/lib/pagination";

export const metadata: Metadata = {
  title: "Browse All MCP Servers",
  description:
    "Explore our complete collection of MCP servers that connect Claude and Cursor to tools like Figma, Databricks, Storybook, and Ghidra.",
};

export default function ServersPage() {
  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen flex-col bg-[var(--design-canvas)] font-sans text-[var(--design-ink)]">
        <ListingHero
          title="Browse All"
          mutedTitle="MCP Servers"
          description="Explore our complete collection of MCP servers to connect AI to your favorite tools."
          searchPlaceholder="Search for MCP servers..."
          categoryLinks={CATEGORY_LINKS}
        />
        <ListingResults
          listings={SERVER_CARDS.map(toListingCard)}
          status="more"
          pageLinks={paginationLinks("/server", SERVER_PAGE_COUNT)}
        />
      </div>
    </main>
  );
}
