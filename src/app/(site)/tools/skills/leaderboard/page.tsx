import type { Metadata } from "next";
import { SKILL_ROWS } from "@/components/sites/mcpmarket-com-1a9fdbee/leaderboards-47b0390f/leaderboard-data";
import { LeaderboardPage } from "@/components/sites/mcpmarket-com-1a9fdbee/leaderboards-47b0390f/LeaderboardPage";

export const metadata: Metadata = {
  title: "Skills Leaderboard | MCP Market",
  description: "Discover the most popular Agent Skills ranked by GitHub stars.",
};

export default function SkillsLeaderboardPage() {
  return (
    <LeaderboardPage
      rows={SKILL_ROWS}
      variant="skill"
      hero={{
        crumbs: [
          { label: "Home", href: "/" },
          { label: "Agent Skills", href: "/tools/skills" },
        ],
        current: "Leaderboard",
        title: "Top Agent",
        mutedTitle: "Skills",
        subtitle: "Explore the most popular Agent Skills for Claude, Claude Code, ChatGPT and Codex.",
        primary: { label: "Browse by Category", href: "/tools/skills/categories" },
        secondary: { label: "All Skills", href: "/tools/skills" },
      }}
    />
  );
}
