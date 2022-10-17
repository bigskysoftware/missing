/// a tabs library.

import { makelogger, $, $$, on, attr, next, prev, hotkey, behavior } from "./19.js";

const
ilog = makelogger("tabs"),
tabs = tablist => $$(tablist, "[role=tab]"),
currentTab = tablist => $(tablist, "[role=tab][aria-selected=true]"),
tabPanelOf = (tab, root) => root.getElementById(attr(tab, "aria-controls")),
switchTab = (root, tablist, tab) => {
  if (!tab) return;
  const curtab = currentTab(tablist);

  attr(curtab, "aria-selected", "false");
  curtab.tabIndex = -1;
  tabPanelOf(curtab, root).hidden = true;

  attr(tab, "aria-selected", "true");
  tab.tabIndex = 0;
  tabPanelOf(tab, root).hidden = false;
  tab.focus();
};

// https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/
const tablist = behavior("[role=tablist]", (tablist, { root }) => {
  tablist.tabIndex = 0;
  tabs(tablist).forEach(tab => tab.tabIndex = -1);
  switchTab(root, tablist, currentTab(tablist));

  on(tablist, "focus", e => currentTab(tablist).focus());

  on(tablist, "click",   e => switchTab(root, tablist, e.target.closest("[role=tab]")));
  on(tablist, "focusin", e => switchTab(root, tablist, e.target.closest("[role=tab]")));

  on(tablist, "keydown", hotkey({
    "ArrowRight": e => next(tablist, "[role=tab]", e.target).focus(),
    "ArrowLeft":  e => prev(tablist, "[role=tab]", e.target).focus(),
    "Home": e => $(tablist, "[role=tab]").focus(),
    "End": e => $$(tablist, "[role=tab]").at(-1).focus(),
  }))
})

tablist(document);
export default tablist;

