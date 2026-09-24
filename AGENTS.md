<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# marketplace-ui

A static Next.js clone of the mcpmarket.com UI. No backend.

- `npm run check` runs lint, typecheck, tests, and build. Run it before committing.
- TypeScript strict, no `any`. Tailwind utilities, no inline styles. Named exports.
- Match the source site 1:1; don't add personal design changes.
- Route every captured link through `toSiteHref` (`src/components/sites/mcpmarket-com-1a9fdbee/shared/links.ts`): other websites go to the 404 page.
