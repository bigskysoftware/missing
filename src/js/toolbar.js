//@deno-types=./19.ts
import { internals, tag } from "./19.js"
import { validate } from "./validate.js"
import { FocusGroupMixin } from "./focusgroup.js"

export const toolbar = tag(
  "aria-toolbar",
  { mixins: [FocusGroupMixin, validate({ label: true })] },
  (toolbar) => {
		internals(toolbar, { role: "toolbar" })
  }
)

toolbar.define()
