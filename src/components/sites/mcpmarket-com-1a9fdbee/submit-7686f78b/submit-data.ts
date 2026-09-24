import type { ImageRef } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/types";

export type SubmissionType = "server" | "skill";

export interface PopularCard {
  /** The source's anchor id (`tool-card-<slug>` / `skill-card-<slug>`). */
  readonly id: string;
  readonly rank: number;
  readonly title: string;
  readonly href: string;
  readonly avatar: ImageRef;
  readonly description: string;
  readonly category: string;
  readonly stars: string;
}

export interface PopularSection {
  readonly headingId: string;
  readonly title: string;
  readonly subtitle: string;
  readonly browse: { readonly label: string; readonly href: string };
  readonly cards: readonly PopularCard[];
}

/** What `/api/tools/check` answers for an already listed repository. */
export interface ListedTool {
  readonly name: string;
  readonly slug: string;
  readonly description: string;
}

const AVATARS = "/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/avatars";
const avatar = (id: number, alt: string): ImageRef => ({ src: `${AVATARS}/avatar-${id}.png`, alt });

export const TRUST_STATS = [
  { value: "1M+", label: "monthly visitors" },
  { value: "35K+", label: "MCP servers" },
  { value: "200K+", label: "agent skills" },
] as const;

export const FORM_COPY = {
  server: {
    placeholder: "https://github.com/username/mcp-server",
    help: "Enter the full URL to the GitHub repository for the MCP you'd like to submit",
  },
  skill: {
    placeholder: "https://github.com/username/skill-repo",
    help: "One skill per listing — enter the direct URL for the Skill you'd like to list. Submit a separate entry for each additional skill.",
  },
} as const satisfies Record<SubmissionType, { placeholder: string; help: string }>;

export const MESSAGES = {
  missingRepo: "Please enter a GitHub repository URL",
  invalidRepo: "Please enter a valid GitHub repository URL (e.g., https://github.com/username/repository)",
  invalidEmail: "Please enter a valid email address",
  invalidTryNow: "Try Now link must be a valid URL",
  alreadyListed: "This MCP server is already listed on MCP Market!",
  freeQueued:
    "Submitted! You're in the free queue — average listing time is ~4–6 weeks. We'll email you when it's live.",
} as const;

export const REMOTE_MESSAGES = {
  name: "Please enter a server name",
  endpoint: "Please enter a valid MCP endpoint URL (https)",
  description: "Please enter a short description",
  categories: "Please choose at least one category",
  website: "Website must be a valid URL",
  tryNow: 'The "Try Now" link must be a valid URL',
  email: "Please enter your email address",
} as const;

export const REMOTE_LIMITS = {
  name: 80,
  description: 200,
  longDescription: 4000,
  ownerName: 80,
  useCase: 200,
  useCases: 8,
  faqQuestion: 200,
  faqAnswer: 1000,
  faqs: 8,
  categories: 5,
} as const;

export const REMOTE_CATEGORIES = [
  "Developer Tools",
  "Data Science & ML",
  "API Development",
  "Productivity & Workflow",
  "Analytics & Monitoring",
  "Security & Testing",
  "Web Scraping & Data Collection",
  "Deployment & DevOps",
  "Learning & Documentation",
  "Database Management",
  "Content Management",
  "Collaboration Tools",
  "Cloud Infrastructure",
  "Marketing Automation",
  "E-commerce Solutions",
  "Design Tools",
  "Browser Automation",
  "Social Media Management",
  "Game Development",
  "Mobile Development",
] as const;

/**
 * Stands in for `/api/tools/check?github=<owner>/<repo>`: the repositories of the
 * popular servers below, keyed lowercase as the source normalises them.
 */
export const LISTED_REPOS: Readonly<Record<string, ListedTool>> = {
  "obra/superpowers": {
    name: "Superpowers",
    slug: "superpowers",
    description:
      "Empowers AI coding agents with a comprehensive and structured software development workflow, from design refinement to TDD-driven implementation.",
  },
  "koala73/worldmonitor": {
    name: "World Monitor",
    slug: "world-monitor",
    description:
      "Provides real-time global intelligence through AI-powered news aggregation, geopolitical monitoring, and infrastructure tracking in a unified situational awareness interface.",
  },
  "ruvnet/ruflo": {
    name: "Ruflo",
    slug: "ruflo",
    description:
      "Orchestrates intelligent multi-agent swarms for Claude, coordinating autonomous workflows and building conversational AI systems.",
  },
  "fission-ai/openspec": {
    name: "OpenSpec",
    slug: "openspec",
    description:
      "Facilitates spec-driven development to ensure alignment between humans and AI coding assistants before any code is written.",
  },
  "sansan0/trendradar": {
    name: "TrendRadar",
    slug: "trendradar",
    description:
      "Aggregates trending topics from over 35 platforms, offering intelligent filtering, automated multi-channel notifications, and AI-powered conversational analysis for deep news insights.",
  },
  "upstash/context7": {
    name: "Context7",
    slug: "context7-1",
    description:
      "Fetches up-to-date documentation and code examples for LLMs and AI code editors directly from the source.",
  },
};

export const POPULAR: Record<SubmissionType, PopularSection> = {
  server: {
    headingId: "popular-servers-heading",
    title: "Popular MCP Servers",
    subtitle: "Discover what others are building with MCP",
    browse: { label: "Browse All MCP Servers", href: "/server" },
    cards: [
      {
        id: "tool-card-superpowers",
        rank: 1,
        title: "Superpowers",
        href: "/server/superpowers",
        avatar: avatar(45416, "obra"),
        description: LISTED_REPOS["obra/superpowers"].description,
        category: "Developer Tools",
        stars: "291k",
      },
      {
        id: "tool-card-world-monitor",
        rank: 2,
        title: "World Monitor",
        href: "/server/world-monitor",
        avatar: avatar(996596, "koala73"),
        description: LISTED_REPOS["koala73/worldmonitor"].description,
        category: "Data Science & ML",
        stars: "87k",
      },
      {
        id: "tool-card-ruflo",
        rank: 3,
        title: "Ruflo",
        href: "/server/ruflo",
        avatar: avatar(2934394, "ruvnet"),
        description: LISTED_REPOS["ruvnet/ruflo"].description,
        category: "Developer Tools",
        stars: "73k",
      },
      {
        id: "tool-card-openspec",
        rank: 4,
        title: "OpenSpec",
        href: "/server/openspec",
        avatar: avatar(203414896, "Fission-AI"),
        description: LISTED_REPOS["fission-ai/openspec"].description,
        category: "Developer Tools",
        stars: "70k",
      },
      {
        id: "tool-card-trendradar",
        rank: 5,
        title: "TrendRadar",
        href: "/server/trendradar",
        avatar: avatar(77180927, "sansan0"),
        description: LISTED_REPOS["sansan0/trendradar"].description,
        category: "Data Science & ML",
        stars: "63k",
      },
      {
        id: "tool-card-context7-1",
        rank: 6,
        title: "Context7",
        href: "/server/context7-1",
        avatar: avatar(74989412, "upstash"),
        description: LISTED_REPOS["upstash/context7"].description,
        category: "API Development",
        stars: "62k",
      },
    ],
  },
  skill: {
    headingId: "popular-skills-heading",
    title: "Popular Skills",
    subtitle: "Discover what others are building with Agent Skills",
    browse: { label: "Browse All Skills", href: "/tools/skills" },
    cards: [
      {
        id: "skill-card-meme-maker-1",
        rank: 1,
        title: "Meme Maker",
        href: "/tools/skills/meme-maker-1",
        avatar: avatar(252820863, "openclaw"),
        description:
          "Searches curated meme templates, suggests ideal joke formats, and renders custom memes in SVG, PNG, or hosted formats.",
        category: "Content Management",
        stars: "388k",
      },
      {
        id: "skill-card-agent-skill-creator-1787994711990",
        rank: 2,
        title: "Agent Skill Creator",
        href: "/tools/skills/agent-skill-creator-1787994711990",
        avatar: avatar(252820863, "openclaw"),
        description:
          "Authors, repairs, and validates custom AgentSkills and SKILL.md configurations with standardized frontmatter and bundled resources.",
        category: "Productivity & Workflow",
        stars: "388k",
      },
      {
        id: "skill-card-sherpa-onnx-local-text-to-speech",
        rank: 3,
        title: "Sherpa ONNX Local Text-to-Speech",
        href: "/tools/skills/sherpa-onnx-local-text-to-speech",
        avatar: avatar(252820863, "openclaw"),
        description:
          "Generates natural speech audio locally and offline using the high-performance sherpa-onnx runtime and ONNX voice models.",
        category: "Data Science & ML",
        stars: "388k",
      },
      {
        id: "skill-card-openclaw-channel-configurator",
        rank: 4,
        title: "OpenClaw Channel Configurator",
        href: "/tools/skills/openclaw-channel-configurator",
        avatar: avatar(252820863, "openclaw"),
        description:
          "Configures, repairs, and verifies chat messaging channels securely using non-interactive CLI commands and secret references.",
        category: "Collaboration Tools",
        stars: "388k",
      },
      {
        id: "skill-card-1password-cli-1",
        rank: 5,
        title: "1Password CLI",
        href: "/tools/skills/1password-cli-1",
        avatar: avatar(252820863, "openclaw"),
        description:
          "Integrates 1Password CLI to securely authenticate, manage vaults, and inject environment secrets without leaking credentials into chat or logs.",
        category: "Security & Testing",
        stars: "388k",
      },
      {
        id: "skill-card-background-coding-agent",
        rank: 6,
        title: "Background Coding Agent",
        href: "/tools/skills/background-coding-agent",
        avatar: avatar(252820863, "openclaw"),
        description:
          "Delegates complex coding tasks, refactors, and issue-to-PR workflows to autonomous background CLI workers including Claude Code, Codex, and OpenCode.",
        category: "Productivity & Workflow",
        stars: "388k",
      },
    ],
  },
};
