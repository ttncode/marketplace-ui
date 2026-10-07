"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Menu } from "@base-ui/react/menu";
import { ArrowDown, ArrowUp, ArrowUpDown, Ellipsis } from "lucide-react";
import { Badge, type BadgeTone } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { formatDateTime, formatNumber } from "@/lib/format";
import { filterByValue, filterRows, nextSort, sortRows, type CellValue, type SortState, type TableRow } from "@/lib/table";
import { cn } from "@/lib/utils";

export type ColumnKind = "text" | "number" | "date" | "badge" | "tags";

export interface DataTableColumn {
  readonly key: string;
  readonly header: string;
  readonly kind: ColumnKind;
  readonly sortable?: boolean;
  readonly labels?: Readonly<Record<string, string>>;
}

export interface DataTableFilter {
  readonly key: string;
  readonly label: string;
  readonly options: readonly { readonly value: string; readonly label: string }[];
}

export interface DataTableAction {
  readonly label: string;
  readonly href: string;
}

interface DataTableProps<T extends TableRow> {
  readonly rows: readonly T[];
  readonly columns: readonly DataTableColumn[];
  readonly searchKeys: readonly string[];
  readonly searchPlaceholder: string;
  readonly filter?: DataTableFilter;
  readonly actions?: readonly DataTableAction[];
  readonly badgeTones?: Readonly<Record<string, BadgeTone>>;
  readonly emptyMessage: string;
  readonly initialQuery?: string;
}

function Cell({ column, value, tones }: { readonly column: DataTableColumn; readonly value: CellValue | undefined; readonly tones?: Readonly<Record<string, BadgeTone>> }) {
  const label = (raw: string) => column.labels?.[raw] ?? raw;
  if (value === undefined || value === null || value === "" || (typeof value === "number" && Number.isNaN(value))) return <span className="text-ink-muted">—</span>;
  switch (column.kind) {
    case "number":
      return <span className="tabular-nums">{typeof value === "number" ? formatNumber(value) : String(value)}</span>;
    case "date":
      return <span className="whitespace-nowrap text-ink-secondary">{formatDateTime(String(value))}</span>;
    case "badge":
      return <Badge tone={tones?.[String(value)] ?? "neutral"}>{label(String(value))}</Badge>;
    case "tags":
      return (
        <span className="flex flex-wrap gap-1">
          {(Array.isArray(value) ? value : [String(value)]).map((tag) => (
            <Badge key={tag}>{label(tag)}</Badge>
          ))}
        </span>
      );
    default:
      return <span>{Array.isArray(value) ? value.map(label).join(", ") : label(String(value))}</span>;
  }
}

function SortIcon({ active }: { readonly active: SortState | null }) {
  if (!active) return <ArrowUpDown aria-hidden className="size-3.5 text-ink-muted" />;
  return active.direction === "asc" ? <ArrowUp aria-hidden className="size-3.5" /> : <ArrowDown aria-hidden className="size-3.5" />;
}

export function DataTable<T extends TableRow>({
  rows,
  columns,
  searchKeys,
  searchPlaceholder,
  filter,
  actions = [],
  badgeTones,
  emptyMessage,
  initialQuery = "",
}: DataTableProps<T>) {
  const [query, setQuery] = useState(initialQuery);
  const [filterValue, setFilterValue] = useState<string | null>(null);
  const [sort, setSort] = useState<SortState | null>(null);

  const visible = useMemo(() => {
    const searched = filterRows(rows, query, searchKeys);
    const filtered = filter ? filterByValue(searched, filter.key, filterValue) : searched;
    return sortRows(filtered, sort);
  }, [rows, query, searchKeys, filter, filterValue, sort]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={searchPlaceholder} aria-label={searchPlaceholder} className="sm:max-w-xs" />
        {filter && (
          <Select aria-label={filter.label} value={filterValue ?? ""} onChange={(event) => setFilterValue(event.target.value || null)} className="sm:w-44">
            <option value="">All {filter.label.toLowerCase()}</option>
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        )}
        <p className="text-sm text-ink-muted sm:ml-auto" aria-live="polite">
          {visible.length} of {rows.length}
        </p>
      </div>
      <div className="overflow-x-auto rounded-[var(--design-radius-lg)] border border-border bg-surface">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-surface-subtle text-xs text-ink-muted">
            <tr>
              {columns.map((column) => {
                const active = sort?.key === column.key ? sort : null;
                return (
                  <th
                    key={column.key}
                    scope="col"
                    aria-sort={active ? (active.direction === "asc" ? "ascending" : "descending") : undefined}
                    className={cn("px-4 py-3 font-medium", column.kind === "number" && "text-right")}
                  >
                    {column.sortable ? (
                      <button type="button" onClick={() => setSort(nextSort(sort, column.key))} className="inline-flex items-center gap-1 hover:text-ink">
                        {column.header}
                        <SortIcon active={active} />
                      </button>
                    ) : (
                      column.header
                    )}
                  </th>
                );
              })}
              {actions.length > 0 && (
                <th scope="col" className="w-12 px-4 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions.length > 0 ? 1 : 0)} className="px-4 py-10 text-center text-ink-muted">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              visible.map((row) => (
                <tr key={row.id} className="border-b border-border last:border-0 hover:bg-surface-subtle">
                  {columns.map((column) => (
                    <td key={column.key} className={cn("px-4 py-3 text-ink", column.kind === "number" && "text-right")}>
                      <Cell column={column} value={row[column.key]} tones={badgeTones} />
                    </td>
                  ))}
                  {actions.length > 0 && (
                    <td className="px-4 py-3 text-right">
                      <Menu.Root>
                        <Menu.Trigger aria-label="Row actions" className="rounded-md p-1.5 text-ink-muted hover:bg-accent hover:text-ink">
                          <Ellipsis aria-hidden className="size-4" />
                        </Menu.Trigger>
                        <Menu.Portal>
                          <Menu.Positioner sideOffset={4} align="end" className="z-[60]">
                            <Menu.Popup className="min-w-36 rounded-[12px] border border-border bg-popover p-1 text-sm shadow-[var(--design-shadow-floating)]">
                              {actions.map((action) => (
                                <Menu.Item
                                  key={action.label}
                                  render={<Link href={action.href.replace("{id}", encodeURIComponent(row.id))} />}
                                  className="flex rounded-[8px] px-2 py-1.5 outline-none data-[highlighted]:bg-accent"
                                >
                                  {action.label}
                                </Menu.Item>
                              ))}
                            </Menu.Popup>
                          </Menu.Positioner>
                        </Menu.Portal>
                      </Menu.Root>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
