"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { FAQ_ITEMS } from "./directory-data";
import type { FaqItem } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/types";
import { AccordionRegion } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/AccordionRegion";

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
    <div className="border-b border-[#dbdbdb]">
      <h3 className="m-0 flex font-display text-[16px] font-normal tracking-[-0.035em]">
        <button
          type="button"
          id={triggerId}
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={onToggle}
          className="flex flex-1 items-center justify-between py-4 text-left font-mono text-[14px] leading-[20px] font-medium tracking-[-0.56px] text-[#0a0a0a] transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] outline-none hover:text-[#0a0a0acc] hover:no-underline focus-visible:ring-2 focus-visible:ring-[#0a0a0a]/50 md:text-[16px] md:leading-[24px]"
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
            className="pb-4 font-sans text-[14px] leading-[22.75px] text-[#616161]"
          >
            {item.answer}
          </div>
      </AccordionRegion>
    </div>
  );
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#f7f7f7] py-8 md:py-12">
      <div className="mx-auto max-w-[896px] px-6 md:px-8">
        <h2 className="mt-0 mb-6 font-display text-[20px] leading-[28px] font-medium tracking-[-0.03em] text-[#0a0a0a] md:mb-8 md:text-[24px] md:leading-[32px]">
          Frequently Asked Questions
        </h2>
        <div className="w-full">
          {FAQ_ITEMS.map((item, index) => (
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
