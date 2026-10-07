import { strictEqual } from "node:assert";
import { test } from "node:test";

import { activeHref } from "./nav.ts";

const hrefs = ["/app", "/app/videos", "/app/videos/new", "/app/settings"];

test("picks the most specific matching href", () => {
  strictEqual(activeHref("/app", hrefs), "/app");
  strictEqual(activeHref("/app/videos", hrefs), "/app/videos");
  strictEqual(activeHref("/app/videos/new", hrefs), "/app/videos/new");
  strictEqual(activeHref("/app/videos/123", hrefs), "/app/videos");
});

test("does not match on a shared prefix that is not a path segment", () => {
  strictEqual(activeHref("/app/videosx", hrefs), "/app");
  strictEqual(activeHref("/application", hrefs), null);
});
