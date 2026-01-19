//@deno-types=./19.ts
import { mixin, on, role } from "./19.js"
import { AriaDisabled } from "./disableable.js"
import { AriaState, ariaState } from "./aria.js"

// TODO: Move to aria.js?
// TODO: Should this inherit AriaDisabled or not?
export const AriaChecked = mixin(
  [AriaState("checked"), AriaDisabled],
  (el) => {
    states(el, {
      focusable: true,
      checkable: true,
      tristate: role(el) === "checkbox" || role(el) === "menuitemcheckbox",
    })

    on(el, "constructed", (e) => {
      const isChecked = (ariaState(el, "checked") || el.hasAttribute("checked"))
      const isMenuitem = (role(el).startsWith("menuitem"))
      el.tabIndex = (!isMenuitem || isChecked) ? 0 : -1
    })

    on(el, "attribute:aria-checked", (e) => {
      dispatch(el, "changed", {}, { bubbles: true })
    })
  }
)
