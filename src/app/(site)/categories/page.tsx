import type { Metadata } from "next";
import { CategoryIndex } from "@/components/blocks/category-index";
import { CATEGORIES } from "@/content/categories";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse MCP servers by category to find the perfect tools for your AI workflow.",
};

// ponytail: counts become real once listings exist (Task 34)
const TILES = CATEGORIES.map((category) => ({
  name: category.name,
  href: `/categories/${category.slug}`,
  count: (0).toLocaleString("en-US"),
  icon: category.icon,
}));

export default function CategoriesPage() {
  return (
    <CategoryIndex
      trail={[{ label: "Categories", href: "/categories" }]}
      title="Browse by"
      description="Explore our comprehensive collection of MCP servers organized by category. Find the perfect MCP for your needs."
      tiles={TILES}
      unit="MCP servers"
    />
  );
}
