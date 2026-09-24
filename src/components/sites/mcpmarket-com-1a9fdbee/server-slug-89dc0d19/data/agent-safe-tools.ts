import type { ServerDetail } from "../types";

export const agentSafeTools: ServerDetail = {
  "slug": "agent-safe-tools",
  "title": "Agent Safe Tools: Secure AI Agent Access to Prod Data & Logs",
  "metaDescription": "Agent Safe Tools secures AI agent access to production databases and logs. It features read-only defaults, SQL guardrails, command allowlists, and secure credential handling, enforcing safety in code.",
  "name": "Agent Safe Tools",
  "author": {
    "name": "wangke-112",
    "href": "https://github.com/wangke-112",
    "avatar": {
      "src": "/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/avatars/avatar-276247618.png",
      "alt": "wangke-112"
    }
  },
  "stars": "3",
  "links": {
    "share": "https://mcpmarket.com/server/agent-safe-tools",
    "github": "https://github.com/wangke-112/agent-safe-tools",
    "npm": null
  },
  "categories": [
    {
      "label": "Database Management",
      "href": "/categories/database-management"
    },
    {
      "label": "Developer Tools",
      "href": "/categories/developer-tools"
    },
    {
      "label": "Security & Testing",
      "href": "/categories/security-testing"
    }
  ],
  "description": "Empower AI coding agents to safely search production logs and inspect databases using natural language commands.",
  "tabs": {
    "slug": "agent-safe-tools",
    "hasReadme": true,
    "longDescription": "Agent Safe Tools provides robust, drop-in Model Context Protocol (MCP) servers designed to enable AI coding agents to interact with sensitive production systems, such as databases and log files, with enforced safety. Instead of relying solely on prompt instructions, this solution embeds critical safety red lines directly into the code. It ensures read-only access by default, blocks dangerous SQL/shell commands, disables production access unless explicitly enabled, and prevents the storage of sensitive credentials, making AI-driven operations secure and reliable.",
    "features": [
      "SQL guardrails block DDL and dangerous statements, requiring WHERE clauses for writes",
      "Credentials handled exclusively via environment variables or local configuration files",
      "Read-only by default for MySQL and remote logs with automatic LIMIT injection",
      "Command allowlist for SSH logs prevents dangerous shell commands, redirects, and path traversal",
      "Production environments are disabled by default, requiring explicit enablement",
      "3 GitHub stars"
    ],
    "useCases": [
      "Securely allow AI agents to search production logs for debugging and incident response",
      "Enable AI agents to safely inspect and query production databases for data analysis",
      "Integrate secure database and log inspection capabilities into MCP-capable AI hosts like Codex, Claude Code, and OpenCode"
    ],
    "faq": [
      {
        "question": "Is Agent Safe Tools compatible with my existing AI agent platform?",
        "answer": "Yes, it's designed to work with any Model Context Protocol (MCP)-capable host, including popular platforms like Codex, Claude Code, OpenCode, and Cursor, with recommended skill layers for seamless integration."
      },
      {
        "question": "Why is 'safety in code' preferred over AI prompt instructions?",
        "answer": "Instead of trusting the AI model to obey instructions, Agent Safe Tools encodes critical safety limits directly into its code, validated by unit tests, ensuring robust protection against unintended or malicious agent actions."
      },
      {
        "question": "What types of systems can AI agents safely access with this tool?",
        "answer": "AI agents can safely inspect read-only MySQL databases and search remote logs via SSH, thanks to integrated protections against DDL, dangerous SQL, and unsafe shell commands."
      },
      {
        "question": "What is Agent Safe Tools?",
        "answer": "Agent Safe Tools empowers AI coding agents to safely search production logs and inspect databases (like MySQL and SSH logs) using natural language commands, with security rigorously enforced in code."
      },
      {
        "question": "How does Agent Safe Tools ensure production environment safety?",
        "answer": "It enforces safety through read-only defaults, SQL guardrails blocking dangerous statements and requiring WHERE clauses for writes, command allowlists for SSH logs, disabled production environments by default, and secure credential handling."
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
        "href": "/categories/database-management"
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
          "title": "Snowflake Integration",
          "href": "/server/snowflake-integration-1",
          "avatar": {
            "src": "/sites/mcpmarket-com-1a9fdbee/server-slug-89dc0d19/avatars/avatar-140295050.png",
            "alt": "datawiz168"
          },
          "description": "Enables Claude to execute SQL queries and interact with Snowflake databases."
        },
        {
          "title": "Tinybird",
          "href": "/server/tinybird",
          "avatar": {
            "src": "/sites/mcpmarket-com-1a9fdbee/server-slug-89dc0d19/avatars/avatar-53208553.png",
            "alt": "tinybirdco"
          },
          "description": "Connects to a Tinybird Workspace and interacts with data sources and API endpoints using the Model Context Protocol."
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
