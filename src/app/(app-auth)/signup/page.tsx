import { AuthShell } from "@/components/blocks/auth-shell";
import { validateRedirectPath } from "@/lib/auth-redirect";
import { SignupForm } from "@/components/blocks/signup-form";

export default async function SignupPage({ searchParams }: PageProps<"/signup">) {
  const { redirectTo } = await searchParams;
  const redirect = validateRedirectPath(typeof redirectTo === "string" ? redirectTo : undefined);
  return (
    <AuthShell redirect={redirect}>
      <SignupForm redirect={redirect} />
    </AuthShell>
  );
}
