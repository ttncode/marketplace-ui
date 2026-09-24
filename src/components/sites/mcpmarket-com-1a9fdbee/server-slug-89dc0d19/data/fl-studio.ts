import type { ServerDetail } from "../types";

export const flStudio: ServerDetail = {
  "slug": "fl-studio",
  "title": "FL Studio AI: Claude Integration for Music Creation",
  "metaDescription": "Control FL Studio with AI using Claude! Generate music, melodies, and chords via MIDI. Requires virtual MIDI port setup. Dive into AI-powered music creation now! Requires FL Studio API Stubs.",
  "name": "FL Studio",
  "author": {
    "name": "veenastudio",
    "href": "https://github.com/veenastudio",
    "avatar": {
      "src": "/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/avatars/avatar-195456457.png",
      "alt": "veenastudio"
    }
  },
  "stars": "105",
  "links": {
    "share": "https://mcpmarket.com/server/fl-studio",
    "github": "https://github.com/veenastudio/flstudio-mcp",
    "npm": null
  },
  "categories": [
    {
      "label": "Other",
      "href": "/categories/other"
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
  "description": "Connects Claude to FL Studio, enabling AI-driven music creation within the DAW.",
  "tabs": {
    "slug": "fl-studio",
    "hasReadme": true,
    "longDescription": "FL Studio allows users to control FL Studio with AI tools like Claude by acting as a Model Context Protocol (MCP) server. By setting up virtual MIDI ports and configuring the MCP server, users can send melodies, chords, and drum patterns to FL Studio, which are then recorded live into the piano roll of the selected instrument. This enables AI-assisted music composition directly within the FL Studio environment.",
    "features": [
      "Uses MIDI messages for communication.",
      "9 GitHub stars",
      "Requires virtual MIDI port setup.",
      "Enables AI control of FL Studio via Claude.",
      "Uses the FL Studio API Stubs.",
      "Supports live recording of AI-generated music."
    ],
    "useCases": [
      "Real-time control of FL Studio with AI.",
      "Generating musical ideas using AI prompts.",
      "AI-assisted music composition."
    ],
    "faq": [
      {
        "question": "What is FL Studio MCP?",
        "answer": "FL Studio MCP connects Claude AI to FL Studio, allowing you to control the DAW with AI commands and generate music using MIDI messages."
      },
      {
        "question": "How do I set up FL Studio MCP?",
        "answer": "The setup involves placing the 'Test Controller' folder in your FL Studio hardware settings, configuring Claude's MCP settings with 'trigger.py', setting up a virtual MIDI port (LoopMIDI on Windows), and installing required Python packages."
      },
      {
        "question": "What are the prerequisites for using FL Studio MCP?",
        "answer": "You need FL Studio, Claude AI access, a virtual MIDI port application (like LoopMIDI), Python, and the necessary Python packages installed via `uv pip install httpx mido python-rtmidi typing fastmcp FL-Studio-API-Stubs`."
      },
      {
        "question": "Where can I get help or contribute to FL Studio MCP?",
        "answer": "Join the Discord server (https://discord.gg/ZjG9TaEhvy) for assistance, feature requests, and to contribute to the project."
      },
      {
        "question": "How does FL Studio MCP communicate with FL Studio?",
        "answer": "FL Studio MCP uses MIDI messages to communicate between Claude and FL Studio. The 'device_test.py' acts as a virtual MIDI controller, receiving commands from the 'trigger.py' (MCP server)."
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
        "href": "/categories/other"
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
          "title": "E2B",
          "href": "/server/e2b",
          "avatar": {
            "src": "/sites/mcpmarket-com-1a9fdbee/server-slug-89dc0d19/avatars/avatar-129434473.png",
            "alt": "e2b-dev"
          },
          "description": "Enables Claude to execute code using E2B sandboxes via the Model Context Protocol."
        },
        {
          "title": "Anilist",
          "href": "/server/anilist",
          "avatar": {
            "src": "/sites/mcpmarket-com-1a9fdbee/server-slug-89dc0d19/avatars/avatar-5277788.png",
            "alt": "yuna0x0"
          },
          "description": "Access anime, manga, and user data from AniList via the Model Context Protocol."
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
