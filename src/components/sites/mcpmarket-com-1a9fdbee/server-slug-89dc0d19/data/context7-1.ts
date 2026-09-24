import type { ServerDetail } from "../types";

export const context71: ServerDetail = {
  "slug": "context7-1",
  "title": "Context7: Up-to-Date Docs for AI Code Editors",
  "metaDescription": "Context7 fetches current documentation and code examples for LLMs directly from the source. Integrate with Cursor, VS Code, and more. Get accurate AI coding assistance!",
  "name": "Context7",
  "author": {
    "name": "upstash",
    "href": "https://github.com/upstash",
    "avatar": {
      "src": "/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/avatars/avatar-74989412.png",
      "alt": "upstash"
    }
  },
  "stars": "62k",
  "links": {
    "share": "https://mcpmarket.com/server/context7-1",
    "github": "https://github.com/upstash/context7",
    "npm": "https://www.npmjs.com/package/@upstash/context7-mcp"
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
      "label": "Learning & Documentation",
      "href": "/categories/learning-documentation"
    }
  ],
  "description": "Fetches up-to-date documentation and code examples for LLMs and AI code editors directly from the source.",
  "tabs": {
    "slug": "context7-1",
    "hasReadme": true,
    "longDescription": "Context7 addresses the issue of LLMs relying on outdated information by pulling version-specific documentation and code examples directly into your prompts. By adding `use context7` to your prompt, the tool fetches relevant and current information, preventing hallucinated APIs and outdated code generations. It integrates with various MCP clients such as Cursor, Windsurf, Claude Desktop and VS Code, providing a seamless experience for developers seeking accurate and up-to-date context for their LLM-powered coding tasks.",
    "features": [
      "Supports multiple installation methods (npx, bunx, deno)",
      "Offers version-specific documentation for accurate results",
      "Provides tools for resolving library IDs and fetching documentation",
      "Fetches up-to-date documentation and code examples",
      "3,001 GitHub stars",
      "Integrates with Cursor, Windsurf, Claude Desktop, and VS Code"
    ],
    "useCases": [
      "Avoiding hallucinated APIs and outdated information in code generation",
      "Generating accurate and up-to-date code examples with LLMs",
      "Integrating current documentation into AI code editors"
    ],
    "faq": [
      {
        "question": "How can I install Context7?",
        "answer": "Context7 offers multiple installation methods, including using `npx`, `bunx`, and `deno`. Refer to the Context7 documentation for specific instructions based on your preferred AI code editor and package manager."
      },
      {
        "question": "What if I encounter an 'ERR_MODULE_NOT_FOUND' error?",
        "answer": "If you encounter this error, try using `bunx` instead of `npx` in your configuration. This often resolves module resolution issues."
      },
      {
        "question": "How do I use Context7 in my prompts?",
        "answer": "Simply add `use context7` to your prompt in supported AI code editors. Context7 will then automatically fetch the latest relevant documentation and code examples to provide context for the LLM."
      },
      {
        "question": "Which AI code editors does Context7 integrate with?",
        "answer": "Context7 seamlessly integrates with popular AI code editors such as Cursor, Windsurf, Claude Desktop, and VS Code, enhancing their ability to provide relevant and accurate coding suggestions."
      },
      {
        "question": "What is Context7?",
        "answer": "Context7 is a tool that fetches the most up-to-date documentation and code examples for LLMs and AI code editors directly from their source, ensuring accurate and relevant information for your coding tasks."
      }
    ],
    "mcpTools": [
      {
        "name": "resolve-library-id",
        "description": "Resolves a package/product name to a Context7-compatible library ID and returns a list of matching libraries.\n\nYou MUST call this function before 'get-library-docs' to obtain a valid Context7-compatible library ID UNLESS the user explicitly provides a library ID in the format '/org/project' or '/org/project/version' in their query.\n\nSelection Process:\n1. Analyze the query to understand what library/package the user is looking for\n2. Return the most relevant match based on:\n- Name similarity to the query (exact matches prioritized)\n- Description relevance to the query's intent\n- Documentation coverage (prioritize libraries with higher Code Snippet counts)\n- Trust score (consider libraries with scores of 7-10 more authoritative)\n\nResponse Format:\n- Return the selected library ID in a clearly marked section\n- Provide a brief explanation for why this library was chosen\n- If multiple good matches exist, acknowledge this but proceed with the most relevant one\n- If no good matches exist, clearly state this and suggest query refinements\n\nFor ambiguous queries, request clarification before proceeding with a best-guess match.",
        "params": [
          {
            "name": "libraryName",
            "type": "string",
            "required": true,
            "description": "Library name to search for and retrieve a Context7-compatible library ID."
          }
        ]
      },
      {
        "name": "get-library-docs",
        "description": "Fetches up-to-date documentation for a library. You must call 'resolve-library-id' first to obtain the exact Context7-compatible library ID required to use this tool, UNLESS the user explicitly provides a library ID in the format '/org/project' or '/org/project/version' in their query.",
        "params": [
          {
            "name": "topic",
            "type": "string",
            "required": false,
            "description": "Topic to focus documentation on (e.g., 'hooks', 'routing')."
          },
          {
            "name": "tokens",
            "type": "number",
            "required": false,
            "description": "Maximum number of tokens of documentation to retrieve (default: 5000). Higher values provide more context but consume more tokens."
          },
          {
            "name": "context7CompatibleLibraryID",
            "type": "string",
            "required": true,
            "description": "Exact Context7-compatible library ID (e.g., '/mongodb/docs', '/vercel/next.js', '/supabase/supabase', '/vercel/next.js/v14.3.0-canary.87') retrieved from 'resolve-library-id' or directly from user query in the format '/org/project' or '/org/project/version'."
          }
        ]
      }
    ]
  },
  "primaryActions": {
    "run": {
      "caption": "One-click cloud hosting",
      "label": "Run on MCP Market",
      "href": "https://app.mcpmarket.com/deploy?name=Context7&npm=%40upstash%2Fcontext7-mcp"
    },
    "tryNowHref": null
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
