import type { Metadata } from "next";
import { CategoryIndex } from "@/components/sites/mcpmarket-com-1a9fdbee/categories-f91e624d/CategoryIndex";
import { SKILL_CATEGORIES } from "@/components/sites/mcpmarket-com-1a9fdbee/categories-f91e624d/categories-data";

export const metadata: Metadata = {
  title: "Skill Categories | MCP Market",
  description: "Browse Agent Skills by category to find the tools you need.",
};

export default function SkillCategoriesPage() {
  return (
    <CategoryIndex
      trail={[
        { label: "Agent Skills", href: "/tools/skills" },
        { label: "Categories", href: "/tools/skills/categories" },
      ]}
      title="Browse Skills by"
      description="Explore Agent Skills organized by category to find exactly what you need."
      tiles={SKILL_CATEGORIES}
      unit="skills"
    />
  );
}
