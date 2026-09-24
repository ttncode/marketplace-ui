import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "@/components/sites/mcpmarket-com-1a9fdbee/shared/DirectoryCard.module.css";
import { cn } from "@/lib/utils";
import { WEBMCP_EXAMPLES, type WebMcpExample } from "./webmcp-data";

function ExampleCard({ example }: { readonly example: WebMcpExample }) {
  return (
    <Link href={`/server/${example.slug}`} className={cn("group block h-full", styles.link)}>
      <div className="relative flex h-full flex-col overflow-hidden rounded-[12px] border border-[rgba(34,34,34,0.18)] bg-white shadow-[0_12px_34px_rgba(10,10,10,0.04)] transition-[transform,translate,border-color,box-shadow] duration-[180ms] ease-[ease] group-hover:-translate-y-px group-hover:border-[rgba(34,34,34,0.34)] group-hover:bg-[rgba(242,242,242,0.94)] group-hover:shadow-[0_16px_36px_rgba(34,34,34,0.07)] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
        <span
          aria-hidden="true"
          className={cn(
            "block h-[6px] border-b border-[rgba(34,34,34,0.14)] bg-[#f5f5f5] bg-[length:4px_4px,100%_100%] bg-[position:0_0,0_0] opacity-[0.72]",
            styles.dither,
          )}
        />
        <div className="flex flex-1 flex-col px-[19px] pt-[18px] pb-[17px]">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element -- some favicons are intentionally broken, as on the source */}
              <img
                src={example.favicon}
                alt={example.host}
                width={20}
                height={20}
                loading="lazy"
                decoding="async"
                className="shrink-0 rounded-full object-cover opacity-[0.72] grayscale transition-[filter,opacity] duration-[180ms] ease-[ease] group-hover:opacity-100 group-hover:grayscale-[0.3] motion-reduce:transition-none"
              />
              <h3 className="line-clamp-1 text-[16px] leading-[24px]">{example.title}</h3>
            </div>
            <ArrowUpRight
              aria-hidden
              strokeWidth={2}
              className="mt-0.5 h-4 w-4 shrink-0 text-[rgba(34,34,34,0.38)] transition-[color,transform,translate,scale,rotate] duration-[180ms] ease-[ease] group-hover:translate-x-px group-hover:-translate-y-px group-hover:text-[#0a0a0a] motion-reduce:transition-none"
            />
          </div>
          <p className="mb-4 line-clamp-2 flex-1 font-sans text-[13px] leading-[1.55] text-[var(--design-ink-muted)]">
            {example.description}
          </p>
          <div className="mt-auto flex items-center justify-between">
            <div className="flex min-w-0 flex-wrap items-center gap-[5px]">
              <div className="inline-flex items-center rounded-full border border-[rgba(34,34,34,0.3)] bg-[var(--design-ink)] px-2.5 py-0.5 font-sans text-[9px] leading-[1.7] font-semibold tracking-[0.055em] text-[var(--design-surface)] uppercase transition-colors">
                WebMCP
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function WebMcpExamples() {
  return (
    <section className="border-b border-[var(--design-line)] bg-[var(--design-canvas)] py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mb-[22px] max-w-4xl md:mb-[30px]">
          <h2 className="mb-3 text-[clamp(24px,2.3vw,34px)] leading-[28px] text-foreground md:leading-[32px]">
            WebMCP Examples
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Explore websites already publishing agent-ready actions as WebMCP tools. These six examples come directly
            from the WebMCP listings in our directory.
          </p>
        </div>
        <div className="grid gap-[14px] md:grid-cols-2 lg:grid-cols-3">
          {WEBMCP_EXAMPLES.map((example) => (
            <ExampleCard key={example.slug} example={example} />
          ))}
        </div>
      </div>
    </section>
  );
}
