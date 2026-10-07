import { strictEqual } from "node:assert";
import { test } from "node:test";

import { isDark, parsePreference, THEME_SCRIPT } from "./theme.ts";

test("parsePreference falls back to system for anything unknown", () => {
  strictEqual(parsePreference("light"), "light");
  strictEqual(parsePreference("dark"), "dark");
  strictEqual(parsePreference(null), "system");
  strictEqual(parsePreference("purple"), "system");
  strictEqual(parsePreference(""), "system");
});

test("isDark follows the system only in system mode", () => {
  strictEqual(isDark("system", true), true);
  strictEqual(isDark("system", false), false);
  strictEqual(isDark("light", true), false);
  strictEqual(isDark("dark", false), true);
});

function runScript(stored: string | null | Error, prefersDark: boolean) {
  const classes = new Set<string>();
  const root = {
    classList: { toggle: (name: string, on: boolean) => (on ? classes.add(name) : classes.delete(name)) },
    style: { colorScheme: "" },
  };
  const storage = {
    getItem: () => {
      if (stored instanceof Error) throw stored;
      return stored;
    },
  };
  const matchMedia = () => ({ matches: prefersDark });
  new Function("localStorage", "matchMedia", "document", THEME_SCRIPT)(storage, matchMedia, { documentElement: root });
  return { dark: classes.has("dark"), scheme: root.style.colorScheme };
}

test("the inline script agrees with isDark for every stored value", () => {
  for (const stored of ["light", "dark", null, "garbage"]) {
    for (const prefersDark of [true, false]) {
      strictEqual(runScript(stored, prefersDark).dark, isDark(parsePreference(stored), prefersDark), `${stored}/${prefersDark}`);
    }
  }
});

test("the inline script survives storage that throws and follows the system", () => {
  strictEqual(runScript(new Error("SecurityError"), true).dark, true);
  strictEqual(runScript(new Error("SecurityError"), false).scheme, "light");
});
