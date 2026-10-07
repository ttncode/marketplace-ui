import type { Metadata } from "next";
import { LegalPage } from "@/components/blocks/legal-page";
import { LAST_UPDATED, TermsContent } from "@/content/legal/terms";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${site.name}.`,
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" lastUpdated={LAST_UPDATED}>
      <TermsContent siteName={site.name} contactEmail="contact@example.com" />
    </LegalPage>
  );
}
