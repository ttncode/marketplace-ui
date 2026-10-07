import type { Metadata } from "next";
import { LegalPage } from "@/components/blocks/legal-page";
import { PrivacyContent } from "@/components/sites/mcpmarket-com-1a9fdbee/privacy-0ece7f7c/PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for MCP Market, operated by Sitka Labs. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="March 25, 2026">
      <PrivacyContent />
    </LegalPage>
  );
}
