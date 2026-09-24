import type { ServerDetail } from "../types";

export const firecrawl: ServerDetail = {
  "slug": "firecrawl",
  "title": "Firecrawl: LLM-Powered Web Scraping & Data Extraction",
  "metaDescription": "Firecrawl empowers LLMs with advanced web scraping, crawling, and search. Extract data, discover URLs, and integrate with Claude. Try Firecrawl today!",
  "name": "Firecrawl",
  "author": {
    "name": "mendableai",
    "href": "https://github.com/mendableai",
    "avatar": {
      "src": "/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/avatars/avatar-135057108.png",
      "alt": "mendableai"
    }
  },
  "stars": "4.2k",
  "links": {
    "share": "https://mcpmarket.com/server/firecrawl",
    "github": "https://github.com/mendableai/firecrawl-mcp-server",
    "npm": "https://www.npmjs.com/package/firecrawl-mcp"
  },
  "categories": [
    {
      "label": "API Development",
      "href": "/categories/api-development"
    },
    {
      "label": "Developer Tools",
      "href": "/categories/developer-tools"
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
  "description": "Empowers LLMs with advanced web scraping capabilities for content extraction, crawling, and search functionalities.",
  "tabs": {
    "slug": "firecrawl",
    "hasReadme": true,
    "longDescription": "Firecrawl integrates seamlessly with LLM clients like Cursor and Claude, providing powerful web scraping features. It supports scraping, crawling, searching, and extracting content with JavaScript rendering and efficient batch processing. The server includes features like URL discovery, web search with content extraction, automatic retries, credit usage monitoring, and comprehensive logging. It supports both cloud and self-hosted Firecrawl instances, offering flexible configuration options for various use cases.",
    "features": [
      "Web scraping with JS rendering",
      "URL discovery and crawling",
      "Web search with content extraction",
      "Efficient batch processing with built-in rate limiting",
      "Comprehensive logging system"
    ],
    "useCases": [
      "Enhance LLM context with real-time web data",
      "Automate data collection from multiple websites",
      "Extract structured information from web pages for analysis"
    ],
    "faq": [
      {
        "question": "What is Firecrawl?",
        "answer": "Firecrawl is a tool that empowers LLMs (Large Language Models) with advanced web scraping, crawling, and search capabilities. It allows you to extract content, discover URLs, and perform web searches with ease."
      },
      {
        "question": "What are the key features of Firecrawl?",
        "answer": "Key features include web scraping with JS rendering, URL discovery and crawling, web search with content extraction, efficient batch processing with built-in rate limiting, and a comprehensive logging system."
      },
      {
        "question": "How does Firecrawl integrate with LLMs?",
        "answer": "Firecrawl acts as an MCP (Model Context Protocol) server, providing LLMs like Claude with the ability to access and process information from the web. This enables them to perform more complex tasks that require real-time data."
      },
      {
        "question": "Can I use Firecrawl for batch processing?",
        "answer": "Yes, Firecrawl offers efficient batch processing with built-in rate limiting, allowing you to scrape multiple URLs simultaneously without overwhelming the target servers. It also supports retries with exponential backoff for increased reliability."
      },
      {
        "question": "Is it possible to use Firecrawl with a self-hosted instance?",
        "answer": "Yes, Firecrawl supports both cloud and self-hosted instances. For self-hosted instances, you can configure the `FIRECRAWL_API_URL` environment variable. If not set, the cloud API will be used, requiring an API key."
      }
    ],
    "mcpTools": [
      {
        "name": "firecrawl_scrape",
        "description": "\nScrape content from a single URL with advanced options. \nThis is the most powerful, fastest and most reliable scraper tool, if available you should always default to using this tool for any web scraping needs.\n\n**Best for:** Single page content extraction, when you know exactly which page contains the information.\n**Not recommended for:** Multiple pages (use batch_scrape), unknown page (use search), structured data (use extract).\n**Common mistakes:** Using scrape for a list of URLs (use batch_scrape instead). If batch scrape doesnt work, just use scrape and call it multiple times.\n**Prompt Example:** \"Get the content of the page at https://example.com.\"\n**Usage Example:**\n```json\n{\n  \"name\": \"firecrawl_scrape\",\n  \"arguments\": {\n    \"url\": \"https://example.com\",\n    \"formats\": [\"markdown\"],\n    \"maxAge\": 172800000\n  }\n}\n```\n**Performance:** Add maxAge parameter for 500% faster scrapes using cached data.\n**Returns:** Markdown, HTML, or other formats as specified.\n\n",
        "params": [
          {
            "name": "url",
            "type": "string",
            "required": true
          },
          {
            "name": "maxAge",
            "type": "number",
            "required": false
          },
          {
            "name": "mobile",
            "type": "boolean",
            "required": false
          },
          {
            "name": "actions",
            "type": "array",
            "required": false
          },
          {
            "name": "formats",
            "type": "array",
            "required": false
          },
          {
            "name": "parsers",
            "type": "array",
            "required": false
          },
          {
            "name": "waitFor",
            "type": "number",
            "required": false
          },
          {
            "name": "location",
            "type": "object",
            "required": false
          },
          {
            "name": "excludeTags",
            "type": "array",
            "required": false
          },
          {
            "name": "includeTags",
            "type": "array",
            "required": false
          },
          {
            "name": "storeInCache",
            "type": "boolean",
            "required": false
          },
          {
            "name": "onlyMainContent",
            "type": "boolean",
            "required": false
          },
          {
            "name": "removeBase64Images",
            "type": "boolean",
            "required": false
          },
          {
            "name": "skipTlsVerification",
            "type": "boolean",
            "required": false
          }
        ]
      },
      {
        "name": "firecrawl_map",
        "description": "\nMap a website to discover all indexed URLs on the site.\n\n**Best for:** Discovering URLs on a website before deciding what to scrape; finding specific sections of a website.\n**Not recommended for:** When you already know which specific URL you need (use scrape or batch_scrape); when you need the content of the pages (use scrape after mapping).\n**Common mistakes:** Using crawl to discover URLs instead of map.\n**Prompt Example:** \"List all URLs on example.com.\"\n**Usage Example:**\n```json\n{\n  \"name\": \"firecrawl_map\",\n  \"arguments\": {\n    \"url\": \"https://example.com\"\n  }\n}\n```\n**Returns:** Array of URLs found on the site.\n",
        "params": [
          {
            "name": "url",
            "type": "string",
            "required": true
          },
          {
            "name": "limit",
            "type": "number",
            "required": false
          },
          {
            "name": "search",
            "type": "string",
            "required": false
          },
          {
            "name": "sitemap",
            "type": "string",
            "required": false,
            "enum": [
              "include",
              "skip",
              "only"
            ]
          },
          {
            "name": "includeSubdomains",
            "type": "boolean",
            "required": false
          },
          {
            "name": "ignoreQueryParameters",
            "type": "boolean",
            "required": false
          }
        ]
      },
      {
        "name": "firecrawl_search",
        "description": "\nSearch the web and optionally extract content from search results. This is the most powerful web search tool available, and if available you should always default to using this tool for any web search needs.\n\nThe query also supports search operators, that you can use if needed to refine the search:\n| Operator | Functionality | Examples |\n---|-|-|\n| `\"\"` | Non-fuzzy matches a string of text | `\"Firecrawl\"`\n| `-` | Excludes certain keywords or negates other operators | `-bad`, `-site:firecrawl.dev`\n| `site:` | Only returns results from a specified website | `site:firecrawl.dev`\n| `inurl:` | Only returns results that include a word in the URL | `inurl:firecrawl`\n| `allinurl:` | Only returns results that include multiple words in the URL | `allinurl:git firecrawl`\n| `intitle:` | Only returns results that include a word in the title of the page | `intitle:Firecrawl`\n| `allintitle:` | Only returns results that include multiple words in the title of the page | `allintitle:firecrawl playground`\n| `related:` | Only returns results that are related to a specific domain | `related:firecrawl.dev`\n| `imagesize:` | Only returns images with exact dimensions | `imagesize:1920x1080`\n| `larger:` | Only returns images larger than specified dimensions | `larger:1920x1080`\n\n**Best for:** Finding specific information across multiple websites, when you don't know which website has the information; when you need the most relevant content for a query.\n**Not recommended for:** When you need to search the filesystem. When you already know which website to scrape (use scrape); when you need comprehensive coverage of a single website (use map or crawl.\n**Common mistakes:** Using crawl or map for open-ended questions (use search instead).\n**Prompt Example:** \"Find the latest research papers on AI published in 2023.\"\n**Sources:** web, images, news, default to web unless needed images or news.\n**Scrape Options:** Only use scrapeOptions when you think it is absolutely necessary. When you do so default to a lower limit to avoid timeouts, 5 or lower.\n**Optimal Workflow:** Search first using firecrawl_search without formats, then after fetching the results, use the scrape tool to get the content of the relevantpage(s) that you want to scrape\n\n**Usage Example without formats (Preferred):**\n```json\n{\n  \"name\": \"firecrawl_search\",\n  \"arguments\": {\n    \"query\": \"top AI companies\",\n    \"limit\": 5,\n    \"sources\": [\n      \"web\"\n    ]\n  }\n}\n```\n**Usage Example with formats:**\n```json\n{\n  \"name\": \"firecrawl_search\",\n  \"arguments\": {\n    \"query\": \"latest AI research papers 2023\",\n    \"limit\": 5,\n    \"lang\": \"en\",\n    \"country\": \"us\",\n    \"sources\": [\n      \"web\",\n      \"images\",\n      \"news\"\n    ],\n    \"scrapeOptions\": {\n      \"formats\": [\"markdown\"],\n      \"onlyMainContent\": true\n    }\n  }\n}\n```\n**Returns:** Array of search results (with optional scraped content).\n",
        "params": [
          {
            "name": "tbs",
            "type": "string",
            "required": false
          },
          {
            "name": "limit",
            "type": "number",
            "required": false
          },
          {
            "name": "query",
            "type": "string",
            "required": true
          },
          {
            "name": "filter",
            "type": "string",
            "required": false
          },
          {
            "name": "sources",
            "type": "array",
            "required": false
          },
          {
            "name": "location",
            "type": "string",
            "required": false
          },
          {
            "name": "scrapeOptions",
            "type": "object",
            "required": false
          }
        ]
      },
      {
        "name": "firecrawl_crawl",
        "description": "\n Starts a crawl job on a website and extracts content from all pages.\n \n **Best for:** Extracting content from multiple related pages, when you need comprehensive coverage.\n **Not recommended for:** Extracting content from a single page (use scrape); when token limits are a concern (use map + batch_scrape); when you need fast results (crawling can be slow).\n **Warning:** Crawl responses can be very large and may exceed token limits. Limit the crawl depth and number of pages, or use map + batch_scrape for better control.\n **Common mistakes:** Setting limit or maxDiscoveryDepth too high (causes token overflow) or too low (causes missing pages); using crawl for a single page (use scrape instead). Using a /* wildcard is not recommended.\n **Prompt Example:** \"Get all blog posts from the first two levels of example.com/blog.\"\n **Usage Example:**\n ```json\n {\n   \"name\": \"firecrawl_crawl\",\n   \"arguments\": {\n     \"url\": \"https://example.com/blog/*\",\n     \"maxDiscoveryDepth\": 5,\n     \"limit\": 20,\n     \"allowExternalLinks\": false,\n     \"deduplicateSimilarURLs\": true,\n     \"sitemap\": \"include\"\n   }\n }\n ```\n **Returns:** Operation ID for status checking; use firecrawl_check_crawl_status to check progress.\n \n ",
        "params": [
          {
            "name": "url",
            "type": "string",
            "required": true
          },
          {
            "name": "delay",
            "type": "number",
            "required": false
          },
          {
            "name": "limit",
            "type": "number",
            "required": false
          },
          {
            "name": "prompt",
            "type": "string",
            "required": false
          },
          {
            "name": "sitemap",
            "type": "string",
            "required": false,
            "enum": [
              "skip",
              "include",
              "only"
            ]
          },
          {
            "name": "webhook",
            "type": "any",
            "required": false
          },
          {
            "name": "excludePaths",
            "type": "array",
            "required": false
          },
          {
            "name": "includePaths",
            "type": "array",
            "required": false
          },
          {
            "name": "scrapeOptions",
            "type": "object",
            "required": false
          },
          {
            "name": "maxConcurrency",
            "type": "number",
            "required": false
          },
          {
            "name": "allowSubdomains",
            "type": "boolean",
            "required": false
          },
          {
            "name": "crawlEntireDomain",
            "type": "boolean",
            "required": false
          },
          {
            "name": "maxDiscoveryDepth",
            "type": "number",
            "required": false
          },
          {
            "name": "allowExternalLinks",
            "type": "boolean",
            "required": false
          },
          {
            "name": "ignoreQueryParameters",
            "type": "boolean",
            "required": false
          },
          {
            "name": "deduplicateSimilarURLs",
            "type": "boolean",
            "required": false
          }
        ]
      },
      {
        "name": "firecrawl_check_crawl_status",
        "description": "\nCheck the status of a crawl job.\n\n**Usage Example:**\n```json\n{\n  \"name\": \"firecrawl_check_crawl_status\",\n  \"arguments\": {\n    \"id\": \"550e8400-e29b-41d4-a716-446655440000\"\n  }\n}\n```\n**Returns:** Status and progress of the crawl job, including results if available.\n",
        "params": [
          {
            "name": "id",
            "type": "string",
            "required": true
          }
        ]
      },
      {
        "name": "firecrawl_extract",
        "description": "\nExtract structured information from web pages using LLM capabilities. Supports both cloud AI and self-hosted LLM extraction.\n\n**Best for:** Extracting specific structured data like prices, names, details from web pages.\n**Not recommended for:** When you need the full content of a page (use scrape); when you're not looking for specific structured data.\n**Arguments:**\n- urls: Array of URLs to extract information from\n- prompt: Custom prompt for the LLM extraction\n- schema: JSON schema for structured data extraction\n- allowExternalLinks: Allow extraction from external links\n- enableWebSearch: Enable web search for additional context\n- includeSubdomains: Include subdomains in extraction\n**Prompt Example:** \"Extract the product name, price, and description from these product pages.\"\n**Usage Example:**\n```json\n{\n  \"name\": \"firecrawl_extract\",\n  \"arguments\": {\n    \"urls\": [\"https://example.com/page1\", \"https://example.com/page2\"],\n    \"prompt\": \"Extract product information including name, price, and description\",\n    \"schema\": {\n      \"type\": \"object\",\n      \"properties\": {\n        \"name\": { \"type\": \"string\" },\n        \"price\": { \"type\": \"number\" },\n        \"description\": { \"type\": \"string\" }\n      },\n      \"required\": [\"name\", \"price\"]\n    },\n    \"allowExternalLinks\": false,\n    \"enableWebSearch\": false,\n    \"includeSubdomains\": false\n  }\n}\n```\n**Returns:** Extracted structured data as defined by your schema.\n",
        "params": [
          {
            "name": "urls",
            "type": "array",
            "required": true
          },
          {
            "name": "prompt",
            "type": "string",
            "required": false
          },
          {
            "name": "schema",
            "type": "object",
            "required": false
          },
          {
            "name": "enableWebSearch",
            "type": "boolean",
            "required": false
          },
          {
            "name": "includeSubdomains",
            "type": "boolean",
            "required": false
          },
          {
            "name": "allowExternalLinks",
            "type": "boolean",
            "required": false
          }
        ]
      }
    ]
  },
  "primaryActions": {
    "run": {
      "caption": "One-click cloud hosting",
      "label": "Run on MCP Market",
      "href": "https://app.mcpmarket.com/deploy?name=Firecrawl&npm=firecrawl-mcp"
    },
    "tryNowHref": "https://firecrawl.link/mcp"
  },
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
          "title": "Figma Context",
          "href": "/server/figma-context",
          "avatar": {
            "src": "/sites/mcpmarket-com-1a9fdbee/server-slug-89dc0d19/avatars/avatar-842883.png",
            "alt": "GLips"
          },
          "description": "Provides AI coding agents with simplified Figma layout information via the Model Context Protocol."
        },
        {
          "title": "E2B",
          "href": "/server/e2b",
          "avatar": {
            "src": "/sites/mcpmarket-com-1a9fdbee/server-slug-89dc0d19/avatars/avatar-129434473.png",
            "alt": "e2b-dev"
          },
          "description": "Enables Claude to execute code using E2B sandboxes via the Model Context Protocol."
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
