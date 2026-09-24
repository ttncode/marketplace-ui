import { AuthShell } from "@/components/sites/app-mcpmarket-com-ac75c135/shared/AuthShell";
import { validateRedirectPath } from "@/components/sites/app-mcpmarket-com-ac75c135/shared/redirect";
import { LoginForm } from "@/components/sites/app-mcpmarket-com-ac75c135/login-7e93fba0/LoginForm";

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { redirectTo, error } = await searchParams;
  const redirect = validateRedirectPath(typeof redirectTo === "string" ? redirectTo : undefined);
  return (
    <AuthShell redirect={redirect}>
      <LoginForm redirect={redirect} callbackFailed={error === "auth_callback_failed"} />
    </AuthShell>
  );
}
