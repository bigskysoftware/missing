//@deno-types=./19.ts
import { $, $$, halt, makelogger, mixin, on } from "./19.js"

const ilog = makelogger("selectable")

export const SelectableMixin = mixin(
  {
    internals: { ariaSelected: "false" },
    observedAttributes: ["tabindex"],
  },
  (el) => {

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
  }
)
