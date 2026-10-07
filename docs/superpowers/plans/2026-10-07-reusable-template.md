# Reusable Site Template Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the mcpmarket.com clone on `main` into a reusable template for directory sites and management dashboards, with light and dark themes and a shadcn registry.

**Architecture:** One Next.js 16 App Router app with three route groups — `(site)` top-nav pages, `(auth)` sign-in screens, `(dashboard)` sidebar app under `/app`. Brand lives in `src/site.config.ts`, copy in `src/content/`, look in `src/app/theme.css`. Components in `src/components/{ui,blocks,layout,icons}` take props only. The same deployment serves `public/r/*.json` as the `@ttn` shadcn registry.

**Tech Stack:** Next.js 16.3, React 19.2, TypeScript strict, Tailwind CSS v4, Base UI, lucide-react, shadcn CLI 4, Node test runner (`node --test`), Node 24.

**Spec:** `docs/superpowers/specs/2026-10-07-reusable-template-design.md`

## Global Constraints

- Node.js 24 or later (`.nvmrc` says 24). Run `nvm use` before anything; the test runner needs Node 24's native TypeScript support.
- Every task is **one pull request** against `main`, branch name `<type>/<short-slug>`, title in conventional-commit form with a scope, squash-merged. `npm run check` must pass before merge.
- A file move and every import it breaks are fixed in the same pull request.
- TypeScript strict, no `any`, named exports, Tailwind utilities, no inline `style` except CSS variables and mask images that Tailwind cannot express (already the case in `HeroSection`).
- Components in `src/components/**` never import `@/content/*` or `@/site.config`. Only files in `src/app/**` read config and content.
- Tests run with `node --test`. A test file and everything it imports must use relative imports with explicit `.ts` extensions and `import type` for types, because the `@/` alias does not exist at test time.
- No new runtime dependency anywhere in this plan.
- Next.js 16 differs from older versions: before writing route, layout, metadata, `params` or `searchParams` code, read the matching guide under `node_modules/next/dist/docs/`.
- No MCP Market name, logo, copy, or asset under `public/sites/` may remain on `main` after Phase 3.
- Color mapping used by every "tokenize" task in Phase 4:

  | Source value | Utility suffix | Example |
  | --- | --- | --- |
  | `#0a0a0a`, `#000`, `black` | `ink` | `text-ink`, `bg-ink` |
  | `#444444` | `ink-secondary` | `text-ink-secondary` |
  | `#616161`, `#626262` | `ink-muted` | `text-ink-muted` |
  | `#fbfbfb` | `canvas` | `bg-canvas` |
  | `#ffffff`, `#fff`, `white` | `surface` | `bg-surface` |
  | `#f5f5f5` | `surface-muted` | `bg-surface-muted` |
  | `#f7f7f7` | `surface-subtle` | `bg-surface-subtle` |
  | `#f2f2f2` | `accent` | `bg-accent` |
  | `#dbdbdb` | `border` | `border-border` |
  | `#262626` | `ink` with `/85` | `from-ink/85` |
  | `#10b981` | `success` | `text-success` |
  | `rgba(10,10,10,a)`, `rgba(34,34,34,a)`, `rgba(0,0,0,a)` | `ink/<a×100>` | `border-ink/14` |
  | `rgba(255,255,255,a)` | `surface/<a×100>` | `bg-surface/78` |
  | `rgba(242,242,242,a)` | `accent/<a×100>` | `bg-accent/94` |
  | `rgba(247,247,247,a)` | `surface-subtle/<a×100>` | |
  | `rgba(251,251,251,a)` | `canvas/<a×100>` | |
  | `rgba(97,97,97,a)` | `ink-muted/<a×100>` | |
  | any `shadow-[…rgba…]` | a `--design-shadow-*` token | `shadow-[var(--design-shadow-card)]` |
  | in `*.module.css` | `var(--design-*)` or `color-mix(in oklab, var(--design-ink) 14%, transparent)` | |

  A color not in the table gets a new `--design-*` token in `theme.css` (both themes) if used twice or more, otherwise the nearest row.

## Review Focus

1. **Stored theme value is garbage or storage throws** (private mode, blocked site data) — the page must still render, following the system theme, with no exception in the console. Pinned in Task 68.
2. **A config or content link points at a route that no longer exists** after routes are dropped — every `nav`, `mobileNav`, footer, `dashboardNav` and home-section link must resolve to a real route or an existing listing/category slug. Pinned in Task 33.
3. **Sorting a table column that has missing or mixed values** (some rows without `scheduledAt`, numbers stored as strings) — sort must be stable, put empty values last in both directions, and never throw. Pinned in Task 81.
4. **A token added to light mode and forgotten in dark** — dark mode would silently show a light value. Pinned in Task 66.
5. **A registry item that names a missing file or a missing dependency** — `shadcn add @ttn/<item>` would fail only on the consumer's machine. Pinned in Task 90.

---

## Phase 0 — Already done

- Branch `mcpmarket-clone` pushed from `5f7c598` (frozen reference clone).
- PR #117 `docs: add reusable template design spec` carries the spec and this plan.

---

## Phase 1 — Move components to readable folders (behaviour unchanged)

Each task in this phase is the same shape: `git mv`, rewrite imports, run `npm run check`, open one PR. Export names do not change in this phase; renames happen in Phase 2.

The import rewrite command used in every move task (replace OLD and NEW):

```bash
grep -rl 'OLD' src | xargs sed -i 's#OLD#NEW#g'
```

Relative imports inside a moved file (`./site-data`, `./types`, `./links`) must be rewritten to absolute `@/components/sites/mcpmarket-com-1a9fdbee/shared/...` paths in the same commit, because the file no longer sits next to them. After each move run:

```bash
npm run typecheck   # Expected: exits 0
npm run check       # Expected: lint, typecheck, tests and build all pass
```

Abbreviations below: `SITE=src/components/sites/mcpmarket-com-1a9fdbee`, `APP=src/components/sites/app-mcpmarket-com-ac75c135`.

### Task 1: Move AccordionRegion to ui

PR: `refactor(ui): move AccordionRegion to ui/accordion-region`

**Files:**
- Move: `$SITE/shared/AccordionRegion.tsx` → `src/components/ui/accordion-region.tsx`

**Interfaces:**
- Produces: `AccordionRegion` at `@/components/ui/accordion-region` (props unchanged: `open`, `id`, `labelledBy`, `className?`, `children`).

- [ ] **Step 1: Move and rewrite imports**

```bash
mkdir -p src/components/ui
git mv src/components/sites/mcpmarket-com-1a9fdbee/shared/AccordionRegion.tsx src/components/ui/accordion-region.tsx
grep -rl 'mcpmarket-com-1a9fdbee/shared/AccordionRegion' src | xargs sed -i 's#@/components/sites/mcpmarket-com-1a9fdbee/shared/AccordionRegion#@/components/ui/accordion-region#g'
grep -rl '"\./AccordionRegion"' src | xargs -r sed -i 's#"\./AccordionRegion"#"@/components/ui/accordion-region"#g'
```

- [ ] **Step 2: Verify** — `grep -rn AccordionRegion\" src` returns only `@/components/ui/accordion-region` imports; `npm run check` passes.
- [ ] **Step 3: Commit and open PR**

```bash
git switch -c refactor/ui-accordion-region
git add -A && git commit -m "refactor(ui): move AccordionRegion to ui/accordion-region"
git push -u origin HEAD && gh pr create --fill --base main
```

### Task 2: Move texture-button to ui

PR: `refactor(ui): move texture-button to ui`

**Files:**
- Move: `$SITE/tools-skills-slug-229a0ca0/texture-button.ts` → `src/components/ui/texture-button.ts`

**Interfaces:**
- Produces: `PRIMARY_FACE`, `PRIMARY_SHELL`, `SECONDARY_FACE`, `SECONDARY_SHELL` (and any other export in the file, unchanged) at `@/components/ui/texture-button`.

- [ ] **Step 1: Move and rewrite imports**

```bash
git mv src/components/sites/mcpmarket-com-1a9fdbee/tools-skills-slug-229a0ca0/texture-button.ts src/components/ui/texture-button.ts
grep -rl 'tools-skills-slug-229a0ca0/texture-button' src | xargs sed -i 's#@/components/sites/mcpmarket-com-1a9fdbee/tools-skills-slug-229a0ca0/texture-button#@/components/ui/texture-button#g'
grep -rl '"\./texture-button"' src | xargs -r sed -i 's#"\./texture-button"#"@/components/ui/texture-button"#g'
```

- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `refactor/ui-texture-button`.

### Task 3: Move shared nav icons and logo paths

PR: `refactor(icons): move shared nav icons to icons/`

**Files:**
- Move: `$SITE/shared/icons.tsx` → `src/components/icons/nav-icons.tsx`
- Move: `$SITE/shared/logo-paths.ts` → `src/components/icons/logo-paths.ts`
- Move: `$SITE/shared/animated-icons.module.css` → `src/components/icons/animated-icons.module.css`

**Interfaces:**
- Produces: `LogoMarkIcon`, `GithubIcon`, `BRAND_FAVICONS`, `BrandName`, `PlugConnectedIcon`, `BlocksIcon`, `NavIcon` at `@/components/icons/nav-icons`. `nav-icons.tsx` still imports `NavIconName` from `@/components/sites/mcpmarket-com-1a9fdbee/shared/types`.

- [ ] **Step 1: Move and rewrite imports**

```bash
mkdir -p src/components/icons
git mv src/components/sites/mcpmarket-com-1a9fdbee/shared/icons.tsx src/components/icons/nav-icons.tsx
git mv src/components/sites/mcpmarket-com-1a9fdbee/shared/logo-paths.ts src/components/icons/logo-paths.ts
git mv src/components/sites/mcpmarket-com-1a9fdbee/shared/animated-icons.module.css src/components/icons/animated-icons.module.css
grep -rl 'mcpmarket-com-1a9fdbee/shared/icons"' src | xargs sed -i 's#@/components/sites/mcpmarket-com-1a9fdbee/shared/icons"#@/components/icons/nav-icons"#g'
grep -rl 'from "\./icons"' src/components/sites/mcpmarket-com-1a9fdbee/shared | xargs -r sed -i 's#from "\./icons"#from "@/components/icons/nav-icons"#g'
sed -i 's#from "\./types"#from "@/components/sites/mcpmarket-com-1a9fdbee/shared/types"#' src/components/icons/nav-icons.tsx
```

- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `refactor/icons-nav`.

### Task 4: Move detail icons

PR: `refactor(icons): move detail page icons to icons/`

**Files:**
- Move: `$SITE/server-slug-89dc0d19/icons.tsx` → `src/components/icons/detail-icons.tsx`

**Interfaces:**
- Produces: `HomeIcon`, `ChevronRightIcon`, `StarIcon`, `GithubIcon`, `PackageIcon`, `ShareIcon`, `RocketIcon`, `ExternalLinkIcon` at `@/components/icons/detail-icons`.

- [ ] **Step 1: Move and rewrite imports**

```bash
git mv src/components/sites/mcpmarket-com-1a9fdbee/server-slug-89dc0d19/icons.tsx src/components/icons/detail-icons.tsx
grep -rl 'server-slug-89dc0d19/icons"' src | xargs sed -i 's#@/components/sites/mcpmarket-com-1a9fdbee/server-slug-89dc0d19/icons"#@/components/icons/detail-icons"#g'
grep -rl 'from "\./icons"' src/components/sites/mcpmarket-com-1a9fdbee/server-slug-89dc0d19 | xargs -r sed -i 's#from "\./icons"#from "@/components/icons/detail-icons"#g'
```

- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `refactor/icons-detail`.

### Task 5: Move breadcrumb icons

PR: `refactor(icons): move breadcrumb icons to icons/`

**Files:**
- Move: `$SITE/tools-skills-slug-229a0ca0/icons.tsx` → `src/components/icons/breadcrumb-icons.tsx`

**Interfaces:**
- Produces: every export of the old file (including `ChevronRightIcon`, `HomeIcon`) at `@/components/icons/breadcrumb-icons`.

- [ ] **Step 1: Move and rewrite imports**

```bash
git mv src/components/sites/mcpmarket-com-1a9fdbee/tools-skills-slug-229a0ca0/icons.tsx src/components/icons/breadcrumb-icons.tsx
grep -rl 'tools-skills-slug-229a0ca0/icons"' src | xargs sed -i 's#@/components/sites/mcpmarket-com-1a9fdbee/tools-skills-slug-229a0ca0/icons"#@/components/icons/breadcrumb-icons"#g'
grep -rl 'from "\./icons"' src/components/sites/mcpmarket-com-1a9fdbee/tools-skills-slug-229a0ca0 | xargs -r sed -i 's#from "\./icons"#from "@/components/icons/breadcrumb-icons"#g'
```

- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `refactor/icons-breadcrumb`.

### Task 6: Move news icons

PR: `refactor(icons): move news icons to icons/`

**Files:**
- Move: `$SITE/news-f46b16ed/icons.tsx` → `src/components/icons/news-icons.tsx`

- [ ] **Step 1: Move and rewrite imports**

```bash
git mv src/components/sites/mcpmarket-com-1a9fdbee/news-f46b16ed/icons.tsx src/components/icons/news-icons.tsx
grep -rl 'from "\./icons"' src/components/sites/mcpmarket-com-1a9fdbee/news-f46b16ed | xargs -r sed -i 's#from "\./icons"#from "@/components/icons/news-icons"#g'
grep -rl 'news-f46b16ed/icons"' src | xargs -r sed -i 's#@/components/sites/mcpmarket-com-1a9fdbee/news-f46b16ed/icons"#@/components/icons/news-icons"#g'
```

- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `refactor/icons-news`.

### Task 7: Move search icons

PR: `refactor(icons): move search icons to icons/`

**Files:**
- Move: `$SITE/search-6fb5b778/icons.tsx` → `src/components/icons/search-icons.tsx` (it imports `type BrowseIcon` from `./search-data`; rewrite to `@/components/sites/mcpmarket-com-1a9fdbee/search-6fb5b778/search-data`).

- [ ] **Step 1: Move and rewrite imports**

```bash
git mv src/components/sites/mcpmarket-com-1a9fdbee/search-6fb5b778/icons.tsx src/components/icons/search-icons.tsx
sed -i 's#from "\./search-data"#from "@/components/sites/mcpmarket-com-1a9fdbee/search-6fb5b778/search-data"#' src/components/icons/search-icons.tsx
grep -rl 'from "\./icons"' src/components/sites/mcpmarket-com-1a9fdbee/search-6fb5b778 | xargs -r sed -i 's#from "\./icons"#from "@/components/icons/search-icons"#g'
```

- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `refactor/icons-search`.

### Task 8: Move DirectoryCard to blocks/listing-card

PR: `refactor(blocks): move DirectoryCard to blocks/listing-card`

**Files:**
- Move: `$SITE/shared/DirectoryCard.tsx` → `src/components/blocks/listing-card.tsx`
- Move: `$SITE/shared/DirectoryCard.module.css` → `src/components/blocks/listing-card.module.css`

**Interfaces:**
- Produces: `DirectoryCard` (export name unchanged) at `@/components/blocks/listing-card`; CSS module at `@/components/blocks/listing-card.module.css` (classes `link`, `dither`).

- [ ] **Step 1: Move and rewrite imports**

```bash
mkdir -p src/components/blocks
git mv src/components/sites/mcpmarket-com-1a9fdbee/shared/DirectoryCard.tsx src/components/blocks/listing-card.tsx
git mv src/components/sites/mcpmarket-com-1a9fdbee/shared/DirectoryCard.module.css src/components/blocks/listing-card.module.css
sed -i 's#"\./DirectoryCard.module.css"#"./listing-card.module.css"#; s#from "\./types"#from "@/components/sites/mcpmarket-com-1a9fdbee/shared/types"#' src/components/blocks/listing-card.tsx
grep -rl 'mcpmarket-com-1a9fdbee/shared/DirectoryCard.module.css' src | xargs -r sed -i 's#@/components/sites/mcpmarket-com-1a9fdbee/shared/DirectoryCard.module.css#@/components/blocks/listing-card.module.css#g'
grep -rl 'mcpmarket-com-1a9fdbee/shared/DirectoryCard"' src | xargs -r sed -i 's#@/components/sites/mcpmarket-com-1a9fdbee/shared/DirectoryCard"#@/components/blocks/listing-card"#g'
```

- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `refactor/blocks-listing-card`.

### Task 9: Move DirectorySection

PR: `refactor(blocks): move DirectorySection to blocks/directory-section`

**Files:**
- Move: `$SITE/root-8a5edab2/DirectorySection.tsx` → `src/components/blocks/directory-section.tsx`

- [ ] **Step 1: Move and rewrite imports**

```bash
git mv src/components/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/DirectorySection.tsx src/components/blocks/directory-section.tsx
grep -rl 'root-8a5edab2/DirectorySection"' src | xargs sed -i 's#@/components/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/DirectorySection"#@/components/blocks/directory-section"#g'
```

- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `refactor/blocks-directory-section`.

### Task 10: Move CategoryRail

PR: `refactor(blocks): move CategoryRail to blocks/category-rail`

**Files:**
- Move: `$SITE/shared/CategoryRail.tsx` → `src/components/blocks/category-rail.tsx` (rewrite `./site-data` to the absolute shared path).

- [ ] **Step 1: Move and rewrite imports**

```bash
git mv src/components/sites/mcpmarket-com-1a9fdbee/shared/CategoryRail.tsx src/components/blocks/category-rail.tsx
sed -i 's#from "\./site-data"#from "@/components/sites/mcpmarket-com-1a9fdbee/shared/site-data"#' src/components/blocks/category-rail.tsx
grep -rl 'mcpmarket-com-1a9fdbee/shared/CategoryRail"' src | xargs sed -i 's#@/components/sites/mcpmarket-com-1a9fdbee/shared/CategoryRail"#@/components/blocks/category-rail"#g'
```

- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `refactor/blocks-category-rail`.

### Task 11: Move HeroDitherShader

PR: `refactor(blocks): move HeroDitherShader to blocks/dither-background`

**Files:**
- Move: `$SITE/shared/HeroDitherShader.tsx` → `src/components/blocks/dither-background.tsx`

- [ ] **Step 1: Move and rewrite imports**

```bash
git mv src/components/sites/mcpmarket-com-1a9fdbee/shared/HeroDitherShader.tsx src/components/blocks/dither-background.tsx
grep -rl 'mcpmarket-com-1a9fdbee/shared/HeroDitherShader"' src | xargs sed -i 's#@/components/sites/mcpmarket-com-1a9fdbee/shared/HeroDitherShader"#@/components/blocks/dither-background"#g'
```

- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `refactor/blocks-dither-background`.

### Task 12: Move HeroSection

PR: `refactor(blocks): move HeroSection to blocks/hero`

**Files:**
- Move: `$SITE/root-8a5edab2/HeroSection.tsx` → `src/components/blocks/hero.tsx`

- [ ] **Step 1: Move and rewrite imports**

```bash
git mv src/components/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/HeroSection.tsx src/components/blocks/hero.tsx
grep -rl 'root-8a5edab2/HeroSection"' src | xargs sed -i 's#@/components/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/HeroSection"#@/components/blocks/hero"#g'
```

- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `refactor/blocks-hero`.

### Task 13: Move FaqSection

PR: `refactor(blocks): move FaqSection to blocks/faq`

**Files:**
- Move: `$SITE/root-8a5edab2/FaqSection.tsx` → `src/components/blocks/faq.tsx` (rewrite `./directory-data` to `@/components/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/directory-data`).

- [ ] **Step 1: Move and rewrite imports**

```bash
git mv src/components/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/FaqSection.tsx src/components/blocks/faq.tsx
sed -i 's#from "\./directory-data"#from "@/components/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/directory-data"#' src/components/blocks/faq.tsx
grep -rl 'root-8a5edab2/FaqSection"' src | xargs sed -i 's#@/components/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/FaqSection"#@/components/blocks/faq"#g'
```

- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `refactor/blocks-faq`.

### Task 14: Move AnnouncementBar

PR: `refactor(blocks): move AnnouncementBar to blocks/announcement-bar`

**Files:**
- Move: `$SITE/shared/AnnouncementBar.tsx` → `src/components/blocks/announcement-bar.tsx` (rewrite `./site-data`).

- [ ] **Step 1: Move and rewrite imports**

```bash
git mv src/components/sites/mcpmarket-com-1a9fdbee/shared/AnnouncementBar.tsx src/components/blocks/announcement-bar.tsx
sed -i 's#from "\./site-data"#from "@/components/sites/mcpmarket-com-1a9fdbee/shared/site-data"#' src/components/blocks/announcement-bar.tsx
grep -rl 'mcpmarket-com-1a9fdbee/shared/AnnouncementBar"' src | xargs sed -i 's#@/components/sites/mcpmarket-com-1a9fdbee/shared/AnnouncementBar"#@/components/blocks/announcement-bar"#g'
```

- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `refactor/blocks-announcement-bar`.

### Task 15: Move NewsletterToast

PR: `refactor(blocks): move NewsletterToast to blocks/newsletter-toast`

**Files:**
- Move: `$SITE/shared/NewsletterToast.tsx` → `src/components/blocks/newsletter-toast.tsx` (rewrite `./site-data`).

- [ ] **Step 1: Move and rewrite imports**

```bash
git mv src/components/sites/mcpmarket-com-1a9fdbee/shared/NewsletterToast.tsx src/components/blocks/newsletter-toast.tsx
sed -i 's#from "\./site-data"#from "@/components/sites/mcpmarket-com-1a9fdbee/shared/site-data"#' src/components/blocks/newsletter-toast.tsx
grep -rl 'mcpmarket-com-1a9fdbee/shared/NewsletterToast"' src | xargs sed -i 's#@/components/sites/mcpmarket-com-1a9fdbee/shared/NewsletterToast"#@/components/blocks/newsletter-toast"#g'
```

- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `refactor/blocks-newsletter-toast`.

### Task 16: Move SiteOverlays

PR: `refactor(blocks): move SiteOverlays to blocks/lead-dialog`

**Files:**
- Move: `$SITE/shared/SiteOverlays.tsx` → `src/components/blocks/lead-dialog.tsx` (rewrite `./site-data` and `./types`; `SiteFooter.tsx` imports `OverlayTrigger` from `./SiteOverlays` → `@/components/blocks/lead-dialog`).

- [ ] **Step 1: Move and rewrite imports**

```bash
git mv src/components/sites/mcpmarket-com-1a9fdbee/shared/SiteOverlays.tsx src/components/blocks/lead-dialog.tsx
sed -i 's#from "\./site-data"#from "@/components/sites/mcpmarket-com-1a9fdbee/shared/site-data"#; s#from "\./types"#from "@/components/sites/mcpmarket-com-1a9fdbee/shared/types"#' src/components/blocks/lead-dialog.tsx
grep -rl 'from "\./SiteOverlays"' src | xargs -r sed -i 's#from "\./SiteOverlays"#from "@/components/blocks/lead-dialog"#g'
grep -rl 'mcpmarket-com-1a9fdbee/shared/SiteOverlays"' src | xargs -r sed -i 's#@/components/sites/mcpmarket-com-1a9fdbee/shared/SiteOverlays"#@/components/blocks/lead-dialog"#g'
```

- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `refactor/blocks-lead-dialog`.

### Task 17: Move SiteHeader, NavMegaMenu and MobileNavSheet

PR: `refactor(layout): move site header to layout/`

**Files:**
- Move: `$SITE/shared/SiteHeader.tsx` → `src/components/layout/site-header.tsx`
- Move: `$SITE/shared/NavMegaMenu.tsx` → `src/components/blocks/mega-menu.tsx`
- Move: `$SITE/shared/MobileNavSheet.tsx` → `src/components/layout/mobile-nav-sheet.tsx`

- [ ] **Step 1: Move and rewrite imports**

```bash
mkdir -p src/components/layout
git mv src/components/sites/mcpmarket-com-1a9fdbee/shared/SiteHeader.tsx src/components/layout/site-header.tsx
git mv src/components/sites/mcpmarket-com-1a9fdbee/shared/NavMegaMenu.tsx src/components/blocks/mega-menu.tsx
git mv src/components/sites/mcpmarket-com-1a9fdbee/shared/MobileNavSheet.tsx src/components/layout/mobile-nav-sheet.tsx
sed -i 's#from "\./MobileNavSheet"#from "@/components/layout/mobile-nav-sheet"#; s#from "\./NavMegaMenu"#from "@/components/blocks/mega-menu"#' src/components/layout/site-header.tsx
sed -i 's#from "\./site-data"#from "@/components/sites/mcpmarket-com-1a9fdbee/shared/site-data"#; s#from "\./types"#from "@/components/sites/mcpmarket-com-1a9fdbee/shared/types"#' src/components/blocks/mega-menu.tsx src/components/layout/mobile-nav-sheet.tsx
grep -rl 'mcpmarket-com-1a9fdbee/shared/SiteHeader"' src | xargs sed -i 's#@/components/sites/mcpmarket-com-1a9fdbee/shared/SiteHeader"#@/components/layout/site-header"#g'
```

- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `refactor/layout-site-header`.

### Task 18: Move SiteFooter

PR: `refactor(layout): move SiteFooter to layout/site-footer`

**Files:**
- Move: `$SITE/shared/SiteFooter.tsx` → `src/components/layout/site-footer.tsx` (rewrite `./LanguageSwitcher`, `./links`, `./site-data`, `./types` to absolute `$SITE/shared/...` paths).

- [ ] **Step 1: Move and rewrite imports**

```bash
git mv src/components/sites/mcpmarket-com-1a9fdbee/shared/SiteFooter.tsx src/components/layout/site-footer.tsx
sed -i -E 's#from "\./(LanguageSwitcher|links|site-data|types)"#from "@/components/sites/mcpmarket-com-1a9fdbee/shared/\1"#' src/components/layout/site-footer.tsx
grep -rl 'mcpmarket-com-1a9fdbee/shared/SiteFooter"' src | xargs sed -i 's#@/components/sites/mcpmarket-com-1a9fdbee/shared/SiteFooter"#@/components/layout/site-footer"#g'
```

- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `refactor/layout-site-footer`.

### Task 19: Move listing page components

PR: `refactor(blocks): move listing page components to blocks/`

**Files:**
- Move: `$SITE/categories-slug-c9486983/ListingHero.tsx` → `src/components/blocks/listing-hero.tsx`
- Move: `$SITE/categories-slug-c9486983/ListingSearch.tsx` → `src/components/blocks/listing-search.tsx`
- Move: `$SITE/categories-slug-c9486983/ListingResults.tsx` → `src/components/blocks/listing-results.tsx`
- Move: `$SITE/categories-slug-c9486983/ListingCard.tsx` → `src/components/blocks/listing-card-compact.tsx`
- Move: `$SITE/categories-slug-c9486983/types.ts` → `src/components/blocks/listing-types.ts`
- Move: `$SITE/categories-slug-c9486983/pagination.ts` → `src/lib/pagination.ts`
- Data file `listing-data.ts` stays until Task 34.

- [ ] **Step 1: Move and rewrite imports**

```bash
D=src/components/sites/mcpmarket-com-1a9fdbee/categories-slug-c9486983
git mv $D/ListingHero.tsx src/components/blocks/listing-hero.tsx
git mv $D/ListingSearch.tsx src/components/blocks/listing-search.tsx
git mv $D/ListingResults.tsx src/components/blocks/listing-results.tsx
git mv $D/ListingCard.tsx src/components/blocks/listing-card-compact.tsx
git mv $D/types.ts src/components/blocks/listing-types.ts
git mv $D/pagination.ts src/lib/pagination.ts
sed -i 's#from "\./ListingSearch"#from "@/components/blocks/listing-search"#' src/components/blocks/listing-hero.tsx
sed -i 's#from "\./ListingCard"#from "@/components/blocks/listing-card-compact"#; s#from "\./types"#from "@/components/blocks/listing-types"#' src/components/blocks/listing-results.tsx
for f in ListingHero:listing-hero ListingResults:listing-results ListingCard:listing-card-compact pagination:../../lib/pagination; do
  old=${f%%:*}; new=${f##*:}
  grep -rl "categories-slug-c9486983/$old\"" src | xargs -r sed -i "s#@/components/sites/mcpmarket-com-1a9fdbee/categories-slug-c9486983/$old\"#@/components/blocks/$new\"#g"
done
grep -rl 'components/blocks/../../lib/pagination' src | xargs -r sed -i 's#@/components/blocks/../../lib/pagination#@/lib/pagination#g'
```

- [ ] **Step 2: Verify** — `grep -rn "categories-slug-c9486983/" src` lists only `listing-data` imports; `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `refactor/blocks-listing`.

### Task 20: Move category index components

PR: `refactor(blocks): move CategoryIndex to blocks/category-index`

**Files:**
- Move: `$SITE/categories-f91e624d/CategoryIndex.tsx` → `src/components/blocks/category-index.tsx`
- Move: `$SITE/categories-f91e624d/CategoryIcon.tsx` → `src/components/blocks/category-icon.tsx`
- Move: `$SITE/categories-f91e624d/CategoryIcon.module.css` → `src/components/blocks/category-icon.module.css`
- `categories-data.ts` stays until Task 33; `CategoryIndex` imports its `CategoryTile` type from the absolute path.

- [ ] **Step 1: Move and rewrite imports**

```bash
D=src/components/sites/mcpmarket-com-1a9fdbee/categories-f91e624d
git mv $D/CategoryIndex.tsx src/components/blocks/category-index.tsx
git mv $D/CategoryIcon.tsx src/components/blocks/category-icon.tsx
git mv $D/CategoryIcon.module.css src/components/blocks/category-icon.module.css
sed -i 's#from "\./CategoryIcon"#from "@/components/blocks/category-icon"#; s#from "\./categories-data"#from "@/components/sites/mcpmarket-com-1a9fdbee/categories-f91e624d/categories-data"#' src/components/blocks/category-index.tsx
sed -i 's#"\./CategoryIcon.module.css"#"./category-icon.module.css"#' src/components/blocks/category-icon.tsx
grep -rl 'categories-f91e624d/CategoryIndex"' src | xargs sed -i 's#@/components/sites/mcpmarket-com-1a9fdbee/categories-f91e624d/CategoryIndex"#@/components/blocks/category-index"#g'
grep -rl 'categories-f91e624d/CategoryIcon"' src | xargs -r sed -i 's#@/components/sites/mcpmarket-com-1a9fdbee/categories-f91e624d/CategoryIcon"#@/components/blocks/category-icon"#g'
```

- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `refactor/blocks-category-index`.

### Task 21: Move detail page components

PR: `refactor(blocks): move server detail components to blocks/item-*`

**Files:**
- Move (`D=$SITE/server-slug-89dc0d19`):
  - `D/ServerDetailHero.tsx` → `src/components/blocks/item-hero.tsx`
  - `D/ServerSidebar.tsx` → `src/components/blocks/item-sidebar.tsx`
  - `D/ServerTabs.tsx` → `src/components/blocks/item-tabs.tsx`
  - `D/ToolsPanel.tsx` → `src/components/blocks/item-tools-panel.tsx`
  - `D/HeaderActions.tsx` → `src/components/blocks/item-header-actions.tsx`
  - `D/share-targets.ts` → `src/lib/share-targets.ts`
  - `D/detail.module.css` → `src/components/blocks/item-detail.module.css`
  - `D/types.ts` → `src/components/blocks/item-types.ts`
- `D/data/` stays until Task 36.

- [ ] **Step 1: Move and rewrite imports**

```bash
D=src/components/sites/mcpmarket-com-1a9fdbee/server-slug-89dc0d19
B=src/components/blocks
git mv $D/ServerDetailHero.tsx $B/item-hero.tsx
git mv $D/ServerSidebar.tsx $B/item-sidebar.tsx
git mv $D/ServerTabs.tsx $B/item-tabs.tsx
git mv $D/ToolsPanel.tsx $B/item-tools-panel.tsx
git mv $D/HeaderActions.tsx $B/item-header-actions.tsx
git mv $D/share-targets.ts src/lib/share-targets.ts
git mv $D/detail.module.css $B/item-detail.module.css
git mv $D/types.ts $B/item-types.ts
sed -i 's#"\./detail.module.css"#"./item-detail.module.css"#; s#from "\./HeaderActions"#from "./item-header-actions"#; s#from "\./ToolsPanel"#from "./item-tools-panel"#; s#from "\./types"#from "./item-types"#; s#from "\./share-targets"#from "@/lib/share-targets"#' $B/item-*.tsx
grep -rl 'server-slug-89dc0d19/' src | xargs sed -i \
  -e 's#server-slug-89dc0d19/ServerDetailHero"#@@/item-hero"#g' \
  -e 's#server-slug-89dc0d19/ServerSidebar"#@@/item-sidebar"#g' \
  -e 's#server-slug-89dc0d19/ServerTabs"#@@/item-tabs"#g' \
  -e 's#server-slug-89dc0d19/detail.module.css"#@@/item-detail.module.css"#g' \
  -e 's#server-slug-89dc0d19/types"#@@/item-types"#g'
grep -rl '@/components/sites/mcpmarket-com-1a9fdbee/@@/' src | xargs -r sed -i 's#@/components/sites/mcpmarket-com-1a9fdbee/@@/#@/components/blocks/#g'
```

- [ ] **Step 2: Verify** — `grep -rn "server-slug-89dc0d19/" src` lists only `data` imports; `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `refactor/blocks-item`.

### Task 22: Move search components

PR: `refactor(blocks): move search components to blocks/search-*`

**Files (`D=$SITE/search-6fb5b778`):**
- `D/SearchView.tsx` → `src/components/blocks/search-view.tsx`
- `D/SearchHeader.tsx` → `src/components/blocks/search-header.tsx`
- `D/SearchResults.tsx` → `src/components/blocks/search-results.tsx`
- `D/CategoryRail.tsx` → `src/components/blocks/search-category-rail.tsx`
- `D/BrowseByCategory.tsx` → `src/components/blocks/browse-by-category.tsx`
- `D/search-index.ts` → `src/lib/search-index.ts`
- `D/search-data.ts` stays until Task 37.

- [ ] **Step 1: Move and rewrite imports**

```bash
D=src/components/sites/mcpmarket-com-1a9fdbee/search-6fb5b778
B=src/components/blocks
git mv $D/SearchView.tsx $B/search-view.tsx
git mv $D/SearchHeader.tsx $B/search-header.tsx
git mv $D/SearchResults.tsx $B/search-results.tsx
git mv $D/CategoryRail.tsx $B/search-category-rail.tsx
git mv $D/BrowseByCategory.tsx $B/browse-by-category.tsx
git mv $D/search-index.ts src/lib/search-index.ts
sed -i -e 's#from "\./CategoryRail"#from "./search-category-rail"#' -e 's#from "\./SearchHeader"#from "./search-header"#' -e 's#from "\./SearchResults"#from "./search-results"#' \
  -e 's#from "\./search-index"#from "@/lib/search-index"#' -e "s#from \"\./search-data\"#from \"@/components/sites/mcpmarket-com-1a9fdbee/search-6fb5b778/search-data\"#" $B/search-*.tsx $B/browse-by-category.tsx
grep -rl 'search-6fb5b778/' src | xargs sed -i \
  -e 's#@/components/sites/mcpmarket-com-1a9fdbee/search-6fb5b778/SearchView"#@/components/blocks/search-view"#g' \
  -e 's#@/components/sites/mcpmarket-com-1a9fdbee/search-6fb5b778/BrowseByCategory"#@/components/blocks/browse-by-category"#g' \
  -e 's#@/components/sites/mcpmarket-com-1a9fdbee/search-6fb5b778/search-index"#@/lib/search-index"#g'
```

- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `refactor/blocks-search`.

### Task 23: Move legal page components

PR: `refactor(blocks): move legal page components to blocks/`

**Files (`D=$SITE/privacy-0ece7f7c`):**
- `D/LegalPage.tsx` → `src/components/blocks/legal-page.tsx`
- `D/LegalProse.module.css` → `src/components/blocks/legal-prose.module.css`
- `D/ContentPageHero.tsx` → `src/components/blocks/content-page-hero.tsx`
- `D/PrivacyContent.tsx` stays until Task 39.

- [ ] **Step 1: Move and rewrite imports**

```bash
D=src/components/sites/mcpmarket-com-1a9fdbee/privacy-0ece7f7c
B=src/components/blocks
git mv $D/LegalPage.tsx $B/legal-page.tsx
git mv $D/LegalProse.module.css $B/legal-prose.module.css
git mv $D/ContentPageHero.tsx $B/content-page-hero.tsx
sed -i 's#from "\./ContentPageHero"#from "./content-page-hero"#; s#"\./LegalProse.module.css"#"./legal-prose.module.css"#' $B/legal-page.tsx
grep -rl 'privacy-0ece7f7c/' src | xargs sed -i \
  -e 's#@/components/sites/mcpmarket-com-1a9fdbee/privacy-0ece7f7c/LegalPage"#@/components/blocks/legal-page"#g' \
  -e 's#@/components/sites/mcpmarket-com-1a9fdbee/privacy-0ece7f7c/ContentPageHero"#@/components/blocks/content-page-hero"#g'
```

- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `refactor/blocks-legal`.

### Task 24: Move leaderboard components

PR: `refactor(blocks): move leaderboard components to blocks/ranked-*`

**Files (`D=$SITE/leaderboards-47b0390f`):**
- `D/LeaderboardGrid.tsx` → `src/components/blocks/ranked-list.tsx`
- `D/LeaderboardHero.tsx` → `src/components/blocks/ranked-hero.tsx`
- `D/LeaderboardPage.tsx` → `src/components/blocks/ranked-page.tsx`
- `D/types.ts` → `src/components/blocks/ranked-types.ts`
- `D/leaderboard-data.ts` stays until Task 47.

- [ ] **Step 1: Move and rewrite imports**

```bash
D=src/components/sites/mcpmarket-com-1a9fdbee/leaderboards-47b0390f
B=src/components/blocks
git mv $D/LeaderboardGrid.tsx $B/ranked-list.tsx
git mv $D/LeaderboardHero.tsx $B/ranked-hero.tsx
git mv $D/LeaderboardPage.tsx $B/ranked-page.tsx
git mv $D/types.ts $B/ranked-types.ts
sed -i -e 's#from "\./LeaderboardGrid"#from "./ranked-list"#' -e 's#from "\./LeaderboardHero"#from "./ranked-hero"#' -e 's#from "\./types"#from "./ranked-types"#' $B/ranked-*.tsx
grep -rl 'leaderboards-47b0390f/' src | xargs sed -i \
  -e 's#@/components/sites/mcpmarket-com-1a9fdbee/leaderboards-47b0390f/LeaderboardPage"#@/components/blocks/ranked-page"#g' \
  -e 's#@/components/sites/mcpmarket-com-1a9fdbee/leaderboards-47b0390f/types"#@/components/blocks/ranked-types"#g'
grep -rl 'from "\./types"' src/components/sites/mcpmarket-com-1a9fdbee/leaderboards-47b0390f | xargs -r sed -i 's#from "\./types"#from "@/components/blocks/ranked-types"#g'
```

- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `refactor/blocks-ranked`.

### Task 25: Move news card

PR: `refactor(blocks): move NewsCard to blocks/article-card`

**Files:**
- Move: `$SITE/news-f46b16ed/NewsCard.tsx` → `src/components/blocks/article-card.tsx` (rewrite `./news-data` type import to `@/components/sites/mcpmarket-com-1a9fdbee/news-f46b16ed/news-data`).

- [ ] **Step 1: Move and rewrite imports**

```bash
git mv src/components/sites/mcpmarket-com-1a9fdbee/news-f46b16ed/NewsCard.tsx src/components/blocks/article-card.tsx
sed -i 's#from "\./news-data"#from "@/components/sites/mcpmarket-com-1a9fdbee/news-f46b16ed/news-data"#' src/components/blocks/article-card.tsx
sed -i 's#from "\./NewsCard"#from "@/components/blocks/article-card"#' src/components/sites/mcpmarket-com-1a9fdbee/news-f46b16ed/NewsPage.tsx
```

- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `refactor/blocks-article-card`.

### Task 26: Move submit components

PR: `refactor(blocks): move submit components to blocks/submit-*`

**Files (`D=$SITE/submit-7686f78b`):**
- `D/SubmitHero.tsx` → `src/components/blocks/submit-hero.tsx`
- `D/SubmitView.tsx` → `src/components/blocks/submit-view.tsx`
- `D/form-ui.tsx` → `src/components/ui/form-field.tsx`
- `D/GithubSubmitForm.tsx`, `D/RemoteMcpForm.tsx`, `D/PopularGrid.tsx`, `D/submit-data.ts` stay until Task 38.

- [ ] **Step 1: Move and rewrite imports**

```bash
D=src/components/sites/mcpmarket-com-1a9fdbee/submit-7686f78b
git mv $D/SubmitHero.tsx src/components/blocks/submit-hero.tsx
git mv $D/SubmitView.tsx src/components/blocks/submit-view.tsx
git mv $D/form-ui.tsx src/components/ui/form-field.tsx
grep -rl 'from "\./form-ui"' $D | xargs -r sed -i 's#from "\./form-ui"#from "@/components/ui/form-field"#g'
sed -i -E "s#from \"\./(GithubSubmitForm|RemoteMcpForm|PopularGrid|submit-data)\"#from \"@/components/sites/mcpmarket-com-1a9fdbee/submit-7686f78b/\1\"#; s#from \"\./form-ui\"#from \"@/components/ui/form-field\"#" src/components/blocks/submit-*.tsx
grep -rl 'submit-7686f78b/Submit' src | xargs sed -i -e 's#@/components/sites/mcpmarket-com-1a9fdbee/submit-7686f78b/SubmitHero"#@/components/blocks/submit-hero"#g' -e 's#@/components/sites/mcpmarket-com-1a9fdbee/submit-7686f78b/SubmitView"#@/components/blocks/submit-view"#g'
```

- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `refactor/blocks-submit`.

### Task 27: Move auth components

PR: `refactor(blocks): move auth components to blocks/ and ui/`

**Files (`A=$APP`):**
- `A/shared/AuthShell.tsx` → `src/components/blocks/auth-shell.tsx`
- `A/shared/AuthSidePanel.tsx` → `src/components/blocks/auth-side-panel.tsx`
- `A/shared/OAuthButtons.tsx` → `src/components/blocks/oauth-buttons.tsx`
- `A/shared/HubLockup.tsx` → `src/components/blocks/auth-lockup.tsx`
- `A/shared/controls.tsx` → `src/components/ui/auth-controls.tsx`
- `A/shared/auth.module.css` → `src/components/blocks/auth.module.css`
- `A/login-7e93fba0/LoginForm.tsx` → `src/components/blocks/login-form.tsx`
- `A/signup-847d8d45/SignupForm.tsx` → `src/components/blocks/signup-form.tsx`
- `A/shared/redirect.ts` → `src/lib/auth-redirect.ts` (removed in Task 40)

- [ ] **Step 1: Move and rewrite imports**

```bash
A=src/components/sites/app-mcpmarket-com-ac75c135
B=src/components/blocks
git mv $A/shared/AuthShell.tsx $B/auth-shell.tsx
git mv $A/shared/AuthSidePanel.tsx $B/auth-side-panel.tsx
git mv $A/shared/OAuthButtons.tsx $B/oauth-buttons.tsx
git mv $A/shared/HubLockup.tsx $B/auth-lockup.tsx
git mv $A/shared/controls.tsx src/components/ui/auth-controls.tsx
git mv $A/shared/auth.module.css $B/auth.module.css
git mv $A/login-7e93fba0/LoginForm.tsx $B/login-form.tsx
git mv $A/signup-847d8d45/SignupForm.tsx $B/signup-form.tsx
git mv $A/shared/redirect.ts src/lib/auth-redirect.ts
sed -i 's#"\./auth.module.css"#"@/components/blocks/auth.module.css"#' src/components/ui/auth-controls.tsx
sed -i -e 's#from "\./AuthSidePanel"#from "./auth-side-panel"#' -e 's#from "\./HubLockup"#from "./auth-lockup"#' -e 's#from "\./OAuthButtons"#from "./oauth-buttons"#' -e 's#from "\./controls"#from "@/components/ui/auth-controls"#' -e 's#from "\./redirect"#from "@/lib/auth-redirect"#' $B/auth-*.tsx $B/oauth-buttons.tsx
grep -rl 'app-mcpmarket-com-ac75c135/' src | xargs sed -i \
  -e 's#@/components/sites/app-mcpmarket-com-ac75c135/shared/AuthShell"#@/components/blocks/auth-shell"#g' \
  -e 's#@/components/sites/app-mcpmarket-com-ac75c135/shared/OAuthButtons"#@/components/blocks/oauth-buttons"#g' \
  -e 's#@/components/sites/app-mcpmarket-com-ac75c135/shared/controls"#@/components/ui/auth-controls"#g' \
  -e 's#@/components/sites/app-mcpmarket-com-ac75c135/shared/redirect"#@/lib/auth-redirect"#g' \
  -e 's#@/components/sites/app-mcpmarket-com-ac75c135/shared/auth.module.css"#@/components/blocks/auth.module.css"#g' \
  -e 's#@/components/sites/app-mcpmarket-com-ac75c135/login-7e93fba0/LoginForm"#@/components/blocks/login-form"#g' \
  -e 's#@/components/sites/app-mcpmarket-com-ac75c135/signup-847d8d45/SignupForm"#@/components/blocks/signup-form"#g'
```

- [ ] **Step 2: Verify** — `ls src/components/sites/app-mcpmarket-com-ac75c135` shows only empty folders (remove them with `git clean -fd src/components/sites/app-mcpmarket-com-ac75c135`); `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `refactor/blocks-auth`.

---

## Phase 2 — Config and content

### Task 28: Add content types and site config

PR: `feat(config): add site.config and content types`

**Files:**
- Create: `src/lib/types.ts`
- Create: `src/site.config.ts`
- Create: `src/content/site-config.test.ts`
- Modify: `src/app/layout.tsx` (metadata from `site`)

**Interfaces:**
- Produces: every type below at `@/lib/types`; `site: SiteConfig` at `@/site.config`.

- [ ] **Step 1: Write the failing test**

```ts
// src/content/site-config.test.ts
import { ok, strictEqual } from "node:assert";
import { test } from "node:test";

import { site } from "../site.config.ts";

test("site config has a name, an absolute url and a description", () => {
  ok(site.name.length > 0);
  strictEqual(new URL(site.url).protocol, "https:");
  ok(site.description.length > 0);
});

test("site config logos are public paths", () => {
  ok(site.logo.light.startsWith("/"));
  ok(site.logo.dark.startsWith("/"));
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node --test src/content/site-config.test.ts`
Expected: FAIL with `Cannot find module '.../src/site.config.ts'`.

- [ ] **Step 3: Write the types**

```ts
// src/lib/types.ts
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
```

- [ ] **Step 4: Write the config with neutral demo values**

```ts
// src/site.config.ts
import type { SiteConfig } from "./lib/types.ts";

export const site: SiteConfig = {
  name: "Acme Directory",
  url: "https://example.com",
  description: "A curated directory of tools, with a dashboard to manage your own.",
  logo: { light: "/brand/logo.svg", dark: "/brand/logo-dark.svg" },
  announcement: { badge: "New", label: "Acme Studio", href: "/app", description: "Manage and schedule your content in one place" },
  nav: [],
  mobileNav: [],
  headerActions: { secondary: { label: "Submit", href: "/submit" }, primary: { label: "Open app", href: "/app" } },
  dashboardNav: [],
  footer: {
    description: "Acme Directory lists the best tools for your workflow.",
    columns: [],
    legalLinks: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
    copyright: "© 2026 Acme Inc. All rights reserved.",
  },
  newsletterToast: null,
  leadForms: [],
  socials: { github: "https://github.com/acme" },
};
```

`nav`, `mobileNav`, `dashboardNav`, `columns`, `newsletterToast` and `leadForms` are filled by Tasks 30, 31 and 32 as each consumer switches over; `dashboardNav` grows one item per page in Tasks 80, 83, 87 and 88, so the link test never sees a route that does not exist yet.

- [ ] **Step 5: Build metadata from the config**

In `src/app/layout.tsx`, replace the `metadata` constant with:

```ts
import { site } from "@/site.config";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { siteName: site.name, title: site.name, description: site.description, type: "website" },
  icons: {
    shortcut: "/brand/favicon.png",
    icon: [
      { url: "/brand/favicon.png", type: "image/png", sizes: "96x96", media: "(prefers-color-scheme: light)" },
      { url: "/brand/favicon-dark.png", type: "image/png", sizes: "96x96", media: "(prefers-color-scheme: dark)" },
    ],
  },
};
```

Then in every `src/app/**/page.tsx` replace titles of the form `"<Title> | MCP Market"` with `"<Title>"`, because the template now appends the site name:

```bash
grep -rl ' | MCP Market' src/app | xargs sed -i 's# | MCP Market##g'
```

- [ ] **Step 6: Add placeholder brand assets**

Create `public/brand/logo.svg` (dark mark on transparent) and `public/brand/logo-dark.svg` (light mark):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none"><rect x="2" y="2" width="28" height="28" rx="8" fill="#0a0a0a"/><path d="M10 22 16 9l6 13m-9.5-4.5h7" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
```

`logo-dark.svg` is the same file with `#0a0a0a` and `#fff` swapped. Render both to 96×96 PNGs for favicons:

```bash
npx --yes sharp-cli -i public/brand/logo.svg -o public/brand/favicon.png resize 96 96
npx --yes sharp-cli -i public/brand/logo-dark.svg -o public/brand/favicon-dark.png resize 96 96
```

(`npx --yes` runs the tool without adding a dependency.)

- [ ] **Step 7: Run tests** — `node --test src/content/site-config.test.ts` passes; `npm run check` passes.
- [ ] **Step 8: Commit and open PR** on branch `feat/site-config`.

### Task 29: Logo component from config

PR: `feat(layout): render the site logo from config`

**Files:**
- Create: `src/components/layout/site-logo.tsx`
- Modify: `src/components/layout/site-header.tsx`, `src/components/layout/mobile-nav-sheet.tsx`, `src/components/layout/site-footer.tsx`, `src/components/blocks/newsletter-toast.tsx` — replace `LogoMarkIcon` and the "MCP / Market" wordmark spans with `<SiteLogo …/>`.

**Interfaces:**
- Produces: `SiteLogo({ name, logo, size = 36, showName = true }: { readonly name: string; readonly logo: SiteConfig["logo"]; readonly size?: number; readonly showName?: boolean })`.
- Each modified component gains props `name: string` and `logo: SiteConfig["logo"]`; `src/app/(site)/layout.tsx` passes `site.name` and `site.logo`.

- [ ] **Step 1: Write the component**

```tsx
// src/components/layout/site-logo.tsx
/* eslint-disable @next/next/no-img-element -- SVG logos need no optimisation */
import type { SiteConfig } from "@/lib/types";

interface SiteLogoProps {
  readonly name: string;
  readonly logo: SiteConfig["logo"];
  readonly size?: number;
  readonly showName?: boolean;
}

export function SiteLogo({ name, logo, size = 36, showName = true }: SiteLogoProps) {
  return (
    <span className="flex items-center gap-2">
      <img src={logo.light} alt="" width={size} height={size} className="dark:hidden" />
      <img src={logo.dark} alt="" width={size} height={size} className="hidden dark:block" />
      <span className={showName ? "font-sans text-[24px] leading-8 font-semibold tracking-[-0.6px]" : "sr-only"}>{name}</span>
    </span>
  );
}
```

- [ ] **Step 2: Replace the clone's logo** — in each modified file, delete the `LogoMarkIcon` import and the hardcoded `MCP`/`Market` spans, render `<SiteLogo name={name} logo={logo} />` (in the footer and toast use `showName={false}` where the source showed only the mark), and thread `name`/`logo` props from `src/app/(site)/layout.tsx`.
- [ ] **Step 3: Verify** — `grep -rn "LogoMarkIcon" src/components/layout src/components/blocks` is empty; `npm run check` passes; `npm run dev` shows the placeholder logo in header, mobile sheet and footer.
- [ ] **Step 4: Commit and open PR** on branch `feat/site-logo`.

### Task 30: Header and mobile nav from config

PR: `refactor(layout): pass header navigation as props`

**Files:**
- Modify: `src/components/layout/site-header.tsx`, `src/components/blocks/mega-menu.tsx`, `src/components/layout/mobile-nav-sheet.tsx`, `src/components/icons/nav-icons.tsx`, `src/site.config.ts`, `src/app/(site)/layout.tsx`

**Interfaces:**
- Produces: `SiteHeader({ name, logo, nav, mobileNav, actions }: { readonly name: string; readonly logo: SiteConfig["logo"]; readonly nav: readonly NavMenu[]; readonly mobileNav: readonly MobileNavGroup[]; readonly actions: SiteConfig["headerActions"] })`; `NavMegaMenu({ menus }: { readonly menus: readonly NavMenu[] })`; `MobileNavSheet({ open, onOpenChange, name, logo, groups, actions })`.
- Types now come from `@/lib/types` (not `$SITE/shared/types`).

- [ ] **Step 1:** Change imports of `NavMenu`, `NavFeatureCard`, `NavListItem`, `MobileNavGroup`, `NavIconName` in the four files to `@/lib/types`.
- [ ] **Step 2:** Replace `NAV_MENUS`, `MOBILE_NAV_GROUPS`, `MOBILE_NAV_FOOTER_LINKS` reads with props. The "Sell Skills" link becomes `actions.secondary` (render only when not null), "Power Your Agents / Connect" becomes `actions.primary.label`; the mobile footer links become `actions.secondary` and `actions.primary`.
- [ ] **Step 3:** Fill `site.nav` and `site.mobileNav` with neutral demo values that point only at routes that will exist:

```ts
  nav: [
    {
      label: "Browse",
      icon: "folderOpen",
      hero: { title: "Open the app", description: "Manage, create and schedule your content.", href: "/app", image: "/brand/nav/app.svg" },
      features: [
        { title: "Categories", description: "Browse listings by category.", href: "/categories", image: "/brand/nav/categories.svg" },
        { title: "Submit", description: "Add your tool to the directory.", href: "/submit", image: "/brand/nav/submit.svg" },
      ],
      links: [
        { title: "All categories", description: "Every category in the directory.", href: "/categories", icon: "folderOpen" },
        { title: "Search", description: "Find a tool by name or tag.", href: "/search", icon: "search" },
      ],
    },
  ],
  mobileNav: [
    {
      heading: "Browse",
      items: [
        { label: "Categories", href: "/categories", icon: "folderOpen" },
        { label: "Search", href: "/search", icon: "search" },
        { label: "Submit", href: "/submit", icon: "plus" },
      ],
    },
  ],
```

  Create the three nav images as 320×180 SVGs in `public/brand/nav/` (a rounded rectangle in `#f5f5f5` with a centred lucide-style glyph stroked `#0a0a0a`).
- [ ] **Step 4:** In `src/app/(site)/layout.tsx` render `<SiteHeader name={site.name} logo={site.logo} nav={site.nav} mobileNav={site.mobileNav} actions={site.headerActions} />`.
- [ ] **Step 5: Verify** — `grep -rn "NAV_MENUS\|MOBILE_NAV" src/components` is empty; `npm run check` passes; the dev server shows the Browse menu and mobile sheet.
- [ ] **Step 6: Commit and open PR** on branch `refactor/header-props`.

### Task 31: Footer from config

PR: `refactor(layout): pass footer content as props`

**Files:**
- Modify: `src/components/layout/site-footer.tsx`, `src/site.config.ts`, `src/app/(site)/layout.tsx`

**Interfaces:**
- Produces: `SiteFooter({ name, logo, footer, socials }: { readonly name: string; readonly logo: SiteConfig["logo"]; readonly footer: SiteConfig["footer"]; readonly socials: SiteConfig["socials"] })`.

- [ ] **Step 1:** Replace `FOOTER` and `FOOTER_COLUMNS` reads with `footer.description`, `footer.columns`, `footer.legalLinks`, `footer.copyright`; take `FooterColumn`/`FooterLink` types from `@/lib/types`. Remove the `LanguageSwitcher` render and import (the component is deleted in Task 48).
- [ ] **Step 2:** Replace `toSiteHref(link.href)` with `link.href`.
- [ ] **Step 3:** Fill `site.footer.columns`:

```ts
    columns: [
      {
        heading: "Browse",
        links: [
          { kind: "link", label: "Categories", href: "/categories" },
          { kind: "link", label: "Search", href: "/search" },
          { kind: "link", label: "Submit", href: "/submit" },
        ],
      },
      {
        heading: "Company",
        links: [
          { kind: "button", label: "Newsletter", ariaLabel: "Open newsletter signup", event: "open-newsletter-modal" },
          { kind: "button", label: "Contact", ariaLabel: "Open contact form", event: "open-contact-modal" },
        ],
      },
    ],
```

- [ ] **Step 4: Verify** — `npm run check` passes; footer renders the new columns.
- [ ] **Step 5: Commit and open PR** on branch `refactor/footer-props`.

### Task 32: Announcement, toast and lead dialogs from config

PR: `refactor(blocks): pass announcement, toast and lead forms as props`

**Files:**
- Modify: `src/components/blocks/announcement-bar.tsx`, `src/components/blocks/newsletter-toast.tsx`, `src/components/blocks/lead-dialog.tsx`, `src/site.config.ts`, `src/app/(site)/layout.tsx`

**Interfaces:**
- Produces: `AnnouncementBar({ announcement }: { readonly announcement: NonNullable<SiteConfig["announcement"]> })`, `NewsletterToast({ toast, name, logo })`, `SiteOverlays({ forms }: { readonly forms: readonly LeadForm[] })`, `OverlayTrigger` unchanged except `event: OverlayEvent` from `@/lib/types`.
- The layout renders `AnnouncementBar` only when `site.announcement` is not null, and `NewsletterToast` only when `site.newsletterToast` is not null.

- [ ] **Step 1:** Replace `ANNOUNCEMENT`, `NEWSLETTER_TOAST`, `LEAD_FORMS` reads with props; drop the `aliasEvent` field and its listener (clone-only).
- [ ] **Step 2:** Fill config:

```ts
  newsletterToast: { title: "Join our newsletter", description: "New tools and product updates, once a month.", cta: "Join now →" },
  leadForms: [
    {
      event: "open-newsletter-modal",
      title: "Join our newsletter",
      description: "New tools and product updates, once a month.",
      successTitle: "You're on the list",
      successDescription: "Thanks for subscribing.",
      emailId: "newsletter-email",
      fields: [],
      submitLabel: "Subscribe",
    },
    {
      event: "open-contact-modal",
      title: "Contact us",
      description: "Tell us what you need and we will get back to you.",
      successTitle: "Message sent",
      successDescription: "We will reply by email.",
      emailId: "contact-email",
      fields: [{ id: "contact-message", label: "Message", placeholder: "How can we help?", multiline: true }],
      submitLabel: "Send",
    },
  ],
```

- [ ] **Step 3: Verify** — `npm run check` passes; footer buttons open both dialogs; the toast shows after its delay.
- [ ] **Step 4: Commit and open PR** on branch `refactor/overlays-props`.

### Task 33: Categories content and content integrity test

PR: `feat(content): add categories content and integrity test`

**Files:**
- Create: `src/content/categories.ts`
- Create: `src/content/content.test.ts`
- Create: `src/lib/routes.ts`
- Modify: `src/app/(site)/categories/page.tsx`, `src/components/blocks/category-index.tsx`, `src/components/blocks/category-rail.tsx`, `src/components/blocks/hero.tsx` (category rail data now comes from props)
- Modify: `src/lib/types.ts` (add `Category`)

**Interfaces:**
- Produces: `Category { slug; name; description; icon: string }` in `@/lib/types`; `CATEGORIES: readonly Category[]` in `@/content/categories`.
- Produces: `routeExists(href: string, known: KnownRoutes): boolean` and `type KnownRoutes = { readonly routes: readonly string[]; readonly params: Readonly<Record<string, readonly string[]>> }` in `src/lib/routes.ts` — `routes` are App Router patterns like `/categories/[slug]`, `params` maps a pattern to its valid slugs.
- `CategoryIndex` tiles become `{ name, href, count }` built in the page from `CATEGORIES` (count = number of listings in that category, formatted with `toLocaleString("en-US")`; until Task 34 exists use `"0"`).
- `CategoryRail({ links }: { readonly links: readonly LinkRef[] })`; `HeroSection` gains `categoryLinks: readonly LinkRef[]`.

- [ ] **Step 1: Write the failing tests**

```ts
// src/content/content.test.ts
import { deepStrictEqual, ok } from "node:assert";
import { readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { test } from "node:test";

import { routeExists, type KnownRoutes } from "../lib/routes.ts";
import { site } from "../site.config.ts";
import { CATEGORIES } from "./categories.ts";

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
  params: { "/categories/[slug]": CATEGORIES.map((category) => category.slug) },
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
```

- [ ] **Step 2: Run to verify failure**

Run: `node --test src/content/content.test.ts`
Expected: FAIL with `Cannot find module '.../src/lib/routes.ts'`.

- [ ] **Step 3: Implement `routeExists`**

```ts
// src/lib/routes.ts
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
```

- [ ] **Step 4: Write categories content**

```ts
// src/content/categories.ts
import type { Category } from "../lib/types.ts";

export const CATEGORIES: readonly Category[] = [
  { slug: "design", name: "Design", description: "Tools for interface, brand and visual design.", icon: "Design Tools" },
  { slug: "video", name: "Video", description: "Editing, captions and publishing for video.", icon: "Content Management" },
  { slug: "productivity", name: "Productivity", description: "Plan, write and automate everyday work.", icon: "Productivity & Workflow" },
  { slug: "developer-tools", name: "Developer Tools", description: "Build, test and ship software.", icon: "Developer Tools" },
  { slug: "analytics", name: "Analytics", description: "Measure what matters.", icon: "Analytics & Monitoring" },
  { slug: "marketing", name: "Marketing", description: "Grow an audience and reach it.", icon: "Marketing Automation" },
];
```

`icon` is a name `CategoryIcon` already knows (the source's category names); check each against the `switch`/map in `src/components/blocks/category-icon.tsx` and pick one that exists.

Add to `src/lib/types.ts`:

```ts
export interface Category {
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  /** A name `CategoryIcon` draws. */
  readonly icon: string;
}
```

- [ ] **Step 5: Wire pages** — `categories/page.tsx` builds tiles from `CATEGORIES`; `(site)/page.tsx` passes `categoryLinks={[{ label: "All", href: "/categories" }, ...CATEGORIES.map((c) => ({ label: c.name, href: `/categories/${c.slug}` }))]}` to `HeroSection`; `CategoryRail` and `ListingHero` take `links` as props. `CategoryIndex` reads each tile's icon name from a new `icon` field on the tile.
- [ ] **Step 6: Run tests** — `node --test src/content/content.test.ts` passes (until Task 36 creates `/item/[slug]` no config link points there); `npm run check` passes.
- [ ] **Step 7: Commit and open PR** on branch `feat/content-categories`.

### Task 34: Listings content and one listing card

PR: `feat(content): add listings content and merge listing cards`

**Files:**
- Create: `src/content/listings.ts`
- Modify: `src/lib/types.ts` (add `Listing`, `FaqItem`)
- Modify: `src/components/blocks/listing-card.tsx` (becomes the only card), delete `src/components/blocks/listing-card-compact.tsx`
- Modify: `src/components/blocks/listing-results.tsx`, `src/components/blocks/search-results.tsx`, `src/components/blocks/directory-section.tsx`, `src/components/blocks/ranked-list.tsx` (use the merged card)
- Modify: `src/app/(site)/categories/[slug]/page.tsx`, `src/app/(site)/categories/page.tsx`
- Modify: `src/content/content.test.ts`

**Interfaces:**
- Produces in `@/lib/types`:

```ts
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
```

- Produces: `LISTINGS: readonly Listing[]` in `@/content/listings`; `ListingCard({ listing }: { readonly listing: Pick<Listing, "slug" | "name" | "summary" | "icon" | "tags" | "stars"> })` in `@/components/blocks/listing-card`, linking to `/item/${slug}`.

- [ ] **Step 1: Extend the failing tests** — append to `src/content/content.test.ts`:

```ts
import { LISTINGS } from "./listings.ts";

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
```

Move the `import { LISTINGS }` line to the top with the other imports.

- [ ] **Step 2: Run to verify failure** — `node --test src/content/content.test.ts` → FAIL, cannot find `listings.ts`.
- [ ] **Step 3: Write `src/content/listings.ts`** — at least two invented listings per category (12 or more), every field filled. One complete entry to copy the shape from:

```ts
import type { Listing } from "../lib/types.ts";

export const LISTINGS: readonly Listing[] = [
  {
    slug: "frameboard",
    name: "Frameboard",
    summary: "Lay out storyboards and shot lists for short videos.",
    category: "video",
    tags: ["storyboard", "planning"],
    stars: "4.2k",
    author: { label: "Frameboard Labs", href: "https://example.com/frameboard" },
    about: [
      "Frameboard turns a script into a board of shots you can reorder by dragging.",
      "Export the board as a shot list for your crew or as a PDF for review.",
    ],
    features: ["Drag-and-drop shot cards", "Script import", "PDF and CSV export"],
    useCases: ["Planning a weekly short-video series", "Briefing an editor"],
    faq: [{ question: "Is there a free plan?", answer: "Yes, up to three boards." }],
  },
];
```

All names, companies and URLs are invented and use `example.com`.

- [ ] **Step 4: Merge the cards** — rewrite `listing-card.tsx` to render a `Listing` subset: the dither strip, avatar (image, or a 20px circle with the first letter of `name` in `bg-surface-muted text-ink-muted` when `icon` is absent), name, summary, up to three `tags` as pills, and `stars` with the star icon when present. Delete the `CardFooter` "zero" branch. Use `next/link` to `/item/${listing.slug}`. Delete `listing-card-compact.tsx` and point its importers at `ListingCard`.
- [ ] **Step 5: Wire pages** — `categories/[slug]/page.tsx` uses `CATEGORIES` for `generateStaticParams`/metadata and `LISTINGS.filter((l) => l.category === slug)` for results; `pageLinks` becomes `[]` (single page; `paginationLinks` stays in `src/lib` for sites that need it). `categories/page.tsx` counts listings per category.
- [ ] **Step 6: Run tests** — content tests pass; `npm run check` passes.
- [ ] **Step 7: Commit and open PR** on branch `feat/content-listings`.

### Task 35: Home page from content

PR: `feat(content): build the home page from content`

**Files:**
- Create: `src/content/home.ts`, `src/content/faq.ts`
- Modify: `src/lib/types.ts` (add `HomeSection`, `HeroContent`)
- Modify: `src/components/blocks/hero.tsx`, `src/components/blocks/directory-section.tsx`, `src/components/blocks/faq.tsx`, `src/app/(site)/page.tsx`
- Modify: `src/content/content.test.ts`

**Interfaces:**
- Produces:

```ts
export interface HeroContent {
  readonly countLabel: string; // e.g. "1,204 tools"
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
```

- `HERO: HeroContent`, `HOME_SECTIONS: readonly HomeSection[]` in `@/content/home`; `FAQ: readonly FaqItem[]` in `@/content/faq`.
- `HeroSection({ hero, categoryLinks })`; `useTypewriter(words: readonly string[])`; `DirectorySection({ title, badge, viewAll, listings, tone })`; `FaqSection({ title = "Frequently Asked Questions", items })`.

- [ ] **Step 1: Extend tests** — append:

```ts
import { HOME_SECTIONS } from "./home.ts";

test("home sections reference existing listings and routes", () => {
  const slugs = new Set(LISTINGS.map((listing) => listing.slug));
  deepStrictEqual(HOME_SECTIONS.flatMap((section) => section.listingSlugs.filter((slug) => !slugs.has(slug))), []);
  deepStrictEqual(HOME_SECTIONS.map((s) => s.viewAll.href).filter((href) => !routeExists(href, known)), []);
});
```

- [ ] **Step 2: Run to verify failure** — FAIL, cannot find `home.ts`.
- [ ] **Step 3: Write content** — `HERO` with `title: "Find the best"`, `rotatingTerms: ["design tools", "video tools", "dev tools"]`; three `HOME_SECTIONS` ("Featured", "Video", "Developer Tools") each with six slugs and `viewAll` to `/categories` or `/categories/<slug>`; `FAQ` with four neutral questions about the directory.
- [ ] **Step 4: Make blocks take props** — `hero.tsx` drops the `HERO` import and receives `hero`; `useTypewriter` takes the word list; `directory-section.tsx` receives resolved `listings` (the page maps slugs to `Listing` objects); `faq.tsx` receives `items`.
- [ ] **Step 5: Rewrite `src/app/(site)/page.tsx`** to read `HERO`, `HOME_SECTIONS`, `LISTINGS`, `FAQ`, `CATEGORIES` and pass props. Resolve slugs with a `Map` from slug to listing.
- [ ] **Step 6: Run tests** — pass; `npm run check` passes; home page renders the demo content.
- [ ] **Step 7: Commit and open PR** on branch `feat/content-home`.

### Task 36: Item detail route

PR: `feat(item): add /item/[slug] from listings and remove /server`

**Files:**
- Create: `src/app/(site)/item/[slug]/page.tsx`
- Delete: `src/app/(site)/server/page.tsx`, `src/app/(site)/server/[slug]/page.tsx`, `src/components/blocks/item-tools-panel.tsx`, `src/components/sites/mcpmarket-com-1a9fdbee/server-slug-89dc0d19/` (data folder)
- Modify: `src/components/blocks/item-hero.tsx`, `item-tabs.tsx`, `item-sidebar.tsx`, `item-header-actions.tsx`, `item-types.ts`
- Modify: `src/content/content.test.ts` (add `/item/[slug]` params)

**Interfaces:**
- `ItemHero({ listing, categoryName, shareUrl })`, `ItemTabs({ about, features, useCases, faq })` with tabs Overview, Features, Use cases, FAQ; `ItemSidebar({ primary, related })` where `primary: LinkRef | null` and `related: readonly Pick<Listing, "slug" | "name" | "summary" | "icon">[]`.
- `item-types.ts` keeps only what these props need; the README fetch, MCP tools and `PrimaryActions.run` go.

- [ ] **Step 1: Extend the test's known params** — in `content.test.ts` add `"/item/[slug]": LISTINGS.map((l) => l.slug)` to `known.params`, and add a test:

```ts
test("item route exists for every listing", () => {
  deepStrictEqual(LISTINGS.filter((l) => !routeExists(`/item/${l.slug}`, known)).map((l) => l.slug), []);
});
```

- [ ] **Step 2: Run to verify failure** — FAIL, `/item/<slug>` not a known route.
- [ ] **Step 3: Write the route**

```tsx
// src/app/(site)/item/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "@/components/blocks/item-detail.module.css";
import { ItemHero } from "@/components/blocks/item-hero";
import { ItemSidebar } from "@/components/blocks/item-sidebar";
import { ItemTabs } from "@/components/blocks/item-tabs";
import { CATEGORIES } from "@/content/categories";
import { LISTINGS } from "@/content/listings";
import { site } from "@/site.config";

interface ItemPageProps {
  readonly params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return LISTINGS.map((listing) => ({ slug: listing.slug }));
}

async function findListing({ params }: ItemPageProps) {
  const { slug } = await params;
  const listing = LISTINGS.find((candidate) => candidate.slug === slug);
  if (!listing) notFound();
  return listing;
}

export async function generateMetadata(props: ItemPageProps): Promise<Metadata> {
  const listing = await findListing(props);
  return { title: listing.name, description: listing.summary };
}

export default async function ItemPage(props: ItemPageProps) {
  const listing = await findListing(props);
  const category = CATEGORIES.find((candidate) => candidate.slug === listing.category);
  const related = LISTINGS.filter((other) => other.category === listing.category && other.slug !== listing.slug).slice(0, 4);

  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen flex-col bg-[var(--design-canvas)] font-sans text-[var(--design-ink)]">
        <ItemHero listing={listing} categoryName={category?.name ?? listing.category} shareUrl={`${site.url}/item/${listing.slug}`} />
        <div className={`${styles.main} flex-1`}>
          <div className="container mx-auto max-w-7xl px-6 md:px-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-7">
              <section className="min-w-0 lg:col-span-3">
                <ItemTabs about={listing.about} features={listing.features} useCases={listing.useCases} faq={listing.faq} />
              </section>
              <ItemSidebar primary={{ label: `Visit ${listing.name}`, href: listing.author.href }} related={related} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 4: Adapt the blocks** — remove ToolsPanel usage and the README/tools tabs from `item-tabs.tsx`; render `about` as paragraphs, `features`/`useCases` as lists, `faq` with `AccordionRegion`. `item-hero.tsx` shows breadcrumb Home › category › name, author link, stars when present, tags, and `HeaderActions` with `githubUrl`/`npmUrl` set to `null` and `shareUrl` passed in. Replace every `toSiteHref(x)` in these files with `x`.
- [ ] **Step 5: Delete the server routes and data**

```bash
git rm -r "src/app/(site)/server" src/components/sites/mcpmarket-com-1a9fdbee/server-slug-89dc0d19 src/components/blocks/item-tools-panel.tsx
```

- [ ] **Step 6: Run tests** — pass; `npm run check` passes; `/item/frameboard` renders.
- [ ] **Step 7: Commit and open PR** on branch `feat/item-route`.

### Task 37: Search over listings

PR: `refactor(search): search listings content`

**Files:**
- Modify: `src/lib/search-index.ts`, `src/components/blocks/search-view.tsx`, `src/components/blocks/search-header.tsx`, `src/components/blocks/search-results.tsx`, `src/components/blocks/search-category-rail.tsx`, `src/components/blocks/browse-by-category.tsx`, `src/app/(site)/search/page.tsx`
- Create: `src/lib/search-index.test.ts`
- Delete: `src/components/sites/mcpmarket-com-1a9fdbee/search-6fb5b778/search-data.ts`

**Interfaces:**
- Produces in `src/lib/search-index.ts`:

```ts
export interface SearchParams { readonly query: string; readonly categorySlug: string }
export type RawSearchParams = Readonly<Record<string, string | string[] | undefined>>;
export function parseSearchParams(raw: RawSearchParams): SearchParams;
export interface Searchable { readonly slug: string; readonly name: string; readonly summary: string; readonly category: string; readonly tags: readonly string[] }
export function searchListings<T extends Searchable>(listings: readonly T[], params: SearchParams): T[];
```

- `SearchView({ params, listings, categories, browse })`; the MCP/Skills type tabs are removed.

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/search-index.test.ts
import { deepStrictEqual } from "node:assert";
import { test } from "node:test";

import { parseSearchParams, searchListings } from "./search-index.ts";

const rows = [
  { slug: "a", name: "Alpha Cut", summary: "Video editor", category: "video", tags: ["edit"] },
  { slug: "b", name: "Beta Board", summary: "Storyboards", category: "video", tags: ["plan"] },
  { slug: "c", name: "Gamma", summary: "Charts", category: "analytics", tags: ["edit"] },
];

test("parseSearchParams trims the query and takes the first value of repeated params", () => {
  deepStrictEqual(parseSearchParams({ q: "  cut ", category: ["video", "x"] }), { query: "cut", categorySlug: "video" });
  deepStrictEqual(parseSearchParams({}), { query: "", categorySlug: "" });
});

test("empty query returns everything in the category", () => {
  deepStrictEqual(searchListings(rows, { query: "", categorySlug: "video" }).map((r) => r.slug), ["a", "b"]);
  deepStrictEqual(searchListings(rows, { query: "", categorySlug: "" }).map((r) => r.slug), ["a", "b", "c"]);
});

test("query matches name, summary and tags case-insensitively", () => {
  deepStrictEqual(searchListings(rows, { query: "EDIT", categorySlug: "" }).map((r) => r.slug), ["a", "c"]);
  deepStrictEqual(searchListings(rows, { query: "storyboard", categorySlug: "" }).map((r) => r.slug), ["b"]);
});

test("name matches rank before summary or tag matches", () => {
  const ranked = searchListings(
    [
      { slug: "x", name: "Other", summary: "has cut inside", category: "v", tags: [] },
      { slug: "y", name: "Cut Pro", summary: "", category: "v", tags: [] },
    ],
    { query: "cut", categorySlug: "" },
  );
  deepStrictEqual(ranked.map((r) => r.slug), ["y", "x"]);
});
```

- [ ] **Step 2: Run to verify failure** — `node --test src/lib/search-index.test.ts` → FAIL, `searchListings` is not exported.
- [ ] **Step 3: Rewrite `search-index.ts`**

```ts
// src/lib/search-index.ts
export interface SearchParams {
  readonly query: string;
  readonly categorySlug: string;
}

export type RawSearchParams = Readonly<Record<string, string | string[] | undefined>>;

export interface Searchable {
  readonly slug: string;
  readonly name: string;
  readonly summary: string;
  readonly category: string;
  readonly tags: readonly string[];
}

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) ?? "";

export function parseSearchParams(raw: RawSearchParams): SearchParams {
  return { query: first(raw.q).trim(), categorySlug: first(raw.category).trim() };
}

/** Filters by category, then by a case-insensitive substring; name matches come first, original order otherwise. */
export function searchListings<T extends Searchable>(listings: readonly T[], { query, categorySlug }: SearchParams): T[] {
  const inCategory = categorySlug ? listings.filter((listing) => listing.category === categorySlug) : [...listings];
  const needle = query.toLowerCase();
  if (!needle) return inCategory;
  const byName = inCategory.filter((listing) => listing.name.toLowerCase().includes(needle));
  const byOther = inCategory.filter(
    (listing) =>
      !byName.includes(listing) &&
      (listing.summary.toLowerCase().includes(needle) || listing.tags.some((tag) => tag.toLowerCase().includes(needle))),
  );
  return [...byName, ...byOther];
}
```

- [ ] **Step 4: Adapt blocks and page** — remove `SearchTabs` and the `type` param; category rail and browse grid read `categories: readonly Category[]` props; results render `ListingCard`; page metadata title becomes `query ? \`Search results for "${query}"\` : "Search"`. Delete `search-data.ts` and the now-empty folder.
- [ ] **Step 5: Run tests** — pass; `npm run check` passes.
- [ ] **Step 6: Commit and open PR** on branch `refactor/search-listings`.

### Task 38: Generic submit form

PR: `refactor(submit): replace MCP submit forms with a generic form`

**Files:**
- Create: `src/components/blocks/submit-form.tsx`
- Modify: `src/components/blocks/submit-view.tsx`, `src/components/blocks/submit-hero.tsx`, `src/app/(site)/submit/page.tsx`, `src/lib/types.ts`
- Create: `src/content/submit.ts`
- Delete: `src/components/sites/mcpmarket-com-1a9fdbee/submit-7686f78b/`

**Interfaces:**
- `SubmitContent { title: string; description: string; fields: readonly LeadFormField[]; submitLabel: string; successTitle: string; successDescription: string }` in `@/lib/types`; `SUBMIT: SubmitContent` in `@/content/submit`.
- `SubmitForm({ content, categories }: { readonly content: SubmitContent; readonly categories: readonly Category[] })` — fields: name, url (`type="url"`), category (native `<select>`), plus `content.fields`; on submit shows success state after `SIMULATED_REQUEST_MS` (no network).

- [ ] **Step 1:** Write `submit-form.tsx` using `Field` and button styles from `@/components/ui/form-field`. It validates with native `required` and `type="url"`, sets `submitting` while the simulated request runs, then renders `successTitle`/`successDescription`.
- [ ] **Step 2:** `submit-view.tsx` renders only `SubmitForm`; `submit-hero.tsx` takes `title`/`description` props. Page reads `SUBMIT` and `CATEGORIES`.
- [ ] **Step 3:** `git rm -r src/components/sites/mcpmarket-com-1a9fdbee/submit-7686f78b`.
- [ ] **Step 4: Verify** — `npm run check` passes; `/submit` shows the form, an invalid URL is rejected by the browser, a valid submit shows the success message.
- [ ] **Step 5: Commit and open PR** on branch `refactor/submit-form`.

### Task 39: Neutral legal pages

PR: `feat(content): add neutral privacy and terms content`

**Files:**
- Create: `src/content/legal/privacy.tsx`, `src/content/legal/terms.tsx`
- Modify: `src/app/(site)/privacy/page.tsx`, `src/app/(site)/terms/page.tsx`, `src/components/blocks/legal-page.tsx`
- Delete: `src/components/sites/mcpmarket-com-1a9fdbee/privacy-0ece7f7c/PrivacyContent.tsx`, `src/components/sites/mcpmarket-com-1a9fdbee/terms-2dda5c6b/`

**Interfaces:**
- `PrivacyContent({ siteName, contactEmail })` and `TermsContent({ siteName, contactEmail })`, each also exporting `LAST_UPDATED: string`.
- `ProseLink` drops `toSiteHref`.

- [ ] **Step 1:** Write both files as short template policies (sections: Information we collect, How we use it, Sharing, Your choices, Contact for privacy; Use of the service, Accounts, Content, Disclaimers, Contact for terms) that use `siteName` and `contactEmail` and start with a sentence telling the site owner to replace the text with their own reviewed policy.
- [ ] **Step 2:** Pages pass `site.name` and `contact@example.com`.
- [ ] **Step 3:** Delete the clone's legal content files.
- [ ] **Step 4: Verify** — `grep -rni "sitka\|mcp market" src` returns nothing under `src/content` or `src/app/(site)/privacy|terms`; `npm run check` passes.
- [ ] **Step 5: Commit and open PR** on branch `feat/legal-content`.

### Task 40: Auth route group without the app's redirects

PR: `refactor(auth): rename auth route group and drop app redirects`

**Files:**
- Move: `src/app/(app-auth)` → `src/app/(auth)`
- Delete: `src/lib/auth-redirect.ts`
- Modify: `src/app/(auth)/layout.tsx`, `src/app/(auth)/login/page.tsx`, `src/app/(auth)/signup/page.tsx`, `src/components/blocks/login-form.tsx`, `src/components/blocks/signup-form.tsx`, `src/components/blocks/auth-shell.tsx`, `src/components/blocks/auth-side-panel.tsx`, `src/components/blocks/auth-lockup.tsx`

**Interfaces:**
- `LoginForm()` and `SignupForm()` take no props: on submit they wait `SIMULATED_REQUEST_MS` and then `router.push("/app")`.
- `AuthShell({ name, logo, children })`; `AuthLockup({ name, logo })` renders `SiteLogo`.
- Auth layout metadata: `{ title: "Sign in" }`; the Crimson font and `styles.theme` stay until Phase 4.

- [ ] **Step 1:** `git mv "src/app/(app-auth)" "src/app/(auth)"`.
- [ ] **Step 2:** Remove every `validateRedirectPath`, `redirectQuery`, `loginHeading` use; headings become "Log in to {name}" / "Create your {name} account" with `name` passed from the page via `site.name`.
- [ ] **Step 3:** Replace the forms' wrong-credentials simulation with navigation to `/app`. Until Task 80 creates `/app`, the link 404s; that is expected inside this PR series and noted in the PR body.
- [ ] **Step 4:** `git rm src/lib/auth-redirect.ts`; remove the app favicon reference from the layout metadata.
- [ ] **Step 5: Verify** — `npm run check` passes.
- [ ] **Step 6: Commit and open PR** on branch `refactor/auth-group`.

### Task 41: Remove toSiteHref

PR: `refactor(links): remove clone link mapping`

**Files:**
- Delete: `src/components/sites/mcpmarket-com-1a9fdbee/shared/links.ts`, `links.test.ts`
- Modify: every remaining importer (`grep -rln toSiteHref src`)

- [ ] **Step 1:** For each importer replace `toSiteHref(x)` with `x` and delete the import.
- [ ] **Step 2:** `git rm src/components/sites/mcpmarket-com-1a9fdbee/shared/links.ts src/components/sites/mcpmarket-com-1a9fdbee/shared/links.test.ts`
- [ ] **Step 3: Verify** — `grep -rn toSiteHref src` is empty; `npm run check` passes.
- [ ] **Step 4: Commit and open PR** on branch `refactor/remove-site-href`.

---

## Phase 3 — Drop clone-only routes and assets

Each task: before deleting, run `grep -rn "<folder or route>" src --include='*.ts*'` and confirm no file outside the deleted set imports it; then `git rm -r`, `npm run check`, PR.

### Task 42: Drop MCP explainer pages

PR: `chore(site): remove MCP explainer pages`

- [ ] **Step 1:**

```bash
git rm -r "src/app/(site)/what-is-an-mcp-server" "src/app/(site)/what-is-webmcp" \
  src/components/sites/mcpmarket-com-1a9fdbee/what-is-an-mcp-server-4bf875ce \
  src/components/sites/mcpmarket-com-1a9fdbee/what-is-webmcp-03cc721f
```

- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `chore/drop-explainers`.

### Task 43: Drop agent skills pages

PR: `chore(site): remove agent skills pages`

- [ ] **Step 1:**

```bash
git rm -r "src/app/(site)/tools" src/components/sites/mcpmarket-com-1a9fdbee/tools-skills-*
```

- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `chore/drop-skills`.

### Task 44: Drop daily pages

PR: `chore(site): remove daily pages`

- [ ] **Step 1:** `git rm -r "src/app/(site)/daily" src/components/sites/mcpmarket-com-1a9fdbee/daily-8ad2b380`
- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `chore/drop-daily`.

### Task 45: Drop sell and hub pages

PR: `chore(site): remove sell and hub pages`

- [ ] **Step 1:** `git rm -r "src/app/(site)/sell" "src/app/(site)/hub" src/components/sites/mcpmarket-com-1a9fdbee/sell-04d85308 src/components/sites/mcpmarket-com-1a9fdbee/hub-2382ac74`
- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `chore/drop-sell-hub`.

### Task 46: Drop client pages

PR: `chore(site): remove client pages`

- [ ] **Step 1:** `git rm -r "src/app/(site)/client" src/components/sites/mcpmarket-com-1a9fdbee/client-slug-53f8082a`
- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `chore/drop-client`.

### Task 47: Drop news and leaderboard routes, keep their blocks

PR: `chore(site): remove news and leaderboard routes`

**Files:**
- Delete: `src/app/(site)/news`, `src/app/(site)/leaderboards`, `src/components/sites/mcpmarket-com-1a9fdbee/news-f46b16ed`, `src/components/sites/mcpmarket-com-1a9fdbee/leaderboards-47b0390f`
- Modify: `src/components/blocks/article-card.tsx`, `src/components/blocks/ranked-list.tsx`, `ranked-hero.tsx`, `ranked-page.tsx`, `ranked-types.ts` — remove imports of deleted data files; `ArticleCard({ article }: { readonly article: Article })` with `Article { href; title; summary; source; publishedAt; relative }` defined in a new `src/components/blocks/article-types.ts`; `RankedList({ rows, variant })` keeps its own `RankedRow` type.

- [ ] **Step 1:** Move `NewsItem` fields into `Article` in `article-types.ts`; change `article-card.tsx` to use it.
- [ ] **Step 2:** Make `ranked-types.ts` self-contained (no imports from deleted folders).
- [ ] **Step 3:** Delete the routes and data folders.
- [ ] **Step 4: Verify** — `npm run check` passes; the blocks still type-check with no page using them (they are registry items).
- [ ] **Step 5: Commit and open PR** on branch `chore/drop-news-leaderboards`.

### Task 48: Drop language switcher

PR: `chore(site): remove language switcher`

- [ ] **Step 1:** `git rm src/components/sites/mcpmarket-com-1a9fdbee/shared/LanguageSwitcher.tsx`; delete `LOCALES` from `site-data.ts`.
- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `chore/drop-language-switcher`.

### Task 49: Delete the clone folders and captured assets

PR: `chore(site): delete clone data folders and captured assets`

- [ ] **Step 1:** Confirm nothing imports the remaining clone files: `grep -rn "components/sites/" src` must be empty. If a file still does, switch it to `@/content/*` first in this PR.
- [ ] **Step 2:** `git rm -r src/components/sites public/sites public/favicon.png public/favicon-dark.png`
- [ ] **Step 3: Verify** — `grep -rniE "mcp ?market|mcpmarket|sitka" src public` returns nothing; `npm run check` passes.
- [ ] **Step 4: Commit and open PR** on branch `chore/delete-clone-assets`.

### Task 50: Rewrite AGENTS.md for the template

PR: `docs: rewrite AGENTS.md for the template`

**Files:**
- Modify: `AGENTS.md` (keep the `<!-- BEGIN:nextjs-agent-rules -->` … `<!-- END:nextjs-agent-rules -->` block verbatim)

- [ ] **Step 1:** Replace everything after the Next.js block with:

```markdown
# Site template

A Next.js starter for directory sites and management dashboards. Static data, no backend.

- `npm run check` runs lint, typecheck, tests, registry build and app build. Run it before committing.
- TypeScript strict, no `any`. Tailwind utilities, no inline styles. Named exports.

## Where things live

| What | Where |
| --- | --- |
| Brand: name, url, logo, nav, footer | `src/site.config.ts` |
| Copy and demo data | `src/content/` |
| Colors, radius, shadows, fonts for light and dark | `src/app/theme.css` |
| Page sections | `src/components/blocks/` |
| Header, footer, sidebar, top bar | `src/components/layout/` |
| Primitives | `src/components/ui/` |
| Pages | `src/app/(site)`, `src/app/(auth)`, `src/app/(dashboard)/app` |

## Starting a new site

1. Keep the route groups the site needs and delete the rest:
   marketplace or landing page keeps `(site)` (and `(auth)` with accounts);
   internal tool keeps `(dashboard)` and `(auth)`; a SaaS product keeps all three.
2. Edit `src/site.config.ts`.
3. Replace the files in `src/content/`.
4. Set `--design-accent` and fonts in `src/app/theme.css` and `src/app/layout.tsx`.
5. Replace `public/brand/`.
6. Rewrite `README.md`.

## Rules

- Blocks take props. They never import `@/content/*` or `@/site.config`; pages do.
- Colors come only from tokens in `theme.css`, defined for both `:root` and `.dark`. No hex, `rgb()` or `rgba()` in components.
- To redesign: change tokens first, then edit a block, then write a new block.
- A changed or added block updates its entry in `registry.json` in the same commit.
```

- [ ] **Step 2: Commit and open PR** on branch `docs/agents-template`.

### Task 51: Rewrite README

PR: `docs: rewrite README for the template`

- [ ] **Step 1:** Replace `README.md` with: one-paragraph description; Quick start (`nvm use`, `npm install`, `npm run dev`); "Choosing layouts" table (copy from the spec); "Customising" (config, content, theme); Scripts table (Task 94 adds `registry:build` later); Docker section unchanged; Stack line updated; Project layout block from the spec; License MIT. Remove the MCP Market badge text and ownership line.
- [ ] **Step 2: Commit and open PR** on branch `docs/readme-template`.

---

## Phase 4 — Theme tokens and dark mode

### Task 52: Color utilities and theme.css

PR: `refactor(theme): move tokens to theme.css and add color utilities`

**Files:**
- Create: `src/app/theme.css`
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces Tailwind colors `canvas`, `surface`, `surface-muted`, `surface-subtle`, `ink`, `ink-secondary`, `ink-muted`, `success` (plus the existing shadcn colors), usable with opacity modifiers (`border-ink/14`).

- [ ] **Step 1:** Cut the whole `:root { … }` block out of `globals.css` into a new `src/app/theme.css`, unchanged, and add one token at the end of the `--design-*` group:

```css
  --design-success: #10b981;
```

- [ ] **Step 2:** In `globals.css`, add `@import "./theme.css";` directly after `@import "shadcn/tailwind.css";`, and add to the `@theme inline` block:

```css
  --color-canvas: var(--design-canvas);
  --color-surface: var(--design-surface);
  --color-surface-muted: var(--design-surface-muted);
  --color-surface-subtle: var(--design-surface-subtle);
  --color-ink: var(--design-ink);
  --color-ink-secondary: var(--design-ink-secondary);
  --color-ink-muted: var(--design-ink-muted);
  --color-success: var(--design-success);
```

- [ ] **Step 3: Verify** — `npm run build` passes; add a temporary `className="text-ink/50"` to any element, run `npm run dev`, confirm in DevTools it computes to `color-mix(… #0a0a0a 50% …)`, then remove it. `npm run check` passes.
- [ ] **Step 4: Commit and open PR** on branch `refactor/theme-css`.

### Task 53: No-hardcoded-colors test

PR: `test(theme): forbid hardcoded colors outside theme.css`

**Files:**
- Create: `src/app/no-hardcoded-colors.test.ts`

- [ ] **Step 1: Generate the pending list**

```bash
grep -rlE '#[0-9a-fA-F]{3,8}\b|\b(rgba?|hsla?)\(|-(white|black)\b' src/components src/app/globals.css | sed 's#^src/##' | sort
```

- [ ] **Step 2: Write the test** with the command's output pasted into `PENDING`, one quoted path per line:

```ts
// src/app/no-hardcoded-colors.test.ts
import { deepStrictEqual } from "node:assert";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { test } from "node:test";

const SRC = new URL("..", import.meta.url).pathname;
const COLOR = /#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?)\(|-(?:white|black)\b/;

/** Files still waiting for their Phase 4 tokenize task. Only ever remove entries. */
const PENDING = new Set<string>([
  // paste the output of Step 1 here
]);

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return files(full);
    return /\.(tsx?|css)$/.test(entry) && !entry.endsWith(".test.ts") ? [full] : [];
  });
}

const scanned = [...files(join(SRC, "components")), join(SRC, "app", "globals.css")];
const hasColor = (path: string) => COLOR.test(readFileSync(path, "utf8"));

test("components and globals.css use tokens, not color values", () => {
  const offenders = scanned.map((path) => relative(SRC, path)).filter((path) => !PENDING.has(path) && hasColor(join(SRC, path)));
  deepStrictEqual(offenders, []);
});

test("pending list only names files that exist and still contain colors", () => {
  const stale = [...PENDING].filter((path) => !existsSync(join(SRC, path)) || !hasColor(join(SRC, path)));
  deepStrictEqual(stale, []);
});
```

- [ ] **Step 3: Run** — `node --test src/app/no-hardcoded-colors.test.ts` passes. Temporarily add `text-[#123456]` to a file not in `PENDING` and confirm the first test fails, then revert.
- [ ] **Step 4: Commit and open PR** on branch `test/no-hardcoded-colors`.

### Tasks 54–65: Tokenize components

Each task below is one PR that replaces every color value in its files using the **Color mapping** table in Global Constraints, removes those files from `PENDING` in `src/app/no-hardcoded-colors.test.ts`, and adds any new `--design-*` token to `theme.css` (light value only; dark values come in Task 66). Steps for every one of them:

- [ ] **Step 1:** Remove the task's files from `PENDING` (a listed file that is not in `PENDING` already has no colors; skip it); run `node --test src/app/no-hardcoded-colors.test.ts` → FAIL listing exactly those files.
- [ ] **Step 2:** Replace the values. Arbitrary shadows become `shadow-[var(--design-shadow-<name>)]` with the value moved into `theme.css`. SVG `fill`/`stroke` literals become `currentColor` with a text color class on the element.
- [ ] **Step 3:** Run the test → PASS. Run `npm run dev` and compare the page with `git stash`-ed `main` side by side in light mode: no visible change.
- [ ] **Step 4:** `npm run check`, commit, open PR.

| Task | PR title | Files |
| --- | --- | --- |
| 54 | `refactor(theme): tokenize site header` | `components/layout/site-header.tsx`, `components/blocks/mega-menu.tsx`, `components/layout/mobile-nav-sheet.tsx` |
| 55 | `refactor(theme): tokenize site footer` | `components/layout/site-footer.tsx`, `components/layout/site-logo.tsx` |
| 56 | `refactor(theme): tokenize hero and dither backdrop` | `components/blocks/hero.tsx`, `app/globals.css` (`.design-dither-static` dot colors become `--design-dither-dot` and `--design-dither-dot-strong`; the white sheen becomes `--design-dither-sheen`) |
| 57 | `refactor(theme): tokenize listing card and directory section` | `components/blocks/listing-card.tsx`, `listing-card.module.css`, `directory-section.tsx`, `category-rail.tsx` |
| 58 | `refactor(theme): tokenize faq and overlays` | `components/blocks/faq.tsx`, `components/ui/accordion-region.tsx`, `components/blocks/announcement-bar.tsx`, `newsletter-toast.tsx`, `lead-dialog.tsx` |
| 59 | `refactor(theme): tokenize listing and category pages` | `components/blocks/listing-hero.tsx`, `listing-search.tsx`, `listing-results.tsx`, `category-index.tsx`, `category-icon.tsx`, `category-icon.module.css` |
| 60 | `refactor(theme): tokenize item detail` | `components/blocks/item-hero.tsx`, `item-tabs.tsx`, `item-sidebar.tsx`, `item-header-actions.tsx`, `item-detail.module.css` |
| 61 | `refactor(theme): tokenize search` | `components/blocks/search-view.tsx`, `search-header.tsx`, `search-results.tsx`, `search-category-rail.tsx`, `browse-by-category.tsx` |
| 62 | `refactor(theme): tokenize legal and submit` | `components/blocks/legal-page.tsx`, `legal-prose.module.css`, `content-page-hero.tsx`, `submit-hero.tsx`, `submit-view.tsx`, `submit-form.tsx`, `components/ui/form-field.tsx`, `components/ui/texture-button.ts` |
| 63 | `refactor(theme): tokenize ranked list and article card` | `components/blocks/ranked-list.tsx`, `ranked-hero.tsx`, `ranked-page.tsx`, `article-card.tsx` |
| 64 | `refactor(theme): tokenize auth screens` | `components/blocks/auth-*.tsx`, `oauth-buttons.tsx`, `login-form.tsx`, `signup-form.tsx`, `auth.module.css`, `components/ui/auth-controls.tsx`; also delete the `.theme` class from `auth.module.css` and its use in `src/app/(auth)/layout.tsx` (the auth screens now use the site tokens) and map its `--border-strong`/`--bg-hover` variables to `--design-line-strong`/`--color-accent` |
| 65 | `refactor(theme): tokenize icons` | every file under `components/icons/` (brand favicon colors in `BRAND_FAVICONS` stay as image paths, not colors) |

After Task 65 `PENDING` is empty; delete the constant's comment line and leave `new Set<string>([])`.

### Task 66: Dark tokens and parity test

PR: `feat(theme): add dark theme tokens`

**Files:**
- Modify: `src/app/theme.css`
- Create: `src/app/theme.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/app/theme.test.ts
import { deepStrictEqual } from "node:assert";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const css = readFileSync(new URL("./theme.css", import.meta.url), "utf8");

/** Custom property names declared inside the first `<selector> {` block of theme.css. */
function declared(selector: string): Set<string> {
  const start = css.indexOf(`${selector} {`);
  if (start === -1) return new Set();
  const end = css.indexOf("\n}", start);
  return new Set(css.slice(start, end).match(/--[\w-]+(?=\s*:)/g) ?? []);
}

/** Fonts and radii do not change between themes. */
const THEME_INDEPENDENT = /^--(?:design-font|design-radius|radius$)/;

test("every themed token in :root is redefined in .dark", () => {
  const dark = declared(".dark");
  const missing = [...declared(":root")].filter((name) => !THEME_INDEPENDENT.test(name) && !dark.has(name));
  deepStrictEqual(missing, []);
});

test(".dark declares nothing that :root does not", () => {
  const light = declared(":root");
  deepStrictEqual([...declared(".dark")].filter((name) => !light.has(name)), []);
});
```

- [ ] **Step 2: Run** — `node --test src/app/theme.test.ts` → FAIL, the first test lists every themed token.
- [ ] **Step 3: Add the `.dark` block** after `:root` in `theme.css`. Start from these values, then add a dark value for every token Tasks 54–65 introduced (the test lists any you miss):

```css
.dark {
  color-scheme: dark;
  --design-canvas: #0b0b0b;
  --design-surface: #141414;
  --design-surface-muted: #1a1a1a;
  --design-surface-subtle: #111111;
  --design-ink: #f5f5f5;
  --design-ink-secondary: #c7c7c7;
  --design-ink-muted: #9a9a9a;
  --design-line: rgb(245 245 245 / 0.14);
  --design-line-strong: rgb(245 245 245 / 0.28);
  --design-glass: rgb(20 20 20 / 0.78);
  --design-glass-focus: rgb(20 20 20 / 0.9);
  --design-surface-glass: rgb(20 20 20 / 0.72);
  --design-surface-glass-hover: rgb(28 28 28 / 0.88);
  --design-surface-glass-line: rgb(255 255 255 / 0.08);
  --design-surface-glass-line-hover: rgb(255 255 255 / 0.14);
  --design-shadow-glass-card: 0 16px 38px -28px rgb(0 0 0 / 0.8);
  --design-shadow-glass-card-hover: 0 22px 46px -30px rgb(0 0 0 / 0.9);
  --design-navigation-glass: linear-gradient(180deg, rgb(24 24 24 / 0.82), rgb(16 16 16 / 0.64));
  --design-navigation-panel: linear-gradient(180deg, #181818, #111111);
  --design-navigation-line: rgb(255 255 255 / 0.1);
  --design-shadow-card: 0 12px 34px rgb(0 0 0 / 0.4);
  --design-shadow-inset: inset 0 1px 0 rgb(255 255 255 / 0.06);
  --design-shadow-field: 0 18px 42px rgb(0 0 0 / 0.5), inset 0 1px 0 rgb(255 255 255 / 0.06);
  --design-shadow-floating: 0 0 0 1px rgb(255 255 255 / 0.06), 0 18px 40px rgb(0 0 0 / 0.5), 0 38px 72px rgb(0 0 0 / 0.4);
  --design-shadow-navigation: 0 1px 2px rgb(0 0 0 / 0.4), 0 18px 42px -12px rgb(0 0 0 / 0.6), inset 0 1px 0 rgb(255 255 255 / 0.06);
  --design-success: #34d399;

  --background: #0b0b0b;
  --foreground: #f5f5f5;
  --card: #141414;
  --card-foreground: #f5f5f5;
  --popover: #141414;
  --popover-foreground: #f5f5f5;
  --primary: #f5f5f5;
  --primary-foreground: #0a0a0a;
  --secondary: #1a1a1a;
  --secondary-foreground: #f5f5f5;
  --muted: #1a1a1a;
  --muted-foreground: #9a9a9a;
  --accent: #1f1f1f;
  --accent-foreground: #f5f5f5;
  --destructive: hsl(0 72% 58%);
  --border: #2a2a2a;
  --input: #2e2e2e;
  --ring: #f5f5f5;
}
```

- [ ] **Step 4: Run** — test passes. Check the dark look by adding `dark` to `<html>` in DevTools on `/`, `/categories`, `/item/frameboard`, `/search`, `/submit`, `/privacy`, `/login`: text readable, cards visible against the canvas, no white blocks.
- [ ] **Step 5:** `npm run check`, commit, open PR on branch `feat/theme-dark-tokens`.

### Task 67: Brand accent token

PR: `feat(theme): add a brand accent token`

**Files:**
- Modify: `src/app/theme.css`

- [ ] **Step 1:** Add to `:root`:

```css
  /* Brand color. shadcn's --accent is a hover background, not this. */
  --design-accent: #0a0a0a;
  --design-accent-foreground: #ffffff;
```

and to `.dark`:

```css
  --design-accent: #f5f5f5;
  --design-accent-foreground: #0a0a0a;
```

- [ ] **Step 2:** In both blocks set `--primary: var(--design-accent); --primary-foreground: var(--design-accent-foreground); --ring: var(--design-accent);`.
- [ ] **Step 3: Verify** — `node --test src/app/theme.test.ts` passes; temporarily set `--design-accent: #2563eb` and confirm primary buttons and focus rings turn blue; revert. `npm run check` passes.
- [ ] **Step 4: Commit and open PR** on branch `feat/theme-accent`.

### Task 68: Theme preference and no-flash script

PR: `feat(theme): apply the saved theme before first paint`

**Files:**
- Create: `src/lib/theme.ts`, `src/lib/theme.test.ts`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: `type ThemePreference = "system" | "light" | "dark"`, `THEME_STORAGE_KEY = "theme"`, `parsePreference(value: string | null): ThemePreference`, `isDark(preference: ThemePreference, prefersDark: boolean): boolean`, `readPreference(): ThemePreference`, `writePreference(preference: ThemePreference): void`, `applyPreference(preference: ThemePreference): void`, `THEME_SCRIPT: string`.

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/theme.test.ts
import { strictEqual } from "node:assert";
import { test } from "node:test";

import { isDark, parsePreference, THEME_SCRIPT } from "./theme.ts";

test("parsePreference falls back to system for anything unknown", () => {
  strictEqual(parsePreference("light"), "light");
  strictEqual(parsePreference("dark"), "dark");
  strictEqual(parsePreference(null), "system");
  strictEqual(parsePreference("purple"), "system");
  strictEqual(parsePreference(""), "system");
});

test("isDark follows the system only in system mode", () => {
  strictEqual(isDark("system", true), true);
  strictEqual(isDark("system", false), false);
  strictEqual(isDark("light", true), false);
  strictEqual(isDark("dark", false), true);
});

function runScript(stored: string | null | Error, prefersDark: boolean) {
  const classes = new Set<string>();
  const root = {
    classList: { toggle: (name: string, on: boolean) => (on ? classes.add(name) : classes.delete(name)) },
    style: { colorScheme: "" },
  };
  const storage = {
    getItem: () => {
      if (stored instanceof Error) throw stored;
      return stored;
    },
  };
  const matchMedia = () => ({ matches: prefersDark });
  new Function("localStorage", "matchMedia", "document", THEME_SCRIPT)(storage, matchMedia, { documentElement: root });
  return { dark: classes.has("dark"), scheme: root.style.colorScheme };
}

test("the inline script agrees with isDark for every stored value", () => {
  for (const stored of ["light", "dark", null, "garbage"]) {
    for (const prefersDark of [true, false]) {
      strictEqual(runScript(stored, prefersDark).dark, isDark(parsePreference(stored), prefersDark), `${stored}/${prefersDark}`);
    }
  }
});

test("the inline script survives storage that throws and follows the system", () => {
  strictEqual(runScript(new Error("SecurityError"), true).dark, true);
  strictEqual(runScript(new Error("SecurityError"), false).scheme, "light");
});
```

- [ ] **Step 2: Run** — `node --test src/lib/theme.test.ts` → FAIL, module not found.
- [ ] **Step 3: Implement**

```ts
// src/lib/theme.ts
export type ThemePreference = "system" | "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

const DARK_QUERY = "(prefers-color-scheme: dark)";

export function parsePreference(value: string | null): ThemePreference {
  return value === "light" || value === "dark" ? value : "system";
}

export function isDark(preference: ThemePreference, prefersDark: boolean): boolean {
  return preference === "dark" || (preference === "system" && prefersDark);
}

export function readPreference(): ThemePreference {
  try {
    return parsePreference(localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    // Storage can be blocked (private mode, site data disabled); the system theme still works.
    return "system";
  }
}

export function writePreference(preference: ThemePreference): void {
  try {
    if (preference === "system") localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    // Same as readPreference: the choice applies for this page view only.
  }
}

export function applyPreference(preference: ThemePreference): void {
  const dark = isDark(preference, matchMedia(DARK_QUERY).matches);
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
}

/** Inlined in <head> so the right theme is set before the first paint. Must stay in step with isDark. */
export const THEME_SCRIPT = `(function(){var t=null;try{t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)})}catch(e){}var d=t==="dark"||(t!=="light"&&matchMedia(${JSON.stringify(DARK_QUERY)}).matches);var r=document.documentElement;r.classList.toggle("dark",d);r.style.colorScheme=d?"dark":"light"})()`;
```

- [ ] **Step 4: Wire the layout** — in `src/app/layout.tsx` remove the `light` class, add `suppressHydrationWarning` to `<html>`, and render the script first in `<head>`:

```tsx
import { THEME_SCRIPT } from "@/lib/theme";

    <html lang="en" className={`${inter.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="bg-background font-sans text-foreground">{children}</body>
    </html>
```

- [ ] **Step 5: Verify** — tests pass; with the OS in dark mode, `npm run dev` loads `/` dark with no light flash on hard reload; in the console `localStorage.setItem("theme","light")` then reload shows light; `localStorage.setItem("theme","nope")` then reload follows the OS. `npm run check` passes.
- [ ] **Step 6: Commit and open PR** on branch `feat/theme-script`.

### Task 69: Theme toggle

PR: `feat(theme): add theme toggle to the site header`

**Files:**
- Create: `src/components/blocks/theme-toggle.tsx`
- Modify: `src/components/layout/site-header.tsx`, `src/components/layout/mobile-nav-sheet.tsx`

**Interfaces:**
- Consumes: `readPreference`, `writePreference`, `applyPreference`, `ThemePreference` from Task 68.
- Produces: `ThemeToggle({ className }: { readonly className?: string })`.

- [ ] **Step 1: Write the component.** Check the Base UI menu part names against `node_modules/@base-ui/react/menu/index.d.ts` before writing; the clone's `LanguageSwitcher` (on the `mcpmarket-clone` branch: `git show mcpmarket-clone:src/components/sites/mcpmarket-com-1a9fdbee/shared/LanguageSwitcher.tsx`) shows the popup styling used on this site.

```tsx
// src/components/blocks/theme-toggle.tsx
"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Menu } from "@base-ui/react/menu";
import { Check, Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { applyPreference, readPreference, writePreference, type ThemePreference } from "@/lib/theme";

const OPTIONS = [
  { value: "system", label: "System", Icon: Monitor },
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
] as const satisfies readonly { value: ThemePreference; label: string; Icon: typeof Sun }[];

const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function choose(preference: ThemePreference) {
  writePreference(preference);
  applyPreference(preference);
  listeners.forEach((listener) => listener());
}

export function ThemeToggle({ className }: { readonly className?: string }) {
  const preference = useSyncExternalStore(subscribe, readPreference, () => "system" as const);

  useEffect(() => {
    if (preference !== "system") return;
    const query = matchMedia("(prefers-color-scheme: dark)");
    const follow = () => applyPreference("system");
    query.addEventListener("change", follow);
    return () => query.removeEventListener("change", follow);
  }, [preference]);

  return (
    <Menu.Root>
      <Menu.Trigger
        aria-label="Change theme"
        className={cn(
          "inline-flex size-10 items-center justify-center rounded-[12px] text-ink-secondary transition-colors hover:bg-ink/5 hover:text-ink",
          className,
        )}
      >
        <Sun aria-hidden className="size-[18px] dark:hidden" strokeWidth={1.5} />
        <Moon aria-hidden className="hidden size-[18px] dark:block" strokeWidth={1.5} />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner sideOffset={8} align="end" className="z-[60]">
          <Menu.Popup className="min-w-36 rounded-[12px] border border-border bg-popover p-1 text-sm text-popover-foreground shadow-[var(--design-shadow-floating)]">
            <Menu.RadioGroup value={preference} onValueChange={(value) => choose(parsePreferenceValue(value))}>
              {OPTIONS.map(({ value, label, Icon }) => (
                <Menu.RadioItem
                  key={value}
                  value={value}
                  className="flex cursor-default items-center gap-2 rounded-[8px] px-2 py-1.5 outline-none data-[highlighted]:bg-accent"
                >
                  <Icon aria-hidden className="size-4" strokeWidth={1.5} />
                  <span className="flex-1">{label}</span>
                  <Menu.RadioItemIndicator>
                    <Check aria-hidden className="size-4" />
                  </Menu.RadioItemIndicator>
                </Menu.RadioItem>
              ))}
            </Menu.RadioGroup>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

function parsePreferenceValue(value: unknown): ThemePreference {
  return value === "light" || value === "dark" ? value : "system";
}
```

- [ ] **Step 2:** Render `<ThemeToggle />` in `site-header.tsx` before the secondary action, and in `mobile-nav-sheet.tsx` next to the close button.
- [ ] **Step 3: Verify** — choosing Dark/Light/System switches immediately, survives reload, and another open tab follows via the `storage` event; with System selected, flipping the OS theme flips the page. `npm run check` passes.
- [ ] **Step 4: Commit and open PR** on branch `feat/theme-toggle`.

### Task 70: Dither shader follows the theme

PR: `feat(theme): color the hero shader from tokens`

**Files:**
- Modify: `src/components/blocks/dither-background.tsx`, `src/app/theme.css`

**Interfaces:**
- Produces tokens `--design-dither-back` and `--design-dither-front` in both theme blocks (hex, because the shader parses colors itself): light `#f5f5f5` / `#5f5f5f52`, dark `#1a1a1a` / `#a0a0a052`.

- [ ] **Step 1:** Add the four token values to `theme.css`; `node --test src/app/theme.test.ts` passes.
- [ ] **Step 2:** In `dither-background.tsx` add a theme-aware read and pass the colors into the dynamic component:

```tsx
function subscribeToThemeClass(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

function readDitherColors(): string {
  const style = getComputedStyle(document.documentElement);
  return `${style.getPropertyValue("--design-dither-back").trim()}|${style.getPropertyValue("--design-dither-front").trim()}`;
}
```

In `HeroDitherShader` call `const colors = useSyncExternalStore(subscribeToThemeClass, readDitherColors, () => "");`, split on `|`, and render `<DitheringField colorBack={back} colorFront={front} />` only when both are non-empty. Change the `dynamic` factory so `HeroDitheringField` accepts `{ colorBack, colorFront }` props instead of the literals.
- [ ] **Step 3: Verify** — toggling the theme re-colors the animated dither without a reload; reduced-motion still skips the shader. `npm run check` passes.
- [ ] **Step 4: Commit and open PR** on branch `feat/theme-shader`.

---

## Phase 5 — Management dashboard

### Task 71: Button primitive

PR: `feat(ui): add button`

**Files:**
- Create: `src/components/ui/button.tsx`

**Interfaces:**
- Produces: `Button(props: ButtonProps)`, `buttonVariants({ variant, size }: { readonly variant?: ButtonVariant; readonly size?: ButtonSize }): string`, `type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive"`, `type ButtonSize = "sm" | "md" | "icon"`.

- [ ] **Step 1: Write**

```tsx
// src/components/ui/button.tsx
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const VARIANTS = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "border border-border bg-surface text-ink hover:bg-accent",
  ghost: "text-ink-secondary hover:bg-accent hover:text-ink",
  destructive: "bg-destructive/10 text-destructive hover:bg-destructive/15",
} as const;

const SIZES = {
  sm: "h-8 px-3 text-[13px]",
  md: "h-9 px-4 text-sm",
  icon: "size-9",
} as const;

export type ButtonVariant = keyof typeof VARIANTS;
export type ButtonSize = keyof typeof SIZES;

export function buttonVariants({ variant = "primary", size = "md" }: { readonly variant?: ButtonVariant; readonly size?: ButtonSize } = {}) {
  return cn(
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-[var(--design-radius-md)] font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
    VARIANTS[variant],
    SIZES[size],
  );
}

export interface ButtonProps extends ComponentProps<"button"> {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
}

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} data-slot="button" className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
```

- [ ] **Step 2: Verify** — `npm run check` passes (the color test also covers this file).
- [ ] **Step 3: Commit and open PR** on branch `feat/ui-button`.

### Task 72: Input and textarea primitives

PR: `feat(ui): add input and textarea`

**Files:**
- Create: `src/components/ui/input.tsx`

**Interfaces:**
- Produces: `fieldClassName: string`, `Input(props: ComponentProps<"input">)`, `Textarea(props: ComponentProps<"textarea">)`.

- [ ] **Step 1: Write**

```tsx
// src/components/ui/input.tsx
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const fieldClassName =
  "w-full rounded-[var(--design-radius-md)] border border-input bg-surface px-3 text-sm text-ink placeholder:text-ink-muted outline-none transition-[border-color,box-shadow] focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input data-slot="input" className={cn(fieldClassName, "h-9", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea data-slot="textarea" className={cn(fieldClassName, "min-h-24 py-2", className)} {...props} />;
}
```

- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `feat/ui-input`.

### Task 73: Select primitive

PR: `feat(ui): add native select`

**Files:**
- Create: `src/components/ui/select.tsx`

**Interfaces:**
- Consumes: `fieldClassName` (Task 72).
- Produces: `Select(props: ComponentProps<"select">)`.

- [ ] **Step 1: Write**

```tsx
// src/components/ui/select.tsx
import type { ComponentProps } from "react";
import { ChevronDown } from "lucide-react";
import { fieldClassName } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function Select({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <div className="relative">
      <select data-slot="select" className={cn(fieldClassName, "h-9 appearance-none pr-8", className)} {...props}>
        {children}
      </select>
      <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-ink-muted" />
    </div>
  );
}
```

- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `feat/ui-select`.

### Task 74: Badge primitive and status tokens

PR: `feat(ui): add badge with status tones`

**Files:**
- Create: `src/components/ui/badge.tsx`
- Modify: `src/app/theme.css`, `src/app/globals.css`

**Interfaces:**
- Produces: `Badge({ tone = "neutral", className, ...props }: ComponentProps<"span"> & { readonly tone?: BadgeTone })`, `type BadgeTone = "neutral" | "success" | "warning" | "danger" | "info"`; Tailwind colors `warning`, `info`.

- [ ] **Step 1:** Add tokens — `:root`: `--design-warning: #b45309; --design-info: #2563eb;` — `.dark`: `--design-warning: #fbbf24; --design-info: #60a5fa;` — and in `@theme inline`: `--color-warning: var(--design-warning); --color-info: var(--design-info);`. `node --test src/app/theme.test.ts` passes.
- [ ] **Step 2: Write**

```tsx
// src/components/ui/badge.tsx
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const TONES = {
  neutral: "border-border bg-surface-muted text-ink-secondary",
  success: "border-success/30 bg-success/10 text-success",
  warning: "border-warning/30 bg-warning/10 text-warning",
  danger: "border-destructive/30 bg-destructive/10 text-destructive",
  info: "border-info/30 bg-info/10 text-info",
} as const;

export type BadgeTone = keyof typeof TONES;

export function Badge({ tone = "neutral", className, ...props }: ComponentProps<"span"> & { readonly tone?: BadgeTone }) {
  return (
    <span
      data-slot="badge"
      className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap", TONES[tone], className)}
      {...props}
    />
  );
}
```

- [ ] **Step 3: Verify** — `npm run check` passes.
- [ ] **Step 4: Commit and open PR** on branch `feat/ui-badge`.

### Task 75: Dashboard content

PR: `feat(content): add dashboard demo data`

**Files:**
- Modify: `src/lib/types.ts`
- Create: `src/content/dashboard.ts`
- Modify: `src/content/content.test.ts`

**Interfaces:**
- Produces in `@/lib/types`:

```ts
export type Platform = "tiktok" | "youtube" | "instagram";
export type VideoStatus = "draft" | "scheduled" | "published" | "failed";

export interface Video {
  readonly id: string;
  readonly title: string;
  readonly platforms: readonly Platform[];
  readonly status: VideoStatus;
  /** ISO 8601 in UTC; null for drafts. */
  readonly scheduledAt: string | null;
  readonly views: number;
}

export interface Stat {
  readonly label: string;
  readonly value: string;
  readonly change: string;
  readonly trend: "up" | "down" | "flat";
}

export interface ActivityItem {
  readonly id: string;
  readonly message: string;
  /** ISO 8601 in UTC. */
  readonly at: string;
}

export interface PlatformOption {
  readonly id: Platform;
  readonly label: string;
}

export interface DashboardUser {
  readonly name: string;
  readonly email: string;
}
```

- Produces in `@/content/dashboard`: `STATS: readonly Stat[]` (4), `ACTIVITY: readonly ActivityItem[]` (5), `VIDEOS: readonly Video[]` (10, at least two drafts with `scheduledAt: null`, one `failed`), `PLATFORMS: readonly PlatformOption[]` (TikTok, YouTube, Instagram), `USER: DashboardUser` (`Alex Doe`, `alex@example.com`).

- [ ] **Step 1: Write the failing test** — append to `content.test.ts`:

```ts
import { PLATFORMS, VIDEOS } from "./dashboard.ts";

test("video ids are unique and platforms are known", () => {
  const ids = VIDEOS.map((video) => video.id);
  deepStrictEqual(ids, [...new Set(ids)]);
  const known = new Set(PLATFORMS.map((platform) => platform.id));
  deepStrictEqual(VIDEOS.flatMap((video) => video.platforms.filter((p) => !known.has(p))), []);
});

test("only drafts have no schedule time, and schedule times parse", () => {
  deepStrictEqual(VIDEOS.filter((v) => (v.scheduledAt === null) !== (v.status === "draft")).map((v) => v.id), []);
  deepStrictEqual(VIDEOS.filter((v) => v.scheduledAt !== null && Number.isNaN(Date.parse(v.scheduledAt))).map((v) => v.id), []);
});
```

- [ ] **Step 2: Run** → FAIL, cannot find `dashboard.ts`.
- [ ] **Step 3: Write the content** with invented titles ("Behind the scenes: studio tour", …) and UTC timestamps in 2026.
- [ ] **Step 4: Run** → PASS; `npm run check` passes.
- [ ] **Step 5: Commit and open PR** on branch `feat/content-dashboard`.

### Task 76: Active nav helper and app sidebar

PR: `feat(dashboard): add app sidebar`

**Files:**
- Create: `src/lib/nav.ts`, `src/lib/nav.test.ts`, `src/components/layout/app-sidebar.tsx`

**Interfaces:**
- Produces: `activeHref(pathname: string, hrefs: readonly string[]): string | null` — the longest href equal to `pathname` or a prefix of it followed by `/`.
- Produces: `AppSidebar({ name, logo, items, collapsed, onToggle, onNavigate, className })` with `items: readonly DashboardNavItem[]`, `onToggle?: () => void` (hidden when absent), `onNavigate?: () => void`.

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/nav.test.ts
import { strictEqual } from "node:assert";
import { test } from "node:test";

import { activeHref } from "./nav.ts";

const hrefs = ["/app", "/app/videos", "/app/videos/new", "/app/settings"];

test("picks the most specific matching href", () => {
  strictEqual(activeHref("/app", hrefs), "/app");
  strictEqual(activeHref("/app/videos", hrefs), "/app/videos");
  strictEqual(activeHref("/app/videos/new", hrefs), "/app/videos/new");
  strictEqual(activeHref("/app/videos/123", hrefs), "/app/videos");
});

test("does not match on a shared prefix that is not a path segment", () => {
  strictEqual(activeHref("/app/videosx", hrefs), "/app");
  strictEqual(activeHref("/application", hrefs), null);
});
```

- [ ] **Step 2: Run** → FAIL, module not found.
- [ ] **Step 3: Implement**

```ts
// src/lib/nav.ts
export function activeHref(pathname: string, hrefs: readonly string[]): string | null {
  const matches = hrefs.filter((href) => pathname === href || pathname.startsWith(`${href}/`));
  return matches.reduce<string | null>((best, href) => (best === null || href.length > best.length ? href : best), null);
}
```

- [ ] **Step 4: Write the sidebar**

```tsx
// src/components/layout/app-sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, PanelLeftClose, PanelLeftOpen, Plus, Settings, Video, type LucideIcon } from "lucide-react";
import { SiteLogo } from "@/components/layout/site-logo";
import { activeHref } from "@/lib/nav";
import type { DashboardIconName, DashboardNavItem, SiteConfig } from "@/lib/types";
import { cn } from "@/lib/utils";

const ICONS: Record<DashboardIconName, LucideIcon> = { home: House, video: Video, plus: Plus, settings: Settings };

interface AppSidebarProps {
  readonly name: string;
  readonly logo: SiteConfig["logo"];
  readonly items: readonly DashboardNavItem[];
  readonly collapsed: boolean;
  readonly onToggle?: () => void;
  readonly onNavigate?: () => void;
  readonly className?: string;
}

export function AppSidebar({ name, logo, items, collapsed, onToggle, onNavigate, className }: AppSidebarProps) {
  const pathname = usePathname();
  const active = activeHref(pathname, items.map((item) => item.href));
  const ToggleIcon = collapsed ? PanelLeftOpen : PanelLeftClose;

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-border bg-surface transition-[width] duration-200",
        collapsed ? "w-16" : "w-60",
        className,
      )}
    >
      <div className="flex h-14 items-center justify-between gap-2 px-3">
        <Link href="/app" onClick={onNavigate} className="min-w-0">
          <SiteLogo name={name} logo={logo} size={28} showName={!collapsed} />
        </Link>
        {onToggle && !collapsed && (
          <button type="button" onClick={onToggle} aria-label="Collapse sidebar" className="rounded-md p-1.5 text-ink-muted hover:bg-accent hover:text-ink">
            <ToggleIcon aria-hidden className="size-4" />
          </button>
        )}
      </div>
      <nav aria-label="Dashboard" className="flex-1 space-y-1 px-2 py-2">
        {items.map((item) => {
          const Icon = ICONS[item.icon];
          const isActive = item.href === active;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex h-9 items-center gap-3 rounded-[var(--design-radius-md)] px-3 text-sm transition-colors",
                isActive ? "bg-accent font-medium text-ink" : "text-ink-secondary hover:bg-accent/60 hover:text-ink",
                collapsed && "justify-center px-0",
              )}
            >
              <Icon aria-hidden className="size-4 shrink-0" strokeWidth={1.75} />
              <span className={cn(collapsed && "sr-only")}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      {onToggle && collapsed && (
        <button type="button" onClick={onToggle} aria-label="Expand sidebar" className="m-2 flex h-9 items-center justify-center rounded-md text-ink-muted hover:bg-accent hover:text-ink">
          <ToggleIcon aria-hidden className="size-4" />
        </button>
      )}
    </aside>
  );
}
```

- [ ] **Step 5: Run** — `node --test src/lib/nav.test.ts` passes; `npm run check` passes.
- [ ] **Step 6: Commit and open PR** on branch `feat/app-sidebar`.

### Task 77: App top bar

PR: `feat(dashboard): add app top bar`

**Files:**
- Create: `src/components/layout/app-topbar.tsx`

**Interfaces:**
- Consumes: `ThemeToggle` (Task 69), `Input` (Task 72), `DashboardUser` (Task 75).
- Produces: `AppTopbar({ user, onMenu, searchAction = "/app/videos" }: { readonly user: DashboardUser; readonly onMenu: () => void; readonly searchAction?: string })`.

- [ ] **Step 1: Write**

```tsx
// src/components/layout/app-topbar.tsx
"use client";

import Link from "next/link";
import { Menu } from "@base-ui/react/menu";
import { LogOut, Menu as MenuIcon, Search, Settings } from "lucide-react";
import { ThemeToggle } from "@/components/blocks/theme-toggle";
import { Input } from "@/components/ui/input";
import type { DashboardUser } from "@/lib/types";

interface AppTopbarProps {
  readonly user: DashboardUser;
  readonly onMenu: () => void;
  readonly searchAction?: string;
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();

export function AppTopbar({ user, onMenu, searchAction = "/app/videos" }: AppTopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-canvas/80 px-4 backdrop-blur md:px-8">
      <button type="button" onClick={onMenu} aria-label="Open navigation" className="rounded-md p-2 text-ink-secondary hover:bg-accent md:hidden">
        <MenuIcon aria-hidden className="size-5" />
      </button>
      <form action={searchAction} role="search" className="relative max-w-sm flex-1">
        <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-muted" />
        <Input type="search" name="q" placeholder="Search…" aria-label="Search" className="pl-9" />
      </form>
      <div className="ml-auto flex items-center gap-1">
        <ThemeToggle />
        <Menu.Root>
          <Menu.Trigger aria-label="Account" className="flex size-9 items-center justify-center rounded-full bg-ink text-xs font-semibold text-canvas">
            {initials(user.name)}
          </Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner sideOffset={8} align="end" className="z-[60]">
              <Menu.Popup className="min-w-52 rounded-[12px] border border-border bg-popover p-1 text-sm text-popover-foreground shadow-[var(--design-shadow-floating)]">
                <div className="px-2 py-1.5">
                  <p className="font-medium text-ink">{user.name}</p>
                  <p className="text-xs text-ink-muted">{user.email}</p>
                </div>
                <Menu.Separator className="my-1 h-px bg-border" />
                <Menu.Item render={<Link href="/app/settings" />} className="flex items-center gap-2 rounded-[8px] px-2 py-1.5 outline-none data-[highlighted]:bg-accent">
                  <Settings aria-hidden className="size-4" /> Settings
                </Menu.Item>
                <Menu.Item render={<Link href="/login" />} className="flex items-center gap-2 rounded-[8px] px-2 py-1.5 outline-none data-[highlighted]:bg-accent">
                  <LogOut aria-hidden className="size-4" /> Log out
                </Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      </div>
    </header>
  );
}
```

Confirm `Menu.Item`'s `render` prop and `Menu.Separator` in `node_modules/@base-ui/react/menu` types; if `render` is not supported, wrap the `Link` inside `Menu.Item` and close the menu via `Menu.Root`'s `open`/`onOpenChange`.

- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `feat/app-topbar`.

### Task 78: Stat card

PR: `feat(dashboard): add stat card`

**Files:**
- Create: `src/components/blocks/stat-card.tsx`

**Interfaces:**
- Produces: `StatCard({ stat }: { readonly stat: Stat })`.

- [ ] **Step 1: Write**

```tsx
// src/components/blocks/stat-card.tsx
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Stat } from "@/lib/types";
import { cn } from "@/lib/utils";

const TREND = {
  up: { Icon: ArrowUpRight, className: "text-success" },
  down: { Icon: ArrowDownRight, className: "text-destructive" },
  flat: { Icon: ArrowRight, className: "text-ink-muted" },
} as const;

export function StatCard({ stat }: { readonly stat: Stat }) {
  const { Icon, className } = TREND[stat.trend];
  return (
    <div className="rounded-[var(--design-radius-lg)] border border-border bg-surface p-5 shadow-[var(--design-shadow-card)]">
      <p className="text-sm text-ink-muted">{stat.label}</p>
      <p className="mt-2 font-display text-3xl tracking-[-0.03em] text-ink tabular-nums">{stat.value}</p>
      <p className={cn("mt-2 flex items-center gap-1 text-xs font-medium", className)}>
        <Icon aria-hidden className="size-3.5" />
        {stat.change}
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `feat/stat-card`.

### Task 79: Date formatting and activity list

PR: `feat(dashboard): add activity list`

**Files:**
- Create: `src/lib/format.ts`, `src/lib/format.test.ts`, `src/components/blocks/activity-list.tsx`

**Interfaces:**
- Produces: `formatDateTime(iso: string | null): string` (UTC, `"Mar 4, 2026, 14:05 UTC"`, `"—"` for null or unparsable), `formatBytes(bytes: number): string` (`"0 B"`, `"1.5 KB"`, `"12.0 MB"`), `formatNumber(value: number): string` (`"12,400"`).
- Produces: `ActivityList({ title = "Recent activity", items }: { readonly title?: string; readonly items: readonly ActivityItem[] })`.

Dates are formatted in UTC so server and browser render the same string (no hydration mismatch).

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/format.test.ts
import { strictEqual } from "node:assert";
import { test } from "node:test";

import { formatBytes, formatDateTime, formatNumber } from "./format.ts";

test("formatDateTime renders UTC and tolerates missing values", () => {
  strictEqual(formatDateTime("2026-03-04T14:05:00Z"), "Mar 4, 2026, 14:05 UTC");
  strictEqual(formatDateTime(null), "—");
  strictEqual(formatDateTime("not a date"), "—");
});

test("formatBytes picks a readable unit", () => {
  strictEqual(formatBytes(0), "0 B");
  strictEqual(formatBytes(1536), "1.5 KB");
  strictEqual(formatBytes(12 * 1024 * 1024), "12.0 MB");
});

test("formatNumber groups thousands", () => {
  strictEqual(formatNumber(12400), "12,400");
});
```

- [ ] **Step 2: Run** → FAIL, module not found.
- [ ] **Step 3: Implement**

```ts
// src/lib/format.ts
const DATE_TIME = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZone: "UTC",
});

export function formatDateTime(iso: string | null): string {
  if (iso === null) return "—";
  const time = Date.parse(iso);
  return Number.isNaN(time) ? "—" : `${DATE_TIME.format(time)} UTC`;
}

const UNITS = ["B", "KB", "MB", "GB"] as const;

export function formatBytes(bytes: number): string {
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < UNITS.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return unit === 0 ? `${value} B` : `${value.toFixed(1)} ${UNITS[unit]}`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
}
```

Run the test; if `DATE_TIME.format` yields `"Mar 4, 2026, 14:05"` with a different separator on Node 24, adjust the expected string in the test to the actual Intl output and keep the `UTC` suffix.

- [ ] **Step 4: Write the list**

```tsx
// src/components/blocks/activity-list.tsx
import { formatDateTime } from "@/lib/format";
import type { ActivityItem } from "@/lib/types";

export function ActivityList({ title = "Recent activity", items }: { readonly title?: string; readonly items: readonly ActivityItem[] }) {
  return (
    <section className="rounded-[var(--design-radius-lg)] border border-border bg-surface p-5">
      <h2 className="text-sm font-medium text-ink">{title}</h2>
      {items.length === 0 ? (
        <p className="mt-4 text-sm text-ink-muted">Nothing yet.</p>
      ) : (
        <ol className="mt-4 space-y-4">
          {items.map((item) => (
            <li key={item.id} className="flex gap-3 text-sm">
              <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-ink-muted" />
              <div>
                <p className="text-ink">{item.message}</p>
                <time dateTime={item.at} className="text-xs text-ink-muted">
                  {formatDateTime(item.at)}
                </time>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
```

- [ ] **Step 5: Run** — tests pass; `npm run check` passes.
- [ ] **Step 6: Commit and open PR** on branch `feat/activity-list`.

### Task 80: Dashboard layout and overview page

PR: `feat(dashboard): add dashboard layout and overview`

**Files:**
- Create: `src/components/layout/app-shell.tsx`, `src/app/(dashboard)/app/layout.tsx`, `src/app/(dashboard)/app/page.tsx`
- Modify: `src/site.config.ts` (first `dashboardNav` item)

**Interfaces:**
- Produces: `AppShell({ name, logo, nav, user, children })` — client component owning `collapsed` and `mobileOpen` state; desktop sidebar `hidden md:flex`, mobile sidebar inside a Base UI `Dialog` drawer.

- [ ] **Step 1: Write the shell**

```tsx
// src/components/layout/app-shell.tsx
"use client";

import { useState, type ReactNode } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppTopbar } from "@/components/layout/app-topbar";
import type { DashboardNavItem, DashboardUser, SiteConfig } from "@/lib/types";

interface AppShellProps {
  readonly name: string;
  readonly logo: SiteConfig["logo"];
  readonly nav: readonly DashboardNavItem[];
  readonly user: DashboardUser;
  readonly children: ReactNode;
}

export function AppShell({ name, logo, nav, user, children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-canvas text-ink">
      <div className="sticky top-0 hidden h-screen md:flex">
        <AppSidebar name={name} logo={logo} items={nav} collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      </div>
      <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-40 bg-ink/40 md:hidden" />
          <Dialog.Popup className="fixed inset-y-0 left-0 z-50 md:hidden">
            <Dialog.Title className="sr-only">Navigation</Dialog.Title>
            <AppSidebar name={name} logo={logo} items={nav} collapsed={false} onNavigate={() => setMobileOpen(false)} />
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopbar user={user} onMenu={() => setMobileOpen(true)} />
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Write the layout and page**

```tsx
// src/app/(dashboard)/app/layout.tsx
import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { USER } from "@/content/dashboard";
import { site } from "@/site.config";

export const metadata: Metadata = { title: { default: "Dashboard", template: `%s · Dashboard | ${site.name}` } };

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AppShell name={site.name} logo={site.logo} nav={site.dashboardNav} user={USER}>
      {children}
    </AppShell>
  );
}
```

```tsx
// src/app/(dashboard)/app/page.tsx
import { ActivityList } from "@/components/blocks/activity-list";
import { StatCard } from "@/components/blocks/stat-card";
import { ACTIVITY, STATS, USER } from "@/content/dashboard";

export default function OverviewPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <h1 className="font-display text-2xl tracking-[-0.03em]">Welcome back, {USER.name.split(" ")[0]}</h1>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>
      <ActivityList items={ACTIVITY} />
    </div>
  );
}
```

- [ ] **Step 3:** Set `dashboardNav: [{ label: "Overview", href: "/app", icon: "home" }]` in `src/site.config.ts`.
- [ ] **Step 4: Verify** — `node --test src/content/content.test.ts` passes (the `/app` link now resolves); `npm run dev`: `/app` shows the sidebar on desktop, a drawer from the menu button below 768px, both themes readable; `/login` → submit lands on `/app`. `npm run check` passes.
- [ ] **Step 5: Commit and open PR** on branch `feat/dashboard-overview`.

### Task 81: Table helpers

PR: `feat(dashboard): add table sort and filter helpers`

**Files:**
- Create: `src/lib/table.ts`, `src/lib/table.test.ts`

**Interfaces:**
- Produces:

```ts
export type CellValue = string | number | null | readonly string[];
export type TableRow = { readonly id: string } & Readonly<Record<string, CellValue>>;
export type SortDirection = "asc" | "desc";
export interface SortState { readonly key: string; readonly direction: SortDirection }
export function nextSort(current: SortState | null, key: string): SortState | null;
export function sortRows<T extends TableRow>(rows: readonly T[], sort: SortState | null): T[];
export function filterRows<T extends TableRow>(rows: readonly T[], query: string, keys: readonly string[]): T[];
export function filterByValue<T extends TableRow>(rows: readonly T[], key: string, value: string | null): T[];
```

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/table.test.ts
import { deepStrictEqual } from "node:assert";
import { test } from "node:test";

import { filterByValue, filterRows, nextSort, sortRows, type TableRow } from "./table.ts";

const rows: TableRow[] = [
  { id: "a", title: "Studio tour", views: 900, at: "2026-03-02T10:00:00Z", status: "published", platforms: ["youtube"] },
  { id: "b", title: "Q&A", views: 12000, at: null, status: "draft", platforms: [] },
  { id: "c", title: "studio lights", views: 900, at: "2026-01-15T08:00:00Z", status: "scheduled", platforms: ["tiktok", "youtube"] },
  { id: "d", title: "Bloopers 10", views: 50, at: "", status: "failed", platforms: ["tiktok"] },
];

const ids = (list: readonly TableRow[]) => list.map((row) => row.id);

test("nextSort cycles asc, desc, off, and restarts on a new column", () => {
  deepStrictEqual(nextSort(null, "views"), { key: "views", direction: "asc" });
  deepStrictEqual(nextSort({ key: "views", direction: "asc" }, "views"), { key: "views", direction: "desc" });
  deepStrictEqual(nextSort({ key: "views", direction: "desc" }, "views"), null);
  deepStrictEqual(nextSort({ key: "views", direction: "desc" }, "title"), { key: "title", direction: "asc" });
});

test("numbers sort numerically and ties keep input order", () => {
  deepStrictEqual(ids(sortRows(rows, { key: "views", direction: "asc" })), ["d", "a", "c", "b"]);
  deepStrictEqual(ids(sortRows(rows, { key: "views", direction: "desc" })), ["b", "a", "c", "d"]);
});

test("empty values sort last in both directions", () => {
  deepStrictEqual(ids(sortRows(rows, { key: "at", direction: "asc" })), ["c", "a", "b", "d"]);
  deepStrictEqual(ids(sortRows(rows, { key: "at", direction: "desc" })), ["a", "c", "b", "d"]);
});

test("text sorts case-insensitively with numeric awareness, and a missing key does not throw", () => {
  deepStrictEqual(ids(sortRows(rows, { key: "title", direction: "asc" })), ["d", "b", "a", "c"]);
  deepStrictEqual(ids(sortRows(rows, { key: "nope", direction: "asc" })), ["a", "b", "c", "d"]);
  deepStrictEqual(ids(sortRows(rows, null)), ["a", "b", "c", "d"]);
});

test("filterRows matches any key case-insensitively, including list cells", () => {
  deepStrictEqual(ids(filterRows(rows, "  STUDIO ", ["title"])), ["a", "c"]);
  deepStrictEqual(ids(filterRows(rows, "tiktok", ["title", "platforms"])), ["c", "d"]);
  deepStrictEqual(ids(filterRows(rows, "   ", ["title"])), ["a", "b", "c", "d"]);
});

test("filterByValue matches exact values and list membership", () => {
  deepStrictEqual(ids(filterByValue(rows, "status", "draft")), ["b"]);
  deepStrictEqual(ids(filterByValue(rows, "platforms", "youtube")), ["a", "c"]);
  deepStrictEqual(ids(filterByValue(rows, "status", null)), ["a", "b", "c", "d"]);
});
```

- [ ] **Step 2: Run** → FAIL, module not found.
- [ ] **Step 3: Implement**

```ts
// src/lib/table.ts
export type CellValue = string | number | null | readonly string[];
export type TableRow = { readonly id: string } & Readonly<Record<string, CellValue>>;
export type SortDirection = "asc" | "desc";

export interface SortState {
  readonly key: string;
  readonly direction: SortDirection;
}

export function nextSort(current: SortState | null, key: string): SortState | null {
  if (current?.key !== key) return { key, direction: "asc" };
  return current.direction === "asc" ? { key, direction: "desc" } : null;
}

const isEmpty = (value: CellValue | undefined) =>
  value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0);

const asText = (value: CellValue | undefined) => (Array.isArray(value) ? value.join(", ") : String(value ?? ""));

function compare(a: CellValue | undefined, b: CellValue | undefined): number {
  if (typeof a === "number" && typeof b === "number") return a - b;
  return asText(a).localeCompare(asText(b), "en", { numeric: true, sensitivity: "base" });
}

/** Stable sort; empty cells go last whatever the direction. */
export function sortRows<T extends TableRow>(rows: readonly T[], sort: SortState | null): T[] {
  if (!sort) return [...rows];
  const factor = sort.direction === "asc" ? 1 : -1;
  return rows
    .map((row, index) => ({ row, index }))
    .sort((x, y) => {
      const a = x.row[sort.key];
      const b = y.row[sort.key];
      const aEmpty = isEmpty(a);
      const bEmpty = isEmpty(b);
      if (aEmpty || bEmpty) return aEmpty === bEmpty ? x.index - y.index : aEmpty ? 1 : -1;
      return compare(a, b) * factor || x.index - y.index;
    })
    .map(({ row }) => row);
}

export function filterRows<T extends TableRow>(rows: readonly T[], query: string, keys: readonly string[]): T[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return [...rows];
  return rows.filter((row) => keys.some((key) => asText(row[key]).toLowerCase().includes(needle)));
}

export function filterByValue<T extends TableRow>(rows: readonly T[], key: string, value: string | null): T[] {
  if (value === null) return [...rows];
  return rows.filter((row) => {
    const cell = row[key];
    return Array.isArray(cell) ? cell.includes(value) : String(cell ?? "") === value;
  });
}
```

ISO timestamps sort correctly as text because they share one format and time zone.

- [ ] **Step 4: Run** → PASS; `npm run check` passes.
- [ ] **Step 5: Commit and open PR** on branch `feat/table-helpers`.

### Task 82: Data table block

PR: `feat(dashboard): add data table`

**Files:**
- Create: `src/components/blocks/data-table.tsx`

**Interfaces:**
- Consumes: Task 81 helpers, `Badge`/`BadgeTone` (Task 74), `Input` (Task 72), `Select` (Task 73), `formatDateTime`/`formatNumber` (Task 79).
- Produces:

```ts
export type ColumnKind = "text" | "number" | "date" | "badge" | "tags";
export interface DataTableColumn {
  readonly key: string;
  readonly header: string;
  readonly kind: ColumnKind;
  readonly sortable?: boolean;
  /** Display labels for raw values, e.g. { tiktok: "TikTok" }. */
  readonly labels?: Readonly<Record<string, string>>;
}
export interface DataTableFilter {
  readonly key: string;
  readonly label: string;
  readonly options: readonly { readonly value: string; readonly label: string }[];
}
export interface DataTableAction {
  readonly label: string;
  /** `{id}` is replaced with the row id. */
  readonly href: string;
}
export function DataTable<T extends TableRow>(props: {
  readonly rows: readonly T[];
  readonly columns: readonly DataTableColumn[];
  readonly searchKeys: readonly string[];
  readonly searchPlaceholder: string;
  readonly filter?: DataTableFilter;
  readonly actions?: readonly DataTableAction[];
  readonly badgeTones?: Readonly<Record<string, BadgeTone>>;
  readonly emptyMessage: string;
  readonly initialQuery?: string;
}): JSX.Element;
```

All props are serializable so a server page can render it.

- [ ] **Step 1: Write**

```tsx
// src/components/blocks/data-table.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Menu } from "@base-ui/react/menu";
import { ArrowDown, ArrowUp, ArrowUpDown, Ellipsis } from "lucide-react";
import { Badge, type BadgeTone } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { formatDateTime, formatNumber } from "@/lib/format";
import { filterByValue, filterRows, nextSort, sortRows, type CellValue, type SortState, type TableRow } from "@/lib/table";
import { cn } from "@/lib/utils";

export type ColumnKind = "text" | "number" | "date" | "badge" | "tags";

export interface DataTableColumn {
  readonly key: string;
  readonly header: string;
  readonly kind: ColumnKind;
  readonly sortable?: boolean;
  readonly labels?: Readonly<Record<string, string>>;
}

export interface DataTableFilter {
  readonly key: string;
  readonly label: string;
  readonly options: readonly { readonly value: string; readonly label: string }[];
}

export interface DataTableAction {
  readonly label: string;
  readonly href: string;
}

interface DataTableProps<T extends TableRow> {
  readonly rows: readonly T[];
  readonly columns: readonly DataTableColumn[];
  readonly searchKeys: readonly string[];
  readonly searchPlaceholder: string;
  readonly filter?: DataTableFilter;
  readonly actions?: readonly DataTableAction[];
  readonly badgeTones?: Readonly<Record<string, BadgeTone>>;
  readonly emptyMessage: string;
  readonly initialQuery?: string;
}

function Cell({ column, value, tones }: { readonly column: DataTableColumn; readonly value: CellValue | undefined; readonly tones?: Readonly<Record<string, BadgeTone>> }) {
  const label = (raw: string) => column.labels?.[raw] ?? raw;
  if (value === undefined || value === null || value === "") return <span className="text-ink-muted">—</span>;
  switch (column.kind) {
    case "number":
      return <span className="tabular-nums">{typeof value === "number" ? formatNumber(value) : String(value)}</span>;
    case "date":
      return <span className="whitespace-nowrap text-ink-secondary">{formatDateTime(String(value))}</span>;
    case "badge":
      return <Badge tone={tones?.[String(value)] ?? "neutral"}>{label(String(value))}</Badge>;
    case "tags":
      return (
        <span className="flex flex-wrap gap-1">
          {(Array.isArray(value) ? value : [String(value)]).map((tag) => (
            <Badge key={tag}>{label(tag)}</Badge>
          ))}
        </span>
      );
    default:
      return <span>{Array.isArray(value) ? value.map(label).join(", ") : label(String(value))}</span>;
  }
}

function SortIcon({ active }: { readonly active: SortState | null }) {
  if (!active) return <ArrowUpDown aria-hidden className="size-3.5 text-ink-muted" />;
  return active.direction === "asc" ? <ArrowUp aria-hidden className="size-3.5" /> : <ArrowDown aria-hidden className="size-3.5" />;
}

export function DataTable<T extends TableRow>({
  rows,
  columns,
  searchKeys,
  searchPlaceholder,
  filter,
  actions = [],
  badgeTones,
  emptyMessage,
  initialQuery = "",
}: DataTableProps<T>) {
  const [query, setQuery] = useState(initialQuery);
  const [filterValue, setFilterValue] = useState<string | null>(null);
  const [sort, setSort] = useState<SortState | null>(null);

  const visible = useMemo(() => {
    const searched = filterRows(rows, query, searchKeys);
    const filtered = filter ? filterByValue(searched, filter.key, filterValue) : searched;
    return sortRows(filtered, sort);
  }, [rows, query, searchKeys, filter, filterValue, sort]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={searchPlaceholder} aria-label={searchPlaceholder} className="sm:max-w-xs" />
        {filter && (
          <Select aria-label={filter.label} value={filterValue ?? ""} onChange={(event) => setFilterValue(event.target.value || null)} className="sm:w-44">
            <option value="">All {filter.label.toLowerCase()}</option>
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        )}
        <p className="text-sm text-ink-muted sm:ml-auto" aria-live="polite">
          {visible.length} of {rows.length}
        </p>
      </div>
      <div className="overflow-x-auto rounded-[var(--design-radius-lg)] border border-border bg-surface">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-surface-subtle text-xs text-ink-muted">
            <tr>
              {columns.map((column) => {
                const active = sort?.key === column.key ? sort : null;
                return (
                  <th
                    key={column.key}
                    scope="col"
                    aria-sort={active ? (active.direction === "asc" ? "ascending" : "descending") : undefined}
                    className={cn("px-4 py-3 font-medium", column.kind === "number" && "text-right")}
                  >
                    {column.sortable ? (
                      <button type="button" onClick={() => setSort(nextSort(sort, column.key))} className="inline-flex items-center gap-1 hover:text-ink">
                        {column.header}
                        <SortIcon active={active} />
                      </button>
                    ) : (
                      column.header
                    )}
                  </th>
                );
              })}
              {actions.length > 0 && (
                <th scope="col" className="w-12 px-4 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions.length > 0 ? 1 : 0)} className="px-4 py-10 text-center text-ink-muted">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              visible.map((row) => (
                <tr key={row.id} className="border-b border-border last:border-0 hover:bg-surface-subtle">
                  {columns.map((column) => (
                    <td key={column.key} className={cn("px-4 py-3 text-ink", column.kind === "number" && "text-right")}>
                      <Cell column={column} value={row[column.key]} tones={badgeTones} />
                    </td>
                  ))}
                  {actions.length > 0 && (
                    <td className="px-4 py-3 text-right">
                      <Menu.Root>
                        <Menu.Trigger aria-label="Row actions" className="rounded-md p-1.5 text-ink-muted hover:bg-accent hover:text-ink">
                          <Ellipsis aria-hidden className="size-4" />
                        </Menu.Trigger>
                        <Menu.Portal>
                          <Menu.Positioner sideOffset={4} align="end" className="z-[60]">
                            <Menu.Popup className="min-w-36 rounded-[12px] border border-border bg-popover p-1 text-sm shadow-[var(--design-shadow-floating)]">
                              {actions.map((action) => (
                                <Menu.Item
                                  key={action.label}
                                  render={<Link href={action.href.replace("{id}", encodeURIComponent(row.id))} />}
                                  className="flex rounded-[8px] px-2 py-1.5 outline-none data-[highlighted]:bg-accent"
                                >
                                  {action.label}
                                </Menu.Item>
                              ))}
                            </Menu.Popup>
                          </Menu.Positioner>
                        </Menu.Portal>
                      </Menu.Root>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `feat/data-table`.

### Task 83: Videos page

PR: `feat(dashboard): add videos page`

**Files:**
- Create: `src/app/(dashboard)/app/videos/page.tsx`
- Modify: `src/site.config.ts` (add Videos nav item)

- [ ] **Step 1: Write**

```tsx
// src/app/(dashboard)/app/videos/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/blocks/data-table";
import { buttonVariants } from "@/components/ui/button";
import { PLATFORMS, VIDEOS } from "@/content/dashboard";

export const metadata: Metadata = { title: "Videos" };

const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "scheduled", label: "Scheduled" },
  { value: "published", label: "Published" },
  { value: "failed", label: "Failed" },
] as const;

interface VideosPageProps {
  readonly searchParams: Promise<Readonly<Record<string, string | string[] | undefined>>>;
}

export default async function VideosPage({ searchParams }: VideosPageProps) {
  const { q } = await searchParams;
  const rows = VIDEOS.map((video) => ({ ...video }));

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-2xl tracking-[-0.03em]">Videos</h1>
        <Link href="/app/videos/new" className={buttonVariants()}>
          <Plus aria-hidden /> New video
        </Link>
      </div>
      <DataTable
        rows={rows}
        columns={[
          { key: "title", header: "Title", kind: "text", sortable: true },
          { key: "platforms", header: "Platforms", kind: "tags", labels: Object.fromEntries(PLATFORMS.map((p) => [p.id, p.label])) },
          { key: "status", header: "Status", kind: "badge", sortable: true, labels: Object.fromEntries(STATUS_OPTIONS.map((s) => [s.value, s.label])) },
          { key: "scheduledAt", header: "Scheduled", kind: "date", sortable: true },
          { key: "views", header: "Views", kind: "number", sortable: true },
        ]}
        searchKeys={["title"]}
        searchPlaceholder="Search videos"
        filter={{ key: "status", label: "Statuses", options: STATUS_OPTIONS }}
        actions={[{ label: "Edit", href: "/app/videos/new?from={id}" }]}
        badgeTones={{ draft: "neutral", scheduled: "info", published: "success", failed: "danger" }}
        emptyMessage="No videos match your search."
        initialQuery={typeof q === "string" ? q : ""}
      />
    </div>
  );
}
```

If TypeScript rejects `Video` objects as `TableRow` (index signature), map explicitly: `{ id, title, platforms, status, scheduledAt, views }`.

- [ ] **Step 2:** Append `{ label: "Videos", href: "/app/videos", icon: "video" }` to `dashboardNav`.
- [ ] **Step 3: Verify** — content tests pass; `/app/videos` sorts by each sortable column (asc, desc, off), filters by status, searches by title, the top-bar search lands here pre-filled, empty search result shows the empty message. `npm run check` passes.
- [ ] **Step 4: Commit and open PR** on branch `feat/videos-page`.

### Task 84: Upload dropzone

PR: `feat(dashboard): add upload dropzone`

**Files:**
- Create: `src/components/blocks/upload-dropzone.tsx`

**Interfaces:**
- Produces: `UploadDropzone({ name, accept, hint, multiple = true }: { readonly name: string; readonly accept: string; readonly hint: string; readonly multiple?: boolean })` — keeps chosen files in state, mirrors them into the hidden `<input type="file" name={name}>` via `DataTransfer` so a surrounding form sees them, lists each with `formatBytes`, and lets the user remove one.

- [ ] **Step 1: Write**

```tsx
// src/components/blocks/upload-dropzone.tsx
"use client";

import { useRef, useState, type DragEvent } from "react";
import { Upload, X } from "lucide-react";
import { formatBytes } from "@/lib/format";
import { cn } from "@/lib/utils";

interface UploadDropzoneProps {
  readonly name: string;
  readonly accept: string;
  readonly hint: string;
  readonly multiple?: boolean;
}

export function UploadDropzone({ name, accept, hint, multiple = true }: UploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<readonly File[]>([]);
  const [dragging, setDragging] = useState(false);

  const sync = (next: readonly File[]) => {
    setFiles(next);
    const transfer = new DataTransfer();
    next.forEach((file) => transfer.items.add(file));
    if (inputRef.current) inputRef.current.files = transfer.files;
  };

  const add = (list: FileList | null) => {
    if (!list) return;
    const accepted = Array.from(list).filter((file) => accept === "" || accept.split(",").some((rule) => matches(file, rule.trim())));
    sync(multiple ? [...files, ...accepted] : accepted.slice(0, 1));
  };

  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);
    add(event.dataTransfer.files);
  };

  return (
    <div className="space-y-3">
      <label
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[var(--design-radius-lg)] border border-dashed border-border bg-surface px-6 py-10 text-center transition-colors hover:bg-surface-subtle has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/40",
          dragging && "border-ink bg-surface-subtle",
        )}
      >
        <Upload aria-hidden className="size-6 text-ink-muted" />
        <span className="text-sm font-medium text-ink">Drop files here or browse</span>
        <span className="text-xs text-ink-muted">{hint}</span>
        <input ref={inputRef} type="file" name={name} accept={accept} multiple={multiple} className="sr-only" onChange={(event) => add(event.target.files)} />
      </label>
      {files.length > 0 && (
        <ul className="divide-y divide-border rounded-[var(--design-radius-md)] border border-border bg-surface text-sm">
          {files.map((file, index) => (
            <li key={`${file.name}-${index}`} className="flex items-center justify-between gap-3 px-3 py-2">
              <span className="truncate text-ink">{file.name}</span>
              <span className="flex items-center gap-2 text-xs text-ink-muted">
                {formatBytes(file.size)}
                <button type="button" aria-label={`Remove ${file.name}`} onClick={() => sync(files.filter((_, i) => i !== index))} className="rounded p-1 hover:bg-accent hover:text-ink">
                  <X aria-hidden className="size-3.5" />
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Same rule syntax as the `accept` attribute: ".mp4", "video/*" or "video/mp4". */
function matches(file: File, rule: string): boolean {
  if (rule.startsWith(".")) return file.name.toLowerCase().endsWith(rule.toLowerCase());
  if (rule.endsWith("/*")) return file.type.startsWith(rule.slice(0, -1));
  return file.type === rule;
}
```

Drag-and-drop bypasses the `accept` attribute, which is why `matches` re-checks dropped files.

- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `feat/upload-dropzone`.

### Task 85: Platform picker

PR: `feat(dashboard): add platform picker`

**Files:**
- Create: `src/components/blocks/platform-picker.tsx`

**Interfaces:**
- Produces: `PlatformPicker({ name, options, defaultValue = [] }: { readonly name: string; readonly options: readonly PlatformOption[]; readonly defaultValue?: readonly string[] })` — native checkboxes, so it works in a plain form and needs no client JS.

- [ ] **Step 1: Write**

```tsx
// src/components/blocks/platform-picker.tsx
import { Check } from "lucide-react";
import type { PlatformOption } from "@/lib/types";

interface PlatformPickerProps {
  readonly name: string;
  readonly options: readonly PlatformOption[];
  readonly defaultValue?: readonly string[];
}

export function PlatformPicker({ name, options, defaultValue = [] }: PlatformPickerProps) {
  return (
    <fieldset className="grid gap-2 sm:grid-cols-3">
      <legend className="sr-only">Platforms</legend>
      {options.map((option) => (
        <label
          key={option.id}
          className="flex cursor-pointer items-center justify-between rounded-[var(--design-radius-md)] border border-border bg-surface px-3 py-2.5 text-sm transition-colors hover:bg-surface-subtle has-[:checked]:border-ink has-[:checked]:bg-surface-subtle has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/40"
        >
          <span className="text-ink">{option.label}</span>
          <input type="checkbox" name={name} value={option.id} defaultChecked={defaultValue.includes(option.id)} className="peer sr-only" />
          <Check aria-hidden className="size-4 text-ink opacity-0 peer-checked:opacity-100" />
        </label>
      ))}
    </fieldset>
  );
}
```

- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `feat/platform-picker`.

### Task 86: Schedule field

PR: `feat(dashboard): add schedule field`

**Files:**
- Create: `src/components/blocks/schedule-field.tsx`

**Interfaces:**
- Produces: `ScheduleField({ name, defaultMode = "now" }: { readonly name: string; readonly defaultMode?: "now" | "later" })` — radio "Post now" / "Schedule"; the native `datetime-local` input is enabled and `required` only in "later" mode. Submits `${name}Mode` and `${name}`.

- [ ] **Step 1: Write**

```tsx
// src/components/blocks/schedule-field.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

interface ScheduleFieldProps {
  readonly name: string;
  readonly defaultMode?: "now" | "later";
}

const MODES = [
  { value: "now", label: "Post now" },
  { value: "later", label: "Schedule" },
] as const;

export function ScheduleField({ name, defaultMode = "now" }: ScheduleFieldProps) {
  const [mode, setMode] = useState<"now" | "later">(defaultMode);
  return (
    <fieldset className="space-y-3">
      <legend className="sr-only">When to post</legend>
      <div className="flex gap-2">
        {MODES.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-center gap-2 rounded-[var(--design-radius-md)] border border-border bg-surface px-3 py-2 text-sm has-[:checked]:border-ink has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/40"
          >
            <input type="radio" name={`${name}Mode`} value={option.value} checked={mode === option.value} onChange={() => setMode(option.value)} className="accent-current" />
            {option.label}
          </label>
        ))}
      </div>
      <Input type="datetime-local" name={name} aria-label="Publish date and time" disabled={mode === "now"} required={mode === "later"} className="sm:max-w-64" />
    </fieldset>
  );
}
```

- [ ] **Step 2: Verify** — `npm run check` passes.
- [ ] **Step 3: Commit and open PR** on branch `feat/schedule-field`.

### Task 87: New video page

PR: `feat(dashboard): add new video page`

**Files:**
- Create: `src/components/blocks/video-compose-form.tsx`, `src/app/(dashboard)/app/videos/new/page.tsx`
- Modify: `src/site.config.ts` (add New video nav item)

**Interfaces:**
- Produces: `VideoComposeForm({ platforms }: { readonly platforms: readonly PlatformOption[] })` — client form: title (`Input`, required), caption (`Textarea`), `UploadDropzone` (`name="media"`, `accept="video/*"`), `PlatformPicker`, `ScheduleField`; buttons "Save draft" (secondary) and "Publish" (primary). On submit it requires at least one platform (shows an inline error otherwise), waits 900 ms, then `router.push("/app/videos")`.

- [ ] **Step 1: Write the form**

```tsx
// src/components/blocks/video-compose-form.tsx
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { PlatformPicker } from "@/components/blocks/platform-picker";
import { ScheduleField } from "@/components/blocks/schedule-field";
import { UploadDropzone } from "@/components/blocks/upload-dropzone";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import type { PlatformOption } from "@/lib/types";

const SIMULATED_REQUEST_MS = 900;

export function VideoComposeForm({ platforms }: { readonly platforms: readonly PlatformOption[] }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (new FormData(event.currentTarget).getAll("platforms").length === 0) {
      setError("Choose at least one platform");
      return;
    }
    setError(null);
    setSubmitting(true);
    window.setTimeout(() => router.push("/app/videos"), SIMULATED_REQUEST_MS);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium text-ink">Title</label>
        <Input id="title" name="title" required maxLength={100} placeholder="Behind the scenes" />
      </div>
      <div className="space-y-2">
        <label htmlFor="caption" className="text-sm font-medium text-ink">Caption</label>
        <Textarea id="caption" name="caption" maxLength={2200} placeholder="Write a caption…" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-ink">Video</p>
        <UploadDropzone name="media" accept="video/*" hint="MP4 or MOV, up to 1 GB" multiple={false} />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-ink">Platforms</p>
        <PlatformPicker name="platforms" options={platforms} />
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-ink">Schedule</p>
        <ScheduleField name="publishAt" />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" type="button" disabled={submitting} onClick={() => router.push("/app/videos")}>
          Save draft
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Publishing…" : "Publish"}
        </Button>
      </div>
    </form>
  );
}
```

- [ ] **Step 2: Write the page**

```tsx
// src/app/(dashboard)/app/videos/new/page.tsx
import type { Metadata } from "next";
import { VideoComposeForm } from "@/components/blocks/video-compose-form";
import { PLATFORMS } from "@/content/dashboard";

export const metadata: Metadata = { title: "New video" };

export default function NewVideoPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="font-display text-2xl tracking-[-0.03em]">New video</h1>
      <VideoComposeForm platforms={PLATFORMS} />
    </div>
  );
}
```

- [ ] **Step 3:** Append `{ label: "New video", href: "/app/videos/new", icon: "plus" }` to `dashboardNav`.
- [ ] **Step 4: Verify** — content tests pass; on `/app/videos/new`: submitting with no title is blocked by the browser; with a title and no platform shows "Choose at least one platform"; choosing "Schedule" without a date is blocked; a valid submit returns to `/app/videos`; dropping a non-video file is ignored; the sidebar highlights only "New video". `npm run check` passes.
- [ ] **Step 5: Commit and open PR** on branch `feat/new-video-page`.

### Task 88: Settings page

PR: `feat(dashboard): add settings page`

**Files:**
- Create: `src/components/blocks/settings-form.tsx`, `src/app/(dashboard)/app/settings/page.tsx`
- Modify: `src/site.config.ts` (add Settings nav item)

**Interfaces:**
- Produces: `SettingsForm({ user }: { readonly user: DashboardUser })` — sections Profile (name, email `type="email"`) and Notifications (two checkboxes: "Email me when a post fails", "Weekly summary"); "Save changes" shows "Saved" for 2 s after a 900 ms simulated request.

- [ ] **Step 1: Write the form**

```tsx
// src/components/blocks/settings-form.tsx
"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { DashboardUser } from "@/lib/types";

const SIMULATED_REQUEST_MS = 900;
const SAVED_VISIBLE_MS = 2000;

const NOTIFICATIONS = [
  { id: "notify-failed", label: "Email me when a post fails", defaultChecked: true },
  { id: "notify-weekly", label: "Weekly summary", defaultChecked: false },
] as const;

export function SettingsForm({ user }: { readonly user: DashboardUser }) {
  const [state, setState] = useState<"idle" | "saving" | "saved">("idle");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState("saving");
    window.setTimeout(() => {
      setState("saved");
      window.setTimeout(() => setState("idle"), SAVED_VISIBLE_MS);
    }, SIMULATED_REQUEST_MS);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <section className="space-y-4 rounded-[var(--design-radius-lg)] border border-border bg-surface p-5">
        <h2 className="text-sm font-medium text-ink">Profile</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm text-ink-secondary">Name</label>
            <Input id="name" name="name" defaultValue={user.name} required />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm text-ink-secondary">Email</label>
            <Input id="email" name="email" type="email" defaultValue={user.email} required />
          </div>
        </div>
      </section>
      <section className="space-y-3 rounded-[var(--design-radius-lg)] border border-border bg-surface p-5">
        <h2 className="text-sm font-medium text-ink">Notifications</h2>
        {NOTIFICATIONS.map((option) => (
          <label key={option.id} className="flex items-center gap-3 text-sm text-ink">
            <input type="checkbox" name={option.id} defaultChecked={option.defaultChecked} className="size-4 accent-current" />
            {option.label}
          </label>
        ))}
      </section>
      <div className="flex items-center justify-end gap-3">
        <span aria-live="polite" className="text-sm text-ink-muted">{state === "saved" ? "Saved" : ""}</span>
        <Button type="submit" disabled={state === "saving"}>{state === "saving" ? "Saving…" : "Save changes"}</Button>
      </div>
    </form>
  );
}
```

- [ ] **Step 2: Write the page**

```tsx
// src/app/(dashboard)/app/settings/page.tsx
import type { Metadata } from "next";
import { SettingsForm } from "@/components/blocks/settings-form";
import { USER } from "@/content/dashboard";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="font-display text-2xl tracking-[-0.03em]">Settings</h1>
      <SettingsForm user={USER} />
    </div>
  );
}
```

- [ ] **Step 3:** Append `{ label: "Settings", href: "/app/settings", icon: "settings" }` to `dashboardNav`.
- [ ] **Step 4: Verify** — content tests pass; invalid email blocks submit; save shows "Saved" then clears. `npm run check` passes.
- [ ] **Step 5: Commit and open PR** on branch `feat/settings-page`.

---

## Phase 6 — shadcn registry

### Task 89: components.json

PR: `build(registry): add shadcn components.json`

**Files:**
- Create: `components.json`

- [ ] **Step 1: Write**

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "base-nova",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

- [ ] **Step 2: Verify** — `npx shadcn@latest info` prints the config without a schema error. If it rejects `"style"`, run `npx shadcn@latest init --base base --dry-run` in a scratch copy and use the style it writes.
- [ ] **Step 3: Commit and open PR** on branch `build/components-json`.

### Task 90: Registry file, build script and integrity test

PR: `build(registry): add registry.json, build script and integrity test`

**Files:**
- Create: `registry.json`, `src/lib/registry.test.ts`
- Modify: `package.json`, `.gitignore`

**Interfaces:**
- Produces: `npm run registry:build` → `public/r/<item>.json`; npm runs it automatically before `npm run build` via `prebuild`, so Vercel, Docker and CI builds all ship the registry.

- [ ] **Step 1: Write the empty registry**

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "ttn",
  "homepage": "https://github.com/ttncode/marketplace-ui",
  "items": []
}
```

- [ ] **Step 2: Write the integrity test**

```ts
// src/lib/registry.test.ts
import { deepStrictEqual } from "node:assert";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { test } from "node:test";

interface RegistryItem {
  readonly name: string;
  readonly dependencies?: readonly string[];
  readonly registryDependencies?: readonly string[];
  readonly files: readonly { readonly path: string }[];
}

const ROOT = new URL("../..", import.meta.url).pathname;
const registry = JSON.parse(readFileSync(join(ROOT, "registry.json"), "utf8")) as { items: readonly RegistryItem[] };
const items = registry.items;
const byName = new Map(items.map((item) => [item.name, item]));
const owner = new Map(items.flatMap((item) => item.files.map((file) => [file.path, item.name] as const)));

/** Packages every consuming Next.js app already has. */
const PROVIDED = new Set(["react", "react-dom", "next"]);
/** Folders whose every file must ship in the registry. */
const SHIPPED_DIRS = ["src/components/ui", "src/components/blocks", "src/components/layout", "src/components/icons"];

function walk(dir: string): string[] {
  return readdirSync(join(ROOT, dir)).flatMap((entry) => {
    const path = `${dir}/${entry}`;
    return statSync(join(ROOT, path)).isDirectory() ? walk(path) : [path];
  });
}

function resolveImport(fromFile: string, specifier: string): string | null {
  const base = specifier.startsWith("@/") ? join(ROOT, "src", specifier.slice(2)) : resolve(dirname(join(ROOT, fromFile)), specifier);
  for (const candidate of [base, `${base}.ts`, `${base}.tsx`]) {
    if (existsSync(candidate) && statSync(candidate).isFile()) return relative(ROOT, candidate);
  }
  return null;
}

const packageName = (specifier: string) => specifier.split("/").slice(0, specifier.startsWith("@") ? 2 : 1).join("/");

function dependencyClosure(name: string, seen = new Set<string>()): Set<string> {
  if (seen.has(name)) return seen;
  seen.add(name);
  for (const dep of byName.get(name)?.registryDependencies ?? []) {
    if (dep.startsWith("@ttn/")) dependencyClosure(dep.slice("@ttn/".length), seen);
  }
  return seen;
}

test("item names are unique and every file exists", () => {
  deepStrictEqual(items.length, byName.size);
  deepStrictEqual(items.flatMap((item) => item.files.map((f) => f.path)).filter((path) => !existsSync(join(ROOT, path))), []);
});

test("every @ttn registry dependency names an item", () => {
  const missing = items.flatMap((item) =>
    (item.registryDependencies ?? []).filter((dep) => dep.startsWith("@ttn/") && !byName.has(dep.slice("@ttn/".length))).map((dep) => `${item.name} -> ${dep}`),
  );
  deepStrictEqual(missing, []);
});

test("every shipped component file belongs to exactly one item", () => {
  const files = SHIPPED_DIRS.flatMap(walk).filter((path) => !path.endsWith(".test.ts"));
  deepStrictEqual(files.filter((path) => !owner.has(path)), []);
  const counts = new Map<string, number>();
  items.forEach((item) => item.files.forEach((f) => counts.set(f.path, (counts.get(f.path) ?? 0) + 1)));
  deepStrictEqual([...counts].filter(([, count]) => count > 1).map(([path]) => path), []);
});

test("every import is satisfied by the item, its registry dependencies, or its npm dependencies", () => {
  const problems: string[] = [];
  for (const item of items) {
    const reachable = dependencyClosure(item.name);
    for (const file of item.files) {
      if (!/\.(tsx?|ts)$/.test(file.path)) continue;
      const source = readFileSync(join(ROOT, file.path), "utf8");
      for (const match of source.matchAll(/from\s+"([^"]+)"|import\s+"([^"]+)"/g)) {
        const specifier = match[1] ?? match[2];
        if (!specifier) continue;
        if (specifier.startsWith("@/") || specifier.startsWith(".")) {
          const target = resolveImport(file.path, specifier);
          const targetItem = target ? owner.get(target) : undefined;
          if (!targetItem || !reachable.has(targetItem)) problems.push(`${item.name}: ${file.path} imports ${specifier}`);
        } else if (!specifier.startsWith("node:")) {
          const pkg = packageName(specifier);
          if (!PROVIDED.has(pkg) && !(item.dependencies ?? []).includes(pkg)) problems.push(`${item.name}: needs npm dependency ${pkg}`);
        }
      }
    }
  }
  deepStrictEqual(problems, []);
});
```

- [ ] **Step 3: Run** — `node --test src/lib/registry.test.ts` → FAIL: "every shipped component file belongs to exactly one item" lists every component file. That failure stays until Task 93; to keep `main` green in this PR, guard that one test with `{ skip: items.length === 0 ? "registry items arrive in Tasks 91–93" : false }` and remove the guard in Task 93.
- [ ] **Step 4: Scripts and ignore**

In `package.json` scripts add:

```json
    "registry:build": "shadcn build registry.json --output public/r",
    "prebuild": "npm run registry:build",
```

Append to `.gitignore`:

```text
# shadcn registry output, generated by `npm run registry:build`
/public/r
```

- [ ] **Step 5: Verify** — `npm run build` runs `shadcn build` first and succeeds; `npm run check` passes.
- [ ] **Step 6: Commit and open PR** on branch `build/registry`.

### Task 91: Registry items for lib, ui and theme

PR: `build(registry): publish lib, ui and theme items`

**Files:**
- Modify: `registry.json`

- [ ] **Step 1:** Add one item per file in `src/lib/*.ts` that a component imports (`utils`, `types`, `theme`, `nav`, `format`, `table`, `search-index`, `pagination`, `share-targets`, `routes`), each `"type": "registry:lib"`. Example:

```json
{
  "name": "table",
  "type": "registry:lib",
  "title": "Table helpers",
  "description": "Stable sort and filter helpers for data tables.",
  "files": [{ "path": "src/lib/table.ts", "type": "registry:lib" }]
}
```

`utils` declares `"dependencies": ["clsx", "tailwind-merge"]`.
- [ ] **Step 2:** Add one item per file in `src/components/ui/`, `"type": "registry:ui"`, with `registryDependencies` for what it imports. Example:

```json
{
  "name": "select",
  "type": "registry:ui",
  "title": "Select",
  "description": "Native select styled like the input.",
  "dependencies": ["lucide-react"],
  "registryDependencies": ["@ttn/input", "@ttn/utils"],
  "files": [{ "path": "src/components/ui/select.tsx", "type": "registry:ui" }]
}
```

- [ ] **Step 3:** Add the theme as a file with a target, so `theme.css` has one source:

```json
{
  "name": "theme",
  "type": "registry:file",
  "title": "Theme tokens",
  "description": "Light and dark design tokens. Import it from globals.css and map the colors in @theme inline.",
  "files": [{ "path": "src/app/theme.css", "type": "registry:file", "target": "app/theme.css" }]
}
```

- [ ] **Step 4: Verify** — `node --test src/lib/registry.test.ts` passes (the coverage test is still skipped); `npm run registry:build` writes `public/r/select.json` etc.; in a scratch Next.js app outside the repo run `npx shadcn@latest add /abs/path/to/marketplace-ui/public/r/select.json` and confirm `components/ui/select.tsx`, `input.tsx` and `lib/utils.ts` arrive — if namespaced `@ttn/…` dependencies cannot resolve from a local file, add `"registries": { "@ttn": "file:///abs/path/to/marketplace-ui/public/r/{name}.json" }` to the scratch app's `components.json` for this check only.
- [ ] **Step 5: Commit and open PR** on branch `build/registry-ui`.

### Task 92: Registry items for blocks

PR: `build(registry): publish block items`

**Files:**
- Modify: `registry.json`

- [ ] **Step 1:** Add one `registry:block` item per block, named after its main file. A CSS module ships in the item of the block that uses it (`listing-card` ships `listing-card.tsx` and `listing-card.module.css`). Shared type files (`item-types.ts`, `listing-types.ts`, `ranked-types.ts`, `article-types.ts`) are imported by several blocks, and the integrity test allows a file in only one item, so each becomes its own `registry:lib` item that the blocks list in `registryDependencies`. Example:

```json
{
  "name": "data-table",
  "type": "registry:block",
  "title": "Data table",
  "description": "Sortable, filterable table with badges and row actions.",
  "dependencies": ["@base-ui/react", "lucide-react"],
  "registryDependencies": ["@ttn/badge", "@ttn/input", "@ttn/select", "@ttn/format", "@ttn/table", "@ttn/utils"],
  "files": [{ "path": "src/components/blocks/data-table.tsx", "type": "registry:block" }]
}
```

- [ ] **Step 2: Verify** — `node --test src/lib/registry.test.ts` passes; fix every "imports … " or "needs npm dependency" line it reports by adding the missing `registryDependencies`/`dependencies`.
- [ ] **Step 3: Commit and open PR** on branch `build/registry-blocks`.

### Task 93: Registry items for layout and icons, enable coverage

PR: `build(registry): publish layout and icon items`

**Files:**
- Modify: `registry.json`, `src/lib/registry.test.ts`

- [ ] **Step 1:** Add `registry:block` items for `site-header`, `site-footer`, `site-logo`, `mobile-nav-sheet`, `app-shell`, `app-sidebar`, `app-topbar`, and `registry:ui` items for each icon file (CSS module goes with `nav-icons`).
- [ ] **Step 2:** Remove the `skip` guard added in Task 90.
- [ ] **Step 3: Verify** — `node --test src/lib/registry.test.ts` passes with all four tests running; `npm run check` passes; in the scratch app `npx shadcn@latest add <path>/public/r/app-shell.json` installs the shell and everything it needs, and the scratch app's `npm run build` passes.
- [ ] **Step 4: Commit and open PR** on branch `build/registry-layout`.

### Task 94: Document the registry

PR: `docs: document the registry`

**Files:**
- Modify: `README.md`, `AGENTS.md`

- [ ] **Step 1:** README: add `registry:build` to the Scripts table and a "Use components in another app" section:

```markdown
## Use components in another app

Add the registry to the app's `components.json`:

    "registries": { "@ttn": "https://<your-deployment>/r/{name}.json" }

Then install any item:

    npx shadcn@latest add @ttn/data-table

To upgrade an item later, run the same command with `--overwrite`, review `git diff`, keep the local changes you want, and commit.
```

- [ ] **Step 2:** AGENTS.md: under Rules add "New or changed files in `ui/`, `blocks/`, `layout/`, `icons/` or shared `lib/` files need a `registry.json` entry; `src/lib/registry.test.ts` fails otherwise."
- [ ] **Step 3: Commit and open PR** on branch `docs/registry`.

---

## Phase 7 — Release

### Task 95: Mark the repository as a template

Not a code change; no PR.

- [ ] **Step 1:** `gh api -X PATCH repos/ttncode/marketplace-ui -F is_template=true`
- [ ] **Step 2: Verify** — `gh api repos/ttncode/marketplace-ui --jq .is_template` prints `true`; the repo page shows "Use this template".

### Task 96: Deploy and publish the registry URL

PR: `docs: add the deployed registry URL`

- [ ] **Step 1:** The repository owner imports the repo in Vercel (framework preset Next.js, Node 24). This needs their Vercel account; the agent does not do it.
- [ ] **Step 2:** Confirm `https://<deployment>/r/data-table.json` returns JSON.
- [ ] **Step 3:** Replace `<your-deployment>` in README with the real domain and add the same URL to AGENTS.md.
- [ ] **Step 4:** In a scratch app with that registry configured, `npx shadcn@latest add @ttn/listing-card` succeeds.
- [ ] **Step 5: Commit and open PR** on branch `docs/registry-url`.
