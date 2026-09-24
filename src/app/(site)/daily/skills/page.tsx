import type { Metadata } from "next";
import { SKILL_SNAPSHOTS } from "@/components/sites/mcpmarket-com-1a9fdbee/daily-8ad2b380/daily-data";
import { DailyPage } from "@/components/sites/mcpmarket-com-1a9fdbee/daily-8ad2b380/DailyPage";

export const metadata: Metadata = {
  title: "Daily Skills Snapshot",
  description: "Browse our archive of daily Agent Skills snapshots. Discover top-ranked skills each day.",
};

export default function DailySkillsPage() {
  return (
    <DailyPage
      variant="skill"
      snapshots={SKILL_SNAPSHOTS}
      hero={{
        crumbs: [{ label: "Daily MCP Server Lists", href: "/daily" }],
        current: "Agent Skills",
        title: "Daily Skills Snapshot",
        subtitle: "Browse our archive of daily Agent Skills snapshots. Discover top-ranked skills each day.",
        links: [
          { label: "Daily MCP Servers", href: "/daily" },
          { label: "All-Time Top Skills", href: "/tools/skills/leaderboard" },
          { label: "Browse All Skills", href: "/tools/skills" },
          { label: "Search Skills", href: "/tools/skills/search" },
        ],
      }}
    />
  );
}
