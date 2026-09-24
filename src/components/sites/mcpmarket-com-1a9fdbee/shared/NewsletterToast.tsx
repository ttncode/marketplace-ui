"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoMarkIcon } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/icons";
import { NEWSLETTER_TOAST } from "./site-data";

const DISMISSED_KEY = "newsletter-toast-dismissed";
const SHOWN_KEY = "newsletter-toast-shown";
const SHOW_DELAY_MS = 20_000;
const ENTER_DELAY_MS = 100;
const AUTO_HIDE_MS = 10_000;
const UNMOUNT_DELAY_MS = 200;

function readFlag(storage: () => Storage, key: string): boolean {
  try {
    return storage().getItem(key) === "true";
  } catch {
    return false;
  }
}

function writeFlag(storage: () => Storage, key: string): void {
  try {
    storage().setItem(key, "true");
  } catch {
    // Storage blocked (private mode, policy): the toast simply may reappear later.
  }
}

const local = () => window.localStorage;
const session = () => window.sessionStorage;

export function NewsletterToast() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (readFlag(local, DISMISSED_KEY) || readFlag(session, SHOWN_KEY)) return;
    const showTimer = setTimeout(() => {
      writeFlag(session, SHOWN_KEY);
      setVisible(true);
    }, SHOW_DELAY_MS);
    return () => clearTimeout(showTimer);
  }, []);

  // As on the source, opening the newsletter modal from anywhere retires the toast for good.
  useEffect(() => {
    const controller = new AbortController();
    window.addEventListener("open-newsletter-modal", () => writeFlag(local, DISMISSED_KEY), { signal: controller.signal });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const frame = requestAnimationFrame(() => setMounted(true));
    const enterTimer = setTimeout(() => setEntered(true), ENTER_DELAY_MS);
    const hideTimer = setTimeout(() => setLeaving(true), AUTO_HIDE_MS);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(enterTimer);
      clearTimeout(hideTimer);
    };
  }, [visible]);

  // sonner unmounts a removed toast 200ms in, before its 400ms slide-out has finished.
  useEffect(() => {
    if (!leaving) return;
    const unmountTimer = setTimeout(() => setVisible(false), UNMOUNT_DELAY_MS);
    return () => clearTimeout(unmountTimer);
  }, [leaving]);

  if (!visible) return null;

  const dismiss = () => {
    writeFlag(local, DISMISSED_KEY);
    setLeaving(true);
  };

  const join = () => {
    dismiss();
    window.dispatchEvent(new CustomEvent("open-newsletter-modal"));
  };

  // Sonner's toast <li> (opaque bg-background, 356px, 32px from the corner; 16px/20px under 600px) carries the
  // translucent card, so it reads solid white over dark sections. The card inherits sonner's system font stack:
  // its Inter class compiles to a font-weight, not a family.
  return (
    <div
      className={cn(
        "fixed inset-x-4 bottom-5 z-[100] bg-[#fbfbfb] transition-[opacity,translate] duration-400 ease-[ease] motion-reduce:transition-none min-[601px]:right-8 min-[601px]:bottom-8 min-[601px]:left-auto min-[601px]:w-[356px]",
        mounted && !leaving ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
      )}
    >
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "relative flex items-start gap-3 overflow-hidden rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[rgba(255,255,255,0.72)] py-4 pr-12 pl-4 font-[ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,'Helvetica_Neue',Arial,'Noto_Sans',sans-serif] backdrop-blur-[12px] transition-[opacity,transform,translate,scale,rotate] duration-300 ease-out motion-reduce:transition-none sm:py-5 sm:pr-14 sm:pl-5",
          entered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        )}
      >
        <button
          type="button"
          aria-label="Dismiss newsletter toast"
          onClick={dismiss}
          className="absolute top-3 right-3 z-10 inline-flex size-8 items-center justify-center rounded-full text-[#626262] transition-colors duration-150 hover:bg-[#f5f5f5] hover:text-[#0a0a0a] focus-visible:ring-2 focus-visible:ring-[#0a0a0a]/30 focus-visible:outline-none sm:top-4 sm:right-4"
        >
          <X className="size-3.5" aria-hidden="true" />
        </button>
        <div className="shrink-0 pt-0.5">
          <div className="flex size-10 items-center justify-center rounded-xl border border-[rgba(10,10,10,0.14)] bg-[#f5f5f5] text-[#444444]">
            <LogoMarkIcon size={19} />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="m-0 text-[15px] leading-[1.375] font-medium tracking-[-0.018em] text-[#0a0a0a]">
            {NEWSLETTER_TOAST.title}
          </h3>
          <p className="mt-1.5 text-[13px] leading-[1.55] tracking-[-0.01em] text-[#626262]">
            {NEWSLETTER_TOAST.description}
          </p>
          <div className="mt-4 flex">
            <button
              type="button"
              onClick={join}
              className="group/texture-button inline-flex h-8 w-fit items-stretch rounded-[10px] border border-black/10 bg-gradient-to-b from-black/70 to-black p-px font-sans font-normal transition duration-300 ease-in-out focus-visible:ring-2 focus-visible:ring-[#0a0a0a]/30 focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:transition-none"
            >
              <span className="flex h-full w-full items-center justify-center gap-2 rounded-[4px] bg-gradient-to-b from-neutral-800 to-black px-4 py-1 text-xs leading-4 font-normal tracking-[-0.01em] whitespace-nowrap text-white/90 transition-[background-image,color] duration-200 ease-out hover:from-stone-800 hover:to-neutral-800/70 active:from-black active:to-black motion-reduce:transition-none">
                {NEWSLETTER_TOAST.cta}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
