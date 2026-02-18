// @deno-types=./19.ts
// @deno-types=./43.ts
import { $$, attr, halt, makelogger, on } from "./19.js"
import { mixin } from "./43.js"
import { ariaProperty } from "./aria.js"
import { sFocusable, FocusGroupMixin } from "./focus.js"

const ilog = makelogger("typeahead")

const TIMEOUT = 500 // WAI-ARIA APG recommendation

export const TypeAheadMixin = mixin(
  [FocusGroupMixin],
  (el) => {

    const sMember = sFocusable
    // TODO: labelOf helper? c.f. validate.js
    const nameOf = (member) =>
      (ariaProperty(member, "label") || member.textContent.trim() || "").toLowerCase()

    // TODO: Cover international symbols with a test
    const validKey = (e) =>
      !(e.altKey || e.ctrlKey || e.metaKey) && e.key.match(/^.$/u)

    let state = { query: "", timeout: null }
    const reset = () => {
      clearTimeout(state.timeout)
      state = { query: "", timeout: null }
    }
    const find = (query) => {
      const members = $$(el, sMember)
      const start = members.indexOf(document.activeElement)
      for (let i = 0; i < members.length; i++) {
        const member = members[(start + i) % members.length]
        if (nameOf(member).startsWith(query))
          return member
      }
    }

    on(el, "keydown", (e) => {
      const current = document.activeElement
      if (!el.contains(current) || !validKey(e)) return

      halt("default", e)

      if (state.timeout) {
        state.query += e.key.toLowerCase()
        clearTimeout(state.timeout)
      } else {
        state.query = e.key
      }
      state.timeout = setTimeout(reset, TIMEOUT)

      const found = find(state.query)
      if (found) {
        current.removeAttribute("tabindex")
        found.tabIndex = 0
        found.focus()
      }
    })

    on(el, "disconnect", (e) => reset())
  }
)
