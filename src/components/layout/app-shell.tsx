"use client";

import { useState, type ReactNode } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppTopbar } from "@/components/layout/app-topbar";
import type { DashboardNavItem, DashboardUser, SiteConfig } from "@/lib/types";

interface AppShellProps {
  readonly name: string;
  readonly logo: SiteConfig["logo"];
  readonly nav: readonly DashboardNavItem[];
  readonly user: DashboardUser;
  readonly children: ReactNode;
}

export function AppShell({ name, logo, nav, user, children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-canvas text-ink">
      <div className="sticky top-0 hidden h-screen md:flex">
        <AppSidebar name={name} logo={logo} items={nav} collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      </div>
      <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-40 bg-overlay md:hidden" />
          <Dialog.Popup className="fixed inset-y-0 left-0 z-50 md:hidden">
            <Dialog.Title className="sr-only">Navigation</Dialog.Title>
            <AppSidebar name={name} logo={logo} items={nav} collapsed={false} onNavigate={() => setMobileOpen(false)} />
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopbar user={user} onMenu={() => setMobileOpen(true)} />
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
