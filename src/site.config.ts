import type { SiteConfig } from "./lib/types.ts";

export const site: SiteConfig = {
  name: "Acme Directory",
  url: "https://example.com",
  description: "A curated directory of tools, with a dashboard to manage your own.",
  logo: { light: "/brand/logo.svg", dark: "/brand/logo-dark.svg" },
  announcement: { badge: "New", label: "Acme Studio", href: "/app", description: "Manage and schedule your content in one place" },
  nav: [
    {
      label: "Browse",
      icon: "folderOpen",
      hero: { title: "Open the app", description: "Manage, create and schedule your content.", href: "/app", image: "/brand/nav/app.svg" },
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
  headerActions: { secondary: { label: "Submit", href: "/submit" }, primary: { label: "Open app", href: "/app" } },
  dashboardNav: [{ label: "Overview", href: "/app", icon: "home" }, { label: "Videos", href: "/app/videos", icon: "video" }, { label: "New video", href: "/app/videos/new", icon: "plus" }, { label: "Settings", href: "/app/settings", icon: "settings" }],
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
  newsletterToast: { title: "Join our newsletter", description: "New tools and product updates, once a month.", cta: "Join now →" },
  leadForms: [
    {
      event: "open-newsletter-modal",
      title: "Join our newsletter",
      description: "New tools and product updates, once a month.",
      successTitle: "You're on the list",
      successDescription: "Thanks for subscribing.",
      emailId: "newsletter-email",
      fields: [],
      submitLabel: "Subscribe",
    },
    {
      event: "open-contact-modal",
      title: "Contact us",
      description: "Tell us what you need and we will get back to you.",
      successTitle: "Message sent",
      successDescription: "We will reply by email.",
      emailId: "contact-email",
      fields: [{ id: "contact-message", label: "Message", placeholder: "How can we help?", multiline: true }],
      submitLabel: "Send",
    },
  ],
  socials: { github: "https://github.com/acme" },
};
