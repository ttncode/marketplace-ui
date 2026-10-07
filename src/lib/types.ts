export interface LinkRef {
  readonly label: string;
  readonly href: string;
}

export interface ImageRef {
  readonly src: string;
  readonly alt: string;
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

export type OverlayEvent = "open-newsletter-modal" | "open-contact-modal";

export type FooterLink =
  | { readonly kind: "link"; readonly label: string; readonly href: string }
  | { readonly kind: "button"; readonly label: string; readonly ariaLabel: string; readonly event: OverlayEvent };

export interface FooterColumn {
  readonly heading: string;
  readonly links: readonly FooterLink[];
}

export interface LeadFormField {
  readonly id: string;
  readonly label: string;
  readonly placeholder: string;
  readonly multiline: boolean;
}

export interface LeadForm {
  readonly event: OverlayEvent;
  readonly title: string;
  readonly description: string;
  readonly successTitle: string;
  readonly successDescription: string;
  readonly emailId: string;
  readonly fields: readonly LeadFormField[];
  readonly submitLabel: string;
}

export interface SubmitContent {
  readonly title: string;
  readonly description: string;
  readonly fields: readonly LeadFormField[];
  readonly submitLabel: string;
  readonly successTitle: string;
  readonly successDescription: string;
}

export type DashboardIconName = "home" | "video" | "plus" | "settings";

export interface DashboardNavItem {
  readonly label: string;
  readonly href: string;
  readonly icon: DashboardIconName;
}

export interface SiteConfig {
  readonly name: string;
  readonly url: string;
  readonly description: string;
  readonly logo: { readonly light: string; readonly dark: string };
  readonly announcement: { readonly badge: string; readonly label: string; readonly href: string; readonly description: string } | null;
  readonly nav: readonly NavMenu[];
  readonly mobileNav: readonly MobileNavGroup[];
  readonly headerActions: { readonly secondary: LinkRef | null; readonly primary: LinkRef };
  readonly dashboardNav: readonly DashboardNavItem[];
  readonly footer: {
    readonly description: string;
    readonly columns: readonly FooterColumn[];
    readonly legalLinks: readonly LinkRef[];
    readonly copyright: string;
  };
  readonly newsletterToast: { readonly title: string; readonly description: string; readonly cta: string } | null;
  readonly leadForms: readonly LeadForm[];
  readonly socials: Readonly<Partial<Record<"github" | "x" | "linkedin" | "youtube", string>>>;
}

export interface Category {
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  /** A name `CategoryIcon` draws. */
  readonly icon: string;
}

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

export interface Listing {
  readonly slug: string;
  readonly name: string;
  readonly summary: string;
  /** Falls back to the first letter of `name` when absent. */
  readonly icon?: ImageRef;
  /** A `Category.slug`. */
  readonly category: string;
  readonly tags: readonly string[];
  /** Pre-formatted, e.g. "12.4k". */
  readonly stars?: string;
  readonly author: LinkRef;
  readonly about: readonly string[];
  readonly features: readonly string[];
  readonly useCases: readonly string[];
  readonly faq: readonly FaqItem[];
}

export interface HeroContent {
  readonly countLabel: string;
  readonly updatedLabel: string;
  readonly title: string;
  readonly rotatingTerms: readonly [string, ...string[]];
  readonly description: string;
  readonly searchPlaceholder: string;
}

export interface HomeSection {
  readonly title: string;
  readonly badge?: LinkRef;
  readonly viewAll: LinkRef;
  readonly listingSlugs: readonly string[];
}
