import {
  ArrowLink,
  AudienceGrid,
  ChipList,
  ComparisonCard,
  CtaSection,
  ExplainerContent,
  FeatureGrid,
  GlassCardGrid,
  Lead,
  Section,
  SectionTitle,
  StepList,
  TextLink,
  UseCaseList,
} from "@/components/sites/mcpmarket-com-1a9fdbee/what-is-an-mcp-server-4bf875ce/ExplainerBlocks";
import { ExplainerHero } from "@/components/sites/mcpmarket-com-1a9fdbee/what-is-an-mcp-server-4bf875ce/ExplainerHero";
import {
  Building2Icon,
  ChevronRightIcon,
  CodeIcon,
  CpuIcon,
  FileTextIcon,
  GlobeIcon,
  LayersPolygonIcon,
  LayoutGridIcon,
  PackageIcon,
  SparklesIcon,
  TrendingUpIcon,
  ZapPolygonIcon,
} from "@/components/sites/mcpmarket-com-1a9fdbee/what-is-an-mcp-server-4bf875ce/icons";
import type { ExplainerScale } from "@/components/sites/mcpmarket-com-1a9fdbee/what-is-an-mcp-server-4bf875ce/types";

const SCALE: ExplainerScale = "md";
const SKILLS_DOCS = "https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview";

export function WhatAreSkills() {
  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen flex-col bg-[var(--design-canvas)]">
        <ExplainerHero
          minHeightClass="min-h-[500px] md:min-h-[530px]"
          hero={{
            crumbs: [{ label: "Skills", href: "/tools/skills" }],
            current: "What Are Skills",
            title: "What Are ",
            mutedTitle: "Claude Skills?",
            description:
              "Skills are organized folders of instructions, scripts, and resources that Claude loads dynamically to perform specific tasks better. Think of them as custom onboarding materials that package expertise.",
            actions: {
              primary: { label: "Browse Skills", href: "/tools/skills" },
              secondary: { label: "Official Docs", href: SKILLS_DOCS },
            },
          }}
        />
        <ExplainerContent className="flex-1">
          <Section>
            <SectionTitle scale={SCALE} className="mb-6">
              Packaging Expertise
            </SectionTitle>
            <Lead scale={SCALE} className="mb-6">
              <strong className="text-foreground">Claude Skills</strong> (officially called{" "}
              <TextLink href={SKILLS_DOCS}>Agent Skills</TextLink>) are modular, filesystem-based capabilities that extend
              Claude&apos;s functionality. Unlike regular prompts, Skills are:
            </Lead>
            <FeatureGrid
              items={[
                { title: "Reusable", body: "Create once, use automatically across conversations" },
                { title: "Composable", body: "Multiple skills stack together; Claude identifies which are needed" },
                { title: "Portable", body: "Same format works across Claude.ai, Claude Code, and API" },
                { title: "Efficient", body: "Only loads what's needed via progressive disclosure" },
              ]}
            />
          </Section>

          <Section>
            <SectionTitle scale={SCALE} className="mb-8">
              Why Skills Matter
            </SectionTitle>
            <GlassCardGrid
              items={[
                {
                  icon: LayoutGridIcon,
                  title: "Composable",
                  body: "Skills stack together. Claude automatically identifies which skills are needed and coordinates their use for complex tasks.",
                },
                {
                  icon: PackageIcon,
                  title: "Portable",
                  body: "Skills use the same format everywhere. Build once, use across Claude.ai, Claude Code, Claude Agent SDK, and the API.",
                },
                {
                  icon: ZapPolygonIcon,
                  title: "Efficient",
                  body: "Progressive disclosure loads only what's needed. ~100 tokens for discovery, under 5k when activated.",
                },
                {
                  icon: SparklesIcon,
                  title: "Powerful",
                  body: "Skills can include executable code for tasks where traditional programming is more reliable than token generation.",
                },
              ]}
            />
          </Section>

          <Section>
            <SectionTitle scale={SCALE} className="mb-8">
              How Skills Work
            </SectionTitle>
            <Lead scale={SCALE} className="mb-8">
              Skills use a three-tier loading architecture that enables unlimited context without overwhelming
              Claude&apos;s context window:
            </Lead>
            <StepList
              items={[
                {
                  title: "Metadata (Always Loaded)",
                  body: "Name and description loaded at startup. ~100 tokens per skill. Claude knows what's available.",
                },
                {
                  title: "Instructions (When Triggered)",
                  body: "Full SKILL.md content loaded when task matches. Under 5k tokens. Procedural guidance.",
                },
                {
                  title: "Resources & Code (As Needed)",
                  body: "Additional files and scripts accessed only when referenced. Code executes and returns output only.",
                },
              ]}
            />
          </Section>

          <Section>
            <SectionTitle scale={SCALE} className="mb-8">
              Who Uses Claude Skills
            </SectionTitle>
            <AudienceGrid
              items={[
                {
                  icon: Building2Icon,
                  title: "Enterprise Organizations",
                  body: "Centralized skill management, brand guidelines, compliance workflows, org-wide distribution",
                },
                {
                  icon: CodeIcon,
                  title: "Developers",
                  body: "Build custom skills, access via Claude Code and API, programmatic skill management",
                },
                {
                  icon: TrendingUpIcon,
                  title: "Individual Professionals",
                  body: "Personal productivity with document skills, custom workflows, recurring task automation",
                },
                {
                  icon: GlobeIcon,
                  title: "Cross-Platform Users",
                  body: "Open standard (Dec 2025) means skills work on ChatGPT, Cursor, and other platforms",
                },
              ]}
            />
          </Section>

          <Section>
            <SectionTitle scale={SCALE} className="mb-8">
              Skills in Action
            </SectionTitle>
            <UseCaseList
              items={[
                {
                  icon: FileTextIcon,
                  title: "Document Generation",
                  body: "Create branded PowerPoint presentations, Excel reports with formulas, Word documents, and fill PDF forms programmatically.",
                },
                {
                  icon: Building2Icon,
                  title: "Enterprise Workflows",
                  body: "Internal communication templates, Jira/Trello task creation, brand guideline enforcement with Figma and Canva integrations.",
                },
                {
                  icon: CodeIcon,
                  title: "Developer Operations",
                  body: "Code review against organizational standards, MCP server generation, web application testing workflows, API documentation.",
                },
                {
                  icon: TrendingUpIcon,
                  title: "Personal Productivity",
                  body: "Custom data analysis pipelines, recurring report generation, task automation with personal preferences and styles.",
                },
              ]}
            />
          </Section>

          <Section>
            <SectionTitle scale={SCALE} className="mb-8">
              Pre-Built Skills
            </SectionTitle>
            <p className="mb-6 text-muted-foreground">Anthropic provides official skills for common document tasks:</p>
            <ChipList items={["Excel", "PowerPoint", "Word", "PDF", "CSV"]} />
            <p className="mb-6 text-muted-foreground">
              Partner-built skills from Atlassian, Canva, Notion, Figma, Cloudflare, Stripe, and Zapier are also available.
            </p>
            <ArrowLink link={{ label: "Browse all Skills", href: "/tools/skills" }} icon={ChevronRightIcon} />
          </Section>

          <Section>
            <SectionTitle scale={SCALE} className="mb-8">
              Skills vs MCP Servers
            </SectionTitle>
            <ComparisonCard
              columns={[
                {
                  icon: LayersPolygonIcon,
                  title: "Claude Skills",
                  body: (
                    <>
                      <strong>Teach Claude how to do things.</strong> Skills extend capabilities through instructions and
                      scripts that Claude loads when needed. They package expertise, workflows, and best practices.
                    </>
                  ),
                },
                {
                  icon: CpuIcon,
                  title: "MCP Servers",
                  body: (
                    <>
                      <strong>Connect Claude to things.</strong> MCP servers are standalone protocol implementations that
                      connect Claude to external tools, services, and data sources like databases, APIs, and file systems.
                    </>
                  ),
                },
              ]}
              footer={
                <>
                  <strong>They work together:</strong> Use MCP servers to connect to data sources, and Skills to teach
                  Claude how to work with that data effectively.
                </>
              }
            />
          </Section>

          <CtaSection
            prompt="Ready to explore pre-built Skills?"
            primary={{ label: "Browse Skills", href: "/tools/skills" }}
            secondary={[{ label: "How to Install", href: "/tools/skills/how-to-install" }]}
          />
        </ExplainerContent>
      </div>
    </main>
  );
}
