import { AuthShell } from "@/components/blocks/auth-shell";
import { validateRedirectPath } from "@/lib/auth-redirect";
import { LoginForm } from "@/components/blocks/login-form";

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { redirectTo, error } = await searchParams;
  const redirect = validateRedirectPath(typeof redirectTo === "string" ? redirectTo : undefined);
  return (
    <AuthShell redirect={redirect}>
      <LoginForm redirect={redirect} callbackFailed={error === "auth_callback_failed"} />
    </AuthShell>
  );
}
