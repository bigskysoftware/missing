//@deno-types=./19.ts
import { makelogger, mixin, on } from "./19.js"

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
  {
    internals: { ariaSelected: "false" },
    observedAttributes: ["tabindex", "aria-selected"],
  },
  (el) => {

    const role = () => (el.internals || el).role

    if (!roles.includes(role()))
      return console.error(el, `role must be one of ${roles}; got ${role()}.`)

    el.internals.states.add("selectable")

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
