import type { ServerDetail } from "../types";

export const cal2: ServerDetail = {
  "slug": "cal-2",
  "title": "Cal: AI Assistant Management for Calagopus Panel API",
  "metaDescription": "Cal empowers AI assistants like Claude, Cursor, and VS Code to securely manage your Calagopus Panel via API. Control servers, files, and all API endpoints with robust, permission-based access.",
  "name": "Cal",
  "author": {
    "name": "Caloptreyx",
    "href": "https://github.com/Caloptreyx",
    "avatar": {
      "src": "/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/avatars/avatar-272030991.png",
      "alt": "Caloptreyx"
    }
  },
  "stars": null,
  "links": {
    "share": "https://mcpmarket.com/server/cal-2",
    "github": "https://github.com/caloptreyx/cal-mcp",
    "npm": null
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
      "label": "Productivity & Workflow",
      "href": "/categories/productivity-workflow"
    }
  ],
  "description": "Enables AI assistants to manage your Calagopus Panel through its API, respecting defined permissions.",
  "tabs": {
    "slug": "cal-2",
    "hasReadme": true,
    "longDescription": "Cal provides an MCP (Machine Control Protocol) server designed to integrate AI assistants like Claude, Cursor, and VS Code with your Calagopus Panel. This extension allows AI agents to interact with your panel's API, facilitating management tasks such as server control, file operations, and comprehensive API calls. It ensures secure and controlled automation of your panel infrastructure by strictly adhering to the permissions set for the connecting API key and logging all activities.",
    "features": [
      "File system operations (list, read, write files)",
      "Secure access with API key-based authentication and permission enforcement",
      "Comprehensive API interaction for client and admin endpoints",
      "Server lifecycle management (start, stop, restart, kill)",
      "Integration with AI agents like Claude Code, Cursor, and VS Code",
      "0 GitHub stars"
    ],
    "useCases": [
      "Automating Calagopus Panel administration tasks using AI assistants",
      "Granting AI agents controlled and auditable access to server resources",
      "Developing AI-powered solutions for panel interaction and management"
    ],
    "faq": [
      {
        "question": "What is Cal and what does it do?",
        "answer": "Cal is an MCP (Master Control Program) server extension for Calagopus Panel that allows AI assistants like Claude Code, Cursor, and VS Code to manage your panel through its API, strictly adhering to defined API key permissions."
      },
      {
        "question": "What are the requirements to install and use Cal?",
        "answer": "To use Cal, you need Calagopus Panel version 1.2.0 or newer. Installation involves installing a zip extension directly through your panel's Admin → Extensions section and then creating an API key with appropriate permissions."
      },
      {
        "question": "Which AI agents are compatible with Cal?",
        "answer": "Cal is designed for seamless integration with popular AI agents such as Claude Code, Cursor, and VS Code. It provides ready-made setup instructions and endpoint configurations to easily connect these tools to your Calagopus Panel."
      },
      {
        "question": "How does Cal ensure security for AI assistant access?",
        "answer": "Cal leverages API key-based authentication, ensuring every action taken by an AI assistant is limited by the specific permissions granted to that API key. This integrates with Calagopus Panel's native security, rate limits, and activity logs."
      },
      {
        "question": "What types of operations can AI assistants perform using Cal?",
        "answer": "AI assistants can perform a wide range of tasks, including full API interaction (reading/writing to client/admin endpoints), managing server lifecycle (start, stop, restart, kill), sending console commands, and performing file system operations (list, read, write files) on your servers."
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
