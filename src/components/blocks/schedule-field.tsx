"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

interface ScheduleFieldProps {
  readonly name: string;
  readonly defaultMode?: "now" | "later";
}

const MODES = [
  { value: "now", label: "Post now" },
  { value: "later", label: "Schedule" },
] as const;

export function ScheduleField({ name, defaultMode = "now" }: ScheduleFieldProps) {
  const [mode, setMode] = useState<"now" | "later">(defaultMode);
  return (
    <fieldset className="space-y-3">
      <legend className="sr-only">When to post</legend>
      <div className="flex gap-2">
        {MODES.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-center gap-2 rounded-[var(--design-radius-md)] border border-border bg-surface px-3 py-2 text-sm has-[:checked]:border-ink has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/40"
          >
            <input type="radio" name={`${name}Mode`} value={option.value} checked={mode === option.value} onChange={() => setMode(option.value)} className="accent-current" />
            {option.label}
          </label>
        ))}
      </div>
      <Input type="datetime-local" name={name} aria-label="Publish date and time" disabled={mode === "now"} required={mode === "later"} className="sm:max-w-64" />
    </fieldset>
  );
}
