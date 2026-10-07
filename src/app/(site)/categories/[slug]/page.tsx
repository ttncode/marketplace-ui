import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingHero } from "@/components/blocks/listing-hero";
import { ListingResults } from "@/components/blocks/listing-results";
import { CATEGORIES } from "@/content/categories";
import { LISTINGS } from "@/content/listings";

interface CategoryPageProps {
  readonly params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ slug: category.slug }));
}

async function findCategory({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = CATEGORIES.find((candidate) => candidate.slug === slug);
  if (!category) notFound();
  return category;
}

export async function generateMetadata(props: CategoryPageProps): Promise<Metadata> {
  const category = await findCategory(props);
  return {
    title: `${category.name} listings`,
    description: category.description,
  };
}

export default async function CategoryPage(props: CategoryPageProps) {
  const category = await findCategory(props);
  const listings = LISTINGS.filter((listing) => listing.category === category.slug);

  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen flex-col bg-[var(--design-canvas)] font-sans text-[var(--design-ink)]">
        <ListingHero
          title={category.name}
          mutedTitle="Listings"
          description={category.description}
          searchPlaceholder={`Search ${category.name} listings...`}
        />
        <ListingResults listings={listings} status="all" pageLinks={[]} />
      </div>
    </main>
  );
}
