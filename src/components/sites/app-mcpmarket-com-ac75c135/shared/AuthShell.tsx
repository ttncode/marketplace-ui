import Link from "next/link";
import { cn } from "@/lib/utils";
import styles from "./auth.module.css";
import { AuthSidePanel } from "./AuthSidePanel";
import { HubLockup } from "./HubLockup";

interface AuthShellProps {
  readonly redirect: string;
  readonly children: React.ReactNode;
}

/** Split layout of app.mcpmarket.com's (auth) routes: form column + dotted brand panel from lg up. */
export function AuthShell({ redirect, children }: AuthShellProps) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2" translate="no">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          {/* The source links to app "/", which sends signed-out visitors to /login. */}
          <Link href="/login" className="group inline-flex items-center transition-opacity hover:opacity-80">
            <HubLockup size={32} className="text-foreground" />
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
          <AuthSidePanel redirect={redirect} />
        </div>
      </div>
    </div>
  );
}
