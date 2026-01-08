//@deno-types=./19.ts
import { $$, css, internals, makelogger, observeAttributes, on, stylize, tag } from "./19.js"
import { validate } from "./validate.js"
import { FocusGroupMixin } from "./focusgroup.js"
import { SelectableMixin } from "./selectable.js"
import { MultiSelectMixin } from "./multiselect.js"

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
  { mixins: [FocusGroupMixin, MultiSelectMixin] },
  (el) => {
    internals(el, { role: "tablist", ariaMultiSelectable: "false" })

    on(el, "connected", (e) =>
      validate(el, { label: true, sChildren: "aria-tab" }))

    on(el, "attribute:aria-multiselectable", (e) => {
      if (e.detail.value === "true")
        // TODO: initChildren?
        $$(el, "aria-tab").forEach(tab => {
          internals(tab, { ariaExpanded: "false" })
          tab.ariaExpanded = (tab.ariaSelected === "true") ? "true" : null
        })
    })
  }
)

export const Tab = tag(
  "aria-tab",
  { mixins: [observeAttributes("aria-controls"), SelectableMixin] },
  (el) => {
    internals(el, { role: "tab" })
    stylize(el, css`:host { display: flex; }`)

    on(el, "connected", (e) =>
      validate(el, { sParent: "aria-tablist" }))

    // TODO: Is el.panel getting too close to making an API?
    //       Should we just directly reference ariaControlsElements?
    on(el, "attribute:aria-controls", (e) => {
      // TODO: This event will fire if someone does `t.ariaControlsElements = [ts]`, but
      // if ts doesn't have an id, then the event detail will be "", so our
      // initial check might not be best. How to set el.panel in this case?
      // TODO: Why did this run twice?
      //ilog(e)  // TODO: when using t.ariaControlsElements = [tp], does this work?
      if (!e.detail.value)
        return el.panel = null

      if ("ariaControlsElements" in el)
        el.panel = el.ariaControlsElements[0]
      else
        el.panel = el.getRootNode().getElementById(e.detail.value)

      if (el.panel)
        el.panel.hidden = (el.ariaSelected !== "true")
      else
        return console.error(el, "has no associated <aria-tabpanel>")

      if ("ariaLabelledByElements" in internals(el))
        internals(el.panel, { ariaLabelledByElements: [el] })
      else
        el.panel.setAttribute("aria-labelledby", identify(el))
    })

    on(el, "attribute:aria-selected", (e) => {
      if (el.panel) {
        el.panel.hidden = (e.detail.value !== "true")
        if (el.parentElement.ariaMultiSelectable === "true")
          el.ariaExpanded = (el.panel.hidden) ? null : "true"
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
