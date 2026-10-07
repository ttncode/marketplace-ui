import type { HeroContent, HomeSection } from "../lib/types.ts";

export const HERO: HeroContent = {
  countLabel: "20 tools",
  updatedLabel: "Updated daily",
  title: "Find the best",
  rotatingTerms: ["design tools", "video tools", "dev tools"],
  description: "Browse a curated directory of tools, sorted by category and ready to try.",
  searchPlaceholder: "Search the directory...",
};

export const HOME_SECTIONS: readonly HomeSection[] = [
  {
    title: "Featured",
    viewAll: { label: "View all", href: "/categories" },
    listingSlugs: ["patchbay", "pixelpalette", "taskloom", "testwren", "metricnest", "campaignkite"],
  },
  {
    title: "Video",
    viewAll: { label: "View all video", href: "/categories/video" },
    listingSlugs: ["frameboard", "clipcaption", "reelsmith", "soundstage", "thumbcraft", "castlight"],
  },
  {
    title: "Developer Tools",
    viewAll: { label: "View all developer tools", href: "/categories/developer-tools" },
    listingSlugs: ["patchbay", "testwren", "lintfox", "shipwell", "schemaleaf", "logbloom"],
  },
];
