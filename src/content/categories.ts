import type { Category } from "../lib/types.ts";

export const CATEGORIES: readonly Category[] = [
  { slug: "design", name: "Design", description: "Tools for interface, brand and visual design.", icon: "Design Tools" },
  { slug: "video", name: "Video", description: "Editing, captions and publishing for video.", icon: "Content Management" },
  { slug: "productivity", name: "Productivity", description: "Plan, write and automate everyday work.", icon: "Productivity & Workflow" },
  { slug: "developer-tools", name: "Developer Tools", description: "Build, test and ship software.", icon: "Developer Tools" },
  { slug: "analytics", name: "Analytics", description: "Measure what matters.", icon: "Analytics & Monitoring" },
  { slug: "marketing", name: "Marketing", description: "Grow an audience and reach it.", icon: "Marketing Automation" },
];
