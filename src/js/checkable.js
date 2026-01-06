//@deno-types=./19.ts
import { makelogger, mixin, on, role } from "./19.js"
import { validate } from "./validate.js"

const ilog = makelogger("checkable")

const roles = /** @type {const} */ ([
  "checkbox",
  "menuitemcheckbox",
  "menuitemradio",
  "radio",
  "switch",
])

export const CheckableMixin = mixin(
  [
    observeAttributes("aria-checked", "aria-disabled"),
    validate({ roles }),
  ],
  (el) => {
    internals(el, { ariaChecked: "false" })
    states(el, {
      checkable: true,
      tristate: role(el) === "checkbox" || role(el) === "menuitemcheckbox",
    })

    on(el, "connected", (e) => {
      const isChecked = (el.ariaChecked || el.hasAttribute("checked"))
      const isMenuitem = (role(el).startsWith("menuitem"))
      el.tabIndex = (!isMenuitem || isChecked) ? 0 : -1
    })

    on(el, "attribute:aria-checked", (e) => {
      dispatch(el, "changed", {}, { bubbles: true })
    })
  }
)
