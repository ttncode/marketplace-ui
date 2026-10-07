# marketplace-ui

A Next.js starter for directory and marketplace sites: top navigation, listings, categories, search, a submit form, legal pages, sign-in screens and a dashboard shell. Static data, no backend. Copy it, edit the config and content, and ship.

[![CI](https://github.com/ttncode/marketplace-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/ttncode/marketplace-ui/actions/workflows/ci.yml)
![Next.js 16](https://img.shields.io/badge/Next.js-16-black)
![License: MIT](https://img.shields.io/badge/license-MIT-blue)

## Quick start

Requires Node.js 24 or later.

```bash
nvm use
npm install
npm run dev
```

Open http://localhost:3000.

## Choosing layouts

| New project | Keep | Delete |
| --- | --- | --- |
| Marketplace, directory, landing page, blog | `(site)`, plus `(auth)` if it has accounts | `(dashboard)` |
| Internal tool, admin panel | `(dashboard)`, `(auth)` | `(site)` |
| SaaS product with a public site | all three | nothing |

Top navigation fits pages people browse or read, with about seven or fewer top-level sections.
A sidebar fits screens people work in repeatedly, with many or nested sections, behind sign-in.
The repository ships `(site)`, `(auth)` and `(dashboard)`.

## Customising

- Brand: edit `src/site.config.ts` (name, url, contact email, logo, navigation, footer).
- Copy and demo data: replace the files in `src/content/` (categories, listings, home, FAQ, submit, legal).
- Look and feel: edit the design tokens in `src/app/theme.css` and the fonts in `src/app/layout.tsx`. To change the brand color, set `--design-accent`, `--design-accent-foreground`, `--design-accent-raised` and `--design-accent-raised-hover` together, in both themes.
- Logo and favicons: replace the files in `public/brand/`.

## Use components in another app

Add the registry to the app's `components.json`:

```json
"registries": { "@ttn": "https://<your-deployment>/r/{name}.json" }
```

Then install any item:

```bash
npx shadcn@latest add @ttn/data-table
```

For the design tokens, install `@ttn/theme` (it also installs `theme-tailwind`) and import both files from the app's `globals.css`, after `@import "tailwindcss";`:

```css
@import "./theme.css";
@import "./theme-tailwind.css";

@custom-variant dark (&:is(.dark *));
```

`theme.css` holds the tokens. `theme-tailwind.css` maps them to Tailwind utilities such as `bg-canvas` and `text-ink`, and adds the fonts, radius, accordion animations and component classes (`design-dither-static`, `design-navigation-surface`, `scrollbar-hide`, …) the blocks use. Blocks need both files and the `dark` variant, which follows the `.dark` class that the theme toggle sets.

To upgrade an item later, run the same command with `--overwrite`, review `git diff`, keep the local changes you want, and commit.

The registry is rebuilt into `public/r` by the `prebuild` script, so `npm run build` always includes it. With pnpm or yarn, run `npm run registry:build` first; it only calls `shadcn build`.

## Authentication is simulated

The login and signup forms and the OAuth buttons only navigate to `/app` after a short delay. There is no backend, session or provider; wire up real authentication before shipping accounts.

## Docker

```bash
docker compose up app   # production build on port 3000 (override with PORT)
docker compose up dev   # dev server with hot reload on port 3001 (override with DEV_PORT)
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Build the registry (via `prebuild`), then build for production (standalone output) |
| `npm run registry:build` | Write the shadcn registry to `public/r` |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run the TypeScript compiler |
| `npm test` | Run unit tests with the Node test runner |
| `npm run check` | Lint, typecheck, test, and build |

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Base UI, and Lucide icons.

## Project layout

```text
src/site.config.ts           brand: name, url, contact email, logo, navigation, footer
src/content/                 typed demo data; the only place copy lives
src/app/theme.css            design tokens for light and dark
src/app/theme-tailwind.css   Tailwind mappings, fonts, radius and component classes
src/app/(site)/              /, /categories, /item, /search, /submit, /privacy, /terms
src/app/(auth)/              /login and /signup
src/app/(dashboard)/app/     /app, /app/videos, /app/settings
src/components/ui/           primitives
src/components/blocks/       page sections
src/components/layout/       header, footer, sidebar and top bar
src/components/icons/        SVG icon sets that lucide does not cover
src/lib/                     types, routes, search index and other pure helpers
public/brand/                logo and favicons
```

## License

Released under the [MIT License](LICENSE).
