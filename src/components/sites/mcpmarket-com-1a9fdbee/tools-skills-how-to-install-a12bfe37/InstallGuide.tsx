import Link from "next/link";
import { toSiteHref } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/links";
import {
  PRIMARY_FACE,
  PRIMARY_SHELL,
  SECONDARY_FACE,
  SECONDARY_SHELL,
} from "@/components/sites/mcpmarket-com-1a9fdbee/tools-skills-slug-229a0ca0/texture-button";
import {
  ExplainerContent,
  PrimaryButton,
} from "@/components/sites/mcpmarket-com-1a9fdbee/what-is-an-mcp-server-4bf875ce/ExplainerBlocks";
import { ExplainerHero } from "@/components/sites/mcpmarket-com-1a9fdbee/what-is-an-mcp-server-4bf875ce/ExplainerHero";
import { ArrowRightIcon, CheckIcon } from "@/components/sites/mcpmarket-com-1a9fdbee/what-is-an-mcp-server-4bf875ce/icons";
import { cn } from "@/lib/utils";
import { COMPARISON_ROWS, PLATFORMS, type ComparisonCell, type PlatformCard } from "./install-data";

// Tailwind v3 emerald, which the source uses (v4's emerald is a different oklch colour).
const EMERALD_400 = "text-[#34d399]";
const EMERALD_500 = "text-[#10b981]";

const SECTION_TITLE = "mb-10 text-center text-xl font-semibold tracking-tight text-foreground md:text-2xl";

function PlatformCardView({ platform }: { readonly platform: PlatformCard }) {
  const { featured, icon: Icon } = platform;
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-lg p-8 transition-all duration-200",
        featured
          ? "bg-primary text-primary-foreground shadow-none hover:-translate-y-1"
          : "border border-border bg-card hover:-translate-y-0.5",
      )}
    >
      <span
        className={cn(
          "absolute rounded-lg text-xs font-medium",
          featured
            ? "-top-3 left-6 bg-[#10b981] px-3 py-1 text-primary-foreground"
            : "top-4 right-4 bg-muted px-2.5 py-1 text-muted-foreground",
        )}
      >
        {platform.badge}
      </span>
      <div
        className={cn(
          "mb-6 flex h-14 w-14 items-center justify-center rounded-lg",
          featured ? "bg-card/10 text-primary-foreground" : "bg-muted text-foreground",
        )}
      >
        <Icon className="h-8 w-8" />
      </div>
      {/* The explainer typography module paints this heading ink even on the dark card, as on the source. */}
      <h3 className="mb-3 text-2xl font-semibold">{platform.name}</h3>
      <p className={cn("mb-6 leading-relaxed", !featured && "text-muted-foreground")}>{platform.description}</p>
      <ul className="mb-8 flex-1 space-y-2">
        {platform.features.map((feature) => (
          <li key={feature} className={cn("flex items-start gap-2", !featured && "text-muted-foreground")}>
            <CheckIcon className={cn("mt-0.5 h-5 w-5 shrink-0", featured ? EMERALD_400 : EMERALD_500)} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        href={toSiteHref(platform.guide.href)}
        className={cn(
          PRIMARY_SHELL,
          "transition-all duration-300",
          featured
            ? "bg-card text-foreground hover:bg-card/90"
            : "bg-primary text-primary-foreground hover:bg-primary/90",
        )}
      >
        <span className={cn(PRIMARY_FACE, "text-sm")}>
          <span className="flex items-center justify-center gap-2">
            {platform.guide.label}
            <ArrowRightIcon className="h-5 w-5" />
          </span>
        </span>
      </Link>
    </div>
  );
}

function CellValue({ cell }: { readonly cell: ComparisonCell }) {
  if (!cell.check) return cell.text;
  return (
    <span className="inline-flex items-center gap-1">
      <CheckIcon className={cn("h-4 w-4", EMERALD_500)} />
      {cell.text}
    </span>
  );
}

function ComparisonTable() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="bg-muted">
              <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Feature</th>
              <th className="bg-primary px-6 py-4 text-center text-sm font-medium text-primary-foreground">
                Claude.ai
                <span className="block text-xs font-normal">Easiest</span>
              </th>
              <th className="px-6 py-4 text-center text-sm font-medium text-foreground">Claude Code</th>
              <th className="px-6 py-4 text-center text-sm font-medium text-foreground">Claude API</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {COMPARISON_ROWS.map((row) => (
              <tr key={row.feature}>
                <td className="px-6 py-4 text-sm text-muted-foreground">{row.feature}</td>
                {row.cells.map((cell, index) => (
                  <td
                    key={`${row.feature}-${index}`}
                    className={cn(
                      "px-6 py-4 text-center text-sm",
                      index === 0 && "bg-background",
                      cell.muted ? "text-muted-foreground" : "text-foreground",
                      cell.medium && "font-medium",
                    )}
                  >
                    <CellValue cell={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function InstallGuide() {
  return (
    <main className="min-h-screen">
      <ExplainerContent className="flex min-h-screen flex-col">
        <ExplainerHero
          minHeightClass="min-h-[360px] md:min-h-[390px]"
          hero={{
            crumbs: [{ label: "Skills", href: "/tools/skills" }],
            current: "Install",
            title: "How to Install ",
            mutedTitle: "Agent Skills",
            description: "Choose your platform and follow the step-by-step guide to start using Skills.",
          }}
        />
        <section className="py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <h2 className={SECTION_TITLE}>Choose Your Platform</h2>
            <div className="grid grid-cols-1 gap-8 pt-4 md:grid-cols-2 lg:grid-cols-3">
              {PLATFORMS.map((platform) => (
                <PlatformCardView key={platform.name} platform={platform} />
              ))}
            </div>
          </div>
        </section>
        <section className="border-t border-border py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <h2 className={SECTION_TITLE}>Platform Comparison</h2>
            <ComparisonTable />
          </div>
        </section>
        <section className="border-t border-border py-12 md:py-20">
          <div className="mx-auto max-w-4xl px-6 md:px-8">
            <div className="rounded-lg border border-border bg-card p-8 text-center md:p-12">
              <h3 className="mb-2 text-xl font-semibold text-foreground">Ready to get started?</h3>
              <p className="mb-6 text-muted-foreground">
                Browse our directory to find Skills for your workflow, or learn more about what Skills can do.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <PrimaryButton link={{ label: "Browse Skills", href: "/tools/skills" }} />
                <Link href="/tools/skills/what-are-skills" className={cn(SECONDARY_SHELL, "w-fit")}>
                  <span className={cn(SECONDARY_FACE, "text-base")}>What Are Skills?</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ExplainerContent>
    </main>
  );
}
