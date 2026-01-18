//@deno-types=./19.ts
import { halt, internals, makelogger, mixin, observeAttributes, on, states } from "./19.js"
import { ariaState, AriaState } from "./aria.js"
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

export const DisableableMixin = mixin([AriaState("disabled")], (el) => {
  validate(el, { roles, when: "connected" })
  on(el, "click", (e) => {
    if (ariaState(el, "disabled"))
      halt("default bubbling propagation", ilog("inhibited event:", e))
  })
})
