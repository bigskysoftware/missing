//@deno-types=./19.ts
import { $$, hotkey, mixin, off, on } from "./19.js"
import { AriaState, ariaState } from "./aria.js"

// TODO: Move to aria.js?
export const AriaMultiSelectable = mixin(
  [AriaState("multiSelectable")],
  (el) => {
    const sMember = ":state(selectable)"
    const sSelected = "[aria-selected=true]"
    let anchor = $$(el, sSelected).at(-1) || $$(el, sMember).at(0)

    const toggle = (member) => {
      ariaState(member, "selected", !ariaState(member, "selected") || null)
      if (ariaState(member, "selected"))
        anchor = member
    }

    // TODO: ArrowDown and ArrowUp kind of rely on orientation
    // TODO: APG only explicitly recommends these for listbox and tree
    const hotkeys = hotkey({
      "Shift+ArrowDown": (e) => {
        toggle(document.activeElement)
      },
      "Shift+ArrowUp": (e) => {
        toggle(document.activeElement)
      },
      "Shift+ ": (e) => {
        const members = $$(el, sMember)
        const start = members.indexOf(anchor)
        const end = members.indexOf(document.activeElement)
        members.slice(
          Math.min(start, end),
          Math.max(start, end) + 1,
        ).forEach(m => ariaState(m, "selected", true))
        anchor = members.at(end)
      },
      "Ctrl+Shift+Home": (e) => {
        const members = $$(el, sMember)
        const start = members.indexOf(document.activeElement)
        members.slice(0, start).forEach(m => ariaState(m, "selected", true))
        anchor = members.at(0)
      },
      "Ctrl+Shift+End": (e) => {
        const members = $$(el, sMember)
        const start = members.indexOf(document.activeElement)
        members.slice(start).forEach(m => ariaState(m, "selected", true))
        anchor = members.at(-1)
      },
      "Ctrl+A": (e) => {
        const members = $$(el, sMember)
        const all = members.every(m => ariaState(m, "selected"))
        members.forEach(m => ariaState(m, "selected", !all || null))
        anchor = (all) ? members.at(0) : members.at(-1)
      },
    }, { halt: "default" })

    let keys
    on(el, "attribute:aria-multiselectable", (e) => {
      if (e.detail.value === "true") {
        keys = on(el, "keydown", hotkeys)
      } else if (keys)
        off(keys)
    })
  }
)
