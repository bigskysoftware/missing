/// a tabs library.

import { $, $$, on, attr, next, prev, hotkey, behavior } from "./19.js";


/** @returns {HTMLElement[]} */
const tabsOf = tablist => $$(tablist, "[role=tab]");

/** @returns {HTMLElement | null} */
const currentTab = tablist => $(tablist, "[role=tab][aria-selected=true]");

/** @returns {HTMLElement | null} */
const tabPanelOf = (tab, root) => root.getElementById(attr(tab, "aria-controls"));

const switchTab = (root, tablist, tab) => {
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

  tab.focus();
};

/**
 * https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/
 */
export
const tablist = behavior("[role=tablist]", (tablist, { root }) => {
  if (!(tablist instanceof HTMLElement)) return;
  tablist.tabIndex = 0;
  tabsOf(tablist).forEach(tab => tab.tabIndex = -1);
  switchTab(root, tablist, currentTab(tablist));

  on(tablist, "focus", _ => currentTab(tablist)?.focus());

  on(tablist, "click",   e => switchTab(root, tablist, /**@type{HTMLElement}*/(e.target)?.closest("[role=tab]")));
  on(tablist, "focusin", e => switchTab(root, tablist, /**@type{HTMLElement}*/(e.target)?.closest("[role=tab]")));

  on(tablist, "keydown", hotkey({
    "ArrowRight": e => next(tablist, "[role=tab]", /**@type{HTMLElement}*/(e.target)).focus(),
    "ArrowLeft":  e => prev(tablist, "[role=tab]", /**@type{HTMLElement}*/(e.target)).focus(),
    "Home": _ => tabsOf(tablist).at(0)?.focus(),
    "End": _ => tabsOf(tablist).at(-1)?.focus(),
  }));
})

tablist(document);
export default tablist;

