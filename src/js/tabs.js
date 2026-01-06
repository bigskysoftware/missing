//@deno-types=./19.ts
import { $$, css, internals, makelogger, observeAttributes, on, stylize, tag } from "./19.js"
import { validate } from "./validate.js"
import { FocusGroupMixin } from "./focusgroup.js"
import { SelectableMixin } from "./selectable.js"
import { MultiSelectMixin } from "./multiselect.js"

const ilog = makelogger("tabs")

export const tabset = tag("aria-tabset", (tabset) => {
  internals(tabset, { role: "" })
  stylize(tabset, css`
    :host {
      display: flex;
      flex-direction: column;
    }
    :host(:has(aria-tablist[aria-orientation=vertical])) {
      flex-direction: row;
    }
  `)
})

export const tablist = tag(
  "aria-tablist",
  {
    mixins: [
      FocusGroupMixin,
      MultiSelectMixin,
      validate({ label: true, sChildren: "aria-tab" }),
    ],
  },
  (tablist) => {
    internals(tablist, { role: "tablist", ariaMultiSelectable: "false" })
    on(tablist, "attribute:aria-multiselectable", (e) => {
      if (e.detail.value === "true")
        $$(tablist, "aria-tab").forEach(tab => {
          internals(tab, { ariaExpanded: "false" })
          tab.ariaExpanded = (tab.ariaSelected === "true") ? "true" : null
        })
    })
  }
)

export const tab = tag(
  "aria-tab",
  {
    mixins: [
      observeAttributes("aria-controls", "aria-selected"),
      SelectableMixin,
      validate({ sParent: "aria-tablist" }),
    ],
  },
  (tab) => {
    internals(tab, { role: "tab" })
    stylize(tab, css`:host { display: flex; }`)

    on(tab, "attribute:aria-controls", (e) => {
      if ("ariaControlsElements" in tab)
        tab.panel = tab.ariaControlsElements[0]
      else
        tab.panel = tab.getRootNode().getElementById(e.detail.value)

      if (tab.panel)
        tab.panel.hidden = (tab.ariaSelected !== "true")
      else
        return console.error(tab, "has no associated <aria-tabpanel>")

      if ("ariaLabelledByElements" in internals(tab))
        internals(tab.panel, { ariaLabelledByElements: [tab] })
      else
        tab.panel.setAttribute("aria-labelledby", identify(tab))
    })

    on(tab, "attribute:aria-selected", (e) => {
      if (tab.panel) {
        tab.panel.hidden = (e.detail.value !== "true")
        if (tab.parentElement.ariaMultiSelectable === "true")
          tab.ariaExpanded = (tab.panel.hidden) ? null : "true"
      }
    })
  }
)

export const tabpanel = tag("aria-tabpanel", (tabpanel) => {
  internals(tabpanel, { role: "tabpanel" })
  stylize(tabpanel, css`:host { flex-grow: 1; }`)
})

// Define nested elements first
tabpanel.define()
tab.define()
tablist.define()
tabset.define()
