"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, PanelLeftClose, PanelLeftOpen, Plus, Settings, Video, type LucideIcon } from "lucide-react";
import { SiteLogo } from "@/components/layout/site-logo";
import { activeHref } from "@/lib/nav";
import type { DashboardIconName, DashboardNavItem, SiteConfig } from "@/lib/types";
import { cn } from "@/lib/utils";

const ICONS: Record<DashboardIconName, LucideIcon> = { home: House, video: Video, plus: Plus, settings: Settings };

interface AppSidebarProps {
  readonly name: string;
  readonly logo: SiteConfig["logo"];
  readonly items: readonly DashboardNavItem[];
  readonly collapsed: boolean;
  readonly onToggle?: () => void;
  readonly onNavigate?: () => void;
  readonly className?: string;
}

export function AppSidebar({ name, logo, items, collapsed, onToggle, onNavigate, className }: AppSidebarProps) {
  const pathname = usePathname();
  const active = activeHref(pathname, items.map((item) => item.href));
  const ToggleIcon = collapsed ? PanelLeftOpen : PanelLeftClose;

  return (
    <aside
      className={cn(
        "flex h-full min-h-0 flex-col border-r border-border bg-surface transition-[width] duration-200",
        collapsed ? "w-16" : "w-60",
        className,
      )}
    >
      <div className="flex h-14 items-center justify-between gap-2 px-3">
        <Link href="/app" onClick={onNavigate} className="min-w-0">
          <SiteLogo name={name} logo={logo} size={28} showName={!collapsed} />
        </Link>
        {onToggle && !collapsed && (
          <button type="button" onClick={onToggle} aria-label="Collapse sidebar" aria-expanded={!collapsed} className="rounded-md p-1.5 text-ink-muted hover:bg-accent hover:text-ink">
            <ToggleIcon aria-hidden className="size-4" />
          </button>
        )}
      </div>
      <nav aria-label="Dashboard" className="min-h-0 flex-1 space-y-1 overflow-y-auto px-2 py-2">
        {items.map((item) => {
          const Icon = ICONS[item.icon];
          const isActive = item.href === active;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex h-9 items-center gap-3 rounded-[var(--design-radius-md)] px-3 text-sm transition-colors",
                isActive ? "bg-accent font-medium text-ink" : "text-ink-secondary hover:bg-accent/60 hover:text-ink",
                collapsed && "justify-center px-0",
              )}
            >
              <Icon aria-hidden className="size-4 shrink-0" strokeWidth={1.75} />
              <span className={cn(collapsed && "sr-only")}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      {onToggle && collapsed && (
        <button type="button" onClick={onToggle} aria-label="Expand sidebar" aria-expanded={!collapsed} className="m-2 flex h-9 items-center justify-center rounded-md text-ink-muted hover:bg-accent hover:text-ink">
          <ToggleIcon aria-hidden className="size-4" />
        </button>
      )}
    </aside>
  );
}
