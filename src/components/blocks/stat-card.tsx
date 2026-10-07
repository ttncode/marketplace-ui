import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Stat } from "@/lib/types";
import { cn } from "@/lib/utils";

const TREND = {
  up: { Icon: ArrowUpRight, className: "text-success" },
  down: { Icon: ArrowDownRight, className: "text-destructive" },
  flat: { Icon: ArrowRight, className: "text-ink-muted" },
} as const;

export function StatCard({ stat }: { readonly stat: Stat }) {
  const { Icon, className } = TREND[stat.trend];
  return (
    <div className="rounded-[var(--design-radius-lg)] border border-border bg-surface p-5 shadow-[var(--design-shadow-card)]">
      <p className="text-sm text-ink-muted">{stat.label}</p>
      <p className="mt-2 font-display text-3xl tracking-[-0.03em] text-ink tabular-nums">{stat.value}</p>
      <p className={cn("mt-2 flex items-center gap-1 text-xs font-medium", className)}>
        <Icon aria-hidden className="size-3.5" />
        {stat.change}
      </p>
    </div>
  );
}
