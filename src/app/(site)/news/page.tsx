import type { Metadata } from "next";
import { NewsPage } from "@/components/sites/mcpmarket-com-1a9fdbee/news-f46b16ed/NewsPage";

export const metadata: Metadata = {
  title: "MCP Server News | MCP Market",
  description: "Latest model context protocol news and updates",
};

export default function NewsRoute() {
  return <NewsPage />;
}
