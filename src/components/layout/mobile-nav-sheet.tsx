"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SiteLogo } from "@/components/layout/site-logo";
import type { MobileNavGroup, SiteConfig } from "@/lib/types";
import { NavIcon } from "@/components/icons/nav-icons";
import { ThemeToggle } from "@/components/blocks/theme-toggle";

const EXIT_DURATION_MS = 300;

const ITEM_CLASS =
  "flex items-center gap-2 rounded-[12px] px-3 py-2.5 font-mono text-[14px]/[20px] font-medium transition-colors duration-150 hover:bg-accent";
const MUTED_ITEM_CLASS = cn(ITEM_CLASS, "text-ink-muted hover:text-ink");
const HEADING_CLASS = "px-3 py-2 text-[12px]/[16px] font-semibold tracking-[0.6px] text-ink-muted uppercase";

const subscribeNoop = () => () => {};

function useIsClient(): boolean {
  return useSyncExternalStore(subscribeNoop, () => true, () => false);
}

interface MobileNavSheetProps {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly name: string;
  readonly logo: SiteConfig["logo"];
  readonly groups: readonly MobileNavGroup[];
  readonly actions: SiteConfig["headerActions"];
}

export function MobileNavSheet({ open, onOpenChange, name, logo, groups, actions }: MobileNavSheetProps) {
  const isClient = useIsClient();
  const [rendered, setRendered] = useState(open);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  if (open && !rendered) setRendered(true);

  useEffect(() => {
    if (open || !rendered) return;
    const timer = setTimeout(() => setRendered(false), EXIT_DURATION_MS);
    return () => clearTimeout(timer);
  }, [open, rendered]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      // An open menu (theme toggle) handles its own Escape.
      if (event.key === "Escape" && !(event.target instanceof Element && event.target.closest('[role="menu"]'))) onOpenChange(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onOpenChange]);

  if (!isClient || !rendered) return null;

  const close = () => onOpenChange(false);

  return createPortal(
    <>
      <div
        aria-hidden="true"
        onClick={close}
        className={cn(
          "fixed inset-0 z-50 bg-overlay",
          open ? "animate-in fade-in-0 duration-500" : "animate-out fade-out-0 fill-mode-forwards duration-300",
        )}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className={cn(
          "fixed inset-y-0 left-0 z-50 h-full w-[300px] overflow-y-auto border-r border-border bg-canvas py-6 pl-6 font-sans text-[16px]/[24px] text-ink ease-in-out sm:w-[400px] sm:max-w-[384px]",
          open ? "animate-in slide-in-from-left duration-500" : "animate-out slide-out-to-left fill-mode-forwards duration-300",
        )}
      >
        <div className="mb-8 pt-4">
          <SiteLogo name={name} logo={logo} size={28} nameClassName="text-[18px]/[28px] font-semibold tracking-[-0.45px]" />
        </div>
        <nav className="flex flex-col gap-1 pr-6">
          {groups.map((group) => [
            <div key={group.heading} className={HEADING_CLASS}>
              {group.heading}
            </div>,
            ...group.items.map((item) => (
              <a key={item.href} href={item.href} onClick={close} className={ITEM_CLASS}>
                <NavIcon name={item.icon} size={16} className="text-ink-muted" />
                {item.label}
              </a>
            )),
          ])}
          <div className="mx-3 h-px bg-border" />
          {actions.secondary && (
            <a href={actions.secondary.href} onClick={close} className={MUTED_ITEM_CLASS}>
              {actions.secondary.label}
            </a>
          )}
          <a href={actions.primary.href} onClick={close} className={MUTED_ITEM_CLASS}>
            {actions.primary.label}
          </a>
        </nav>
        <ThemeToggle className="absolute top-2 right-10 size-8" />
        <button
          ref={closeButtonRef}
          type="button"
          onClick={close}
          className="absolute top-4 right-4 rounded-[12px] text-ink opacity-70 transition-opacity duration-150 hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <X size={16} strokeWidth={2} aria-hidden="true" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </>,
    document.body,
  );
}
