import Link from "next/link";
import { ExternalLinkIcon } from "@/components/icons/detail-icons";
import { CalendarIcon } from "@/components/icons/news-icons";
import type { Article } from "./article-types";

// A news or blog card; pass the article to link and show.
export function ArticleCard({ article }: { readonly article: Article }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--design-surface-glass-line)] bg-[var(--design-surface-glass)] text-card-foreground backdrop-blur-md transition-[transform,translate,scale,rotate,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-[var(--design-surface-glass-line-hover)] hover:bg-[var(--design-surface-glass-hover)]">
      <div className="relative z-10 flex flex-1 flex-col p-6">
        <Link href={article.href} className="group/title relative z-10 block">
          <h3 className="mb-3 line-clamp-2 font-display text-xl leading-7 font-medium tracking-[-0.025em] text-foreground transition-colors group-hover/title:text-black/65">
            {article.title}
          </h3>
        </Link>
        <p className="mb-5 line-clamp-3 flex-1 text-sm leading-relaxed font-light text-muted-foreground">{article.summary}</p>
        <div className="mt-auto flex items-center justify-between border-t border-border/30 pt-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2 pt-3">
            <span className="font-medium text-foreground/70">{article.source}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-3 w-3" />
              <time dateTime={article.publishedAt}>{article.relative}</time>
            </div>
          </div>
          <Link
            href={article.href}
            aria-label={`Read full article: ${article.title}`}
            className="relative z-20 flex items-center gap-1 pt-3 text-primary transition-colors hover:text-primary/80"
          >
            <span className="font-medium">Read more</span>
            <ExternalLinkIcon className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
