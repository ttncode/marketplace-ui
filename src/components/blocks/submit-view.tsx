import { SubmitForm } from "@/components/blocks/submit-form";
import type { Category, SubmitContent } from "@/lib/types";

export function SubmitView({ content, categories }: { readonly content: SubmitContent; readonly categories: readonly Category[] }) {
  return (
    <section className="relative z-20 -mt-8 flex-1 pb-8 md:-mt-10 md:pb-12">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mx-auto w-full max-w-xl rounded-2xl border border-[var(--design-surface-glass-line)] bg-[var(--design-surface-glass)] p-4 backdrop-blur-md md:p-5">
          <SubmitForm content={content} categories={categories} />
        </div>
      </div>
    </section>
  );
}
