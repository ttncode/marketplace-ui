import type { ServerDetail } from "../types";

export const yahooFinance: ServerDetail = {
  "slug": "yahoo-finance",
  "title": "Yahoo Finance MCP Server: Stock Data & Financial News",
  "metaDescription": "Access real-time stock data, financial news, and market insights with the Yahoo Finance MCP Server. Fetch ticker info, news, and more. Ideal for data science & ML projects.",
  "name": "Yahoo Finance",
  "author": {
    "name": "narumiruna",
    "href": "https://github.com/narumiruna",
    "avatar": {
      "src": "/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/avatars/avatar-4680567.png",
      "alt": "narumiruna"
    }
  },
  "stars": "196",
  "links": {
    "share": "https://mcpmarket.com/server/yahoo-finance",
    "github": "https://github.com/narumiruna/yfinance-mcp",
    "npm": null
  },
  "categories": [
    {
      "label": "API Development",
      "href": "/categories/api-development"
    },
    {
      "label": "Data Science & ML",
      "href": "/categories/data-science-ml"
    },
    {
      "label": "Web Scraping & Data Collection",
      "href": "/categories/web-scraping-data-collection"
    }
  ],
  "description": "Fetches stock data, news, and financial information from Yahoo Finance using an MCP server.",
  "tabs": {
    "slug": "yahoo-finance",
    "hasReadme": true,
    "longDescription": "Leverages yfinance to provide an MCP server interface for accessing a range of Yahoo Finance data. It offers tools to retrieve ticker information, news, search for quotes and news, and get market, sector, and industry data.",
    "features": [
      "Provides get_ticker_info tool",
      "Provides get_ticker_news tool",
      "Provides search_quote tool",
      "Provides search_news tool",
      "Provides get_market tool",
      "Provides get_sector tool",
      "Provides get_industry tool",
      "1 GitHub stars"
    ],
    "useCases": [],
    "faq": [
      {
        "question": "What is the Yahoo Finance MCP Server?",
        "answer": "It's a simple MCP server that uses yfinance to fetch stock data, news, and other financial information directly from Yahoo Finance."
      },
      {
        "question": "What tools does this server provide?",
        "answer": "The server provides tools such as get_ticker_info, get_ticker_news, search_quote, search_news, get_market, get_sector, and get_industry."
      },
      {
        "question": "How do I install and use the Yahoo Finance MCP Server?",
        "answer": "First, install uv. Then, add the provided configuration snippet to your MCP server configuration file. See the README for detailed instructions."
      },
      {
        "question": "What is yfinance?",
        "answer": "yfinance is a popular Python library used to access the Yahoo Finance API, allowing you to retrieve historical and real-time financial data."
      },
      {
        "question": "Is this tool suitable for automated trading?",
        "answer": "While it can fetch real-time data, it's crucial to ensure the data accuracy and reliability for automated trading. Always backtest and validate your strategies."
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
        "href": "/categories/api-development"
      },
      "items": [
        {
          "title": "Neon",
          "href": "/server/neon-1",
          "avatar": {
            "src": "/sites/mcpmarket-com-1a9fdbee/server-slug-89dc0d19/avatars/avatar-183852044.png",
            "alt": "neondatabase-labs"
          },
          "description": "Enables natural language interaction with the Neon Management API and databases through the Model Context Protocol."
        },
        {
          "title": "Firecrawl",
          "href": "/server/firecrawl",
          "avatar": {
            "src": "/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/avatars/avatar-135057108.png",
            "alt": "mendableai"
          },
          "description": "Empowers LLMs with advanced web scraping capabilities for content extraction, crawling, and search functionalities."
        },
        {
          "title": "Figma Context",
          "href": "/server/figma-context",
          "avatar": {
            "src": "/sites/mcpmarket-com-1a9fdbee/server-slug-89dc0d19/avatars/avatar-842883.png",
            "alt": "GLips"
          },
          "description": "Provides AI coding agents with simplified Figma layout information via the Model Context Protocol."
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
