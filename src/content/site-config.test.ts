import { ok, strictEqual } from "node:assert";
import { test } from "node:test";

import { site } from "../site.config.ts";

test("site config has a name, an absolute url and a description", () => {
  ok(site.name.length > 0);
  strictEqual(new URL(site.url).protocol, "https:");
  ok(site.description.length > 0);
});

test("site config logos are public paths", () => {
  ok(site.logo.light.startsWith("/"));
  ok(site.logo.dark.startsWith("/"));
});
