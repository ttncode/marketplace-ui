import type { SiteConfig } from "./lib/types.ts";

export const site: SiteConfig = {
  name: "Acme Directory",
  url: "https://example.com",
  description: "A curated directory of tools, with a dashboard to manage your own.",
  logo: { light: "/brand/logo.svg", dark: "/brand/logo-dark.svg" },
  announcement: { badge: "New", label: "Acme Studio", href: "/categories", description: "Browse the directory by category" },
  nav: [],
  mobileNav: [],
  headerActions: { secondary: { label: "Submit", href: "/submit" }, primary: { label: "Browse", href: "/categories" } },
  dashboardNav: [],
  footer: {
    description: "Acme Directory lists the best tools for your workflow.",
    columns: [],
    legalLinks: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
    copyright: "© 2026 Acme Inc. All rights reserved.",
  },
  newsletterToast: null,
  leadForms: [],
  socials: { github: "https://github.com/acme" },
};
