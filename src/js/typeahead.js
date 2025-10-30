//@deno-types=./19.ts
import { $$, halt, makelogger, mixin, on } from "./19.js"

const ilog = makelogger("type-ahead")

const TIMEOUT = 500 // WAI-ARIA APG recommendation

// TODO: Not compatible with aria-activedescendent.
// TODO: Should this extend FocusGroupMixin?
export const TypeAheadMixin = mixin(
  (group) => {

    const sMember = "[tabindex]:not(:state(focusgroup))"
    const current = () => group.contains(document.activeElement)
      ? document.activeElement
      : null

    const nameOf = (member) =>
      (member.ariaLabel || member.textContent.trim() || "").toLowerCase()

    const validKey = (e) =>
      !(e.altKey || e.ctrlKey || e.metaKey) && e.key.match(/^.$/u)

    let state = { query: "", timeout: null }
    const reset = () => {
      clearTimeout(state.timeout)
      state = { query: "", timeout: null }
    }
    const find = (query) => {
      const members = $$(group, sMember)
      const start = members.indexOf(document.activeElement)
      for (let i = 0; i < members.length; i++) {
        const member = members[(start + i) % members.length]
        if (nameOf(member).startsWith(query))
          return member
      }
    }

    on(group, "keydown", (e) => {
      if (current() === null || !validKey(e)) return

      halt("default", e)

      if (state.timeout) {
        state.query += e.key.toLowerCase()
        clearTimeout(state.timeout)
      } else {
        state.query = e.key
      }
      state.timeout = setTimeout(reset, TIMEOUT)

      const found = find(state.query)
      if (found) found.focus()
    })

    on(group, "disconnect", (e) => reset())
  }
)
