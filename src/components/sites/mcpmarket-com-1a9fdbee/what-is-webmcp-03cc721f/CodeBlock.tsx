"use client";

import { useEffect, useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/sites/mcpmarket-com-1a9fdbee/what-is-an-mcp-server-4bf875ce/icons";

/** How long the source keeps the green check after copying. */
const COPIED_MS = 2000;

export function CodeBlock({ filename, code }: { readonly filename: string; readonly code: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), COPIED_MS);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch (error) {
      console.error("Copy to clipboard failed", error);
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2">
        <span className="font-geist-mono text-xs text-muted-foreground">{filename}</span>
        <button
          type="button"
          title="Copy to clipboard"
          onClick={copy}
          className="rounded-lg p-1.5 transition-colors hover:bg-accent"
        >
          {copied ? (
            <CheckIcon className="h-4 w-4 text-[#10b981]" />
          ) : (
            <CopyIcon className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      </div>
      <div className="group relative">
        <pre className="overflow-x-auto bg-card p-4 font-geist-mono text-sm leading-relaxed text-foreground">{code}</pre>
      </div>
    </div>
  );
}
