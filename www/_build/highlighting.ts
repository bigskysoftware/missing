
import prismHighlight from "lume/plugins/prism.ts"
import Prism from "lume/deps/prism.ts"
import prismHyperscript from "https://esm.sh/prism-hyperscript"
import type { Site } from "lume/core.ts"

/**
 * Highlight code, including _hyperscript, with Prism.
 */
export default () => {
    prismHyperscript(Prism)

    return (site: Site) => {
        site.use(prismHighlight())
    }
}
