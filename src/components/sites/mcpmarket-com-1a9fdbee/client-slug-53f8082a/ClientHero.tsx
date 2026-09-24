import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { toSiteHref } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/links";
import type { McpClient } from "./types";

const CRUMB_LINK =
  "rounded-md px-1 py-1 transition-colors hover:bg-black/[0.04] hover:text-[var(--design-ink)]";

/** The source ships lucide 0.x "home" and "star", whose paths differ from today's lucide. */
function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-3">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-3.5 text-muted-foreground">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function CrumbSeparator() {
  return <ChevronRight aria-hidden="true" strokeWidth={1.6} className="size-3 shrink-0" />;
}

function Breadcrumbs({ name }: { readonly name: string }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-5 inline-flex w-fit max-w-full self-start overflow-x-auto rounded-full border border-[rgb(0_0_0/0.08)] bg-[rgb(255_255_255/0.72)] px-2.5 py-[5px] font-sans text-[9px] leading-[1.2] font-medium tracking-[0.045em] whitespace-nowrap text-[var(--design-ink-muted)] uppercase shadow-[0_16px_38px_-28px_rgb(15_23_42/0.48)] backdrop-blur-md scrollbar-hide md:mb-6"
    >
      <ol className="flex w-max min-w-0 items-center gap-1.5">
        <li className="flex items-center">
          <Link href="/" className={`-ml-1 inline-flex items-center gap-1 ${CRUMB_LINK}`}>
            <HomeIcon />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </li>
        <li className="flex min-w-0 items-center gap-1.5">
          <CrumbSeparator />
          <Link href="/client" className={CRUMB_LINK}>
            Clients
          </Link>
        </li>
        <li className="flex min-w-0 items-center gap-1.5">
          <CrumbSeparator />
          <span aria-current="page" className="max-w-[150px] truncate px-1 py-1 text-[var(--design-ink-secondary)] sm:max-w-xs">
            {name}
          </span>
        </li>
      </ol>
    </nav>
  );
}

export function ClientHero({ client }: { readonly client: McpClient }) {
  return (
    <section className="design-hero-under-navigation relative overflow-hidden bg-background py-4 md:py-6 lg:py-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.42)_1px,transparent_0)] bg-[length:40px_40px] [mask-image:linear-gradient(to_bottom,black_0%,black_calc(100%_-_150px),transparent_100%)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/5 via-background/25 to-background" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary opacity-[0.08] blur-[180px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background via-background/80 to-transparent"
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-8">
        <header>
          <div className="mb-4">
            <Breadcrumbs name={client.name} />
          </div>
          <div className="mb-6 flex min-w-0 flex-col gap-3">
            <div>
              {/* The source's line-heights come from Tailwind v3 ordering: its leading-[0.98] only survives below sm. */}
              <h1 className="pb-1 font-display text-[30px] leading-[0.98] font-normal tracking-[-0.045em] break-words text-foreground sm:text-[36px] sm:leading-[40px] md:text-[48px] md:leading-none lg:text-[60px]">
                {client.name}
              </h1>
              <div className="mt-2 flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1.5">
                  <span className="text-muted-foreground">by</span>
                  <a href={toSiteHref(client.owner.href)} className="font-medium text-foreground transition-colors hover:text-primary">
                    {client.owner.name}
                  </a>
                </div>
                <div className="hidden text-muted-foreground sm:block">•</div>
                <div className="flex items-center gap-1.5 rounded-lg border border-border bg-muted px-2.5 py-0.5">
                  <StarIcon />
                  <span className="font-mono text-xs font-medium text-primary">{client.stars}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {client.categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                title={`View all tools in ${category.label} category`}
                className="group no-underline"
              >
                <div className="inline-flex items-center rounded-full border border-black/[0.08] px-2.5 py-0.5 font-sans text-xs font-normal transition-colors hover:bg-white">
                  {category.label}
                </div>
              </Link>
            ))}
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:gap-4">
            <p className="max-w-3xl text-base leading-[1.625] font-normal md:text-lg md:leading-7 lg:text-xl lg:leading-7">
              {client.description}
            </p>
          </div>
        </header>
      </div>
    </section>
  );
}
