"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { NavIcon } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/icons";

import { NAV_MENUS } from "./site-data";
import type { NavFeatureCard, NavListItem, NavMenu } from "./types";

const CLOSE_DELAY_MS = 150;

const DARK_CARD =
  "group/card relative overflow-hidden rounded-[14px] border border-[rgba(0,0,0,0.2)] text-white bg-[linear-gradient(145deg,rgb(32,32,28),rgb(21,21,18)_48%,rgb(12,12,11))] shadow-[0_10px_24px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-1px_0_rgba(0,0,0,0.45)] transition-[box-shadow,filter,transform,translate,scale,rotate] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]";
const CARD_IMAGE = "object-contain transition-transform duration-300 group-hover/card:scale-[1.035]";
const CARD_TITLE = "text-[14px] leading-[17.5px] font-medium text-white";
const CARD_DESCRIPTION = "mt-1 text-[12px] leading-[16.5px] text-[rgba(255,255,255,0.52)]";

/**
 * Mirrors Radix NavigationMenu motion on the source: the viewport fades/slides 8px
 * in and out, and switching menus slides the old content out and the new one in
 * (208px) toward the direction of travel.
 */
interface PanelState {
  readonly index: number;
  readonly closing: boolean;
  readonly outgoing: { readonly index: number; readonly toEnd: boolean } | null;
}

function nextPanelOnOpen(panel: PanelState | null, index: number): PanelState {
  if (!panel || panel.closing) return { index, closing: false, outgoing: null };
  if (panel.index === index) return panel;
  return { index, closing: false, outgoing: { index: panel.index, toEnd: index > panel.index } };
}

export function NavMegaMenu() {
  const [panel, setPanel] = useState<PanelState | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const openIndex = panel && !panel.closing ? panel.index : null;

  const openMenu = (index: number) => setPanel((current) => nextPanelOnOpen(current, index));
  const closeMenu = () => setPanel((current) => (current ? { ...current, closing: true } : null));
  const cancelClose = () => clearTimeout(closeTimer.current);
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(closeMenu, CLOSE_DELAY_MS);
  };

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  useEffect(() => {
    if (openIndex === null) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [openIndex]);

  return (
    // The panel is a DOM child of this nav so one pointerleave covers triggers + panel.
    <nav aria-label="Main" className="flex items-center" onPointerEnter={cancelClose} onPointerLeave={scheduleClose}>
      <ul className="flex items-center gap-1">
        {NAV_MENUS.map((menu, index) => (
          <li key={menu.label}>
            <NavTrigger
              menu={menu}
              open={openIndex === index}
              onOpen={() => openMenu(index)}
              onToggle={() => (openIndex === index ? closeMenu() : openMenu(index))}
            />
          </li>
        ))}
      </ul>
      {panel && (
        <NavPanel
          panel={panel}
          onExited={() => setPanel((current) => (current?.closing ? null : current))}
          onContentSwapped={() => setPanel((current) => (current ? { ...current, outgoing: null } : null))}
        />
      )}
    </nav>
  );
}

function NavTrigger({
  menu,
  open,
  onOpen,
  onToggle,
}: {
  readonly menu: NavMenu;
  readonly open: boolean;
  readonly onOpen: () => void;
  readonly onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-expanded={open}
      data-icon-trigger=""
      onPointerEnter={onOpen}
      onClick={onToggle}
      className={cn(
        "inline-flex h-10 items-center rounded-[12px] px-4 py-2 font-sans text-[14px] leading-5 font-normal transition-colors duration-150",
        open
          ? "bg-[rgba(10,10,10,0.06)] text-[#0a0a0a]"
          : "bg-transparent text-[#444444] hover:bg-[rgba(10,10,10,0.05)] hover:text-[#0a0a0a]",
      )}
    >
      <span className="flex items-center gap-1.5">
        <NavIcon name={menu.icon} size={14} />
        {menu.label}
      </span>
      <ChevronDown
        size={12}
        aria-hidden="true"
        className={cn("relative top-[1px] ml-1 transition-transform duration-200", open && "rotate-180")}
      />
    </button>
  );
}

function NavPanel({
  panel,
  onExited,
  onContentSwapped,
}: {
  readonly panel: PanelState;
  readonly onExited: () => void;
  readonly onContentSwapped: () => void;
}) {
  const { outgoing } = panel;
  return (
    <div className="absolute top-full right-0 left-0 flex justify-center">
      <div
        onAnimationEnd={(event) => {
          if (event.target === event.currentTarget && panel.closing) onExited();
        }}
        className={cn(
          "relative mx-3 mt-2 h-[240px] flex-1 overflow-hidden rounded-[24px] border border-[rgba(10,10,10,0.12)] bg-[linear-gradient(180deg,#ffffff,#fafafa)] shadow-[var(--design-shadow-navigation)] backdrop-blur-[24px] backdrop-saturate-[0.9] motion-reduce:animate-none",
          panel.closing
            ? "animate-out fade-out slide-out-to-top-2 fill-mode-forwards"
            : "animate-in fade-in slide-in-from-top-2",
        )}
      >
        <NavPanelContent
          key={panel.index}
          menu={NAV_MENUS[panel.index]}
          className={cn(outgoing && (outgoing.toEnd ? "animate-in fade-in slide-in-from-right-52" : "animate-in fade-in slide-in-from-left-52"))}
        />
        {outgoing && (
          <NavPanelContent
            key={`out-${outgoing.index}`}
            menu={NAV_MENUS[outgoing.index]}
            onAnimationEnd={onContentSwapped}
            className={cn(
              "pointer-events-none absolute inset-y-0 left-0 fill-mode-forwards",
              outgoing.toEnd ? "animate-out fade-out slide-out-to-left-52" : "animate-out fade-out slide-out-to-right-52",
            )}
          />
        )}
      </div>
    </div>
  );
}

function NavPanelContent({
  menu,
  className,
  onAnimationEnd,
}: {
  readonly menu: NavMenu;
  readonly className?: string;
  readonly onAnimationEnd?: () => void;
}) {
  return (
    // Wider than the panel on purpose (clipped by overflow-hidden): the source centres the content in the viewport, not the panel.
    <div
      className={cn("w-[calc(100vw-1.5rem)] motion-reduce:animate-none", className)}
      onAnimationEnd={(event) => {
        // Icon animations inside the rows bubble here; only the content's own slide counts.
        if (event.target === event.currentTarget) onAnimationEnd?.();
      }}
    >
      <div className="mx-auto w-full max-w-[1328px] px-6 py-5 lg:max-w-[1344px] lg:px-8">
        <div className="grid grid-cols-[390px_1fr] gap-6 lg:grid-cols-[576px_1fr] lg:gap-8">
          <div className="grid h-[200px] grid-cols-[0.9fr_1.1fr] grid-rows-2 gap-[10px]">
            <HeroCard card={menu.hero} />
            {menu.features.map((card) => (
              <FeatureCard key={card.title} card={card} />
            ))}
          </div>
          <div className="grid h-[200px] grid-cols-2 grid-rows-2 gap-x-4 gap-y-1">
            {menu.links.map((item) => (
              <ListItem key={item.title} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroCard({ card }: { readonly card: NavFeatureCard }) {
  return (
    <a href={card.href} className={cn(DARK_CARD, "row-span-2 flex flex-col items-start p-4")}>
      <div className="flex min-h-0 w-full flex-1 items-center justify-start overflow-hidden">
        <Image src={card.image} alt="" width={80} height={80} className={cn(CARD_IMAGE, "size-20 opacity-75")} />
      </div>
      <div className="w-full min-w-0 pt-3">
        <p className={CARD_TITLE}>{card.title}</p>
        <p className={cn(CARD_DESCRIPTION, "max-w-[210px]")}>{card.description}</p>
      </div>
    </a>
  );
}

function FeatureCard({ card }: { readonly card: NavFeatureCard }) {
  return (
    <a href={card.href} className={cn(DARK_CARD, "grid grid-cols-[62px_1fr] items-center gap-3 p-3")}>
      <div className="flex size-[58px] items-center justify-center overflow-hidden">
        <Image src={card.image} alt="" width={52} height={52} className={cn(CARD_IMAGE, "size-[52px]")} />
      </div>
      <div>
        <p className={CARD_TITLE}>{card.title}</p>
        <p className={cn(CARD_DESCRIPTION, "line-clamp-2")}>{card.description}</p>
      </div>
    </a>
  );
}

function ListItem({ item }: { readonly item: NavListItem }) {
  return (
    <a
      href={item.href}
      data-icon-trigger=""
      className="group flex items-start gap-3 rounded-[12px] p-3 transition-colors duration-150 hover:bg-[#f2f2f2]"
    >
      <span className="flex size-8 shrink-0 items-center justify-center">
        <NavIcon name={item.icon} size={16} className="text-[#616161] group-hover:text-[#0a0a0a]" />
      </span>
      <span className="flex-1 pt-0.5">
        <span className="block text-[14px] leading-[17.5px] font-medium text-[#0a0a0a]">{item.title}</span>
        <span className="mt-0.5 block text-[12px] leading-[19.5px] text-[#616161]">{item.description}</span>
      </span>
    </a>
  );
}
