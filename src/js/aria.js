import { css, internals, memoize, mixin, on, states, stylize } from "./19.js"
import { validate } from "./validate.js"

// ref: https://www.w3.org/TR/wai-aria-1.3/
const stateTable = /** @type {const} */ ({
  busy: [],  // global state
  checked: [
    "checkbox", "menuitemcheckbox", "menuitemradio", "option", "radio", "switch",
    "switch", "treeitem",
  ],
  current: [],  // global state
  disabled: [
    "application", "button", "composite", "gridcell", "group", "input", "link", "menuitem", "scrollbar", "separator", "tab",
    "checkbox", "columnheader", "combobox", "grid", "listbox", "menu", "menubar", "menuitemcheckbox", "menuitemradio", "option", "radio", "radiogroup", "row", "rowheader", "searchbox", "select", "slider", "spinbutton", "switch", "tablist", "textbox", "toolbar", "tree", "treegrid", "treeitem",
  ],
  expanded: [
    "application", "button", "checkbox", "combobox", "gridcell", "link", "listbox", "menuitem", "row", "rowheader", "tab", "treeitem",
    "columnheader", "menuitemcheckbox", "menuitemradio", "rowheader", "switch",
  ],
  grabbed: [],  // global state
  invalid: [
    "application", "checkbox", "combobox", "gridcell", "listbox", "radiogroup", "slider", "spinbutton", "textbox", "tree",
    "columnheader", "rowheader", "searchbox", "switch", "treegrid",
  ],
  multiSelectable: [  // technically an "ARIA Property"
    "grid", "listbox", "tablist", "tree",
    "treegrid",
  ],
  orientation: [ // technically an "ARIA Property"
    "scrollbar", "select", "separator", "slider", "tablist", "toolbar",
    "listbox", "menu", "menubar", "radiogroup", "tree", "treegrid",
  ],
  pressed: [
    "button",
  ],
  selected: [
    "gridcell", "option", "row", "tab",
    "columnheader", "rowheader", "treeitem",
  ],
})

const ariaAttributeName = aria => `aria-${aria.toLowerCase()}`
const ariaPropertyName = aria => `aria${aria.replace(/^./, c => c.toUpperCase())}`
const ariaEventName = aria => `attribute:${ariaAttributeName(aria)}`

const getInSelfOrInternals = (el, prop) => el[prop] ?? internals(el)?.[prop]
const setOrGet = (el, prop, value) => value === undefined
  ? getInSelfOrInternals(el, prop)
  : el[prop] = value

export const ariaProperty = (el, aria, value) =>
  setOrGet(el, ariaPropertyName(aria), value)
export const ariaRelative = (el, aria, value) =>
  setOrGet(el, `${ariaPropertyName(aria)}Element`, value)
export const ariaRelatives = (el, aria, value) =>
  setOrGet(el, `${ariaPropertyName(aria)}Elements`, value)
export const ariaState = (el, aria, value) => {
  if (value === undefined) {
    const val = ariaProperty(el, aria)
    // TODO: do all ARIA booleans default to false?
    return val === "true" ? true : val === "false" ? false : false
  } else {
    el[ariaPropertyName(aria)] = value
  }
}

export const AriaState = memoize((aria, { defaultValue = "false" } = {}) => {
  return (Base) => class extends Base {
    static observedAttributes = [ariaAttributeName(aria)]
      .concat(Base.observedAttributes ?? [])
    constructor() {
      super()
      internals(this, { [ariaPropertyName(aria)]: defaultValue })
      validate(this, { roles: stateTable[aria], when: "connected" })
      on(this, ariaEventName(aria), (e) => states(this, { [ariaStateName(aria)]: ariaState(this, aria) }))
    }
  }
})

export const AriaBusy = AriaState("busy")

export const AriaCurrent = AriaState("current")

export const AriaExpanded = AriaState("expanded")

export const AriaGrabbed = AriaState("grabbed")

export const AriaInvalid = AriaState("invaid")

export const AriaOrientation = mixin(
  [AriaState("orientation", { defaultValue: "horizontal" })],
  (el) => {
    states(el, ["orientable"])
    stylize(el, css`
      :host {
        display: flex;
        flex-direction: var(--flex-direction, row);
        inline-size: fit-content;
      }
      :host(:state(horizontal)) { --flex-direction: row; }
      :host(:state(vertical))   { --flex-direction: column; }
    `)

    on(el, "attribute:aria-orientation", (e) => {
      // TODO: What if e.detail.value is null? (e.g. on init)
      states(el, {
        horizontal: ariaProperty(el, "orientation") === "horizontal",
        vertical: ariaProperty(el, "orientation") === "vertical",
      })
    })
  }
)

export const AriaPressed = AriaState("pressed")
