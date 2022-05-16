
import prismHighlight from "https://raw.githubusercontent.com/lumeland/experimental-plugins/main/prism/mod.ts"
import Prism from "https://raw.githubusercontent.com/lumeland/experimental-plugins/main/prism/deps.ts"
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
