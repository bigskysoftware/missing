//@deno-types=./19.ts
import { $, $$, css, halt, halts, hotkey, internals, makelogger, mixin, observeAttributes, on, states, stylize, tag, traverse } from "./19.js"
import { validate } from "./validate.js"

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

export const FocusGroupMixin = mixin(
  [observeAttributes("aria-orientation")],
  (group) => {

    const writingMode = () => getComputedStyle(group).writingMode
    const direction = () => getComputedStyle(group).direction
    const orientation = () => (group.ariaOrientation || internals(group).ariaOrientation)
    const wrapping = ()  => group.hasAttribute("wrap")

    const movement = (key) =>
      keyTable[writingMode()][direction()][orientation()][key]

    const sMember = "[tabindex]:not(:state(focusgroup))"
    const current = () => group.contains(document.activeElement)
      ? document.activeElement
      : null

    const focusTo = (dest) => {
      if (!dest) return
      $$(group, sMember).forEach(member => member.tabIndex = -1)
      dest.tabIndex = 0
      dest.focus()
    }

    internals(group, { ariaOrientation: "horizontal" })
    states(group, ["focusgroup"])
    
    stylize(group, css`
      :host {
        display: flex;
        flex-direction: var(--flex-direction);
        inline-size: fit-content;
      }
      :host(:state(horizontal)) { --flex-direction: row; }
      :host(:state(vertical)) { --flex-direction: column; }
    `)

    on(group, "connected", (e) => {
      const members = $$(group, sMember)
      const initialized = members.filter(m => m.tabIndex == 0 || m.autofocus)
      if (members.length && !initialized.length)
        members[0].tabIndex = 0
    })

    on(group, "focusin", (e) => focusTo(e.target))

    on(group, "keydown", hotkey({
      "Home": halts("default propagation", (e) => focusTo($(group, sMember))),
      "End":  halts("default propagation", (e) => focusTo($$(group, sMember).at(-1))),
    }))

    on(group, "keydown", (e) => {
      const mvt = e.key.startsWith("Arrow") && movement(e.key.slice(5))
      if (mvt) {
        halt("default", e)
        focusTo(traverse(mvt, group, sMember, current(), { wrap: wrapping() }))
      }
    })

    on(group, "attribute:aria-orientation", (e) => {
      const state = group.attr("ariaOrientation")
      states(group, {
        horizontal: state === "horizontal",
        vertical: state === "vertical",
      })
    })
  }
)

export const focusGroup = tag(
  "focus-group",
  { mixins: [FocusGroupMixin, validate({ label: true })] },
  (group) => {}
)

focusGroup.define()
