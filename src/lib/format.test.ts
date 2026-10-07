import { strictEqual } from "node:assert";
import { test } from "node:test";

import { formatBytes, formatDateTime, formatNumber } from "./format.ts";

test("formatDateTime renders UTC and tolerates missing values", () => {
  strictEqual(formatDateTime("2026-03-04T14:05:00Z"), "Mar 4, 2026, 14:05 UTC");
  strictEqual(formatDateTime(null), "—");
  strictEqual(formatDateTime("not a date"), "—");
});

test("formatBytes picks a readable unit", () => {
  strictEqual(formatBytes(0), "0 B");
  strictEqual(formatBytes(1536), "1.5 KB");
  strictEqual(formatBytes(12 * 1024 * 1024), "12.0 MB");
});

test("formatNumber groups thousands", () => {
  strictEqual(formatNumber(12400), "12,400");
});
