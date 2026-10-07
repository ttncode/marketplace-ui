import Link from "next/link";
import { cn } from "@/lib/utils";
import styles from "./item-detail.module.css";
import { HeaderActions } from "./item-header-actions";
import { ChevronRightIcon, HomeIcon, StarIcon } from "@/components/icons/detail-icons";
import type { LinkRef, Listing } from "@/lib/types";

const CRUMB_LINK = "rounded-md px-1 py-1 transition-colors hover:bg-black/[0.04] hover:text-[var(--design-ink)]";

function Breadcrumbs({ category, name }: { readonly category: LinkRef; readonly name: string }) {
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
          <Link href={category.href} className={CRUMB_LINK}>
            {category.label}
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

function MetaRow({ listing, shareUrl }: { readonly listing: Listing; readonly shareUrl: string }) {
  return (
    <div data-server-detail-meta className="mt-3 flex flex-wrap items-center gap-3 text-sm">
      <div className="flex items-center gap-1.5">
        <span className="text-muted-foreground">by</span>
        <Link href={listing.author.href} className="font-medium text-foreground transition-colors hover:text-primary">
          {listing.author.label}
        </Link>
      </div>
      <span className="text-muted-foreground">•</span>
      {listing.stars && (
        <>
          <div className="flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-1">
            <StarIcon className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-geist-mono text-xs font-medium text-primary">{listing.stars}</span>
          </div>
          <span className="text-muted-foreground">•</span>
        </>
      )}
      <HeaderActions entityName={listing.name} shareUrl={shareUrl} githubUrl={null} npmUrl={null} />
    </div>
  );
}

interface ItemHeroProps {
  readonly listing: Listing;
  readonly categoryName: string;
  readonly shareUrl: string;
}

export function ItemHero({ listing, categoryName, shareUrl }: ItemHeroProps) {
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
            <Breadcrumbs category={{ label: categoryName, href: `/categories/${listing.category}` }} name={listing.name} />
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
                          {listing.name}
                        </h1>
                      </div>
                      <MetaRow listing={listing} shareUrl={shareUrl} />
                    </div>
                  </div>
                </div>
                <div data-server-detail-categories className="mb-5 flex flex-wrap items-center gap-2">
                  {listing.tags.map((tag) => (
                    <div
                      key={tag}
                      className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 font-sans text-[10px] font-semibold tracking-[0.06em] text-muted-foreground uppercase"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                  <p
                    data-server-detail-description
                    className="max-w-3xl font-sans text-base leading-relaxed font-normal text-muted-foreground md:text-lg md:leading-7 lg:text-xl lg:leading-7"
                  >
                    {listing.summary}
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
