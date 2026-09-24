import { ArrowUpRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./DirectoryCard.module.css";
import type { CardFooter, DirectoryCard as DirectoryCardData } from "./types";

function FooterValue({ footer }: { readonly footer: CardFooter }) {
  switch (footer.kind) {
    case "stars":
      return (
        <div className="flex items-center font-sans text-[12px] leading-[16px] text-[#626262]">
          <Star
            aria-hidden
            className="mr-1 size-3 fill-[rgba(97,97,97,0.3)] text-[#616161]"
            strokeWidth={2}
          />
          {footer.value}
        </div>
      );
    case "zero":
      return "0";
    case "none":
      return null;
    default: {
      const exhaustive: never = footer;
      return exhaustive;
    }
  }
}

export function DirectoryCard({ card }: { readonly card: DirectoryCardData }) {
  return (
    <a href={card.href} className={cn("group block", styles.link)}>
      <div className="relative h-full overflow-hidden rounded-[12px] border border-[rgba(34,34,34,0.18)] bg-white shadow-[0_12px_34px_rgba(10,10,10,0.04)] transition-[transform,translate,scale,rotate,border-color,box-shadow] duration-[180ms] ease-[ease] group-hover:-translate-y-px group-hover:border-[rgba(34,34,34,0.34)] group-hover:bg-[rgba(242,242,242,0.94)] group-hover:shadow-[0_16px_36px_rgba(34,34,34,0.07)] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
        <span
          className={cn(
            "block h-[6px] border-b border-[rgba(34,34,34,0.14)] bg-[#f5f5f5] bg-[length:4px_4px,100%_100%] bg-[position:0_0,0_0] opacity-[0.72]",
            styles.dither,
          )}
        />
        <div className="px-[19px] pt-[18px] pb-[17px]">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.avatar.src}
                alt={card.avatar.alt}
                width={20}
                height={20}
                loading="lazy"
                className="size-5 shrink-0 rounded-full object-cover opacity-[0.72] grayscale transition-[filter,opacity] duration-[180ms] ease-[ease] group-hover:opacity-100 group-hover:grayscale-[0.3] motion-reduce:transition-none"
              />
              <h3 className="line-clamp-1 font-display text-[16px] leading-[24px] font-semibold tracking-[-0.025em] text-[#0a0a0a] transition-colors duration-150 group-hover:text-[rgba(10,10,10,0.8)] motion-reduce:transition-none">
                {card.title}
              </h3>
            </div>
            <ArrowUpRight
              aria-hidden
              className="mt-0.5 size-4 shrink-0 text-[rgba(34,34,34,0.38)] transition-[color,transform,translate,scale,rotate] duration-[180ms] ease-[ease] group-hover:translate-x-px group-hover:-translate-y-px group-hover:text-[#0a0a0a] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
              strokeWidth={2}
            />
          </div>
          <p className="mb-4 line-clamp-2 font-sans text-[13px] leading-[1.55] text-[#626262]">
            {card.description}
          </p>
          <div className="flex items-center justify-between text-[16px] leading-[24px] text-[#0a0a0a]">
            <div className="flex flex-wrap items-center gap-[5px]">
              {card.categories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center rounded-full border border-[rgba(34,34,34,0.18)] bg-[rgba(255,255,255,0.5)] px-1.5 font-sans text-[9px] leading-[1.7] font-semibold tracking-[0.055em] text-[#626262] uppercase"
                >
                  {category}
                </span>
              ))}
            </div>
            <FooterValue footer={card.footer} />
          </div>
        </div>
      </div>
    </a>
  );
}
