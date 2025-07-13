/**
 * Links classes, variables and elements to where they're defined in the docs.
 */

import Site from "lume/core/site.ts";
import { Element } from "lume/deps/dom.ts";

/**
 * Matches:
 *     <dfn>`.class`</dfn>
 *     <dfn>`--var`</dfn>
 *     <dfn>`<elt>`</dfn>
 */
const definitionRE = /<dfn>`([^`]+)`/g;

export default () => {
  return (site: Site) => {
    const definitionsIndex: Record<string, string> = {};

    site.preprocess([".md"], (pages) => pages.forEach((page) => {
      if (!page.data.content) return;
      for (const definition of getDefinitions(page.data.content as string)) {
        definitionsIndex[definition] = page.data.url as string;
      }
    }));

    site.process([".md"], (pages) => pages.forEach((page) => {
      const document = page.document;

      if (!document) return;

      document.getElementsByTagName("dfn").forEach((el) => {
        el.id ||= el.textContent;
      });
      document.getElementsByTagName("code").forEach((el) => {
        if (!(el.textContent in definitionsIndex)) return;
        const a = document.createElement("a");
        a.setAttribute(
          "href",
          definitionsIndex[el.textContent] + "#" + el.textContent,
        );
        el.before(a);
        a.append(el);
      });

      const codeLinkStyle = "color: inherit; text-decoration-color: var(--fg)";

      document.querySelectorAll(".token.property").forEach((el) => {
        if (!(el.textContent in definitionsIndex)) return;
        const a = document.createElement("a");
        a.textContent = el.textContent;
        a.setAttribute(
          "href",
          definitionsIndex[el.textContent] + "#" + el.textContent,
        );
        el.parentElement?.replaceChild(a, el);
      });

      document.querySelectorAll(".token.attr-name").forEach((node) => {
        const el = node as Element;
        if (el.textContent !== "class") return;

        const values = el.nextElementSibling;
        if (!values?.classList.contains("attr-value")) return;

        values.childNodes.forEach((cn) => {
          cn._replaceWith(
            ...cn.textContent.split(/(?<=\s)|(?=\s)/g).map((text) => {
              if (("." + text) in definitionsIndex) {
                const a = document.createElement("a");
                a.textContent = text;
                a.setAttribute(
                  "href",
                  definitionsIndex["." + text] + "#." + text,
                );
                a.setAttribute("style", codeLinkStyle);
                return a;
              }
              return text;
            }),
          );
        });
      });
      document.querySelectorAll(".token.tag > .token.punctuation:first-child")
        .forEach((node) => {
          if (node.textContent !== "<") return;

          const el = node.parentElement;
          const tn = el?.childNodes[1];
          if (!tn) return;

          const tag = "<" + tn.textContent + ">";

          if (tag in definitionsIndex) {
            const a = document.createElement("a");
            a.textContent = tn.textContent;
            a.setAttribute("href", definitionsIndex[tag] + "#" + tag);
            a.setAttribute("style", codeLinkStyle);
            el.replaceChild(a, tn);
          }
        });

      const $index = document.querySelector("#index-of-everything");
      if ($index) {
        const entries = Object.entries(definitionsIndex).sort((a, b) =>
          a[0].localeCompare(b[0])
        );

        for (const [term, url] of entries) {
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.setAttribute("href", url + "#" + term);
          const code = document.createElement("code");
          code.textContent = term;
          li.append(a);
          a.append(code);
          $index.append(li);
        }
      }
    }));
  };
};

function* getDefinitions(content: string): Iterable<string> {
  let match;
  while ((match = definitionRE.exec(content)) !== null) {
    yield match[1];
  }
}
