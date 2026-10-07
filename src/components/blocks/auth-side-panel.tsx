import { AuthLockup } from "./auth-lockup";
import type { SiteConfig } from "@/lib/types";

export function AuthSidePanel({ name, logo }: { readonly name: string; readonly logo: SiteConfig["logo"] }) {
  return (
    <div className="max-w-md text-center">
      <div className="flex justify-center text-foreground/90">
        <AuthLockup name={name} logo={logo} size={56} />
      </div>
    </div>
  );
}
