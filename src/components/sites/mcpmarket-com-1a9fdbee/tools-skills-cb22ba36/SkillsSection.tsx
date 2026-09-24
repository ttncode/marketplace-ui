import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LinkRef } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/types";

const TONE_BACKGROUND = { canvas: "bg-[#fbfbfb]", subtle: "bg-[#f7f7f7]" } as const;

export type SectionTone = keyof typeof TONE_BACKGROUND;

interface SkillsSectionProps {
  readonly tone: SectionTone;
  readonly title?: string;
  readonly viewAll?: LinkRef;
  readonly children: React.ReactNode;
}

/** The directory section frame shared by every block below the hero (title row + optional "view all" pill). */
export function SkillsSection({ tone, title, viewAll, children }: SkillsSectionProps) {
  return (
    <section
      className={cn(
        "border-b border-[rgba(10,10,10,0.14)] py-8 font-sans text-[16px] leading-6 text-[#0a0a0a] md:py-12",
        TONE_BACKGROUND[tone],
      )}
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        {title ? (
          <div className="mb-[22px] flex flex-col justify-between gap-4 md:mb-[30px] md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-[clamp(24px,2.3vw,34px)] leading-[1.5] font-normal tracking-[-0.045em] text-[#0a0a0a]">
                {title}
              </h2>
            </div>
            {viewAll ? (
              <Link
                href={viewAll.href}
                className="group inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-[rgba(10,10,10,0.14)] bg-[rgba(255,255,255,0.42)] px-3.5 py-2 font-sans text-[11px] leading-[16.5px] tracking-[0.02em] text-[#626262] transition-colors duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-[rgba(34,34,34,0.4)] hover:bg-[#f7f7f7] hover:text-[#0a0a0a] md:self-auto motion-reduce:transition-none"
              >
                {viewAll.label}
                <ArrowRight
                  aria-hidden
                  strokeWidth={2}
                  className="size-3.5 transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
                />
              </Link>
            ) : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
