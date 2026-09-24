"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import styles from "./detail.module.css";
import { ToolsPanel } from "./ToolsPanel";
import type { ServerTabsData } from "./types";

/** Sanitised GitHub READMEs, fetched on first open like the source's /api/readme. */
const README_ROOT = "/sites/mcpmarket-com-1a9fdbee/server-slug-89dc0d19/readme";
const README_FAILED_HTML = "<p>Failed to load README content. Please try again later.</p>";

type TabValue = "about" | "readme" | "faq" | "tools";
type ReadmeState = { readonly status: "idle" | "loading" } | { readonly status: "done"; readonly html: string };

const TAB_TRIGGER =
  "relative -mb-px inline-flex items-center justify-center whitespace-nowrap rounded-none border-0 border-b-2 border-transparent bg-transparent px-0 py-3 font-sans text-xs font-semibold text-muted-foreground shadow-none ring-offset-background transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none aria-selected:border-foreground aria-selected:text-foreground";

function SkeletonBar({ className }: { readonly className: string }) {
  return <div aria-hidden="true" className={cn("rounded-md bg-muted motion-safe:animate-pulse motion-reduce:animate-none", className)} />;
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="space-y-2">
        <SkeletonBar className="h-10 w-3/4" />
        <div className="space-y-2">
          <SkeletonBar className="h-4 w-full" />
          <SkeletonBar className="h-4 w-full" />
          <SkeletonBar className="h-4 w-5/6" />
        </div>
      </div>
      <div className="space-y-2">
        <SkeletonBar className="h-6 w-1/3" />
        <div className="space-y-2">
          <SkeletonBar className="h-4 w-full" />
          <SkeletonBar className="h-4 w-full" />
          <SkeletonBar className="h-4 w-4/5" />
        </div>
      </div>
      <div className="space-y-2">
        <SkeletonBar className="h-6 w-1/4" />
        <div className="grid grid-cols-1 gap-2">
          <div className="space-y-2">
            <SkeletonBar className="h-4 w-4/5" />
            <SkeletonBar className="h-4 w-full" />
          </div>
          <div className="space-y-2">
            <SkeletonBar className="h-4 w-3/4" />
            <SkeletonBar className="h-4 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

function NumberedList({ title, items }: { readonly title: string; readonly items: readonly string[] }) {
  return (
    <div>
      <h2 className="mb-4 font-sans text-base font-semibold tracking-[-0.02em] text-foreground">{title}</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item, index) => (
          <div
            key={item}
            className="group flex items-start gap-3 border-l-2 border-border/50 py-2 pl-4 transition-colors hover:border-primary/60"
          >
            <span className="font-geist-mono text-xs leading-relaxed text-muted-foreground/40">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-sm leading-relaxed text-muted-foreground group-hover:text-foreground/80">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutPanel({ data }: { readonly data: ServerTabsData }) {
  return (
    <div className="space-y-8">
      {data.longDescription && (
        <div>
          <p className="text-[15px] leading-[1.8] text-muted-foreground">{data.longDescription}</p>
        </div>
      )}
      {data.features.length > 0 && <NumberedList title="Key Features" items={data.features} />}
      {data.useCases.length > 0 && <NumberedList title="Use Cases" items={data.useCases} />}
    </div>
  );
}

function ReadmePanel({ readme }: { readonly readme: ReadmeState }) {
  return (
    <div
      data-server-detail-card
      className="overflow-hidden rounded-[12px] border border-border/60 bg-card/50 text-card-foreground shadow-none backdrop-blur-sm"
    >
      <div className="p-0">
        <div className="overflow-hidden px-6 py-6">
          {readme.status === "done" ? (
            readme.html ? (
              <div className={styles.readme} dangerouslySetInnerHTML={{ __html: readme.html }} />
            ) : (
              <p className="py-8 text-center text-muted-foreground">No README content available.</p>
            )
          ) : (
            <div className="py-3">
              <LoadingSkeleton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FaqPanel({ data }: { readonly data: ServerTabsData }) {
  return (
    <div className="space-y-6">
      {data.faq.map((item) => (
        <div
          key={item.question}
          className="group border-l-2 border-border/50 py-2 pl-4 transition-colors hover:border-primary/60"
        >
          <h3 className="mb-2 text-sm font-semibold text-foreground">{item.question}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
        </div>
      ))}
    </div>
  );
}

function tabsFor(data: ServerTabsData): readonly { readonly value: TabValue; readonly label: string }[] {
  return [
    { value: "about", label: "About" },
    ...(data.hasReadme ? [{ value: "readme" as const, label: "README" }] : []),
    ...(data.faq.length > 0 ? [{ value: "faq" as const, label: "FAQ" }] : []),
    ...(data.mcpTools.length > 0 ? [{ value: "tools" as const, label: "Tools" }] : []),
  ];
}

export function ServerTabs({ data }: { readonly data: ServerTabsData }) {
  const id = useId();
  const tabs = tabsFor(data);
  const [active, setActive] = useState<TabValue>("about");
  const [readme, setReadme] = useState<ReadmeState>({ status: "idle" });
  const tabRefs = useRef(new Map<TabValue, HTMLButtonElement>());

  const loadReadme = async () => {
    setReadme({ status: "loading" });
    try {
      const response = await fetch(`${README_ROOT}/${data.slug}.html`);
      if (!response.ok) throw new Error(`HTTP ${response.status}: Failed to load README`);
      setReadme({ status: "done", html: await response.text() });
    } catch {
      setReadme({ status: "done", html: README_FAILED_HTML });
    }
  };

  const select = (value: TabValue) => {
    setActive(value);
    if (value === "readme" && readme.status === "idle") void loadReadme();
  };

  // Radix-style roving focus: arrows move and activate, Home/End jump.
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = tabs.findIndex((tab) => tab.value === active);
    const targets: Partial<Record<string, number>> = {
      ArrowRight: (index + 1) % tabs.length,
      ArrowLeft: (index - 1 + tabs.length) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    };
    const nextIndex = targets[event.key];
    if (nextIndex === undefined) return;
    event.preventDefault();
    const next = tabs[nextIndex].value;
    select(next);
    tabRefs.current.get(next)?.focus();
  };

  return (
    <div data-server-detail-tabs className="w-full">
      <div className="mb-6 border-b border-border/40">
        <div className="flex items-center">
          <div
            role="tablist"
            aria-orientation="horizontal"
            onKeyDown={onKeyDown}
            className="inline-flex h-auto w-full items-end justify-start gap-6 overflow-x-auto overflow-y-hidden border-b border-border bg-transparent p-0 text-muted-foreground [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {tabs.map((tab) => (
              <button
                key={tab.value}
                ref={(node) => {
                  if (node) tabRefs.current.set(tab.value, node);
                }}
                type="button"
                role="tab"
                id={`${id}-trigger-${tab.value}`}
                aria-selected={tab.value === active}
                aria-controls={`${id}-content-${tab.value}`}
                tabIndex={tab.value === active ? 0 : -1}
                onClick={() => select(tab.value)}
                className={TAB_TRIGGER}
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
        className="mt-0 ring-offset-background duration-300 animate-in fade-in-50 slide-in-from-bottom-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        {active === "about" && <AboutPanel data={data} />}
        {active === "readme" && <ReadmePanel readme={readme} />}
        {active === "faq" && <FaqPanel data={data} />}
        {active === "tools" && <ToolsPanel tools={data.mcpTools} />}
      </div>
    </div>
  );
}
