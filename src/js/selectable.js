//@deno-types=./19.ts
import { dispatch, halt, makelogger, mixin, on, states } from "./19.js"
import { validate } from "./validate.js"
import { AriaDisabled } from "./disableable.js"
import { AriaState, ariaState } from "./aria.js"

const ilog = makelogger("aria-selected")

// TODO: Move to aria.js?
// TODO: Should this inherit AriaDisabled or not?
export const AriaSelected = mixin(
  [AriaState("selected"), AriaDisabled],
  (el) => {
    states(el, ["focusable", "selectable"])

    const selectionFollowsFocus = () => !el.matches(
      ":state(multiselectable) > *, :state(multiselectable) > :state(group) > *"
    )

    // TODO: This might be the responsibility of a select container
    on(el, "constructed", (e) => {
      const isSelected = (ariaState(el, "selected") || el.hasAttribute("selected"))
      el.tabIndex = (isSelected) ? 0 : -1
    })

    on(el, "focus", (e) => {
      if (selectionFollowsFocus())
        ariaState(el, "selected", true)
    })

    on(el, "blur", (e) => {
      if (selectionFollowsFocus() && el.closest(":state(focusgroup)").contains(e.relatedTarget))
        ariaState(el, "selected", null)
    })

    on(el, "click", (e) => {
      if (selectionFollowsFocus())
        ilog("How to remove ariaSelected frome existing el?")
      else
        ariaState(el, "selected", !ariaState(el, "selected") || null)
    })

    on(el, "keydown", (e) => {
      if (!selectionFollowsFocus() && e.key === " ") {
        halt("default propagation", e)
        ariaState(el, "selected", !ariaState(el, "selected") || null)
      }
    })

    on(el, "attribute:aria-selected", (e) => {
      dispatch(el, "changed", {}, { bubbles: true })
    })
  }
)
