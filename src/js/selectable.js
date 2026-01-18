//@deno-types=./19.ts
import { dispatch, internals, makelogger, mixin, observeAttributes, on, role, states } from "./19.js"
import { validate } from "./validate.js"
import { DisableableMixin } from "./disableable.js"
import { ariaState } from "./aria.js"

const ilog = makelogger("selectable")

const roles = /** @type {const} */ ([
  "gridcell",
  "option",
  "row",
  "tab",
  "columnheader",
  "rowheader",
  "treeitem",
])

export const SelectableMixin = mixin(
  [observeAttributes("tabindex", "aria-selected"), DisableableMixin],
  (el) => {
    internals(el, { ariaSelected: "false" })
    states(el, ["selectable"])

    // TODO: This might be the responsibility of a select container
    on(el, "constructed", (e) => {
      const isSelected = (ariaState(el, "selected") || el.hasAttribute("selected"))
      el.tabIndex = (isSelected) ? 0 : -1
    })

    on(el, "connected", (e) => validate(el, { roles }))

    on(el, "attribute:tabindex", (e) => {
      const container = el.closest(":state(focusgroup)")
      if (container && !ariaState(container, "multiSelectable")) {
        ariaState(el, "selected", e.detail.value == "0" || null)
      }
    })

    on(el, "attribute:aria-selected", (e) =>
      dispatch(el, "changed", {}, { bubbles: true }))
  }
)
