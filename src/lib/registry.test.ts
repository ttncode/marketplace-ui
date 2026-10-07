import { deepStrictEqual } from "node:assert";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { test } from "node:test";

interface RegistryItem {
  readonly name: string;
  readonly dependencies?: readonly string[];
  readonly registryDependencies?: readonly string[];
  readonly files: readonly { readonly path: string }[];
}

const ROOT = new URL("../..", import.meta.url).pathname;
const registry = JSON.parse(readFileSync(join(ROOT, "registry.json"), "utf8")) as { items: readonly RegistryItem[] };
const items = registry.items;
const byName = new Map(items.map((item) => [item.name, item]));
const owner = new Map(items.flatMap((item) => item.files.map((file) => [file.path, item.name] as const)));

/** Packages every consuming Next.js app already has. */
const PROVIDED = new Set(["react", "react-dom", "next"]);
/** Folders whose every file must ship in the registry. */
const SHIPPED_DIRS = ["src/components/ui", "src/components/blocks", "src/components/layout", "src/components/icons"];

function walk(dir: string): string[] {
  return readdirSync(join(ROOT, dir)).flatMap((entry) => {
    const path = `${dir}/${entry}`;
    return statSync(join(ROOT, path)).isDirectory() ? walk(path) : [path];
  });
}

function resolveImport(fromFile: string, specifier: string): string | null {
  const base = specifier.startsWith("@/") ? join(ROOT, "src", specifier.slice(2)) : resolve(dirname(join(ROOT, fromFile)), specifier);
  for (const candidate of [base, `${base}.ts`, `${base}.tsx`]) {
    if (existsSync(candidate) && statSync(candidate).isFile()) return relative(ROOT, candidate);
  }
  return null;
}

const packageName = (specifier: string) => specifier.split("/").slice(0, specifier.startsWith("@") ? 2 : 1).join("/");

function dependencyClosure(name: string, seen = new Set<string>()): Set<string> {
  if (seen.has(name)) return seen;
  seen.add(name);
  for (const dep of byName.get(name)?.registryDependencies ?? []) {
    if (dep.startsWith("@ttn/")) dependencyClosure(dep.slice("@ttn/".length), seen);
  }
  return seen;
}

test("item names are unique and every file exists", () => {
  deepStrictEqual(items.length, byName.size);
  deepStrictEqual(items.flatMap((item) => item.files.map((f) => f.path)).filter((path) => !existsSync(join(ROOT, path))), []);
});

test("every @ttn registry dependency names an item", () => {
  const missing = items.flatMap((item) =>
    (item.registryDependencies ?? []).filter((dep) => dep.startsWith("@ttn/") && !byName.has(dep.slice("@ttn/".length))).map((dep) => `${item.name} -> ${dep}`),
  );
  deepStrictEqual(missing, []);
});

test("every shipped component file belongs to exactly one item", { skip: items.length === 0 ? "registry items arrive in Tasks 91–93" : false }, () => {
  const files = SHIPPED_DIRS.flatMap(walk).filter((path) => !path.endsWith(".test.ts"));
  deepStrictEqual(files.filter((path) => !owner.has(path)), []);
  const counts = new Map<string, number>();
  items.forEach((item) => item.files.forEach((f) => counts.set(f.path, (counts.get(f.path) ?? 0) + 1)));
  deepStrictEqual([...counts].filter(([, count]) => count > 1).map(([path]) => path), []);
});

test("every import is satisfied by the item, its registry dependencies, or its npm dependencies", () => {
  const problems: string[] = [];
  for (const item of items) {
    const reachable = dependencyClosure(item.name);
    for (const file of item.files) {
      if (!/\.(tsx?|ts)$/.test(file.path)) continue;
      const source = readFileSync(join(ROOT, file.path), "utf8");
      for (const match of source.matchAll(/from\s+"([^"]+)"|import\s+"([^"]+)"/g)) {
        const specifier = match[1] ?? match[2];
        if (!specifier) continue;
        if (specifier.startsWith("@/") || specifier.startsWith(".")) {
          const target = resolveImport(file.path, specifier);
          const targetItem = target ? owner.get(target) : undefined;
          if (!targetItem || !reachable.has(targetItem)) problems.push(`${item.name}: ${file.path} imports ${specifier}`);
        } else if (!specifier.startsWith("node:")) {
          const pkg = packageName(specifier);
          if (!PROVIDED.has(pkg) && !(item.dependencies ?? []).includes(pkg)) problems.push(`${item.name}: needs npm dependency ${pkg}`);
        }
      }
    }
  }
  deepStrictEqual(problems, []);
});
