"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toSiteHref } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/links";
import { GithubIcon, PackageIcon, ShareIcon } from "./icons";
import { SHARE_TARGETS } from "./share-targets";

const ICON_BUTTON =
  "inline-flex h-7 w-7 items-center justify-center whitespace-nowrap rounded-lg border border-transparent font-sans text-sm font-normal tracking-[-0.01em] text-muted-foreground ring-offset-background transition-colors duration-200 hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2";

interface HeaderActionsProps {
  readonly entityName: string;
  readonly shareUrl: string;
  readonly githubUrl: string | null;
  readonly npmUrl: string | null;
}

export function HeaderActions({ entityName, shareUrl, githubUrl, npmUrl }: HeaderActionsProps) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isShareOpen) return;
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(event.target as Node)) setIsShareOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, [isShareOpen]);

  return (
    <div className="flex items-center gap-1">
      {githubUrl && (
        <Link href={toSiteHref(githubUrl)} title="GitHub" className={ICON_BUTTON}>
          <GithubIcon className="h-4 w-4" />
        </Link>
      )}
      {npmUrl && (
        <Link href={toSiteHref(npmUrl)} title="NPM" className={ICON_BUTTON}>
          <PackageIcon className="h-4 w-4" />
        </Link>
      )}
      <div className="relative" ref={shareRef}>
        <button
          type="button"
          title="Share"
          aria-expanded={isShareOpen}
          onClick={() => setIsShareOpen((open) => !open)}
          className={ICON_BUTTON}
        >
          <ShareIcon className="h-4 w-4" />
        </button>
        {isShareOpen && (
          <div className="absolute top-full right-0 z-10 mt-2 w-fit rounded-lg border border-border bg-card p-3">
            <div className="flex items-center gap-[10px]">
              {SHARE_TARGETS.map((target) => (
                <Link
                  key={target.label}
                  href={toSiteHref(target.buildHref({ url: shareUrl, name: entityName }))}
                  title={target.label}
                  className={target.isLink ? "flex h-8 w-8 items-center justify-center rounded-lg transition-opacity hover:opacity-90" : "cursor-pointer"}
                >
                  <svg viewBox="0 0 64 64" width="25" height="25" aria-hidden="true">
                    <circle cx="32" cy="32" r="32" fill={target.color} />
                    <path d={target.path} fill="white" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
