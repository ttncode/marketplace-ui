"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { DashboardUser } from "@/lib/types";

const SIMULATED_REQUEST_MS = 900;
const SAVED_VISIBLE_MS = 2000;

const NOTIFICATIONS = [
  { id: "notify-failed", label: "Email me when a post fails", defaultChecked: true },
  { id: "notify-weekly", label: "Weekly summary", defaultChecked: false },
] as const;

export function SettingsForm({ user }: { readonly user: DashboardUser }) {
  const [state, setState] = useState<"idle" | "saving" | "saved">("idle");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState("saving");
    window.setTimeout(() => {
      setState("saved");
      window.setTimeout(() => setState("idle"), SAVED_VISIBLE_MS);
    }, SIMULATED_REQUEST_MS);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <section className="space-y-4 rounded-[var(--design-radius-lg)] border border-border bg-surface p-5">
        <h2 className="text-sm font-medium text-ink">Profile</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm text-ink-secondary">Name</label>
            <Input id="name" name="name" defaultValue={user.name} required />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm text-ink-secondary">Email</label>
            <Input id="email" name="email" type="email" defaultValue={user.email} required />
          </div>
        </div>
      </section>
      <section className="space-y-3 rounded-[var(--design-radius-lg)] border border-border bg-surface p-5">
        <h2 className="text-sm font-medium text-ink">Notifications</h2>
        {NOTIFICATIONS.map((option) => (
          <label key={option.id} className="flex items-center gap-3 text-sm text-ink">
            <input type="checkbox" name={option.id} defaultChecked={option.defaultChecked} className="size-4 accent-current" />
            {option.label}
          </label>
        ))}
      </section>
      <div className="flex items-center justify-end gap-3">
        <span aria-live="polite" className="text-sm text-ink-muted">{state === "saved" ? "Saved" : ""}</span>
        <Button type="submit" disabled={state === "saving"}>{state === "saving" ? "Saving…" : "Save changes"}</Button>
      </div>
    </form>
  );
}
