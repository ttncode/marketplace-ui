import type { ComponentType } from "react";
import {
  Files,
  FolderKanban,
  GitBranch,
  Package,
  Plug,
  RefreshCw,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { FaqItem } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/types";

export interface IconItem {
  readonly icon: ComponentType<{ readonly className?: string; readonly strokeWidth?: number }>;
  readonly title: string;
  readonly body: string;
}

export interface CheckItem {
  readonly title: string;
  readonly body?: string;
}

export interface PricingPlan {
  readonly name: string;
  readonly price: string;
  readonly blurb: string;
  readonly features: readonly string[];
  readonly cta: string;
  readonly featured?: boolean;
}

// The source's sign-up CTAs point at the app subdomain; the clone sends them to the 404 page.
export const SIGNUP_URL = "https://app.mcpmarket.com/signup";

export const HERO_ITEMS: readonly IconItem[] = [
  { icon: GitBranch, title: "Version control", body: "Draft, publish, roll back" },
  { icon: RefreshCw, title: "Sync", body: "Updates reach every agent" },
  { icon: Plug, title: "Connect", body: "MCP tools from the catalog" },
  { icon: Users, title: "Share", body: "One plugin for the team" },
];

export const STACK_ITEMS: readonly IconItem[] = [
  { icon: Files, title: "Build", body: "Create or import skills, then draft, publish, and version." },
  { icon: Plug, title: "Connect", body: "Add MCPs from the catalog or deploy your own." },
  { icon: Package, title: "Share", body: "Bundle into toolkits and sync through the plugin." },
];

export const USE_CASE_ITEMS: readonly IconItem[] = [
  { icon: RefreshCw, title: "Sync skills across agents", body: "Install through the plugin; updates sync automatically." },
  { icon: Users, title: "Share skills with teammates", body: "One trusted place to find, update, and reuse skills." },
  { icon: FolderKanban, title: "Build role-specific toolkits", body: "Separate kits for engineering, support, ops, or research." },
  { icon: Plug, title: "Connect agents to real tools", body: "Add catalog MCPs or deploy custom servers for internal systems." },
  {
    icon: ShieldCheck,
    title: "Standardize workflows",
    body: "Bundle approved skills and tools so the whole team works from one source of truth.",
  },
];

export const SKILLS_CHECKS: readonly CheckItem[] = [
  { title: "Create and import", body: "Start from a blank SKILL.md or import from GitHub." },
  { title: "Draft, publish, version", body: "Refine safely before shipping, with a clear history of what changed and when." },
  { title: "Sync through the plugin", body: "Install skills to your agent and keep them updated automatically." },
  { title: "Solo or team", body: "Use Hub as a personal library or a shared workspace." },
];

export const MCP_CHECKS: readonly CheckItem[] = [
  { title: "Browse the catalog", body: "Find ready-to-connect MCPs in seconds." },
  { title: "Install from the directory", body: "Use mcpmarket.com to discover open-source MCPs and skills." },
  { title: "Deploy custom MCPs", body: "Bring your own from npm, PyPI, GitHub, or Docker." },
  { title: "Connect with the right auth", body: "Hosted and registry connections, including OAuth and API-key flows." },
];

export const TOOLKIT_CHECKS: readonly CheckItem[] = [
  { title: "Combine multiple MCPs", body: "Pull selected tools from different servers into one toolkit." },
  { title: "Add Agent Skills", body: "Give agents instructions and actions together." },
  { title: "Share one plugin", body: "One toolkit instead of a pile of separate configs." },
  { title: "Control access", body: "Admins decide who can use which toolkits." },
];

export const OBSERVABILITY_CHECKS: readonly CheckItem[] = [
  { title: "Track tool-call volume" },
  { title: "Monitor errors and latency" },
  { title: "See top-used tools" },
  { title: "Understand usage across MCPs and toolkits" },
];

export const MEMBER_CHECKS: readonly CheckItem[] = [
  {
    title: "Role-based access",
    body: "Owner, admin, and member roles control who can publish skills, edit toolkits, and manage billing.",
  },
  {
    title: "Assign per person or org-wide",
    body: "Give a toolkit to one teammate or the whole workspace; members see only what they're assigned.",
  },
  { title: "Per-user credentials", body: "Each member connects their own accounts, so a shared toolkit never shares secrets." },
  { title: "Seats that scale", body: "Track seats, send invites, and add capacity as you grow." },
];

export const INSTALL_CHECKS: readonly CheckItem[] = [
  { title: "Works in every client", body: "Claude Code, Claude Desktop, Codex, Cursor, and any MCP-enabled client." },
  { title: "One-line install", body: "A single command wires up every skill and tool in the toolkit." },
  { title: "Stays in sync", body: "Push an update once; connected clients pick it up automatically." },
  { title: "No manual config", body: "No hand-editing JSON. The plugin manages the connection." },
];

export const PRICING_PLANS: readonly PricingPlan[] = [
  {
    name: "Free",
    price: "$0/mo",
    blurb: "Best for trying Hub.",
    features: [
      "1 user",
      "3 catalog MCPs",
      "1,000 credits/month",
      "Up to 3 skills",
      "Skill updates overwrite in place (no version history)",
    ],
    cta: "Get started",
  },
  {
    name: "Pro",
    price: "$19/mo",
    blurb: "Best for individual builders who want custom MCPs and full skill management.",
    features: [
      "1 user",
      "10 MCPs",
      "Custom MCP deployments",
      "50,000 credits/month",
      "Up to 100 skills",
      "30-day version history",
    ],
    cta: "Start Pro",
    featured: true,
  },
  {
    name: "Team",
    price: "$149/mo",
    blurb: "Best for teams sharing skills, tools, and infrastructure.",
    features: [
      "5 users included ($9 per additional user)",
      "Unlimited MCPs",
      "Custom MCP deployments",
      "250,000 pooled credits/month",
      "Unlimited skills",
      "Unlimited version history",
      "Toolkit assignments and per-user credentials",
    ],
    cta: "Start Team",
  },
];

export const HUB_FAQ: readonly FaqItem[] = [
  {
    question: "What is MCP Market Hub?",
    answer: "MCP Market Hub is where you manage AI Agent Skills, MCPs, and toolkits from MCP Market.",
  },
  {
    question: "How is MCP Market Hub different from mcpmarket.com?",
    answer:
      "mcpmarket.com is the directory for discovering open-source MCPs and AI Agent Skills. MCP Market Hub is where users install, manage, version, sync, and share them.",
  },
  {
    question: "What are AI Agent Skills?",
    answer:
      "AI Agent Skills are reusable instructions, workflows, and capability packages that agents can load and use. In Hub, skills can be created, imported, versioned, published, installed, and synced.",
  },
  {
    question: "Can I sync skills directly to my agent?",
    answer:
      "Yes. Users can use the MCP Market plugin to sync skills directly to their agent, with updates automatically syncing across users.",
  },
  {
    question: "Can I use MCP Market Hub as an individual?",
    answer: "Yes. Individuals can use Hub to manage their own version-controlled skill library and connect MCP tools.",
  },
  {
    question: "Can teams use MCP Market Hub?",
    answer: "Yes. Teams can manage a shared skill library, group tools into toolkits, and control which teammates have access.",
  },
  {
    question: "What are toolkits?",
    answer: "Toolkits let users group MCP tools from multiple MCPs, plus AI Agent Skills, into one managed toolkit.",
  },
  {
    question: "Can I deploy my own MCPs?",
    answer: "Yes. Supported plans can deploy custom MCPs from npm, PyPI, GitHub, or Docker.",
  },
  {
    question: "Can I install MCPs from the catalog or directory?",
    answer:
      "Yes. Users can connect from the MCP Market catalog, install from the MCP Market directory, or deploy custom MCPs.",
  },
  {
    question: "What can admins control?",
    answer: "Admins can manage team toolkits, assign access, control available MCP tools, and keep shared skills updated.",
  },
];
