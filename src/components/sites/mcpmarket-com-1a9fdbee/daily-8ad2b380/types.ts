export interface DailySnapshot {
  readonly href: string;
  readonly date: string;
  readonly count: string;
}

export interface DailyLink {
  readonly label: string;
  readonly href: string;
}

export interface DailyHeroContent {
  /** Breadcrumb trail between Home and the current page. */
  readonly crumbs: readonly DailyLink[];
  readonly current: string;
  readonly title: string;
  readonly subtitle: string;
  readonly links: readonly DailyLink[];
}

export type DailyVariant = "server" | "skill";
