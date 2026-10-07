export function activeHref(pathname: string, hrefs: readonly string[]): string | null {
  const matches = hrefs.filter((href) => pathname === href || pathname.startsWith(`${href}/`));
  return matches.reduce<string | null>((best, href) => (best === null || href.length > best.length ? href : best), null);
}
