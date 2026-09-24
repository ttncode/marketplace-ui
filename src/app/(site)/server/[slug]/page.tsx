import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVER_DETAILS } from "@/components/sites/mcpmarket-com-1a9fdbee/server-slug-89dc0d19/data";
import styles from "@/components/sites/mcpmarket-com-1a9fdbee/server-slug-89dc0d19/detail.module.css";
import { ServerDetailHero } from "@/components/sites/mcpmarket-com-1a9fdbee/server-slug-89dc0d19/ServerDetailHero";
import { ServerSidebar } from "@/components/sites/mcpmarket-com-1a9fdbee/server-slug-89dc0d19/ServerSidebar";
import { ServerTabs } from "@/components/sites/mcpmarket-com-1a9fdbee/server-slug-89dc0d19/ServerTabs";

interface ServerPageProps {
  readonly params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(SERVER_DETAILS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServerPageProps): Promise<Metadata> {
  const server = SERVER_DETAILS[(await params).slug];
  if (!server) return {};
  return { title: server.title, description: server.metaDescription };
}

export default async function ServerDetailPage({ params }: ServerPageProps) {
  const server = SERVER_DETAILS[(await params).slug];
  if (!server) notFound();

  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen flex-col bg-[var(--design-canvas)] font-sans text-[var(--design-ink)] antialiased selection:bg-black/15 selection:text-black">
        <ServerDetailHero server={server} />
        <div className={`${styles.main} flex-1`}>
          <div className="container mx-auto max-w-7xl px-6 md:px-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-7">
              <section className="min-w-0 lg:col-span-3">
                <ServerTabs data={server.tabs} />
              </section>
              <ServerSidebar actions={server.primaryActions} related={server.related} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
