import type { CardFooter, DirectoryCard } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/types";
import { CATEGORY_LISTINGS, SERVER_CARDS } from "@/components/sites/mcpmarket-com-1a9fdbee/categories-slug-c9486983/listing-data";
import { DIRECTORY_SECTIONS } from "@/components/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/directory-data";
import { SERVER_ROWS, SKILL_ROWS } from "@/components/sites/mcpmarket-com-1a9fdbee/leaderboards-47b0390f/leaderboard-data";
import type { LeaderboardRow } from "@/components/sites/mcpmarket-com-1a9fdbee/leaderboards-47b0390f/types";
import { SKILLS } from "@/components/sites/mcpmarket-com-1a9fdbee/tools-skills-slug-229a0ca0/skills-data";

export type SearchType = "mcp" | "skills";

export interface SearchParams {
  readonly type: SearchType;
  readonly query: string;
  readonly categorySlug: string;
}

export type RawSearchParams = Readonly<Record<string, string | string[] | undefined>>;

function firstValue(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

export function parseSearchParams(raw: RawSearchParams): SearchParams {
  return {
    type: firstValue(raw.type) === "skills" ? "skills" : "mcp",
    query: firstValue(raw.q).trim(),
    categorySlug: firstValue(raw.category_slug),
  };
}

interface IndexEntry {
  readonly card: DirectoryCard;
  readonly stars: number;
  readonly categorySlugs: ReadonlySet<string>;
}

export function slugifyCategory(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseStars(footer: CardFooter): number {
  if (footer.kind !== "stars") return 0;
  const match = /^([\d.]+)(k?)$/i.exec(footer.value);
  if (!match) return 0;
  return Number(match[1]) * (match[2] ? 1000 : 1);
}

function rowToCard(row: LeaderboardRow): DirectoryCard {
  return {
    title: row.title,
    href: row.href,
    avatar: row.avatar,
    description: row.description,
    categories: [row.category],
    footer: { kind: "stars", value: row.stars },
  };
}

/** Merges every captured card per detail href; the first copy with a category wins. */
function buildIndex(cards: readonly DirectoryCard[], listingSlugs: ReadonlyMap<string, readonly string[]>): IndexEntry[] {
  const byHref = new Map<string, DirectoryCard>();
  for (const card of cards) {
    const known = byHref.get(card.href);
    if (!known || (known.categories.length === 0 && card.categories.length > 0)) byHref.set(card.href, card);
  }
  const entries = [...byHref.values()].map((card) => ({
    card,
    stars: parseStars(card.footer),
    categorySlugs: new Set([...card.categories.map(slugifyCategory), ...(listingSlugs.get(card.href) ?? [])]),
  }));
  // Stable sort: equal star counts keep the order the source listed them in.
  return entries.sort((a, b) => b.stars - a.stars);
}

function listingSlugsByHref(): Map<string, string[]> {
  const slugs = new Map<string, string[]>();
  for (const listing of CATEGORY_LISTINGS) {
    for (const card of listing.cards) slugs.set(card.href, [...(slugs.get(card.href) ?? []), listing.slug]);
  }
  return slugs;
}

const directoryCards = DIRECTORY_SECTIONS.flatMap((section) => section.cards);

const SERVER_INDEX = buildIndex(
  [
    ...SERVER_CARDS,
    ...directoryCards.filter((card) => card.href.startsWith("/server/")),
    ...CATEGORY_LISTINGS.flatMap((listing) => listing.cards),
    ...SERVER_ROWS.map(rowToCard),
  ],
  listingSlugsByHref(),
);

const SKILL_INDEX = buildIndex(
  [
    ...SKILL_ROWS.map(rowToCard),
    ...directoryCards.filter((card) => card.href.startsWith("/tools/skills/")),
    ...SKILLS.map((skill) => ({
      title: skill.name,
      href: `/tools/skills/${skill.slug}`,
      avatar: { src: skill.author.avatar, alt: skill.author.name },
      description: skill.summary,
      categories: [skill.category.label],
      footer: { kind: "stars" as const, value: skill.stars },
    })),
  ],
  new Map(),
);

const TITLE_WEIGHT = 10;
const CATEGORY_WEIGHT = 3;
const DESCRIPTION_WEIGHT = 1;
const EXACT_TITLE_BONUS = 100;

/**
 * The source ranks with a server-side semantic search. Locally: every query word must
 * appear in the title, description or category; title hits outrank category hits,
 * which outrank description hits; ties fall back to GitHub stars.
 */
function relevance(entry: IndexEntry, query: string, words: readonly string[]): number {
  const title = entry.card.title.toLowerCase();
  const description = entry.card.description.toLowerCase();
  const category = entry.card.categories.join(" ").toLowerCase();
  let score = title === query ? EXACT_TITLE_BONUS : 0;
  for (const word of words) {
    const wordScore =
      (title.includes(word) ? TITLE_WEIGHT : 0) +
      (category.includes(word) ? CATEGORY_WEIGHT : 0) +
      (description.includes(word) ? DESCRIPTION_WEIGHT : 0);
    if (wordScore === 0) return 0;
    score += wordScore;
  }
  return score;
}

function rank(entries: readonly IndexEntry[], rawQuery: string): IndexEntry[] {
  const query = rawQuery.trim().toLowerCase();
  const words = query.split(/\s+/).filter(Boolean);
  if (words.length === 0) return [...entries];
  return entries
    .map((entry) => ({ entry, score: relevance(entry, query, words) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ entry }) => entry);
}

export function searchCards({ type, query, categorySlug }: SearchParams): DirectoryCard[] {
  const index = type === "skills" ? SKILL_INDEX : SERVER_INDEX;
  const inCategory = categorySlug ? index.filter((entry) => entry.categorySlugs.has(categorySlug)) : index;
  const cards = rank(inCategory, query).map((entry) => entry.card);
  // Like the source, the unfiltered skills feed carries no category chips.
  if (type === "skills" && !query.trim()) return cards.map((card) => ({ ...card, categories: [] }));
  return cards;
}
