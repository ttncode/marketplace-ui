"use client";

import { useId, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { McpTool, ToolParam } from "./types";
import { AccordionRegion } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/AccordionRegion";

const DESCRIPTION_LIMIT = 200;
const VISIBLE_PARAMS = 5;

/** Same transform the source applies to tool names (`firecrawl_scrape` → "Firecrawl Scrape"). */
function toTitle(name: string): string {
  return name
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
    .trim();
}

function ToolDescription({ description }: { readonly description: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = description.length > DESCRIPTION_LIMIT;
  const shown = !isLong || isExpanded ? description : `${description.slice(0, DESCRIPTION_LIMIT)}... `;

  return (
    <div>
      <p className="inline text-sm leading-relaxed text-muted-foreground">
        {shown}
        {isLong && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-1 inline-flex items-center gap-0.5 text-xs font-medium text-primary transition-colors hover:text-primary/80"
          >
            {isExpanded ? "Show less" : "Show more"}
            {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>
        )}
      </p>
    </div>
  );
}

function ParamBadges({ param }: { readonly param: ToolParam }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <code className="font-geist-mono text-sm font-semibold text-foreground">{param.name}</code>
        <span className="inline-flex items-center rounded bg-muted px-1.5 py-0.5 font-geist-mono text-xs font-medium text-muted-foreground">
          {param.type || "any"}
        </span>
      </div>
      {param.required ? (
        <span className="inline-flex items-center rounded-lg border border-border/50 bg-foreground/5 px-2 py-0.5 text-[10px] font-medium text-foreground">
          Required
        </span>
      ) : (
        <span className="inline-flex items-center rounded-lg border border-border/50 bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          Optional
        </span>
      )}
    </>
  );
}

function ParamAccordion({ param }: { readonly param: ToolParam }) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-lg border border-border/50 bg-card/30">
        <h3 className="flex">
          <button
            type="button"
            id={`${id}-trigger`}
            aria-expanded={isOpen}
            aria-controls={`${id}-content`}
            onClick={toggle}
            className="flex flex-1 items-center justify-between px-4 py-3 font-medium transition-colors hover:bg-muted/30 hover:no-underline"
          >
            <div className="mr-2 flex w-full items-center justify-between">
              <ParamBadges param={param} />
            </div>
            <ChevronDown
              aria-hidden="true"
              className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isOpen && "rotate-180")}
            />
          </button>
        </h3>
        <AccordionRegion open={isOpen} id={`${id}-content`} labelledBy={`${id}-trigger`} className="text-sm">
          <div className="px-4 pt-1 pb-3">
            {param.description && (
              <p className="mb-2 text-xs leading-relaxed text-muted-foreground">{param.description}</p>
            )}
            {param.enum && (
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-medium text-foreground">Options:</span>
                {param.enum.map((option) => (
                  <code
                    key={option}
                    className="rounded border border-border bg-background px-1.5 py-0.5 font-geist-mono text-[10px] text-muted-foreground"
                  >
                    {option}
                  </code>
                ))}
              </div>
            )}
          </div>
        </AccordionRegion>
      </div>
    </div>
  );
}

function ParametersSection({ params }: { readonly params: readonly ToolParam[] }) {
  const [isShowingAll, setIsShowingAll] = useState(false);
  if (params.length === 0) return null;
  const hasMore = params.length > VISIBLE_PARAMS;
  const visible = isShowingAll ? params : params.slice(0, VISIBLE_PARAMS);

  return (
    <div className="mt-4">
      <div className="mb-3 flex items-center gap-2">
        <h4 className="text-sm font-medium text-foreground">Parameters</h4>
        <span className="inline-flex items-center rounded bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
          {params.length}
        </span>
      </div>
      <div className="space-y-2">
        {visible.map((param) =>
          param.description || param.enum ? (
            <ParamAccordion key={param.name} param={param} />
          ) : (
            <div key={param.name} className="overflow-hidden rounded-lg border border-border/50 bg-card/30 px-4 py-3">
              <div className="flex w-full items-center justify-between">
                <ParamBadges param={param} />
              </div>
            </div>
          ),
        )}
      </div>
      {hasMore && (
        <button
          type="button"
          onClick={() => setIsShowingAll(!isShowingAll)}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-border/50 bg-card px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-muted/50 hover:text-primary/80"
        >
          {isShowingAll ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          {isShowingAll ? "Show Less" : `Show All (${params.length - VISIBLE_PARAMS} more)`}
        </button>
      )}
    </div>
  );
}

export function ToolsPanel({ tools }: { readonly tools: readonly McpTool[] }) {
  return (
    <div className="space-y-8">
      {tools.map((tool, index) => (
        <div key={tool.name} className="border-b border-border/40 pb-8 last:border-0 last:pb-0">
          <div className="mb-3 flex items-center gap-3">
            <span className="font-geist-mono text-xs text-muted-foreground/40">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="font-sans text-base font-semibold tracking-[-0.02em] text-foreground">{toTitle(tool.name)}</h3>
          </div>
          {tool.description && (
            <div className="mb-4 pl-10">
              <ToolDescription description={tool.description} />
            </div>
          )}
          <div className="pl-10">
            <ParametersSection params={tool.params} />
          </div>
        </div>
      ))}
    </div>
  );
}
