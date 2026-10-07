export interface KnownRoutes {
  readonly routes: readonly string[];
  readonly params: Readonly<Record<string, readonly string[]>>;
}

/** True when `href` (path, optional query and hash) matches a static route or a dynamic route with a known slug. */
export function routeExists(href: string, known: KnownRoutes): boolean {
  const path = href.split(/[?#]/)[0].replace(/\/$/, "") || "/";
  return known.routes.some((route) => {
    if (route === path) return true;
    const routeParts = route.split("/");
    const pathParts = path.split("/");
    if (routeParts.length !== pathParts.length) return false;
    return routeParts.every((part, index) => {
      if (!part.startsWith("[")) return part === pathParts[index];
      return known.params[route]?.includes(pathParts[index]) ?? false;
    });
  });
}
