import type { ReactNode } from "react";
import {
  ArrowUpRight,
  Download,
  Lock,
  Search,
  Server,
  Share2,
  Sparkles,
  Star,
  TrendingUp,
  Wallet,
} from "lucide-react";
import s from "@/components/sites/mcpmarket-com-1a9fdbee/hub-2382ac74/AppSurface.module.css";
import { cn } from "@/lib/utils";
import { AGENTS, CATEGORIES, EARNINGS_ROWS, STORE_SKILLS, TRENDING } from "./sell-data";
import { BRAND_FAVICONS } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/icons";

// Static product mockups: the source renders their buttons and badges as inert spans.
// Its seller palette (mint, accent-brand, rose/butter) resolves to the same greys as the hub surface tokens.
const MONO = cn(s.mono, "leading-[1.5]");
const BADGE =
  "inline-flex items-center gap-1 whitespace-nowrap rounded-[3px] border px-[9px] py-[2px] font-mono text-[10.5px] font-medium tracking-[0.04em] [&_svg]:h-3 [&_svg]:w-3";
const BADGE_MINT = `${BADGE} uppercase border-[var(--text-2)] bg-[var(--bg-sunken)] text-[var(--text-2)]`;
const BADGE_BRAND = `${BADGE} border-[var(--text)] bg-[var(--bg-sunken)] text-[var(--text)]`;
const BADGE_MUTED = `${BADGE} border-[var(--border-strong)] bg-[var(--bg-sunken)] text-[var(--text-2)]`;

const BTN =
  "inline-flex h-[26px] shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-[5px] px-2.5 text-[12px] font-medium transition-colors [&_svg]:h-3.5 [&_svg]:w-3.5";
const BTN_OUTLINE = `${BTN} border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text)] hover:bg-[var(--bg-hover)]`;
const BTN_SOLID = `${BTN} bg-[var(--text)] text-[var(--bg-canvas)] hover:bg-[var(--text-2)]`;

const CARD = "overflow-hidden rounded-[8px] border border-[var(--border)] bg-[var(--bg-surface)]";
const ROW = "flex items-center justify-between gap-3 rounded-[6px] border border-[var(--border)] bg-[var(--bg-canvas)] px-3";
const STAT = "text-[20px] font-semibold tracking-[-0.02em] text-[var(--text)] tabular-nums";

function Surface({ children }: { readonly children: ReactNode }) {
  return <div className={s.surface}>{children}</div>;
}

function Status({ label }: { readonly label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-[12.5px] font-medium text-[var(--text)]">
      <span className={s.dot} />
      {label}
    </span>
  );
}

function SkillGlyph({ size }: { readonly size: "h-8 w-8" | "h-9 w-9" }) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-[6px] border border-[var(--border)] bg-[var(--bg-sunken)] text-[var(--text)]",
        size,
      )}
    >
      <Sparkles className="h-4 w-4" strokeWidth={2} />
    </span>
  );
}

const EARNINGS_STATS = [
  ["Revenue", "$2,480"],
  ["Sales", "142"],
  ["Next payout", "Fri"],
] as const;

export function EarningsMockup() {
  return (
    <Surface>
      <div className={CARD}>
        <div className="flex items-center justify-between border-b border-[var(--border)] p-4">
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-[var(--text)]" strokeWidth={2} />
            <span className={s.h2}>Earnings</span>
          </div>
          <span className={BADGE_MINT}>This month</span>
        </div>
        <div className="grid grid-cols-3 border-b border-[var(--border)]">
          {EARNINGS_STATS.map(([label, value], index) => (
            <div key={label} className={cn("p-4", index > 0 && "border-l border-[var(--border)]")}>
              <div className={s.eyebrow}>{label}</div>
              <div className="mt-1 text-[22px] font-semibold tracking-[-0.02em] text-[var(--text)] tabular-nums">
                {value}
              </div>
            </div>
          ))}
        </div>
        {EARNINGS_ROWS.map((row, index) => (
          <div
            key={row.name}
            className={cn(
              "flex items-center justify-between gap-3 px-4 py-3",
              index > 0 && "border-t border-[var(--border)]",
            )}
          >
            <span className="inline-flex items-center gap-2">
              <span className={cn(MONO, "text-[12px] text-[var(--text-2)]")}>{row.name}</span>
              <span className={row.live ? BADGE_MINT : BADGE_MUTED}>{row.live ? "Live" : "Draft"}</span>
            </span>
            <div className="flex items-center gap-4">
              <span className={cn(MONO, "text-[11.5px] text-[var(--text-muted)]")}>{row.sales} sales</span>
              <span className={cn(MONO, "text-[12px] font-medium text-[var(--text)]")}>{row.price}</span>
            </div>
          </div>
        ))}
      </div>
    </Surface>
  );
}

export function ListingMockup() {
  return (
    <Surface>
      <div className={CARD}>
        <div className="flex items-start justify-between gap-3 border-b border-[var(--border)] p-4">
          <div className="flex items-start gap-3">
            <SkillGlyph size="h-9 w-9" />
            <div>
              <div className="flex items-center gap-2">
                <span className={cn(MONO, "font-semibold text-[var(--text)]")}>pr-review</span>
                <span className={BADGE_MINT}>Live</span>
                <span className={BADGE_BRAND}>Paid</span>
              </div>
              <p className={cn(s.mutedSm, "mt-0.5 text-[11.5px]")}>Published · v1.2.0</p>
            </div>
          </div>
          <span className={BTN_OUTLINE}>
            View public page
            <ArrowUpRight strokeWidth={2} />
          </span>
        </div>
        <div className="p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[6px] border border-[var(--border)] p-3">
              <div className={cn(s.eyebrow, "mb-1")}>Price</div>
              <div className="flex items-baseline gap-1.5">
                <span className={STAT}>$19</span>
                <span className={cn(s.mutedSm, "text-[11.5px]")}>per install</span>
              </div>
            </div>
            <div className="rounded-[6px] border border-[var(--border)] p-3">
              <div className={cn(s.eyebrow, "mb-1")}>This month</div>
              <div className="flex items-baseline gap-1.5">
                <span className={STAT}>$1,216</span>
                <span className={cn(s.mutedSm, "text-[11.5px]")}>64 sales</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-[var(--border)] px-4 py-2.5">
          <Status label="Synced from GitHub" />
          <span className={BTN_SOLID}>Edit listing</span>
        </div>
      </div>
    </Surface>
  );
}

const STORE_META = [
  { icon: Sparkles, label: "12 skills" },
  { icon: Download, label: "4.2k installs" },
  { icon: Star, label: "4.9" },
] as const;

export function StorefrontMockup() {
  return (
    <Surface>
      <div className="overflow-hidden rounded-[10px] border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-[var(--design-shadow-floating)]">
        <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--bg-sunken)] px-3 py-2.5">
          <span className="h-3 w-3 rounded-full bg-[var(--text-2)]" />
          <span className="h-3 w-3 rounded-full bg-[var(--text-2)]" />
          <span className="h-3 w-3 rounded-full bg-[var(--text-2)]" />
          <div className="ml-2 inline-flex flex-1 items-center gap-1.5 rounded-[5px] border border-[var(--border)] bg-[var(--bg-canvas)] px-2.5 py-1 text-[var(--text-faint)]">
            <Lock className="h-3 w-3" strokeWidth={2} />
            <span className={cn(MONO, "text-[11px]")}>mcpmarket.com/@maya</span>
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--bg-sunken)] text-[14px] font-semibold text-[var(--text)]">
                MC
              </span>
              <div>
                <p className={s.h2}>Maya Chen</p>
                <p className={cn(MONO, "text-[11.5px] text-[var(--text-muted)]")}>@maya</p>
              </div>
            </div>
            <span className={BTN_OUTLINE}>
              <Share2 strokeWidth={2} />
              Share
            </span>
          </div>
          <p className={cn(s.body, "mt-3 max-w-md text-[13px]")}>
            Agent skills for fast-moving engineering teams. Built and maintained by me.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px] text-[var(--text-2)]">
            {STORE_META.map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5 text-[var(--text-muted)]" strokeWidth={2} />
                {label}
              </span>
            ))}
          </div>
          <div className="my-4 h-px w-full bg-[var(--border)]" />
          <div className="flex flex-col gap-2">
            {STORE_SKILLS.map((skill) => (
              <div key={skill.name} className={cn(ROW, "py-2.5")}>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={cn(MONO, "text-[12px] font-medium text-[var(--text)]")}>{skill.name}</span>
                    <span className={BADGE_BRAND}>{skill.price}</span>
                  </div>
                  <p className={cn(s.mutedSm, "mt-0.5 truncate text-[11.5px]")}>{skill.blurb}</p>
                </div>
                <span className={cn(MONO, "shrink-0 text-[11px] text-[var(--text-muted)]")}>{skill.installs}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Surface>
  );
}

export function ReachMockup() {
  return (
    <Surface>
      <div className={CARD}>
        <div className="border-b border-[var(--border)] p-4">
          <div className="flex items-center gap-1.5 rounded-[6px] border border-[var(--border)] bg-[var(--bg-canvas)] px-2.5 py-2 text-[var(--text-muted)]">
            <Search className="h-3.5 w-3.5" strokeWidth={2} />
            <span className={cn(MONO, "text-[11.5px]")}>Search 1,200+ agent skills</span>
          </div>
        </div>
        <div className="border-b border-[var(--border)] p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className={s.eyebrow}>Browse by category</div>
            <span className={BADGE_MINT}>
              <TrendingUp strokeWidth={2} />
              Discovery
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((category) => (
              <span
                key={category}
                className={cn(
                  MONO,
                  "rounded-[4px] border border-[var(--border)] bg-[var(--bg-canvas)] px-1.5 py-0.5 text-[11px] text-[var(--text-2)]",
                )}
              >
                {category}
              </span>
            ))}
          </div>
        </div>
        <div className="p-4">
          <div className={cn(s.eyebrow, "mb-2")}>Trending this week</div>
          <div className="flex flex-col gap-1.5">
            {TRENDING.map((skill, index) => (
              <div key={skill.name} className="flex items-center justify-between gap-3 py-1">
                <span className="inline-flex min-w-0 items-center gap-2.5">
                  <span className={cn(MONO, "w-4 shrink-0 text-[11px] text-[var(--text-muted)]")}>{index + 1}</span>
                  <span className={cn(MONO, "truncate text-[12px] text-[var(--text-2)]")}>{skill.name}</span>
                  <span className={cn(s.mutedSm, "shrink-0 text-[11px]")}>{skill.author}</span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-1 text-[11.5px] text-[var(--text-muted)]">
                  <span className={MONO}>{skill.installs}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Surface>
  );
}

function AgentMark({ agent }: { readonly agent: (typeof AGENTS)[number] }) {
  if (agent !== "Openclaw") {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- 16px favicon, as on the source
      <img src={BRAND_FAVICONS[agent]} alt={agent} width={16} height={16} className="h-4 w-4 shrink-0 rounded-[3px]" />
    );
  }
  return (
    <span className="grid h-4 w-4 shrink-0 place-items-center rounded-[4px] border border-[var(--border)] bg-[var(--bg-canvas)] text-[var(--text-muted)]">
      <Server className="h-3 w-3" strokeWidth={2} />
    </span>
  );
}

export function SyncMockup() {
  return (
    <Surface>
      <div className={CARD}>
        <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] p-4">
          <div className="flex items-center gap-2.5">
            <SkillGlyph size="h-8 w-8" />
            <span className={cn(MONO, "font-semibold text-[var(--text)]")}>pr-review</span>
            <span className={BADGE_MINT}>Synced</span>
          </div>
          <span className={BTN_SOLID}>
            <Download strokeWidth={2} />
            Download
          </span>
        </div>
        <div className="p-4">
          <div className={cn(s.eyebrow, "mb-2")}>Sync with the MCP Market Hub plugin</div>
          <div className="flex flex-col gap-2">
            {AGENTS.map((agent) => (
              <div key={agent} className={cn(ROW, "py-2")}>
                <span className="inline-flex items-center gap-2 text-[12.5px] text-[var(--text-2)]">
                  <AgentMark agent={agent} />
                  {agent}
                </span>
                <Status label="Synced" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Surface>
  );
}
