import type { Metadata } from "next";
import { HubFaq } from "@/components/sites/mcpmarket-com-1a9fdbee/hub-2382ac74/HubFaq";
import {
  CheckList,
  FeatureSplit,
  HubCta,
  HubHero,
  HubSection,
  IconList,
  PricingSection,
  SectionIntro,
} from "@/components/sites/mcpmarket-com-1a9fdbee/hub-2382ac74/HubSections";
import {
  INSTALL_CHECKS,
  MCP_CHECKS,
  MEMBER_CHECKS,
  OBSERVABILITY_CHECKS,
  SKILLS_CHECKS,
  STACK_ITEMS,
  TOOLKIT_CHECKS,
  USE_CASE_ITEMS,
} from "@/components/sites/mcpmarket-com-1a9fdbee/hub-2382ac74/hub-data";
import {
  InstallMockup,
  McpMockup,
  MembersMockup,
  SkillMockup,
  ToolkitMockup,
  UsageMockup,
} from "@/components/sites/mcpmarket-com-1a9fdbee/hub-2382ac74/Mockups";

export const metadata: Metadata = {
  title: "MCP Market Hub | Version Control for Agent Skills & MCPs",
  description:
    "Manage and version control the agent skills and MCPs your AI agents use, and sync them across your team — all in MCP Market Hub.",
};

export default function HubPage() {
  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
        <HubHero />
        <HubSection muted>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <SectionIntro
              narrow
              title="Manage your agent stack end to end."
              body="MCP Market Hub turns agent skills and MCP tools into managed, reusable infrastructure."
            />
            <IconList items={STACK_ITEMS} />
          </div>
        </HubSection>
        <HubSection id="skills" topLine>
          <FeatureSplit
            intro={
              <>
                <SectionIntro
                  eyebrow="AI Agent Skills"
                  title="Version control for AI Agent Skills."
                  body="Stop treating agent skills like loose prompt files. Hub gives individuals and teams a structured home to create, version, publish, and sync the skills their agents depend on."
                />
                <CheckList items={SKILLS_CHECKS} />
              </>
            }
            mockup={<SkillMockup />}
          />
        </HubSection>
        <HubSection id="mcp" topLine muted>
          <FeatureSplit
            reversed
            intro={
              <>
                <SectionIntro
                  eyebrow="MCP Tools"
                  title="Connect the tools your agents need."
                  body="Hub connects your agents to real tools. Browse the catalog, install open-source MCPs from the directory, or deploy your own servers."
                />
                <CheckList items={MCP_CHECKS} />
              </>
            }
            mockup={<McpMockup />}
          />
        </HubSection>
        <HubSection topLine>
          <FeatureSplit
            intro={
              <>
                <SectionIntro
                  eyebrow="Toolkits"
                  title="Bundle skills and tools into controlled toolkits."
                  body="Group tools from multiple MCPs and your managed skills into one toolkit. Share it through a single plugin, and decide who gets access."
                />
                <CheckList items={TOOLKIT_CHECKS} />
              </>
            }
            mockup={<ToolkitMockup />}
          />
        </HubSection>
        <HubSection muted>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <SectionIntro
              eyebrow="Use Cases"
              title="One home for every agent skill workflow."
              body="Keep individual builders fast while giving teams one trusted place to manage the skills, tools, and workflows their agents run."
            />
            <IconList items={USE_CASE_ITEMS} />
          </div>
        </HubSection>
        <HubSection>
          <FeatureSplit
            columns="wider"
            intro={
              <>
                <SectionIntro
                  eyebrow="Observability"
                  title="See what your agents are using."
                  body="Track tool-call volume, errors, and latency across your connected MCP infrastructure — so you know what's used, what's failing, and where workflows need attention."
                />
                <CheckList items={OBSERVABILITY_CHECKS} />
              </>
            }
            mockup={<UsageMockup />}
          />
        </HubSection>
        <HubSection topLine muted>
          <FeatureSplit
            reversed
            intro={
              <>
                <SectionIntro
                  eyebrow="Members & sharing"
                  title="Invite your team, share everything."
                  body="Add teammates, manage roles, and assign toolkits per person or org-wide. Everyone runs the same skills and tools — no copy-paste, no drift."
                />
                <CheckList items={MEMBER_CHECKS} />
              </>
            }
            mockup={<MembersMockup />}
          />
        </HubSection>
        <HubSection topLine>
          <FeatureSplit
            intro={
              <>
                <SectionIntro
                  eyebrow="Install"
                  title="One command, every client."
                  body="Pick a client, paste one command. The plugin installs your toolkit — skills and tools — and keeps it synced as you ship updates."
                />
                <CheckList items={INSTALL_CHECKS} />
              </>
            }
            mockup={<InstallMockup />}
          />
        </HubSection>
        <PricingSection />
        <HubFaq />
        <HubCta />
      </div>
    </main>
  );
}
