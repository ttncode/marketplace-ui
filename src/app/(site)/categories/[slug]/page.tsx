import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingHero } from "@/components/sites/mcpmarket-com-1a9fdbee/categories-slug-c9486983/ListingHero";
import { ListingResults } from "@/components/sites/mcpmarket-com-1a9fdbee/categories-slug-c9486983/ListingResults";
import { CATEGORY_LISTINGS } from "@/components/sites/mcpmarket-com-1a9fdbee/categories-slug-c9486983/listing-data";
import { paginationLinks } from "@/components/sites/mcpmarket-com-1a9fdbee/categories-slug-c9486983/pagination";

interface CategoryPageProps {
  readonly params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORY_LISTINGS.map((category) => ({ slug: category.slug }));
}

async function findCategory({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = CATEGORY_LISTINGS.find((candidate) => candidate.slug === slug);
  if (!category) notFound();
  return category;
}

export async function generateMetadata(props: CategoryPageProps): Promise<Metadata> {
  const { name } = await findCategory(props);
  return {
    title: `${name} MCP Servers | MCP Market`,
    // The literal "{count}" is on the source: its meta template is never filled in.
    description: `Discover our curated collection of MCP servers for ${name.toLowerCase()}. Browse {count} servers and find the perfect MCPs for your needs.`,
  };
}

export default async function CategoryPage(props: CategoryPageProps) {
  const category = await findCategory(props);
  const basePath = `/categories/${category.slug}`;

  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen flex-col bg-[var(--design-canvas)] font-sans text-[var(--design-ink)]">
        <ListingHero
          title={category.name}
          mutedTitle="MCP Servers"
          description={
            <>
              Discover our curated collection of MCP servers for {category.name.toLowerCase()}. Browse{" "}
              <span className="font-medium text-black tabular-nums">{category.serverCount}</span> servers and find the
              perfect MCPs for your needs.
            </>
          }
          searchPlaceholder={`Search ${category.name} servers...`}
        />
        <ListingResults
          cards={category.cards}
          status="more"
          pageLinks={paginationLinks(basePath, category.pageCount)}
        />
      </div>
    </main>
  );
}
