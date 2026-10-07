import { AuthShell } from "@/components/blocks/auth-shell";
import { SignupForm } from "@/components/blocks/signup-form";
import { site } from "@/site.config";

export default function SignupPage() {
  return (
    <AuthShell name={site.name} logo={site.logo}>
      <SignupForm name={site.name} />
    </AuthShell>
  );
}
