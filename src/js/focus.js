// @deno-types=./19.ts
// @deno-types=./43.ts
import { $, $$, css, halt, halts, hotkey, makelogger, on, traverse } from "./19.js"
import { internals, mixin, observeAttributes, states, stylize, tag, validate } from "./43.js"
import { ariaProperty, AriaOrientation } from "./aria.js"

const ilog = makelogger("focus-group")

export const INACTIVE_TABINDEX = /** @type {const} */ -7822865
export const sFocusable = /** @type {const} */ `
  :is(
    [tabindex]:not([tabindex^='-']),
    [tabindex=${INACTIVE_TABINDEX}],
    :is(a, area)[href],
    :is(audio, video)[controls],
    :is(img, object)[usemap],
    button, details, embed, iframe, input, select, textarea,
    :state(focusable)
  ):not(
    [disabled],
    [hidden] *,
    :state(disabled),
    :state(focusgroup-disable) *,
    :state(focusable) *
  )
`

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

// TODO: How to handle <input type=text>
export const FocusGroupMixin = mixin(
  [AriaOrientation],
  (el) => {

    const writingMode = () => getComputedStyle(el).writingMode
    const direction = () => getComputedStyle(el).direction
    const orientation = () => ariaProperty(el, "orientation")
    const wrapping = ()  => el.hasAttribute("wrap")

    const movement = (key) =>
      keyTable[writingMode()][direction()][orientation()][key]

    const sMember = sFocusable
    const current = () => el.contains(document.activeElement)
      ? document.activeElement
      : null

    const focusTo = (dest) => {
      const members = $$(el, sMember)
      if (!members.includes(dest)) return
      members.forEach(member => member.tabIndex = INACTIVE_TABINDEX)
      dest.tabIndex = 0
      dest.focus()
    }

    states(el, ["focusgroup"])
    validate(el, { label: true, when: "connected" })

    // TODO: from AriaSelected and AriaChecked
    //on(el, "constructed", (e) => {
    //  const isSelected = (ariaState(el, "selected") || el.hasAttribute("selected"))
    //  el.tabIndex = (isSelected) ? 0 : INACTIVE_TABINDEX
    //})
    //on(el, "constructed", (e) => {
    //  const isChecked = (ariaState(el, "checked") || el.hasAttribute("checked"))
    //  const isMenuitem = (role(el).startsWith("menuitem"))
    //  el.tabIndex = (!isMenuitem || isChecked) ? 0 : INACTIVE_TABINDEX
    //})
    on(el, "slotchange", (e) => {
      const members = e.detail.elements.filter(m => m.matches(sFocusable))
      const initialized = members.filter(m => m.tabIndex == 0 || m.autofocus)
      if (members.length && !initialized.length)
        members[0].tabIndex = 0
      else if (initialized.length > 1) {
        members.slice(1).forEach(m => m.tabIndex = INACTIVE_TABINDEX)
      }
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

    // TODO: Add test that focusgroup will capture+halt <button aria-disabled onclick="">
    // NOTE: Children of button (e.g., <aria-icon>) might be the target of click event
    on(el, "click", (e) => {
      if (e.target.ariaDisabled === "true" || e.target.matches("[aria-disabled=true] *"))
        halt("propagation", e)
    }, { capture: true })
  }
)

export const FocusGroup = tag(
  "focus-group",
  { mixins: [FocusGroupMixin] },
  (el) => {}
)

FocusGroup.define()
