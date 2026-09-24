import type { ServerDetail } from "../types";

export const lovelyComposer: ServerDetail = {
  "slug": "lovely-composer",
  "title": "Lovely Composer MCP: AI Agent Chiptune Music Composition",
  "metaDescription": "Lovely Composer MCP: AI agents compose chiptune music by directly editing Lovely Composer project files. No GUI. Create melodies, bass, drums, chords, tempo. Zero-dependency Node.js server.",
  "name": "Lovely Composer",
  "author": {
    "name": "baichuan4167-lang",
    "href": "https://github.com/baichuan4167-lang",
    "avatar": {
      "src": "/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/avatars/avatar-300064382.png",
      "alt": "baichuan4167-lang"
    }
  },
  "stars": "1",
  "links": {
    "share": "https://mcpmarket.com/server/lovely-composer",
    "github": "https://github.com/baichuan4167-lang/lovely-composer-mcp",
    "npm": "https://www.npmjs.com/package/lovely-composer-mcp"
  },
  "categories": [
    {
      "label": "Developer Tools",
      "href": "/categories/developer-tools"
    },
    {
      "label": "Data Science & ML",
      "href": "/categories/data-science-ml"
    },
    {
      "label": "Game Development",
      "href": "/categories/game-development"
    }
  ],
  "description": "Enables AI agents to compose chiptune music in Lovely Composer by directly manipulating its project files.",
  "tabs": {
    "slug": "lovely-composer",
    "hasReadme": true,
    "longDescription": "This tool is an MCP server designed to allow AI agents to create chiptune music within Lovely Composer on a local machine. It operates as a zero-dependency Node.js server, communicating via stdio transport, and bypasses brittle GUI automation by directly reading and writing Lovely Composer's `.jsonl` project files. This approach provides AI agents with a precise, inspectable data model, enabling them to compose melodies, bass lines, drums, chords, adjust tempo, and set loop points without interference from desktop activities. Users can then open the generated files directly in Lovely Composer for listening, editing, or export.",
    "features": [
      "Intelligent handling of character encoding to ensure cross-locale compatibility of project files.",
      "Zero-dependency Node.js server for simple deployment and operation.",
      "Direct manipulation of Lovely Composer's `.jsonl` project files, avoiding GUI automation.",
      "Supports composition of melodies, bass lines, drums, chords, tempo, and loop points.",
      "Provides a comprehensive suite of command-line tools for song management (create, read, write, list, copy, delete).",
      "1 GitHub stars"
    ],
    "useCases": [
      "AI agents generating original chiptune music compositions.",
      "Programmatic creation and modification of Lovely Composer projects.",
      "Automating music composition workflows without manual GUI interaction."
    ],
    "faq": [
      {
        "question": "What is Lovely Composer MCP?",
        "answer": "Lovely Composer MCP is an MCP server that enables AI agents to compose chiptune music within Lovely Composer by directly manipulating its project files, bypassing GUI automation."
      },
      {
        "question": "What are the primary requirements to use Lovely Composer MCP?",
        "answer": "You need Node.js 18 or newer, Lovely Composer installed on your machine, and the zero-dependency Node.js server cloned and configured with your MCP client."
      },
      {
        "question": "What musical elements can an AI agent compose using this tool?",
        "answer": "AI agents can compose melodies, bass lines, drums, chords, adjust tempo, and set loop points, offering comprehensive control over chiptune track creation."
      },
      {
        "question": "How does it interact with Lovely Composer project files?",
        "answer": "It directly reads and writes Lovely Composer's `.jsonl` project files. This allows the AI agent to work with a precise data model, avoiding the brittleness associated with GUI automation."
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
        "href": "/categories/developer-tools"
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
          "title": "Magic",
          "href": "/server/magic-1",
          "avatar": {
            "src": "/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/avatars/avatar-199367026.png",
            "alt": "21st-dev"
          },
          "description": "Generate modern UI components instantly from natural language descriptions within your IDE."
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
