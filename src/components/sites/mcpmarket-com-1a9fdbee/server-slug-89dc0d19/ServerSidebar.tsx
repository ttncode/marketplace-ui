import Link from "next/link";
import { toSiteHref } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/links";
import styles from "./detail.module.css";
import { ExternalLinkIcon, RocketIcon } from "./icons";
import type { PrimaryActions, RelatedList } from "./types";

/** The one sponsor the source rotates into every server page. */
const AD = {
  href: "https://github.com/knoxgraeme/tieline",
  src: "/sites/mcpmarket-com-1a9fdbee/server-slug-89dc0d19/ads/tieline-ad.webp",
  alt: "Tieline — product intent grounded in code",
} as const;

function PrimaryActionButtons({ actions }: { readonly actions: PrimaryActions }) {
  return (
    <div data-server-detail-primary-actions className="flex w-full flex-col gap-2">
      {actions.run && (
        <div className="space-y-2">
          <p className="text-center font-sans text-[11px] text-muted-foreground">{actions.run.caption}</p>
          <Link
            href={toSiteHref(actions.run.href)}
            className="group/texture-button inline-flex w-full items-stretch justify-between rounded-[10px] border border-black/10 bg-primary bg-gradient-to-b from-black/70 to-black !p-px px-4 font-sans font-normal text-primary-foreground shadow-none transition duration-300 ease-in-out hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:transition-none"
          >
            <span className="flex h-full w-full items-center justify-center gap-2 rounded-[10px] bg-gradient-to-b from-neutral-800 to-black px-4 py-2 font-sans text-base font-normal tracking-[-0.01em] whitespace-nowrap text-white/90 transition-[background-image,color] duration-200 ease-out hover:from-stone-800 hover:to-neutral-800/70 active:from-black active:to-black motion-reduce:transition-none">
              {actions.run.label}
              <RocketIcon className="h-4 w-4" />
            </span>
          </Link>
        </div>
      )}
      {actions.tryNowHref && (
        <Link
          href={toSiteHref(actions.tryNowHref)}
          className="inline-flex h-11 w-full items-center justify-between gap-2 rounded-[10px] border border-foreground/20 bg-white/20 px-4 font-sans text-sm font-normal tracking-[-0.01em] whitespace-nowrap text-foreground shadow-none ring-offset-background backdrop-blur-xl transition-all duration-200 hover:border-foreground/25 hover:bg-white/40 hover:shadow-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Try Now
          <ExternalLinkIcon className="h-3 w-3" />
        </Link>
      )}
    </div>
  );
}

function RelatedCard({ list }: { readonly list: RelatedList }) {
  return (
    <nav aria-label={list.title} className="related-content">
      <div
        data-server-detail-card
        className="overflow-hidden rounded-[12px] border border-border bg-card text-card-foreground shadow-[var(--design-shadow-card)]"
      >
        <div className="flex flex-col space-y-1.5 border-b border-border bg-muted/50 px-4 py-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg leading-7 text-foreground">{list.title}</h3>
            <Link
              href={list.more.href}
              prefetch={false}
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              {list.more.label}
            </Link>
          </div>
        </div>
        <div className="p-0">
          <ul className="divide-y divide-border">
            {list.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  prefetch={false}
                  className="group block px-4 py-4 transition-colors hover:bg-muted/50"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.avatar.src}
                        alt={item.avatar.alt}
                        width={18}
                        height={18}
                        loading="lazy"
                        className="shrink-0 rounded-full object-cover opacity-50 grayscale transition-all duration-200 group-hover:opacity-100 group-hover:grayscale-0"
                      />
                      <h3 className="text-sm leading-5 font-medium text-foreground">{item.title}</h3>
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

interface ServerSidebarProps {
  readonly actions: PrimaryActions | null;
  readonly related: readonly RelatedList[];
}

export function ServerSidebar({ actions, related }: ServerSidebarProps) {
  return (
    <div className={`${styles.sidebar} lg:col-span-1`}>
      <div className="sticky top-24 space-y-5">
        <aside className="space-y-5">{actions && <PrimaryActionButtons actions={actions} />}</aside>
        <div aria-label="Sponsored" className="mx-auto w-full max-w-[240px]">
          <div className="relative">
            <Link
              href={toSiteHref(AD.href)}
              className="relative block overflow-hidden rounded-lg border border-border transition-colors hover:border-foreground/30"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={AD.src} alt={AD.alt} width={1080} height={1920} loading="lazy" className="h-auto w-full" />
            </Link>
            <p className="mt-2 text-center text-xs text-muted-foreground">Advertisement</p>
          </div>
        </div>
        {related.map((list) => (
          <RelatedCard key={list.title} list={list} />
        ))}
      </div>
    </div>
  );
}
