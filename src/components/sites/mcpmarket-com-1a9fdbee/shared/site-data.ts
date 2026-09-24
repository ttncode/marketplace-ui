import type { CategoryLink, FooterColumn, LeadForm, MobileNavGroup, NavMenu } from "./types";

const NAV_IMAGE_ROOT = "/sites/mcpmarket-com-1a9fdbee/shared/navigation";

export const ANNOUNCEMENT = {
  badge: "New",
  label: "MCP Market Hub",
  href: "/hub",
  description: "Manage the skills and tools your agents use",
} as const;

export const NAV_MENUS: readonly NavMenu[] = [
  {
    label: "MCP Servers",
    icon: "plugConnected",
    hero: {
      title: "Manage your MCPs",
      description: "Bundle, deploy, and sync MCP tools in MCP Market Hub.",
      href: "/hub",
      image: `${NAV_IMAGE_ROOT}/manage-mcps.png`,
    },
    features: [
      {
        title: "What is an MCP?",
        description: "Learn how the Model Context Protocol connects AI to your tools.",
        href: "/what-is-an-mcp-server",
        image: `${NAV_IMAGE_ROOT}/what-is-mcp.png`,
      },
      {
        title: "Submit MCP",
        description: "Submit an MCP server to our directory.",
        href: "/submit",
        image: `${NAV_IMAGE_ROOT}/submit-upload.png`,
      },
    ],
    links: [
      { title: "All Servers", description: "Browse all MCP servers in our directory.", href: "/server", icon: "plugConnected" },
      { title: "Top Servers", description: "Top 100 most popular MCP servers by GitHub stars.", href: "/leaderboards", icon: "trendingUp" },
      { title: "Categories", description: "Find MCP servers organized by category.", href: "/categories", icon: "folderOpen" },
      { title: "Search Servers", description: "Find the perfect MCP for your workflow.", href: "/search", icon: "search" },
    ],
  },
  {
    label: "Agent Skills",
    icon: "blocks",
    hero: {
      title: "Manage your Agent Skills",
      description: "Create, version, and share Agent Skills in MCP Market Hub.",
      href: "/hub",
      image: `${NAV_IMAGE_ROOT}/manage-agent-skills.png`,
    },
    features: [
      {
        title: "What are Agent Skills?",
        description: "Learn how Agent Skills extend Claude, ChatGPT & Codex with specialized expertise.",
        href: "/tools/skills/what-are-skills",
        image: `${NAV_IMAGE_ROOT}/what-agent-skills.png`,
      },
      {
        title: "Submit Skill",
        description: "Submit an Agent Skill to our directory.",
        href: "/submit?type=skill",
        image: `${NAV_IMAGE_ROOT}/submit-upload.png`,
      },
    ],
    links: [
      { title: "All Skills", description: "Browse all Agent Skills for Claude, ChatGPT & Codex.", href: "/tools/skills", icon: "blocks" },
      { title: "Top Skills", description: "Most popular skills ranked by GitHub stars.", href: "/tools/skills/leaderboard", icon: "trendingUp" },
      { title: "Categories", description: "Find Agent Skills organized by category.", href: "/tools/skills/categories", icon: "folderOpen" },
      { title: "Search Skills", description: "Find the perfect skill for your workflow.", href: "/tools/skills/search", icon: "search" },
    ],
  },
];

export const MOBILE_NAV_GROUPS: readonly MobileNavGroup[] = [
  {
    heading: "MCP Servers",
    items: [
      { label: "What is an MCP?", href: "/what-is-an-mcp-server", icon: "bookOpen" },
      { label: "All Servers", href: "/server", icon: "plugConnected" },
      { label: "Categories", href: "/categories", icon: "folderOpen" },
      { label: "Leaderboard", href: "/leaderboards", icon: "trophy" },
      { label: "Search Servers", href: "/search", icon: "search" },
    ],
  },
  {
    heading: "Agent Skills",
    items: [
      { label: "What are Agent Skills?", href: "/tools/skills/what-are-skills", icon: "bookOpen" },
      { label: "How to Install", href: "/tools/skills/how-to-install", icon: "download" },
      { label: "All Skills", href: "/tools/skills", icon: "blocks" },
      { label: "Categories", href: "/tools/skills/categories", icon: "folderOpen" },
      { label: "Leaderboard", href: "/tools/skills/leaderboard", icon: "trophy" },
      { label: "Search Skills", href: "/tools/skills/search", icon: "search" },
    ],
  },
];

export const MOBILE_NAV_FOOTER_LINKS = [
  { label: "Submit MCP / Submit Skill", href: "/submit", icon: "plus" },
  { label: "Sell Skills", href: "/sell" },
] as const;

export const HERO = {
  serverCount: "49,868",
  updatedLabel: "Updated 1 hour ago",
  title: "Find The Best",
  rotatingTerms: ["MCP Servers", "Agent Skills", "MCP Clients", "Agent Tools"],
  description: "Directory of awesome MCP servers and clients to connect AI agents with your favorite tools.",
  searchPlaceholder: "Search for MCP servers...",
} as const;

const CATEGORY_NAMES = [
  "Developer Tools",
  "Data Science & ML",
  "API Development",
  "Productivity & Workflow",
  "Analytics & Monitoring",
  "Security & Testing",
  "Web Scraping & Data Collection",
  "Deployment & DevOps",
  "Other",
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
  "Official",
  "Featured",
] as const;

function toCategorySlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const CATEGORY_LINKS: readonly CategoryLink[] = [
  { label: "All", href: "/categories" },
  ...CATEGORY_NAMES.map((name) => ({ label: name, href: `/categories/${toCategorySlug(name)}` })),
];

export const FOOTER = {
  description:
    "Discover MCP servers that connect MCP clients like Claude and Cursor to your favorite tools. Browse the MCP Market to get started.",
  copyright: "© 2026 MCP Market. All rights reserved.",
  legalLinks: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;

export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    heading: "Browse",
    links: [
      { kind: "link", label: "MCP Search", href: "/search" },
      { kind: "link", label: "MCP Servers", href: "/server" },
      { kind: "link", label: "MCP Clients", href: "/client" },
      { kind: "link", label: "Agent Skills", href: "/tools/skills" },
      { kind: "link", label: "MCP Market Hub", href: "/hub" },
      { kind: "link", label: "Categories", href: "/categories" },
      { kind: "link", label: "What is an MCP server?", href: "/what-is-an-mcp-server" },
      { kind: "link", label: "What is WebMCP?", href: "/what-is-webmcp" },
      { kind: "link", label: "Model Context Protocol", href: "https://modelcontextprotocol.io" },
    ],
  },
  {
    heading: "Rankings",
    links: [
      { kind: "link", label: "Top MCPs Today", href: "/daily" },
      { kind: "link", label: "Top Agent Skills Today", href: "/daily/skills" },
      { kind: "link", label: "Top 100 Agent Skills", href: "/tools/skills/leaderboard" },
      { kind: "link", label: "Top 100 MCP Servers", href: "/leaderboards" },
    ],
  },
  {
    heading: "About",
    links: [
      { kind: "link", label: "News", href: "/news" },
      {
        kind: "button",
        label: "Signup for our newsletter",
        ariaLabel: "Open newsletter signup modal",
        event: "open-newsletter-modal",
      },
      { kind: "link", label: "Submit", href: "/submit" },
      {
        kind: "button",
        label: "Advertise with us",
        ariaLabel: "Open advertising information modal",
        event: "open-ad-modal",
      },
      {
        kind: "button",
        label: "Affiliates",
        ariaLabel: "Open affiliate program signup modal",
        event: "open-affiliates-modal",
      },
      { kind: "link", label: "Contact", href: "mailto:support@mcpmarket.com" },
    ],
  },
];

export const NEWSLETTER_TOAST = {
  title: "Join our newsletter",
  description: "Stay in the loop with MCP news, fresh resources, and community updates delivered straight to your inbox.",
  cta: "Join now →",
} as const;

export const LEAD_FORMS: readonly LeadForm[] = [
  {
    event: "open-newsletter-modal",
    aliasEvent: "open-newsletter-modal",
    title: "Join our newsletter",
    description: "Get the latest AI news, product updates, and resources delivered straight to your inbox.",
    successTitle: "You're on the list!",
    successDescription: "Thanks for subscribing. We'll send you AI news and resources soon.",
    emailId: "lead-email",
    fields: [
      {
        id: "lead-details",
        label: "What AI news and resources would you like to hear about?",
        placeholder: "Tell us what AI updates you're most interested in...",
        multiline: true,
      },
    ],
    submitLabel: "Subscribe",
  },
  {
    event: "open-ad-modal",
    aliasEvent: "open-advertise-modal",
    title: "Advertise with us!",
    description: "Get your tool in front of thousands of AI users daily",
    successTitle: "We'll be in touch!",
    successDescription: "Thanks for your interest in advertising with us.",
    emailId: "lead-email",
    fields: [
      {
        id: "lead-details",
        label: "Let us know if you have any questions!",
        placeholder: "Tell us about your advertising goals or ask any questions...",
        multiline: true,
      },
    ],
    submitLabel: "Submit",
  },
  {
    event: "open-affiliates-modal",
    aliasEvent: "open-affiliate-modal",
    title: "Become an affiliate",
    description:
      "Join MCP Market Hub's partner program and earn 15% for the first year of a user's subscription to mcpmarket.com/hub.",
    successTitle: "You're in!",
    successDescription: "Thanks for applying to the partner program. We'll be in touch with next steps soon.",
    emailId: "affiliate-email",
    fields: [
      { id: "affiliate-socials", label: "Socials", placeholder: "@yourhandle, links to your profiles...", multiline: false },
      {
        id: "affiliate-promotion",
        label: "How do you intend to promote?",
        placeholder: "Tell us about your audience and how you plan to promote MCP Market Hub...",
        multiline: true,
      },
    ],
    submitLabel: "Apply",
  },
];

export const LOCALES = [
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
  { code: "ko", label: "한국어" },
  { code: "es", label: "Español" },
  { code: "ja", label: "日本語" },
] as const;
