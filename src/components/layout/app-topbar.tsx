"use client";

import Link from "next/link";
import { Menu } from "@base-ui/react/menu";
import { LogOut, Menu as MenuIcon, Search, Settings } from "lucide-react";
import { ThemeToggle } from "@/components/blocks/theme-toggle";
import { Input } from "@/components/ui/input";
import type { DashboardUser } from "@/lib/types";

interface AppTopbarProps {
  readonly user: DashboardUser;
  readonly onMenu: () => void;
  readonly searchAction?: string;
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();

export function AppTopbar({ user, onMenu, searchAction = "/app/videos" }: AppTopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-canvas/80 px-4 backdrop-blur md:px-8">
      <button type="button" onClick={onMenu} aria-label="Open navigation" className="rounded-md p-2 text-ink-secondary hover:bg-accent md:hidden">
        <MenuIcon aria-hidden className="size-5" />
      </button>
      <form action={searchAction} role="search" className="relative max-w-sm flex-1">
        <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-muted" />
        <Input type="search" name="q" placeholder="Search…" aria-label="Search" className="pl-9" />
      </form>
      <div className="ml-auto flex items-center gap-1">
        <ThemeToggle />
        <Menu.Root>
          <Menu.Trigger aria-label="Account" className="flex size-9 items-center justify-center rounded-full bg-ink text-xs font-semibold text-canvas">
            {initials(user.name)}
          </Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner sideOffset={8} align="end" className="z-[60]">
              <Menu.Popup className="min-w-52 rounded-[12px] border border-border bg-popover p-1 text-sm text-popover-foreground shadow-[var(--design-shadow-floating)]">
                <div className="px-2 py-1.5">
                  <p className="font-medium text-ink">{user.name}</p>
                  <p className="text-xs text-ink-muted">{user.email}</p>
                </div>
                <Menu.Separator className="my-1 h-px bg-border" />
                <Menu.Item render={<Link href="/app/settings" />} className="flex items-center gap-2 rounded-[8px] px-2 py-1.5 outline-none data-[highlighted]:bg-accent">
                  <Settings aria-hidden className="size-4" /> Settings
                </Menu.Item>
                <Menu.Item render={<Link href="/login" />} className="flex items-center gap-2 rounded-[8px] px-2 py-1.5 outline-none data-[highlighted]:bg-accent">
                  <LogOut aria-hidden className="size-4" /> Log out
                </Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      </div>
    </header>
  );
}
