import Link from "next/link";
import { cn } from "@/lib/utils";
import type { SiteConfig } from "@/lib/types";
import styles from "./auth.module.css";
import { AuthSidePanel } from "./auth-side-panel";
import { AuthLockup } from "./auth-lockup";

interface AuthShellProps {
  readonly name: string;
  readonly logo: SiteConfig["logo"];
  readonly children: React.ReactNode;
}

/** Split layout of the auth routes: form column + dotted brand panel from lg up. */
export function AuthShell({ name, logo, children }: AuthShellProps) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2" translate="no">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="group inline-flex items-center transition-opacity hover:opacity-80">
            <AuthLockup name={name} logo={logo} />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>
      <div className="relative hidden overflow-hidden border-l border-border bg-background/50 lg:block">
        <div
          className={cn(
            styles.gridPattern,
            "pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,white,transparent)]",
          )}
        />
        <div className="absolute inset-0 flex items-center justify-center p-10">
          <AuthSidePanel name={name} logo={logo} />
        </div>
      </div>
    </div>
  );
}
