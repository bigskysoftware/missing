//@deno-types=./19.ts
import { $$, css, makelogger, on, tag } from "./19.js"
import { validate } from "./validate.js"
import { FocusGroupMixin } from "./focusgroup.js"
import { SelectableMixin } from "./selectable.js"
import { MultiSelectMixin } from "./multiselect.js"

const ilog = makelogger("tabs")

export const tabset = tag(
  "aria-tabset",
  {
    internals: { role: "" },
    css: css`
      :host {
        display: flex;
        flex-direction: column;
      }
      :host(:has(aria-tablist[aria-orientation=vertical])) {
        flex-direction: row;
      }
    `,
  },
  (tabset) => {
  }
)

export const tablist = tag(
  "aria-tablist",
  {
    internals: { role: "tablist", ariaMultiSelectable: "false" },
    mixins: [
      FocusGroupMixin,
      MultiSelectMixin,
      validate({ label: true, sChildren: "aria-tab" }),
    ],
  },
  (tablist) => {
    on(tablist, "attribute:aria-multiselectable", (e) => {
      if (e.detail.value === "true")
        $$(tablist, "aria-tab").forEach(tab => {
          tab.internals.ariaExpanded = false
          tab.ariaExpanded = (tab.ariaSelected === "true") ? "true" : null
        })
    })
  }
)

export const tab = tag(
  "aria-tab",
  {
    internals: { role: "tab" },
    mixins: [
      SelectableMixin,
      validate({ sParent: "aria-tablist" }),
    ],
    observedAttributes: ["aria-controls", "aria-selected"],
    css: css`:host { display: flex; }`,
  },
  (tab) => {

    on(tab, "attribute:aria-controls", (e) => {
      if ("ariaControlsElements" in tab)
        tab.panel = tab.ariaControlsElements[0]
      else
        tab.panel = tab.getRootNode().getElementById(e.detail.value)

      if (tab.panel)
        tab.panel.hidden = (tab.ariaSelected !== "true")
      else
        return console.error(tab, "has no associated <aria-tabpanel>")

      if ("ariaLabelledByElements" in tab.internals)
        tab.panel.internals.ariaLabelledByElements = [tab]
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

export const tabpanel = tag(
  "aria-tabpanel",
  {
    internals: { role: "tabpanel" },
    css: css`:host { flex-grow: 1; }`,
  },
  (tabpanel) => {},
)

// Define nested elements first
tabpanel.define()
tab.define()
tablist.define()
tabset.define()
