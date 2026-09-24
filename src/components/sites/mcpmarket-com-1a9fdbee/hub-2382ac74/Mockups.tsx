import type { ReactNode } from "react";
import {
  ChevronRight,
  Download,
  Ellipsis,
  Eye,
  FileText,
  Lock,
  Package,
  Plug,
  Plus,
  Server,
  UserPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND_FAVICONS, GithubIcon, type BrandName } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/icons";
import s from "./AppSurface.module.css";

// Static product mockups: the source renders them as inert spans, not controls.
const BADGE =
  "inline-flex items-center gap-1 whitespace-nowrap rounded-[3px] border px-[9px] py-[2px] font-mono text-[10.5px] font-medium tracking-[0.04em] [&_svg]:h-3 [&_svg]:w-3";
const BADGE_STATUS = `${BADGE} uppercase border-[var(--text-2)] bg-[var(--bg-sunken)] text-[var(--text-2)]`;
const BADGE_BRAND = `${BADGE} border-[var(--text)] bg-[var(--bg-sunken)] text-[var(--text)]`;
const BADGE_OUTLINE = `${BADGE} border-[var(--border-strong)] bg-transparent text-[var(--text)]`;
const BADGE_MUTED = `${BADGE} border-[var(--border-strong)] bg-[var(--bg-sunken)] text-[var(--text-2)]`;

const BTN =
  "inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-[5px] font-medium transition-colors [&_svg]:h-3.5 [&_svg]:w-3.5";
const BTN_OUTLINE = `${BTN} border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text)] hover:bg-[var(--bg-hover)]`;
const BTN_SOLID = `${BTN} bg-[var(--text)] text-[var(--bg-canvas)] hover:bg-[var(--text-2)]`;

const CARD = "overflow-hidden rounded-[8px] border border-[var(--border)] bg-[var(--bg-surface)]";
const PANEL = "rounded-[6px] border border-[var(--border)] p-3";

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

function Favicon({ src, label }: { readonly src: string; readonly label: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- 16px favicon, as on the source
    <img src={src} alt={label} width={16} height={16} className="h-4 w-4 shrink-0 rounded-[3px]" />
  );
}

function PanelHeader({ title, count }: { readonly title: string; readonly count: string }) {
  return (
    <div className="mb-2 flex items-center justify-between">
      <span className="text-[12px] font-semibold text-[var(--text)]">{title}</span>
      <span className={cn(s.mono, "text-[11px] text-[var(--text-muted)]")}>{count}</span>
    </div>
  );
}

const SKILL_FILES = ["SKILL.md", "references/checklist.md", "references/style.md"];

const SKILL_SOURCE = `---
name: pr-review
description: Review a diff for correctness and reuse.
allowed-tools: [github.get_diff, github.comment]
---

# PR review

When the user shares a pull request:

1. Fetch the diff through the GitHub MCP server.
2. Flag correctness bugs first, then reuse / simplification.
3. Post findings as inline comments, grouped by file.`;

export function SkillMockup() {
  return (
    <Surface>
      <div className="overflow-hidden rounded-[10px] border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-[var(--design-shadow-floating)]">
        <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--bg-sunken)] px-3 py-2.5">
          <span className="h-3 w-3 rounded-full bg-[var(--text-2)]" />
          <span className="h-3 w-3 rounded-full bg-[var(--text-2)]" />
          <span className="h-3 w-3 rounded-full bg-[var(--text-2)]" />
          <div className="ml-2 inline-flex flex-1 items-center gap-1.5 rounded-[5px] border border-[var(--border)] bg-[var(--bg-canvas)] px-2.5 py-1 text-[var(--text-faint)]">
            <Lock className="h-3 w-3" strokeWidth={2} />
            <span className={cn(s.mono, "text-[11px]")}>mcpmarket.com/acme/skills/pr-review</span>
          </div>
        </div>
        <div className="p-6 sm:p-7">
          <div className={cn(s.mono, "mb-4 text-[11px] text-[var(--text-faint)]")}>
            Skills <span className="mx-1">/</span>
            <span className="text-[var(--text-2)]">pr-review</span>
          </div>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2.5">
                <p className={s.h1}>pr-review</p>
                <span className={BADGE_STATUS}>Live</span>
              </div>
              <span className="mt-1.5 inline-flex items-center gap-1.5 text-[12px] text-[var(--text-muted)]">
                <GithubIcon className="h-3.5 w-3.5" />
                <span className={cn(s.mono, "text-[11.5px]")}>acme/pr-review-skill</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={cn(BTN_OUTLINE, "h-[26px] px-2.5 text-[12px]")}>Edit</span>
              <span className={cn(BTN_SOLID, "h-[26px] px-2.5 text-[12px]")}>
                <Download strokeWidth={2} /> Install skill
              </span>
              <span className={cn(BTN_OUTLINE, "h-[26px] w-[26px]")}>
                <Ellipsis strokeWidth={2} />
              </span>
            </div>
          </div>
          <p className={cn(s.body, "mt-3 max-w-2xl text-[14px]")}>
            Reviews a pull-request diff for correctness and reuse, then posts inline review comments. Pulls repo
            context through the GitHub MCP server.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12.5px] text-[var(--text-2)]">
            <span className="inline-flex items-center gap-1.5">
              <span className={BADGE_STATUS}>Published</span>
              <span className={cn(s.mono, "text-[11px] text-[var(--text-muted)]")}>v1.2.0 live</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Plug className="h-3.5 w-3.5 text-[var(--text-muted)]" strokeWidth={2} /> 3 tools
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Package className="h-3.5 w-3.5 text-[var(--text-muted)]" strokeWidth={2} /> In 2 toolkits
            </span>
            <span className="inline-flex items-center gap-1.5">
              <GithubIcon className="h-3.5 w-3.5 text-[var(--text-muted)]" /> Synced
            </span>
          </div>
          <div className="my-5 h-px w-full bg-[var(--border)]" />
          <div className="grid gap-3 md:grid-cols-[180px_1fr]">
            <div className="rounded-[6px] border border-[var(--border)] bg-[var(--bg-canvas)] p-2">
              <div className={cn(s.eyebrow, "mb-1.5 px-1.5")}>Files</div>
              {SKILL_FILES.map((file, index) => (
                <span
                  key={file}
                  className={cn(
                    "flex items-center gap-2 rounded-[4px] px-1.5 py-1",
                    index === 0 ? "bg-[var(--bg-hover)] text-[var(--text)]" : "text-[var(--text-muted)]",
                  )}
                >
                  <FileText className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                  <span className={cn(s.mono, "truncate text-[11.5px]")}>{file}</span>
                </span>
              ))}
            </div>
            <div className="overflow-hidden rounded-[6px] border border-[var(--border)] bg-[var(--bg-canvas)]">
              <div className="flex items-center gap-1.5 border-b border-[var(--border)] px-3 py-2">
                <FileText className="h-3.5 w-3.5 text-[var(--text-muted)]" strokeWidth={2} />
                <span className={cn(s.mono, "text-[11.5px] text-[var(--text-2)]")}>SKILL.md</span>
              </div>
              <pre className={cn(s.mono, "overflow-x-auto px-4 py-3 text-[11.5px] leading-[1.625] text-[var(--text-2)]")}>
                {SKILL_SOURCE}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </Surface>
  );
}

const MCP_TOOLS = ["query_db", "create_record", "send_webhook"];
const MCP_SECRETS = ["API_KEY", "WEBHOOK_SECRET"];

export function McpMockup() {
  return (
    <Surface>
      <div className={CARD}>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] p-4">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[6px] border border-[var(--border)] bg-[var(--bg-sunken)] text-[var(--text-2)]">
              <Server className="h-4 w-4" strokeWidth={2} />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className={s.h2}>My Custom MCP</span>
                <span className={BADGE_BRAND}>Shared</span>
              </div>
              <span className="mt-0.5 inline-flex items-center gap-2 text-[12.5px] font-medium text-[var(--text)]">
                <span className={s.dot} />
                Running
              </span>
            </div>
          </div>
          <span className={cn(BTN_OUTLINE, "h-[26px] w-[26px]")}>
            <Ellipsis strokeWidth={2} />
          </span>
        </div>
        <div className="grid gap-3 p-4 sm:grid-cols-2">
          <div className={PANEL}>
            <PanelHeader title="Tools" count="6" />
            <div className="flex flex-col gap-1.5">
              {MCP_TOOLS.map((tool) => (
                <span key={tool} className="inline-flex items-center gap-2">
                  <Plug className="h-3.5 w-3.5 text-[var(--text-muted)]" strokeWidth={2} />
                  <span className={cn(s.mono, "text-[11.5px] text-[var(--text-2)]")}>{tool}</span>
                </span>
              ))}
              <span className={cn(s.mutedSm, "text-[11px]")}>+3 more</span>
            </div>
          </div>
          <div className={PANEL}>
            <div className={cn(s.eyebrow, "mb-2")}>Environment</div>
            {MCP_SECRETS.map((secret) => (
              <div key={secret} className="mb-2">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span className={cn(s.mono, "truncate text-[11px] text-[var(--text-2)]")}>{secret}</span>
                  <span className="text-[10px] text-[var(--text)]">Required</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-[4px] border border-[var(--border)] bg-[var(--bg-canvas)] px-2 py-1">
                  <span className={cn(s.mono, "text-[11px] tracking-widest text-[var(--text-muted)]")}>••••••••</span>
                  <div className="flex-1" />
                  <Eye className="h-3 w-3 text-[var(--text-faint)]" strokeWidth={2} />
                </div>
              </div>
            ))}
            <span className={cn(BTN_SOLID, "mt-1 h-6 px-2 text-[11.5px]")}>Save</span>
          </div>
        </div>
        <div className="border-t border-[var(--border)] px-4 py-2.5">
          <span className="inline-flex items-center gap-1 text-[12px] text-[var(--text)]">
            View logs <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
          </span>
        </div>
      </div>
    </Surface>
  );
}

const TOOLKIT_TABS = [
  { label: "Overview", count: null },
  { label: "MCPs", count: "4" },
  { label: "Skills", count: "8" },
  { label: "Logs", count: null },
];

const TOOLKIT_SERVERS: readonly BrandName[] = ["Notion", "Gmail", "Sentry"];

export function ToolkitMockup() {
  return (
    <Surface>
      <div className={CARD}>
        <div className="border-b border-[var(--border)] p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className={s.h2}>customer-success</span>
              <Status label="Enabled" />
            </div>
            <span className={BADGE_OUTLINE}>Pro</span>
          </div>
          <div className="mt-2.5 truncate rounded-[5px] border border-[var(--border)] bg-[var(--bg-sunken)] px-2.5 py-1.5 text-[11px] text-[var(--text-2)]">
            <span className={s.mono}>link.mcpmarket.com/acme/toolkit/mcp</span>
          </div>
        </div>
        <div className="flex gap-1 border-b border-[var(--border)] px-3 pt-2.5">
          {TOOLKIT_TABS.map((tab, index) => (
            <span
              key={tab.label}
              className={cn(
                "relative px-2.5 pb-2.5 text-[12.5px]",
                index === 0 ? "font-medium text-[var(--text)]" : "text-[var(--text-muted)]",
              )}
            >
              {tab.label}
              {tab.count && <span className={cn(s.mutedSm, "ml-1 text-[11px]")}>{tab.count}</span>}
              {index === 0 && <span className="absolute inset-x-2.5 -bottom-px h-[2px] bg-[var(--text)]" />}
            </span>
          ))}
        </div>
        <div className="grid gap-3 p-4 sm:grid-cols-2">
          <div className={PANEL}>
            <PanelHeader title="Connected MCP servers" count="4" />
            <div className="flex flex-col gap-2">
              {TOOLKIT_SERVERS.map((server) => (
                <span key={server} className="inline-flex items-center gap-2 text-[12px] text-[var(--text-2)]">
                  <Favicon src={BRAND_FAVICONS[server]} label={server} />
                  {server}
                </span>
              ))}
              <span className="inline-flex items-center gap-2 text-[12px] text-[var(--text-2)]">
                <span className="grid h-4 w-4 shrink-0 place-items-center rounded-[4px] border border-[var(--border)] bg-[var(--bg-canvas)] text-[var(--text-muted)]">
                  <Server className="h-3 w-3" strokeWidth={2} />
                </span>
                Custom MCP
              </span>
            </div>
          </div>
          <div className={PANEL}>
            <PanelHeader title="Skills" count="8" />
            <div className="flex flex-wrap gap-1.5">
              {["pr-review", "standup-digest", "sql-explain"].map((skill) => (
                <span
                  key={skill}
                  className={cn(
                    s.mono,
                    "rounded-[4px] border border-[var(--border)] bg-[var(--bg-canvas)] px-1.5 py-0.5 text-[11px] text-[var(--text-2)]",
                  )}
                >
                  {skill}
                </span>
              ))}
              <span className={cn(s.mutedSm, "text-[11px]")}>+5</span>
            </div>
          </div>
        </div>
      </div>
    </Surface>
  );
}

const USAGE_STATS = [
  { label: "Skills invoked", value: "6.5k" },
  { label: "Tool calls", value: "18.2k" },
  { label: "Error rate", value: "0.4%" },
];

const USAGE_ROWS = [
  { name: "pr-review", kind: "Skill", calls: "2,310", status: "Healthy" },
  { name: "github.get_diff", kind: "Tool", calls: "4,120", status: "Healthy" },
  { name: "notion.search", kind: "Tool", calls: "1,740", status: "Degraded" },
];

export function UsageMockup() {
  return (
    <Surface>
      <div className={CARD}>
        <div className="grid grid-cols-3 border-b border-[var(--border)]">
          {USAGE_STATS.map((stat, index) => (
            <div key={stat.label} className={cn("p-4", index > 0 && "border-l border-[var(--border)]")}>
              <div className={s.eyebrow}>{stat.label}</div>
              <div className="mt-1 text-[22px] font-semibold tracking-[-0.02em] text-[var(--text)] tabular-nums">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
        {USAGE_ROWS.map((row, index) => (
          <div
            key={row.name}
            className={cn(
              "flex items-center justify-between gap-3 px-4 py-3",
              index > 0 && "border-t border-[var(--border)]",
            )}
          >
            <span className="inline-flex items-center gap-2">
              <span className={cn(s.mono, "text-[12px] text-[var(--text-2)]")}>{row.name}</span>
              <span className={row.kind === "Skill" ? BADGE_BRAND : BADGE_MUTED}>{row.kind}</span>
            </span>
            <div className="flex items-center gap-4">
              <span className={cn(s.mono, "text-[11.5px] text-[var(--text-muted)]")}>{row.calls}</span>
              <Status label={row.status} />
            </div>
          </div>
        ))}
      </div>
    </Surface>
  );
}

const MEMBERS = [
  { initials: "MC", name: "Maya Chen", email: "maya@acme.com", role: "Owner" },
  { initials: "KR", name: "Kai Rivera", email: "kai@acme.com", role: "Admin" },
  { initials: "SO", name: "Sam Okoye", email: "sam@acme.com", role: "Member" },
];

export function MembersMockup() {
  return (
    <Surface>
      <div className={CARD}>
        <div className="flex items-center justify-between border-b border-[var(--border)] p-4">
          <div className="flex items-center gap-2">
            <span className={s.h2}>Members</span>
            <span className={cn(s.mono, "text-[11px] text-[var(--text-muted)]")}>3 of 5 seats</span>
          </div>
          <span className={cn(BTN_SOLID, "h-[26px] px-2.5 text-[12px]")}>
            <UserPlus strokeWidth={2} /> Invite
          </span>
        </div>
        {MEMBERS.map((member, index) => (
          <div
            key={member.email}
            className={cn("flex items-center gap-3 px-4 py-3", index > 0 && "border-t border-[var(--border)]")}
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--bg-sunken)] text-[11px] font-semibold text-[var(--text)]">
              {member.initials}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-medium text-[var(--text)]">{member.name}</div>
              <div className={cn(s.mutedSm, "text-[11.5px]")}>{member.email}</div>
            </div>
            <span className={member.role === "Owner" ? BADGE_BRAND : BADGE_OUTLINE}>{member.role}</span>
          </div>
        ))}
        <div className="flex items-center gap-3 border-t border-[var(--border)] px-4 py-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-dashed border-[var(--border-strong)] text-[var(--text-muted)]">
            <Plus className="h-3.5 w-3.5" strokeWidth={2} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-[13px] text-[var(--text-2)]">jordan@acme.com</div>
            <div className={cn(s.mutedSm, "text-[11.5px]")}>Invitation sent</div>
          </div>
          <span className={BADGE_STATUS}>Pending</span>
        </div>
      </div>
    </Surface>
  );
}

const CLIENTS: readonly { readonly label: string; readonly brand: BrandName }[] = [
  { label: "Claude Code", brand: "Claude" },
  { label: "Claude Desktop", brand: "Claude" },
  { label: "Codex", brand: "Codex" },
  { label: "Cursor", brand: "Cursor" },
];

export function InstallMockup() {
  return (
    <Surface>
      <div className={CARD}>
        <div className="flex flex-wrap gap-2 border-b border-[var(--border)] p-4">
          {CLIENTS.map((client, index) => (
            <span
              key={client.label}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-[6px] border px-2.5 py-1.5 text-[12px]",
                index === 0
                  ? "border-[var(--text)] bg-[var(--bg-sunken)] text-[var(--text)]"
                  : "border-[var(--border)] bg-[var(--bg-canvas)] text-[var(--text-2)]",
              )}
            >
              <Favicon src={BRAND_FAVICONS[client.brand]} label={client.label} />
              {client.label}
            </span>
          ))}
        </div>
        <div className="p-4">
          <div className={cn(s.eyebrow, "mb-2")}>Install</div>
          <span className={cn(BTN_SOLID, "h-[30px] w-full px-3 text-[12.5px]")}>
            <Download strokeWidth={2} /> Download plugin
          </span>
          <p className={cn(s.mutedSm, "mt-2 text-[11.5px]")}>Installs your toolkit and keeps it in sync.</p>
        </div>
      </div>
    </Surface>
  );
}
