//@deno-types=./19.ts
import { dispatch, internals, makelogger, mixin, observeAttributes, on, role, states } from "./19.js"
import { validate } from "./validate.js"

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
  [
    observeAttributes("tabindex", "aria-selected", "aria-disabled"),
    validate({ roles })
  ],
  (el) => {
    internals(el, { ariaSelected: "false" })
    states(el, ["selectable"])

    on(el, "connected", (e) => {
      const isSelected = (el.ariaSelected || el.hasAttribute("selected"))
      el.tabIndex = (isSelected) ? 0 : -1
    })

    on(el, "attribute:tabindex", (e) => {
      const container = el.closest(":state(focusgroup)")
      if (container && container.ariaMultiSelectable !== "true") {
        el.ariaSelected = (e.detail.value == "0") ? "true" : null
      }
    })

    on(el, "attribute:aria-selected", (e) => {
      dispatch(el, "changed", {}, { bubbles: true })
    })
  }
)
