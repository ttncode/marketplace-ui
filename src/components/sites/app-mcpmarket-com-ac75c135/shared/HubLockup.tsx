import { cn } from "@/lib/utils";

interface HubLockupProps {
  readonly size: number;
  readonly className?: string;
}

/** The app's text lockup "MCP Market | HUB" ("compact" variant); every metric scales with `size`. */
export function HubLockup({ size, className }: HubLockupProps) {
  return (
    <span
      className={cn("inline-flex items-center", className)}
      style={{ lineHeight: 1, letterSpacing: "-0.01em", fontSize: size }}
    >
      <span className="font-[family-name:var(--font-inter)] font-semibold">MCP</span>
      <span
        className="font-[family-name:var(--font-crimson)] font-light italic opacity-72"
        style={{ marginLeft: size * 0.06 }}
      >
        Market
      </span>
      <span
        aria-hidden="true"
        className="inline-block w-px bg-current opacity-25"
        style={{ height: size * 0.62, margin: `0 ${size * 0.22}px` }}
      />
      <span
        className="font-[family-name:var(--font-geist-mono)] leading-none font-semibold tracking-[0.12em] uppercase"
        style={{ fontSize: size * 0.5 }}
      >
        HUB
      </span>
    </span>
  );
}
