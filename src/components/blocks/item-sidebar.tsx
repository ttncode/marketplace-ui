import Link from "next/link";
import styles from "./item-detail.module.css";
import { ExternalLinkIcon } from "@/components/icons/detail-icons";
import type { LinkRef } from "@/lib/types";
import type { RelatedListing } from "./item-types";

function PrimaryAction({ link }: { readonly link: LinkRef }) {
  return (
    <div data-item-primary-actions className="flex w-full flex-col gap-2">
      <Link
        href={link.href}
        className="inline-flex h-11 w-full items-center justify-between gap-2 rounded-[10px] border border-foreground/20 bg-surface/20 px-4 font-sans text-sm font-normal tracking-[-0.01em] whitespace-nowrap text-foreground shadow-none ring-offset-background backdrop-blur-xl transition-all duration-200 hover:border-foreground/25 hover:bg-surface/40 hover:shadow-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        {link.label}
        <ExternalLinkIcon className="h-3 w-3" />
      </Link>
    </div>
  );
}

function RelatedCard({ items }: { readonly items: readonly RelatedListing[] }) {
  return (
    <nav aria-label="Related" className="related-content">
      <div
        data-item-card
        className="overflow-hidden rounded-[12px] border border-border bg-card text-card-foreground shadow-[var(--design-shadow-card)]"
      >
        <div className="flex flex-col space-y-1.5 border-b border-border bg-muted/50 px-4 py-3">
          <h3 className="text-lg leading-7 text-foreground">Related</h3>
        </div>
        <div className="p-0">
          <ul className="divide-y divide-border">
            {items.map((item) => (
              <li key={item.slug}>
                <Link href={`/item/${item.slug}`} prefetch={false} className="group block px-4 py-4 transition-colors hover:bg-muted/50">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      {item.icon && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.icon.src}
                          alt={item.icon.alt}
                          width={18}
                          height={18}
                          loading="lazy"
                          className="shrink-0 rounded-full object-cover opacity-50 grayscale transition-all duration-200 group-hover:opacity-100 group-hover:grayscale-0"
                        />
                      )}
                      <h3 className="text-sm leading-5 font-medium text-foreground">{item.name}</h3>
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{item.summary}</p>
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

interface ItemSidebarProps {
  readonly primary: LinkRef | null;
  readonly related: readonly RelatedListing[];
}

export function ItemSidebar({ primary, related }: ItemSidebarProps) {
  return (
    <div className={`${styles.sidebar} lg:col-span-1`}>
      <div className="sticky top-24 space-y-5">
        <aside className="space-y-5">{primary && <PrimaryAction link={primary} />}</aside>
        {related.length > 0 && <RelatedCard items={related} />}
      </div>
    </div>
  );
}
