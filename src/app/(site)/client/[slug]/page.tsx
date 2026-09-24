import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MCP_CLIENTS } from "@/components/sites/mcpmarket-com-1a9fdbee/client-slug-53f8082a/client-data";
import { ClientHero } from "@/components/sites/mcpmarket-com-1a9fdbee/client-slug-53f8082a/ClientHero";
import { ClientTabs } from "@/components/sites/mcpmarket-com-1a9fdbee/client-slug-53f8082a/ClientTabs";
import { RelatedMcps } from "@/components/sites/mcpmarket-com-1a9fdbee/client-slug-53f8082a/RelatedMcps";

interface ClientPageProps {
  readonly params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return MCP_CLIENTS.map((client) => ({ slug: client.slug }));
}

async function findClient({ params }: ClientPageProps) {
  const { slug } = await params;
  const client = MCP_CLIENTS.find((candidate) => candidate.slug === slug);
  if (!client) notFound();
  return client;
}

export async function generateMetadata(props: ClientPageProps): Promise<Metadata> {
  const client = await findClient(props);
  return { title: client.metaTitle, description: client.metaDescription };
}

export default async function ClientPage(props: ClientPageProps) {
  const client = await findClient(props);

  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen flex-col bg-[var(--design-canvas)] font-sans text-[var(--design-ink)]">
        <ClientHero client={client} />
        <div className="flex-1 py-4 md:py-6">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-10">
              <div className="lg:col-span-3">
                <ClientTabs client={client} />
              </div>
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <RelatedMcps client={client} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
