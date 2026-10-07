import { deepStrictEqual } from "node:assert";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { test } from "node:test";

const SRC = new URL("..", import.meta.url).pathname;
const COLOR = /#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?)\(|-(?:white|black)\b/;

/** Files still waiting for their Phase 4 tokenize task. Only ever remove entries. */
const PENDING = new Set<string>([
  "components/blocks/announcement-bar.tsx",
  "components/blocks/article-card.tsx",
  "components/blocks/auth.module.css",
  "components/blocks/browse-by-category.tsx",
  "components/blocks/category-index.tsx",
  "components/blocks/content-page-hero.tsx",
  "components/blocks/faq.tsx",
  "components/blocks/item-detail.module.css",
  "components/blocks/item-hero.tsx",
  "components/blocks/item-sidebar.tsx",
  "components/blocks/lead-dialog.tsx",
  "components/blocks/legal-prose.module.css",
  "components/blocks/listing-hero.tsx",
  "components/blocks/listing-results.tsx",
  "components/blocks/listing-search.tsx",
  "components/blocks/newsletter-toast.tsx",
  "components/blocks/oauth-buttons.tsx",
  "components/blocks/ranked-hero.tsx",
  "components/blocks/ranked-list.tsx",
  "components/blocks/search-category-rail.tsx",
  "components/blocks/search-header.tsx",
  "components/blocks/search-results.tsx",
  "components/blocks/search-view.tsx",
  "components/blocks/submit-hero.tsx",
  "components/icons/breadcrumb-icons.tsx",
  "components/ui/form-field.tsx",
  "components/ui/texture-button.ts",
]);

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return files(full);
    return /\.(tsx?|css)$/.test(entry) && !entry.endsWith(".test.ts") ? [full] : [];
  });
}

const scanned = [...files(join(SRC, "components")), join(SRC, "app", "globals.css")];
const hasColor = (path: string) => COLOR.test(readFileSync(path, "utf8"));

test("components and globals.css use tokens, not color values", () => {
  const offenders = scanned.map((path) => relative(SRC, path)).filter((path) => !PENDING.has(path) && hasColor(join(SRC, path)));
  deepStrictEqual(offenders, []);
});

test("pending list only names files that exist and still contain colors", () => {
  const stale = [...PENDING].filter((path) => !existsSync(join(SRC, path)) || !hasColor(join(SRC, path)));
  deepStrictEqual(stale, []);
});
