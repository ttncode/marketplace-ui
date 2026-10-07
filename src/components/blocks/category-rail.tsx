"use client";

import { useEffect, useRef, useState } from "react";
import type { LinkRef } from "@/lib/types";

const EDGE_THRESHOLD_PX = 5;

function maskFor(canScrollLeft: boolean, canScrollRight: boolean): string {
  if (canScrollLeft && canScrollRight) {
    return "linear-gradient(90deg, transparent 0, var(--design-ink) 88px, var(--design-ink) calc(100% - 88px), transparent)";
  }
  if (canScrollRight) return "linear-gradient(90deg, var(--design-ink) 0, var(--design-ink) calc(100% - 88px), transparent)";
  if (canScrollLeft) return "linear-gradient(90deg, transparent 0, var(--design-ink) 88px, var(--design-ink))";
  return "none";
}

export function CategoryRail({ links }: { readonly links: readonly LinkRef[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = scroller;
      setCanScrollLeft(scrollLeft > EDGE_THRESHOLD_PX);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - EDGE_THRESHOLD_PX);
    };
    const frame = requestAnimationFrame(update);
    scroller.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      scroller.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const mask = maskFor(canScrollLeft, canScrollRight);

  return (
    <div className="relative w-full">
      <div
        ref={scrollerRef}
        data-can-scroll-left={canScrollLeft}
        data-can-scroll-right={canScrollRight}
        className="scrollbar-hide flex max-w-full gap-2 overflow-x-auto py-3"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      >
        {links.map((link, index) => (
          <a
            key={link.href}
            href={link.href}
            data-active={index === 0 ? "true" : undefined}
            className="h-[26px] shrink-0 whitespace-nowrap rounded-[999px] border border-ink-soft/16 bg-canvas/78 px-3 py-1 font-sans text-[10px] font-medium uppercase leading-4 tracking-[0.055em] text-ink-soft/72 transition-[border-color,background-color,color] duration-[160ms] ease-[ease] hover:border-ink-soft/44 hover:bg-ink hover:text-canvas data-[active=true]:border-ink-soft/44 data-[active=true]:bg-ink data-[active=true]:text-canvas motion-reduce:transition-none"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
