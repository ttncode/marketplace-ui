import type { Metadata } from "next";
import { SubmitHero } from "@/components/blocks/submit-hero";
import { SubmitView } from "@/components/blocks/submit-view";

interface SubmitPageProps {
  readonly searchParams: Promise<Readonly<Record<string, string | string[] | undefined>>>;
}

// The source keeps this title and description for `?type=skill` too.
export const metadata: Metadata = {
  title: "Submit an MCP Server",
  description:
    "Submit an MCP server to be featured on MCP Market. Share your MCP server with the community and help others discover powerful AI tools.",
};

export default async function SubmitPage({ searchParams }: SubmitPageProps) {
  const { type } = await searchParams;

  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen flex-col bg-[var(--design-canvas)]">
        <SubmitHero />
        <SubmitView initialType={type === "skill" ? "skill" : "server"} />
      </div>
    </main>
  );
}
