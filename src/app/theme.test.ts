import { deepStrictEqual, ok } from "node:assert";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const css = readFileSync(new URL("./theme.css", import.meta.url), "utf8");

/** Custom property names declared inside the first `<selector> {` block of theme.css. */
function declared(selector: string): Set<string> {
  const start = css.indexOf(`${selector} {`);
  if (start === -1) return new Set();
  const end = css.indexOf("\n}", start);
  return new Set(css.slice(start, end).match(/--[\w-]+(?=\s*:)/g) ?? []);
}

/** Fonts and radii do not change between themes. */
const THEME_INDEPENDENT = /^--(?:design-font|design-radius|radius$)/;

test("every themed token in :root is redefined in .dark", () => {
  const dark = declared(".dark");
  ok(dark.size > 0);
  const missing = [...declared(":root")].filter((name) => !THEME_INDEPENDENT.test(name) && !dark.has(name));
  deepStrictEqual(missing, []);
});

test(".dark declares nothing that :root does not", () => {
  const light = declared(":root");
  deepStrictEqual([...declared(".dark")].filter((name) => !light.has(name)), []);
});
