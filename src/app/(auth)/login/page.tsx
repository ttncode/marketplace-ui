import { AuthShell } from "@/components/blocks/auth-shell";
import { LoginForm } from "@/components/blocks/login-form";
import { site } from "@/site.config";

export default function LoginPage() {
  return (
    <AuthShell name={site.name} logo={site.logo}>
      <LoginForm name={site.name} />
    </AuthShell>
  );
}
