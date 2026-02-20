// @deno-types=./19.ts
// @deno-types=./43.ts
import { $, $$, halt, hotkey, makelogger, on, traverse } from "./19.js"
import { mixin, states, validate } from "./43.js"
import { ariaProperty, AriaOrientation } from "./aria.js"

const ilog = makelogger("focus-group")

// TODO: Haven't been able to figure out selector to ignore all
//       negative values except INACTIVE_TABINDEX. The problem
//       is how to support e.g. button[tabindex=-7822865] but
//       not button[tabindex=-1], button[tabindex=-2], etc.
export const INACTIVE_TABINDEX = /** @type {const} */ -7822865
export const sFocusable = /** @type {const} */ `
  :is(
    [tabindex],
    :is(a, area)[href],
    :is(audio, video)[controls],
    :is(img, object)[usemap],
    button, details, embed, iframe, input, select, textarea,
    :state(focusable)
  ):not(
    [tabindex='-1'],
    [disabled],
    [hidden] *,
    :state(disabled),
    :state(focusgroup-disable) *
  )
`

// keyTable[writing-mode][direction][key] => action
export const keyTable = /** @type {const} */ ({
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
  [AriaOrientation],
  (el) => {
    states(el, ["focusgroup"])
    validate(el, { label: true, when: "connected" })

    // TODO: Extract this outside of the mixin?
    const writingMode = () => getComputedStyle(el).writingMode
    const direction = () => getComputedStyle(el).direction
    const orientation = () => ariaProperty(el, "orientation")
    const wrapping = ()  => el.hasAttribute("wrap")
    const movement = (key) =>
      keyTable[writingMode()][direction()][orientation()][key]

    const sMember = ":state(focusable)"
    const members = () => $$(el, sMember)
    const current = () => el.contains(document.activeElement)
      ? document.activeElement
      : null

    const focusTo = (dest) => {
      ilog(dest)
      if (!dest) return
      if (dest.tabIndex !== 0) {
        members().forEach(m => m.tabIndex = -1)
        dest.tabIndex = 0
      }
      if (dest !== document.activeElement)
        dest.focus()
    }

    on(el, "focusin", (e) => focusTo(e.target))

    on(el, "keydown", hotkey({
      "Home": (e) => focusTo($(el, sMember)),
      "End":  (e) => focusTo(members().at(-1)),
    }, { halt: "default propagation" }))

    on(el, "keydown", (e) => {
      const mvt = e.key.startsWith("Arrow") && movement(e.key.slice(5))
      if (mvt) {
        halt("default", e)
        focusTo(traverse(mvt, el, sMember, current(), { wrap: wrapping() }))
      }
    })

    on(el, "click", (e) => {
      const sDisabled = "[aria-disabled=true], [aria-disabled=true] *"
      if (e.target.matches(sDisabled))
        halt("propagation", e)
    }, { capture: true })
  }
)
