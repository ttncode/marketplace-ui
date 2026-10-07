import type { Metadata } from "next";
import { VideoComposeForm } from "@/components/blocks/video-compose-form";
import { PLATFORMS, VIDEOS } from "@/content/dashboard";

export const metadata: Metadata = { title: "New video" };

interface NewVideoPageProps {
  readonly searchParams: Promise<Readonly<Record<string, string | string[] | undefined>>>;
}

export default async function NewVideoPage({ searchParams }: NewVideoPageProps) {
  const { from } = await searchParams;
  const source = typeof from === "string" ? VIDEOS.find((video) => video.id === from) : undefined;
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="font-display text-2xl tracking-[-0.03em]">New video</h1>
      <VideoComposeForm key={source?.id ?? "new"} platforms={PLATFORMS} defaultTitle={source?.title} defaultPlatforms={source?.platforms} />
    </div>
  );
}
