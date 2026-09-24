import type { Metadata } from "next";
import { WhatIsMcpServer } from "@/components/sites/mcpmarket-com-1a9fdbee/what-is-an-mcp-server-4bf875ce/WhatIsMcpServer";

export const metadata: Metadata = {
  title: "What is an MCP Server? Model Context Protocol Explained | MCP Market",
  description:
    "Learn about MCP Servers (Model Context Protocol) - the universal connector that bridges AI models like Claude, ChatGPT, and Codex to your data sources, tools, and services.",
};

export default function WhatIsAnMcpServerPage() {
  return <WhatIsMcpServer />;
}
