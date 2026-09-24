"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoMarkIcon, NavIcon } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/icons";
import { MOBILE_NAV_FOOTER_LINKS, MOBILE_NAV_GROUPS } from "./site-data";

const EXIT_DURATION_MS = 300;

const ITEM_CLASS =
  "flex items-center gap-2 rounded-[12px] px-3 py-2.5 font-mono text-[14px]/[20px] font-medium transition-colors duration-150 hover:bg-[#f2f2f2]";
const MUTED_ITEM_CLASS = cn(ITEM_CLASS, "text-[#616161] hover:text-[#0a0a0a]");
const HEADING_CLASS = "px-3 py-2 text-[12px]/[16px] font-semibold tracking-[0.6px] text-[#616161] uppercase";

const subscribeNoop = () => () => {};

function useIsClient(): boolean {
  return useSyncExternalStore(subscribeNoop, () => true, () => false);
}

export function MobileNavSheet({ open, onOpenChange }: { readonly open: boolean; readonly onOpenChange: (open: boolean) => void }) {
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
      if (event.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onOpenChange]);

  if (!isClient || !rendered) return null;

  const close = () => onOpenChange(false);
  const [submitLink, sellLink] = MOBILE_NAV_FOOTER_LINKS;

  return createPortal(
    <>
      <div
        aria-hidden="true"
        onClick={close}
        className={cn(
          "fixed inset-0 z-50 bg-black/80",
          open ? "animate-in fade-in-0 duration-500" : "animate-out fade-out-0 fill-mode-forwards duration-300",
        )}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className={cn(
          "fixed inset-y-0 left-0 z-50 h-full w-[300px] overflow-y-auto border-r border-[#dbdbdb] bg-[#fbfbfb] py-6 pl-6 font-sans text-[16px]/[24px] text-[#0a0a0a] ease-in-out sm:w-[400px] sm:max-w-[384px]",
          open ? "animate-in slide-in-from-left duration-500" : "animate-out slide-out-to-left fill-mode-forwards duration-300",
        )}
      >
        <div className="mb-8 flex items-center gap-2 pt-4">
          <LogoMarkIcon size={28} className="text-[#0a0a0a]" />
          <span className="flex items-baseline text-[18px]/[28px] tracking-[-0.45px]">
            <span className="font-semibold text-[#0a0a0a]">MCP</span>
            <span className="font-medium text-[rgba(10,10,10,0.7)] italic">Market</span>
          </span>
        </div>
        <nav className="flex flex-col gap-1 pr-6">
          {MOBILE_NAV_GROUPS.map((group) => [
            <div key={group.heading} className={HEADING_CLASS}>
              {group.heading}
            </div>,
            ...group.items.map((item) => (
              <a key={item.href} href={item.href} onClick={close} className={ITEM_CLASS}>
                <NavIcon name={item.icon} size={16} className="text-[#616161]" />
                {item.label}
              </a>
            )),
          ])}
          <div className="mx-3 h-px bg-[#dbdbdb]" />
          <a href={submitLink.href} onClick={close} className={MUTED_ITEM_CLASS}>
            <Plus size={16} strokeWidth={1.5} aria-hidden="true" />
            {submitLink.label}
          </a>
          <a href={sellLink.href} onClick={close} className={MUTED_ITEM_CLASS}>
            {sellLink.label}
          </a>
        </nav>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={close}
          className="absolute top-4 right-4 rounded-[12px] text-[#0a0a0a] opacity-70 transition-opacity duration-150 hover:opacity-100 focus-visible:ring-2 focus-visible:ring-[#0a0a0a] focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <X size={16} strokeWidth={2} aria-hidden="true" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </>,
    document.body,
  );
}
