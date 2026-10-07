import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/blocks/data-table";
import { buttonVariants } from "@/components/ui/button";
import { PLATFORMS, VIDEOS } from "@/content/dashboard";

export const metadata: Metadata = { title: "Videos" };

const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "scheduled", label: "Scheduled" },
  { value: "published", label: "Published" },
  { value: "failed", label: "Failed" },
] as const;

interface VideosPageProps {
  readonly searchParams: Promise<Readonly<Record<string, string | string[] | undefined>>>;
}

export default async function VideosPage({ searchParams }: VideosPageProps) {
  const { q } = await searchParams;
  const rows = VIDEOS.map((video) => ({ ...video }));

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-2xl tracking-[-0.03em]">Videos</h1>
        <Link href="/app/videos/new" className={buttonVariants()}>
          <Plus aria-hidden /> New video
        </Link>
      </div>
      <DataTable
        rows={rows}
        columns={[
          { key: "title", header: "Title", kind: "text", sortable: true },
          { key: "platforms", header: "Platforms", kind: "tags", labels: Object.fromEntries(PLATFORMS.map((p) => [p.id, p.label])) },
          { key: "status", header: "Status", kind: "badge", sortable: true, labels: Object.fromEntries(STATUS_OPTIONS.map((s) => [s.value, s.label])) },
          { key: "scheduledAt", header: "Scheduled", kind: "date", sortable: true },
          { key: "views", header: "Views", kind: "number", sortable: true },
        ]}
        searchKeys={["title"]}
        searchPlaceholder="Search videos"
        filter={{ key: "status", label: "Statuses", options: STATUS_OPTIONS }}
        actions={[{ label: "Edit", href: "/app/videos/new?from={id}" }]}
        badgeTones={{ draft: "neutral", scheduled: "info", published: "success", failed: "danger" }}
        emptyMessage="No videos match your search."
        initialQuery={typeof q === "string" ? q : ""}
      />
    </div>
  );
}
