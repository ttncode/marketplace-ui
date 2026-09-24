"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "@base-ui/react/menu";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { LOCALES } from "./site-data";

const CURRENT_LOCALE = "en";

// Same rule as the source: the default locale keeps the bare path, others get a prefix (their pages are not cloned, so they 404).
function localeHref(pathname: string, code: string): string {
  return code === CURRENT_LOCALE ? pathname : `/${code}${pathname}`;
}

export function LanguageSwitcher() {
  const pathname = usePathname();

  return (
    <Menu.Root>
      <Menu.Trigger className="inline-flex size-8 cursor-pointer items-center justify-center rounded-[12px] border border-transparent text-[#0a0a0a] transition-colors duration-200 hover:bg-[#f2f2f2]">
        <Globe size={16} strokeWidth={2} aria-hidden="true" />
        <span className="sr-only">Switch language</span>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner side="bottom" align="end" sideOffset={4}
          collisionPadding={0}
          collisionAvoidance={{ side: "flip", align: "shift" }}
          className="z-50"
        >
          <Menu.Popup className="min-w-[120px] origin-[var(--transform-origin)] overflow-hidden rounded-lg border border-[#dbdbdb] bg-white p-1 font-sans text-base leading-6 text-[#0a0a0a] outline-none data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2">
            {LOCALES.map(({ code, label }) => (
              <Menu.LinkItem
                key={code}
                closeOnClick
                render={<Link href={localeHref(pathname, code)} />}
                className={cn(
                  "relative flex w-full cursor-default items-center justify-between rounded-lg px-2 py-1.5 text-sm leading-5 outline-none select-none transition-colors data-highlighted:bg-[#f2f2f2]",
                  code === CURRENT_LOCALE && "bg-[#f2f2f2]",
                )}
              >
                <span>{label}</span>
                {code === CURRENT_LOCALE && <span className="text-xs leading-4 text-[#616161]">✓</span>}
              </Menu.LinkItem>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
