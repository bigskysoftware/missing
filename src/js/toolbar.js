//@deno-types=./19.ts
import { internals, on, tag } from "./19.js"
import { validate } from "./validate.js"
import { FocusGroupMixin } from "./focusgroup.js"

export const Toolbar = tag(
  "aria-toolbar",
  { mixins: [FocusGroupMixin] },
  (el) => {
		internals(el, { role: "toolbar" })
  }
)

Toolbar.define()
