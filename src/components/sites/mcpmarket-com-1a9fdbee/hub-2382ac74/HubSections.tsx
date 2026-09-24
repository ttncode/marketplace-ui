import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, CircleCheck } from "lucide-react";
import { LogoMarkIcon } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/icons";
import { toSiteHref } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/links";
import {
  PRIMARY_FACE,
  PRIMARY_SHELL,
  SECONDARY_FACE,
  SECONDARY_SHELL,
} from "@/components/sites/mcpmarket-com-1a9fdbee/tools-skills-slug-229a0ca0/texture-button";
import { cn } from "@/lib/utils";
import { HERO_ITEMS, PRICING_PLANS, SIGNUP_URL, type CheckItem, type IconItem } from "./hub-data";
import { HeroDitherShader } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/HeroDitherShader";

const HERO_MASK =
  "linear-gradient(to bottom, rgba(0,0,0,0.34) 0%, rgba(0,0,0,0.28) 20%, rgba(0,0,0,0.32) 38%, rgba(0,0,0,0.38) 56%, rgba(0,0,0,0.46) 70%, rgba(0,0,0,0.4) 78%, rgba(0,0,0,0.28) 86%, rgba(0,0,0,0.12) 94%, transparent 100%)";

const CONTAINER = "mx-auto w-full max-w-[1280px] px-6 md:px-8";
const TEAL = "text-[#0d9488]";
const H2 = "font-display text-[30px] leading-[36px] font-normal tracking-[-0.025em] text-foreground md:text-[36px] md:leading-[40px]";
const H2_TIGHT = "font-display text-[30px] leading-[36px] font-normal tracking-[-0.04em] text-foreground md:text-[36px] md:leading-[40px]";
const GLASS_BUTTON =
  "mt-6 inline-flex h-11 w-full items-center justify-center rounded-lg border border-input bg-[var(--design-glass)] px-4 py-2 font-sans text-sm leading-[20px] font-normal tracking-[-0.01em] whitespace-nowrap text-foreground backdrop-blur-xl transition-[background-color,border-color,color,box-shadow,transform,translate,scale,rotate] duration-200 hover:border-foreground/25 hover:bg-[var(--design-surface-subtle)] focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:outline-none";

function GetStartedButton() {
  return (
    <Link href={toSiteHref(SIGNUP_URL)} className={cn(PRIMARY_SHELL, "h-12 w-fit")}>
      <span className={cn(PRIMARY_FACE, "text-base leading-[24px]")}>
        Get started
        <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" strokeWidth={1.5} />
      </span>
    </Link>
  );
}

function HubWordmark() {
  return (
    <div className="mb-5 flex justify-center text-foreground">
      <span className="inline-flex items-center text-[30px] leading-none tracking-[-0.01em]">
        <span className="font-sans font-semibold">MCP</span>
        <span className="ml-[1.8px] font-sans font-medium italic opacity-70">Market</span>
        <span aria-hidden="true" className="mx-[6.6px] inline-block h-[18.6px] w-px bg-current opacity-25" />
        <span className="font-mono text-[15px] leading-none font-semibold tracking-[0.12em] uppercase">Hub</span>
      </span>
    </div>
  );
}

export function HubHero() {
  return (
    <section className="design-hero-under-navigation relative overflow-hidden bg-[var(--design-canvas)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ maskImage: HERO_MASK, WebkitMaskImage: HERO_MASK }}
      >
        <div className="design-dither-static absolute inset-0" />
        <HeroDitherShader />
      </div>
      <div className={cn(CONTAINER, "relative z-10")}>
        <div className="py-12 md:py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,440px)] lg:items-center">
            <div>
              <h1 className="mb-6 text-left font-display text-[36px] leading-[40px] font-normal tracking-[-0.05em] text-balance text-foreground sm:text-[48px] sm:leading-[48px] md:text-[60px] md:leading-[60px] lg:text-[72px] lg:leading-[72px]">
                One home for your Agent <span className="text-foreground/40">Skills</span> and{" "}
                <span className="text-foreground/40">MCPs</span>.
              </h1>
              <p className="max-w-xl font-sans text-[15px] leading-[1.65] font-normal tracking-[-0.018em] text-[var(--design-ink-muted)] sm:text-base sm:leading-[24px]">
                Create, version, and sync the skills and tools your agents use. Share them across your whole team.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <GetStartedButton />
              </div>
            </div>
            <div>
              <HubWordmark />
              <ul className="overflow-hidden rounded-lg border border-border bg-card">
                {HERO_ITEMS.map(({ icon: Icon, title, body }, index) => (
                  <li key={title} className={cn("flex items-start gap-4 p-5", index > 0 && "border-t border-border")}>
                    <Icon aria-hidden="true" className={cn("mt-0.5 h-5 w-5 shrink-0", TEAL)} strokeWidth={1.5} />
                    <div>
                      <p className="text-base leading-[24px] font-semibold text-foreground">{title}</p>
                      <p className="mt-0.5 text-sm leading-[20px] text-muted-foreground">{body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface SectionProps {
  readonly children: ReactNode;
  readonly id?: string;
  readonly muted?: boolean;
  /** The hairline gradient the source draws on top of its feature sections. */
  readonly topLine?: boolean;
}

export function HubSection({ children, id, muted = false, topLine = false }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 overflow-hidden border-b border-border py-16 md:py-24",
        muted && "bg-muted/20",
      )}
    >
      {topLine && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,var(--border),transparent)]" />
      )}
      <div className={CONTAINER}>{children}</div>
    </section>
  );
}

interface IntroProps {
  readonly eyebrow?: string;
  readonly title: string;
  readonly body: string;
  readonly narrow?: boolean;
}

export function SectionIntro({ eyebrow, title, body, narrow = false }: IntroProps) {
  return (
    <div className="relative">
      {eyebrow && (
        <p className="mb-4 font-sans text-sm leading-[20px] font-medium tracking-[0.05em] text-muted-foreground uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className={H2}>{title}</h2>
      <p className={cn("mt-4 leading-[1.625] text-muted-foreground", narrow ? "max-w-md" : "max-w-2xl")}>{body}</p>
    </div>
  );
}

export function IconList({ items }: { readonly items: readonly IconItem[] }) {
  return (
    <ul className="border-y border-border">
      {items.map(({ icon: Icon, title, body }, index) => (
        <li key={title} className={cn("flex items-start gap-4 py-5", index > 0 && "border-t border-border")}>
          <Icon aria-hidden="true" className={cn("mt-0.5 h-5 w-5 shrink-0", TEAL)} strokeWidth={1.5} />
          <div>
            <p className="text-base leading-[24px] font-semibold text-foreground">{title}</p>
            <p className="mt-1 text-sm leading-[1.625] text-muted-foreground">{body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function CheckList({ items }: { readonly items: readonly CheckItem[] }) {
  return (
    <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
      {items.map(({ title, body }) => (
        <li key={title} className="flex items-start gap-2.5">
          <CircleCheck aria-hidden="true" className={cn("mt-0.5 h-4 w-4 shrink-0", TEAL)} strokeWidth={1.5} />
          {body ? (
            <div>
              <p className="text-sm leading-[20px] font-medium text-foreground">{title}</p>
              <p className="mt-0.5 text-[13px] leading-[1.625] text-muted-foreground">{body}</p>
            </div>
          ) : (
            <p className="text-sm leading-[1.625] text-foreground">{title}</p>
          )}
        </li>
      ))}
    </ul>
  );
}

interface FeatureSplitProps {
  readonly intro: ReactNode;
  readonly mockup: ReactNode;
  readonly reversed?: boolean;
  readonly columns?: "wide" | "wider";
}

/** Copy column + product mockup; `reversed` puts the mockup first on desktop, as the source does. */
export function FeatureSplit({ intro, mockup, reversed = false, columns = "wide" }: FeatureSplitProps) {
  return (
    <div
      className={cn(
        "grid gap-10 lg:items-center",
        columns === "wide" ? "lg:grid-cols-[0.95fr_1.05fr]" : "lg:grid-cols-[0.9fr_1.1fr]",
        reversed && "lg:[&>*:first-child]:order-2",
      )}
    >
      <div>{intro}</div>
      {mockup}
    </div>
  );
}

export function PricingSection() {
  return (
    <section className="border-b border-border bg-muted/20 py-16 md:py-24">
      <div className={CONTAINER}>
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 font-mono text-sm leading-[20px] tracking-[0.05em] text-muted-foreground uppercase">Pricing</p>
          <h2 className={H2_TIGHT}>Start free. Upgrade for more skills, MCPs, and team controls.</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "flex flex-col rounded-lg border p-6",
                plan.featured
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card",
              )}
            >
              <div className="mb-6">
                <h3 className="font-display text-xl leading-[28px] font-medium tracking-[-0.025em]">{plan.name}</h3>
                <p
                  className={cn(
                    "mt-2 text-3xl leading-[36px] font-semibold tracking-[-0.025em]",
                    plan.featured ? "text-background" : "text-foreground",
                  )}
                >
                  {plan.price}
                </p>
                <p
                  className={cn(
                    "mt-3 text-sm leading-[1.625]",
                    plan.featured ? "text-background/70" : "text-muted-foreground",
                  )}
                >
                  {plan.blurb}
                </p>
              </div>
              <ul className="flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm leading-[20px]">
                    <CircleCheck
                      aria-hidden="true"
                      className={cn("mt-0.5 h-4 w-4 shrink-0", plan.featured ? "text-[#99f6e4]" : TEAL)}
                      strokeWidth={1.5}
                    />
                    <span className={plan.featured ? "text-background/80" : "text-muted-foreground"}>{feature}</span>
                  </li>
                ))}
              </ul>
              {plan.featured ? (
                <Link href={toSiteHref(SIGNUP_URL)} className={cn(SECONDARY_SHELL, "mt-6 h-11")}>
                  <span className={cn(SECONDARY_FACE, "text-sm leading-[20px]")}>{plan.cta}</span>
                </Link>
              ) : (
                <Link href={toSiteHref(SIGNUP_URL)} className={GLASS_BUTTON}>
                  {plan.cta}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HubCta() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-6 text-center md:px-8">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-lg border border-border bg-card">
          <LogoMarkIcon size={30} className="text-foreground" />
        </div>
        <h2 className={H2_TIGHT}>Build your agent skill library.</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-[1.625] text-muted-foreground">
          Create, version, sync, and share the skills and tools your agents use every day.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <GetStartedButton />
          <Link href="/tools/skills" className={cn(SECONDARY_SHELL, "h-12 w-fit")}>
            <span className={cn(SECONDARY_FACE, "text-base leading-[24px]")}>Explore the directory</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
