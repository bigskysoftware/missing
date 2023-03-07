/// a tabs library.

import { $, $$, on, attr, next, prev, asHtml, hotkey, behavior, makelogger } from "./19.js";

const ilog = makelogger("tabs");

/** 
 * @param {Element} tablist
 * @returns {HTMLElement[]}
 */
const tabsOf = tablist => $$(tablist, "[role=tab]");

/** 
 * @param {Element} tablist
 * @returns {HTMLElement | null}
 */
const currentTab = tablist => $(tablist, "[role=tab][aria-selected=true]");

/** 
 * @param {Element} tab
 * @param {import("./19.js").Root} root
 * @returns {HTMLElement | null}
 */
const tabPanelOf = (tab, root) => {
  const id = attr(tab, "aria-controls");
  if (id === null) return console.error("Tab", tab, "has no associated tabpanel"), null;
  return root.getElementById(id);
}

/** 
 * @param {import("./19.js").Root} root
 * @param {Element} tablist
 * @param {HTMLElement | null} tab
 * @returns {void}
 */
const switchTab = (root, tablist, tab, { focusTab = true } = {}) => {
  if (!tab) return;
  const curtab = currentTab(tablist);

  if (curtab) {
    attr(curtab, { ariaSelected: false, tabindex: -1 });
    const tabpanel = tabPanelOf(curtab, root);
    if (tabpanel) tabpanel.hidden = true;
  }
  attr(tab, { ariaSelected: true, tabindex: 0 });
  
  const tabpanel = tabPanelOf(tab, root);
  if (tabpanel) tabpanel.hidden = false;

  if (focusTab) tab.focus();
};

/**
 * https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/
 */
export const tablist = behavior("[role=tablist]", (tablist, { root }) => {
  if (!(tablist instanceof HTMLElement)) return;
  tablist.tabIndex = 0;
  tabsOf(tablist).forEach(tab => {
    tab.tabIndex = -1;
    if (!tab.id) console.error("Tab", tab, "has no id");
    tabPanelOf(tab).setAttribute("aria-labelledby", tab.id);
  });
  if (!(tablist.hasAttribute("aria-labelledby") || tablist.hasAttribute("aria-label")))
    console.error("Tab list", tablist, "has no accessible name (aria-label or aria-labelledby)");
  
  switchTab(root, tablist, currentTab(tablist), { focusTab: false });

  on(tablist, "focus", _ => currentTab(tablist)?.focus());

  on(tablist, "click",   e => switchTab(root, tablist, asHtml(asHtml(e.target)?.closest("[role=tab]"))));
  on(tablist, "focusin", e => switchTab(root, tablist, asHtml(asHtml(e.target)?.closest("[role=tab]"))));

  on(tablist, "keydown", hotkey({
    "ArrowRight": e => asHtml(next(tablist, "[role=tab]", asHtml(e.target)))?.focus(),
    "ArrowLeft":  e => asHtml(prev(tablist, "[role=tab]", asHtml(e.target)))?.focus(),
    "Home": _ => tabsOf(tablist).at(0)?.focus(),
    "End": _ => tabsOf(tablist).at(-1)?.focus(),
  }));
})

tablist(document);
export default tablist;

