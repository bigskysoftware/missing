import "https://deno.land/x/dotenv@v3.2.0/load.ts";

import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import basePath from "lume/plugins/base_path.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import prismHighlight from "lume/plugins/prism.ts";
import vento from "lume/plugins/vento.ts";
import pagefind from "lume/plugins/pagefind.ts";

import markdownOptions from "./_build/markdown.ts";
import indexDefinitions from "./_build/index-definitions.ts";
import semver from "./_build/semver.ts";

import { Page } from "lume/core.ts";

const site = lume(
  {
    location: new URL("https://missing.style/"),
  },
  { markdown: {
    ...markdownOptions,
    options: {
      html: true,
    }
  } },
)
  .copy("netlify.redirects", "_redirects")
  .copy("netlify.headers", "_headers")
  .copy("js")
  .addEventListener("afterRender",
    "cd .. && deno task css && deno task js && cp -r dist src www/_site/")
  .data("layout", "docs.vto", "/docs")
  .data("layout", "prose.vto", "/pages")
  .data("layout", "release.vto", "/releases")
  .data("url", (p: Page) => p.src.path + "/", "/releases")
  .data("url", (p: Page) => p.src.path + "/", "/demos")
  .preprocess([".md"], (p: Page) => {
    if (p.src.path.match(/^\/releases\/\d/)) {
      p.data.release = p.src.path.split("/").at(-1);
    }
  })
  .loadPages([".html"])
  .use(date())
  .use(basePath())
  .use(resolveUrls())
//  .use(prismHighlight())
  .use(vento({ options: { autoescape: true } }))
  .use(pagefind({
    ui: false,
    indexing: {
      bundleDirectory: "_pagefind",
    }
  }))
  .use(semver())
  .use(indexDefinitions());

site.hooks.markdownIt((engine) => engine.disable("code"));

export default site;
