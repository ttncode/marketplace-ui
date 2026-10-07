import type { FaqItem, ImageRef, LinkRef } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/types";

export interface ToolParam {
  readonly name: string;
  readonly type: string;
  readonly required: boolean;
  readonly description?: string;
  readonly enum?: readonly string[];
}

export interface McpTool {
  readonly name: string;
  readonly description: string;
  readonly params: readonly ToolParam[];
}

/** Everything the client-side tab set needs; the README itself is fetched on demand. */
export interface ServerTabsData {
  readonly slug: string;
  readonly hasReadme: boolean;
  readonly longDescription: string;
  readonly features: readonly string[];
  readonly useCases: readonly string[];
  readonly faq: readonly FaqItem[];
  readonly mcpTools: readonly McpTool[];
}

export interface RelatedItem {
  readonly title: string;
  readonly href: string;
  readonly avatar: ImageRef;
  readonly description: string;
}

export interface RelatedList {
  readonly title: string;
  readonly more: LinkRef;
  readonly items: readonly RelatedItem[];
}

export interface PrimaryActions {
  readonly run: { readonly caption: string; readonly label: string; readonly href: string } | null;
  readonly tryNowHref: string | null;
}

export interface ServerDetail {
  readonly slug: string;
  readonly title: string;
  readonly metaDescription: string;
  readonly name: string;
  readonly author: { readonly name: string; readonly href: string; readonly avatar: ImageRef };
  /** Absent on servers the source shows without a star pill. */
  readonly stars: string | null;
  readonly links: { readonly share: string; readonly github: string | null; readonly npm: string | null };
  readonly categories: readonly LinkRef[];
  readonly description: string;
  readonly tabs: ServerTabsData;
  readonly primaryActions: PrimaryActions | null;
  readonly related: readonly RelatedList[];
}
