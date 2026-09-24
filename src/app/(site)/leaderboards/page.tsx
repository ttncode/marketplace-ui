import type { Metadata } from "next";
import { SERVER_ROWS } from "@/components/sites/mcpmarket-com-1a9fdbee/leaderboards-47b0390f/leaderboard-data";
import { LeaderboardPage } from "@/components/sites/mcpmarket-com-1a9fdbee/leaderboards-47b0390f/LeaderboardPage";

export const metadata: Metadata = {
  title: "Top 100 MCP Servers Leaderboard | MCP Market",
  description:
    "Explore the most popular MCP servers ranked by GitHub stars. Find the best MCP servers to connect AI to your favorite tools.",
};

export default function ServersLeaderboardPage() {
  return (
    <LeaderboardPage
      rows={SERVER_ROWS}
      variant="server"
      hero={{
        crumbs: [{ label: "Home", href: "/" }],
        current: "Leaderboard",
        title: "Top 100",
        mutedTitle: "MCP Servers",
        subtitle:
          "Explore the most popular MCP servers ranked by GitHub stars. Find the best open-source tools to connect AI to your favorite services.",
        // The source links the latest daily list; captured 2026-09-24.
        primary: { label: "Top MCPs Today", href: "/daily/top-mcp-server-list-september-23-2026" },
        secondary: { label: "Browse All", href: "/daily" },
      }}
    />
  );
}
