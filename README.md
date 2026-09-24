# marketplace-ui

A pixel-perfect Next.js clone of the [mcpmarket.com](https://mcpmarket.com) marketplace UI, built as a UI study. It is not a product: there is no backend, and all data is static.

[![CI](https://github.com/ttncode/marketplace-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/ttncode/marketplace-ui/actions/workflows/ci.yml)
![Next.js 16](https://img.shields.io/badge/Next.js-16-black)
![License: MIT](https://img.shields.io/badge/license-MIT-blue)

## What's inside

- The homepage and every page linked one level deep from it: servers, clients, categories, agent skills, leaderboards, daily picks, news, sell, submit, and legal pages.
- The `app.mcpmarket.com` sign-up and login screens. Links into the app follow its signed-out redirects.
- The source's motion: the hero dither shader, animated nav icons, the mega menu, FAQ accordions, modals, and the newsletter toast.
- Links to any other website open the 404 page.

## Quick start

Requires Node.js 24 or later.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

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
src/app/(site)/        mcpmarket.com routes
src/app/(app-auth)/    app.mcpmarket.com /signup and /login
src/components/sites/  page sections and shared components, grouped by source site
public/sites/          images, favicons, and other captured assets
```

## License

Code is released under the [MIT License](LICENSE). The MCP Market name, logo, and content belong to their owners.
