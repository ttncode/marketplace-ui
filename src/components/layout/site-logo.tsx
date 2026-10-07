/* eslint-disable @next/next/no-img-element -- SVG logos need no optimisation */
import type { SiteConfig } from "@/lib/types";

interface SiteLogoProps {
  readonly name: string;
  readonly logo: SiteConfig["logo"];
  readonly size?: number;
  readonly showName?: boolean;
  readonly nameClassName?: string;
}

export function SiteLogo({ name, logo, size = 36, showName = true, nameClassName }: SiteLogoProps) {
  return (
    <span className="flex items-center gap-2">
      <img src={logo.light} alt="" width={size} height={size} className="dark:hidden" />
      <img src={logo.dark} alt="" width={size} height={size} className="hidden dark:block" />
      <span className={showName ? (nameClassName ?? "font-sans text-[24px] leading-8 font-semibold tracking-[-0.6px]") : "sr-only"}>{name}</span>
    </span>
  );
}
