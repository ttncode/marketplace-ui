"use client";

import Link from "next/link";
import { useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { ArrowRight, Check, Loader2, X } from "lucide-react";
import { GithubIcon } from "@/components/sites/mcpmarket-com-1a9fdbee/server-slug-89dc0d19/icons";
import { PRIMARY_FACE, PRIMARY_SHELL } from "@/components/sites/mcpmarket-com-1a9fdbee/tools-skills-slug-229a0ca0/texture-button";
import { cn } from "@/lib/utils";
import {
  CHECKOUT_HREF,
  FormAlert,
  INPUT,
  OfficialBadge,
  SIMULATED_LATENCY_MS,
  ShieldCheckIcon,
  isHttpUrl,
  isValidEmail,
  parseGithubRepo,
  wait,
} from "./form-ui";
import { FORM_COPY, LISTED_REPOS, MESSAGES, type ListedTool, type SubmissionType } from "./submit-data";

type Tier = "paid" | "free";
type Status = "idle" | "error" | "success" | "loading";

// The source's field overrides on top of the shared `Input` look.
const MAIN_FIELD = cn(
  INPUT,
  "h-12 border-border bg-card text-base font-normal shadow-none transition-all placeholder:font-light focus:border-border focus:ring-2 focus:ring-ring/20",
);

function validate(repoUrl: string, email: string, tryNow: string, tier: Tier): string | null {
  if (!repoUrl) return MESSAGES.missingRepo;
  if (!parseGithubRepo(repoUrl)) return MESSAGES.invalidRepo;
  if (!isValidEmail(email)) return MESSAGES.invalidEmail;
  if (tier === "paid" && tryNow && !isHttpUrl(tryNow)) return MESSAGES.invalidTryNow;
  return null;
}

function RadioDot({ selected }: { readonly selected: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-[1.5px] transition-colors",
        selected ? "border-foreground" : "border-muted-foreground/50",
      )}
    >
      {selected ? <span className="size-2.5 rounded-full bg-foreground" /> : null}
    </span>
  );
}

interface TierCardProps {
  readonly selected: boolean;
  readonly disabled: boolean;
  readonly onSelect: () => void;
  readonly children: ReactNode;
}

function TierCard({ selected, disabled, onSelect, children }: TierCardProps) {
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    onSelect();
  };
  return (
    <div
      role="radio"
      aria-checked={selected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      className={cn(
        "cursor-pointer rounded-lg border p-5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        selected ? "border-foreground bg-card" : "border-border bg-muted/50 hover:border-foreground/25",
      )}
    >
      {children}
    </div>
  );
}

function Perk({ kind, children }: { readonly kind: "yes" | "no"; readonly children: ReactNode }) {
  const Icon = kind === "yes" ? Check : X;
  return (
    <li className={cn("flex items-start gap-2.5 text-sm leading-5", kind === "yes" ? "text-foreground" : "text-muted-foreground")}>
      <Icon
        aria-hidden
        className={cn("mt-0.5 size-4 shrink-0", kind === "yes" ? "text-foreground" : "text-muted-foreground/70")}
      />
      {children}
    </li>
  );
}

const TIER_NAME = "font-geist-mono text-[15px] leading-[1.5] font-semibold";
const PRICE = "font-display text-3xl leading-none";
const PRICE_NOTE = "mt-1.5 block font-geist-mono text-[10px] leading-[15px] font-medium tracking-[0.025em] text-muted-foreground uppercase";

interface PaidTierProps {
  readonly selected: boolean;
  readonly disabled: boolean;
  readonly onSelect: () => void;
  readonly tryNow: string;
  readonly onTryNowChange: (value: string) => void;
}

function PaidTier({ selected, disabled, onSelect, tryNow, onTryNowChange }: PaidTierProps) {
  return (
    <TierCard selected={selected} disabled={disabled} onSelect={onSelect}>
      <div className="flex items-start gap-3">
        <RadioDot selected={selected} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn(TIER_NAME, selected ? "text-foreground" : "text-muted-foreground")}>Get Listed Now</span>
            <span
              className={cn(
                "rounded-md px-1.5 py-0.5 font-geist-mono text-[10px] leading-[15px] font-semibold tracking-[0.05em] text-background uppercase transition-colors",
                selected ? "bg-foreground" : "bg-muted-foreground/40",
              )}
            >
              Recommended
            </span>
          </div>
          <p className="mt-1.5 text-[13px] leading-[1.625] text-muted-foreground">
            Put your listing in front of our <b className="font-semibold text-foreground">1M+</b> monthly visitors.
          </p>
        </div>
        <div className={cn("shrink-0 text-right", selected ? "text-foreground" : "text-muted-foreground")}>
          <span className={PRICE}>$29</span>
          <span className={PRICE_NOTE}>one-time</span>
        </div>
      </div>
      <ul className="mt-4 space-y-2.5 pl-8">
        <Perk kind="yes">Listed within 24 hours</Perk>
        <Perk kind="yes">
          <span className="inline-flex items-center gap-1.5">
            <OfficialBadge /> badge on your tile + page
          </span>
        </Perk>
        <Perk kind="yes">Add a “Try Now” link to your own site</Perk>
      </ul>
      {selected ? (
        <div className="mt-4 space-y-2 border-t border-border pt-4" onClick={(event) => event.stopPropagation()}>
          <label htmlFor="affiliate-link" className="flex items-center gap-2 text-sm leading-5 font-medium text-foreground">
            Try Now link <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <input
            id="affiliate-link"
            type="url"
            value={tryNow}
            onChange={(event) => onTryNowChange(event.target.value)}
            placeholder="https://your-product.com/?ref=mcpmarket"
            disabled={disabled}
            className={cn(INPUT, "h-11 border-border bg-card px-4 text-sm leading-5 shadow-none md:text-sm")}
          />
          <p className="text-xs leading-4 text-muted-foreground">Drives clicks from your listing to your site.</p>
        </div>
      ) : null}
    </TierCard>
  );
}

function FreeTier({ selected, disabled, onSelect }: Omit<PaidTierProps, "tryNow" | "onTryNowChange">) {
  return (
    <TierCard selected={selected} disabled={disabled} onSelect={onSelect}>
      <div className="flex items-start gap-3">
        <RadioDot selected={selected} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn(TIER_NAME, selected ? "text-foreground" : "text-muted-foreground")}>Free Queue</span>
          </div>
          <p className="mt-1.5 text-[13px] leading-[1.625] text-muted-foreground">Avg. 4–6 week listing time.</p>
        </div>
        <div className={cn("shrink-0 text-right", PRICE, selected ? "text-foreground" : "text-muted-foreground")}>$0</div>
      </div>
      <ul className="mt-4 space-y-2.5 pl-8">
        <Perk kind="no">No Official badge</Perk>
        <Perk kind="no">Standard placement in listings</Perk>
        <Perk kind="no">No “Try Now” link to your site</Perk>
      </ul>
    </TierCard>
  );
}

function ListedToolCard({ tool }: { readonly tool: ListedTool }) {
  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-[rgba(187,247,208,0.6)] bg-[rgba(240,253,244,0.3)] text-foreground">
      <div className="p-6">
        <div className="flex flex-col items-start gap-4 sm:flex-row">
          <div className="flex-1">
            <h3 className="mb-1 text-lg leading-7 font-medium text-foreground">{tool.name}</h3>
            <p className="mb-3 line-clamp-2 text-sm leading-5 text-muted-foreground">{tool.description}</p>
            <Link
              href={`/server/${encodeURIComponent(tool.slug)}`}
              prefetch={false}
              className="inline-flex items-center gap-1 text-sm leading-5 font-medium text-primary transition-colors hover:text-primary/80"
            >
              View Tool <ArrowRight aria-hidden className="size-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * The GitHub-repo submission (MCP server or skill). No backend: a listed repo answers
 * "already listed" as `/api/tools/check` does, the free queue succeeds, and the paid
 * tier heads for checkout like the source.
 */
export function GithubSubmitForm({ type }: { readonly type: SubmissionType }) {
  const [repoUrl, setRepoUrl] = useState("");
  const [email, setEmail] = useState("");
  const [tryNow, setTryNow] = useState("");
  const [tier, setTier] = useState<Tier>("paid");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [listedTool, setListedTool] = useState<ListedTool | null>(null);
  const busy = status === "loading";
  const copy = FORM_COPY[type];

  const fail = (reason: string) => {
    setStatus("error");
    setMessage(reason);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setListedTool(null);
    const url = repoUrl.trim();
    const error = validate(url, email.trim(), tryNow.trim(), tier);
    if (error) return fail(error);

    setStatus("loading");
    setMessage("");
    await wait(SIMULATED_LATENCY_MS);
    const listed = type === "server" ? LISTED_REPOS[parseGithubRepo(url) ?? ""] : undefined;
    if (listed) {
      setListedTool(listed);
      setStatus("success");
      setMessage(MESSAGES.alreadyListed);
      return;
    }
    if (tier === "paid") {
      window.location.assign(CHECKOUT_HREF);
      return;
    }
    setStatus("success");
    setMessage(MESSAGES.freeQueued);
    setRepoUrl("");
  };

  const selectTier = (next: Tier) => {
    if (!busy) setTier(next);
  };

  return (
    <>
      <form onSubmit={submit} className="space-y-4">
        <div className="relative">
          <GithubIcon className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />
          <input
            id="repo-url"
            type="url"
            value={repoUrl}
            onChange={(event) => setRepoUrl(event.target.value)}
            placeholder={copy.placeholder}
            required
            disabled={busy}
            aria-describedby="url-description"
            className={cn(MAIN_FIELD, "pr-4 pl-12")}
          />
        </div>
        <p id="url-description" className="text-center text-sm leading-5 text-muted-foreground">
          {copy.help}
        </p>
        <input
          id="submitter-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
          disabled={busy}
          aria-label="Email address"
          className={cn(MAIN_FIELD, "px-4")}
        />
        <p className="text-center text-sm leading-5 text-muted-foreground">We&apos;ll email you the moment your listing goes live.</p>
        <div className="flex items-center gap-3 pt-2">
          <span className="font-geist-mono text-xs leading-4 font-semibold tracking-[0.05em] whitespace-nowrap text-muted-foreground uppercase">
            Choose how it goes live
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>
        <div role="radiogroup" aria-label="Listing option" className="space-y-3">
          <PaidTier
            selected={tier === "paid"}
            disabled={busy}
            onSelect={() => selectTier("paid")}
            tryNow={tryNow}
            onTryNowChange={setTryNow}
          />
          <FreeTier selected={tier === "free"} disabled={busy} onSelect={() => selectTier("free")} />
        </div>
        {/* The source's `mt-2` loses to v3's `space-y-4` sibling margin, so it is left out. */}
        <button type="submit" disabled={busy} className={cn(PRIMARY_SHELL, "h-12 text-sm")}>
          <span className={cn(PRIMARY_FACE, "text-sm leading-5")}>
            {busy ? <Loader2 aria-hidden className="mr-2 size-4 animate-spin" /> : null}
            {tier === "paid" ? "Get listed now" : "Submit to free queue"}
            {busy ? null : <ArrowRight aria-hidden className="ml-2 size-4" />}
          </span>
        </button>
        {tier === "paid" ? (
          <p className="flex items-center justify-center gap-1.5 pt-2 text-center text-sm leading-5 text-muted-foreground">
            <ShieldCheckIcon className="size-4 shrink-0" />
            One-time payment · No subscription
          </p>
        ) : null}
      </form>
      {status === "error" || status === "success" ? <FormAlert tone={status} message={message} /> : null}
      {listedTool ? <ListedToolCard tool={listedTool} /> : null}
    </>
  );
}
