import prismHighlight from "lume/plugins/prism.ts";
import Prism from "lume/deps/prism.ts";
import prismHyperscript from "npm:prism-hyperscript@1.1.1";
import type { Site } from "lume/core.ts";

/**
 * Highlight code, including _hyperscript, with Prism.
 */
export default () => {
  prismHyperscript(Prism);

  return (site: Site) => {
    site.use(
      prismHighlight({
        cssSelector: "code:not(.highlighted)", // avoid already highlighted code
      }),
    );
  };
};
