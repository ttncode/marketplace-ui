export interface SearchParams {
  readonly query: string;
  readonly categorySlug: string;
}

export type RawSearchParams = Readonly<Record<string, string | string[] | undefined>>;

export interface Searchable {
  readonly slug: string;
  readonly name: string;
  readonly summary: string;
  readonly category: string;
  readonly tags: readonly string[];
}

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) ?? "";

export function parseSearchParams(raw: RawSearchParams): SearchParams {
  return { query: first(raw.q).trim(), categorySlug: first(raw.category).trim() };
}

/** Filters by category, then by a case-insensitive substring; name matches come first, original order otherwise. */
export function searchListings<T extends Searchable>(listings: readonly T[], { query, categorySlug }: SearchParams): T[] {
  const inCategory = categorySlug ? listings.filter((listing) => listing.category === categorySlug) : [...listings];
  const needle = query.toLowerCase();
  if (!needle) return inCategory;
  const byName = inCategory.filter((listing) => listing.name.toLowerCase().includes(needle));
  const byOther = inCategory.filter(
    (listing) =>
      !byName.includes(listing) &&
      (listing.summary.toLowerCase().includes(needle) || listing.tags.some((tag) => tag.toLowerCase().includes(needle))),
  );
  return [...byName, ...byOther];
}
