import type { ImageRef } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/types";

const AVATARS = "/sites/mcpmarket-com-1a9fdbee/tools-skills-official-c4dc80e5/avatars";

export interface OfficialPublisher {
  readonly name: string;
  readonly href: string;
  readonly avatar: string;
  readonly count: number;
}

export interface OfficialSkill {
  readonly title: string;
  readonly href: string;
  readonly avatar: ImageRef;
  readonly description: string;
}

export const OFFICIAL_PUBLISHERS: readonly OfficialPublisher[] = [
  { name: "Microsoft", href: "/tools/skills/official/microsoft", avatar: `${AVATARS}/avatar-6154722.png`, count: 372 },
  { name: "PostHog", href: "/tools/skills/official/posthog", avatar: `${AVATARS}/avatar-60330232.png`, count: 160 },
  { name: "Firecrawl", href: "/tools/skills/official/firecrawl", avatar: `${AVATARS}/avatar-135057108.png`, count: 134 },
  { name: "Getsentry", href: "/tools/skills/official/getsentry", avatar: `${AVATARS}/avatar-1396951.png`, count: 93 },
  { name: "NVIDIA", href: "/tools/skills/official/nvidia", avatar: `${AVATARS}/avatar-1728152.png`, count: 80 },
  { name: "Anthropics", href: "/tools/skills/official/anthropics", avatar: `${AVATARS}/avatar-76263028.png`, count: 76 },
  { name: "Bitwarden", href: "/tools/skills/official/bitwarden", avatar: `${AVATARS}/avatar-15990069.png`, count: 55 },
  { name: "Auth0", href: "/tools/skills/official/auth0", avatar: `${AVATARS}/avatar-2824157.png`, count: 45 },
  { name: "Datadog Labs", href: "/tools/skills/official/datadog-labs", avatar: `${AVATARS}/avatar-259158689.png`, count: 39 },
  { name: "Langchain", href: "/tools/skills/official/langchain-ai", avatar: `${AVATARS}/avatar-126733545.png`, count: 39 },
  { name: "Vercel Labs", href: "/tools/skills/official/vercel-labs", avatar: `${AVATARS}/avatar-108547162.png`, count: 36 },
  { name: "Medusajs", href: "/tools/skills/official/medusajs", avatar: `${AVATARS}/avatar-62591822.png`, count: 34 },
  { name: "Encoredev", href: "/tools/skills/official/encoredev", avatar: `${AVATARS}/avatar-50438175.png`, count: 28 },
  { name: "Figma", href: "/tools/skills/official/figma", avatar: `${AVATARS}/avatar-5155369.png`, count: 28 },
  { name: "n8n io", href: "/tools/skills/official/n8n-io", avatar: `${AVATARS}/avatar-45487711.png`, count: 28 },
  { name: "Webflow", href: "/tools/skills/official/webflow", avatar: `${AVATARS}/avatar-1229663.png`, count: 26 },
  { name: "Shopify", href: "/tools/skills/official/shopify", avatar: `${AVATARS}/avatar-8085.png`, count: 23 },
  { name: "Clerk", href: "/tools/skills/official/clerk", avatar: `${AVATARS}/avatar-49538330.png`, count: 22 },
  { name: "Expo", href: "/tools/skills/official/expo", avatar: `${AVATARS}/avatar-12504344.png`, count: 20 },
  { name: "Flutter", href: "/tools/skills/official/flutter", avatar: `${AVATARS}/avatar-14101776.png`, count: 20 },
  { name: "Mapbox", href: "/tools/skills/official/mapbox", avatar: `${AVATARS}/avatar-600935.png`, count: 19 },
  { name: "Apify", href: "/tools/skills/official/apify", avatar: `${AVATARS}/avatar-24586296.png`, count: 18 },
  { name: "Pinecone io", href: "/tools/skills/official/pinecone-io", avatar: `${AVATARS}/avatar-54333248.png`, count: 18 },
  { name: "WordPress", href: "/tools/skills/official/wordpress", avatar: `${AVATARS}/avatar-276006.png`, count: 18 },
  { name: "Automattic", href: "/tools/skills/official/automattic", avatar: `${AVATARS}/avatar-887802.png`, count: 17 },
  { name: "Sanity io", href: "/tools/skills/official/sanity-io", avatar: `${AVATARS}/avatar-17177659.png`, count: 17 },
  { name: "Browserbase", href: "/tools/skills/official/browserbase", avatar: `${AVATARS}/avatar-158221360.png`, count: 16 },
  { name: "Google Labs Code", href: "/tools/skills/official/google-labs-code", avatar: `${AVATARS}/avatar-161364575.png`, count: 16 },
  { name: "Rivet dev", href: "/tools/skills/official/rivet-dev", avatar: `${AVATARS}/avatar-57733614.png`, count: 16 },
  { name: "Pulumi", href: "/tools/skills/official/pulumi", avatar: `${AVATARS}/avatar-21992475.png`, count: 15 },
  { name: "Apollographql", href: "/tools/skills/official/apollographql", avatar: `${AVATARS}/avatar-17189275.png`, count: 14 },
  { name: "Callstackincubator", href: "/tools/skills/official/callstackincubator", avatar: `${AVATARS}/avatar-40356278.png`, count: 13 },
  { name: "Brave", href: "/tools/skills/official/brave", avatar: `${AVATARS}/avatar-12301619.png`, count: 12 },
  { name: "ClickHouse", href: "/tools/skills/official/clickhouse", avatar: `${AVATARS}/avatar-54801242.png`, count: 12 },
  { name: "Cloudflare", href: "/tools/skills/official/cloudflare", avatar: `${AVATARS}/avatar-314135.png`, count: 11 },
  { name: "Firebase", href: "/tools/skills/official/firebase", avatar: `${AVATARS}/avatar-1335026.png`, count: 11 },
  { name: "Neondatabase", href: "/tools/skills/official/neondatabase", avatar: `${AVATARS}/avatar-77690634.png`, count: 11 },
  { name: "Upstash", href: "/tools/skills/official/upstash", avatar: `${AVATARS}/avatar-74989412.png`, count: 11 },
  { name: "Stripe", href: "/tools/skills/official/stripe", avatar: `${AVATARS}/avatar-856813.png`, count: 10 },
  { name: "Parallel web", href: "/tools/skills/official/parallel-web", avatar: `${AVATARS}/avatar-210743255.png`, count: 9 },
  { name: "Resend", href: "/tools/skills/official/resend", avatar: `${AVATARS}/avatar-109384852.png`, count: 9 },
  { name: "Base", href: "/tools/skills/official/base", avatar: `${AVATARS}/avatar-16627100.png`, count: 8 },
  { name: "Contentful", href: "/tools/skills/official/contentful", avatar: `${AVATARS}/avatar-472182.png`, count: 8 },
  { name: "Exploreomni", href: "/tools/skills/official/exploreomni", avatar: `${AVATARS}/avatar-100505341.png`, count: 8 },
  { name: "Google Gemini", href: "/tools/skills/official/google-gemini", avatar: `${AVATARS}/avatar-161781182.png`, count: 8 },
  { name: "Planetscale", href: "/tools/skills/official/planetscale", avatar: `${AVATARS}/avatar-35612527.png`, count: 8 },
  { name: "Prisma", href: "/tools/skills/official/prisma", avatar: `${AVATARS}/avatar-17219288.png`, count: 8 },
  { name: "Redis", href: "/tools/skills/official/redis", avatar: `${AVATARS}/avatar-1529926.png`, count: 8 },
  { name: "Sveltejs", href: "/tools/skills/official/sveltejs", avatar: `${AVATARS}/avatar-23617963.png`, count: 8 },
  { name: "Tavily ai", href: "/tools/skills/official/tavily-ai", avatar: `${AVATARS}/avatar-170207473.png`, count: 8 },
  { name: "Axiomhq", href: "/tools/skills/official/axiomhq", avatar: `${AVATARS}/avatar-21122348.png`, count: 7 },
  { name: "Deepgram", href: "/tools/skills/official/deepgram", avatar: `${AVATARS}/avatar-17422641.png`, count: 7 },
  { name: "Denoland", href: "/tools/skills/official/denoland", avatar: `${AVATARS}/avatar-42048915.png`, count: 6 },
  { name: "Better Auth", href: "/tools/skills/official/better-auth", avatar: `${AVATARS}/avatar-163827765.png`, count: 5 },
  { name: "Makenotion", href: "/tools/skills/official/makenotion", avatar: `${AVATARS}/avatar-4792552.png`, count: 5 },
  { name: "ProjectOpenSea", href: "/tools/skills/official/projectopensea", avatar: `${AVATARS}/avatar-34966464.png`, count: 5 },
  { name: "Zapier", href: "/tools/skills/official/zapier", avatar: `${AVATARS}/avatar-1261889.png`, count: 5 },
  { name: "Coderabbitai", href: "/tools/skills/official/coderabbitai", avatar: `${AVATARS}/avatar-132028505.png`, count: 4 },
  { name: "Dagster io", href: "/tools/skills/official/dagster-io", avatar: `${AVATARS}/avatar-40032576.png`, count: 4 },
  { name: "Dash0hq", href: "/tools/skills/official/dash0hq", avatar: `${AVATARS}/avatar-124512521.png`, count: 4 },
  { name: "mcp use", href: "/tools/skills/official/mcp-use", avatar: `${AVATARS}/avatar-207005519.png`, count: 4 },
  { name: "Temporalio", href: "/tools/skills/official/temporalio", avatar: `${AVATARS}/avatar-56493103.png`, count: 4 },
  { name: "Tinybirdco", href: "/tools/skills/official/tinybirdco", avatar: `${AVATARS}/avatar-53208553.png`, count: 4 },
  { name: "Semgrep", href: "/tools/skills/official/semgrep", avatar: `${AVATARS}/avatar-29760937.png`, count: 3 },
  { name: "Vercel", href: "/tools/skills/official/vercel", avatar: `${AVATARS}/avatar-14985020.png`, count: 3 },
  { name: "Langfuse", href: "/tools/skills/official/langfuse", avatar: `${AVATARS}/avatar-134601687.png`, count: 2 },
  { name: "Supabase", href: "/tools/skills/official/supabase", avatar: `${AVATARS}/avatar-54469796.png`, count: 2 },
  { name: "Coinbase", href: "/tools/skills/official/coinbase", avatar: `${AVATARS}/avatar-1885080.png`, count: 1 },
  { name: "Remotion dev", href: "/tools/skills/official/remotion-dev", avatar: `${AVATARS}/avatar-85344006.png`, count: 1 },
  { name: "Streamlit", href: "/tools/skills/official/streamlit", avatar: `${AVATARS}/avatar-45109972.png`, count: 1 },
];

/** Individual skills marked official, listed after the publishers in the same grid. */
export const OFFICIAL_SKILLS: readonly OfficialSkill[] = [
  {
    title: "Outreach Magic",
    href: "/tools/skills/outreach-magic",
    avatar: { src: `${AVATARS}/avatar-287127599.png`, alt: "outreachmagic" },
    description: "Syncs cross-platform sales outreach data into a local SQLite database for direct querying and pipeline management by AI agents.",
  },
  {
    title: "SpecDD Adopt",
    href: "/tools/skills/specdd-adopt",
    avatar: { src: `${AVATARS}/avatar-279009931.png`, alt: "specdd" },
    description: "Initializes and updates the SpecDD framework in any repository to establish clear development boundaries and authority.",
  },
  {
    title: "SpecDD Author",
    href: "/tools/skills/specdd-author",
    avatar: { src: `${AVATARS}/avatar-279009931.png`, alt: "specdd" },
    description: "Creates and refines SpecDD (.sdd) specifications to maintain clear project contracts and behavioral constraints.",
  },
  {
    title: "SpecDD CLI",
    href: "/tools/skills/specdd-cli",
    avatar: { src: `${AVATARS}/avatar-279009931.png`, alt: "specdd" },
    description: "Manages Spec-Driven Development projects through automated specification discovery, inspection, and linting.",
  },
  {
    title: "SpecDD Debug",
    href: "/tools/skills/specdd-debug",
    avatar: { src: `${AVATARS}/avatar-279009931.png`, alt: "specdd" },
    description: "Diagnoses and resolves code failures by validating implementation against active SpecDD specification contracts.",
  },
  {
    title: "SpecDD Implementation Manager",
    href: "/tools/skills/specdd-implementation-manager",
    avatar: { src: `${AVATARS}/avatar-279009931.png`, alt: "specdd" },
    description: "Executes code and documentation changes strictly according to the SpecDD specification-driven development framework.",
  },
  {
    title: "SpecDD Documentation Assistant",
    href: "/tools/skills/specdd-documentation-assistant",
    avatar: { src: `${AVATARS}/avatar-279009931.png`, alt: "specdd" },
    description: "Generates and maintains project documentation by extracting source-of-truth requirements from SpecDD specification chains.",
  },
  {
    title: "SpecDD Explainer",
    href: "/tools/skills/specdd-explainer",
    avatar: { src: `${AVATARS}/avatar-279009931.png`, alt: "specdd" },
    description: "Explains SpecDD contracts and project specifications to provide developers with clear, actionable insights into code behavior and constraints.",
  },
  {
    title: "SpecDD Project Orientation",
    href: "/tools/skills/specdd-project-orientation",
    avatar: { src: `${AVATARS}/avatar-279009931.png`, alt: "specdd" },
    description: "Prepares AI agents for tasks within SpecDD projects by establishing context and reading specification chains without modifying files.",
  },
  {
    title: "SpecDD Planning",
    href: "/tools/skills/specdd-planning",
    avatar: { src: `${AVATARS}/avatar-279009931.png`, alt: "specdd" },
    description: "Plans and validates development tasks within Specification-Driven Development projects to ensure safe implementation and clear authority.",
  },
  {
    title: "SpecDD Refactor",
    href: "/tools/skills/specdd-refactor",
    avatar: { src: `${AVATARS}/avatar-279009931.png`, alt: "specdd" },
    description: "Refactors project structure and code while strictly preserving behavioral contracts defined in SpecDD bootstrap and specification files.",
  },
  {
    title: "SpecDD Code Review",
    href: "/tools/skills/specdd-code-review",
    avatar: { src: `${AVATARS}/avatar-279009931.png`, alt: "specdd" },
    description: "Reviews code changes against active SpecDD specifications to ensure contract compliance and behavioral integrity.",
  },
  {
    title: "SpecDD Risk Assessment",
    href: "/tools/skills/specdd-risk-assessment",
    avatar: { src: `${AVATARS}/avatar-279009931.png`, alt: "specdd" },
    description: "Assesses technical and project risks before executing tasks within SpecDD environments to prevent destructive changes.",
  },
  {
    title: "SpecDD Task Manager",
    href: "/tools/skills/specdd-task-manager",
    avatar: { src: `${AVATARS}/avatar-279009931.png`, alt: "specdd" },
    description: "Manages and synchronizes project tasks within the Spec-Driven Development (SpecDD) framework for Claude Code.",
  },
  {
    title: "SpecDD Test Automation",
    href: "/tools/skills/specdd-test-automation",
    avatar: { src: `${AVATARS}/avatar-279009931.png`, alt: "specdd" },
    description: "Synchronizes testing suites with SpecDD specification contracts to ensure verifiable software behavior.",
  },
  {
    title: "SpecDD Trace",
    href: "/tools/skills/specdd-trace",
    avatar: { src: `${AVATARS}/avatar-279009931.png`, alt: "specdd" },
    description: "Traces development specifications to code, tests, and documentation to ensure alignment and identify coverage gaps.",
  },
];
