import { AuthShell } from "@/components/sites/app-mcpmarket-com-ac75c135/shared/AuthShell";
import { validateRedirectPath } from "@/components/sites/app-mcpmarket-com-ac75c135/shared/redirect";
import { SignupForm } from "@/components/sites/app-mcpmarket-com-ac75c135/signup-847d8d45/SignupForm";

export default async function SignupPage({ searchParams }: PageProps<"/signup">) {
  const { redirectTo } = await searchParams;
  const redirect = validateRedirectPath(typeof redirectTo === "string" ? redirectTo : undefined);
  return (
    <AuthShell redirect={redirect}>
      <SignupForm redirect={redirect} />
    </AuthShell>
  );
}
