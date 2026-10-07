import type { SiteConfig } from "./lib/types.ts";

export const site: SiteConfig = {
  name: "Acme Directory",
  url: "https://example.com",
  description: "A curated directory of tools, with a dashboard to manage your own.",
  logo: { light: "/brand/logo.svg", dark: "/brand/logo-dark.svg" },
  announcement: { badge: "New", label: "Acme Studio", href: "/categories", description: "Browse the directory by category" },
  nav: [
    {
      label: "Browse",
      icon: "folderOpen",
      hero: { title: "Browse categories", description: "Manage, create and schedule your content.", href: "/categories", image: "/brand/nav/app.svg" },
      features: [
        { title: "Categories", description: "Browse listings by category.", href: "/categories", image: "/brand/nav/categories.svg" },
        { title: "Submit", description: "Add your tool to the directory.", href: "/submit", image: "/brand/nav/submit.svg" },
      ],
      links: [
        { title: "All categories", description: "Every category in the directory.", href: "/categories", icon: "folderOpen" },
        { title: "Search", description: "Find a tool by name or tag.", href: "/search", icon: "search" },
      ],
    },
  ],
  mobileNav: [
    {
      heading: "Browse",
      items: [
        { label: "Categories", href: "/categories", icon: "folderOpen" },
        { label: "Search", href: "/search", icon: "search" },
        { label: "Submit", href: "/submit", icon: "plus" },
      ],
    },
  ],
  headerActions: { secondary: { label: "Submit", href: "/submit" }, primary: { label: "Browse", href: "/categories" } },
  dashboardNav: [],
  footer: {
    description: "Acme Directory lists the best tools for your workflow.",
    columns: [
      {
        heading: "Browse",
        links: [
          { kind: "link", label: "Categories", href: "/categories" },
          { kind: "link", label: "Search", href: "/search" },
          { kind: "link", label: "Submit", href: "/submit" },
        ],
      },
      {
        heading: "Company",
        links: [
          { kind: "button", label: "Newsletter", ariaLabel: "Open newsletter signup", event: "open-newsletter-modal" },
          { kind: "button", label: "Contact", ariaLabel: "Open contact form", event: "open-contact-modal" },
        ],
      },
    ],
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
