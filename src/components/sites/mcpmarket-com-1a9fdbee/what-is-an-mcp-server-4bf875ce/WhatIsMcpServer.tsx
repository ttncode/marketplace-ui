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
} from "./ExplainerBlocks";
import { ExplainerHero } from "./ExplainerHero";
import {
  AiHeadIcon,
  ArrowRightChevronIcon,
  BriefcaseIcon,
  BuildingIcon,
  CalendarGridIcon,
  CodeIcon,
  CpuFrameIcon,
  DatabaseIcon,
  FlameIcon,
  GlobeIcon,
  LayersIcon,
  LockIcon,
  ZapIcon,
} from "./icons";
import type { ExplainerScale } from "./types";

const SCALE: ExplainerScale = "lg";
const MCP_DOCS = "https://modelcontextprotocol.io/introduction";

export function WhatIsMcpServer() {
  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen flex-col bg-[var(--design-canvas)]">
        <ExplainerHero
          minHeightClass="min-h-[500px] md:min-h-[530px]"
          hero={{
            crumbs: [{ label: "MCP Servers", href: "/server" }],
            current: "What is an MCP Server",
            title: "What is an ",
            mutedTitle: "MCP Server?",
            description:
              "MCP servers bridge the gap between powerful AI models and your valuable data, enabling AI applications to seamlessly access and work with your information.",
            actions: {
              primary: { label: "Browse MCP Servers", href: "/server" },
              secondary: { label: "Official Docs", href: MCP_DOCS },
            },
          }}
        />
        <ExplainerContent className="flex-1">
          <Section>
            <SectionTitle scale={SCALE} className="mb-6">
              The Universal Connector for AI
            </SectionTitle>
            <Lead scale={SCALE} className="mb-6">
              An <strong className="text-foreground">MCP Server</strong> (
              <TextLink href={MCP_DOCS}>Model Context Protocol</TextLink> Server) acts as the critical link that connects AI applications to your data sources and tools. Think of it
              as a universal adapter:
            </Lead>
            <FeatureGrid
              items={[
                { title: "Standardized", body: "One protocol works across Claude, ChatGPT, Codex, and more" },
                { title: "Secure", body: "Control exactly what data AI can access with fine-grained permissions" },
                { title: "Extensible", body: "Connect to databases, APIs, file systems, and custom services" },
                { title: "Pre-built", body: "Hundreds of ready-to-use servers for popular services" },
              ]}
            />
          </Section>

          <Section>
            <SectionTitle scale={SCALE} className="mb-8">
              Why MCP Servers Matter
            </SectionTitle>
            <GlassCardGrid
              items={[
                {
                  icon: CpuFrameIcon,
                  title: "Simplified Integration",
                  body: "Connect AI to your tools and data with standardized protocols instead of building custom connections for each source.",
                },
                {
                  icon: AiHeadIcon,
                  title: "Enhanced Capabilities",
                  body: "Give your AI applications the context they need to provide more accurate, relevant, and personalized responses.",
                },
                {
                  icon: LockIcon,
                  title: "Secure Access",
                  body: "Control exactly what information your AI can access while maintaining data security and privacy.",
                },
                {
                  icon: ZapIcon,
                  title: "Faster Implementation",
                  body: "Deploy AI solutions in days rather than months with pre-built servers for popular services.",
                },
              ]}
            />
          </Section>

          <Section>
            <SectionTitle scale={SCALE} className="mb-8">
              How MCP Works
            </SectionTitle>
            <Lead scale={SCALE} className="mb-8">
              MCP uses a client-server architecture where AI applications act as clients connecting to MCP servers that
              expose tools, resources, and prompts:
            </Lead>
            <StepList
              items={[
                {
                  title: "Discovery",
                  body: "AI clients discover available MCP servers and their capabilities. Servers expose tools, resources, and prompts they can provide.",
                },
                {
                  title: "Connection",
                  body: "When a user request requires external data, the AI connects to the appropriate MCP server using the standardized protocol.",
                },
                {
                  title: "Execution",
                  body: "The server executes the requested operation and returns results. The AI incorporates this context into its response.",
                },
              ]}
            />
          </Section>

          <Section>
            <SectionTitle scale={SCALE} className="mb-8">
              Who Uses MCP Servers
            </SectionTitle>
            <AudienceGrid
              items={[
                {
                  icon: CodeIcon,
                  title: "Developers",
                  body: "Building AI-powered applications with simplified access to diverse data sources",
                },
                {
                  icon: BuildingIcon,
                  title: "Businesses",
                  body: "Enhancing customer service with AI chatbots that access company information",
                },
                {
                  icon: FlameIcon,
                  title: "Research Teams",
                  body: "Using AI to process and analyze data from multiple sources efficiently",
                },
                {
                  icon: BriefcaseIcon,
                  title: "IT Departments",
                  body: "Standardized ways to connect internal systems with AI tools securely",
                },
              ]}
            />
          </Section>

          <Section>
            <SectionTitle scale={SCALE} className="mb-8">
              MCP Servers in Action
            </SectionTitle>
            <UseCaseList
              items={[
                {
                  icon: CodeIcon,
                  title: "Development Environments",
                  body: "Connect AI assistants to your codebase for smarter code suggestions, bug detection, and automated documentation.",
                },
                {
                  icon: CalendarGridIcon,
                  title: "Business Tools Integration",
                  body: "Link your AI to Slack, Google Drive, or project management tools to automate workflows and answer questions instantly.",
                },
                {
                  icon: DatabaseIcon,
                  title: "Database Access",
                  body: "Enable AI to query databases directly, generating reports and providing data-driven insights without manual extraction.",
                },
                {
                  icon: GlobeIcon,
                  title: "Web Automation",
                  body: "Automate web tasks like form filling, data collection, or content updates through AI with web access capabilities.",
                },
              ]}
            />
          </Section>

          <Section>
            <SectionTitle scale={SCALE} className="mb-8">
              Pre-Built Servers
            </SectionTitle>
            <p className="mb-6 text-muted-foreground">MCP includes pre-built servers for popular services:</p>
            <ChipList
              items={["GitHub", "Slack", "Google Drive", "PostgreSQL", "Notion", "Filesystem", "Docker", "AWS", "Stripe"]}
            />
            <p className="mb-6 text-muted-foreground">
              The community has built hundreds more for specialized services and custom integrations.
            </p>
            <ArrowLink link={{ label: "Browse all MCP Servers", href: "/server" }} icon={ArrowRightChevronIcon} />
          </Section>

          <Section>
            <SectionTitle scale={SCALE} className="mb-8">
              MCP Servers vs Agent Skills
            </SectionTitle>
            <ComparisonCard
              columns={[
                {
                  icon: CpuFrameIcon,
                  title: "MCP Servers",
                  body: (
                    <>
                      <strong>Connect AI to things.</strong> MCP servers are standalone protocol implementations that
                      connect AI to external tools, services, and data sources like databases, APIs, and file systems.
                    </>
                  ),
                },
                {
                  icon: LayersIcon,
                  title: "Agent Skills",
                  body: (
                    <>
                      <strong>Teach AI how to do things.</strong> Skills extend capabilities through instructions and
                      scripts that AI loads when needed. They package expertise, workflows, and best practices.
                    </>
                  ),
                },
              ]}
              footer={
                <>
                  <strong>They work together:</strong> Use MCP servers to connect to data sources, and Skills to teach AI
                  how to work with that data effectively.
                </>
              }
            />
          </Section>

          <CtaSection
            prompt="Ready to connect AI to your data?"
            primary={{ label: "Browse MCP Servers", href: "/server" }}
            secondary={[
              { label: "Learn About Skills", href: "/tools/skills/what-are-skills" },
              { label: "What is WebMCP?", href: "/what-is-webmcp" },
            ]}
          />
        </ExplainerContent>
      </div>
    </main>
  );
}
