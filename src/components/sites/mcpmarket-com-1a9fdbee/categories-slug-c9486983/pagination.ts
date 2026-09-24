import type { LinkRef } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/types";

/** Mirrors the source's hidden page list: page 1 is the base path, page n is `<base>/page/n`. */
export function paginationLinks(basePath: string, pageCount: number): readonly LinkRef[] {
  return Array.from({ length: pageCount }, (_, index) => {
    const page = index + 1;
    return {
      href: page === 1 ? basePath : `${basePath}/page/${page}`,
      label: `Page ${page} of ${pageCount}`,
    };
  });
}
