"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AuthButton,
  AuthHeading,
  Field,
  OrDivider,
  SwitchLink,
} from "@/components/ui/auth-controls";
import { SIMULATED_REQUEST_MS } from "@/lib/simulate";
import { OAuthButtons } from "@/components/blocks/oauth-buttons";

interface LoginFormProps {
  readonly name: string;
  /** Where the simulated sign-in lands. */
  readonly redirectTo?: string;
}

export function LoginForm({ name, redirectTo = "/app" }: LoginFormProps) {
  const router = useRouter();
  const [emailOpen, setEmailOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => router.push(redirectTo), SIMULATED_REQUEST_MS);
  };

  return (
    <div>
      <AuthHeading>Log in to {name}</AuthHeading>
      <div className="space-y-6">
        <OAuthButtons redirectTo={redirectTo} />
        <OrDivider />
        {emailOpen ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field
              id="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              required
              autoComplete="email"
              autoFocus
            />
            <Field id="password" label="Password" type="password" required autoComplete="current-password" />
            <AuthButton variant="default" type="submit" disabled={submitting}>
              {submitting ? "Signing in..." : "Sign in"}
            </AuthButton>
          </form>
        ) : (
          <AuthButton variant="ghost" onClick={() => setEmailOpen(true)}>
            Log in with Email
          </AuthButton>
        )}
      </div>
      <SwitchLink prompt="Don't have an account?" label="Sign up" href="/signup" />
    </div>
  );
}
