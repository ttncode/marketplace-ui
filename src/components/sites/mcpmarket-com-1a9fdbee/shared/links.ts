const SOURCE_HOSTS = new Set(["mcpmarket.com", "www.mcpmarket.com"]);
const APP_HOST = "app.mcpmarket.com";

/** Any unbuilt path works; this one reads clearly in the address bar. */
export const NOT_FOUND_HREF = "/not-found";

/** app.mcpmarket.com pages the clone builds, served at the same paths. */
const APP_AUTH_PATHS = new Set(["/signup", "/login"]);

/** App paths that send signed-out visitors to /signup (observed on the live app); every other one goes to /login. */
const APP_SIGNUP_FIRST_PATHS = new Set(["/sell", "/import"]);

/**
 * Reproduces app.mcpmarket.com's signed-out redirects, e.g.
 * `/sell?source=sell-page` → `/signup?redirectTo=%2Fsell%3Fsource%3Dsell-page`, `/deploy?…` → `/login?redirectTo=…`.
 */
function toAppHref(url: URL): string {
  if (APP_AUTH_PATHS.has(url.pathname)) return `${url.pathname}${url.search}`;
  if (url.pathname === "/") return "/login";
  const authPage = APP_SIGNUP_FIRST_PATHS.has(url.pathname) ? "/signup" : "/login";
  return `${authPage}?redirectTo=${encodeURIComponent(`${url.pathname}${url.search}`)}`;
}

/**
 * Maps a link captured from mcpmarket.com to where the clone sends it:
 * absolute links back to mcpmarket.com become local paths, app.mcpmarket.com links
 * follow the app's sign-in redirects to the cloned /signup and /login pages, and any
 * other website becomes the 404 page (project rule: the clone never leaves the site).
 * `mailto:` and relative links pass through unchanged.
 */
export function toSiteHref(href: string): string {
  if (!/^https?:\/\//i.test(href)) return href;
  const url = new URL(href);
  if (url.hostname === APP_HOST) return toAppHref(url);
  if (!SOURCE_HOSTS.has(url.hostname)) return NOT_FOUND_HREF;
  return `${url.pathname}${url.search}${url.hash}`;
}
