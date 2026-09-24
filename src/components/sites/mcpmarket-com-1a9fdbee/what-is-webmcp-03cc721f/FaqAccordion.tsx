"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/types";
import { cn } from "@/lib/utils";
import { AccordionRegion } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/AccordionRegion";

interface AccordionItemProps {
  readonly item: FaqItem;
  readonly isOpen: boolean;
  readonly onToggle: () => void;
}

// Same open/close mechanics as the homepage FAQ: keep the region mounted while the
// Radix-style accordion-up keyframe plays, measuring its height into a CSS variable.
function AccordionItem({ item, isOpen, onToggle }: AccordionItemProps) {
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
          className="flex flex-1 items-center justify-between py-4 text-left font-geist-mono text-sm font-medium tracking-normal text-foreground transition-all hover:text-foreground/80 hover:no-underline md:text-base"
        >
          {item.question}
          <ChevronDown
            aria-hidden="true"
            size={16}
            strokeWidth={2}
            className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isOpen && "rotate-180")}
          />
        </button>
      </h3>
      <AccordionRegion open={isOpen} id={contentId} labelledBy={triggerId} className="text-sm">
          <div className="pt-0 pb-4 text-sm leading-relaxed text-muted-foreground">
            {item.answer}
          </div>
      </AccordionRegion>
    </div>
  );
}

export function FaqAccordion({ items }: { readonly items: readonly FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <AccordionItem
          key={item.question}
          item={item}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
}
