// @deno-types=./19.ts
// @deno-types=./43.ts
import { $$, halt, makelogger, on } from "./19.js"
import { accName, mixin } from "./43.js"
import { ariaProperty } from "./aria.js"
import { FocusGroupMixin } from "./focus.js"

const ilog = makelogger("typeahead")

const TIMEOUT = 500 // WAI-ARIA APG recommendation

export const TypeAheadMixin = mixin(
  [FocusGroupMixin],
  (el) => {

    const sMember = ":state(focusable)"

    const validKey = (e) =>
      !(e.altKey || e.ctrlKey || e.metaKey) && e.key.match(/^.$/u)

    let state = { query: "", timeout: null }
    const reset = () => {
      clearTimeout(state.timeout)
      state = { query: "", timeout: null }
    }
    const find = (query) => {
      const ms = $$(el, sMember)
      const start = ms.indexOf(document.activeElement)
      for (let i = 0; i < ms.length; i++) {
        const m = ms[(start + i) % ms.length]
        if (accName(m).toLowerCase().startsWith(query))
          return m
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
