import type { Metadata } from "next";
import { LegalPage } from "@/components/blocks/legal-page";
import { LAST_UPDATED, PrivacyContent } from "@/content/legal/privacy";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${site.name}.`,
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated={LAST_UPDATED}>
      <PrivacyContent siteName={site.name} contactEmail={site.contactEmail} />
    </LegalPage>
  );
}
