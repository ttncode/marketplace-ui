import { formatDateTime } from "@/lib/format";
import type { ActivityItem } from "@/lib/types";

export function ActivityList({ title = "Recent activity", items }: { readonly title?: string; readonly items: readonly ActivityItem[] }) {
  return (
    <section className="rounded-[var(--design-radius-lg)] border border-border bg-surface p-5">
      <h2 className="text-sm font-medium text-ink">{title}</h2>
      {items.length === 0 ? (
        <p className="mt-4 text-sm text-ink-muted">Nothing yet.</p>
      ) : (
        <ol className="mt-4 space-y-4">
          {items.map((item) => (
            <li key={item.id} className="flex gap-3 text-sm">
              <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-ink-muted" />
              <div>
                <p className="text-ink">{item.message}</p>
                <time dateTime={item.at} className="text-xs text-ink-muted">
                  {formatDateTime(item.at)}
                </time>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
