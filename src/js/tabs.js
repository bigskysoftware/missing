/// a tabs library.

//@deno-types=./19.ts
import { $, $$, on, attr, next, prev, asHtml, hotkey, behavior, makelogger, identify, dispatch, tag, html } from "./19.js";
import { focusGroup } from "./focusgroup.js";

const ilog = makelogger("tabs");

const tablist = tag("aria-tablist", { base: focusGroup }, (tablist) => {
  tablist.internals.role = "tablist"

  if (!tablist.hasAttribute("aria-labelledby") && !tablist.hasAttribute("aria-label"))
    ilog("ERROR:", tablist, "has no accessible name (aria-label or aria-labelledby)")
})

const tab = tag("aria-tab", (tab) => {
  tab.internals.role = "tab"
  tab.tabIndex = -1

  if (tab.ariaControlsElements.length === 0)
    console.error("ERROR:", this, "has no associated tabpanel")

  const tabpanel = (t = tab) => t.ariaControlsElements[0]
  const tablist = () => tab.closest("aria-tablist")
  const siblings = () => tablist().querySelectorAll("aria-tab")

  const close = (tab) => {
    tab.ariaSelected = false
    tabpanel(tab).hidden = true
  }

  const open = (focusTab = true) => {
    siblings().forEach(close)
    tab.ariaSelected = true
    tabpanel(tab).hidden = false
  }

  on(tab, "click", () => open())
  on(tab, "focus", () => open())
})

const tabpanel = tag("aria-tabpanel", panel =>
  panel.internals.role = "tabpanel")

tablist.define()
tab.define()
tabpanel.define()
