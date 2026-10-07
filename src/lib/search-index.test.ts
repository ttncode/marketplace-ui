import { deepStrictEqual } from "node:assert";
import { test } from "node:test";

import { parseSearchParams, searchListings } from "./search-index.ts";

const rows = [
  { slug: "a", name: "Alpha Cut", summary: "Video editor", category: "video", tags: ["edit"] },
  { slug: "b", name: "Beta Board", summary: "Storyboards", category: "video", tags: ["plan"] },
  { slug: "c", name: "Gamma", summary: "Charts", category: "analytics", tags: ["edit"] },
];

test("parseSearchParams trims the query and takes the first value of repeated params", () => {
  deepStrictEqual(parseSearchParams({ q: "  cut ", category: ["video", "x"] }), { query: "cut", categorySlug: "video" });
  deepStrictEqual(parseSearchParams({}), { query: "", categorySlug: "" });
});

test("empty query returns everything in the category", () => {
  deepStrictEqual(searchListings(rows, { query: "", categorySlug: "video" }).map((r) => r.slug), ["a", "b"]);
  deepStrictEqual(searchListings(rows, { query: "", categorySlug: "" }).map((r) => r.slug), ["a", "b", "c"]);
});

test("query matches name, summary and tags case-insensitively", () => {
  deepStrictEqual(searchListings(rows, { query: "EDIT", categorySlug: "" }).map((r) => r.slug), ["a", "c"]);
  deepStrictEqual(searchListings(rows, { query: "storyboard", categorySlug: "" }).map((r) => r.slug), ["b"]);
});

test("name matches rank before summary or tag matches", () => {
  const ranked = searchListings(
    [
      { slug: "x", name: "Other", summary: "has cut inside", category: "v", tags: [] },
      { slug: "y", name: "Cut Pro", summary: "", category: "v", tags: [] },
    ],
    { query: "cut", categorySlug: "" },
  );
  deepStrictEqual(ranked.map((r) => r.slug), ["y", "x"]);
});
