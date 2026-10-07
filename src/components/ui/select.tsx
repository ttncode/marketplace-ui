import type { ComponentProps } from "react";
import { ChevronDown } from "lucide-react";
import { fieldClassName } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function Select({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <div className={cn("relative", className)}>
      <select data-slot="select" className={cn(fieldClassName, "h-9 appearance-none pr-8")} {...props}>
        {children}
      </select>
      <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-ink-muted" />
    </div>
  );
}
