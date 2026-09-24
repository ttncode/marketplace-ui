import Link from "next/link";
import type { McpClient } from "./types";

export function RelatedMcps({ client }: { readonly client: McpClient }) {
  return (
    <nav aria-label="Related MCPs" className="mt-8">
      <div className="overflow-hidden rounded-lg border border-border bg-card text-card-foreground">
        <div className="flex flex-col border-b border-border bg-muted/50 px-4 py-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg tracking-[-0.035em] text-foreground">Related MCPs</h3>
            <Link href={client.relatedViewMoreHref} className="text-xs text-muted-foreground transition-colors hover:text-primary">
              View more
            </Link>
          </div>
        </div>
        <ul className="divide-y divide-border">
          {client.related.map((tool) => (
            <li key={tool.href}>
              <Link href={tool.href} className="group block px-4 py-4 transition-colors hover:bg-muted/50">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={tool.avatar.src}
                      alt={tool.avatar.alt}
                      width={18}
                      height={18}
                      loading="lazy"
                      className="size-[18px] shrink-0 rounded-full object-cover opacity-50 grayscale transition-all duration-200 group-hover:opacity-100 group-hover:grayscale-0"
                    />
                    <h3 className="font-display text-sm font-medium tracking-[-0.035em] text-foreground">{tool.name}</h3>
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{tool.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
