
import "https://deno.land/x/dotenv@v3.2.0/load.ts"

import lume        from "lume/mod.ts"
import date        from "lume/plugins/date.ts"
import basePath    from "lume/plugins/base_path.ts"
import resolveUrls from "lume/plugins/resolve_urls.ts"
import eta         from "lume/plugins/eta.ts"

import highlighting               from "./_build/highlighting.ts"
import getDatesFromGit            from "./_build/get-dates-from-git.ts"
import myFilters                  from "./_build/filters.ts"

import mdAttrs     from "https://esm.sh/markdown-it-attrs"
import mdDeflist   from "https://esm.sh/markdown-it-deflist"
import mdContainer from "https://esm.sh/@gerhobbelt/markdown-it-container"

import postcss from "../build/postcss.ts"

export default lume(
    {
      location: new URL("https://missing.style/"),
      src: "www",
      dest: "dist",
    }, {
      markdown: {
        plugins: [
          mdAttrs,
          mdDeflist,
          [mdContainer, "box"],
        ]
      }
    }
  )
  .addEventListener("afterBuild", postcss)
  .use(date())
  .use(highlighting())
  .use(basePath())
  .use(resolveUrls())
  .use(eta({ extensions: [".eta", ".html"] }))
  .use(myFilters())
  .use(getDatesFromGit())
