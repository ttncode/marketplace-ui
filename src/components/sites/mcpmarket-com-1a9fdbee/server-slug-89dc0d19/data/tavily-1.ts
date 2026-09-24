import type { ServerDetail } from "../types";

export const tavily1: ServerDetail = {
  "slug": "tavily-1",
  "title": "Tavily: AI Web Search & Data Extraction for Assistants",
  "metaDescription": "Integrate real-time web search and data extraction into AI assistants like Claude & Cursor with Tavily MCP. Unlock powerful research & data analysis capabilities!",
  "name": "Tavily",
  "author": {
    "name": "tavily-ai",
    "href": "https://github.com/tavily-ai",
    "avatar": {
      "src": "/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/avatars/avatar-170207473.png",
      "alt": "tavily-ai"
    }
  },
  "stars": "2.4k",
  "links": {
    "share": "https://mcpmarket.com/server/tavily-1",
    "github": "https://github.com/tavily-ai/tavily-mcp",
    "npm": "https://www.npmjs.com/package/tavily-mcp"
  },
  "categories": [
    {
      "label": "Other",
      "href": "/categories/other"
    },
    {
      "label": "Data Science & ML",
      "href": "/categories/data-science-ml"
    },
    {
      "label": "Web Scraping & Data Collection",
      "href": "/categories/web-scraping-data-collection"
    },
    {
      "label": "Official",
      "href": "/categories/official"
    }
  ],
  "description": "Integrates Tavily's search and data extraction capabilities with AI assistants via the Model Context Protocol.",
  "tabs": {
    "slug": "tavily-1",
    "hasReadme": true,
    "longDescription": "Tavily MCP server provides seamless integration with tavily-search and tavily-extract, offering AI models real-time access to web information, advanced filtering, and domain-specific search features. By leveraging the Model Context Protocol (MCP), it enables AI systems to interact with data sources and tools, providing intelligent data extraction from web pages and real-time web search capabilities.",
    "features": [
      "Real-time web search capabilities",
      "Compatible with Cline, Cursor, and Claude Desktop",
      "Seamless interaction with tavily-search and tavily-extract tools",
      "Intelligent data extraction from web pages",
      "Utilizes the Model Context Protocol (MCP)"
    ],
    "useCases": [
      "Extracting content from web articles for AI processing",
      "Enabling AI assistants to perform web searches",
      "Combining search and extraction for complex data analysis tasks"
    ],
    "faq": [
      {
        "question": "What is Tavily MCP?",
        "answer": "Tavily MCP (Model Context Protocol) Server allows you to seamlessly integrate Tavily's search and data extraction capabilities into AI assistants like Claude, Cursor, and Cline, providing real-time access to web information."
      },
      {
        "question": "What are the key features of Tavily MCP?",
        "answer": "Key features include real-time web search through the tavily-search tool, intelligent data extraction from web pages using the tavily-extract tool, and compatibility with various MCP clients such as Cline, Cursor, and Claude Desktop."
      },
      {
        "question": "How do I get a Tavily API key?",
        "answer": "You can obtain a Tavily API key by signing up for a free account on the Tavily website: app.tavily.com/home."
      },
      {
        "question": "Which AI assistants are compatible with Tavily MCP?",
        "answer": "Tavily MCP is compatible with AI assistants that support the Model Context Protocol (MCP), including Cline, Cursor (version 0.45.6 or higher), and Claude Desktop."
      },
      {
        "question": "How do I configure Tavily MCP for Claude Desktop?",
        "answer": "You need to create or edit the 'claude_desktop_config.json' file in your Claude Desktop application support directory. Add a configuration block for 'tavily-mcp' specifying the command, arguments, and environment variables, including your Tavily API key."
      }
    ],
    "mcpTools": []
  },
  "primaryActions": null,
  "related": [
    {
      "title": "Related MCPs",
      "more": {
        "label": "View more",
        "href": "/categories/other"
      },
      "items": [
        {
          "title": "Obsidian Connector",
          "href": "/server/obsidian-connector-1",
          "avatar": {
            "src": "/sites/mcpmarket-com-1a9fdbee/server-slug-89dc0d19/avatars/avatar-190488992.png",
            "alt": "smithery-ai"
          },
          "description": "Connects Claude Desktop to read and search your Obsidian vault's Markdown notes."
        },
        {
          "title": "E2B",
          "href": "/server/e2b",
          "avatar": {
            "src": "/sites/mcpmarket-com-1a9fdbee/server-slug-89dc0d19/avatars/avatar-129434473.png",
            "alt": "e2b-dev"
          },
          "description": "Enables Claude to execute code using E2B sandboxes via the Model Context Protocol."
        },
        {
          "title": "Anilist",
          "href": "/server/anilist",
          "avatar": {
            "src": "/sites/mcpmarket-com-1a9fdbee/server-slug-89dc0d19/avatars/avatar-5277788.png",
            "alt": "yuna0x0"
          },
          "description": "Access anime, manga, and user data from AniList via the Model Context Protocol."
        }
      ]
    },
    {
      "title": "Related Skills",
      "more": {
        "label": "View all",
        "href": "/tools/skills"
      },
      "items": [
        {
          "title": "TaskFlow Inbox Triage",
          "href": "/tools/skills/taskflow-inbox-triage-2",
          "avatar": {
            "src": "/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/avatars/avatar-252820863.png",
            "alt": "openclaw"
          },
          "description": "Automates inbox classification, multi-channel message routing, and asynchronous reply handling using structured task workflows."
        },
        {
          "title": "Meme Maker",
          "href": "/tools/skills/meme-maker-1",
          "avatar": {
            "src": "/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/avatars/avatar-252820863.png",
            "alt": "openclaw"
          },
          "description": "Searches curated meme templates, suggests ideal joke formats, and renders custom memes in SVG, PNG, or hosted formats."
        },
        {
          "title": "Agent Skill Creator",
          "href": "/tools/skills/agent-skill-creator-1787994711990",
          "avatar": {
            "src": "/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/avatars/avatar-252820863.png",
            "alt": "openclaw"
          },
          "description": "Authors, repairs, and validates custom AgentSkills and SKILL.md configurations with standardized frontmatter and bundled resources."
        }
      ]
    }
  ]
};
