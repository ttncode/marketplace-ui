import Link from "next/link";
import type { ReactNode } from "react";
import { toSiteHref } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/links";
import type { LinkRef } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/types";
import {
  PRIMARY_FACE,
  PRIMARY_SHELL,
  SECONDARY_FACE,
  SECONDARY_SHELL,
} from "@/components/sites/mcpmarket-com-1a9fdbee/tools-skills-slug-229a0ca0/texture-button";
import { cn } from "@/lib/utils";
import styles from "./explainer.module.css";
import type { ExplainerScale, IconComponent, IconItem, TitledText } from "./types";

const TITLE_SIZE: Record<ExplainerScale, string> = {
  lg: "text-2xl md:text-3xl",
  md: "text-xl md:text-2xl",
};

const LEAD_SIZE: Record<ExplainerScale, string> = {
  lg: "text-lg leading-relaxed",
  md: "text-base leading-relaxed",
};

const ICON_TILE = "flex h-8 w-8 items-center justify-center rounded-lg bg-black/[0.055] text-black/60";

/** Wrapper that applies the explainer typography module to everything inside. */
export function ExplainerContent({ className, children }: { readonly className?: string; readonly children: ReactNode }) {
  return <div className={cn(styles.content, className)}>{children}</div>;
}

export function SectionTitle({
  scale,
  className,
  children,
}: {
  readonly scale: ExplainerScale;
  readonly className: string;
  readonly children: ReactNode;
}) {
  return (
    <h2 className={cn("font-semibold tracking-tight text-foreground", TITLE_SIZE[scale], className)}>{children}</h2>
  );
}

interface SectionProps {
  readonly className?: string;
  readonly containerClassName?: string;
  readonly children: ReactNode;
}

export function Section({ className = "border-b border-border", containerClassName = "max-w-4xl", children }: SectionProps) {
  return (
    <section className={cn("py-12 md:py-20", className)}>
      <div className={cn("mx-auto px-6 md:px-8", containerClassName)}>{children}</div>
    </section>
  );
}

export function Lead({
  scale,
  className,
  children,
}: {
  readonly scale: ExplainerScale;
  readonly className: string;
  readonly children: ReactNode;
}) {
  return <p className={cn("text-muted-foreground", LEAD_SIZE[scale], className)}>{children}</p>;
}

/** The source's inline <code>: Tailwind v3's preflight monospace stack, not the site's Geist Mono. */
export function InlineCode({ children }: { readonly children: ReactNode }) {
  return (
    <code className="font-[ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,'Liberation_Mono','Courier_New',monospace] text-[1em]">
      {children}
    </code>
  );
}

export function TextLink({ href, children }: { readonly href: string; readonly children: ReactNode }) {
  return (
    <Link href={toSiteHref(href)} className="font-medium text-foreground hover:underline">
      {children}
    </Link>
  );
}

export function ArrowLink({ link, icon: Icon }: { readonly link: LinkRef; readonly icon: IconComponent }) {
  return (
    <Link href={toSiteHref(link.href)} className="inline-flex items-center gap-2 font-medium text-foreground hover:underline">
      {link.label}
      <Icon className="h-4 w-4" />
    </Link>
  );
}

export function FeatureGrid({ items }: { readonly items: readonly TitledText[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <div key={item.title} className="rounded-lg border border-border bg-card p-5">
          <h3 className="mb-1 font-medium text-foreground">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.body}</p>
        </div>
      ))}
    </div>
  );
}

export function GlassCardGrid({ items }: { readonly items: readonly IconItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {items.map(({ icon: Icon, title, body }) => (
        <div
          key={title}
          className="rounded-2xl border border-[var(--design-surface-glass-line)] bg-[var(--design-surface-glass)] text-card-foreground backdrop-blur-md transition-[transform,translate,border-color,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-[var(--design-surface-glass-line-hover)] hover:bg-[var(--design-surface-glass-hover)]"
        >
          <div className="p-6">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center gap-2">
                <div className={ICON_TILE}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium tracking-[-0.025em] text-foreground">{title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function StepList({ items }: { readonly items: readonly TitledText[] }) {
  return (
    <div className="space-y-8">
      {items.map((item, index) => (
        <div key={item.title} className="relative pl-12">
          <div className="absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground">
            {index + 1}
          </div>
          {index < items.length - 1 && <div className="absolute top-10 bottom-0 left-[15px] w-px bg-muted" />}
          <h3 className="mb-2 text-lg font-medium text-foreground">{item.title}</h3>
          <p className="text-muted-foreground">{item.body}</p>
        </div>
      ))}
    </div>
  );
}

export function AudienceGrid({ items }: { readonly items: readonly IconItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {items.map(({ icon: Icon, title, body }) => (
        <div
          key={title}
          className="flex items-start gap-3 rounded-lg border border-border bg-card p-6 shadow-none transition-all duration-200"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">{title}</h3>
            <p className="leading-relaxed font-light text-muted-foreground">{body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function UseCaseList({ items }: { readonly items: readonly IconItem[] }) {
  return (
    <div className="space-y-10 rounded-lg border border-border bg-card p-8 shadow-none">
      {items.flatMap(({ icon: Icon, title, body }, index) => [
        index > 0 && <div key={`${title}-rule`} role="none" className="h-px w-full shrink-0 bg-muted" />,
        <div key={title} className="flex items-start gap-4">
          <div className={cn(ICON_TILE, "mt-1 shrink-0")}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="mb-2 text-base font-medium tracking-[-0.02em] text-foreground">{title}</h3>
            <p className="leading-relaxed text-muted-foreground">{body}</p>
          </div>
        </div>,
      ])}
    </div>
  );
}

export function ChipList({ items }: { readonly items: readonly string[] }) {
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-muted-foreground"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

interface ComparisonCardProps {
  readonly columns: readonly [IconItem, IconItem];
  readonly footer: ReactNode;
}

export function ComparisonCard({ columns, footer }: ComparisonCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-8 shadow-none">
      <div className="grid gap-8 md:grid-cols-2">
        {columns.map(({ icon: Icon, title, body }) => (
          <div key={title}>
            <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold text-foreground">
              <Icon className="h-6 w-6" />
              {title}
            </h3>
            <p className="leading-relaxed text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 border-t border-border pt-6">
        <p className="text-muted-foreground">{footer}</p>
      </div>
    </div>
  );
}

export function PrimaryButton({ link, className }: { readonly link: LinkRef; readonly className?: string }) {
  return (
    <Link
      href={toSiteHref(link.href)}
      className={cn(PRIMARY_SHELL, "w-fit bg-primary text-primary-foreground transition-colors hover:bg-primary/90", className)}
    >
      <span className={cn(PRIMARY_FACE, "text-base")}>{link.label}</span>
    </Link>
  );
}

export function SecondaryButton({ link }: { readonly link: LinkRef }) {
  return (
    <Link
      href={toSiteHref(link.href)}
      className={cn(SECONDARY_SHELL, "w-fit border-border text-muted-foreground transition-colors hover:bg-muted")}
    >
      <span className={cn(SECONDARY_FACE, "text-base")}>{link.label}</span>
    </Link>
  );
}

interface CtaSectionProps {
  readonly prompt: string;
  readonly primary: LinkRef;
  readonly secondary: readonly LinkRef[];
}

export function CtaSection({ prompt, primary, secondary }: CtaSectionProps) {
  return (
    <Section className="">
      <div className="text-center">
        <p className="mb-6 text-muted-foreground">{prompt}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <PrimaryButton link={primary} />
          {secondary.map((link) => (
            <SecondaryButton key={link.href} link={link} />
          ))}
        </div>
      </div>
    </Section>
  );
}
