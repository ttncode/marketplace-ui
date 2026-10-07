import { deepStrictEqual, ok } from "node:assert";
import { readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { test } from "node:test";

import { routeExists, type KnownRoutes } from "../lib/routes.ts";
import { site } from "../site.config.ts";
import { CATEGORIES } from "./categories.ts";
import { HOME_SECTIONS } from "./home.ts";
import { LISTINGS } from "./listings.ts";

const APP_DIR = new URL("../app", import.meta.url).pathname;

function appRoutes(dir: string): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) found.push(...appRoutes(full));
    else if (entry === "page.tsx") {
      const route = relative(APP_DIR, dir).split(sep).filter((part) => part && !/^\(.*\)$/.test(part)).join("/");
      found.push(`/${route}`);
    }
  }
  return found;
}

const known: KnownRoutes = {
  routes: appRoutes(APP_DIR),
  params: {
    "/categories/[slug]": CATEGORIES.map((category) => category.slug),
    "/item/[slug]": LISTINGS.map((listing) => listing.slug),
  },
};

function siteHrefs(): string[] {
  return [
    ...site.nav.flatMap((menu) => [menu.hero.href, ...menu.features.map((f) => f.href), ...menu.links.map((l) => l.href)]),
    ...site.mobileNav.flatMap((group) => group.items.map((item) => item.href)),
    site.headerActions.primary.href,
    ...(site.headerActions.secondary ? [site.headerActions.secondary.href] : []),
    ...site.footer.columns.flatMap((column) => column.links.flatMap((link) => (link.kind === "link" ? [link.href] : []))),
    ...site.footer.legalLinks.map((link) => link.href),
    ...site.dashboardNav.map((item) => item.href),
    ...(site.announcement ? [site.announcement.href] : []),
  ].filter((href) => href.startsWith("/"));
}

test("category slugs are unique", () => {
  const slugs = CATEGORIES.map((category) => category.slug);
  deepStrictEqual(slugs, [...new Set(slugs)]);
});

test("every internal link in the site config resolves to a route", () => {
  ok(known.routes.length > 0);
  ok(siteHrefs().length > 0);
  const broken = siteHrefs().filter((href) => !routeExists(href, known));
  deepStrictEqual(broken, []);
});

test("routeExists matches static and dynamic routes", () => {
  const sample: KnownRoutes = { routes: ["/", "/categories/[slug]"], params: { "/categories/[slug]": ["design"] } };
  ok(routeExists("/", sample));
  ok(routeExists("/categories/design", sample));
  ok(routeExists("/categories/design?page=2#top", sample));
  ok(!routeExists("/categories/missing", sample));
  ok(!routeExists("/nowhere", sample));
});

test("listing slugs are unique", () => {
  const slugs = LISTINGS.map((listing) => listing.slug);
  deepStrictEqual(slugs, [...new Set(slugs)]);
});

test("every listing belongs to an existing category", () => {
  const categories = new Set(CATEGORIES.map((category) => category.slug));
  deepStrictEqual(LISTINGS.filter((listing) => !categories.has(listing.category)).map((l) => l.slug), []);
});

test("every category has at least one listing", () => {
  const used = new Set(LISTINGS.map((listing) => listing.category));
  deepStrictEqual(CATEGORIES.filter((category) => !used.has(category.slug)).map((c) => c.slug), []);
});

test("home sections reference existing listings and routes", () => {
  const slugs = new Set(LISTINGS.map((listing) => listing.slug));
  deepStrictEqual(HOME_SECTIONS.flatMap((section) => section.listingSlugs.filter((slug) => !slugs.has(slug))), []);
  deepStrictEqual(HOME_SECTIONS.map((s) => s.viewAll.href).filter((href) => !routeExists(href, known)), []);
});

test("item route exists for every listing", () => {
  deepStrictEqual(LISTINGS.filter((l) => !routeExists(`/item/${l.slug}`, known)).map((l) => l.slug), []);
});
