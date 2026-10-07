import { Check } from "lucide-react";
import type { ReactNode, SVGProps } from "react";
import { toSiteHref } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/links";
import { cn } from "@/lib/utils";

/** The source waits on its API here; the clone pauses so the loading state is visible. */
export const SIMULATED_LATENCY_MS = 700;

/** A valid paid submission leaves for Stripe checkout, another website, so the clone lands on the 404. */
export const CHECKOUT_HREF = toSiteHref("https://checkout.stripe.com/");

export const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

// The source's shadcn `Input`; its `shadow-[var(--design-shadow-field)]` never made it into the v3 build.
export const INPUT =
  "flex w-full rounded-lg border border-input bg-[var(--design-glass)] px-3 py-2 text-base leading-6 text-foreground ring-offset-background backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-200 placeholder:text-muted-foreground focus-visible:border-foreground/25 focus-visible:bg-[var(--design-glass-focus)] focus-visible:ring-2 focus-visible:ring-ring/20 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm md:leading-5";

export const TEXTAREA =
  "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base leading-6 text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm md:leading-5";

export const LABEL = "text-sm font-medium text-foreground";

const BUTTON =
  "inline-flex items-center justify-center rounded-lg border font-sans text-sm leading-5 font-normal tracking-[-0.01em] whitespace-nowrap ring-offset-background transition-[background-color,border-color,color,box-shadow,transform,translate,scale,rotate] duration-200 focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";

export const OUTLINE_BUTTON = `${BUTTON} h-9 border-input bg-[var(--design-glass)] px-3 text-foreground backdrop-blur-xl hover:border-foreground/25 hover:bg-[var(--design-surface-subtle)]`;

export const GHOST_ICON_BUTTON = `${BUTTON} size-10 border-transparent text-foreground hover:bg-accent hover:text-accent-foreground`;

export function isHttpUrl(value: string): boolean {
  try {
    const { protocol } = new URL(value);
    return protocol === "https:" || protocol === "http:";
  } catch {
    return false;
  }
}

const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const MAX_EMAIL_LENGTH = 254;
const MAX_LOCAL_PART_LENGTH = 64;

/** The source's email check, rule for rule. */
export function isValidEmail(value: string): boolean {
  const email = value.trim();
  if (email.length === 0 || email.length > MAX_EMAIL_LENGTH || email.includes("..")) return false;
  const at = email.indexOf("@");
  return at >= 1 && at <= MAX_LOCAL_PART_LENGTH && EMAIL_PATTERN.test(email);
}

/** `owner/repo` (lowercase) for an https github.com URL with at least two path segments, else null. */
export function parseGithubRepo(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || (url.hostname !== "github.com" && url.hostname !== "www.github.com")) return null;
    const [owner, repo] = url.pathname.split("/").filter(Boolean);
    return owner && repo ? `${owner}/${repo}`.toLowerCase() : null;
  } catch {
    return null;
  }
}

const ALERT_TONES = {
  error: "border-[rgba(254,202,202,0.6)] bg-[rgba(254,242,242,0.3)] text-[#991b1b]",
  success: "border-[rgba(187,247,208,0.6)] bg-[rgba(240,253,244,0.3)] text-[#166534]",
} as const;

export type AlertTone = keyof typeof ALERT_TONES;

export function FormAlert({ tone, message }: { readonly tone: AlertTone; readonly message: string }) {
  return (
    <div role="alert" className={cn("relative mt-6 w-full rounded-lg border p-4", ALERT_TONES[tone])}>
      <h5 className="mb-1 text-base leading-6 font-medium tracking-[-0.025em]">
        {tone === "success" ? (
          <span className="inline-flex items-center gap-1">
            <Check aria-hidden className="size-4" /> Success
          </span>
        ) : (
          "Error"
        )}
      </h5>
      <div className="text-sm leading-5">{message}</div>
    </div>
  );
}

export function OfficialBadge() {
  return (
    <span className="inline-flex items-center rounded-full border border-[var(--design-ink)] bg-[var(--design-ink)] px-2 py-0.5 font-sans text-[9px] leading-[1.7] font-semibold tracking-[0.055em] text-[var(--design-surface)] uppercase transition-colors hover:bg-[var(--design-ink-secondary)]">
      Official
    </span>
  );
}

export function RequiredMark() {
  return <span className="text-[#ef4444]">*</span>;
}

export function FieldLabel({ htmlFor, children }: { readonly htmlFor?: string; readonly children: ReactNode }) {
  return (
    // The source's label is inline (`leading-none`) inside a 24px line box; a 24px block reads the same.
    <label htmlFor={htmlFor} className={cn(LABEL, "block leading-6")}>
      {children}
    </label>
  );
}

/** lucide `shield-check` as the source ships it (the installed lucide redraws the shield). */
export function ShieldCheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
