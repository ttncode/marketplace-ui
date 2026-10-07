"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Menu } from "@base-ui/react/menu";
import { Check, Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { applyPreference, parsePreference, readPreference, writePreference, type ThemePreference } from "@/lib/theme";

const OPTIONS = [
  { value: "system", label: "System", Icon: Monitor },
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
] as const satisfies readonly { value: ThemePreference; label: string; Icon: typeof Sun }[];

const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function choose(preference: ThemePreference) {
  writePreference(preference);
  applyPreference(preference);
  listeners.forEach((listener) => listener());
}

export function ThemeToggle({ className }: { readonly className?: string }) {
  const preference = useSyncExternalStore(subscribe, readPreference, () => "system" as const);

  // Another tab changed the stored value; apply it here too.
  useEffect(() => {
    applyPreference(preference);
  }, [preference]);

  useEffect(() => {
    if (preference !== "system") return;
    const query = matchMedia("(prefers-color-scheme: dark)");
    const follow = () => applyPreference("system");
    query.addEventListener("change", follow);
    return () => query.removeEventListener("change", follow);
  }, [preference]);

  return (
    <Menu.Root>
      <Menu.Trigger
        aria-label="Change theme"
        className={cn(
          "inline-flex size-10 items-center justify-center rounded-[12px] text-ink-secondary transition-colors hover:bg-ink/5 hover:text-ink",
          className,
        )}
      >
        <Sun aria-hidden className="size-[18px] dark:hidden" strokeWidth={1.5} />
        <Moon aria-hidden className="hidden size-[18px] dark:block" strokeWidth={1.5} />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner sideOffset={8} align="end" className="z-[60]">
          <Menu.Popup className="min-w-36 rounded-[12px] border border-border bg-popover p-1 text-sm text-popover-foreground shadow-[var(--design-shadow-floating)]">
            <Menu.RadioGroup value={preference} onValueChange={(value: string) => choose(parsePreference(value))}>
              {OPTIONS.map(({ value, label, Icon }) => (
                <Menu.RadioItem
                  key={value}
                  value={value}
                  className="flex cursor-default items-center gap-2 rounded-[8px] px-2 py-1.5 outline-none data-[highlighted]:bg-accent"
                >
                  <Icon aria-hidden className="size-4" strokeWidth={1.5} />
                  <span className="flex-1">{label}</span>
                  <Menu.RadioItemIndicator>
                    <Check aria-hidden className="size-4" />
                  </Menu.RadioItemIndicator>
                </Menu.RadioItem>
              ))}
            </Menu.RadioGroup>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
