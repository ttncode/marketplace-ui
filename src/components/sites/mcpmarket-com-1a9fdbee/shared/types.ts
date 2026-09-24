export interface LinkRef {
  readonly label: string;
  readonly href: string;
}

export interface ImageRef {
  readonly src: string;
  readonly alt: string;
}

/**
 * "zero" reproduces a quirk of the source page: some cards render a bare "0"
 * text node where the star count would be.
 */
export type CardFooter =
  | { readonly kind: "stars"; readonly value: string }
  | { readonly kind: "zero" }
  | { readonly kind: "none" };

export interface DirectoryCard {
  readonly title: string;
  readonly href: string;
  readonly avatar: ImageRef;
  readonly description: string;
  readonly categories: readonly string[];
  readonly footer: CardFooter;
}

export interface DirectorySection {
  readonly title: string;
  readonly badge?: LinkRef;
  readonly viewAll: LinkRef;
  readonly cards: readonly DirectoryCard[];
}

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

export interface CategoryLink {
  readonly label: string;
  readonly href: string;
}

export type NavIconName =
  | "plugConnected"
  | "blocks"
  | "trendingUp"
  | "folderOpen"
  | "search"
  | "bookOpen"
  | "trophy"
  | "download"
  | "plus";

export interface NavFeatureCard {
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly image: string;
}

export interface NavListItem {
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly icon: NavIconName;
}

export interface NavMenu {
  readonly label: string;
  readonly icon: NavIconName;
  readonly hero: NavFeatureCard;
  readonly features: readonly [NavFeatureCard, NavFeatureCard];
  readonly links: readonly NavListItem[];
}

export interface MobileNavItem {
  readonly label: string;
  readonly href: string;
  readonly icon: NavIconName;
}

export interface MobileNavGroup {
  readonly heading: string;
  readonly items: readonly MobileNavItem[];
}

export interface FooterColumn {
  readonly heading: string;
  readonly links: readonly FooterLink[];
}

export type FooterLink =
  | { readonly kind: "link"; readonly label: string; readonly href: string }
  | { readonly kind: "button"; readonly label: string; readonly ariaLabel: string; readonly event: OverlayEvent };

/** Window events the source's footer buttons dispatch to open its lead-capture modals. */
export type OverlayEvent = "open-newsletter-modal" | "open-ad-modal" | "open-affiliates-modal";

export interface LeadFormField {
  readonly id: string;
  readonly label: string;
  readonly placeholder: string;
  readonly multiline: boolean;
}

export interface LeadForm {
  readonly event: OverlayEvent;
  /** Name the clone's pages may dispatch instead of the source's event. */
  readonly aliasEvent: string;
  readonly title: string;
  readonly description: string;
  readonly successTitle: string;
  readonly successDescription: string;
  readonly emailId: string;
  readonly fields: readonly LeadFormField[];
  readonly submitLabel: string;
}
