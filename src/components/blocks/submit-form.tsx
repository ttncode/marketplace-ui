"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { SIMULATED_REQUEST_MS } from "@/components/ui/auth-controls";
import { FieldLabel, INPUT, OUTLINE_BUTTON, RequiredMark, TEXTAREA } from "@/components/ui/form-field";
import type { Category, SubmitContent } from "@/lib/types";

interface SubmitFormProps {
  readonly content: SubmitContent;
  readonly categories: readonly Category[];
}

export function SubmitForm({ content, categories }: SubmitFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    // No network: the template only simulates the request.
    window.setTimeout(() => {
      setSubmitting(false);
      setDone(true);
    }, SIMULATED_REQUEST_MS);
  };

  if (done) {
    return (
      <div role="status" className="space-y-1 py-4 text-center">
        <h2 className="font-display text-xl font-medium">{content.successTitle}</h2>
        <p className="text-sm text-[var(--design-ink-muted)]">{content.successDescription}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <FieldLabel htmlFor="submit-name">
          Name <RequiredMark />
        </FieldLabel>
        <input id="submit-name" name="name" required disabled={submitting} className={INPUT} />
      </div>
      <div className="space-y-2">
        <FieldLabel htmlFor="submit-url">
          URL <RequiredMark />
        </FieldLabel>
        <input
          id="submit-url"
          name="url"
          type="url"
          required
          placeholder="https://example.com"
          disabled={submitting}
          className={INPUT}
        />
      </div>
      <div className="space-y-2">
        <FieldLabel htmlFor="submit-category">
          Category <RequiredMark />
        </FieldLabel>
        <select id="submit-category" name="category" required defaultValue="" disabled={submitting} className={INPUT}>
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {content.fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <FieldLabel htmlFor={`submit-${field.id}`}>{field.label}</FieldLabel>
          {field.multiline ? (
            <textarea
              id={`submit-${field.id}`}
              name={field.id}
              placeholder={field.placeholder}
              disabled={submitting}
              className={TEXTAREA}
            />
          ) : (
            <input
              id={`submit-${field.id}`}
              name={field.id}
              placeholder={field.placeholder}
              disabled={submitting}
              className={INPUT}
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        disabled={submitting}
        className={cn(
          OUTLINE_BUTTON,
          "h-10 w-full border-[var(--design-ink)] bg-[var(--design-ink)] text-[var(--design-surface)] hover:border-[var(--design-ink)] hover:bg-[var(--design-ink-secondary)]",
        )}
      >
        {submitting ? "Submitting…" : content.submitLabel}
      </button>
    </form>
  );
}
