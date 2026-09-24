"use client";

import { useState } from "react";
import {
  AuthButton,
  AuthError,
  AuthHeading,
  Field,
  OrDivider,
  SIMULATED_REQUEST_MS,
  SwitchLink,
} from "@/components/sites/app-mcpmarket-com-ac75c135/shared/controls";
import { OAuthButtons } from "@/components/sites/app-mcpmarket-com-ac75c135/shared/OAuthButtons";
import { loginHeading, redirectQuery } from "@/components/sites/app-mcpmarket-com-ac75c135/shared/redirect";

const CALLBACK_FAILED_MESSAGE = "Sign-in could not be completed. Please try again.";
// The clone has no accounts, so every sign-in ends in the source's wrong-credentials message.
const INVALID_CREDENTIALS_MESSAGE = "Invalid email or password";

interface LoginFormProps {
  readonly redirect: string;
  readonly callbackFailed: boolean;
}

export function LoginForm({ redirect, callbackFailed }: LoginFormProps) {
  const [emailOpen, setEmailOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(callbackFailed ? CALLBACK_FAILED_MESSAGE : null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    window.setTimeout(() => {
      setError(INVALID_CREDENTIALS_MESSAGE);
      setSubmitting(false);
    }, SIMULATED_REQUEST_MS);
  };

  return (
    <div>
      <AuthHeading>{loginHeading(redirect)}</AuthHeading>
      <AuthError message={error} />
      <div className="space-y-6">
        <OAuthButtons />
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
      <SwitchLink prompt="Don't have an account?" label="Sign up" href={`/signup${redirectQuery(redirect)}`} />
    </div>
  );
}
