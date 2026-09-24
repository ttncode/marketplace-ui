"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Globe, Loader2, Plus, X } from "lucide-react";
import { PRIMARY_FACE, PRIMARY_SHELL } from "@/components/sites/mcpmarket-com-1a9fdbee/tools-skills-slug-229a0ca0/texture-button";
import { cn } from "@/lib/utils";
import {
  CHECKOUT_HREF,
  FieldLabel,
  FormAlert,
  GHOST_ICON_BUTTON,
  INPUT,
  LABEL,
  OUTLINE_BUTTON,
  OfficialBadge,
  RequiredMark,
  SIMULATED_LATENCY_MS,
  ShieldCheckIcon,
  TEXTAREA,
  isHttpUrl,
  wait,
} from "./form-ui";
import { REMOTE_CATEGORIES, REMOTE_LIMITS, REMOTE_MESSAGES } from "./submit-data";

type Status = "idle" | "error" | "loading";

interface Faq {
  readonly question: string;
  readonly answer: string;
}

interface RemoteFields {
  readonly name: string;
  readonly endpoint: string;
  readonly description: string;
  readonly categories: readonly string[];
  readonly website: string;
  readonly tryNow: string;
  readonly email: string;
}

const EMPTY_FAQ: Faq = { question: "", answer: "" };
const FIELD = cn(INPUT, "h-11");

/** The source checks fields in this order and reports only the first problem. */
function validateRemote(fields: RemoteFields): string | null {
  if (!fields.name.trim()) return REMOTE_MESSAGES.name;
  if (!fields.endpoint.trim() || !isHttpUrl(fields.endpoint.trim())) return REMOTE_MESSAGES.endpoint;
  if (!fields.description.trim()) return REMOTE_MESSAGES.description;
  if (fields.categories.length === 0) return REMOTE_MESSAGES.categories;
  if (fields.website.trim() && !isHttpUrl(fields.website.trim())) return REMOTE_MESSAGES.website;
  if (fields.tryNow.trim() && !isHttpUrl(fields.tryNow.trim())) return REMOTE_MESSAGES.tryNow;
  if (!fields.email.trim()) return REMOTE_MESSAGES.email;
  return null;
}

const replaceAt = <T,>(items: readonly T[], index: number, value: T): T[] =>
  items.map((item, position) => (position === index ? value : item));

const removeAt = <T,>(items: readonly T[], index: number): T[] =>
  items.length <= 1 ? [...items] : items.filter((_, position) => position !== index);

interface CategoryPickerProps {
  readonly selected: readonly string[];
  readonly disabled: boolean;
  readonly onToggle: (category: string) => void;
}

function CategoryPicker({ selected, disabled, onToggle }: CategoryPickerProps) {
  return (
    <div className="space-y-2">
      <FieldLabel>
        Categories <RequiredMark />{" "}
        <span className="font-normal text-muted-foreground">(up to {REMOTE_LIMITS.categories})</span>
      </FieldLabel>
      <div className="flex flex-wrap gap-2">
        {REMOTE_CATEGORIES.map((category) => {
          const isSelected = selected.includes(category);
          const isFull = !isSelected && selected.length >= REMOTE_LIMITS.categories;
          return (
            <button
              key={category}
              type="button"
              onClick={() => onToggle(category)}
              disabled={disabled || isFull}
              aria-pressed={isSelected}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm leading-5 transition-colors",
                isSelected
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card text-muted-foreground hover:border-foreground/40",
                isFull && "cursor-not-allowed opacity-40",
              )}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface RepeaterProps<T> {
  readonly items: readonly T[];
  readonly disabled: boolean;
  readonly onChange: (items: T[]) => void;
}

function UseCases({ items, disabled, onChange }: RepeaterProps<string>) {
  return (
    <div className="space-y-2">
      <FieldLabel>Use cases</FieldLabel>
      <div className="space-y-2">
        {items.map((useCase, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              value={useCase}
              onChange={(event) => onChange(replaceAt(items, index, event.target.value))}
              maxLength={REMOTE_LIMITS.useCase}
              placeholder="e.g. Summarize customer support tickets"
              disabled={disabled}
              className={FIELD}
            />
            {items.length > 1 ? (
              <button
                type="button"
                onClick={() => onChange(removeAt(items, index))}
                disabled={disabled}
                aria-label="Remove use case"
                className={GHOST_ICON_BUTTON}
              >
                <X aria-hidden className="size-4" />
              </button>
            ) : null}
          </div>
        ))}
      </div>
      {items.length < REMOTE_LIMITS.useCases ? (
        <button type="button" onClick={() => onChange([...items, ""])} disabled={disabled} className={OUTLINE_BUTTON}>
          <Plus aria-hidden className="mr-1 size-3" /> Add use case
        </button>
      ) : null}
    </div>
  );
}

function Faqs({ items, disabled, onChange }: RepeaterProps<Faq>) {
  const edit = (index: number, patch: Partial<Faq>) => onChange(replaceAt(items, index, { ...items[index], ...patch }));
  return (
    <div className="space-y-2">
      <FieldLabel>FAQ</FieldLabel>
      <div className="space-y-3">
        {items.map((faq, index) => (
          <div key={index} className="space-y-2 rounded-lg border border-border p-3">
            <div className="flex items-center gap-2">
              <input
                value={faq.question}
                onChange={(event) => edit(index, { question: event.target.value })}
                maxLength={REMOTE_LIMITS.faqQuestion}
                placeholder="Question"
                disabled={disabled}
                className={cn(INPUT, "h-10")}
              />
              {items.length > 1 ? (
                <button
                  type="button"
                  onClick={() => onChange(removeAt(items, index))}
                  disabled={disabled}
                  aria-label="Remove FAQ"
                  className={GHOST_ICON_BUTTON}
                >
                  <X aria-hidden className="size-4" />
                </button>
              ) : null}
            </div>
            <textarea
              value={faq.answer}
              onChange={(event) => edit(index, { answer: event.target.value })}
              maxLength={REMOTE_LIMITS.faqAnswer}
              placeholder="Answer"
              rows={2}
              disabled={disabled}
              className={TEXTAREA}
            />
          </div>
        ))}
      </div>
      {items.length < REMOTE_LIMITS.faqs ? (
        <button type="button" onClick={() => onChange([...items, EMPTY_FAQ])} disabled={disabled} className={OUTLINE_BUTTON}>
          <Plus aria-hidden className="mr-1 size-3" /> Add FAQ
        </button>
      ) : null}
    </div>
  );
}

function DcrCheckbox({ checked, disabled, onChange }: { readonly checked: boolean; readonly disabled: boolean; readonly onChange: (next: boolean) => void }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/40 p-4">
      <button
        id="rmcp-dcr"
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        disabled={disabled}
        className={cn(
          "peer mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-lg border border-primary ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          checked && "bg-primary text-primary-foreground",
        )}
      >
        {checked ? <Check aria-hidden className="size-4" /> : null}
      </button>
      <div className="space-y-1">
        <label htmlFor="rmcp-dcr" className={cn(LABEL, "cursor-pointer leading-none")}>
          Supports Dynamic Client Registration
        </label>
      </div>
    </div>
  );
}

/** "Remote MCP" source: a hosted endpoint listed directly, always on the paid tier. */
export function RemoteMcpForm() {
  const [name, setName] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [owner, setOwner] = useState("");
  const [dcr, setDcr] = useState(false);
  const [categories, setCategories] = useState<readonly string[]>([]);
  const [useCases, setUseCases] = useState<readonly string[]>([""]);
  const [faqs, setFaqs] = useState<readonly Faq[]>([EMPTY_FAQ]);
  const [tryNow, setTryNow] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const busy = status === "loading";

  const toggleCategory = (category: string) =>
    setCategories((current) => {
      if (current.includes(category)) return current.filter((item) => item !== category);
      return current.length >= REMOTE_LIMITS.categories ? current : [...current, category];
    });

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const error = validateRemote({ name, endpoint, description, categories, website, tryNow, email });
    if (error) {
      setStatus("error");
      setMessage(error);
      return;
    }
    setStatus("loading");
    setMessage("");
    await wait(SIMULATED_LATENCY_MS);
    window.location.assign(CHECKOUT_HREF);
  };

  return (
    <div className="w-full text-left">
      <form onSubmit={submit} className="space-y-5">
        <div className="space-y-2">
          <FieldLabel htmlFor="rmcp-name">
            Server name <RequiredMark />
          </FieldLabel>
          <input
            id="rmcp-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={REMOTE_LIMITS.name}
            placeholder="e.g. Acme Analytics MCP"
            className={FIELD}
            disabled={busy}
            required
          />
        </div>
        <div className="space-y-2">
          <FieldLabel htmlFor="rmcp-url">
            MCP endpoint URL <RequiredMark />
          </FieldLabel>
          <div className="relative">
            <Globe aria-hidden className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="rmcp-url"
              type="url"
              value={endpoint}
              onChange={(event) => setEndpoint(event.target.value)}
              placeholder="https://mcp.your-domain.com/mcp"
              className={cn(FIELD, "pl-9")}
              disabled={busy}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <FieldLabel htmlFor="rmcp-description">
            Short description <RequiredMark />
          </FieldLabel>
          <input
            id="rmcp-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            maxLength={REMOTE_LIMITS.description}
            placeholder="One line describing what your server does"
            className={FIELD}
            disabled={busy}
            required
          />
          <p className="text-xs leading-4 text-muted-foreground">
            {description.length}/{REMOTE_LIMITS.description}
          </p>
        </div>
        <div className="space-y-2">
          <FieldLabel htmlFor="rmcp-long">Full description</FieldLabel>
          <textarea
            id="rmcp-long"
            value={longDescription}
            onChange={(event) => setLongDescription(event.target.value)}
            maxLength={REMOTE_LIMITS.longDescription}
            placeholder="Explain the capabilities, tools, and typical workflows your MCP server supports."
            rows={5}
            disabled={busy}
            className={TEXTAREA}
          />
        </div>
        <DcrCheckbox checked={dcr} disabled={busy} onChange={setDcr} />
        <CategoryPicker selected={categories} disabled={busy} onToggle={toggleCategory} />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <FieldLabel htmlFor="rmcp-owner">Provider / company name</FieldLabel>
            <input
              id="rmcp-owner"
              value={owner}
              onChange={(event) => setOwner(event.target.value)}
              maxLength={REMOTE_LIMITS.ownerName}
              placeholder="Acme, Inc."
              className={FIELD}
              disabled={busy}
            />
          </div>
          <div className="space-y-2">
            <FieldLabel htmlFor="rmcp-website">Website</FieldLabel>
            <input
              id="rmcp-website"
              type="url"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
              placeholder="https://your-domain.com"
              className={FIELD}
              disabled={busy}
            />
          </div>
        </div>
        <UseCases items={useCases} disabled={busy} onChange={setUseCases} />
        <Faqs items={faqs} disabled={busy} onChange={setFaqs} />
        <div className="space-y-2">
          <FieldLabel htmlFor="rmcp-affiliate">
            “Try Now” link <span className="font-normal text-muted-foreground">(optional)</span>
          </FieldLabel>
          <input
            id="rmcp-affiliate"
            type="url"
            value={tryNow}
            onChange={(event) => setTryNow(event.target.value)}
            placeholder="https://your-product.com/?ref=mcpmarket"
            className={FIELD}
            disabled={busy}
          />
        </div>
        <div className="space-y-2">
          <FieldLabel htmlFor="rmcp-email">
            Email <RequiredMark />
          </FieldLabel>
          <input
            id="rmcp-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className={FIELD}
            disabled={busy}
            required
          />
        </div>
        <div className="flex items-center justify-between rounded-lg border border-foreground bg-card p-4">
          <div className="flex items-center gap-2 text-sm leading-5">
            <OfficialBadge />
            <span className="text-muted-foreground">Official listing</span>
          </div>
          <div className="text-right">
            <span className="font-display text-3xl leading-none">$69</span>
            <span className="mt-1 block font-geist-mono text-[10px] leading-[15px] font-medium tracking-[0.025em] text-muted-foreground uppercase">
              one-time
            </span>
          </div>
        </div>
        <button type="submit" disabled={busy} className={cn(PRIMARY_SHELL, "h-12 text-sm")}>
          <span className={cn(PRIMARY_FACE, "text-sm leading-5")}>
            {busy ? <Loader2 aria-hidden className="mr-2 size-4 animate-spin" /> : null}
            Get listed now
            {busy ? null : <ArrowRight aria-hidden className="ml-2 size-4" />}
          </span>
        </button>
        <p className="flex items-center justify-center gap-1.5 text-center text-sm leading-5 text-muted-foreground">
          <ShieldCheckIcon className="size-4 shrink-0" />
          One-time payment · No subscription
        </p>
      </form>
      {status === "error" ? <FormAlert tone="error" message={message} /> : null}
      {status === "idle" ? (
        <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs leading-4 text-muted-foreground">
          <Check aria-hidden className="size-3" /> Listed within 24 hours of review
        </p>
      ) : null}
    </div>
  );
}
