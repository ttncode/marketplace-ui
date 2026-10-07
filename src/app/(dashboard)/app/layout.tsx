import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { USER } from "@/content/dashboard";
import { site } from "@/site.config";

export const metadata: Metadata = { title: { default: "Dashboard", template: `%s · Dashboard | ${site.name}` } };

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AppShell name={site.name} logo={site.logo} nav={site.dashboardNav} user={USER}>
      {children}
    </AppShell>
  );
}
