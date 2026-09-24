"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { GithubSubmitForm } from "./GithubSubmitForm";
import { PopularGrid } from "./PopularGrid";
import { RemoteMcpForm } from "./RemoteMcpForm";
import { POPULAR, type SubmissionType } from "./submit-data";

type Source = "github" | "remote";

const TABS: readonly { readonly value: SubmissionType; readonly label: string }[] = [
  { value: "server", label: "MCP Server" },
  { value: "skill", label: "Agent Skill" },
];

const SOURCES: readonly { readonly value: Source; readonly label: string }[] = [
  { value: "github", label: "GitHub repo" },
  { value: "remote", label: "Remote MCP" },
];

const typeFromLocation = (): SubmissionType =>
  new URLSearchParams(window.location.search).get("type") === "skill" ? "skill" : "server";

function TypeTabs({ value, onChange }: { readonly value: SubmissionType; readonly onChange: (next: SubmissionType) => void }) {
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    const next = value === "server" ? "skill" : "server";
    onChange(next);
    document.getElementById(`submit-tab-${next}`)?.focus();
  };
  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      onKeyDown={onKeyDown}
      className="grid h-10 w-full grid-cols-2 items-end justify-center gap-6 overflow-y-hidden border-b border-border bg-transparent text-muted-foreground"
    >
      {TABS.map((tab) => {
        const active = tab.value === value;
        return (
          <button
            key={tab.value}
            id={`submit-tab-${tab.value}`}
            type="button"
            role="tab"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(tab.value)}
            className={cn(
              "-mb-px inline-flex items-center justify-center border-b-2 border-transparent px-0 py-2.5 font-sans text-sm leading-5 font-normal whitespace-nowrap ring-offset-background transition-[border-color,color] focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:outline-none",
              active && "border-foreground text-foreground",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

function SourceSwitch({ value, onChange }: { readonly value: Source; readonly onChange: (next: Source) => void }) {
  return (
    <div role="radiogroup" aria-label="Submission source" className="mb-4 grid grid-cols-2 gap-2 rounded-lg border border-border bg-muted p-1">
      {SOURCES.map((source) => {
        const active = source.value === value;
        return (
          <button
            key={source.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(source.value)}
            className={cn(
              "rounded-md px-3 py-2 text-sm leading-5 font-medium transition-colors",
              active ? "bg-card text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {source.label}
          </button>
        );
      })}
    </div>
  );
}

/**
 * The submit card and the popular listings below it. The MCP/Skill switch lives in the
 * URL (`?type=skill`) as on the source, pushed without a navigation and restored on back/forward.
 */
export function SubmitView({ initialType }: { readonly initialType: SubmissionType }) {
  const [type, setType] = useState(initialType);
  const [source, setSource] = useState<Source>("github");

  useEffect(() => {
    const syncType = () => setType(typeFromLocation());
    window.addEventListener("popstate", syncType);
    return () => window.removeEventListener("popstate", syncType);
  }, []);

  const changeType = (next: SubmissionType) => {
    setType(next);
    window.history.pushState(null, "", next === "skill" ? "/submit?type=skill" : "/submit");
  };

  return (
    <>
      <section className="relative z-20 -mt-8 pb-8 md:-mt-10 md:pb-12">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="mx-auto w-full max-w-xl rounded-2xl border border-[var(--design-surface-glass-line)] bg-[var(--design-surface-glass)] p-4 backdrop-blur-md md:p-5">
            <div className="space-y-4">
              <TypeTabs value={type} onChange={changeType} />
              <div className="w-full">
                {type === "server" ? <SourceSwitch value={source} onChange={setSource} /> : null}
                {type === "server" && source === "remote" ? <RemoteMcpForm /> : <GithubSubmitForm type={type} />}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="flex-1 pt-4 pb-8 md:pt-8 md:pb-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="mx-auto max-w-6xl">
            <PopularGrid section={POPULAR.server} variant="server" hidden={type !== "server"} />
            <PopularGrid section={POPULAR.skill} variant="skill" hidden={type !== "skill"} />
          </div>
        </div>
      </div>
    </>
  );
}
