import type { FaqItem, ImageRef, LinkRef } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/types";

export interface RelatedMcp {
  readonly name: string;
  readonly href: string;
  readonly description: string;
  readonly avatar: ImageRef;
}

export interface McpClient {
  readonly slug: string;
  readonly name: string;
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly owner: { readonly name: string; readonly href: string };
  /** Pre-formatted like the source ("91k", "5.4k"). */
  readonly stars: string;
  readonly categories: readonly LinkRef[];
  readonly description: string;
  readonly longDescription: string;
  readonly features: readonly string[];
  readonly useCases: readonly string[];
  readonly faq: readonly FaqItem[];
  readonly relatedViewMoreHref: string;
  readonly related: readonly RelatedMcp[];
}
