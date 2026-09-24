"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import styles from "./SkillMarkdown.module.css";
import type { SkillDetail } from "./types";

const TABS = [
  { value: "about", label: "About" },
  { value: "skillmd", label: "SKILL.md" },
  { value: "faq", label: "FAQ" },
] as const;

type TabValue = (typeof TABS)[number]["value"];

const ITEM_CLASS = "group flex items-start gap-3 border-l-2 border-border/50 py-2 pl-4 transition-colors hover:border-primary/60";

function NumberedList({ title, items }: { readonly title: string; readonly items: readonly string[] }) {
  return (
    <div>
      <h2 className="mb-4 font-display text-base font-medium tracking-[-0.02em] text-foreground">{title}</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item, index) => (
          <div key={item} className={ITEM_CLASS}>
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

function TabPanel({ skill, tab }: { readonly skill: SkillDetail; readonly tab: TabValue }) {
  switch (tab) {
    case "about":
      return (
        <div className="space-y-8">
          <div>
            <p className="text-[15px] leading-[1.8] text-muted-foreground">{skill.about}</p>
          </div>
          <NumberedList title="Key Features" items={skill.features} />
          <NumberedList title="Use Cases" items={skill.useCases} />
        </div>
      );
    case "skillmd":
      return (
        <div className="overflow-hidden rounded-lg border border-border/60 bg-card/50 text-card-foreground shadow-none backdrop-blur-sm">
          <div className="overflow-hidden px-6 py-6">
            <div className={styles.content} dangerouslySetInnerHTML={{ __html: skill.skillHtml }} />
          </div>
        </div>
      );
    case "faq":
      return (
        <div className="space-y-6">
          {skill.faq.map((entry) => (
            <div key={entry.question} className="group border-l-2 border-border/50 py-2 pl-4 transition-colors hover:border-primary/60">
              <h3 className="mb-2 font-display text-sm font-semibold tracking-[-0.035em] text-foreground">{entry.question}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{entry.answer}</p>
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

export function SkillTabs({ skill }: { readonly skill: SkillDetail }) {
  const [tab, setTab] = useState<TabValue>("about");
  // Radix skips the enter animation on first paint; only user-driven switches animate.
  const [switched, setSwitched] = useState(false);

  const select = (value: TabValue) => {
    setTab(value);
    setSwitched(true);
  };

  return (
    <div className="w-full">
      <div className="mb-6 border-b border-border/40">
        <div className="flex items-center justify-between">
          <div
            role="tablist"
            aria-orientation="horizontal"
            className="inline-flex h-auto w-full items-end justify-start gap-6 overflow-x-auto overflow-y-hidden border-b border-border bg-transparent p-0 text-muted-foreground [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {TABS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                role="tab"
                id={`skill-tab-${value}`}
                aria-selected={tab === value}
                aria-controls={`skill-panel-${value}`}
                data-state={tab === value ? "active" : "inactive"}
                onClick={() => select(value)}
                className="relative -mb-px inline-flex items-center justify-center rounded-none border-0 border-b-2 border-transparent bg-transparent px-0 py-3 font-sans text-xs font-semibold whitespace-nowrap text-muted-foreground shadow-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none data-[state=active]:border-foreground data-[state=active]:text-foreground"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div
        key={tab}
        role="tabpanel"
        id={`skill-panel-${tab}`}
        aria-labelledby={`skill-tab-${tab}`}
        tabIndex={0}
        className={cn(
          "mt-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
          switched && "animate-in duration-300 fade-in-50 slide-in-from-bottom-2",
        )}
      >
        <TabPanel skill={skill} tab={tab} />
      </div>
    </div>
  );
}
