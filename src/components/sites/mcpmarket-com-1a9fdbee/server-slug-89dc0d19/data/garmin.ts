import type { ServerDetail } from "../types";

export const garmin: ServerDetail = {
  "slug": "garmin",
  "title": "Garmin MCP Server: Connect Garmin Data to Claude",
  "metaDescription": "Bridge Garmin Connect to Claude! Access fitness data, activities, health metrics (steps, heart rate, sleep), and body composition data. Enhance your Data Science workflows.",
  "name": "Garmin",
  "author": {
    "name": "Taxuspt",
    "href": "https://github.com/Taxuspt",
    "avatar": {
      "src": "/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/avatars/avatar-7362997.png",
      "alt": "Taxuspt"
    }
  },
  "stars": "1.2k",
  "links": {
    "share": "https://mcpmarket.com/server/garmin",
    "github": "https://github.com/taxuspt/garmin_mcp",
    "npm": null
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
      "label": "Analytics & Monitoring",
      "href": "/categories/analytics-monitoring"
    }
  ],
  "description": "Connects to Garmin Connect and exposes fitness and health data to MCP-compatible clients.",
  "tabs": {
    "slug": "garmin",
    "hasReadme": true,
    "longDescription": "Garmin allows you to access your Garmin Connect fitness and health data from Model Context Protocol (MCP) compatible clients, like Claude. It fetches data such as recent activities, detailed activity information, health metrics (steps, heart rate, sleep), and body composition data, making it available for analysis and integration with other applications.",
    "features": [
      "Provides detailed activity information",
      "Views body composition data",
      "Lists recent activities",
      "Accesses health metrics (steps, heart rate, sleep)"
    ],
    "useCases": [
      "Analyze fitness data within Claude",
      "Track health metrics and activity levels",
      "Integrate Garmin data with other MCP-compatible applications"
    ],
    "faq": [
      {
        "question": "What is the Garmin MCP Server?",
        "answer": "It's a tool that connects your Garmin Connect data (fitness activities, health metrics) to MCP-compatible clients like Claude, enabling you to analyze and query your data."
      },
      {
        "question": "What kind of data can I access?",
        "answer": "You can access a variety of data including recent activities, detailed activity information, health metrics (steps, heart rate, sleep), and body composition data."
      },
      {
        "question": "How do I set up the Garmin MCP Server?",
        "answer": "You'll need to install the required packages, create a `.env` file with your Garmin credentials, and configure Claude Desktop to connect to the server. See the detailed setup instructions in the documentation."
      },
      {
        "question": "Is my data secure?",
        "answer": "The server requires your Garmin credentials in a `.env` file. It's crucial to keep this file secure and never commit it to any repository. Follow best practices for credential management."
      },
      {
        "question": "What can I do with this data in Claude?",
        "answer": "You can ask questions like 'Show me my recent activities,' 'What was my sleep like last night?' or 'How many steps did I take yesterday?' to gain insights from your Garmin data."
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
