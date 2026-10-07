"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/lib/types";
import { AccordionRegion } from "@/components/ui/accordion-region";

interface FaqAccordionItemProps {
  readonly item: FaqItem;
  readonly isOpen: boolean;
  readonly onToggle: () => void;
}

function FaqAccordionItem({ item, isOpen, onToggle }: FaqAccordionItemProps) {
  const id = useId();
  const triggerId = `${id}-trigger`;
  const contentId = `${id}-content`;

  return (
    <div className="border-b border-border">
      <h3 className="m-0 flex font-display text-[16px] font-normal tracking-[-0.035em]">
        <button
          type="button"
          id={triggerId}
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={onToggle}
          className="flex flex-1 items-center justify-between py-4 text-left font-mono text-[14px] leading-[20px] font-medium tracking-[-0.56px] text-ink transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] outline-none hover:text-ink/80 hover:no-underline focus-visible:ring-2 focus-visible:ring-ink/50 md:text-[16px] md:leading-[24px]"
        >
          {item.question}
          <ChevronDown
            aria-hidden="true"
            size={16}
            strokeWidth={2}
            className={cn("shrink-0 transition-transform duration-200", isOpen && "rotate-180")}
          />
        </button>
      </h3>
      <AccordionRegion open={isOpen} id={contentId} labelledBy={triggerId} className="font-sans text-[14px] leading-[20px]">
          <div
            className="pb-4 font-sans text-[14px] leading-[22.75px] text-ink-muted"
          >
            {item.answer}
          </div>
      </AccordionRegion>
    </div>
  );
}

export function FaqSection({
  title = "Frequently Asked Questions",
  items,
}: {
  readonly title?: string;
  readonly items: readonly FaqItem[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-surface-subtle py-8 md:py-12">
      <div className="mx-auto max-w-[896px] px-6 md:px-8">
        <h2 className="mt-0 mb-6 font-display text-[20px] leading-[28px] font-medium tracking-[-0.03em] text-ink md:mb-8 md:text-[24px] md:leading-[32px]">
          {title}
        </h2>
        <div className="w-full">
          {items.map((item, index) => (
            <FaqAccordionItem
              key={item.question}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
