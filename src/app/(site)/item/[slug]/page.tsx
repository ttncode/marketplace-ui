import type { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "@/components/blocks/item-detail.module.css";
import { ItemHero } from "@/components/blocks/item-hero";
import { ItemSidebar } from "@/components/blocks/item-sidebar";
import { ItemTabs } from "@/components/blocks/item-tabs";
import { CATEGORIES } from "@/content/categories";
import { LISTINGS } from "@/content/listings";
import { site } from "@/site.config";

interface ItemPageProps {
  readonly params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return LISTINGS.map((listing) => ({ slug: listing.slug }));
}

async function findListing({ params }: ItemPageProps) {
  const { slug } = await params;
  const listing = LISTINGS.find((candidate) => candidate.slug === slug);
  if (!listing) notFound();
  return listing;
}

export async function generateMetadata(props: ItemPageProps): Promise<Metadata> {
  const listing = await findListing(props);
  return { title: listing.name, description: listing.summary };
}

export default async function ItemPage(props: ItemPageProps) {
  const listing = await findListing(props);
  const category = CATEGORIES.find((candidate) => candidate.slug === listing.category);
  const related = LISTINGS.filter((other) => other.category === listing.category && other.slug !== listing.slug).slice(0, 4);

  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen flex-col bg-[var(--design-canvas)] font-sans text-[var(--design-ink)]">
        <ItemHero listing={listing} categoryName={category?.name ?? listing.category} shareUrl={`${site.url}/item/${listing.slug}`} />
        <div className={`${styles.main} flex-1`}>
          <div className="container mx-auto max-w-7xl px-6 md:px-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-7">
              <section className="min-w-0 lg:col-span-3">
                <ItemTabs about={listing.about} features={listing.features} useCases={listing.useCases} faq={listing.faq} />
              </section>
              <ItemSidebar primary={{ label: `Visit ${listing.name}`, href: listing.author.href }} related={related} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
