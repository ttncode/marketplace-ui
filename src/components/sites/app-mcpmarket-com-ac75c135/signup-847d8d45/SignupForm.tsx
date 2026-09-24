"use client";

import { useState } from "react";
import {
  AuthButton,
  AuthHeading,
  AuthLink,
  Field,
  OrDivider,
  SIMULATED_REQUEST_MS,
  SwitchLink,
} from "@/components/sites/app-mcpmarket-com-ac75c135/shared/controls";
import { OAuthButtons } from "@/components/sites/app-mcpmarket-com-ac75c135/shared/OAuthButtons";
import { redirectQuery, signupHeading } from "@/components/sites/app-mcpmarket-com-ac75c135/shared/redirect";

function CheckEmail() {
  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-medium tracking-tight text-foreground">Check your email</h1>
        <p className="mt-2 text-sm text-balance text-muted-foreground">Check your email for a confirmation link.</p>
      </div>
      <p className="text-center text-sm text-muted-foreground">
        <AuthLink href="/login">Back to sign in</AuthLink>
      </p>
    </div>
  );
}

function EmailSignupForm({ onSent }: { readonly onSent: () => void }) {
  const [submitting, setSubmitting] = useState(false);

  // Validation is the browser's own (required / type=email / minLength), exactly as on the source.
  // No backend: nothing is sent; the source's no-session path ("Check your email") follows its loading state.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    window.setTimeout(onSent, SIMULATED_REQUEST_MS);
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

export function SignupForm({ redirect }: { readonly redirect: string }) {
  const [emailOpen, setEmailOpen] = useState(false);
  const [sent, setSent] = useState(false);

  if (sent) return <CheckEmail />;

  return (
    <div>
      <AuthHeading>{signupHeading(redirect)}</AuthHeading>
      <div className="space-y-6">
        <OAuthButtons />
        <OrDivider />
        {emailOpen ? (
          <EmailSignupForm onSent={() => setSent(true)} />
        ) : (
          <AuthButton variant="ghost" onClick={() => setEmailOpen(true)}>
            Sign up with Email
          </AuthButton>
        )}
      </div>
      <SwitchLink prompt="Already have an account?" label="Sign in" href={`/login${redirectQuery(redirect)}`} />
    </div>
  );
}
