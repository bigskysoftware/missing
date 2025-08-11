import { $, $$, on, halt, halts, hotkey, tag, traverse } from "./19.js";

// keyTable[writing-mode][direction][key] => action

const keyTable = /** @type {const} */ ({
  "horizontal-tb": {
    "ltr": {
      "block": { "Up": "previous", "Down": "next" },
      "inline": { "Left": "previous", "Right": "next" },
    },
    "rtl": {
      "block": { "Up": "previous", "Down": "next" },
      "inline": { "Right": "previous", "Left": "next" },
    },
  },
  "vertical-lr": {
    "ltr": {
      "block": { "Left": "previous", "Right": "next" },
      "inline": { "Up": "previous", "Down": "next" },
    },
    "rtl": {
      "block": { "Left": "previous", "Right": "next" },
      "inline": { "Down": "previous", "Up": "next" },
    },
  },
  "vertical-lr": {
    "ltr": {
      "block": { "Right": "previous", "Left": "next" },
      "inline": { "Up": "previous", "Down": "next" },
    },
    "rtl": {
      "block": { "Right": "previous", "Left": "next" },
      "inline": { "Down": "previous", "Up": "next" },
    },
  },
})

export const focusGroup = tag(
  "focus-group",
  { observedAttributes: ["orientation"] },
  (group) => {
    const writingMode = () => getComputedStyle(group).writingMode
    const direction = () => getComputedStyle(group).direction
    const orientation = () => group.getAttribute("aria-orientation") ?? "inline"
    const wrapping = () => group.hasAttribute("wrap")

    const movement = (key) =>
      keyTable[writingMode()][direction()][orientation()][key]

    const current = () => group.contains(document.activeElement)
      ? document.activeElement
      : null

    const sMember = "[tabindex]"

    const focusTo = (dest) => {
      if (!dest) return
      $$(group, sMember).forEach(member => member.tabIndex = -1)
      dest.tabIndex = 0
      dest.focus()
    }

    on(group, "keydown", hotkey({
      "Home": (e) => halts("default propagation", e,
        () => focusTo($(group, sMember))),
      "End": (e) => halts("default propagation", e,
        () => focusTo($$(group, sMember).at(-1))),
    }))

    on(group, "keydown", (e) => {
      const mvt = e.key.startsWith("Arrow") && movement(e.key.slice(5))
      if (mvt) {
        halt("default propagation", e)
        focusTo(traverse(mvt, group, sMember, current(), { wrap: wrapping() }))
      }
    })

    on(group, "focusin", (e) => focusTo(e.target))

    on(group, "attribute:orientation", e =>
      group.internals.ariaOrientation = orientation())
  }
)

focusGroup.define()
