import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const fieldClassName =
  "w-full rounded-[var(--design-radius-md)] border border-input bg-surface px-3 text-sm text-ink placeholder:text-ink-muted outline-none transition-[border-color,box-shadow] focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input data-slot="input" className={cn(fieldClassName, "h-9", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea data-slot="textarea" className={cn(fieldClassName, "min-h-24 py-2", className)} {...props} />;
}
