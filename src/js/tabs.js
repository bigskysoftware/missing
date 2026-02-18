// @deno-types=./19.ts
// @deno-types=./43.ts
import { $$, attr, css, identify, makelogger, on } from "./19.js"
import { internals, observeAttributes, shadow, stylize, tag, validate } from "./43.js"
import { sFocusable, FocusGroupMixin } from "./focus.js"
import { ariaProperty, ariaRelatives, ariaState, AriaControls, AriaMultiSelectable, AriaSelected } from "./aria.js"

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

    on(el, "focusgroup:update", (e) => {
      ariaState(e.detail.preferred, "selected", true)
    })
  }
)

export const Tab = tag(
  "aria-tab",
  { mixins: [AriaControls, AriaSelected] },
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

    })

    on(el, "attribute:aria-selected", (e) => {
      const multiselectable = (ariaProperty(el.parentElement, "multiSelectable") === "true")
      ariaRelatives(el, "controls").forEach(panel => {
        panel.hidden = (e.detail.value !== "true")
        if (multiselectable)
          ariaState(el, "expanded", !panel.hidden || null)
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
