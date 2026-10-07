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

test("formatBytes handles unit boundaries and bad input", () => {
  strictEqual(formatBytes(1023), "1023 B");
  strictEqual(formatBytes(1024), "1.0 KB");
  strictEqual(formatBytes(1048575), "1.0 MB");
  strictEqual(formatBytes(5 * 1024 ** 4), "5.0 TB");
  strictEqual(formatBytes(-1), "—");
  strictEqual(formatBytes(NaN), "—");
});

test("formatNumber groups thousands", () => {
  strictEqual(formatNumber(12400), "12,400");
});
