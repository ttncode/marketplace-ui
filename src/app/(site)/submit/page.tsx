import type { Metadata } from "next";
import { SubmitHero } from "@/components/blocks/submit-hero";
import { SubmitView } from "@/components/blocks/submit-view";
import { CATEGORIES } from "@/content/categories";
import { SUBMIT } from "@/content/submit";

export const metadata: Metadata = {
  title: SUBMIT.title,
  description: SUBMIT.description,
};

export default function SubmitPage() {
  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen flex-col bg-[var(--design-canvas)]">
        <SubmitHero title={SUBMIT.title} description={SUBMIT.description} />
        <SubmitView content={SUBMIT} categories={CATEGORIES} />
      </div>
    </main>
  );
}
