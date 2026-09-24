import Link from "next/link";
import { ContentPageHero } from "@/components/sites/mcpmarket-com-1a9fdbee/privacy-0ece7f7c/ContentPageHero";
import { ChevronLeftIcon, ChevronRightIcon, EllipsisIcon } from "./icons";
import { NewsCard } from "./NewsCard";
import { NEWS_ITEMS, NEWS_PAGE_COUNT, NEWS_TOTAL } from "./news-data";

const PAGE_BUTTON_BASE =
  "rounded-lg border border-input font-sans text-sm leading-5 font-normal tracking-[-0.01em] whitespace-nowrap backdrop-blur-xl transition-[background-color,border-color,color,box-shadow,transform,translate,scale,rotate] duration-200 hover:border-foreground/25";
const STEP_BUTTON = `${PAGE_BUTTON_BASE} flex h-9 items-center justify-center gap-1 bg-[var(--design-glass)] px-3 text-foreground hover:bg-[var(--design-surface-subtle)] disabled:pointer-events-none disabled:opacity-50`;
const PAGE_LINK = `${PAGE_BUTTON_BASE} inline-flex h-8 w-8 items-center justify-center bg-card p-0 text-muted-foreground hover:bg-muted`;

// Later pages (/news/page/N) are not built and 404, as the scope rule requires.
const VISIBLE_PAGES = [2, 3, 4] as const;
const pageHref = (page: number) => `/news/page/${page}`;

function NewsPagination() {
  return (
    <nav aria-label="News pagination" className="flex flex-col items-center space-y-4 border-t border-border pt-8">
      <div className="text-center font-geist-mono text-sm text-muted-foreground">
        Showing page 1 of {NEWS_PAGE_COUNT} ({NEWS_TOTAL} total articles)
      </div>
      <div className="flex items-center space-x-1">
        <button type="button" disabled className={STEP_BUTTON}>
          <ChevronLeftIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>
        <div className="flex items-center space-x-1">
          <button
            type="button"
            disabled
            className="inline-flex h-8 w-8 items-stretch rounded-md border border-black/10 bg-primary bg-linear-to-b from-black/70 to-black p-px font-sans font-normal text-primary-foreground"
          >
            <span className="flex h-full w-full items-center justify-center rounded-[4px] bg-linear-to-b from-[#262626] to-black px-4 py-1 text-xs tracking-[-0.01em] whitespace-nowrap text-white/90">
              <span aria-current="page">1</span>
            </span>
          </button>
          {VISIBLE_PAGES.map((page) => (
            <Link key={page} href={pageHref(page)} aria-label={`Page ${page} of ${NEWS_PAGE_COUNT}`} className={PAGE_LINK}>
              {page}
            </Link>
          ))}
          <div className="flex h-8 w-8 items-center justify-center text-muted-foreground">
            <EllipsisIcon className="h-4 w-4" />
          </div>
          <Link
            href={pageHref(NEWS_PAGE_COUNT)}
            aria-label={`Page ${NEWS_PAGE_COUNT} of ${NEWS_PAGE_COUNT}`}
            className={PAGE_LINK}
          >
            {NEWS_PAGE_COUNT}
          </Link>
        </div>
        <Link href={pageHref(2)} rel="next" aria-label="Next page" className={STEP_BUTTON}>
          <span className="hidden sm:inline">Next</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </nav>
  );
}

export function NewsPage() {
  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen flex-col bg-[var(--design-canvas)] font-sans text-[var(--design-ink)]">
        <ContentPageHero
          align="center"
          crumb="MCP Server News"
          // The source marks "News" `text-black/48`, a class Tailwind v3 never generates, so it renders in ink.
          title="MCP News"
          subtitle="Latest model context protocol news and updates"
        />
        <div className="flex-1 py-8 md:py-12">
          <div className="mx-auto max-w-7xl space-y-6 px-6 md:px-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {NEWS_ITEMS.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
            <NewsPagination />
          </div>
        </div>
      </div>
    </main>
  );
}
