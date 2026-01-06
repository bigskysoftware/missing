//@deno-types=./19.ts
import { $, $$, halts, hotkey, makelogger, mixin, observeAttributes, off, on } from "./19.js"

const ilog = makelogger("multiselect")

// TODO: Should this extend FocusGroupMixin?
export const MultiSelectMixin = mixin(
  [observeAttributes("aria-multiselectable")],
  (multiselect) => {

    const sMember = ":state(selectable)"
    const sSelected = "[aria-selected=true]"
    let anchor = $$(multiselect, sSelected).at(-1) || $$(multiselect, sMember).at(0)

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
        const members = $$(multiselect, sMember)
        const start = members.indexOf(anchor)
        const end = members.indexOf(document.activeElement)
        members.slice(
          Math.min(start, end),
          Math.max(start, end) + 1,
        ).forEach(m => m.ariaSelected = "true")
        anchor = members.at(end)
      }),
      "Ctrl+Shift+Home": halts("default", (e) => {
        const members = $$(multiselect, sMember)
        const start = members.indexOf(document.activeElement)
        members.slice(0, start).forEach(m => m.ariaSelected = "true")
        anchor = members.at(0)
      }),
      "Ctrl+Shift+End": halts("default", (e) => {
        const members = $$(multiselect, sMember)
        const start = members.indexOf(document.activeElement)
        members.slice(start).forEach(m => m.ariaSelected = "true")
        anchor = members.at(-1)
      }),
      "Ctrl+A": halts("default", (e) => {
        const members = $$(multiselect, sMember)
        const all = members.every(m => m.ariaSelected === "true")
        members.forEach(m => m.ariaSelected = all ? null : "true")
        anchor = (all) ? members.at(0) : members.at(-1)
      }),
    })

    let keys, click
    on(multiselect, "attribute:aria-multiselectable", (e) => {
      if (e.detail.value === "true") {
        keys = on(multiselect, "keydown", hotkeys)
        click = on(multiselect, "click", (e) => toggle(e.target))
      } else if (keys || click)
        off(keys), off(click)
    })
  }
)
