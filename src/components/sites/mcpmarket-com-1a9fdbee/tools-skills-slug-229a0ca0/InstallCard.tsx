"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { toSiteHref } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/links";
import { DownloadIcon, ShieldIcon, TerminalIcon } from "./icons";
import { SecurityScanSheet } from "./SecurityScanSheet";
import { PRIMARY_FACE, PRIMARY_SHELL, SECONDARY_FACE, SECONDARY_SHELL } from "./texture-button";

const COPIED_MS = 2000;

const TABS = [
  { value: "download", label: "Download", Icon: DownloadIcon },
  { value: "cli", label: "CLI", Icon: TerminalIcon },
] as const;

type InstallTab = (typeof TABS)[number]["value"];

function DownloadPanel({ href }: { readonly href: string }) {
  return (
    <>
      <p className="text-xs leading-relaxed text-muted-foreground">
        Sync skills to <strong className="font-semibold text-foreground">Claude Cowork</strong>,{" "}
        <strong className="font-semibold text-foreground">Claude Code</strong>,{" "}
        <strong className="font-semibold text-foreground">Codex</strong>, and more.
      </p>
      <Link href={toSiteHref(href)} className={cn(PRIMARY_SHELL, "gap-2 text-sm")}>
        <span className={cn(PRIMARY_FACE, "text-sm")}>
          <DownloadIcon className="h-4 w-4" />
          Download skill
        </span>
      </Link>
    </>
  );
}

function CliPanel({ command }: { readonly command: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), COPIED_MS);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
    } catch {
      // Clipboard permission denied: the source also fails silently here.
    }
  };

  return (
    <>
      <p className="text-xs leading-relaxed text-muted-foreground">Install with one command.</p>
      <div className="group relative flex items-center rounded-lg bg-primary">
        <span className="pl-3 font-geist-mono text-sm text-primary-foreground/60 select-none">$</span>
        <pre className="flex-1 overflow-x-auto py-3 pr-2 pl-2 font-geist-mono text-sm whitespace-nowrap text-primary-foreground [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* The source's preflight gives <code> the stock monospace stack, overriding the pre's Geist Mono. */}
          <code className="font-[ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,'Liberation_Mono','Courier_New',monospace]">{command}</code>
        </pre>
        <button type="button" onClick={copy} title="Copy command" className="shrink-0 rounded-lg p-3 transition-colors hover:bg-primary/80">
          {copied ? (
            <Check aria-hidden="true" className="h-4 w-4 text-[#4ade80]" />
          ) : (
            <Copy aria-hidden="true" className="h-4 w-4 text-primary-foreground/70" />
          )}
        </button>
      </div>
    </>
  );
}

export function InstallCard({
  downloadHref,
  cliCommand,
  hasExistingScan,
}: {
  readonly downloadHref: string;
  readonly cliCommand: string;
  readonly hasExistingScan: boolean;
}) {
  const [tab, setTab] = useState<InstallTab>("download");
  const [scanOpen, setScanOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card text-card-foreground">
      <div className="border-b border-border px-5 py-3">
        <h3 className="font-display text-sm font-semibold tracking-[-0.035em] text-foreground">Install</h3>
      </div>
      <div className="space-y-4 px-5 pt-3 pb-5">
        <div className="w-full">
          <div
            role="tablist"
            aria-orientation="horizontal"
            className="grid h-auto w-full grid-cols-2 items-end justify-center gap-0 overflow-y-hidden rounded-none border-b border-border bg-transparent p-0 text-muted-foreground"
          >
            {TABS.map(({ value, label, Icon }) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={tab === value}
                data-state={tab === value ? "active" : "inactive"}
                onClick={() => setTab(value)}
                className="-mb-px inline-flex items-center justify-center gap-2 rounded-none border-b-2 border-transparent bg-transparent px-0 py-3 font-sans text-sm font-medium whitespace-nowrap shadow-none transition-[border-color,color] focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:outline-none data-[state=active]:border-foreground data-[state=active]:text-foreground"
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
          <div role="tabpanel" className="mt-4 space-y-3">
            {tab === "download" ? <DownloadPanel href={downloadHref} /> : <CliPanel command={cliCommand} />}
          </div>
        </div>
        <div className="border-t border-border pt-4">
          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded={scanOpen}
            onClick={() => setScanOpen(true)}
            className={cn(SECONDARY_SHELL, "gap-2 text-sm")}
          >
            <span className={cn(SECONDARY_FACE, "text-sm")}>
              <ShieldIcon className="h-4 w-4" />
              Security Scan
            </span>
          </button>
        </div>
      </div>
      <SecurityScanSheet open={scanOpen} onOpenChange={setScanOpen} hasExistingScan={hasExistingScan} />
    </div>
  );
}
