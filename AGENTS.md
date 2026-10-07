<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Site template

A Next.js starter for directory sites and management dashboards. Static data, no backend.

- `npm run check` runs lint, typecheck, tests and build, and the build also builds the registry (via `prebuild`). Run it before committing.
- TypeScript strict, no `any`. Tailwind utilities, no inline styles. Named exports.
- New or changed files in `ui/`, `blocks/`, `layout/`, `icons/` or shared `lib/` files need a `registry.json` entry; `src/lib/registry.test.ts` fails otherwise.
- Authentication is simulated: forms and OAuth buttons navigate to `/app`. There is no backend.

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
