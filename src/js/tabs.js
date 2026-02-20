// @deno-types=./19.ts
// @deno-types=./43.ts
import { $$, css, makelogger, on } from "./19.js"
import { internals, stylize, tag, validate } from "./43.js"
import { FocusGroupMixin } from "./focus.js"
import { ariaRelatives, ariaState, AriaActions, AriaControls, AriaMultiSelectable, AriaSelected } from "./aria.js"

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
  { mixins: [FocusGroupMixin, AriaMultiSelectable] },
  (el) => {
    internals(el, { role: "tablist" })
    validate(el, { sChildren: "aria-tab", when: "connected" })

    on(el, "slotchange", (e) => {
      const tabs = e.detail.elements

      const panels = (el.parentElement.matches("aria-tabset"))
        ? $$(el.parentElement, "aria-tabpanel").map(p => [p])
        : tabs.map(tab => ariaRelatives(tab, "controls") || [])

      tabs.forEach((tab, i) => {
        internals(tab, { ariaControlsElements: panels[i] })
        panels[i].forEach(panel => {
          internals(panel, { ariaLabelledByElements: [tab] })
        })
      })

      const current = tabs.find(
        t => t.tabIndex == 0 || ariaState(t, "selected")
      ) || tabs[0]
      current.tabIndex = 0
      ariaState(current, "selected", true)
    })
  }
)

export const Tab = tag(
  "aria-tab",
  { mixins: [AriaActions, AriaSelected] },
  (el) => {

    internals(el, { role: "tab" })
    stylize(el, css`:host { display: flex; }`)
    validate(el, { sParent: "aria-tablist", when: "connected" })

    const tabset = () => el.matches("aria-tabset *")
      ? el.parentElement.parentElement
      : null
    const tablist = () => el.parentElement
    const siblings = () => [...tablist().children]
    const panels = () => tabset() ? $$(tabset(), "aria-tabpanel") : []

    const panel = () =>
      ariaRelatives(el, "controls") || [panels()[siblings().indexOf(el)]]

    // TODO: When this fires on "constructed", ariaControlsElements is null
    on(el, "attribute:aria-selected", (e) => {
      const multiselect = el.matches(":state(multiselectable) > *")
      panel().forEach(panel => {
        panel.hidden = (e.detail.value !== "true")
        ariaState(el, "expanded", (multiselect && !panel.hidden) || null)
      })
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
