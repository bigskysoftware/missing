//@deno-types=./19.ts
import { halt, internals, makelogger, mixin, observeAttributes, on, states } from "./19.js"
import { validate } from "./validate.js"

const ilog = makelogger("disableable")

const roles = /** @type {const} */ ([
  "application",
  "button",
  "composite", "grid", "spinbutton", "tablist", "select", "listbox", "menu", "menubar", "radiogroup", "tree", "treegrid",
  "gridcell", "columnheader", "rowheader",
  "group", "row", "select", "toolbar",
  "input", "checkbox", "switch", "combobox", "option", "radio", "treeitem", "slider", "spinbutton", "textbox", "searchbox",
  "link",
  "menuitem", "menuitemcheckbox", "menuitemradio",
  "scrollbar",
  "separator",
  "tab",
])

export const DisableableMixin = mixin(
  [observeAttributes("aria-disabled")],
  (el) => {
    internals(el, { ariaDisabled: "false" })

    on(el, "connected", (e) => validate(el, { roles }))

    on(el, "attribute:aria-disabled", (e) => {
      states(el, { disabled: e.value === "true" })
    })

    on(el, "click", (e) => {
      if (el.ariaDisabled === "true")
        halt("default bubbling propagation", e)
    })
  }
)
