"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { CircleCheck, LoaderCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { LEAD_FORMS } from "./site-data";
import type { LeadForm, LeadFormField, OverlayEvent } from "./types";

// ponytail: no backend, so a submit only waits this long before showing success.
const SUBMIT_LATENCY_MS = 800;
const SUCCESS_CLOSE_MS = 2_000;
const TOAST_DURATION_MS = 4_000;
const TOAST_UNMOUNT_DELAY_MS = 200;
const INVALID_EMAIL_MESSAGE = "Please enter a valid email address";

const EMAIL_LOCAL_PART = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~.-]+$/;
const EMAIL_DOMAIN_LABEL = /^[A-Za-z0-9-]+$/;

// Port of the source's validator: stricter than type="email" (it demands a dotted domain), so "a@b" reaches it and fails.
function isValidEmail(value: FormDataEntryValue | null): boolean {
  if (typeof value !== "string") return false;
  const email = value.trim();
  if (!email || email.length > 254 || email.includes(" ")) return false;
  const [local, domain, ...rest] = email.split("@");
  if (rest.length > 0 || !local || !domain || local.length > 64 || domain.length > 253) return false;
  if (local.startsWith(".") || local.endsWith(".") || local.includes("..") || !EMAIL_LOCAL_PART.test(local)) return false;
  if (domain.startsWith("-") || domain.endsWith("-") || domain.includes("..")) return false;
  const labels = domain.split(".");
  return (
    labels.length >= 2 &&
    labels.every(
      (label) => label.length > 0 && label.length <= 63 && !label.startsWith("-") && !label.endsWith("-") && EMAIL_DOMAIN_LABEL.test(label),
    )
  );
}

export function OverlayTrigger({ event, ariaLabel, className, children }: {
  readonly event: OverlayEvent;
  readonly ariaLabel: string;
  readonly className: string;
  readonly children: React.ReactNode;
}) {
  return (
    <button type="button" aria-label={ariaLabel} className={className} onClick={() => window.dispatchEvent(new CustomEvent(event))}>
      {children}
    </button>
  );
}

const LABEL_CLASS = "text-sm leading-5 font-medium";
// v3's space-y-2 put the gap on top of the field, below the inline label's 24px line box; v4's lands on the label and vanishes.
const FIELD_CLASS =
  "mt-2 ring-offset-[#fbfbfb] placeholder:text-[#616161] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50";

function ExtraField({ field, disabled }: { readonly field: LeadFormField; readonly disabled: boolean }) {
  return (
    <div>
      <label htmlFor={field.id} className={LABEL_CLASS}>
        {field.label}
      </label>
      {field.multiline ? (
        <textarea
          id={field.id}
          name={field.id}
          placeholder={field.placeholder}
          disabled={disabled}
          className={`${FIELD_CLASS} flex min-h-[80px] w-full resize-none rounded-md border border-[#d6d6d6] bg-[#fbfbfb] px-3 py-2 text-base leading-6 focus-visible:ring-[#0a0a0a] md:text-sm md:leading-5`}
        />
      ) : (
        <GlassInput id={field.id} type="text" placeholder={field.placeholder} disabled={disabled} />
      )}
    </div>
  );
}

function GlassInput({ ref, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      ref={ref}
      name={props.id}
      {...props}
      className={`${FIELD_CLASS} flex h-10 w-full rounded-lg border border-[#d6d6d6] bg-[var(--design-glass)] px-3 py-2 text-base leading-6 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-200 focus-visible:border-[rgba(10,10,10,0.25)] focus-visible:bg-[var(--design-glass-focus)] focus-visible:ring-[rgba(10,10,10,0.2)] md:text-sm md:leading-5`}
    />
  );
}

type Status = "idle" | "submitting" | "success";

function LeadDialog({ form, open, onClose, onClosed, onError }: {
  readonly form: LeadForm;
  readonly open: boolean;
  readonly onClose: () => void;
  readonly onClosed: () => void;
  readonly onError: (message: string) => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const emailRef = useRef<HTMLInputElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const submitting = status === "submitting";
  const succeeded = status === "success";

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const close = () => {
    clearTimeout(closeTimer.current);
    setStatus("idle");
    onClose();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidEmail(new FormData(event.currentTarget).get(form.emailId))) {
      onError(INVALID_EMAIL_MESSAGE);
      return;
    }
    setStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, SUBMIT_LATENCY_MS));
    setStatus("success");
    closeTimer.current = setTimeout(close, SUCCESS_CLOSE_MS);
  };

  return (
    <Dialog.Root
      open={open}
      modal="trap-focus"
      onOpenChange={(next) => !next && !submitting && close()}
      onOpenChangeComplete={(next) => !next && onClosed()}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/80 data-closed:animate-out data-closed:fade-out-0 data-open:animate-in data-open:fade-in-0" />
        {/* The source's v3 keyframes replace its centring transform with translate(-50%,-48%); here that is a 2% slide on top of it. */}
        <Dialog.Popup
          initialFocus={emailRef}
          className="fixed top-1/2 left-1/2 z-50 grid w-full max-w-lg -translate-1/2 gap-4 border border-[#dbdbdb] bg-[#fbfbfb] p-6 font-sans text-base leading-6 text-[#0a0a0a] outline-none data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-closed:slide-out-to-bottom-[2%] data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-open:slide-in-from-bottom-[2%] sm:max-w-md sm:rounded-lg"
        >
          <div className="flex flex-col space-y-1.5 text-center sm:text-left">
            <Dialog.Title className="font-heading text-lg leading-7 font-semibold tracking-[-0.025em]">
              {succeeded ? form.successTitle : form.title}
            </Dialog.Title>
            <Dialog.Description className="text-sm leading-5 text-[#616161]">
              {succeeded ? form.successDescription : form.description}
            </Dialog.Description>
          </div>
          {succeeded ? (
            <div className="flex flex-col items-center space-y-4 py-6">
              <CircleCheck className="size-12 text-[#22c55e]" aria-hidden="true" />
              <p className="text-center text-sm leading-5 text-[#616161]">{form.successDescription}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor={form.emailId} className={LABEL_CLASS}>
                  Email
                </label>
                <GlassInput ref={emailRef} id={form.emailId} type="email" placeholder="you@company.com" required disabled={submitting} />
              </div>
              {form.fields.map((field) => (
                <ExtraField key={field.id} field={field} disabled={submitting} />
              ))}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={close}
                  disabled={submitting}
                  className="inline-flex h-10 flex-1 items-center justify-center rounded-lg border border-[#d6d6d6] bg-[var(--design-glass)] px-4 py-2 text-sm leading-5 font-normal tracking-[-0.01em] whitespace-nowrap ring-offset-[#fbfbfb] backdrop-blur-xl transition-[background-color,border-color,color,box-shadow,transform,translate,scale] duration-200 hover:border-[rgba(10,10,10,0.25)] hover:bg-[#f7f7f7] focus-visible:ring-2 focus-visible:ring-[rgba(10,10,10,0.3)] focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex flex-1 items-stretch rounded-xl border border-black/10 bg-gradient-to-b from-black/70 to-black p-px font-normal ring-offset-[#fbfbfb] transition duration-300 ease-in-out focus-visible:ring-2 focus-visible:ring-[rgba(10,10,10,0.3)] focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none"
                >
                  <span className="flex h-full w-full items-center justify-center gap-2 rounded-[10px] bg-gradient-to-b from-[#262626] to-black px-4 py-2 text-sm leading-5 tracking-[-0.01em] whitespace-nowrap text-white/90 transition-[background-image,color] duration-200 ease-out hover:from-[#292524] hover:to-[rgba(38,38,38,0.7)] active:from-black active:to-black motion-reduce:transition-none">
                    {submitting ? (
                      <>
                        <LoaderCircle className="mr-2 size-4 animate-spin" aria-hidden="true" />
                        Submitting...
                      </>
                    ) : (
                      form.submitLabel
                    )}
                  </span>
                </button>
              </div>
            </form>
          )}
          <Dialog.Close className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-[#fbfbfb] transition-opacity hover:opacity-100 focus:ring-2 focus:ring-[#0a0a0a] focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
            <X className="size-4" aria-hidden="true" />
            <span className="sr-only">Close</span>
          </Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// Mirrors the source's sonner error toast (unstyled theme, bottom-right, 4 s).
function ErrorToast({ message, onDone }: { readonly message: string; readonly onDone: () => void }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setShown(true));
    const hideTimer = setTimeout(() => setShown(false), TOAST_DURATION_MS);
    const doneTimer = setTimeout(onDone, TOAST_DURATION_MS + TOAST_UNMOUNT_DELAY_MS);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(hideTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <section aria-label="Notifications alt+T" className="fixed right-8 bottom-8 z-[999999999] w-[356px] max-[600px]:inset-x-4 max-[600px]:bottom-5 max-[600px]:w-auto">
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "absolute bottom-0 flex w-full items-center gap-1.5 rounded-[6px] border border-[#dbdbdb] bg-[#fbfbfb] p-4 font-[ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,'Helvetica_Neue',Arial,'Noto_Sans',sans-serif] text-[13px] leading-[1.5] text-[#0a0a0a] transition-[opacity,translate] duration-400 ease-[ease] motion-reduce:transition-none",
          shown ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
        )}
      >
        <div className="relative mr-1 -ml-[3px] flex size-4 items-center">
          <svg viewBox="0 0 20 20" fill="currentColor" className="-ml-px size-5 shrink-0" aria-hidden="true">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
            />
          </svg>
        </div>
        <div className="font-medium">{message}</div>
      </div>
    </section>
  );
}

// Radix's lock, not Base UI's: Base UI keeps a stable scrollbar gutter, which narrows the fixed dialog's containing
// block and shifts it off centre; Radix hides the scrollbar and pads the body instead.
function useBodyScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    const { style } = document.body;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previous = { overflow: style.overflow, marginRight: style.marginRight };
    style.overflow = "hidden";
    style.marginRight = `${scrollbarWidth}px`;
    return () => {
      style.overflow = previous.overflow;
      style.marginRight = previous.marginRight;
    };
  }, [locked]);
}

export function SiteOverlays() {
  const [openEvent, setOpenEvent] = useState<OverlayEvent | null>(null);
  const [scrollLocked, setScrollLocked] = useState(false);
  const [toast, setToast] = useState<{ readonly id: number; readonly message: string } | null>(null);

  useBodyScrollLock(scrollLocked);

  useEffect(() => {
    const controller = new AbortController();
    for (const form of LEAD_FORMS) {
      const open = () => {
        setOpenEvent(form.event);
        setScrollLocked(true);
      };
      window.addEventListener(form.event, open, { signal: controller.signal });
      window.addEventListener(form.aliasEvent, open, { signal: controller.signal });
    }
    return () => controller.abort();
  }, []);

  const showError = useCallback((message: string) => setToast({ id: Date.now(), message }), []);
  const clearToast = useCallback(() => setToast(null), []);
  const closeDialog = useCallback(() => setOpenEvent(null), []);
  const unlockScroll = useCallback(() => setScrollLocked(false), []);

  return (
    <>
      {LEAD_FORMS.map((form) => (
        <LeadDialog
          key={form.event}
          form={form}
          open={openEvent === form.event}
          onClose={closeDialog}
          onClosed={unlockScroll}
          onError={showError}
        />
      ))}
      {toast && <ErrorToast key={toast.id} message={toast.message} onDone={clearToast} />}
    </>
  );
}
