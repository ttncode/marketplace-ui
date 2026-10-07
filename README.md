# marketplace-ui

A Next.js starter for directory and marketplace sites: top navigation, listings, categories, search, a submit form, legal pages and sign-in screens. Static data, no backend. Copy it, edit the config and content, and ship.

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
The `(dashboard)` layout is planned; today the repository ships `(site)` and `(auth)`.

## Customising

- Brand: edit `src/site.config.ts` (name, url, logo, navigation, footer).
- Copy and demo data: replace the files in `src/content/` (categories, listings, home, FAQ, submit, legal).
- Look and feel: edit the design tokens in `src/app/globals.css` and the fonts in `src/app/layout.tsx`.
- Logo and favicons: replace the files in `public/brand/`.

## Docker

```bash
docker compose up app   # production build on port 3000 (override with PORT)
docker compose up dev   # dev server with hot reload on port 3001 (override with DEV_PORT)
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Build for production (standalone output) |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run the TypeScript compiler |
| `npm test` | Run unit tests with the Node test runner |
| `npm run check` | Lint, typecheck, test, and build |

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Base UI, and Lucide icons.

## Project layout

```text
src/site.config.ts     brand: name, url, logo, navigation, footer
src/content/           typed demo data; the only place copy lives
src/app/(site)/        /, /categories, /item, /search, /submit, /privacy, /terms
src/app/(auth)/        /login and /signup
src/components/ui/     primitives
src/components/blocks/ page sections
src/components/layout/ header and footer
src/components/icons/  SVG icon sets that lucide does not cover
src/lib/               types, routes, search index and other pure helpers
public/brand/          logo and favicons
```

## License

Released under the [MIT License](LICENSE).
