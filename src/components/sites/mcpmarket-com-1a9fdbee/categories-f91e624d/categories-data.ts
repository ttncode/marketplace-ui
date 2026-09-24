export interface CategoryTile {
  readonly name: string;
  readonly href: string;
  /** Pre-formatted as on the source ("31,796"). */
  readonly count: string;
}

const tiles = (basePath: string, rows: readonly (readonly [string, string, string])[]): readonly CategoryTile[] =>
  rows.map(([name, slug, count]) => ({ name, href: `${basePath}/${slug}`, count }));

/** mcpmarket.com/categories, in source order (by server count). */
export const MCP_CATEGORIES = tiles("/categories", [
  ["Developer Tools", "developer-tools", "31,796"],
  ["Data Science & ML", "data-science-ml", "17,670"],
  ["API Development", "api-development", "17,408"],
  ["Productivity & Workflow", "productivity-workflow", "15,622"],
  ["Analytics & Monitoring", "analytics-monitoring", "7,754"],
  ["Security & Testing", "security-testing", "6,155"],
  ["Web Scraping & Data Collection", "web-scraping-data-collection", "5,436"],
  ["Deployment & DevOps", "deployment-devops", "5,345"],
  ["Other", "other", "4,143"],
  ["Learning & Documentation", "learning-documentation", "3,472"],
  ["Database Management", "database-management", "2,803"],
  ["Content Management", "content-management", "2,705"],
  ["Collaboration Tools", "collaboration-tools", "2,156"],
  ["Cloud Infrastructure", "cloud-infrastructure", "2,118"],
  ["Marketing Automation", "marketing-automation", "1,461"],
  ["E-commerce Solutions", "e-commerce-solutions", "1,312"],
  ["Design Tools", "design-tools", "1,299"],
  ["Browser Automation", "browser-automation", "1,269"],
  ["Social Media Management", "social-media-management", "1,052"],
  ["Game Development", "game-development", "841"],
]);

/** mcpmarket.com/tools/skills/categories, in source order (by skill count). */
export const SKILL_CATEGORIES = tiles("/tools/skills/categories", [
  ["Productivity & Workflow", "productivity-workflow", "69,770"],
  ["Security & Testing", "security-testing", "44,062"],
  ["Data Science & ML", "data-science-ml", "29,450"],
  ["Developer Tools", "developer-tools", "27,410"],
  ["Design Tools", "design-tools", "25,804"],
  ["Collaboration Tools", "collaboration-tools", "20,661"],
  ["API Development", "api-development", "20,559"],
  ["Learning & Documentation", "learning-documentation", "19,406"],
  ["Marketing Automation", "marketing-automation", "17,332"],
  ["Deployment & DevOps", "deployment-devops", "16,346"],
  ["Analytics & Monitoring", "analytics-monitoring", "15,765"],
  ["Content Management", "content-management", "13,394"],
  ["Cloud Infrastructure", "cloud-infrastructure", "9,412"],
  ["Database Management", "database-management", "9,108"],
  ["Mobile Development", "mobile-development", "8,309"],
  ["E-commerce Solutions", "e-commerce-solutions", "5,279"],
  ["Web Scraping & Data Collection", "web-scraping-data-collection", "5,156"],
  ["Social Media Management", "social-media-management", "3,826"],
  ["Game Development", "game-development", "3,425"],
  ["Browser Automation", "browser-automation", "2,189"],
  ["Other", "other", "245"],
  ["Official", "official", "18"],
]);
