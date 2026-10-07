import { DirectorySection } from "@/components/blocks/directory-section";
import { FaqSection } from "@/components/blocks/faq";
import { HeroSection } from "@/components/blocks/hero";
import { CATEGORIES } from "@/content/categories";
import { FAQ } from "@/content/faq";
import { HERO, HOME_SECTIONS } from "@/content/home";
import { LISTINGS } from "@/content/listings";

const CATEGORY_LINKS = [
  { label: "All", href: "/categories" },
  ...CATEGORIES.map((category) => ({ label: category.name, href: `/categories/${category.slug}` })),
];

const LISTINGS_BY_SLUG = new Map(LISTINGS.map((listing) => [listing.slug, listing]));

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen flex-col bg-[var(--design-canvas)] font-sans text-[var(--design-ink)]">
        <HeroSection hero={HERO} categoryLinks={CATEGORY_LINKS} />
        <div className="flex-1">
          {HOME_SECTIONS.map((section, index) => (
            <DirectorySection
              key={section.title}
              title={section.title}
              badge={section.badge}
              viewAll={section.viewAll}
              listings={section.listingSlugs.flatMap((slug) => LISTINGS_BY_SLUG.get(slug) ?? [])}
              tone={index % 2 === 1 ? "subtle" : "canvas"}
            />
          ))}
          <FaqSection items={FAQ} />
        </div>
      </div>
    </main>
  );
}
