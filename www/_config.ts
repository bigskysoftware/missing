import "https://deno.land/x/dotenv@v3.2.0/load.ts";

import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import basePath from "lume/plugins/base_path.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import vento from "lume/plugins/vento.ts";
// import pagefind from "lume/plugins/pagefind.ts";

import markdownOptions from "./_build/markdown.ts";
import highlighting from "./_build/highlighting.ts";
import myFilters from "./_build/filters.ts";
import indexDefinitions from "./_build/index-definitions.ts";

import { Page } from "lume/core.ts";

export default lume(
  {
    location: new URL("https://missing.style/"),
  },
  { markdown: markdownOptions },
)
  .copy("netlify.redirects", "_redirects")
  .copy("netlify.headers", "_headers")
  .copy("js")
  .addEventListener("afterRender", "cp -r ../src _site/")
  .data("layout", "docs.vto", "/docs")
  .data("layout", "prose.vto", "/pages")
  .data("layout", "release.vto", "/releases")
  .data("url", (p: Page) => p.src.path + "/", "/releases")
  .preprocess([".md"], (p: Page) => {
    if (p.src.path.match(/^\/releases\/\d/)) {
      p.data.release = p.src.path.split("/").at(-1);
    }
  })
  .use(date())
  .use(highlighting())
  .use(basePath())
  .use(resolveUrls())
  .use(vento())
  /* .use(pagefind({
    ui: false,
    indexing: {
      bundleDirectory: "_pagefind",
    }
  })) */
  .use(myFilters())
  .use(indexDefinitions());
