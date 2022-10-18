import "https://deno.land/x/dotenv@v3.2.0/load.ts";

import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import basePath from "lume/plugins/base_path.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import eta from "lume/plugins/eta.ts";

import highlighting from "./_build/highlighting.ts";
import myFilters from "./_build/filters.ts";
import indexDefinitions from "./_build/index-definitions.ts";

import mdAttrs from "npm:markdown-it-attrs@4.1.4";
import mdDeflist from "npm:markdown-it-deflist@2.1.0";
import mdToc from "npm:markdown-it-toc-done-right@4.2.0";
import mdAnchor from "npm:markdown-it-anchor@8.6.4";

import postcss from "./_build/postcss.ts";

export default lume(
  {
    location: new URL("https://missing.style/"),
    includes: "www/_includes",
    dest: "dist",
  },
  {
    markdown: {
      plugins: [
        mdAttrs,
        mdDeflist,
        [mdToc, {
          level: [2],
          listType: "ul",
          containerClass: "TableOfContents box crowded",
          listClass: "padding-inline",
        }],
        [mdAnchor, {
          permalink: mdAnchor.permalink.linkInsideHeader({
            placement: "before",
            symbol: "§",
            class: "permalink-anchor float:right",
          }),
          level: 2,
        }],
      ],
    },
  },
)
  .ignore("README.md", "Contributing.md", "dev-notes", "netlify.toml")
  .copy("www/pages/netlify.redirects", "_redirects")
  .copy("www/js", "js")
  .addEventListener("afterRender", postcss)
  .use(date())
  .use(highlighting())
  .use(basePath())
  .use(resolveUrls())
  .use(eta({ extensions: [".eta", ".html"] }))
  .use(myFilters())
  .use(indexDefinitions());
