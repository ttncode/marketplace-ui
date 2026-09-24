"use client";

import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";

/**
 * The animated WebGL dithering layer the source mounts over every hero's static
 * dither (`HomeDitheringBackground` → `HomeDitheringField` in its bundles).
 * Same library and parameters (@paper-design/shaders-react Dithering); same gating:
 * skipped for reduced motion, Save-Data or < 4 CPU cores, then mounted once the
 * browser is idle *and* the hero is within 240px of the viewport.
 */
const DitheringField = dynamic(
  () =>
    import("@paper-design/shaders-react").then(({ Dithering }) => {
      function HeroDitheringField() {
        return (
          <Dithering
            minPixelRatio={0.5}
            maxPixelCount={750_000}
            colorBack="#f5f5f5"
            colorFront="#5f5f5f52"
            shape="simplex"
            type="4x4"
            size={2}
            speed={0.035}
            scale={0.78}
            offsetY={0.18}
            webGlContextAttributes={{ alpha: true, antialias: false, powerPreference: "low-power", preserveDrawingBuffer: false }}
            style={{ width: "100%", height: "100%" }}
          />
        );
      }
      return HeroDitheringField;
    }),
  { ssr: false },
);

const IDLE_TIMEOUT_MS = 2000;
const IDLE_FALLBACK_MS = 600;
const MIN_CPU_CORES = 4;

/** WebGL can fail (no GPU, context lost); the static dither underneath then stays as-is. */
class ShaderBoundary extends Component<{ readonly children: ReactNode }, { readonly failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function shouldSkipShader(): boolean {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  const lowPower = navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency < MIN_CPU_CORES;
  return reducedMotion || connection?.saveData === true || lowPower;
}

export function HeroDitherShader() {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [idle, setIdle] = useState(false);
  const [nearViewport, setNearViewport] = useState(false);

  useEffect(() => {
    if (shouldSkipShader()) return;

    let idleHandle: number | undefined;
    let fallbackTimer: ReturnType<typeof setTimeout> | undefined;
    if ("requestIdleCallback" in window) {
      idleHandle = window.requestIdleCallback(() => setIdle(true), { timeout: IDLE_TIMEOUT_MS });
    } else {
      fallbackTimer = setTimeout(() => setIdle(true), IDLE_FALLBACK_MS);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setNearViewport(true);
        observer.disconnect();
      },
      { rootMargin: "240px 0px" },
    );
    if (anchorRef.current) observer.observe(anchorRef.current);

    return () => {
      if (idleHandle !== undefined) window.cancelIdleCallback(idleHandle);
      if (fallbackTimer !== undefined) clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={anchorRef} className="absolute inset-0">
      {idle && nearViewport && (
        <div className="absolute inset-0" data-home-dither-shader="">
          <ShaderBoundary>
            <DitheringField />
          </ShaderBoundary>
        </div>
      )}
    </div>
  );
}
