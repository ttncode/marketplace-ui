import { Check } from "lucide-react";
import type { PlatformOption } from "@/lib/types";

interface PlatformPickerProps {
  readonly name: string;
  readonly options: readonly PlatformOption[];
  readonly defaultValue?: readonly string[];
}

export function PlatformPicker({ name, options, defaultValue = [] }: PlatformPickerProps) {
  return (
    <fieldset className="grid gap-2 sm:grid-cols-3">
      <legend className="sr-only">Platforms</legend>
      {options.map((option) => (
        <label
          key={option.id}
          className="flex cursor-pointer items-center justify-between rounded-[var(--design-radius-md)] border border-border bg-surface px-3 py-2.5 text-sm transition-colors hover:bg-surface-subtle has-[:checked]:border-ink has-[:checked]:bg-surface-subtle has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/40"
        >
          <span className="text-ink">{option.label}</span>
          <input type="checkbox" name={name} value={option.id} defaultChecked={defaultValue.includes(option.id)} className="peer sr-only" />
          <Check aria-hidden className="size-4 text-ink opacity-0 peer-checked:opacity-100" />
        </label>
      ))}
    </fieldset>
  );
}
