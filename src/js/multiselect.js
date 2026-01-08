//@deno-types=./19.ts
import { $, $$, halts, hotkey, internals, makelogger, mixin, observeAttributes, off, on } from "./19.js"
import { validate } from "./validate.js"

const ilog = makelogger("multiselect")

const roles = /** @type {const} */ ([
  "grid",     // super: composite role
  "listbox",  // super: compsite > select role
  "tablist",  // super: composite role
  "tree",     // super: composite > select role
])

// TODO: This is really "AriaMultiselectablePropertyMixin".
export const MultiSelectMixin = mixin(
  [observeAttributes("aria-multiselectable")],
  (el) => {

    const sMember = ":state(selectable)"
    const sSelected = "[aria-selected=true]"
    let anchor = $$(el, sSelected).at(-1) || $$(el, sMember).at(0)

    const toggle = (member) => {
      member.ariaSelected = (member.ariaSelected === "true") ? null : "true"
      if (member.ariaSelected)
        anchor = member
    }

    const hotkeys = hotkey({
      " ": halts("default", (e) => {
        toggle(e.target)
      }),
      "Shift+ArrowDown": halts("default", (e) => {
        toggle(document.activeElement)
      }),
      "Shift+ArrowUp": halts("default", (e) => {
        toggle(document.activeElement)
      }),
      "Shift+ ": halts("default", (e) => {
        const members = $$(el, sMember)
        const start = members.indexOf(anchor)
        const end = members.indexOf(document.activeElement)
        members.slice(
          Math.min(start, end),
          Math.max(start, end) + 1,
        ).forEach(m => m.ariaSelected = "true")
        anchor = members.at(end)
      }),
      "Ctrl+Shift+Home": halts("default", (e) => {
        const members = $$(el, sMember)
        const start = members.indexOf(document.activeElement)
        members.slice(0, start).forEach(m => m.ariaSelected = "true")
        anchor = members.at(0)
      }),
      "Ctrl+Shift+End": halts("default", (e) => {
        const members = $$(el, sMember)
        const start = members.indexOf(document.activeElement)
        members.slice(start).forEach(m => m.ariaSelected = "true")
        anchor = members.at(-1)
      }),
      "Ctrl+A": halts("default", (e) => {
        const members = $$(el, sMember)
        const all = members.every(m => m.ariaSelected === "true")
        members.forEach(m => m.ariaSelected = all ? null : "true")
        anchor = (all) ? members.at(0) : members.at(-1)
      }),
    })

    internals(el, { ariaMultiSelectable: "false" })

    on(el, "connected", (e) => validate(el, { roles }))

    let keys, click
    on(el, "attribute:aria-multiselectable", (e) => {
      if (e.detail.value === "true") {
        keys = on(el, "keydown", hotkeys)
        click = on(el, "click", (e) => toggle(e.target))
      } else if (keys || click)
        off(keys), off(click)
    })
  }
)
