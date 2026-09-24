import type { Metadata } from "next";
import { ListingHero } from "@/components/sites/mcpmarket-com-1a9fdbee/categories-slug-c9486983/ListingHero";
import { ListingResults } from "@/components/sites/mcpmarket-com-1a9fdbee/categories-slug-c9486983/ListingResults";
import {
  SERVER_CARDS,
  SERVER_PAGE_COUNT,
} from "@/components/sites/mcpmarket-com-1a9fdbee/categories-slug-c9486983/listing-data";
import { paginationLinks } from "@/components/sites/mcpmarket-com-1a9fdbee/categories-slug-c9486983/pagination";

export const metadata: Metadata = {
  title: "Browse All MCP Servers | MCP Market",
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
          withCategoryRail
        />
        <ListingResults
          cards={SERVER_CARDS}
          status="more"
          pageLinks={paginationLinks("/server", SERVER_PAGE_COUNT)}
        />
      </div>
    </main>
  );
}
