import type { ServerDetail } from "../types";

export const openspec: ServerDetail = {
  "slug": "openspec",
  "title": "OpenSpec: Spec-Driven Development for AI Coding Assistants",
  "metaDescription": "OpenSpec enables spec-driven development, aligning humans and AI before coding. Get deterministic, reviewable outputs with structured change tracking, native AI slash commands, and no API keys.",
  "name": "OpenSpec",
  "author": {
    "name": "Fission-AI",
    "href": "https://github.com/Fission-AI",
    "avatar": {
      "src": "/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/avatars/avatar-203414896.png",
      "alt": "Fission-AI"
    }
  },
  "stars": "70k",
  "links": {
    "share": "https://mcpmarket.com/server/openspec",
    "github": "https://github.com/fission-ai/openspec",
    "npm": "https://www.npmjs.com/package/%40fission-ai/openspec"
  },
  "categories": [
    {
      "label": "Developer Tools",
      "href": "/categories/developer-tools"
    },
    {
      "label": "Productivity & Workflow",
      "href": "/categories/productivity-workflow"
    },
    {
      "label": "Learning & Documentation",
      "href": "/categories/learning-documentation"
    }
  ],
  "description": "Facilitates spec-driven development to ensure alignment between humans and AI coding assistants before any code is written.",
  "tabs": {
    "slug": "openspec",
    "hasReadme": true,
    "longDescription": "OpenSpec revolutionizes AI-assisted development by introducing a lightweight, spec-driven workflow that guarantees human and AI alignment on requirements. It addresses the unpredictability of AI coding assistants by establishing clear specifications before implementation, leading to deterministic and reviewable outputs. The tool separates current source-of-truth specs from proposed changes, enabling explicit diffs and structured audits of features, modifications, and updates across your codebase, seamlessly integrating with various AI tools without requiring API keys.",
    "features": [
      "Lightweight spec-driven workflow requiring no API keys and minimal setup.",
      "Supports native slash commands for a wide range of AI coding assistants (e.g., Claude Code, Cursor, GitHub Copilot, Amazon Q Developer).",
      "Structured change tracking for proposals, tasks, and spec deltas, with an archiving mechanism.",
      "8,046 GitHub stars",
      "Populate project context and conventions using `openspec/project.md` for consistent AI guidance.",
      "Dedicated folders (`openspec/specs/` and `openspec/changes/`) for managing current truth and proposed updates."
    ],
    "useCases": [
      "Defining and evolving project specifications with clear human-AI alignment.",
      "Managing iterative development of features, ensuring auditable changes across multiple specs.",
      "Streamlining the implementation of code changes with AI assistants by providing clear, agreed-upon tasks."
    ],
    "faq": [
      {
        "question": "Can OpenSpec manage changes in existing large projects?",
        "answer": "Absolutely. OpenSpec is designed \"brownfield-first,\" separating current specifications (`openspec/specs/`) from proposed updates (`openspec/changes/`). This makes it highly effective for managing and auditing changes in established codebases."
      },
      {
        "question": "How does OpenSpec integrate with AI coding assistants?",
        "answer": "OpenSpec supports native slash commands for popular AI tools like GitHub Copilot, Claude Code, and Cursor. It also uses `AGENTS.md` to provide context to other assistants, enabling a consistent workflow without requiring API keys."
      },
      {
        "question": "What is OpenSpec?",
        "answer": "OpenSpec is a tool for spec-driven development that aligns humans and AI coding assistants. It ensures everyone agrees on the exact specifications before writing any code, providing predictable and reviewable outputs."
      },
      {
        "question": "What are the key advantages of using OpenSpec?",
        "answer": "Key advantages include ensuring human-AI alignment, structured change tracking for proposals and tasks, clear visibility into development scope, a lightweight setup with no API keys, and robust support for brownfield projects."
      },
      {
        "question": "What is the purpose of `openspec/project.md`?",
        "answer": "`openspec/project.md` is used to define project-level conventions, standards, architectural patterns, and other guidelines. This ensures AI coding assistants receive consistent and accurate context for all tasks, promoting uniform code quality."
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
