import type { ComponentType, ReactNode, SVGProps } from "react";
import type { LinkRef } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/types";

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export interface HeroContent {
  /** Crumbs between Home and the current page. */
  readonly crumbs: readonly LinkRef[];
  readonly current: string;
  /** Includes its trailing space, as on the source. */
  readonly title: string;
  readonly mutedTitle: string;
  readonly description: string;
  readonly actions?: { readonly primary: LinkRef; readonly secondary: LinkRef };
}

/** The MCP-server article sets its headings and lead paragraphs one step larger than the others. */
export type ExplainerScale = "lg" | "md";

export interface TitledText {
  readonly title: string;
  readonly body: ReactNode;
}

export interface IconItem extends TitledText {
  readonly icon: IconComponent;
}
