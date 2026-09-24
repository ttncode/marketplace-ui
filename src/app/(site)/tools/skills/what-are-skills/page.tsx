import type { Metadata } from "next";
import { WhatAreSkills } from "@/components/sites/mcpmarket-com-1a9fdbee/tools-skills-what-are-skills-48d6587a/WhatAreSkills";

export const metadata: Metadata = {
  title: "What Are Agent Skills? Claude Skills Explained | MCP Market",
  description:
    "Learn about Agent Skills (Claude Skills) - modular AI capabilities that extend Claude, ChatGPT, and Codex with specialized knowledge, workflows, and code execution.",
};

export default function WhatAreSkillsPage() {
  return <WhatAreSkills />;
}
