import { SiteLogo } from "@/components/layout/site-logo";
import type { SiteConfig } from "@/lib/types";

export function AuthLockup({ name, logo, size = 32 }: { readonly name: string; readonly logo: SiteConfig["logo"]; readonly size?: number }) {
  return <SiteLogo name={name} logo={logo} size={size} />;
}
