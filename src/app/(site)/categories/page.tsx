import type { Metadata } from "next";
import { CategoryIndex } from "@/components/blocks/category-index";
import { CATEGORIES } from "@/content/categories";
import { LISTINGS } from "@/content/listings";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse every listing in the directory, organised by category.",
};

const TILES = CATEGORIES.map((category) => ({
  name: category.name,
  href: `/categories/${category.slug}`,
  count: LISTINGS.filter((listing) => listing.category === category.slug).length.toLocaleString("en-US"),
  icon: category.icon,
}));

export default function CategoriesPage() {
  return (
    <CategoryIndex
      trail={[{ label: "Categories", href: "/categories" }]}
      title="Browse by"
      description="Browse every listing in the directory, organised by category."
      tiles={TILES}
      unit="listings"
    />
  );
}
