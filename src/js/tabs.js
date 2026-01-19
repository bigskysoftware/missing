//@deno-types=./19.ts
import { $$, attr, css, internals, makelogger, observeAttributes, on, stylize, tag } from "./19.js"
import { validate } from "./validate.js"
import { FocusGroupMixin } from "./focusgroup.js"
import { AriaSelected } from "./selectable.js"
import { AriaMultiSelectable } from "./multiselect.js"
import { AriaDisabled } from "./disableable.js"
import { ariaRelatives, ariaState } from "./aria.js"

const ilog = makelogger("tabs")

export const TabSet = tag("aria-tabset", (el) => {
  internals(el, { role: "presentation" })
  stylize(el, css`
    :host {
      display: flex;
      flex-direction: var(--flex-direction);
    }
    :host(:has(aria-tablist:state(horizontal))) { --flex-direction: column; }
    :host(:has(aria-tablist:state(vertical)))   { --flex-direction: row;    }
  `)
})

export const TabList = tag(
  "aria-tablist",
  { mixins: [FocusGroupMixin, AriaMultiSelectable, AriaDisabled] },
  (el) => {
    internals(el, { role: "tablist", ariaMultiSelectable: "false" })
    validate(el, { label: true, sChildren: "aria-tab", when: "connected" })

    on(el, "attribute:aria-multiselectable", (e) => {
      if (e.detail.value === "true")
        // TODO: initChildren?
        $$(el, "aria-tab").forEach(tab => {
          internals(tab, { ariaExpanded: "false" })
          ariaState(tab, "expanded", ariaState(tab, "selected"))
        })
    })
  }
)

export const Tab = tag(
  "aria-tab",
  { mixins: [observeAttributes("aria-controls"), AriaSelected, AriaDisabled] },
  (el) => {

    internals(el, { role: "tab" })
    stylize(el, css`:host { display: flex; }`)
    validate(el, { sParent: "aria-tablist", when: "connected" })

    // TODO: Crucial for authors to use [aria-controls] or can we use internals?
    on(el, "attribute:aria-controls", (e) => {
      if (!(e.detail.value || ariaRelatives(el, "controls").length))
        return

      const panel = ariaRelatives(el, "controls")[0]
      if (panel)
        panel.hidden = (ariaState(el, "selected") !== "true")
      else
        return console.error(el, "has no associated <aria-tabpanel>")

      // TODO: browerlist: ariaControlsElements, ariaLabelledByElements
      if ("ariaLabelledByElements" in internals(el))
        internals(panel, { ariaLabelledByElements: [el] })
      else
        panel.setAttribute("aria-labelledby", identify(el))
    })

    on(el, "attribute:aria-selected", (e) => {
      const panel = controlledBy(el)[0]
      if (panel) {
        panel.hidden = (e.detail.value !== "true")
        if (el.parentElement.ariaMultiSelectable === "true")
          ariaState(el, "expanded", !panel.hidden || null)
      }
    })
  }
)

export const TabPanel = tag("aria-tabpanel", (el) => {
  internals(el, { role: "tabpanel" })
  stylize(el, css`:host { flex-grow: 1; }`)
})

// Define nested elements first
TabPanel.define()
Tab.define()
TabList.define()
TabSet.define()
