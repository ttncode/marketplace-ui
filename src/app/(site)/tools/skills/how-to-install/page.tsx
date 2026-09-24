import type { Metadata } from "next";
import { InstallGuide } from "@/components/sites/mcpmarket-com-1a9fdbee/tools-skills-how-to-install-a12bfe37/InstallGuide";

export const metadata: Metadata = {
  title: "How to Install Agent Skills - Installation Guides | MCP Market",
  description:
    "Learn how to install Agent Skills in Claude.ai, Claude Code, ChatGPT, and Codex. Step-by-step installation guides for all AI platforms.",
};

export default function HowToInstallPage() {
  return <InstallGuide />;
}
