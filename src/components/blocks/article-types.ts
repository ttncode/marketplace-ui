export interface Article {
  readonly href: string;
  readonly title: string;
  readonly summary: string;
  readonly source: string;
  /** ISO timestamp for the `<time>` element. */
  readonly publishedAt: string;
  /** Pre-formatted, e.g. "3 months ago". */
  readonly relative: string;
}
