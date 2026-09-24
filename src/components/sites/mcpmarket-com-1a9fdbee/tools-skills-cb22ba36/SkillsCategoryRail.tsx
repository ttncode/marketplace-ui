"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const EDGE_THRESHOLD_PX = 5;

const CATEGORY_NAMES = [
  "Productivity & Workflow",
  "Security & Testing",
  "Data Science & ML",
  "Developer Tools",
  "Design Tools",
  "Collaboration Tools",
  "API Development",
  "Learning & Documentation",
  "Marketing Automation",
  "Deployment & DevOps",
  "Analytics & Monitoring",
  "Content Management",
  "Cloud Infrastructure",
  "Database Management",
  "Mobile Development",
  "E-commerce Solutions",
  "Web Scraping & Data Collection",
  "Social Media Management",
  "Game Development",
  "Browser Automation",
] as const;

const toSlug = (name: string) => name.toLowerCase().replace(/&/g, "").replace(/[^a-z0-9]+/g, "-");

const RAIL_LINKS = [
  { label: "All", href: "/tools/skills/categories" },
  ...CATEGORY_NAMES.map((name) => ({ label: name, href: `/tools/skills/categories/${toSlug(name)}` })),
];

function maskFor(canScrollLeft: boolean, canScrollRight: boolean): string {
  if (canScrollLeft && canScrollRight) {
    return "linear-gradient(90deg, transparent 0, #000 88px, #000 calc(100% - 88px), transparent)";
  }
  if (canScrollRight) return "linear-gradient(90deg, #000 0, #000 calc(100% - 88px), transparent)";
  if (canScrollLeft) return "linear-gradient(90deg, transparent 0, #000 88px, #000)";
  return "none";
}

/** The homepage rail with the skills categories (links into /tools/skills/categories). */
export function SkillsCategoryRail() {
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
        {RAIL_LINKS.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            data-active={index === 0 ? "true" : undefined}
            className="h-[26px] shrink-0 whitespace-nowrap rounded-[999px] border border-[rgba(34,34,34,0.16)] bg-[rgba(250,250,250,0.78)] px-3 py-1 font-sans text-[10px] font-medium uppercase leading-4 tracking-[0.055em] text-[rgba(34,34,34,0.72)] transition-[border-color,background-color,color] duration-[160ms] ease-[ease] hover:border-[rgba(34,34,34,0.44)] hover:bg-[#0a0a0a] hover:text-white data-[active=true]:border-[rgba(34,34,34,0.44)] data-[active=true]:bg-[#0a0a0a] data-[active=true]:text-white motion-reduce:transition-none"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
