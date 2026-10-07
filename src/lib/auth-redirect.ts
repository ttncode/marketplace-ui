/**
 * Ports of app.mcpmarket.com's `redirectTo` helpers. The auth pages never navigate to the
 * redirect (those app routes are not built); it only changes the heading, the side panel
 * and the query carried across the Sign in / Sign up link, exactly as on the source.
 */
export const DEFAULT_REDIRECT = "/dashboard";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export interface ImportSkillContext {
  readonly name: string;
  readonly owner: string;
  readonly repoUrl: string;
  readonly sourceLabel: string;
  readonly avatarUrl: string;
}

export interface BuySkillContext {
  readonly name: string | null;
}

export function validateRedirectPath(value: string | undefined): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) return DEFAULT_REDIRECT;
  const path = value.split("?")[0];
  return /%2f/i.test(path) ? DEFAULT_REDIRECT : value;
}

/** `?redirectTo=` suffix the source appends to the link to the other auth page. */
export function redirectQuery(redirect: string): string {
  return redirect === DEFAULT_REDIRECT ? "" : `?redirectTo=${encodeURIComponent(redirect)}`;
}

function splitPath(redirect: string): { readonly path: string; readonly query: URLSearchParams } {
  const index = redirect.indexOf("?");
  if (index === -1) return { path: redirect, query: new URLSearchParams() };
  return { path: redirect.slice(0, index), query: new URLSearchParams(redirect.slice(index + 1)) };
}

function parseGithubUrl(url: string): { owner: string; repo: string; path: string | null } | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "github.com") return null;
    const parts = parsed.pathname.split("/").filter(Boolean);
    if (parts.length < 2) return null;
    const path = parts.length >= 4 && parts[2] === "tree" ? parts.slice(4).join("/") || null : null;
    return { owner: parts[0], repo: parts[1], path };
  } catch {
    return null;
  }
}

function toDisplayName(repo: string, path: string | null): string {
  const base = path ? (path.split("/").pop() ?? repo) : repo;
  return base.replace(/[-_]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function getImportSkillContext(redirect: string): ImportSkillContext | null {
  if (!redirect.includes("?")) return null;
  const { path, query } = splitPath(redirect);
  const url = query.get("url");
  if (path !== "/import" || !url) return null;
  const github = parseGithubUrl(url);
  if (!github) return null;
  return {
    name: toDisplayName(github.repo, github.path),
    owner: github.owner,
    repoUrl: `https://github.com/${github.owner}/${github.repo}`,
    sourceLabel: `${github.owner}/${github.repo}`,
    avatarUrl: `https://github.com/${github.owner}.png`,
  };
}

export function getBuySkillContext(redirect: string): BuySkillContext | null {
  if (!redirect.includes("?")) return null;
  const { path, query } = splitPath(redirect);
  const listing = query.get("listing");
  if (path !== "/buy" || !listing || !UUID.test(listing)) return null;
  const skill = query.get("skill")?.trim() ?? "";
  return { name: skill.length > 0 && skill.length <= 100 ? skill : null };
}

function isStoreSetup(redirect: string): boolean {
  return splitPath(redirect).path === "/sell";
}

function isCatalogInstall(redirect: string): boolean {
  return splitPath(redirect).path === "/catalog";
}

export function signupHeading(redirect: string): string {
  const importSkill = getImportSkillContext(redirect);
  if (importSkill) return `Create an account to download ${importSkill.name}`;
  const buySkill = getBuySkillContext(redirect);
  if (buySkill) return `Create an account to buy ${buySkill.name ?? "this skill"}`;
  if (isStoreSetup(redirect)) return "Create an account to set up your store";
  if (isCatalogInstall(redirect)) return "Create an account to install skills";
  return "Create your account";
}

export function loginHeading(redirect: string): string {
  const importSkill = getImportSkillContext(redirect);
  if (importSkill) return `Sign in to download ${importSkill.name}`;
  const buySkill = getBuySkillContext(redirect);
  if (buySkill) return `Sign in to buy ${buySkill.name ?? "this skill"}`;
  return "Welcome back";
}
