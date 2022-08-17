import "https://deno.land/x/dotenv@v3.2.0/load.ts";

import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import basePath from "lume/plugins/base_path.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import eta from "lume/plugins/eta.ts";

import highlighting from "./_build/highlighting.ts";
import getDatesFromGit from "./_build/get-dates-from-git.ts";
import myFilters from "./_build/filters.ts";
import indexDefinitions from "./_build/index-definitions.ts";

import mdAttrs from "https://esm.sh/markdown-it-attrs@4.1.4?dev";
import mdDeflist from "https://esm.sh/markdown-it-deflist@2.1.0?dev";
import mdContainer from "https://esm.sh/@gerhobbelt/markdown-it-container@3.0.0-10?dev";
import mdToc from "https://esm.sh/markdown-it-toc-done-right@4.2.0?dev";
import mdAnchor from "https://esm.sh/markdown-it-anchor@8.6.4?dev";

import postcss from "../build/postcss.ts";

export default lume(
  {
    location: new URL("https://missing.style/"),
    src: "www",
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
        [mdContainer, "box"],
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
  .copy("netlify.redirects", "_redirects")
  .addEventListener("afterBuild", postcss)
  .addEventListener("afterRender", postcss)
  .use(date())
  .use(highlighting())
  .use(basePath())
  .use(resolveUrls())
  .use(eta({ extensions: [".eta", ".html"] }))
  .use(myFilters())
  .use(getDatesFromGit())
  .use(indexDefinitions());
