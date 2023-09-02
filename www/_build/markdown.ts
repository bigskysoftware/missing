import mdAttrs from "npm:markdown-it-attrs@4.1.4";
import mdDeflist from "npm:markdown-it-deflist@2.1.0";
import mdToc from "npm:markdown-it-toc-done-right@4.2.0";
import mdAnchor from "npm:markdown-it-anchor@8.6.4";

export default {
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
};
