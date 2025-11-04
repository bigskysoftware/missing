//@deno-types=./19.ts
import { makelogger, mixin, on } from "./19.js"

const ilog = makelogger("checkable")

const roles = /** @type {const} */ ([
  "checkbox",
  "menuitemcheckbox",
  "menuitemradio",
  "radio",
  "switch",
])

export const CheckableMixin = mixin(
  {
    internals: { ariaChecked: "false" },
    observedAttributes: ["aria-checked", "aria-disabled"],
  },
  (el) => {

    const role = () => (el.internals || el).role

    if (!roles.includes(role()))
      return console.error(el, `role must be one of ${roles}; got ${role()}.`)

    el.internals.states.add("checkable")
    if (role() === "checkbox" || role() === "menuitemcheckbox")
      el.internals.states.add("tristate")

    on(el, "connected", (e) => {
      const isChecked = (el.ariaChecked || el.hasAttribute("checked"))
      const isMenuitem = (role().startsWith("menuitem"))
      el.tabIndex = (!isMenuitem || isChecked) ? 0 : -1
    })

    on(el, "attribute:aria-checked", (e) => {
      dispatch(el, "changed", {}, { bubbles: true })
    })
  }
)
