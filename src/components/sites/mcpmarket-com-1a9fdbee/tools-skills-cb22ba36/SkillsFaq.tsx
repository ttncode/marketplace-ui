"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SKILL_FAQS } from "./skills-landing-data";
import type { SkillFaq } from "./types";
import { AccordionRegion } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/AccordionRegion";

interface FaqItemProps {
  readonly item: SkillFaq;
  readonly isOpen: boolean;
  readonly onToggle: () => void;
}

function FaqItem({ item, isOpen, onToggle }: FaqItemProps) {
  const id = useId();
  const triggerId = `${id}-trigger`;
  const contentId = `${id}-content`;

  return (
    <div className="border-b border-[#dbdbdb]">
      <h3 className="m-0 flex font-display tracking-[-0.035em]">
        <button
          type="button"
          id={triggerId}
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={onToggle}
          className="flex flex-1 items-center justify-between py-5 text-left font-sans text-base leading-6 font-medium tracking-[-0.015em] text-[#0a0a0a] transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-[rgba(10,10,10,0.8)] md:text-lg md:leading-7"
        >
          {item.question}
          <ChevronDown
            aria-hidden
            strokeWidth={2}
            className={cn("size-4 shrink-0 transition-transform duration-200", isOpen && "rotate-180")}
          />
        </button>
      </h3>
      <AccordionRegion open={isOpen} id={contentId} labelledBy={triggerId} className="text-sm leading-5">
        <div className="pb-5 text-base leading-[26px] text-[#616161]">{item.answer}</div>
      </AccordionRegion>
    </div>
  );
}

export function SkillsFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#f7f7f7] py-8 font-sans text-[16px] leading-6 text-[#0a0a0a] md:py-12">
      <div className="mx-auto max-w-[896px] px-6 md:px-8">
        <h2 className="mb-6 text-center font-display text-2xl leading-8 font-normal tracking-[-0.04em] text-[#0a0a0a] md:mb-8 md:text-3xl md:leading-9 lg:text-4xl lg:leading-10">
          Frequently Asked Questions
        </h2>
        <div className="w-full">
          {SKILL_FAQS.map((item, index) => (
            <FaqItem
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
