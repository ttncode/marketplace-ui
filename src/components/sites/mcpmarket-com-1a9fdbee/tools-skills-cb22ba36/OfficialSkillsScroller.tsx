"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { OFFICIAL_SKILLS } from "./skills-landing-data";

const EDGE_THRESHOLD_PX = 4;
const MIN_SCROLL_STEP_PX = 240;
const SCROLL_STEP_RATIO = 0.8;

const ARROW_BUTTON =
  "absolute top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#dbdbdb] bg-white text-[#616161] transition-colors duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[#f2f2f2] hover:text-[#0a0a0a]";

const CHIP =
  "group flex shrink-0 items-center rounded-[12px] border bg-white px-3.5 py-2.5 transition-colors duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]";

export function OfficialSkillsScroller() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const update = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    setCanScrollLeft(scroller.scrollLeft > EDGE_THRESHOLD_PX);
    setCanScrollRight(scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - EDGE_THRESHOLD_PX);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const frame = requestAnimationFrame(update);
    scroller.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      scroller.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollByPage = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const step = Math.max(MIN_SCROLL_STEP_PX, SCROLL_STEP_RATIO * scroller.clientWidth);
    scroller.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {canScrollLeft ? (
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => scrollByPage(-1)}
          className={`${ARROW_BUTTON} left-0 -translate-x-1/2`}
        >
          <ChevronLeft aria-hidden className="size-4" strokeWidth={2} />
        </button>
      ) : null}
      <div ref={scrollerRef} className="scrollbar-hide flex gap-3 overflow-x-auto pb-1">
        {OFFICIAL_SKILLS.map((skill) => (
          <Link
            key={skill.href}
            href={skill.href}
            className={`${CHIP} gap-2.5 border-[#dbdbdb] hover:border-[rgba(10,10,10,0.2)] hover:bg-[rgba(242,242,242,0.5)]`}
          >
            <span className="relative flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-[4px] border border-[#dbdbdb] font-sans text-[10px] leading-[15px] font-medium text-[#616161] uppercase">
              <span>{skill.initials}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={skill.avatar}
                alt=""
                width={24}
                height={24}
                loading="lazy"
                className="absolute inset-0 size-full object-cover"
              />
            </span>
            <span className="font-sans text-sm leading-5 font-medium text-[#0a0a0a]">{skill.label}</span>
          </Link>
        ))}
        <Link
          href="/tools/skills/official"
          className={`${CHIP} gap-1.5 border-dashed border-[#dbdbdb] font-sans text-sm leading-5 text-[#616161] hover:border-[rgba(10,10,10,0.2)] hover:text-[#0a0a0a]`}
        >
          View All
          <ArrowRight
            aria-hidden
            strokeWidth={2}
            className="size-3.5 transition-transform duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-0.5"
          />
        </Link>
      </div>
      {canScrollRight ? (
        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => scrollByPage(1)}
          className={`${ARROW_BUTTON} right-0 translate-x-1/2`}
        >
          <ChevronRight aria-hidden className="size-4" strokeWidth={2} />
        </button>
      ) : null}
    </div>
  );
}
