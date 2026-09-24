import { Rocket, Tag, Wallet } from "lucide-react";
import { GithubIcon } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/icons";
import type { FaqItem } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/types";
import type { CheckItem, IconItem } from "@/components/sites/mcpmarket-com-1a9fdbee/hub-2382ac74/hub-data";

// Seller onboarding lives on the app subdomain; the clone sends it to the 404 page.
export const SELL_URL = "https://app.mcpmarket.com/sell?source=sell-page";

export const LISTING_CHECKS: readonly CheckItem[] = [
  { title: "Set your own price", body: "You decide what each skill is worth." },
  { title: "Publish and version", body: "Ship updates without relisting; buyers stay on the latest." },
  { title: "Sync from GitHub", body: "Connect a repo or upload your SKILL.md to go live." },
  { title: "Works everywhere", body: "Sync to any agent with the MCP Market plugin." },
];

export const STOREFRONT_CHECKS: readonly CheckItem[] = [
  { title: "A shareable profile URL", body: "Drop one link in any bio or post." },
  { title: "Your skills, your brand", body: "Avatar, bio, and every skill you publish." },
];

export const REACH_CHECKS: readonly CheckItem[] = [
  { title: "1M+ unique visitors", body: "Tap into demand that's already here." },
  { title: "Built-in discovery", body: "Search, categories, and trending placement." },
  { title: "Featured spots", body: "Quality skills get surfaced across the site." },
  { title: "Indexed pages", body: "Every listing is built to be found in search." },
];

export const SYNC_CHECKS: readonly CheckItem[] = [
  { title: "Direct download", body: "Buyers grab your skill as a file, ready to drop in." },
  { title: "Plugin sync", body: "The MCP Market Hub plugin keeps it current across agents." },
  { title: "Every agent", body: "Works with Claude, Codex, and Openclaw." },
  { title: "Always up to date", body: "Ship an update and synced users get the latest." },
];

export const STEPS: readonly IconItem[] = [
  { icon: GithubIcon, title: "Connect your skill", body: "Import from GitHub or upload your SKILL.md." },
  { icon: Tag, title: "Set your price", body: "You set the price and control the listing." },
  { icon: Rocket, title: "Publish", body: "Go live on your storefront and in the marketplace." },
  { icon: Wallet, title: "Get paid", body: "Earn on every sale and track revenue from your dashboard." },
];

export const SELL_FAQ: readonly FaqItem[] = [
  {
    question: "How do I start selling?",
    answer:
      "Create your seller account, connect or upload a skill, set your price, and publish it to your storefront and MCP Market.",
  },
  {
    question: "What can I sell?",
    answer:
      "Any agent skill you've built and have the rights to — packaged as a SKILL.md or synced from a GitHub repo. You set the price and publish versions over time.",
  },
  {
    question: "How do payouts work?",
    answer:
      "You earn on every sale and can track revenue and payouts from your seller dashboard. A 20% commission fee applies on all sales.",
  },
  {
    question: "Is there a fee?",
    answer: "There is a 20% commission fee on all sales. To list on MCP Market, you must have a Pro account.",
  },
  {
    question: "Do I need an audience?",
    answer:
      "No. Your skills are discoverable to the million+ visitors already browsing MCP Market, and you get a storefront to share with any audience you do have.",
  },
];

export interface SaleRow {
  readonly name: string;
  readonly live: boolean;
  readonly sales: number;
  readonly price: string;
}

export const EARNINGS_ROWS: readonly SaleRow[] = [
  { name: "pr-review", live: true, sales: 64, price: "$19" },
  { name: "standup-digest", live: true, sales: 51, price: "$9" },
  { name: "sql-explain", live: false, sales: 27, price: "$12" },
];

export interface StoreSkill {
  readonly name: string;
  readonly price: string;
  readonly blurb: string;
  readonly installs: string;
}

export const STORE_SKILLS: readonly StoreSkill[] = [
  { name: "pr-review", price: "$19", blurb: "Review diffs for correctness and reuse.", installs: "2.3k" },
  { name: "standup-digest", price: "$9", blurb: "Summarize standups straight from chat.", installs: "1.1k" },
  { name: "sql-explain", price: "$12", blurb: "Explain and optimize SQL queries.", installs: "870" },
];

export const CATEGORIES = ["Engineering", "Productivity", "Data", "DevOps"] as const;

export const TRENDING = [
  { name: "pr-review", author: "@maya", installs: "2.3k" },
  { name: "changelog-writer", author: "@kai", installs: "1.8k" },
  { name: "sql-explain", author: "@maya", installs: "870" },
] as const;

export const AGENTS = ["Claude", "Codex", "Openclaw"] as const;
