import type { Metadata } from "next";
import { CategoryIndex } from "@/components/sites/mcpmarket-com-1a9fdbee/categories-f91e624d/CategoryIndex";
import { MCP_CATEGORIES } from "@/components/sites/mcpmarket-com-1a9fdbee/categories-f91e624d/categories-data";

export const metadata: Metadata = {
  title: "Categories | MCP Market",
  description: "Browse MCP servers by category to find the perfect tools for your AI workflow.",
};

export default function CategoriesPage() {
  return (
    <CategoryIndex
      trail={[{ label: "Categories", href: "/categories" }]}
      title="Browse by"
      description="Explore our comprehensive collection of MCP servers organized by category. Find the perfect MCP for your needs."
      tiles={MCP_CATEGORIES}
      unit="MCP servers"
    />
  );
}
