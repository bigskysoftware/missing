/// a tabs library.

import { $, $$, on, attr, next, prev, hotkey, behavior } from "./19.js";


const
tabsOf = tablist => $$(tablist, "[role=tab]"),
currentTab = tablist => $(tablist, "[role=tab][aria-selected=true]"),
tabPanelOf = (tab, root) => root.getElementById(attr(tab, "aria-controls")),
switchTab = (root, tablist, tab) => {
  if (!tab) return;
  const curtab = currentTab(tablist);

  attr(curtab, { ariaSelected: false, tabindex: -1 });
  attr(tab, { ariaSelected: true, tabindex: 0 });
  
  tabPanelOf(curtab, root).hidden = true;
  tabPanelOf(tab, root).hidden = false;

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

  on(tablist, "focus", _ => currentTab(tablist).focus());

  on(tablist, "click",   e => switchTab(root, tablist, e.target.closest("[role=tab]")));
  on(tablist, "focusin", e => switchTab(root, tablist, e.target.closest("[role=tab]")));

  on(tablist, "keydown", hotkey({
    "ArrowRight": e => next(tablist, "[role=tab]", e.target).focus(),
    "ArrowLeft":  e => prev(tablist, "[role=tab]", e.target).focus(),
    "Home": _ => $(tablist, "[role=tab]").focus(),
    "End": _ => $$(tablist, "[role=tab]").at(-1).focus(),
  }));
})

tablist(document);
export default tablist;

