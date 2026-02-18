// @deno-types=./43.ts
import { internals, tag } from "./43.js"
import { FocusGroupMixin } from "./focus.js"

export const Toolbar = tag(
  "aria-toolbar",
  { mixins: [FocusGroupMixin] },
  (el) => {
    internals(el, { role: "toolbar" })
    observe(el, { subtree: true, childList: true }, update)

	  const update = () => {
      if (current()) return
      const ms = members()
      if (!ms.length) return
      const preferred = ms.find(
        m => ariaState(m, "checked") || ariaState(m, "selected")
      ) || ms[0]
      preferred.tabIndex = 0
    }

    on(el, "connected", (e) => update())
  }
)

Toolbar.define()
