import { $, $$, attr, on, dispatch, halt, halts, hotkey, tag, traverse, makelogger } from "./19.js"

const ilog = makelogger("focus-group")

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
  "vertical-rl": {
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
    if (!group.hasAttribute("aria-labelledby") && !group.hasAttribute("aria-label"))
      ilog("ERROR:", group, "has no accessible name (aria-label or aria-labelledby)")

    const writingMode = () => getComputedStyle(group).writingMode
    const direction = () => getComputedStyle(group).direction
    const orientation = () => group.getAttribute("orientation") ?? "inline"
    const wrapping = () => group.hasAttribute("wrap")

    const movement = (key) =>
      keyTable[writingMode()][direction()][orientation()][key]

    const current = () => group.contains(document.activeElement)
      ? document.activeElement
      : null

    const sMember = '[tabindex]:not([focusgroup="none"] *)'

    const focusTo = (dest) => {
      if (!dest) return
      $$(group, sMember).forEach(member => member.tabIndex = -1)
      dest.tabIndex = 0
      dest.focus()
    }

    on(group, "connected", (e) => {
      const members = $$(group, sMembers)
      const initialized = members.find(m => m.tabIndex == 0 || m.autofocus )
      if (members.length && !initialized)
        members[0].tabIndex = 0

     if (!group.hasAttribute("orientation"))
        dispatch(group, "attribute:orientation", {})
    })

    on(group, "focusin", (e) => focusTo(e.target))

    on(group, "keydown", hotkey({
      "Home": halts("default propagation", (e) => focusTo($(group, sMember))),
      "End":  halts("default propagation", (e) => focusTo($$(group, sMember).at(-1))),
    }))

    on(group, "keydown", (e) => {
      const mvt = e.key.startsWith("Arrow") && movement(e.key.slice(5))
      if (mvt) {
        halt("default propagation", e)
        focusTo(traverse(mvt, group, sMember, current(), { wrap: wrapping() }))
      }
    })

    on(group, "attribute:orientation", (e) => {
      group.internals.ariaOrientation = {
        horizontal: { block: "vertical",   inline: "horizontal" },
        vertical:   { block: "horizontal", inline: "vertical"   },
      }[writingMode().split("-")[0]][orientation()]
    })
  }
)

focusGroup.define()
