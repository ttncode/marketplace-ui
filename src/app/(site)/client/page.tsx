import type { Metadata } from "next";
import { ListingHero } from "@/components/sites/mcpmarket-com-1a9fdbee/categories-slug-c9486983/ListingHero";
import { ListingResults } from "@/components/sites/mcpmarket-com-1a9fdbee/categories-slug-c9486983/ListingResults";
import { CLIENT_CARDS } from "@/components/sites/mcpmarket-com-1a9fdbee/categories-slug-c9486983/listing-data";

const DESCRIPTION = "Explore our complete collection of MCP clients that connect AI tools to Claude and Cursor.";

// The source's only hidden page link here is "Page 1" at `/client?page=1`.
const PAGE_LINKS = [{ href: "/client?page=1", label: "Page 1" }] as const;

export const metadata: Metadata = {
  title: "Browse All MCP Clients | MCP Market",
  description: DESCRIPTION,
};

export default function ClientsPage() {
  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen flex-col bg-[var(--design-canvas)] font-sans text-[var(--design-ink)]">
        <ListingHero
          title="Browse All"
          mutedTitle="MCP Clients"
          description={DESCRIPTION}
          searchPlaceholder="Search for MCP servers..."
          withCategoryRail
        />
        <ListingResults cards={CLIENT_CARDS} status="all" pageLinks={PAGE_LINKS} />
      </div>
    </main>
  );
}
