import "https://deno.land/x/dotenv@v3.2.0/load.ts";

import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import basePath from "lume/plugins/base_path.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import prismHighlight from "lume/plugins/prism.ts";
import pagefind from "lume/plugins/pagefind.ts";

import markdownOptions from "./_build/markdown.ts";
import indexDefinitions from "./_build/index-definitions.ts";
import semver from "./_build/semver.ts";

const site = lume(
  {
    location: new URL("https://missing.style/"),
  },
  {
    markdown: {
      ...markdownOptions,
      options: {
        html: true,
      }
    },
  },
)
  .copy("netlify.redirects", "_redirects")
  .copy("netlify.headers", "_headers")
  .copy("js")
  .copy("missing-js")
  .addEventListener("afterRender",
    "cd .. && mise run 'build:{css,js}' && cp -r dist src www/_site/")
  .data("layout", "docs.vto", "/docs")
  .data("layout", "demo.vto", "/demos")
  .data("layout", "prose.vto", "/pages")
  .data("layout", "release.vto", "/releases")
  .data("url", (p) => p.src.path + "/", "/releases")
  .data("url", (p) => p.src.path + "/", "/demos")
  .data("browserslist", Deno.env.get("BROWSERSLIST"), "/")
  .preprocess([".md"], (ps) => ps.forEach(p => {
    if (p.src.path.match(/^\/releases\/\d/)) {
      p.data.release = p.src.path.split("/").at(-1);
			p.data.title = p.data.release;
    }
  }))
  .loadPages([".html"])
  .use(date())
  .use(basePath())
  .use(resolveUrls())
  .use(prismHighlight({
    cssSelector: "pre code, code[class*=language-]",
  }))
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
