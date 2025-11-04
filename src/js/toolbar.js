//@deno-types=./19.ts
import { tag } from "./19.js"
import { validate } from "./validate.js"
import { FocusGroupMixin } from "./focusgroup.js"

// TODO: Support focusability of disabled elements
export const toolbar = tag(
  "aria-toolbar",
  {
		internals: { role: "toolbar" },
		mixins: [FocusGroupMixin, validate({ label: true })],
	},
  (toolbar) => {}
)

toolbar.define()
