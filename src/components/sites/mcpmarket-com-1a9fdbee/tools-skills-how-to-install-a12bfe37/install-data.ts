import type { LinkRef } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/types";
import {
  PackageIcon,
  SmileIcon,
  SquareTerminalIcon,
} from "@/components/sites/mcpmarket-com-1a9fdbee/what-is-an-mcp-server-4bf875ce/icons";
import type { IconComponent } from "@/components/sites/mcpmarket-com-1a9fdbee/what-is-an-mcp-server-4bf875ce/types";

export interface PlatformCard {
  readonly name: string;
  readonly badge: string;
  readonly icon: IconComponent;
  readonly description: string;
  readonly features: readonly string[];
  readonly guide: LinkRef;
  /** The recommended platform is drawn inverted (dark card, floating badge). */
  readonly featured?: true;
}

export const PLATFORMS: readonly PlatformCard[] = [
  {
    name: "Claude.ai",
    badge: "Easiest",
    icon: SmileIcon,
    description: "Install Skills through the Claude web interface. Best for non-technical users and quick setup.",
    features: [
      "Upload custom Skills as ZIP files",
      "Toggle pre-built Skills on/off",
      "Access partner Skills directory",
      "No command line required",
    ],
    guide: { label: "Claude.ai Guide", href: "/tools/skills/how-to-install/claude-ai" },
    featured: true,
  },
  {
    name: "Claude Code",
    badge: "For Developers",
    icon: SquareTerminalIcon,
    description: "Install Skills via the filesystem for development workflows. Best for developers and teams.",
    features: [
      "Personal skills: ~/.claude/skills/",
      "Project skills: .claude/skills/",
      "Install via plugins marketplace",
      "Share via version control",
    ],
    guide: { label: "Claude Code Guide", href: "/tools/skills/how-to-install/claude-code" },
  },
  {
    name: "Claude API",
    badge: "Enterprise",
    icon: PackageIcon,
    description: "Programmatic Skill management via the /v1/skills endpoint. Best for enterprise and automation.",
    features: [
      "Organization-wide Skill sharing",
      "Programmatic version control",
      "Pre-built Skills via skill_id",
      "Requires beta headers",
    ],
    guide: { label: "API Documentation", href: "https://docs.claude.com/en/build-with-claude/skills-guide" },
  },
];

/** A cell is plain text, or a green check before the text; "muted" cells use the muted ink. */
export interface ComparisonCell {
  readonly text: string;
  readonly check?: true;
  readonly muted?: true;
  readonly medium?: true;
}

export interface ComparisonRow {
  readonly feature: string;
  readonly cells: readonly [ComparisonCell, ComparisonCell, ComparisonCell];
}

export const COMPARISON_ROWS: readonly ComparisonRow[] = [
  {
    feature: "Pre-built Skills",
    cells: [{ text: "Yes", check: true }, { text: "Via plugins", muted: true }, { text: "Yes", check: true }],
  },
  { feature: "Custom Skills", cells: [{ text: "ZIP upload" }, { text: "Filesystem" }, { text: "/v1/skills" }] },
  { feature: "Skill Scope", cells: [{ text: "Individual" }, { text: "Personal / Project" }, { text: "Organization" }] },
  {
    feature: "Network Access",
    cells: [{ text: "Varies", muted: true }, { text: "Full", check: true }, { text: "No", muted: true }],
  },
  { feature: "Best For", cells: [{ text: "Individuals", medium: true }, { text: "Developers" }, { text: "Enterprise" }] },
];
