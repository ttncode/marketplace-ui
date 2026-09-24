import type { Metadata } from "next";
import { LegalPage } from "@/components/sites/mcpmarket-com-1a9fdbee/privacy-0ece7f7c/LegalPage";
import { TermsContent } from "@/components/sites/mcpmarket-com-1a9fdbee/terms-2dda5c6b/TermsContent";

export const metadata: Metadata = {
  title: "Terms of Service | MCP Market",
  description:
    "Terms of Service for MCP Market, operated by Sitka Labs. Read the terms governing your use of the MCP Market platform.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" lastUpdated="March 25, 2026">
      <TermsContent />
    </LegalPage>
  );
}
