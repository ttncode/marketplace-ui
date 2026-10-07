import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const TONES = {
  neutral: "border-border bg-surface-muted text-ink-secondary",
  success: "border-success/30 bg-success/10 text-success-ink",
  warning: "border-warning/30 bg-warning/10 text-warning-ink",
  danger: "border-destructive/30 bg-destructive/10 text-error-ink",
  info: "border-info/30 bg-info/10 text-info-ink",
} as const;

export type BadgeTone = keyof typeof TONES;

export function Badge({ tone = "neutral", className, ...props }: ComponentProps<"span"> & { readonly tone?: BadgeTone }) {
  return (
    <span
      data-slot="badge"
      className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap", TONES[tone], className)}
      {...props}
    />
  );
}
