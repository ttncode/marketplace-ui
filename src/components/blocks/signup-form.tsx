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

function EmailSignupForm({ redirectTo }: { readonly redirectTo: string }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  // Validation is the browser's own (required / type=email / minLength).
  // No backend: nothing is sent; the form waits, then enters the app.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => router.push(redirectTo), SIMULATED_REQUEST_MS);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field id="name" label="Name" type="text" placeholder="Your name" autoComplete="name" autoFocus />
      <Field id="email" label="Email" type="email" placeholder="you@example.com" required autoComplete="email" />
      <Field
        id="password"
        label="Password"
        type="password"
        required
        minLength={8}
        autoComplete="new-password"
        hint="Must be at least 8 characters long."
      />
      <AuthButton variant="default" type="submit" disabled={submitting}>
        {submitting ? "Creating account..." : "Create account"}
      </AuthButton>
    </form>
  );
}

interface SignupFormProps {
  readonly name: string;
  /** Where the simulated sign-in lands. */
  readonly redirectTo?: string;
}

export function SignupForm({ name, redirectTo = "/app" }: SignupFormProps) {
  const [emailOpen, setEmailOpen] = useState(false);

  return (
    <div>
      <AuthHeading>Create your {name} account</AuthHeading>
      <div className="space-y-6">
        <OAuthButtons redirectTo={redirectTo} />
        <OrDivider />
        {emailOpen ? (
          <EmailSignupForm redirectTo={redirectTo} />
        ) : (
          <AuthButton variant="ghost" onClick={() => setEmailOpen(true)}>
            Sign up with Email
          </AuthButton>
        )}
      </div>
      <SwitchLink prompt="Already have an account?" label="Sign in" href="/login" />
    </div>
  );
}
