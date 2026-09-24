"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Radix Accordion content timing on the source: `accordion-down/up 0.2s ease-out`. */
const DURATION_MS = 200;
const EASING = "ease-out";

/**
 * Collapsible accordion panel that animates its height like the source's Radix
 * `AccordionContent`: 0 → content height on open, back to 0 on close, then unmounts.
 * Uses the Web Animations API with the measured height; a CSS keyframe reading a
 * custom property set in a layout effect resolves too late and jumps instead.
 * A panel that is already open on first render does not animate (as in Radix).
 */
export function AccordionRegion({
  open,
  id,
  labelledBy,
  className,
  children,
}: {
  readonly open: boolean;
  readonly id: string;
  readonly labelledBy: string;
  readonly className?: string;
  readonly children: ReactNode;
}) {
  const regionRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const isFirstRun = useRef(true);
  const [rendered, setRendered] = useState(open);
  const [wasOpen, setWasOpen] = useState(open);

  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setRendered(true);
  }

  useLayoutEffect(() => {
    const region = regionRef.current;
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (!region) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reducedMotion ? 0 : DURATION_MS;
    // Fractional heights (e.g. 61.5px) avoid the half-pixel snap that integer scrollHeight causes.
    const currentHeight = region.getBoundingClientRect().height;
    const from = animationRef.current ? `${currentHeight}px` : open ? "0px" : `${currentHeight}px`;
    animationRef.current?.cancel();

    const to = open ? `${region.getBoundingClientRect().height}px` : "0px";
    const animation = region.animate([{ height: from }, { height: to }], {
      duration,
      easing: EASING,
      fill: open ? "none" : "forwards",
    });
    animationRef.current = animation;
    animation.onfinish = () => {
      animationRef.current = null;
      if (!open) setRendered(false);
    };
  }, [open]);

  if (!rendered) return null;
  return (
    <div ref={regionRef} id={id} role="region" aria-labelledby={labelledBy} className={cn("overflow-hidden", className)}>
      {children}
    </div>
  );
}
