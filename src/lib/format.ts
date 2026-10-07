const DATE_TIME = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZone: "UTC",
});

export function formatDateTime(iso: string | null): string {
  if (iso === null) return "—";
  const time = Date.parse(iso);
  return Number.isNaN(time) ? "—" : `${DATE_TIME.format(time)} UTC`;
}

const UNITS = ["B", "KB", "MB", "GB", "TB"] as const;

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "—";
  let value = bytes;
  let unit = 0;
  // Compare the rounded value so 1048575 B becomes 1.0 MB, not 1024.0 KB.
  while (Math.round(value * 10) / 10 >= 1024 && unit < UNITS.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return unit === 0 ? `${value} B` : `${value.toFixed(1)} ${UNITS[unit]}`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
}
