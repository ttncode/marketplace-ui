import type { FaqItem } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/types";

export interface WebMcpExample {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly host: string;
  readonly favicon: string;
}

const ASSETS = "/sites/mcpmarket-com-1a9fdbee/what-is-webmcp-03cc721f";

export const REGISTER_TOOL_SNIPPET = `await document.modelContext.registerTool({
  name: "add-todo",
  description: "Add a new item to the user's active todo list",
  inputSchema: {
    type: "object",
    properties: {
      text: { type: "string", description: "The todo item text" }
    },
    required: ["text"]
  },
  async execute({ text }) {
    await addTodoItemToCollection(text);
    return {
      content: [{ type: "text", text: \`Added todo item: "\${text}"\` }]
    };
  }
});`;

// Favicons captured from the live page. Empiva, Ultrasound Physics and Tribeca render as
// broken images on the source (their favicon URLs fail), so they point at files that do not exist.
export const WEBMCP_EXAMPLES: readonly WebMcpExample[] = [
  {
    slug: "empiva",
    title: "Empiva",
    description:
      "Search luxury villas, calculate exact stay quotes, and explore curated experiences and dining packages using WebMCP tools.",
    host: "empiva.com",
    favicon: `${ASSETS}/favicon-empiva.ico`,
  },
  {
    slug: "house-of-cannabis-whidbey-island",
    title: "House of Cannabis Whidbey Island",
    description:
      "Browse dispensary menus, search cannabis products, inspect pricing and potency, and trigger order handoffs via WebMCP tools.",
    host: "whidbeyisland.hoc420.com",
    favicon: `${ASSETS}/favicon-hoc420.ico`,
  },
  {
    slug: "ultrasound-physics-ai-studio",
    title: "Ultrasound Physics AI Studio",
    description:
      "Access ultrasound physics SPI practice questions, initiate mock exam simulations, and retrieve detailed physics explanations using WebMCP tools.",
    host: "ultrasound-physics.ai.studio",
    favicon: `${ASSETS}/favicon-ultrasound-physics-ai-studio.ico`,
  },
  {
    slug: "house-of-cannabis-twisp",
    title: "House of Cannabis Twisp",
    description:
      "Access store information, educational articles, customer rewards, and online ordering menus using WebMCP tools for House of Cannabis Twisp.",
    host: "twisp.hoc420.com",
    favicon: `${ASSETS}/favicon-hoc420.ico`,
  },
  {
    slug: "tribeca-multimedia",
    title: "Tribeca Multimedia",
    description:
      "Explore portfolio projects, inspect client lists, and draft project inquiries through WebMCP tools on Tribeca Multimedia's studio website.",
    host: "tribecamultimedia.com",
    favicon: `${ASSETS}/favicon-tribeca-multimedia.ico`,
  },
  {
    slug: "tootemaailm",
    title: "Tootemaailm",
    description:
      "Search online department store catalog items, navigate directly to product pages, and open the shopping cart using WebMCP tools.",
    host: "tootemaailm.ee",
    favicon: `${ASSETS}/favicon-tootemaailm.png`,
  },
];

export const COMPARISON_ROWS: readonly { readonly aspect: string; readonly mcp: string; readonly webmcp: string }[] = [
  {
    aspect: "Runtime",
    mcp: "A local process or remote service outside the page.",
    webmcp: "Client-side code in the active browser page.",
  },
  {
    aspect: "Connection",
    mcp: "An MCP client connects over a supported protocol transport.",
    webmcp: "A browser or in-page agent discovers tools through document.modelContext.",
  },
  {
    aspect: "Context and auth",
    mcp: "The server manages its own credentials and recreates the context it needs.",
    webmcp: "The tool can reuse the page's current session, state, and frontend logic.",
  },
  {
    aspect: "Capabilities",
    mcp: "Can expose tools, resources, and prompts backed by APIs, files, or databases.",
    webmcp: "The current proposal focuses on page actions exposed as imperative or declarative tools.",
  },
  {
    aspect: "User experience",
    mcp: "Often runs behind the AI conversation without an accompanying website UI.",
    webmcp: "Keeps the user, agent, and visible page in one shared workflow.",
  },
  {
    aspect: "Best fit",
    mcp: "Backend data access, headless automation, and reusable service integrations.",
    webmcp: "Interactive, human-in-the-loop tasks inside a stateful web application.",
  },
];

export const WEBMCP_FAQ: readonly FaqItem[] = [
  {
    question: "What is WebMCP?",
    answer:
      "WebMCP is an emerging web-platform proposal that lets a page describe its actions as structured tools for AI agents. A tool has a name, a natural-language description, an input schema, and page-owned code that performs the action while the web interface remains visible.",
  },
  {
    question: "How is WebMCP different from MCP?",
    answer:
      "MCP is a protocol for connecting AI applications to standalone local or remote servers. WebMCP is a browser-facing API for exposing actions from the current page. MCP is well suited to backend services and headless integrations; WebMCP is designed for interactive work that shares the page's session, state, and UI.",
  },
  {
    question: "Does WebMCP replace MCP servers?",
    answer:
      "No. The W3C proposal explicitly treats WebMCP as complementary to backend integrations such as MCP. A product can use MCP for service or data access and WebMCP for actions that should happen visibly inside the user's current browser session.",
  },
  {
    question: "Is the webmcp.dev implementation the current standard?",
    answer:
      "No. The jasonjmcghee/WebMCP repository and webmcp.dev site demonstrate an earlier implementation built around a localhost WebSocket bridge, tokens, and a page widget. Its maintainer states that it is not compliant with the newer W3C WebMCP proposal and points new adopters to the webmachinelearning/webmcp repository.",
  },
  {
    question: "Does WebMCP include resources, prompts, and sampling?",
    answer:
      "The current W3C proposal focuses on tools. The resources, prompts, and sampling examples on webmcp.dev belong to the earlier prototype and should not be assumed to be part of the current browser proposal.",
  },
  {
    question: "How does a website expose a WebMCP tool?",
    answer:
      "For custom JavaScript behavior, a page calls document.modelContext.registerTool() with a name, description, JSON Schema input definition, and execute callback. A declarative proposal also explores turning semantic HTML forms into tools through dedicated attributes.",
  },
  {
    question: "Can any MCP client use WebMCP automatically?",
    answer:
      "Not automatically. The current proposal needs support from the browser, browser agent, extension, or an in-page agent. The earlier prototype supplied a separate bridge for existing MCP clients, but that bridge is not the current WebMCP browser API.",
  },
  {
    question: "Do all browsers support WebMCP today?",
    answer:
      "No. Support remains experimental and uneven, with implementations and origin trials tracked by the WebMCP project rather than broad baseline availability. Developers should feature-detect the API and review the official implementation-status page before relying on it.",
  },
  {
    question: "Is WebMCP secure?",
    answer:
      "The proposal uses browser mediation, origin scoping, and Permissions Policy controls for iframe access. Those boundaries do not replace application security: sites still need input validation, authorization checks, least-privilege tools, and explicit user review for sensitive or irreversible actions.",
  },
];
