import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DirectoryCard } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/DirectoryCard";
import type { DirectorySection as DirectorySectionData } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/types";

const TONE_BACKGROUND = { canvas: "bg-[#fbfbfb]", subtle: "bg-[#f7f7f7]" } as const;

const PILL_LINK =
  "rounded-full border border-[rgba(10,10,10,0.14)] bg-[rgba(255,255,255,0.42)] font-sans text-[11px] tracking-[0.02em] text-[#626262] transition-colors duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-[rgba(34,34,34,0.4)] hover:bg-[#f7f7f7] hover:text-[#0a0a0a] motion-reduce:transition-none";

const TITLE =
  "font-display text-[clamp(24px,2.3vw,34px)] leading-[28px] font-normal tracking-[-0.045em] text-[#0a0a0a] md:leading-[32px]";

export function DirectorySection({
  section,
  tone,
}: {
  readonly section: DirectorySectionData;
  readonly tone: "canvas" | "subtle";
}) {
  const { badge } = section;
  return (
    <section
      className={cn(
        "border-b border-[rgba(10,10,10,0.14)] py-8 font-sans text-[#0a0a0a] md:py-12",
        TONE_BACKGROUND[tone],
      )}
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="mb-[22px] flex flex-col justify-between gap-4 md:mb-[30px] md:flex-row md:items-end">
          <div>
            {badge ? (
              <div className="mb-1 flex items-center gap-3">
                <h2 className={TITLE}>
                  <span>{section.title}</span>
                </h2>
                <a
                  href={badge.href}
                  className={cn(PILL_LINK, "inline-flex items-center px-2 py-0.5 leading-[16.5px] font-medium uppercase")}
                >
                  {badge.label}
                </a>
              </div>
            ) : (
              <h2 className={cn(TITLE, "mb-1")}>
                <span>{section.title}</span>
              </h2>
            )}
          </div>
          <a
            href={section.viewAll.href}
            className={cn(PILL_LINK, "group inline-flex h-[34px] items-center gap-1.5 px-3 py-1.5 leading-[20px]")}
          >
            {section.viewAll.label}
            <ArrowRight
              aria-hidden
              className="size-3.5 transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
              strokeWidth={2}
            />
          </a>
        </div>
        <div className="grid gap-[14px] md:grid-cols-2 lg:grid-cols-3">
          {section.cards.map((card) => (
            <DirectoryCard key={card.href} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
