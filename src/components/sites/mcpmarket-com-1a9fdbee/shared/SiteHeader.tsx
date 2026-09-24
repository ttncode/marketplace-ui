"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Menu, Plug } from "lucide-react";

import { cn } from "@/lib/utils";
import { LogoMarkIcon } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/icons";

import { MobileNavSheet } from "./MobileNavSheet";
import { NavMegaMenu } from "./NavMegaMenu";

const EASE_OUT = "duration-300 ease-[cubic-bezier(0,0,0.2,1)]";

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

const isScrolled = () => window.scrollY > 0;
const isScrolledOnServer = () => false;

export function SiteHeader() {
  const scrolled = useSyncExternalStore(subscribeToScroll, isScrolled, isScrolledOnServer);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-[background-color,border-color,padding]",
        EASE_OUT,
        scrolled
          ? "border-[#dbdbdb] bg-[rgba(251,251,251,0.8)] p-0 backdrop-blur-[4px]"
          : "border-transparent bg-transparent px-2 pt-[6px] pb-2 sm:px-3 sm:pt-2 sm:pb-3",
      )}
    >
      <div
        className={cn(
          "relative z-10 w-full px-6 transition-[border-radius,background-color,box-shadow] lg:px-8",
          EASE_OUT,
          scrolled ? "rounded-none" : "design-navigation-surface rounded-[24px]",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-[1280px] items-center justify-between transition-[height]",
            EASE_OUT,
            scrolled ? "h-14" : "h-16",
          )}
        >
          <div className="flex items-center gap-8">
            <Link href="/" className="group flex items-center gap-2">
              <LogoMarkIcon
                size={36}
                className="text-[var(--design-ink)] transition-opacity duration-150 group-hover:opacity-80"
              />
              <div className="hidden items-baseline font-sans text-[24px] leading-8 tracking-[-0.6px] sm:flex">
                <span className="font-semibold text-[#0a0a0a]">MCP</span>
                <span className="font-medium text-[#444444] italic">Market</span>
              </div>
            </Link>
            <div className="hidden items-center md:flex">
              <NavMegaMenu />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/sell"
              className={cn(
                "hidden h-[38px] items-center gap-1.5 rounded-[12px] border px-4 py-2 font-sans text-[14px] leading-5 font-normal transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-[#0a0a0a] md:inline-flex",
                scrolled
                  ? "border-transparent bg-transparent text-[#616161] shadow-none hover:bg-[rgba(242,242,242,0.5)]"
                  : "border-[rgba(10,10,10,0.14)] bg-[rgba(255,255,255,0.78)] text-[#444444] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] hover:border-[rgba(10,10,10,0.28)] hover:bg-[#f7f7f7]",
              )}
            >
              Sell Skills
            </a>
            <a
              href="/hub"
              className="inline-flex h-10 shrink-0 items-stretch rounded-[12px] border border-[rgba(0,0,0,0.1)] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.7),#000)] p-px transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            >
              <span className="flex size-full items-center justify-center gap-2 rounded-[10px] bg-[linear-gradient(to_bottom,#262626,#000)] px-4 py-2 font-sans text-[14px] leading-5 font-normal tracking-[-0.14px] whitespace-nowrap text-[rgba(255,255,255,0.9)] transition-[background-image,color] duration-200 ease-[cubic-bezier(0,0,0.2,1)] hover:bg-[linear-gradient(to_bottom,#292524,rgba(38,38,38,0.7))] active:bg-[linear-gradient(#000,#000)]">
                <Plug size={14} strokeWidth={1.5} className="shrink-0" aria-hidden="true" />
                <span className="hidden lg:inline">Power Your Agents</span>
                <span className="lg:hidden">Connect</span>
              </span>
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex size-10 items-center justify-center rounded-[12px] border border-transparent text-[#444444] transition-colors duration-200 hover:bg-[rgba(10,10,10,0.05)] hover:text-[#0a0a0a] md:hidden"
            >
              <Menu size={20} strokeWidth={1.5} aria-hidden="true" />
              <span className="sr-only">Toggle Menu</span>
            </button>
          </div>
        </div>
      </div>
      <MobileNavSheet open={mobileOpen} onOpenChange={setMobileOpen} />
    </header>
  );
}
