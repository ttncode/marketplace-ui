export interface NewsItem {
  readonly id: string;
  readonly title: string;
  /** Raw source text: newlines and markdown bullets collapse to spaces, as on the source. */
  readonly summary: string;
  readonly source: string;
  readonly publishedAt: string;
  /** The relative date the source rendered on 2026-09-24. */
  readonly relative: string;
  readonly url: string;
}

// Page 1 of the source's /news listing, captured 2026-09-24.
export const NEWS_ITEMS: readonly NewsItem[] = [
  {
    id: "243d60fc-0f73-49f6-8e8b-303d022fcf76",
    title: "Building AI Applications Using Model Context Protocol (MCP) Proxies",
    summary: "Anthropic's Model Context Protocol (MCP) is introduced, with a focus on leveraging MCP Proxies for sophisticated AI application development.\n*   MCP Proxies function as intermediaries, capable of modifying, filtering, or enhancing the contextual data exchanged between AI models and their integrated tools and services.\n*   Technical implementation details are provided through C# code examples, illustrating the creation of both Client and Server Proxies.\n*   The use of these proxies offers significant advantages, including advanced context augmentation, robust access control, performance optimization through caching, and seamless integration with diverse AI models.\n*   Practical applications discussed include fetching real-time external data, enforcing security policies, and managing complex API interactions and error handling.",
    source: "C-sharpcorner.com",
    publishedAt: "2026-07-03T07:55:25+00:00",
    relative: "3 months ago",
    url: "https://www.c-sharpcorner.com/article/building-ai-applications-using-model-context-protocol-mcp-proxies/",
  },
  {
    id: "5a270bff-6a20-4e8b-92ad-8736471c929b",
    title: "Safari’s New MCP Server Is Great for Agents",
    summary: "Safari is implementing a new feature for the Model Context Protocol (MCP), significantly enhancing how AI agents can interact with the web.\n*   This MCP server allows third-party tools and AI assistants to extend browser functionality.\n*   It enables AI agents to understand and perform actions on webpages, such as filling out forms or making reservations, more directly and reliably.\n*   The protocol standardizes the communication between AI agents and web content, moving beyond traditional methods like web scraping.\n*   This development could allow AI assistants, like Claude, to execute complex, multi-step tasks within the browser, transforming their web interaction capabilities.",
    source: "MacStories",
    publishedAt: "2026-07-02T12:12:36+00:00",
    relative: "3 months ago",
    url: "https://www.macstories.net/linked/safaris-new-mcp-server-is-great-for-agents/",
  },
  {
    id: "5b6b4608-fe87-46ae-853a-25fa3e1b4778",
    title: "New Model Context Protocol beta SDKs enable stateless AI agent scaling",
    summary: "Anthropic has launched beta SDKs for its Model Context Protocol (MCP), designed to facilitate seamless and stateless integration of external tools with large language models.\n*   MCP allows AI agents, particularly those powered by Claude, to interact with external APIs, databases, and web resources without needing to maintain conversation history for tool calls.\n*   This stateless approach significantly reduces context window limitations and operational costs, enhancing the scalability and reliability of AI agent deployments.\n*   The SDKs provide developers with clear, structured interfaces for defining and integrating tools, abstracting the underlying complexities of prompt engineering for tool execution.\n*   This development aims to make AI assistants more autonomous and capable in executing complex, multi-step workflows by simplifying tool access and management.",
    source: "4sysops.com",
    publishedAt: "2026-07-02T08:32:09+00:00",
    relative: "3 months ago",
    url: "https://4sysops.com/archives/new-model-context-protocol-beta-sdks-enable-stateless-ai-agent-scaling/",
  },
  {
    id: "9089fb55-e6d6-40fe-b19c-4925071fe8fb",
    title: "Safari’s new MCP server lets coding agents inspect and debug websites",
    summary: "Safari is reportedly introducing a new Model Context Protocol (MCP) server.\n*   The MCP server enables coding agents to interact with Safari.\n*   This integration allows AI agents to inspect and debug websites directly through the browser.\n*   The development aims to enhance the capabilities of AI-driven coding and debugging workflows.",
    source: "9to5Mac",
    publishedAt: "2026-07-01T21:59:20+00:00",
    relative: "3 months ago",
    url: "https://9to5mac.com/2026/07/01/safaris-new-mcp-server-lets-coding-agents-inspect-and-debug-websites/",
  },
  {
    id: "b6dc61c5-7a77-45fb-9aac-dce6939392ac",
    title: "Introducing the Safari MCP server for web developers",
    summary: "WebKit has introduced the Safari Model Context Protocol (MCP) server for web developers.\n*   The MCP is a protocol co-developed by Apple and Anthropic, enabling AI assistants and large language models to securely access current and relevant information directly from a user's browser.\n*   Safari will implement an MCP server, allowing AI clients such as Claude Desktop to connect and request browsing context with user consent.\n*   Web developers can control what information their websites share through HTTP response headers and meta tags, using directives like `model-context-allow`, `model-context-block`, and `model-context-restrict`.\n*   This server prioritizes user privacy and control, allowing users to grant or deny AI access to web content and providing granular developer policies for data sharing.",
    source: "Webkit.org",
    publishedAt: "2026-07-01T21:28:16+00:00",
    relative: "3 months ago",
    url: "https://webkit.org/blog/18136/introducing-the-safari-mcp-server-for-web-developers/",
  },
  {
    id: "4ef066f1-d339-442a-8c38-bd8ee2ffcb02",
    title: "Flowhub Launches MCP Connector, Giving Retailers the Freedom to Innovate with AI",
    summary: "Flowhub has launched its Model Context Protocol (MCP) Connector for cannabis retailers.\n- This innovation allows retailers to securely connect their Flowhub data with best-in-class AI models.\n- The MCP Connector empowers businesses to build custom AI assistants without compromising data privacy or security.\n- It leverages Anthropic's MCP, a protocol designed for large language models to safely access external tools and data.\n- Retailers can use these AI assistants for tasks such as personalized customer recommendations, enhanced inventory management, and optimized staffing decisions.",
    source: "PRNewswire",
    publishedAt: "2026-07-01T14:07:00+00:00",
    relative: "3 months ago",
    url: "https://www.prnewswire.com/news-releases/flowhub-launches-mcp-connector-giving-retailers-the-freedom-to-innovate-with-ai-302815679.html",
  },
  {
    id: "d9a8949c-22c9-49b5-912c-e37ce3da8cc8",
    title: "X launches MCP server for AI integration",
    summary: "X (formerly Twitter) has launched its own Model Context Protocol (MCP) server, signaling a strategic move to integrate advanced AI capabilities across its platform.\n* The MCP server aims to standardize how AI models interact with platform data and external tools, providing a robust framework for context exchange.\n* This development will enable developers and third-party AI services to more seamlessly access contextual understanding for features like content moderation and personalized recommendations.\n* It is anticipated to enhance advanced Retrieval-Augmented Generation (RAG) systems and intelligent agent-based applications within X’s ecosystem.\n* The launch highlights the industry's increasing focus on standardized AI protocols, drawing a comparison to Anthropic's championing of MCP for its Claude AI.",
    source: "Nextbigwhat.com",
    publishedAt: "2026-07-01T03:37:02+00:00",
    relative: "3 months ago",
    url: "https://nextbigwhat.com/x-launches-mcp-server-for-ai-integration/",
  },
  {
    id: "e4ac1b1d-0628-4681-9af2-4a27b40791dc",
    title: "Fix Bugs Faster with Rovo MCP",
    summary: "Atlassian launched Rovo, a new generative AI-powered assistant for developers aimed at accelerating bug resolution and reducing development effort.\n*   Rovo offers a chat interface that comprehends codebases, aiding developers in writing, explaining, and debugging code within their editor.\n*   It integrates data from Atlassian products like Jira and Bitbucket, alongside third-party tools such as GitHub.\n*   The assistant utilizes the Model Context Protocol (MCP) to interact with local development environments, facilitating real-time diagnostic data collection and code analysis.\n*   Model Context Protocol (MCP), co-created by Atlassian and Anthropic, is an open-source specification for information exchange between large language models and software tools like debuggers and test runners.",
    source: "Atlassian.com",
    publishedAt: "2026-06-30T23:24:01+00:00",
    relative: "3 months ago",
    url: "https://www.atlassian.com/blog/development/fix-bugs-faster-with-rovo-mcp",
  },
  {
    id: "01276876-1a4a-4ebf-8de8-24faa3695c59",
    title: "Siteimprove.ai MCP Server Now Integrates into Customer AI Workflows within Lovable, Anthropic Claude, VS Code and Figma to Bring Accessibility into Every Environment Where Digital Experiences Are Created",
    summary: "Siteimprove.ai has launched its Model Context Protocol (MCP) Server. This server integrates advanced accessibility insights directly into customer AI workflows. It enables AI assistants, specifically Anthropic's Claude, to access Siteimprove.ai's web accessibility knowledge base. Integrations allow real-time accessibility guidance within familiar tools such as VS Code and Figma. The MCP Server is compatible with AI agent frameworks like LangChain and LangGraph, exposing accessibility data and APIs as tools for AI assistants.",
    source: "PRNewswire",
    publishedAt: "2026-06-30T19:00:00+00:00",
    relative: "3 months ago",
    url: "https://www.prnewswire.com/news-releases/siteimproveai-mcp-server-now-integrates-into-customer-ai-workflows-within-lovable-anthropic-claude-vs-code-and-figma-to-bring-accessibility-into-every-environment-where-digital-experiences-are-created-302814725.html",
  },
  {
    id: "edebb32e-d71b-4db4-a182-ba07cf555043",
    title: "Siteimprove.ai MCP Server Now Integrates into Customer AI Workflows within Lovable, Anthropic Claude, VS Code and Figma to Bring Accessibility into Every Environment Where Digital Experiences Are Created",
    summary: "SiteimproveAI has integrated its MCP Server into customer AI workflows to embed accessibility checks directly into digital experience creation.\n*   The integration enables real-time accessibility feedback within AI assistants like Anthropic Claude, as well as development and design platforms such as VS Code and Figma.\n*   The Model Context Protocol (MCP) allows AI models to access real-time information and external tools, moving beyond static pre-trained data.\n*   SiteimproveAI's MCP Server provides Claude with direct access to its accessibility knowledge base and live scanning capabilities.\n*   This initiative aims to automatically identify and facilitate fixes for accessibility issues earlier in the development lifecycle.",
    source: "PRNewswire",
    publishedAt: "2026-06-30T19:00:00+00:00",
    relative: "3 months ago",
    url: "https://www.prnewswire.com/news-releases/siteimproveai-mcp-server-now-integrates-into-customer-ai-workflows-within-lovable-anthropic-claude-vs-code-and-figma-to-bring-accessibility-into-every-environment-where-digital-experiences-are-created-302814673.html",
  },
  {
    id: "086137ea-5f33-45e2-9f44-99932de2d64a",
    title: "Securing autonomous AI agents against model context protocol tool poisoning",
    summary: "Model Context Protocol (MCP) tool poisoning poses a critical security risk to autonomous AI agents by manipulating their access to and use of external tools.\n*   Tool poisoning exploits vulnerabilities in how AI agents interpret and execute instructions from tools, potentially leading to unauthorized actions or data exfiltration.\n*   Attackers can craft malicious tools that, once integrated via MCP, inject harmful context into an agent's reasoning process, leading it to misinterpret situations or perform unintended operations.\n*   Mitigation strategies include robust input validation, sandboxing tool execution, implementing strict access controls for tools, and employing real-time monitoring of agent behavior.\n*   The article highlights the need for a 'Defense-in-Depth' approach, combining technical security measures with human oversight to protect against sophisticated tool-based attacks.",
    source: "4sysops.com",
    publishedAt: "2026-06-30T18:27:45+00:00",
    relative: "3 months ago",
    url: "https://4sysops.com/archives/securing-autonomous-ai-agents-against-model-context-protocol-tool-poisoning/",
  },
  {
    id: "9a2b6af5-d814-4474-a82e-6de68ae0e936",
    title: "X now offers an MCP server to make its platform easier for AI tools to use | TechCrunch",
    summary: "X (formerly Twitter) has launched a Model Context Protocol (MCP) server for its platform.\n*   The new MCP server is designed to significantly streamline how AI tools and assistants interact with X.\n*   It facilitates easier access to X's data, content posting capabilities, and other features for AI clients through the MCP standard.\n*   This development aims to enhance X's integration within the broader AI assistant ecosystem.\n*   The move is expected to foster new AI-driven applications and improve the experience for AI tools leveraging X's platform.",
    source: "TechCrunch",
    publishedAt: "2026-06-30T15:08:42+00:00",
    relative: "3 months ago",
    url: "https://techcrunch.com/2026/06/30/x-now-offers-an-mcp-server-to-make-its-platform-easier-for-ai-tools-to-use/",
  },
];

export const NEWS_PAGE_COUNT = 46;
export const NEWS_TOTAL = 544;
