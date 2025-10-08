/// a tabs library.

//@deno-types=./19.ts
import { on, attr, makelogger, tag } from "./19.js"
import { focusGroup } from "./focusgroup.js"

const ilog = makelogger("tabs")

const tablist = tag(
  "aria-tablist",
  { internals: { role: "tablist" } },
  (tablist) => { focusGroup.install(tablist) }
)

const tab = tag(
  "aria-tab",
  {
    internals: { role: "tab", ariaSelected: "false" },
    observedAttributes: ["aria-controls", "tabindex", "aria-selected"],
  },
  (tab) => {

    tab.tabIndex = (tab.ariaSelected == "true") ? "0" : "-1"

    tab.open  = () => { attr(tab, "aria-selected", "true") }
    tab.close = () => { attr(tab, "aria-selected",  null ) }

    on(tab, "attribute:aria-controls", (e) => {
      if ("ariaControlsElements" in tab)
        tab.panel = tab.ariaControlsElements[0]
      else
        tab.panel = tab.getRootNode().getElementById(e.detail.value)

      if (tab.panel)
        tab.panel.hidden = (tab.ariaSelected !== "true")
      else
        return ilog("ERROR:", tab, "has no associated tabpanel")

      if ("ariaLabelledByElements" in tab.internals)
        tab.panel.internals.ariaLabelledByElements = [tab]
      else
        attr(tab.panel, "aria-labelledby", identify(tab))
    })

    on(tab, "attribute:tabindex", (e) =>
      tab.ariaSelected = (e.detail.value == "0") ? "true" : null)

    on(tab, "attribute:aria-selected", (e) => {
      if (tab.panel)
        tab.panel.hidden = (e.detail.value !== "true")
    })

  }
)

const tabpanel = tag(
  "aria-tabpanel",
  { internals: { role: "tabpanel" } },
  (tabpanel) => {},
)

// Define nested elements first
tabpanel.define()
tab.define()
tablist.define()
