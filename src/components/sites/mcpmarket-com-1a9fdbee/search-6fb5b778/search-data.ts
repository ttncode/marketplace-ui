export interface SearchCategory {
  readonly name: string;
  readonly slug: string;
  readonly count: number;
}

// The source's category rail, in its order (first five are chips, the rest sit in "More categories").
export const SEARCH_CATEGORIES: readonly SearchCategory[] = [
  { name: "Developer Tools", slug: "developer-tools", count: 31837 },
  { name: "Data Science & ML", slug: "data-science-ml", count: 17690 },
  { name: "API Development", slug: "api-development", count: 17421 },
  { name: "Productivity & Workflow", slug: "productivity-workflow", count: 15646 },
  { name: "Analytics & Monitoring", slug: "analytics-monitoring", count: 7767 },
  { name: "Security & Testing", slug: "security-testing", count: 6167 },
  { name: "Web Scraping & Data Collection", slug: "web-scraping-data-collection", count: 5441 },
  { name: "Deployment & DevOps", slug: "deployment-devops", count: 5353 },
  { name: "Other", slug: "other", count: 4144 },
  { name: "Learning & Documentation", slug: "learning-documentation", count: 3474 },
  { name: "Database Management", slug: "database-management", count: 2806 },
  { name: "Content Management", slug: "content-management", count: 2712 },
  { name: "Collaboration Tools", slug: "collaboration-tools", count: 2162 },
  { name: "Cloud Infrastructure", slug: "cloud-infrastructure", count: 2118 },
  { name: "Marketing Automation", slug: "marketing-automation", count: 1464 },
  { name: "E-commerce Solutions", slug: "e-commerce-solutions", count: 1312 },
  { name: "Design Tools", slug: "design-tools", count: 1302 },
  { name: "Browser Automation", slug: "browser-automation", count: 1270 },
  { name: "Social Media Management", slug: "social-media-management", count: 1053 },
  { name: "Game Development", slug: "game-development", count: 843 },
  { name: "Mobile Development", slug: "mobile-development", count: 504 },
  { name: "Official", slug: "official", count: 81 },
  { name: "Featured", slug: "featured", count: 52 },
];

export type BrowseIcon = "database" | "zap" | "code" | "cloud";

export interface BrowseCategory {
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly icon: BrowseIcon;
}

export const BROWSE_CATEGORIES: readonly BrowseCategory[] = [
  {
    title: "Database Integration",
    description: "MCP servers for SQL, NoSQL, and other database systems",
    href: "/search/database-integration",
    icon: "database",
  },
  {
    title: "Vector Databases",
    description: "Tools for semantic search and embedding retrieval",
    href: "/search/vector-database",
    icon: "zap",
  },
  {
    title: "Code Generation",
    description: "Tools for generating and executing code with AI",
    href: "/search?q=code+generation",
    icon: "code",
  },
  {
    title: "Cloud Services",
    description: "Integrate with AWS, GCP, Azure and other cloud platforms",
    href: "/search?q=cloud+services",
    icon: "cloud",
  },
];
