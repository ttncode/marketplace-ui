"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent, type InputHTMLAttributes } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { LoaderCircle, Mail, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NOT_FOUND_HREF } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/links";
import { GithubMarkIcon, GoogleIcon, ShieldAlertIcon, ShieldIcon } from "./icons";
import { PRIMARY_FACE, PRIMARY_SHELL } from "./texture-button";

const EXIT_DURATION_MS = 300;
// ponytail: stands in for the Supabase sign-up and scan round-trips the clone has no backend for.
const MOCK_REQUEST_MS = 1200;
const MIN_PASSWORD_LENGTH = 8;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ScanStep = "signin" | "loading" | "scanning" | "results";

const DESCRIPTIONS: Record<ScanStep, string> = {
  signin: "Sign in to scan this skill for security issues",
  loading: "Loading scan results...",
  scanning: "Analyzing skill for security issues...",
  results: "",
};

const OUTLINE_BUTTON =
  "inline-flex h-11 w-full items-center justify-center rounded-lg border border-input bg-[var(--design-glass)] px-8 font-sans text-sm font-normal tracking-[-0.01em] whitespace-nowrap text-foreground backdrop-blur-xl transition-[background-color,border-color,color,box-shadow,transform,translate,scale,rotate] duration-200 hover:border-foreground/25 hover:bg-[var(--design-surface-subtle)] focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:outline-none";

const INPUT =
  "flex h-10 w-full rounded-lg border border-input bg-[var(--design-glass)] px-3 py-2 text-base backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-200 placeholder:text-muted-foreground focus-visible:border-foreground/25 focus-visible:bg-[var(--design-glass-focus)] focus-visible:ring-2 focus-visible:ring-ring/20 focus-visible:ring-offset-2 focus-visible:outline-none md:text-sm";

const subscribeNoop = () => () => {};

function useIsClient(): boolean {
  return useSyncExternalStore(subscribeNoop, () => true, () => false);
}

function validateSignUp(form: FormData): string | null {
  const email = String(form.get("email") ?? "").trim();
  const password = String(form.get("password") ?? "");
  if (!EMAIL_PATTERN.test(email)) return "Please enter a valid email address.";
  if (password.length < MIN_PASSWORD_LENGTH) return "Password must be at least 8 characters.";
  if (password !== form.get("confirm")) return "Passwords do not match.";
  return null;
}

function Field({ id, name, label, ...input }: { readonly id: string; readonly name: string; readonly label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm leading-none font-medium">
        {label}
      </label>
      <input id={id} name={name} required className={INPUT} {...input} />
    </div>
  );
}

function SignUpForm({ onSignedUp }: { readonly onSignedUp: () => void }) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = validateSignUp(new FormData(event.currentTarget));
    setError(message);
    if (message) return;
    setPending(true);
    setTimeout(onSignedUp, MOCK_REQUEST_MS);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Field id="scan-email" name="email" label="Email" type="email" placeholder="you@example.com" autoComplete="email" />
      <Field id="scan-password" name="password" label="Password" type="password" placeholder="Min 8 characters" minLength={MIN_PASSWORD_LENGTH} autoComplete="new-password" />
      <Field id="scan-confirm-password" name="confirm" label="Confirm password" type="password" placeholder="Confirm password" minLength={MIN_PASSWORD_LENGTH} autoComplete="new-password" />
      {error && <p className="text-sm text-[#dc2626]">{error}</p>}
      <button type="submit" disabled={pending} className={PRIMARY_SHELL}>
        <span className={cn(PRIMARY_FACE, "text-base")}>
          {pending ? (
            <>
              <LoaderCircle aria-hidden="true" className="mr-2 h-4 w-4 animate-spin" />
              Signing up...
            </>
          ) : (
            "Sign up & scan"
          )}
        </span>
      </button>
    </form>
  );
}

function SignInOptions({ onSignedUp }: { readonly onSignedUp: () => void }) {
  const [emailOpen, setEmailOpen] = useState(false);

  return (
    <div className="space-y-3">
      <Link href={NOT_FOUND_HREF} className={OUTLINE_BUTTON}>
        <GithubMarkIcon className="mr-2 h-4 w-4" />
        Continue with GitHub
      </Link>
      <Link href={NOT_FOUND_HREF} className={OUTLINE_BUTTON}>
        <GoogleIcon className="mr-2 h-4 w-4" />
        Continue with Google
      </Link>
      <div className="relative py-1">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">or</span>
        </div>
      </div>
      {emailOpen ? (
        <SignUpForm onSignedUp={onSignedUp} />
      ) : (
        <button type="button" onClick={() => setEmailOpen(true)} className={OUTLINE_BUTTON}>
          <Mail aria-hidden="true" className="mr-2 h-4 w-4" />
          Sign up with email
        </button>
      )}
    </div>
  );
}

function ScanResult() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 rounded-lg border border-[#fde68a] bg-[#fffbeb] p-3.5 text-[#b45309]">
        <ShieldAlertIcon className="h-5 w-5 shrink-0" />
        <div className="min-w-0">
          <p className="text-sm font-semibold">Caution</p>
        </div>
      </div>
    </div>
  );
}

function ScanBody({ hasExistingScan }: { readonly hasExistingScan: boolean }) {
  const [step, setStep] = useState<ScanStep>("signin");

  useEffect(() => {
    if (step !== "loading" && step !== "scanning") return;
    const timer = setTimeout(() => setStep("results"), MOCK_REQUEST_MS);
    return () => clearTimeout(timer);
  }, [step]);

  return (
    <>
      <div className="flex flex-col space-y-2 text-center sm:text-left">
        <h2 className="flex items-center gap-2 font-display text-lg font-semibold tracking-[-0.035em] text-foreground">
          <ShieldIcon className="h-5 w-5" />
          Security Scan
        </h2>
        <p className="text-sm text-muted-foreground">{DESCRIPTIONS[step]}</p>
      </div>
      <div className="mt-6 space-y-6">
        {step === "signin" && <SignInOptions onSignedUp={() => setStep(hasExistingScan ? "loading" : "scanning")} />}
        {(step === "loading" || step === "scanning") && (
          <div className="flex items-center justify-center py-12">
            <LoaderCircle aria-hidden="true" className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}
        {step === "results" && <ScanResult />}
      </div>
    </>
  );
}

export function SecurityScanSheet({
  open,
  onOpenChange,
  hasExistingScan,
}: {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly hasExistingScan: boolean;
}) {
  const isClient = useIsClient();
  const [rendered, setRendered] = useState(open);
  const panelRef = useRef<HTMLDivElement>(null);

  if (open && !rendered) setRendered(true);

  useEffect(() => {
    if (open || !rendered) return;
    const timer = setTimeout(() => setRendered(false), EXIT_DURATION_MS);
    return () => clearTimeout(timer);
  }, [open, rendered]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onOpenChange]);

  if (!isClient || !rendered) return null;

  return createPortal(
    <>
      <div
        aria-hidden="true"
        onClick={() => onOpenChange(false)}
        className={cn("fixed inset-0 z-50 bg-black/80", open ? "animate-in fade-in-0" : "animate-out fade-out-0 fill-mode-forwards")}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Security Scan"
        className={cn(
          "fixed inset-y-0 right-0 z-50 h-full w-3/4 gap-4 overflow-y-auto border-l border-border bg-background p-6 font-sans text-foreground shadow-none ease-in-out sm:max-w-md",
          open ? "animate-in slide-in-from-right duration-500" : "animate-out slide-out-to-right fill-mode-forwards duration-300",
        )}
      >
        <ScanBody hasExistingScan={hasExistingScan} />
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 rounded-lg opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none"
        >
          <X aria-hidden="true" className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </>,
    document.body,
  );
}
