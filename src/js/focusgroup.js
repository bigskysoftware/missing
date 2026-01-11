//@deno-types=./19.ts
import { $, $$, css, halt, halts, hotkey, internals, makelogger, mixin, observeAttributes, on, states, stylize, tag, traverse } from "./19.js"
import { validate } from "./validate.js"
import { DisableableMixin } from "./disableable.js"

const ilog = makelogger("focus-group")

// keyTable[writing-mode][direction][key] => action

const keyTable = /** @type {const} */ ({
  "horizontal-tb": {
    "ltr": {
      "vertical": { "Up": "previous", "Down": "next" },
      "horizontal": { "Left": "previous", "Right": "next" },
    },
    "rtl": {
      "vertical": { "Up": "previous", "Down": "next" },
      "horizontal": { "Right": "previous", "Left": "next" },
    },
  },
  "vertical-lr": {
    "ltr": {
      "vertical": { "Left": "previous", "Right": "next" },
      "horizontal": { "Up": "previous", "Down": "next" },
    },
    "rtl": {
      "vertical": { "Left": "previous", "Right": "next" },
      "horizontal": { "Down": "previous", "Up": "next" },
    },
  },
  "vertical-rl": {
    "ltr": {
      "vertical": { "Right": "previous", "Left": "next" },
      "horizontal": { "Up": "previous", "Down": "next" },
    },
    "rtl": {
      "vertical": { "Right": "previous", "Left": "next" },
      "horizontal": { "Down": "previous", "Up": "next" },
    },
  },
})

const roles = /** @type {const} */ ([
  "grid",
  "tablist",
  "listbox",
  "menu",
  "menubar",
  "radiogroup",
  "tree",
  "treegrid",
  "toolbar",
])

export const FocusGroupMixin = mixin(
  [observeAttributes("aria-orientation"), DisableableMixin],
  (el) => {

    const writingMode = () => getComputedStyle(el).writingMode
    const direction = () => getComputedStyle(el).direction
    const orientation = () => el.attr("ariaOrientation")
    const wrapping = ()  => el.hasAttribute("wrap")

    const movement = (key) =>
      keyTable[writingMode()][direction()][orientation()][key]

    // const sMember = "[tabindex]:not(:state(focusgroup))"
    const sMember = "[tabindex]:not(:scope :state(focusgroup) [tabindex])"
    const current = () => el.contains(document.activeElement)
      ? document.activeElement
      : null

    const focusTo = (dest) => {
      // TODO: :scope resolves differently in $$(el, sMember) and cursor.matches(sMember)
      const members = $$(el, sMember)
      if (!members.includes(dest)) return
      members.forEach(member => member.tabIndex = -1)
      dest.tabIndex = 0
      dest.focus()
    }

    internals(el, { ariaOrientation: "horizontal" })
    states(el, ["focusgroup"])
    stylize(el, css`
      :host {
        display: flex;
        flex-direction: var(--flex-direction);
        inline-size: fit-content;
      }
      :host(:state(horizontal)) { --flex-direction: row; }
      :host(:state(vertical))   { --flex-direction: column; }
    `)

    on(el, "connected", (e) => {
      validate(el, { label: true, roles: roles })

      // TODO: initChildren?
      const members = $$(el, sMember)
      const initialized = members.filter(m => m.tabIndex == 0 || m.autofocus)
      if (members.length && !initialized.length)
        members[0].tabIndex = 0
    })

    on(el, "focusin", (e) => focusTo(e.target))

    on(el, "keydown", hotkey({
      "Home": (e) => focusTo($(el, sMember)),
      "End":  (e) => focusTo($$(el, sMember).at(-1)),
    }, { halt: "default propagation" }))

    on(el, "keydown", (e) => {
      const mvt = e.key.startsWith("Arrow") && movement(e.key.slice(5))
      if (mvt) {
        halt("default", e)
        focusTo(traverse(mvt, el, sMember, current(), { wrap: wrapping() }))
      }
    })

    on(el, "attribute:aria-orientation", (e) => {
      const state = el.attr("ariaOrientation")
      states(el, {
        horizontal: state === "horizontal",
        vertical: state === "vertical",
      })
    })
  }
)

export const FocusGroup = tag(
  "focus-group",
  { mixins: [FocusGroupMixin] },
  (el) => {}
)

FocusGroup.define()
