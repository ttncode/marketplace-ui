import type { ServerDetail } from "../types";

export const browserbase: ServerDetail = {
  "slug": "browserbase",
  "title": "Browserbase: Browser Automation for LLMs",
  "metaDescription": "Browserbase enables LLMs to control browsers for web interaction, data extraction & task automation. Use Browserbase & Stagehand to enhance your AI workflows.",
  "name": "Browserbase",
  "author": {
    "name": "browserbase",
    "href": "https://github.com/browserbase",
    "avatar": {
      "src": "/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/avatars/avatar-158221360.png",
      "alt": "browserbase"
    }
  },
  "stars": "3.4k",
  "links": {
    "share": "https://mcpmarket.com/server/browserbase",
    "github": "https://github.com/browserbase/mcp-server-browserbase",
    "npm": "https://www.npmjs.com/package/%40browserbasehq/mcp"
  },
  "categories": [
    {
      "label": "Developer Tools",
      "href": "/categories/developer-tools"
    },
    {
      "label": "Web Scraping & Data Collection",
      "href": "/categories/web-scraping-data-collection"
    },
    {
      "label": "Browser Automation",
      "href": "/categories/browser-automation"
    },
    {
      "label": "Official",
      "href": "/categories/official"
    }
  ],
  "description": "Enables LLMs to control cloud browsers for web interaction, data extraction, and task automation using Browserbase and Stagehand.",
  "tabs": {
    "slug": "browserbase",
    "hasReadme": true,
    "longDescription": "This server provides cloud browser automation capabilities using Browserbase, Puppeteer, and Stagehand. It allows Large Language Models (LLMs) to seamlessly interact with web pages, extract data, capture screenshots, and execute JavaScript within a cloud browser environment, adhering to the Model Context Protocol (MCP) for standardized integration between LLM applications and external tools.",
    "features": [
      "Browser Automation: Control and orchestrate cloud browsers.",
      "Data Extraction: Extract structured data from any webpage.",
      "Screenshots: Capture full-page and element screenshots.",
      "JavaScript Execution: Execute custom JS in the browser context.",
      "Atomic Instructions: Execute precise actions using Stagehand."
    ],
    "useCases": [
      "AI-powered IDE enhancement.",
      "Chat interface augmentation.",
      "Custom AI workflow creation."
    ],
    "faq": [
      {
        "question": "What is Browserbase?",
        "answer": "Browserbase enables Large Language Models (LLMs) to control cloud browsers for web interaction, data extraction, and task automation. It uses Browserbase and Stagehand to create powerful AI workflows."
      },
      {
        "question": "What can I do with Browserbase?",
        "answer": "With Browserbase, you can automate web tasks, extract structured data from web pages, capture screenshots, execute JavaScript in a browser context, and leverage atomic instructions for precise actions."
      },
      {
        "question": "What is Stagehand?",
        "answer": "Stagehand is a component of Browserbase that allows for precise control of browser actions using atomic instructions like 'click the login button' or 'find the red shoes'. It supports multiple LLMs and offers vision support."
      },
      {
        "question": "Which LLMs are supported?",
        "answer": "Stagehand supports multiple LLMs, including OpenAI's GPT-4 and Anthropic's Claude-3 Sonnet, offering flexibility in your AI applications."
      },
      {
        "question": "How does Browserbase enhance LLM capabilities?",
        "answer": "Browserbase provides LLMs with access to real-world data and web interaction capabilities, enabling them to perform tasks that are otherwise impossible without a browser environment."
      }
    ],
    "mcpTools": [
      {
        "name": "browserbase_session_create",
        "description": "Create or reuse a Browserbase browser session and set it as active.",
        "params": [
          {
            "name": "sessionId",
            "type": "string",
            "required": false,
            "description": "Optional session ID to use/reuse. If not provided or invalid, a new session is created."
          }
        ]
      },
      {
        "name": "browserbase_session_close",
        "description": "Close the current Browserbase session and reset the active context.",
        "params": []
      },
      {
        "name": "browserbase_stagehand_navigate",
        "description": "Navigate to a URL in the browser. Only use this tool with URLs you're confident will work and be up to date. \n    Otherwise, use https://google.com as the starting point",
        "params": [
          {
            "name": "url",
            "type": "string",
            "required": true,
            "description": "The URL to navigate to"
          }
        ]
      },
      {
        "name": "browserbase_stagehand_act",
        "description": "Perform a single action on the page (e.g., click, type).",
        "params": [
          {
            "name": "action",
            "type": "string",
            "required": true,
            "description": "The action to perform. Should be as atomic and specific as possible,\n      i.e. 'Click the sign in button' or 'Type 'hello' into the search input'."
          },
          {
            "name": "variables",
            "type": "object",
            "required": false,
            "description": "Variables used in the action template. ONLY use variables if you're dealing\n      with sensitive data or dynamic content. When using variables, you MUST have the variable\n      key in the action template. ie: {\"action\": \"Fill in the password\", \"variables\": {\"password\": \"123456\"}}"
          }
        ]
      },
      {
        "name": "browserbase_stagehand_extract",
        "description": "Extract structured data or text from the current page using an instruction.",
        "params": [
          {
            "name": "instruction",
            "type": "string",
            "required": true,
            "description": "The specific instruction for what information to extract from the current page.\n    Be as detailed and specific as possible about what you want to extract. For example:\n    'Extract all product names and prices from the listing page'.The more specific your instruction,\n    the better the extraction results will be."
          }
        ]
      },
      {
        "name": "browserbase_stagehand_observe",
        "description": "Find interactive elements on the page from an instruction; optionally return an action.",
        "params": [
          {
            "name": "instruction",
            "type": "string",
            "required": true,
            "description": "Detailed instruction for what specific elements or components to observe on the web page.\n        This instruction must be extremely specific and descriptive. For example: 'Find the red login button\n        in the top right corner', 'Locate the search input field with placeholder text', or 'Identify all\n        clickable product cards on the page'. The more specific and detailed your instruction, the better\n        the observation results will be. Avoid generic instructions like 'find buttons' or 'see elements'.\n        Instead, describe the visual characteristics, location, text content, or functionality of the elements\n        you want to observe. This tool is designed to help you identify interactive elements that you can\n        later use with the act tool for performing actions like clicking, typing, or form submission."
          },
          {
            "name": "returnAction",
            "type": "boolean",
            "required": false,
            "description": "Whether to return the action to perform on the element. If true, the action will be returned as a string.\n       If false, the action will not be returned."
          }
        ]
      },
      {
        "name": "browserbase_screenshot",
        "description": "Capture a full-page screenshot and return it (and save as a resource).",
        "params": [
          {
            "name": "name",
            "type": "string",
            "required": false,
            "description": "The name of the screenshot"
          }
        ]
      },
      {
        "name": "browserbase_stagehand_get_url",
        "description": "Return the current page URL (full URL with query/fragment).",
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
