import type { Metadata } from "next";
import { SERVER_SNAPSHOTS } from "@/components/sites/mcpmarket-com-1a9fdbee/daily-8ad2b380/daily-data";
import { DailyPage } from "@/components/sites/mcpmarket-com-1a9fdbee/daily-8ad2b380/DailyPage";

export const metadata: Metadata = {
  title: "Daily MCP Snapshot Archive | MCP Market",
  description: "Browse daily rankings of the most popular MCP servers and discover new integrations.",
};

export default function DailyServersPage() {
  return (
    <DailyPage
      variant="server"
      snapshots={SERVER_SNAPSHOTS}
      hero={{
        crumbs: [],
        current: "Daily MCP Server Lists",
        title: "Daily MCP Server Lists",
        subtitle:
          "Browse our archive of daily MCP server lists. Discover newly found awesome Model Context Protocol servers ranked by GitHub stars each day.",
        links: [
          { label: "Daily Skills", href: "/daily/skills" },
          { label: "All-Time Top 100", href: "/leaderboards" },
          { label: "Browse All Servers", href: "/server" },
          { label: "Search MCP Servers", href: "/search" },
        ],
      }}
    />
  );
}
