import { deepStrictEqual } from "node:assert";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { test } from "node:test";

const SRC = new URL("..", import.meta.url).pathname;
const COLOR = /#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?)\(|-(?:white|black)\b/;

/** Files still waiting for their Phase 4 tokenize task. Only ever remove entries. */
const PENDING = new Set<string>([
  "components/icons/breadcrumb-icons.tsx",
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
