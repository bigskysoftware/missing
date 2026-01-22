// @deno-types=./43.ts
import { internals, tag } from "./43.js"
import { FocusGroupMixin } from "./focus.js"

export const Toolbar = tag(
  "aria-toolbar",
  { mixins: [FocusGroupMixin] },
  (el) => {
    internals(el, { role: "toolbar" })
  }
)

Toolbar.define()
