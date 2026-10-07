import { DirectorySection } from "@/components/blocks/directory-section";
import { DIRECTORY_SECTIONS } from "@/components/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/directory-data";
import { FaqSection } from "@/components/blocks/faq";
import { CATEGORIES } from "@/content/categories";
import { HeroSection } from "@/components/blocks/hero";

const CATEGORY_LINKS = [
  { label: "All", href: "/categories" },
  ...CATEGORIES.map((category) => ({ label: category.name, href: `/categories/${category.slug}` })),
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen flex-col bg-[var(--design-canvas)] font-sans text-[var(--design-ink)]">
        <HeroSection categoryLinks={CATEGORY_LINKS} />
        <div className="flex-1">
          {DIRECTORY_SECTIONS.map((section, index) => (
            <DirectorySection key={section.title} section={section} tone={index % 2 === 1 ? "subtle" : "canvas"} />
          ))}
          <FaqSection />
        </div>
      </div>
    </main>
  );
}
