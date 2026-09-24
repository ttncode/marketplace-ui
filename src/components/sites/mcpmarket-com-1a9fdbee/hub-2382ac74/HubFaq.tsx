"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/types";
import { HUB_FAQ } from "./hub-data";
import { AccordionRegion } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/AccordionRegion";

interface ItemProps {
  readonly item: FaqItem;
  readonly isOpen: boolean;
  readonly onToggle: () => void;
}

function HubFaqItem({ item, isOpen, onToggle }: ItemProps) {
  const id = useId();
  const triggerId = `${id}-trigger`;
  const contentId = `${id}-content`;

  return (
    <div className="border-b border-border">
      <h3 className="flex">
        <button
          type="button"
          id={triggerId}
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={onToggle}
          className="flex flex-1 items-center justify-between py-4 text-left font-mono text-sm leading-[20px] font-medium text-foreground transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-foreground/80 md:text-base md:leading-[24px]"
        >
          {item.question}
          <ChevronDown
            aria-hidden="true"
            className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isOpen && "rotate-180")}
            strokeWidth={2}
          />
        </button>
      </h3>
      <AccordionRegion open={isOpen} id={contentId} labelledBy={triggerId} className="text-sm">
          <div className="pt-0 pb-4 text-sm leading-[1.625] text-muted-foreground">
            {item.answer}
          </div>
      </AccordionRegion>
    </div>
  );
}

export function HubFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="border-b border-border py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-6 md:px-8">
        <h2 className="mb-6 font-display text-xl leading-[28px] font-medium tracking-[-0.03em] text-foreground md:mb-8 md:text-2xl md:leading-[32px]">
          Frequently asked questions
        </h2>
        <div className="w-full">
          {HUB_FAQ.map((item, index) => (
            <HubFaqItem
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
