"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { X } from "lucide-react";

import { ANNOUNCEMENT } from "./site-data";

const DISMISSED_KEY = "mcpmarket-announcement-dismissed";

const subscribeToNothing = () => () => {};

function readStoredDismissal(): boolean {
  try {
    return localStorage.getItem(DISMISSED_KEY) === "true";
  } catch {
    // Storage blocked (private mode, sandboxed iframe): keep showing the bar.
    return false;
  }
}

export function AnnouncementBar() {
  // Server snapshot is false so SSR and hydration always render the bar.
  const storedDismissal = useSyncExternalStore(
    subscribeToNothing,
    readStoredDismissal,
    () => false,
  );
  const [dismissedNow, setDismissedNow] = useState(false);

  if (storedDismissal || dismissedNow) return null;

  const dismiss = () => {
    setDismissedNow(true);
    try {
      localStorage.setItem(DISMISSED_KEY, "true");
    } catch {
      // Storage blocked: dismissal lasts for this page view only.
    }
  };

  return (
    <div className="relative z-40 w-full border-b border-[#dbdbdb] bg-[#0a0a0a] font-sans text-base leading-6 text-[#fbfbfb]">
      <div className="mx-auto max-w-[1280px] px-10 py-1.5 sm:px-12">
        <div className="flex h-5 items-center justify-center gap-2 font-mono text-xs leading-4">
          <span className="inline-flex h-5 shrink-0 items-center whitespace-nowrap rounded-full bg-[#fbfbfb] px-2 text-[10px] font-semibold leading-none tracking-[0.05em] text-[#0a0a0a] uppercase">
            {ANNOUNCEMENT.badge}
          </span>
          <Link
            href={ANNOUNCEMENT.href}
            className="whitespace-nowrap underline-offset-2 before:absolute before:inset-0 before:content-[''] hover:underline"
          >
            {ANNOUNCEMENT.label}
          </Link>
          <span className="hidden text-[rgba(251,251,251,0.6)] sm:inline">
            — {ANNOUNCEMENT.description}
          </span>
        </div>
      </div>
      <button
        type="button"
        aria-label="Dismiss banner"
        onClick={dismiss}
        className="absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-[12px] p-1 text-[#fbfbfb] transition-colors duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[rgba(251,251,251,0.1)]"
      >
        <X size={14} strokeWidth={2} />
      </button>
    </div>
  );
}
