import "https://deno.land/x/dotenv@v3.2.0/load.ts";

import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import basePath from "lume/plugins/base_path.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import eta from "lume/plugins/eta.ts";

import markdownOptions from "./_build/markdown.ts";
import highlighting from "./_build/highlighting.ts";
import myFilters from "./_build/filters.ts";
import indexDefinitions from "./_build/index-definitions.ts";

import postcss from "./_build/postcss.ts";

export default lume(
  {
    location: new URL("https://missing.style/"),
    includes: "www/_includes",
    dest: "dist",
  },
  { markdown: markdownOptions },
)
  .ignore("README.md", "Contributing.md", "dev-notes", "netlify.toml")
  .copy("www/pages/netlify.redirects", "_redirects")
  .copy("www/js", "js")
  // .addEventListener("afterRender", postcss)
  .use(date())
  .use(highlighting())
  .use(basePath())
  .use(resolveUrls())
  .use(eta({ extensions: [".eta", ".html"] }))
  .use(myFilters())
  .use(indexDefinitions());
