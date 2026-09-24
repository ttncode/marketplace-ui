import type { ServerDetail } from "../types";

export const googleSearchConsole: ServerDetail = {
  "slug": "google-search-console",
  "title": "Google Search Console MCP: Analyze Search Data",
  "metaDescription": "Access Google Search Console data via Model Context Protocol. Get search analytics, performance insights, and customize reports for better SEO. Compatible with Claude Desktop.",
  "name": "Google Search Console",
  "author": {
    "name": "ahonn",
    "href": "https://github.com/ahonn",
    "avatar": {
      "src": "/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/avatars/avatar-9718515.png",
      "alt": "ahonn"
    }
  },
  "stars": "273",
  "links": {
    "share": "https://mcpmarket.com/server/google-search-console",
    "github": "https://github.com/ahonn/mcp-server-gsc",
    "npm": "https://www.npmjs.com/package/mcp-server-gsc"
  },
  "categories": [
    {
      "label": "Analytics & Monitoring",
      "href": "/categories/analytics-monitoring"
    },
    {
      "label": "Web Scraping & Data Collection",
      "href": "/categories/web-scraping-data-collection"
    },
    {
      "label": "Marketing Automation",
      "href": "/categories/marketing-automation"
    }
  ],
  "description": "Provides access to Google Search Console data through the Model Context Protocol.",
  "tabs": {
    "slug": "google-search-console",
    "hasReadme": true,
    "longDescription": "Access Google Search Console data seamlessly with this Model Context Protocol (MCP) server. Retrieve search analytics with dimension support and customize reporting periods for rich data analysis. Designed for integration with tools like Claude, it enables efficient access to search performance metrics for enhanced insights.",
    "features": [
      "Retrieves search analytics data with dimension support",
      "Supports customizable reporting periods",
      "Compatible with Claude Desktop",
      "Provides access to search performance data",
      "Offers various search types (web, image, video, news)"
    ],
    "useCases": [
      "Analyzing search performance data for websites",
      "Integrating Google Search Console data with Claude for enhanced insights",
      "Customizing reporting periods for specific data analysis needs"
    ],
    "faq": [
      {
        "question": "Is this tool compatible with Claude Desktop?",
        "answer": "Yes, this MCP server is designed to work seamlessly with Claude Desktop, allowing you to integrate Google Search Console data into your workflows."
      },
      {
        "question": "What are the prerequisites for using this tool?",
        "answer": "You need Node.js 18 or later, a Google Cloud Project with the Search Console API enabled, and Service Account credentials with access to your Search Console properties."
      },
      {
        "question": "What is Google Search Console MCP Server?",
        "answer": "It's a Model Context Protocol (MCP) server that provides access to Google Search Console data, enabling you to analyze your website's search performance programmatically."
      },
      {
        "question": "What data can I access with this tool?",
        "answer": "You can retrieve search analytics data, including clicks, impressions, CTR, and position, segmented by dimensions like query, page, country, and device. Supports web, image, video, and news search types."
      },
      {
        "question": "How do I configure this tool for Claude Desktop?",
        "answer": "You need to configure the `mcpServers` section in your Claude Desktop configuration file, specifying the command, arguments, and environment variables (including the path to your Google Cloud credentials file)."
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
        "href": "/categories/analytics-monitoring"
      },
      "items": [
        {
          "title": "Tinybird",
          "href": "/server/tinybird",
          "avatar": {
            "src": "/sites/mcpmarket-com-1a9fdbee/server-slug-89dc0d19/avatars/avatar-53208553.png",
            "alt": "tinybirdco"
          },
          "description": "Connects to a Tinybird Workspace and interacts with data sources and API endpoints using the Model Context Protocol."
        },
        {
          "title": "Google Ads",
          "href": "/server/google-ads",
          "avatar": {
            "src": "/sites/mcpmarket-com-1a9fdbee/server-slug-89dc0d19/avatars/avatar-2776023.png",
            "alt": "cohnen"
          },
          "description": "Analyze advertising data through natural language conversations using Claude AI and Google Ads integration."
        },
        {
          "title": "Axiom",
          "href": "/server/axiom",
          "avatar": {
            "src": "/sites/mcpmarket-com-1a9fdbee/server-slug-89dc0d19/avatars/avatar-55885315.png",
            "alt": "ThetaBird"
          },
          "description": "Enables AI agents to query data stored in Axiom using the Axiom Processing Language (APL)."
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
