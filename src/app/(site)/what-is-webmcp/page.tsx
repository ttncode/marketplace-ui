import type { Metadata } from "next";
import { WhatIsWebMcp } from "@/components/sites/mcpmarket-com-1a9fdbee/what-is-webmcp-03cc721f/WhatIsWebMcp";

export const metadata: Metadata = {
  title: "What is WebMCP? The Web Standard for AI Agent Tools Explained | MCP Market",
  description:
    "Learn about WebMCP - an emerging web standard that lets websites expose their own functionality as tools AI agents can discover and call directly in the browser, alongside MCP servers.",
};

export default function WhatIsWebMcpPage() {
  return <WhatIsWebMcp />;
}
