"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { AccordionRegion } from "@/components/ui/accordion-region";
import type { FaqItem } from "@/lib/types";

type TabValue = "overview" | "features" | "use-cases" | "faq";

const TAB_TRIGGER =
  "relative -mb-px inline-flex items-center justify-center whitespace-nowrap rounded-none border-0 border-b-2 border-transparent bg-transparent px-0 py-3 font-sans text-xs font-semibold text-muted-foreground shadow-none ring-offset-background transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none aria-selected:border-foreground aria-selected:text-foreground";

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

function OverviewPanel({ about }: { readonly about: readonly string[] }) {
  return (
    <div className="space-y-4">
      {about.map((paragraph) => (
        <p key={paragraph} className="text-[15px] leading-[1.8] text-muted-foreground">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function FaqPanel({ faq }: { readonly faq: readonly FaqItem[] }) {
  const id = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div>
      {faq.map((item, index) => {
        const isOpen = openIndex === index;
        const triggerId = `${id}-faq-trigger-${index}`;
        const contentId = `${id}-faq-content-${index}`;
        return (
          <div key={item.question} className="border-b border-border/50">
            <h3 className="m-0">
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between py-4 text-left text-sm font-semibold text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {item.question}
                <ChevronDown
                  aria-hidden="true"
                  size={16}
                  strokeWidth={2}
                  className={cn("shrink-0 transition-transform duration-200", isOpen && "rotate-180")}
                />
              </button>
            </h3>
            <AccordionRegion open={isOpen} id={contentId} labelledBy={triggerId}>
              <p className="pb-4 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
            </AccordionRegion>
          </div>
        );
      })}
    </div>
  );
}

const TABS: readonly { readonly value: TabValue; readonly label: string }[] = [
  { value: "overview", label: "Overview" },
  { value: "features", label: "Features" },
  { value: "use-cases", label: "Use cases" },
  { value: "faq", label: "FAQ" },
];

interface ItemTabsProps {
  readonly about: readonly string[];
  readonly features: readonly string[];
  readonly useCases: readonly string[];
  readonly faq: readonly FaqItem[];
}

export function ItemTabs({ about, features, useCases, faq }: ItemTabsProps) {
  const id = useId();
  const tabs = TABS;
  const [active, setActive] = useState<TabValue>("overview");
  const tabRefs = useRef(new Map<TabValue, HTMLButtonElement>());
  const select = setActive;

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
    <div data-item-tabs className="w-full">
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
        {active === "overview" && <OverviewPanel about={about} />}
        {active === "features" && <NumberedList title="Key features" items={features} />}
        {active === "use-cases" && <NumberedList title="Use cases" items={useCases} />}
        {active === "faq" && <FaqPanel faq={faq} />}
      </div>
    </div>
  );
}
