import Link from "next/link";
import { cn } from "@/lib/utils";
import { toSiteHref } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/links";
import styles from "./detail.module.css";
import { HeaderActions } from "./HeaderActions";
import { ChevronRightIcon, HomeIcon, StarIcon } from "./icons";
import type { ServerDetail } from "./types";

const CRUMB_LINK = "rounded-md px-1 py-1 transition-colors hover:bg-black/[0.04] hover:text-[var(--design-ink)]";

function Breadcrumbs({ name }: { readonly name: string }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-5 inline-flex w-fit max-w-full self-start overflow-x-auto whitespace-nowrap rounded-full border border-[rgba(0,0,0,0.08)] bg-[rgba(255,255,255,0.72)] px-2.5 py-[5px] font-sans text-[9px] leading-[1.2] font-medium tracking-[0.045em] text-[var(--design-ink-muted)] uppercase backdrop-blur-md [scrollbar-width:none] md:mb-6 [&::-webkit-scrollbar]:hidden [&_svg]:h-3 [&_svg]:w-3"
    >
      <ol className="flex w-max min-w-0 items-center gap-1.5">
        <li className="flex items-center">
          <Link href="/" className={cn("-ml-1 inline-flex items-center gap-1", CRUMB_LINK)}>
            <HomeIcon className="h-3 w-3" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </li>
        <li className="flex min-w-0 items-center gap-1.5">
          <ChevronRightIcon className="h-3 w-3 shrink-0" />
          <Link href="/server" className={CRUMB_LINK}>
            Servers
          </Link>
        </li>
        <li className="flex min-w-0 items-center gap-1.5">
          <ChevronRightIcon className="h-3 w-3 shrink-0" />
          <span aria-current="page" className="max-w-[150px] truncate px-1 py-1 text-[var(--design-ink-secondary)] sm:max-w-xs">
            {name}
          </span>
        </li>
      </ol>
    </nav>
  );
}

function MetaRow({ server }: { readonly server: ServerDetail }) {
  return (
    <div data-server-detail-meta className="mt-3 flex flex-wrap items-center gap-3 text-sm">
      <div className="flex items-center gap-1.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={server.author.avatar.src}
          alt={server.author.avatar.alt}
          width={20}
          height={20}
          loading="lazy"
          className="rounded-full object-cover opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
        />
        <span className="text-muted-foreground">by</span>
        <Link
          href={toSiteHref(server.author.href)}
          className="font-medium text-foreground transition-colors hover:text-primary"
        >
          {server.author.name}
        </Link>
      </div>
      <span className="text-muted-foreground">•</span>
      {server.stars && (
        <>
          <div className="flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-1">
            <StarIcon className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-geist-mono text-xs font-medium text-primary">{server.stars}</span>
          </div>
          <span className="text-muted-foreground">•</span>
        </>
      )}
      <HeaderActions
        entityName={server.name}
        shareUrl={server.links.share}
        githubUrl={server.links.github}
        npmUrl={server.links.npm}
      />
    </div>
  );
}

export function ServerDetailHero({ server }: { readonly server: ServerDetail }) {
  return (
    <section className="design-hero-under-navigation relative overflow-hidden bg-background">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black_0%,black_calc(100%_-_150px),transparent_100%)]",
          styles.dotPattern,
        )}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/5 via-background/25 to-background" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary opacity-[0.08] blur-[180px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background via-background/80 to-transparent" />
      <div className="relative z-10 container mx-auto max-w-7xl px-6 md:px-8">
        <div className={styles.hero}>
          <header data-server-detail-header className="mb-0">
            <Breadcrumbs name={server.name} />
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
              <div className="min-w-0 flex-1">
                <div className="mb-6">
                  <div className="flex min-w-0 flex-col gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 md:gap-4">
                        <h1
                          data-server-detail-title
                          className="min-w-0 pb-1 font-sans text-4xl leading-none font-normal tracking-[-0.055em] break-words text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
                        >
                          {server.name}
                        </h1>
                      </div>
                      <MetaRow server={server} />
                    </div>
                  </div>
                </div>
                <div data-server-detail-categories className="mb-5 flex flex-wrap items-center gap-2">
                  {server.categories.map((category) => (
                    <Link
                      key={category.href}
                      href={category.href}
                      title={`View all tools in ${category.label} category`}
                      className="group no-underline"
                    >
                      <div className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 font-sans text-[10px] font-semibold tracking-[0.06em] text-muted-foreground uppercase transition-colors hover:bg-accent focus:ring-2 focus:ring-ring/30 focus:ring-offset-2 focus:outline-none">
                        {category.label}
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                  <p
                    data-server-detail-description
                    className="max-w-3xl font-sans text-base leading-relaxed font-normal text-muted-foreground md:text-lg md:leading-7 lg:text-xl lg:leading-7"
                  >
                    {server.description}
                  </p>
                </div>
              </div>
            </div>
          </header>
        </div>
      </div>
    </section>
  );
}
