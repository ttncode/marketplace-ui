import type { ServerDetail } from "../types";

export const blockbench: ServerDetail = {
  "slug": "blockbench",
  "title": "Blockbench MCP: Advanced Model Interaction for Game Dev",
  "metaDescription": "Enhance Blockbench with Model Context Protocol! Integrate AI tools like Claude & VS Code for automated transformations & advanced design. Configure your MCP server today!",
  "name": "Blockbench",
  "author": {
    "name": "jasonjgardner",
    "href": "https://github.com/jasonjgardner",
    "avatar": {
      "src": "/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/avatars/avatar-1903667.png",
      "alt": "jasonjgardner"
    }
  },
  "stars": "445",
  "links": {
    "share": "https://mcpmarket.com/server/blockbench",
    "github": "https://github.com/jasonjgardner/blockbench-mcp-plugin",
    "npm": "https://www.npmjs.com/package/blockbench-mcp"
  },
  "categories": [
    {
      "label": "Developer Tools",
      "href": "/categories/developer-tools"
    },
    {
      "label": "Other",
      "href": "/categories/other"
    },
    {
      "label": "Game Development",
      "href": "/categories/game-development"
    }
  ],
  "description": "Integrates a Model Context Protocol server into Blockbench, enabling advanced model interactions.",
  "tabs": {
    "slug": "blockbench",
    "hasReadme": true,
    "longDescription": "The Blockbench plugin enhances the Blockbench 3D modeling software by adding a Model Context Protocol (MCP) server. This allows external applications and AI agents to interact with Blockbench, enabling features like automated model transformations, context-aware editing, and AI-assisted design. The plugin supports configuration of the MCP server endpoint and provides a framework for adding custom tools, prompts, and resources to extend its functionality, allowing developers to create bespoke workflows.",
    "features": [
      "Enables AI-assisted design and automated model transformations",
      "Configurable MCP server port and endpoint",
      "0 GitHub stars",
      "Provides a framework for adding custom prompts and resources",
      "Allows integration with external applications like Claude Desktop and VS Code",
      "Supports custom tools through TypeScript compilation"
    ],
    "useCases": [
      "Automating repetitive modeling tasks using external scripts",
      "Integrating Blockbench with AI agents for contextual design assistance",
      "Creating custom workflows involving model transformations and data manipulation"
    ],
    "faq": [
      {
        "question": "How do I install the Blockbench MCP plugin?",
        "answer": "Open Blockbench, go to File > Plugins, click \"Load Plugin from URL\", and paste the plugin URL: `https://jasonjgardner.github.io/blockbench-mcp-plugin/plugins/mcp/mcp.js`."
      },
      {
        "question": "What external applications can I integrate with Blockbench MCP?",
        "answer": "You can integrate Blockbench MCP with external applications like Claude Desktop and VS Code, enabling AI-powered workflows and custom tool integrations."
      },
      {
        "question": "How do I configure the MCP server?",
        "answer": "Configure the MCP server settings under Blockbench: Settings > General > MCP Server Port and MCP Server Endpoint. The default endpoint is `:3000/mcp`."
      },
      {
        "question": "Can I develop my own tools for Blockbench MCP?",
        "answer": "Yes, you can add custom tools, prompts, and resources using TypeScript. The plugin provides a framework for creating custom interactions and functionalities."
      },
      {
        "question": "What is the Blockbench MCP plugin?",
        "answer": "The Blockbench MCP plugin integrates a Model Context Protocol server into Blockbench, allowing for advanced model interactions, AI-assisted design, and automated model transformations."
      }
    ],
    "mcpTools": [
      {
        "name": "my_tool",
        "description": "My tool description for the AI to read.",
        "params": []
      }
    ]
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
