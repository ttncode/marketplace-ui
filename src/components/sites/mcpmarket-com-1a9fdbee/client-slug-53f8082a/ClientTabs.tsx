"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import type { McpClient } from "./types";

const TABS = [
  { value: "about", label: "About" },
  { value: "readme", label: "README" },
  { value: "faq", label: "FAQ" },
] as const;

type TabValue = (typeof TABS)[number]["value"];

/** Roughly how long the source's /api/readme round-trip keeps its skeleton on screen. */
const README_FETCH_MS = 400;

const TRIGGER =
  "relative -mb-px inline-flex items-center justify-center whitespace-nowrap rounded-none border-b-2 border-transparent bg-transparent px-0 py-3 font-sans text-xs font-semibold text-muted-foreground shadow-none ring-offset-background transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none aria-selected:border-foreground aria-selected:text-foreground";

const ROW =
  "group flex items-start gap-3 border-l-2 border-border/50 py-2 pl-4 transition-colors hover:border-primary/60";

function NumberedList({ title, items }: { readonly title: string; readonly items: readonly string[] }) {
  return (
    <div>
      <h2 className="mb-4 font-sans text-base font-semibold tracking-[-0.02em] text-foreground">{title}</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item, index) => (
          <div key={item} className={ROW}>
            <span className="font-mono text-xs leading-relaxed text-muted-foreground/40">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-sm leading-relaxed text-muted-foreground group-hover:text-foreground/80">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Skeleton({ className }: { readonly className: string }) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} />;
}

function SkeletonLines({ widths }: { readonly widths: readonly string[] }) {
  return (
    <div className="space-y-2">
      {widths.map((width, index) => (
        <Skeleton key={index} className={cn("h-4", width)} />
      ))}
    </div>
  );
}

function ReadmeSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-10 w-3/4" />
        <SkeletonLines widths={["w-full", "w-full", "w-5/6"]} />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-1/3" />
        <SkeletonLines widths={["w-full", "w-full", "w-4/5"]} />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-1/4" />
        <div className="grid grid-cols-1 gap-2">
          <SkeletonLines widths={["w-4/5", "w-full"]} />
          <SkeletonLines widths={["w-3/4", "w-full"]} />
        </div>
      </div>
    </div>
  );
}

/**
 * The source fetches the README from its own API, which answers 403 outside a
 * verified browser session; the live page therefore shows its skeleton and
 * then this failure message. Reproduced as observed.
 */
function ReadmePanel({ loading }: { readonly loading: boolean }) {
  return (
    <div
      data-server-detail-card=""
      className="overflow-hidden rounded-xl border border-border/60 bg-card/50 text-card-foreground shadow-none backdrop-blur-sm"
    >
      <div className="overflow-hidden px-6 py-6">
        {loading ? (
          <div className="py-3">
            <ReadmeSkeleton />
          </div>
        ) : (
          <div className="w-full max-w-none overflow-x-auto text-sm leading-[1.625] text-muted-foreground">
            <p>Failed to load README content. Please try again later.</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface PanelContentProps {
  readonly tab: TabValue;
  readonly client: McpClient;
  readonly readmeLoading: boolean;
}

function PanelContent({ tab, client, readmeLoading }: PanelContentProps) {
  switch (tab) {
    case "about":
      return (
        <div className="space-y-8">
          <div>
            <p className="text-[15px] leading-[1.8] text-muted-foreground">{client.longDescription}</p>
          </div>
          <NumberedList title="Key Features" items={client.features} />
          <NumberedList title="Use Cases" items={client.useCases} />
        </div>
      );
    case "readme":
      return <ReadmePanel loading={readmeLoading} />;
    case "faq":
      return (
        <div className="space-y-6">
          {client.faq.map((item) => (
            <div key={item.question} className="group border-l-2 border-border/50 py-2 pl-4 transition-colors hover:border-primary/60">
              <h3 className="mb-2 font-display text-sm font-semibold tracking-[-0.035em] text-foreground">{item.question}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </div>
      );
    default: {
      const exhaustive: never = tab;
      return exhaustive;
    }
  }
}

export function ClientTabs({ client }: { readonly client: McpClient }) {
  const id = useId();
  const [active, setActive] = useState<TabValue>("about");
  // The source fetches the README once, on the first visit to its tab, and keeps the result.
  const [readmeLoaded, setReadmeLoaded] = useState(false);
  // Radix skips the enter animation for the tab that is active on first render.
  const [animate, setAnimate] = useState(false);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (active !== "readme" || readmeLoaded) return;
    const timer = setTimeout(() => setReadmeLoaded(true), README_FETCH_MS);
    return () => clearTimeout(timer);
  }, [active, readmeLoaded]);

  const select = (value: TabValue) => {
    if (value === active) return;
    setActive(value);
    setAnimate(true);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    const current = TABS.findIndex((tab) => tab.value === active);
    let next: number | undefined;
    if (step !== undefined) next = (current + step + TABS.length) % TABS.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = TABS.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    triggers.current[next]?.focus();
    select(TABS[next].value);
  };

  return (
    <div className="w-full">
      <div className="mb-6 border-b border-border/40">
        <div className="flex items-center">
          <div
            role="tablist"
            aria-orientation="horizontal"
            onKeyDown={handleKeyDown}
            className="inline-flex h-auto w-full items-end justify-start gap-6 overflow-x-auto overflow-y-hidden border-b border-border bg-transparent p-0 text-muted-foreground scrollbar-hide"
          >
            {TABS.map((tab, index) => (
              <button
                key={tab.value}
                ref={(node) => {
                  triggers.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`${id}-trigger-${tab.value}`}
                aria-selected={active === tab.value}
                aria-controls={`${id}-content-${tab.value}`}
                tabIndex={active === tab.value ? 0 : -1}
                onMouseDown={(event) => {
                  if (event.button === 0 && !event.ctrlKey) select(tab.value);
                }}
                onClick={() => select(tab.value)}
                className={TRIGGER}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div
        key={active}
        role="tabpanel"
        id={`${id}-content-${active}`}
        aria-labelledby={`${id}-trigger-${active}`}
        tabIndex={0}
        className={cn(
          "mt-0 ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
          animate && "animate-in duration-300 fade-in-50 slide-in-from-bottom-2",
        )}
      >
        <PanelContent tab={active} client={client} readmeLoading={!readmeLoaded} />
      </div>
    </div>
  );
}
