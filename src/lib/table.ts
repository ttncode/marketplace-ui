export type CellValue = string | number | null | readonly string[];
export type TableRow = { readonly id: string } & Readonly<Record<string, CellValue>>;
export type SortDirection = "asc" | "desc";

export interface SortState {
  readonly key: string;
  readonly direction: SortDirection;
}

export function nextSort(current: SortState | null, key: string): SortState | null {
  if (current?.key !== key) return { key, direction: "asc" };
  return current.direction === "asc" ? { key, direction: "desc" } : null;
}

const isEmpty = (value: CellValue | undefined) =>
  value === undefined ||
  value === null ||
  value === "" ||
  (typeof value === "number" && Number.isNaN(value)) ||
  (Array.isArray(value) && value.length === 0);

const asText = (value: CellValue | undefined) => (Array.isArray(value) ? value.join(", ") : String(value ?? ""));

function asNumber(value: CellValue | undefined): number {
  if (typeof value === "number") return value;
  if (typeof value !== "string" || !value.trim()) return NaN;
  const stripped = value.replace(/[,\s]/g, "");
  return /^[+-]?\d+(\.\d+)?$/.test(stripped) ? Number(stripped) : NaN;
}

function compare(a: CellValue | undefined, b: CellValue | undefined): number {
  const x = asNumber(a);
  const y = asNumber(b);
  if (Number.isFinite(x) && Number.isFinite(y)) return x - y;
  return asText(a).localeCompare(asText(b), "en", { numeric: true, sensitivity: "base" });
}

/** Stable sort; empty cells go last whatever the direction. */
export function sortRows<T extends TableRow>(rows: readonly T[], sort: SortState | null): T[] {
  if (!sort) return [...rows];
  const factor = sort.direction === "asc" ? 1 : -1;
  return rows
    .map((row, index) => ({ row, index }))
    .sort((x, y) => {
      const a = x.row[sort.key];
      const b = y.row[sort.key];
      const aEmpty = isEmpty(a);
      const bEmpty = isEmpty(b);
      if (aEmpty || bEmpty) return aEmpty === bEmpty ? x.index - y.index : aEmpty ? 1 : -1;
      return compare(a, b) * factor || x.index - y.index;
    })
    .map(({ row }) => row);
}

export function filterRows<T extends TableRow>(rows: readonly T[], query: string, keys: readonly string[]): T[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return [...rows];
  return rows.filter((row) => keys.some((key) => asText(row[key]).toLowerCase().includes(needle)));
}

export function filterByValue<T extends TableRow>(rows: readonly T[], key: string, value: string | null): T[] {
  if (value === null) return [...rows];
  return rows.filter((row) => {
    const cell = row[key];
    return Array.isArray(cell) ? cell.includes(value) : String(cell ?? "") === value;
  });
}
