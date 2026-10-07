"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Menu, Plug } from "lucide-react";

import { cn } from "@/lib/utils";
import { SiteLogo } from "@/components/layout/site-logo";
import type { MobileNavGroup, NavMenu, SiteConfig } from "@/lib/types";

import { MobileNavSheet } from "@/components/layout/mobile-nav-sheet";
import { NavMegaMenu } from "@/components/blocks/mega-menu";

const EASE_OUT = "duration-300 ease-[cubic-bezier(0,0,0.2,1)]";

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

const isScrolled = () => window.scrollY > 0;
const isScrolledOnServer = () => false;

interface SiteHeaderProps {
  readonly name: string;
  readonly logo: SiteConfig["logo"];
  readonly nav: readonly NavMenu[];
  readonly mobileNav: readonly MobileNavGroup[];
  readonly actions: SiteConfig["headerActions"];
}

export function SiteHeader({
  name,
  logo,
  nav,
  mobileNav,
  actions,
}: SiteHeaderProps) {
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    isScrolled,
    isScrolledOnServer,
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-[background-color,border-color,padding]",
        EASE_OUT,
        scrolled
          ? "border-border bg-canvas/80 p-0 backdrop-blur-[4px]"
          : "border-transparent bg-transparent px-2 pt-[6px] pb-2 sm:px-3 sm:pt-2 sm:pb-3",
      )}
    >
      <div
        className={cn(
          "relative z-10 w-full px-6 transition-[border-radius,background-color,box-shadow] lg:px-8",
          EASE_OUT,
          scrolled
            ? "rounded-none"
            : "design-navigation-surface rounded-[24px]",
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
              <SiteLogo
                name={name}
                logo={logo}
                markClassName="transition-opacity duration-150 group-hover:opacity-80"
                nameClassName="font-sans text-[24px] leading-8 font-semibold tracking-[-0.6px] max-sm:sr-only sm:inline"
              />
            </Link>
            <div className="hidden items-center md:flex">
              <NavMegaMenu menus={nav} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {actions.secondary && (
              <a
                href={actions.secondary.href}
                className={cn(
                  "hidden h-[38px] items-center gap-1.5 rounded-[12px] border px-4 py-2 font-sans text-[14px] leading-5 font-normal transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-ink md:inline-flex",
                  scrolled
                    ? "border-transparent bg-transparent text-ink-muted shadow-none hover:bg-accent/50"
                    : "border-ink/14 bg-surface/78 text-ink-secondary shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] hover:border-ink/28 hover:bg-surface-subtle",
                )}
              >
                {actions.secondary.label}
              </a>
            )}
            <a
              href={actions.primary.href}
              className="inline-flex h-10 shrink-0 items-stretch rounded-[12px] border border-ink/10 bg-linear-to-b from-ink/70 to-ink p-px transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            >
              <span className="flex size-full items-center justify-center gap-2 rounded-[10px] bg-linear-to-b from-ink/85 to-ink px-4 py-2 font-sans text-[14px] leading-5 font-normal tracking-[-0.14px] whitespace-nowrap text-primary-foreground/90 transition-[background-image,color] duration-200 ease-[cubic-bezier(0,0,0.2,1)] hover:from-ink/85 hover:to-ink/70 active:from-ink active:to-ink">
                <Plug
                  size={14}
                  strokeWidth={1.5}
                  className="shrink-0"
                  aria-hidden="true"
                />
                <span>{actions.primary.label}</span>
              </span>
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex size-10 items-center justify-center rounded-[12px] border border-transparent text-ink-secondary transition-colors duration-200 hover:bg-ink/5 hover:text-ink md:hidden"
            >
              <Menu size={20} strokeWidth={1.5} aria-hidden="true" />
              <span className="sr-only">Toggle Menu</span>
            </button>
          </div>
        </div>
      </div>
      <MobileNavSheet
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        name={name}
        logo={logo}
        groups={mobileNav}
        actions={actions}
      />
    </header>
  );
}
