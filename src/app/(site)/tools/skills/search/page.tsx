import { permanentRedirect } from "next/navigation";
import type { RawSearchParams } from "@/components/sites/mcpmarket-com-1a9fdbee/search-6fb5b778/search-index";

interface SkillsSearchPageProps {
  readonly searchParams: Promise<RawSearchParams>;
}

/**
 * The source redirects this route to the skills tab of /search. With a query it
 * loops forever there (ERR_TOO_MANY_REDIRECTS); here the query is carried over instead.
 */
export default async function SkillsSearchPage({ searchParams }: SkillsSearchPageProps) {
  const { q } = await searchParams;
  const query = (Array.isArray(q) ? q[0] : q)?.trim();
  permanentRedirect(query ? `/search?q=${encodeURIComponent(query)}&type=skills` : "/search?type=skills");
}
