import { deepStrictEqual } from "node:assert";
import { test } from "node:test";

import { filterByValue, filterRows, nextSort, sortRows, type TableRow } from "./table.ts";

const rows: TableRow[] = [
  { id: "a", title: "Studio tour", views: 900, at: "2026-03-02T10:00:00Z", status: "published", platforms: ["youtube"] },
  { id: "b", title: "Q&A", views: 12000, at: null, status: "draft", platforms: [] },
  { id: "c", title: "studio lights", views: 900, at: "2026-01-15T08:00:00Z", status: "scheduled", platforms: ["tiktok", "youtube"] },
  { id: "d", title: "Bloopers 10", views: 50, at: "", status: "failed", platforms: ["tiktok"] },
];

const ids = (list: readonly TableRow[]) => list.map((row) => row.id);

test("nextSort cycles asc, desc, off, and restarts on a new column", () => {
  deepStrictEqual(nextSort(null, "views"), { key: "views", direction: "asc" });
  deepStrictEqual(nextSort({ key: "views", direction: "asc" }, "views"), { key: "views", direction: "desc" });
  deepStrictEqual(nextSort({ key: "views", direction: "desc" }, "views"), null);
  deepStrictEqual(nextSort({ key: "views", direction: "desc" }, "title"), { key: "title", direction: "asc" });
});

test("numbers sort numerically and ties keep input order", () => {
  deepStrictEqual(ids(sortRows(rows, { key: "views", direction: "asc" })), ["d", "a", "c", "b"]);
  deepStrictEqual(ids(sortRows(rows, { key: "views", direction: "desc" })), ["b", "a", "c", "d"]);
});

test("empty values sort last in both directions", () => {
  deepStrictEqual(ids(sortRows(rows, { key: "at", direction: "asc" })), ["c", "a", "b", "d"]);
  deepStrictEqual(ids(sortRows(rows, { key: "at", direction: "desc" })), ["a", "c", "b", "d"]);
});

test("text sorts case-insensitively with numeric awareness, and a missing key does not throw", () => {
  deepStrictEqual(ids(sortRows(rows, { key: "title", direction: "asc" })), ["d", "b", "c", "a"]);
  deepStrictEqual(ids(sortRows(rows, { key: "nope", direction: "asc" })), ["a", "b", "c", "d"]);
  deepStrictEqual(ids(sortRows(rows, null)), ["a", "b", "c", "d"]);
});

test("filterRows matches any key case-insensitively, including list cells", () => {
  deepStrictEqual(ids(filterRows(rows, "  STUDIO ", ["title"])), ["a", "c"]);
  deepStrictEqual(ids(filterRows(rows, "tiktok", ["title", "platforms"])), ["c", "d"]);
  deepStrictEqual(ids(filterRows(rows, "   ", ["title"])), ["a", "b", "c", "d"]);
});

test("filterByValue matches exact values and list membership", () => {
  deepStrictEqual(ids(filterByValue(rows, "status", "draft")), ["b"]);
  deepStrictEqual(ids(filterByValue(rows, "platforms", "youtube")), ["a", "c"]);
  deepStrictEqual(ids(filterByValue(rows, "status", null)), ["a", "b", "c", "d"]);
});
