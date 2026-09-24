// Run: node --test src/components/sites/mcpmarket-com-1a9fdbee/shared/links.test.ts
import { strictEqual } from "node:assert";
import { test } from "node:test";

import { NOT_FOUND_HREF, toSiteHref } from "./links.ts";

test("app.mcpmarket.com links follow the app's signed-out redirects", () => {
  strictEqual(toSiteHref("https://app.mcpmarket.com/signup"), "/signup");
  strictEqual(toSiteHref("https://app.mcpmarket.com/login"), "/login");
  strictEqual(toSiteHref("https://app.mcpmarket.com/"), "/login");
  strictEqual(toSiteHref("https://app.mcpmarket.com/sell?source=sell-page"), "/signup?redirectTo=%2Fsell%3Fsource%3Dsell-page");
  strictEqual(toSiteHref("https://app.mcpmarket.com/import?url=x"), "/signup?redirectTo=%2Fimport%3Furl%3Dx");
  strictEqual(
    toSiteHref("https://app.mcpmarket.com/deploy?name=Firecrawl&npm=firecrawl-mcp"),
    "/login?redirectTo=%2Fdeploy%3Fname%3DFirecrawl%26npm%3Dfirecrawl-mcp",
  );
});

test("other websites go to the 404 page; own and relative links pass through", () => {
  strictEqual(toSiteHref("https://github.com/mendableai/firecrawl"), NOT_FOUND_HREF);
  strictEqual(toSiteHref("https://mcpmarket.com/server/exa?x=1#top"), "/server/exa?x=1#top");
  strictEqual(toSiteHref("/hub"), "/hub");
  strictEqual(toSiteHref("mailto:support@mcpmarket.com"), "mailto:support@mcpmarket.com");
});
