import Link from "next/link";
import { cn } from "@/lib/utils";
import styles from "./auth.module.css";

/** The source's shadcn Button, size "lg" (36px, 13px text, 5px radius). */
const BUTTON_BASE =
  "inline-flex h-9 w-full shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[5px] px-4 text-[13px] leading-[1.55] whitespace-nowrap transition-all outline-none disabled:pointer-events-none disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3";

const BUTTON_VARIANTS = {
  default: cn(BUTTON_BASE, styles.bevel, "font-semibold"),
  outline: cn(
    BUTTON_BASE,
    styles.bevelLite,
    "border border-[color:var(--border-strong)] font-medium text-foreground has-[>svg]:px-3.5 disabled:opacity-50",
  ),
  ghost: cn(
    BUTTON_BASE,
    "font-medium text-muted-foreground hover:bg-[color:var(--bg-hover)] hover:text-foreground disabled:opacity-50",
  ),
} as const;

interface AuthButtonProps extends React.ComponentProps<"button"> {
  readonly variant: keyof typeof BUTTON_VARIANTS;
}

export function AuthButton({ variant, className, ...buttonProps }: AuthButtonProps) {
  return <button data-slot="button" className={cn(BUTTON_VARIANTS[variant], className)} {...buttonProps} />;
}

export const SIMULATED_REQUEST_MS = 900;

export function AuthHeading({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-2xl font-medium tracking-tight text-balance text-foreground">{children}</h1>
    </div>
  );
}

export function AuthError({ message }: { readonly message: string | null }) {
  if (!message) return null;
  return <div className="mb-6 rounded-[5px] bg-destructive/10 p-3 text-sm text-destructive">{message}</div>;
}

export function OrDivider() {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
      </div>
    </div>
  );
}

interface FieldProps extends React.ComponentProps<"input"> {
  readonly id: string;
  readonly label: string;
  readonly hint?: string;
}

export function Field({ id, label, hint, ...inputProps }: FieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="flex items-center gap-2 text-sm leading-none font-medium select-none">
        {label}
      </label>
      <input
        id={id}
        data-slot="input"
        className="h-[30px] w-full min-w-0 rounded-[5px] border border-[color:var(--border-strong)] bg-background px-2.5 py-0 text-[12.5px] leading-none transition-[color,border-color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground placeholder:text-[color:var(--text-faint)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        {...inputProps}
      />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

interface SwitchLinkProps {
  readonly prompt: string;
  readonly label: string;
  readonly href: string;
}

export function SwitchLink({ prompt, label, href }: SwitchLinkProps) {
  return (
    <p className="mt-6 text-center text-sm text-muted-foreground">
      {prompt} <AuthLink href={href}>{label}</AuthLink>
    </p>
  );
}

export function AuthLink({ href, children }: { readonly href: string; readonly children: React.ReactNode }) {
  return (
    <Link href={href} className="font-medium text-foreground underline underline-offset-4 hover:text-foreground/80">
      {children}
    </Link>
  );
}
