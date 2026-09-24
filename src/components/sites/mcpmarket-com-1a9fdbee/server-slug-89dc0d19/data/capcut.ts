import type { ServerDetail } from "../types";

export const capcut: ServerDetail = {
  "slug": "capcut",
  "title": "CapCut AI Agent Project Editor: Direct File Manipulation",
  "metaDescription": "Empower AI agents to directly manipulate CapCut project files without an API. This Elixir/OTP server lets Claude list, create, add text/clips, and edit local CapCut projects.",
  "name": "CapCut",
  "author": {
    "name": "burnshall-ui",
    "href": "https://github.com/burnshall-ui",
    "avatar": {
      "src": "/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/avatars/avatar-233358203.png",
      "alt": "burnshall-ui"
    }
  },
  "stars": "4",
  "links": {
    "share": "https://mcpmarket.com/server/capcut",
    "github": "https://github.com/burnshall-ui/capcut-mcp",
    "npm": null
  },
  "categories": [
    {
      "label": "Productivity & Workflow",
      "href": "/categories/productivity-workflow"
    },
    {
      "label": "Data Science & ML",
      "href": "/categories/data-science-ml"
    },
    {
      "label": "Design Tools",
      "href": "/categories/design-tools"
    }
  ],
  "description": "Enables AI agents to directly manipulate CapCut project files via the Model Context Protocol.",
  "tabs": {
    "slug": "capcut",
    "hasReadme": true,
    "longDescription": "CapCut provides a local Model Context Protocol (MCP) server, built with Elixir and OTP, that allows AI agents like Claude to directly read and edit CapCut's local JSON project files. It bypasses the need for a formal CapCut API by interacting directly with the project file structure, offering tools for managing video drafts, adding text, and incorporating media clips. This enables advanced AI-driven automation for video editing workflows, all within a robust and fault-tolerant Elixir environment.",
    "features": [
      "Built with Elixir/OTP for concurrency and fault-tolerance",
      "0 GitHub stars",
      "Support for removing clips by segment ID",
      "Direct manipulation of CapCut project JSON files",
      "Ability to add text overlays and media clips to timelines",
      "Tools for listing, inspecting, creating, and editing projects"
    ],
    "useCases": [
      "Automated creation and modification of CapCut video drafts by AI agents",
      "Integrating AI into video editing workflows for dynamic content generation",
      "Programmatic management of local CapCut projects"
    ],
    "faq": [
      {
        "question": "What are the system requirements to use CapCut MCP?",
        "answer": "To run CapCut MCP, you need a Windows operating system, the CapCut desktop application installed, and an Elixir/OTP development environment, specifically Erlang/OTP 28+ and Elixir 1.19+."
      },
      {
        "question": "Does CapCut MCP support CapCut cloud projects or effects/templates?",
        "answer": "CapCut MCP is designed to interact only with local CapCut draft project files on your machine; it does not support cloud projects. While it can reference existing CapCut effect IDs, it cannot create new effects or templates due to the limitations of the underlying JSON format and CapCut's internal mechanisms."
      },
      {
        "question": "What specific actions can AI agents perform with CapCut MCP?",
        "answer": "AI agents gain powerful tools to manage CapCut projects, including listing all drafts, inspecting project details (canvas size, FPS, duration), viewing timelines, creating new projects, adding text overlays, inserting video or audio clips, and removing clips by their segment ID."
      },
      {
        "question": "What is CapCut MCP and how does it work?",
        "answer": "CapCut MCP (Model Context Protocol) is an Elixir-based server that allows AI agents, such as Claude, to directly read and edit CapCut local project JSON files. It bypasses the need for a CapCut API by manipulating the project files stored on your Windows machine, giving AI agents programmatic control over your CapCut drafts."
      },
      {
        "question": "Can CapCut MCP export or render finished videos?",
        "answer": "No, CapCut MCP focuses solely on the manipulation of CapCut project files. It does not provide functionality for exporting or rendering finished videos, as CapCut currently lacks a command-line interface for these operations."
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
        "href": "/categories/productivity-workflow"
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
          "title": "Send Email",
          "href": "/server/send-email",
          "avatar": {
            "src": "/sites/mcpmarket-com-1a9fdbee/server-slug-89dc0d19/avatars/avatar-109384852.png",
            "alt": "resend"
          },
          "description": "Enables sending emails directly from Cursor or Claude Desktop using the Resend API."
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
