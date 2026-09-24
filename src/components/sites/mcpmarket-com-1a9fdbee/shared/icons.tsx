import type { SVGProps } from "react";
import { BookOpen, Download, Plus, Trophy, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import styles from "./animated-icons.module.css";
import { MCPMARKET_LOGO_PATHS } from "./logo-paths";
import type { NavIconName } from "./types";

type IconProps = SVGProps<SVGSVGElement> & { readonly size?: number };

/** The MCP Market logo mark (currentColor fill), exactly as the source renders it. */
export function LogoMarkIcon({ size = 36, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 1024 1024" fill="currentColor" aria-hidden="true" {...props}>
      <g transform="translate(0,1024) scale(0.1,-0.1)">
        {MCPMARKET_LOGO_PATHS.map((d, index) => (
          <path key={index} d={d} />
        ))}
      </g>
    </svg>
  );
}

/** Lucide's former `github` icon (removed from lucide 1.x); the source still ships it. */
export function GithubIcon({ className, strokeWidth = 2 }: { readonly className?: string; readonly strokeWidth?: number }) {
  return (
    <svg {...strokeSvgProps(24, strokeWidth)} className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const FAVICON_ROOT = "/sites/mcpmarket-com-1a9fdbee/shared/favicons";

/** Third-party favicons the source pulls from Google's favicon service, stored locally. */
export const BRAND_FAVICONS = {
  Claude: `${FAVICON_ROOT}/claude.png`,
  Codex: `${FAVICON_ROOT}/openai.png`,
  Notion: `${FAVICON_ROOT}/notion.png`,
  Gmail: `${FAVICON_ROOT}/gmail.png`,
  Sentry: `${FAVICON_ROOT}/sentry.png`,
  Cursor: `${FAVICON_ROOT}/cursor.png`,
} as const;

export type BrandName = keyof typeof BRAND_FAVICONS;

function strokeSvgProps(size: number, strokeWidth: number) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  } as const;
}

/**
 * Tabler "plug-connected" (MIT). Animated like the source's ConnectIcon: the plug
 * halves spring apart while the cable ends lengthen and the pins retract.
 */
export function PlugConnectedIcon({ size = 16, className }: { readonly size?: number; readonly className?: string }) {
  const part = styles.connectPart;
  return (
    <svg {...strokeSvgProps(size, 2)} className={className}>
      <path d="M19 5l3 -3" className={cn(part, styles.connectWireTop)} />
      <path d="m2 22 3-3" className={cn(part, styles.connectWireBottom)} />
      <path d="M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z" className={cn(part, styles.connectPlug)} />
      <path d="M7.5 13.5 l2.5 -2.5" className={cn(part, styles.connectPinA)} />
      <path d="M10.5 16.5 l2.5 -2.5" className={cn(part, styles.connectPinB)} />
      <path d="m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z" className={cn(part, styles.connectSocket)} />
    </svg>
  );
}

/** Lucide "blocks"; the detached tile slides into place on hover. */
export function BlocksIcon({ size = 16, className }: { readonly size?: number; readonly className?: string }) {
  return (
    <svg {...strokeSvgProps(size, 2)} className={className}>
      <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
      <path d="M14 3h7v7h-7z" className={styles.blocksTile} />
    </svg>
  );
}

function FolderOpenIcon({ size = 16, className }: { readonly size?: number; readonly className?: string }) {
  return (
    <svg {...strokeSvgProps(size, 1.5)} className={className}>
      <path
        className={styles.folderPath}
        d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"
      />
    </svg>
  );
}

function SearchIcon({ size = 16, className }: { readonly size?: number; readonly className?: string }) {
  return (
    <svg {...strokeSvgProps(size, 1.5)} className={cn(styles.searchSvg, className)}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function TrendingUpIcon({ size = 16, className }: { readonly size?: number; readonly className?: string }) {
  return (
    <svg {...strokeSvgProps(size, 1.5)} className={cn(styles.trendSvg, className)}>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" pathLength={1} strokeDasharray="1 1" className={styles.trendLine} />
      <polyline points="16 7 22 7 22 13" pathLength={1} strokeDasharray="1 1" className={styles.trendArrow} />
    </svg>
  );
}

const STATIC_NAV_ICONS: Record<Extract<NavIconName, "bookOpen" | "trophy" | "download" | "plus">, LucideIcon> = {
  bookOpen: BookOpen,
  trophy: Trophy,
  download: Download,
  plus: Plus,
};

/**
 * Renders a nav icon by name. Stroke widths follow the source: 2 for plug/blocks,
 * 1.5 for the rest. Animated ones play while a `data-icon-trigger` ancestor is hovered.
 */
export function NavIcon({ name, size = 16, className }: { readonly name: NavIconName; readonly size?: number; readonly className?: string }) {
  switch (name) {
    case "plugConnected":
      return <PlugConnectedIcon size={size} className={className} />;
    case "blocks":
      return <BlocksIcon size={size} className={className} />;
    case "folderOpen":
      return <FolderOpenIcon size={size} className={className} />;
    case "search":
      return <SearchIcon size={size} className={className} />;
    case "trendingUp":
      return <TrendingUpIcon size={size} className={className} />;
    default: {
      const Icon = STATIC_NAV_ICONS[name];
      return <Icon size={size} strokeWidth={1.5} className={className} aria-hidden="true" />;
    }
  }
}
