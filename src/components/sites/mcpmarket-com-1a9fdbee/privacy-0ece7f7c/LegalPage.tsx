import Link from "next/link";
import type { ReactNode } from "react";
import { toSiteHref } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/links";
import { ContentPageHero } from "./ContentPageHero";
import styles from "./LegalProse.module.css";

interface LegalPageProps {
  readonly title: string;
  readonly lastUpdated: string;
  readonly children: ReactNode;
}

export function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen flex-col bg-[var(--design-canvas)] font-sans text-[var(--design-ink)]">
        <ContentPageHero align="start" crumb={title} title={title} subtitle={`Last Updated: ${lastUpdated}`} />
        <div className="flex-1">
          <div className="mx-auto max-w-4xl px-6 py-12 md:px-8 md:py-16">
            <div className={styles.prose}>{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export function ProseLink({ href, children }: { readonly href: string; readonly children: ReactNode }) {
  return <Link href={toSiteHref(href)}>{children}</Link>;
}
