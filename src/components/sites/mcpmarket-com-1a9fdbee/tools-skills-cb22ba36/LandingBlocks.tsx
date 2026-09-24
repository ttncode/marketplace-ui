import Link from "next/link";
import {
  ArrowRight,
  CodeXml,
  Database,
  Download,
  Layers,
  PenTool,
  Server,
  Sparkles,
  Star,
  Terminal,
  Users,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toSiteHref } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/links";
import { CATEGORY_STATS, TOP_SKILLS } from "./skills-landing-data";
import type { CategoryIconName } from "./types";
import { BRAND_FAVICONS } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/icons";


const CATEGORY_ICONS: Record<CategoryIconName, LucideIcon> = {
  star: Star,
  layers: Layers,
  database: Database,
  code: CodeXml,
  penTool: PenTool,
  users: Users,
  terminal: Terminal,
};

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {CATEGORY_STATS.map((category) => {
        const Icon = CATEGORY_ICONS[category.icon];
        return (
          <Link
            key={category.href}
            href={category.href}
            className="group flex flex-col rounded-[12px] border border-[#dbdbdb] bg-white p-5 transition-colors duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-[rgba(10,10,10,0.2)] hover:bg-[rgba(242,242,242,0.5)]"
          >
            <div className="mb-4 flex items-center gap-2.5">
              <Icon
                aria-hidden
                strokeWidth={1.75}
                className="size-4 shrink-0 text-[#616161] transition-colors duration-150 group-hover:text-[#0a0a0a]"
              />
              <span className="line-clamp-1 font-sans text-sm leading-5 font-semibold text-[#0a0a0a]">{category.name}</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-2xl leading-8 tracking-[-0.025em] text-[#0a0a0a]">{category.count}</span>
              <span className="font-sans text-xs leading-4 text-[#616161]">skills</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export function TopSkillsList() {
  return (
    <div className="overflow-hidden rounded-[12px] border border-[#dbdbdb] bg-white">
      {TOP_SKILLS.map((skill, index) => (
        <Link
          key={skill.href}
          href={skill.href}
          className={cn(
            "group flex items-center gap-4 px-4 py-3.5 transition-colors duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[rgba(242,242,242,0.5)] md:px-5",
            index < TOP_SKILLS.length - 1 && "border-b border-[#dbdbdb]",
          )}
        >
          <span className="w-6 shrink-0 font-mono text-sm leading-5 text-[rgba(97,97,97,0.7)] tabular-nums">{skill.rank}</span>
          <span className="relative inline-flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-[rgba(10,10,10,0.7)] to-[rgba(10,10,10,0.3)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={skill.avatar.src}
              alt={skill.avatar.alt}
              width={24}
              height={24}
              loading="lazy"
              className="size-full rounded-full object-cover opacity-70 grayscale transition-all duration-200 group-hover:opacity-100 group-hover:grayscale-0"
            />
          </span>
          <h3 className="line-clamp-1 flex-1 font-display text-sm leading-5 font-normal tracking-[-0.035em] text-[#0a0a0a] transition-colors duration-150 group-hover:text-[rgba(10,10,10,0.8)] md:text-base md:leading-6">
            {skill.title}
          </h3>
          <span className="hidden shrink-0 items-center rounded-[12px] border border-[#dbdbdb] px-1.5 font-sans text-[10px] leading-[15px] font-medium tracking-[0.05em] text-[#616161] uppercase sm:inline-flex">
            {skill.category}
          </span>
          <span className="flex w-16 shrink-0 items-center justify-end font-mono text-xs leading-4 text-[#616161]">
            <Star aria-hidden strokeWidth={2} className="mr-1 size-3 fill-[rgba(97,97,97,0.3)] text-[#616161]" />
            {skill.count}
          </span>
        </Link>
      ))}
    </div>
  );
}

const HUB_TARGETS = [
  { label: "Claude", favicon: BRAND_FAVICONS.Claude },
  { label: "Codex", favicon: BRAND_FAVICONS.Codex },
  { label: "Openclaw", favicon: null },
] as const;

function HubPreview() {
  return (
    <div className="overflow-hidden rounded-[8px] border border-[rgba(10,10,10,0.14)] bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-[rgba(10,10,10,0.14)] p-4">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-[6px] border border-[rgba(10,10,10,0.14)] bg-[#f5f5f5] text-[#0a0a0a]">
            <Sparkles aria-hidden strokeWidth={2} className="size-4" />
          </span>
          <span className="font-mono text-[12px] leading-[18px] font-semibold text-[#0a0a0a]">pr-review</span>
          <span className="inline-flex items-center gap-1 rounded-[3px] border border-[#444444] bg-[#f5f5f5] px-[9px] py-[2px] font-mono text-[10.5px] leading-[15.75px] font-medium tracking-[0.04em] whitespace-nowrap text-[#444444] uppercase">
            Synced
          </span>
        </div>
        <span className="inline-flex h-[26px] shrink-0 items-center justify-center gap-1.5 rounded-[5px] bg-[#0a0a0a] px-2.5 text-[12px] leading-[18px] font-medium whitespace-nowrap text-[#fbfbfb] transition-colors duration-150 hover:bg-[#444444]">
          <Download aria-hidden strokeWidth={2} className="size-3.5" />
          Download
        </span>
      </div>
      <div className="p-4">
        <div className="mb-2 font-mono text-[10.5px] leading-[15.75px] font-medium tracking-[0.1em] text-[#626262] uppercase">
          Sync with the MCP Market Hub plugin
        </div>
        <div className="flex flex-col gap-2">
          {HUB_TARGETS.map((target) => (
            <div
              key={target.label}
              className="flex items-center justify-between gap-3 rounded-[6px] border border-[rgba(10,10,10,0.14)] bg-[#fbfbfb] px-3 py-2"
            >
              <span className="inline-flex items-center gap-2 text-[12.5px] leading-[18.75px] text-[#444444]">
                {target.favicon ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={target.favicon} alt={target.label} width={16} height={16} className="size-4 shrink-0 rounded-[3px]" />
                ) : (
                  <span className="grid size-4 shrink-0 place-items-center rounded-[4px] border border-[rgba(10,10,10,0.14)] bg-[#fbfbfb] text-[#626262]">
                    <Server aria-hidden strokeWidth={2} className="size-3" />
                  </span>
                )}
                {target.label}
              </span>
              <span className="inline-flex items-center gap-2 text-[12.5px] leading-[18.75px] font-medium text-[#0a0a0a]">
                <span className="size-1.5 rounded-full bg-[#444444] shadow-[0_0_0_3px_rgba(68,68,68,0.22)]" />
                Synced
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HubPromo() {
  return (
    <div className="overflow-hidden rounded-[12px] border border-[#dbdbdb] bg-white p-6 md:p-10 lg:p-12">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <div className="relative">
            <p className="mb-4 font-sans text-sm leading-5 font-medium tracking-[0.05em] text-[#616161] uppercase">MCP Market Hub</p>
            <h2 className="font-display text-[30px] leading-9 font-normal tracking-[-0.025em] text-[#0a0a0a] md:text-[36px] md:leading-10">
              Manage All Your Skills in One Place
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-[1.625] text-[#616161]">
              Install, update, and sync Agent Skills across Claude, Cursor, and Codex — keep every environment in sync from a
              single dashboard.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/hub"
              className="inline-flex h-12 w-fit items-stretch rounded-[12px] border border-black/10 bg-linear-to-b from-black/70 to-black p-px font-sans font-normal transition duration-300 ease-in-out focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:transition-none"
            >
              <span className="flex h-full w-full items-center justify-center gap-2 rounded-[10px] bg-linear-to-b from-[#262626] to-black px-4 py-2 font-sans text-base font-normal tracking-[-0.01em] whitespace-nowrap text-white/90 transition-[background-image,color] duration-200 ease-out hover:from-[#292524] hover:to-[#262626]/70 active:from-black active:to-black motion-reduce:transition-none">
                Learn More
                <ArrowRight aria-hidden strokeWidth={1.5} className="ml-2 size-4" />
              </span>
            </Link>
            <Link
              href={toSiteHref("https://app.mcpmarket.com/signup")}
              className="inline-flex h-12 items-center justify-center rounded-[12px] border border-transparent px-8 font-sans text-sm leading-5 font-normal tracking-[-0.01em] whitespace-nowrap text-[#616161] transition-[background-color,border-color,color,box-shadow,transform,translate,scale,rotate] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[#f2f2f2] hover:text-[#0a0a0a]"
            >
              Get Started
            </Link>
          </div>
        </div>
        {/* Plain wrapper: the panel clips (overflow-hidden), which would otherwise let the grid track shrink below its content. */}
        <div>
          <HubPreview />
        </div>
      </div>
    </div>
  );
}

const RESOURCE_LINKS = [
  { title: "What Are Skills?", description: "Learn how Skills extend Claude", href: "/tools/skills/what-are-skills", icon: Layers },
  { title: "How to Install", description: "Step-by-step installation guides", href: "/tools/skills/how-to-install", icon: Download },
  { title: "MCP Servers", description: "Browse the server directory", href: "/", icon: Server },
] as const;

export function ResourceLinks() {
  return (
    <section className="border-b border-[rgba(10,10,10,0.14)] bg-[#fbfbfb] py-8 font-sans text-[16px] leading-6 text-[#0a0a0a] md:py-12">
      <div className="mx-auto max-w-[1024px] px-6 md:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {RESOURCE_LINKS.map(({ title, description, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col items-center rounded-[12px] p-6 text-center transition-colors duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[rgba(245,245,245,0.5)]"
            >
              <div className="mb-4 flex size-10 items-center justify-center rounded-[12px] bg-[#f5f5f5] text-[#616161]">
                <Icon aria-hidden strokeWidth={1.5} className="size-5" />
              </div>
              <h3 className="mb-1 font-display text-sm leading-5 font-medium tracking-[-0.035em] text-[#0a0a0a]">{title}</h3>
              <p className="text-xs leading-4 text-[#616161]">{description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
