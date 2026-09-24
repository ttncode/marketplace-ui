import {
  ArrowLink,
  AudienceGrid,
  CtaSection,
  ExplainerContent,
  FeatureGrid,
  GlassCardGrid,
  InlineCode,
  Lead,
  Section,
  SectionTitle,
  StepList,
  TextLink,
  UseCaseList,
} from "@/components/sites/mcpmarket-com-1a9fdbee/what-is-an-mcp-server-4bf875ce/ExplainerBlocks";
import { ExplainerHero } from "@/components/sites/mcpmarket-com-1a9fdbee/what-is-an-mcp-server-4bf875ce/ExplainerHero";
import {
  CheckSquareIcon,
  ChevronRightIcon,
  CodeIcon,
  CpuIcon,
  DevicesIcon,
  GitPullRequestIcon,
  GlobeIcon,
  LayersPolygonIcon,
  LockIcon,
  PaintbrushIcon,
  ShoppingBagIcon,
  ZapPolygonIcon,
} from "@/components/sites/mcpmarket-com-1a9fdbee/what-is-an-mcp-server-4bf875ce/icons";
import type { ExplainerScale } from "@/components/sites/mcpmarket-com-1a9fdbee/what-is-an-mcp-server-4bf875ce/types";
import { CodeBlock } from "./CodeBlock";
import { FaqAccordion } from "./FaqAccordion";
import { WebMcpExamples } from "./WebMcpExamples";
import { COMPARISON_ROWS, REGISTER_TOOL_SNIPPET, WEBMCP_FAQ } from "./webmcp-data";

const SCALE: ExplainerScale = "md";
const SPEC_REPO = "https://github.com/webmachinelearning/webmcp";

function ComparisonTable() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-none">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <caption className="sr-only">Comparison of MCP servers and WebMCP</caption>
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th scope="col" className="w-1/5 px-5 py-4 text-sm font-medium text-muted-foreground">
                Aspect
              </th>
              <th scope="col" className="w-2/5 px-5 py-4 text-foreground">
                <span className="flex items-center gap-2 font-semibold">
                  <CpuIcon className="h-5 w-5" />
                  MCP server
                </span>
              </th>
              <th scope="col" className="w-2/5 px-5 py-4 text-foreground">
                <span className="flex items-center gap-2 font-semibold">
                  <GlobeIcon className="h-5 w-5" />
                  WebMCP
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row) => (
              <tr key={row.aspect} className="border-b border-border last:border-b-0">
                <th scope="row" className="px-5 py-4 align-top text-sm font-medium text-foreground">
                  {row.aspect}
                </th>
                <td className="px-5 py-4 align-top text-sm leading-relaxed text-muted-foreground">{row.mcp}</td>
                <td className="px-5 py-4 align-top text-sm leading-relaxed text-muted-foreground">{row.webmcp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-border px-5 py-5">
        <p className="text-sm leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Use them together.</strong> An MCP server can handle durable backend
          access while WebMCP updates the page, preserves visible context, and hands consequential steps back to the
          user.
        </p>
      </div>
    </div>
  );
}

export function WhatIsWebMcp() {
  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen flex-col bg-[var(--design-canvas)]">
        <ExplainerHero
          minHeightClass="min-h-[500px] md:min-h-[530px]"
          hero={{
            crumbs: [],
            current: "What is WebMCP",
            title: "What is ",
            mutedTitle: "WebMCP?",
            description:
              "WebMCP is an emerging web standard that lets websites expose their own functionality as tools AI agents can discover and call directly in the browser - no separate backend server required, and the interface stays visible to the user.",
            actions: {
              primary: { label: "Browse MCP Servers", href: "/server" },
              secondary: { label: "Read the Spec", href: SPEC_REPO },
            },
          }}
        />
        <ExplainerContent className="flex-1">
          <Section>
            <SectionTitle scale={SCALE} className="mb-6">
              Tools, Built Into the Web
            </SectionTitle>
            <Lead scale={SCALE} className="mb-6">
              <strong className="text-foreground">WebMCP</strong> is a proposed web standard, incubated by the{" "}
              <TextLink href={SPEC_REPO}>W3C Web Machine Learning Community Group</TextLink>, that gives websites a
              native way to tell AI agents what they can do. Instead of an agent guessing its way through a page&apos;s
              UI, the page itself registers tools the agent can call. WebMCP is:
            </Lead>
            <FeatureGrid
              items={[
                {
                  title: "In-Browser",
                  body: "Tools run in the page's own JavaScript context - no separate server to host",
                },
                { title: "User-in-the-Loop", body: "The agent and the person see the same UI update in real time" },
                {
                  title: "Origin-Scoped",
                  body: "Tools are scoped to the page that registers them, with explicit opt-in for cross-origin access",
                },
                {
                  title: "Complementary to MCP",
                  body: "Designed to work alongside backend MCP servers, not replace them",
                },
              ]}
            />
          </Section>

          <Section>
            <SectionTitle scale={SCALE} className="mb-8">
              Why WebMCP Matters
            </SectionTitle>
            <GlassCardGrid
              items={[
                {
                  icon: GlobeIcon,
                  title: "Shared Context",
                  body: "The agent and the user see identical UI updates simultaneously, so nothing happens off-screen or out of sight.",
                },
                {
                  icon: ZapPolygonIcon,
                  title: "No Separate Backend",
                  body: "Reuse the authentication, session state, and business logic your frontend already has instead of standing up a new integration server.",
                },
                {
                  icon: LockIcon,
                  title: "Secure by Origin",
                  body: "Tools are scoped to the page's origin and disabled by default in cross-origin iframes unless explicitly permitted.",
                },
                {
                  icon: LayersPolygonIcon,
                  title: "Shares MCP's Vocabulary",
                  body: "Tools, schemas, and inputs follow the same concepts as MCP, so existing knowledge and tooling largely transfer.",
                },
              ]}
            />
          </Section>

          <Section>
            <SectionTitle scale={SCALE} className="mb-8">
              How WebMCP Works
            </SectionTitle>
            <Lead scale={SCALE} className="mb-8">
              WebMCP centers on a single browser API, <InlineCode>document.modelContext</InlineCode>, that pages use to
              register tools and agents use to find and call them:
            </Lead>
            <StepList
              items={[
                {
                  title: "Registration",
                  body: (
                    <>
                      A page calls <InlineCode>registerTool()</InlineCode> to expose a JavaScript function as a tool, with
                      a name, a natural-language description, and a JSON Schema describing its inputs.
                    </>
                  ),
                },
                {
                  title: "Discovery",
                  body: (
                    <>
                      An AI agent calls <InlineCode>getTools()</InlineCode> to see what&apos;s available on the current
                      page, including tools exposed from trusted cross-origin frames.
                    </>
                  ),
                },
                {
                  title: "Execution",
                  body: (
                    <>
                      The agent calls <InlineCode>executeTool()</InlineCode> with structured arguments. The browser runs
                      the tool&apos;s callback in the page&apos;s own context and returns a structured result.
                    </>
                  ),
                },
              ]}
            />
          </Section>

          <Section>
            <SectionTitle scale={SCALE} className="mb-6">
              A Tool, in a Few Lines of Code
            </SectionTitle>
            <Lead scale={SCALE} className="mb-6">
              Here&apos;s a minimal example of a page registering a tool that adds an item to a todo list:
            </Lead>
            <CodeBlock filename="app.js" code={REGISTER_TOOL_SNIPPET} />
          </Section>

          <WebMcpExamples />

          <Section>
            <SectionTitle scale={SCALE} className="mb-8">
              Who Uses WebMCP
            </SectionTitle>
            <AudienceGrid
              items={[
                {
                  icon: CodeIcon,
                  title: "Web Developers",
                  body: "Expose existing app functionality to agents without building a separate backend integration",
                },
                {
                  icon: CpuIcon,
                  title: "AI Agent Builders",
                  body: "Give agents a reliable, structured way to act on web pages instead of scraping the DOM",
                },
                {
                  icon: ShoppingBagIcon,
                  title: "E-Commerce & SaaS Teams",
                  body: "Let agents filter, configure, and complete tasks inside the product's real UI",
                },
                {
                  icon: DevicesIcon,
                  title: "Browser Vendors",
                  body: "Standardize a safe, permissioned surface for agentic browsing across the web platform",
                },
              ]}
            />
          </Section>

          <Section>
            <SectionTitle scale={SCALE} className="mb-8">
              WebMCP in Action
            </SectionTitle>
            <UseCaseList
              items={[
                {
                  icon: PaintbrushIcon,
                  title: "Design Collaboration",
                  body: "A design tool lets users describe template changes in natural language. WebMCP tools filter templates and apply edits while the user watches the same canvas update.",
                },
                {
                  icon: ShoppingBagIcon,
                  title: "E-Commerce Filtering",
                  body: "Storefronts expose tools that return structured product data and update the page directly, so an agent can filter inventory - even by an uploaded photo - instantly.",
                },
                {
                  icon: GitPullRequestIcon,
                  title: "Developer Platforms",
                  body: "Code review tools expose tools like get-status and get-failure-snippet, so agents can summarize CI failures without parsing raw infrastructure logs.",
                },
                {
                  icon: CheckSquareIcon,
                  title: "Productivity Apps",
                  body: "Todo, note-taking, and project tools expose simple add and complete tools agents can call directly instead of clicking through forms.",
                },
              ]}
            />
          </Section>

          <Section containerClassName="max-w-5xl">
            <SectionTitle scale={SCALE} className="mb-3">
              WebMCP vs. MCP
            </SectionTitle>
            <Lead scale={SCALE} className="mb-8 max-w-4xl">
              Both give agents structured tools, but they operate at different layers. MCP connects an AI application to
              a standalone service; WebMCP lets an agent work with the web page the user already has open.
            </Lead>
            <ComparisonTable />
          </Section>

          <Section>
            <SectionTitle scale={SCALE} className="mb-8">
              Where WebMCP Stands Today
            </SectionTitle>
            <p className="mb-6 text-muted-foreground">
              WebMCP remains an evolving proposal with experimental implementations and browser trials rather than
              universal browser support. Its explainer and draft specification were first published in August 2025 by
              contributors from Microsoft, Google, and the web standards community, incubated within the W3C Web Machine
              Learning Community Group.
            </p>
            <p className="mb-6 text-muted-foreground">
              The API surface - <InlineCode>document.modelContext</InlineCode>, <InlineCode>registerTool()</InlineCode>,{" "}
              <InlineCode>getTools()</InlineCode>, and <InlineCode>executeTool()</InlineCode> - is still evolving through
              public discussion, with open questions around multimodal inputs, streaming results, and long-running tasks.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              <ArrowLink link={{ label: "Follow the spec on GitHub", href: SPEC_REPO }} icon={ChevronRightIcon} />
              <ArrowLink
                link={{
                  label: "Check implementation status",
                  href: "https://github.com/webmachinelearning/webmcp/blob/main/implementation-status.md",
                }}
                icon={ChevronRightIcon}
              />
            </div>
            <div className="mt-10 rounded-lg border border-border bg-card p-6">
              <h3 className="mb-2 text-lg font-medium text-foreground">From prototype to web proposal</h3>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                Jason McGhee&apos;s original open-source WebMCP project and webmcp.dev demo used a localhost WebSocket
                bridge and registration tokens to prove that pages could expose MCP-style capabilities. The maintainer now
                identifies it as an early, non-compliant implementation and directs new work to the W3C proposal.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
                <TextLink href="https://github.com/jasonjmcghee/WebMCP">View the original prototype</TextLink>
                <TextLink href="https://webmcp.dev/">Open the webmcp.dev demo</TextLink>
              </div>
            </div>
          </Section>

          <Section className="border-b border-border bg-[var(--design-surface-subtle)]">
            <SectionTitle scale={SCALE} className="mb-6 font-medium tracking-[-0.03em] md:mb-8">
              WebMCP FAQ
            </SectionTitle>
            <FaqAccordion items={WEBMCP_FAQ} />
          </Section>

          <CtaSection
            prompt="Curious how this fits with the rest of the MCP ecosystem?"
            primary={{ label: "Browse MCP Servers", href: "/server" }}
            secondary={[{ label: "What is an MCP Server?", href: "/what-is-an-mcp-server" }]}
          />
        </ExplainerContent>
      </div>
    </main>
  );
}
