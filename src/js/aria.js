// @deno-types=./19.ts
// @deno-types=./43.ts
import { $$, css, dispatch, halt, hotkey, makelogger, off, on } from "./19.js"
import { internals, memoize, mixin, states, stylize, validate } from "./43.js"

const ilog = makelogger("aria")

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
  modal: [  // technically an "ARIA Property"
    "window",
    "alertdialog", "dialog"
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
const ariaStateName = aria => aria.toLowerCase()

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
      on(this, ariaEventName(aria), (e) => {
        states(this, {
          [ariaStateName(aria)]: ariaState(this, aria),
          mixed: (e.detail.value === "mixed"),
        })
      })
    }
  }
})

export const AriaBusy = AriaState("busy")

export const AriaDisabled = mixin(
  [AriaState("disabled")],
  (el) => {
    on(el, "click", (e) => {
      if (ariaState(el, "disabled"))
        halt("default bubbling propagation", ilog("inhibited event:", e))
    })
  }
)

export const AriaChecked = mixin(
  [AriaDisabled, AriaState("checked")],
  (el) => {
    states(el, {
      focusable: true,
      checkable: true,
      tristate: role(el) === "checkbox" || role(el) === "menuitemcheckbox",
    })

    on(el, "constructed", (e) => {
      const isChecked = (ariaState(el, "checked") || el.hasAttribute("checked"))
      const isMenuitem = (role(el).startsWith("menuitem"))
      el.tabIndex = (!isMenuitem || isChecked) ? 0 : -1
    })

    on(el, "attribute:aria-checked", (e) => {
      dispatch(el, "changed", {}, { bubbles: true })
    })
  }
)
export const AriaCurrent = AriaState("current")

export const AriaExpanded = mixin(
  [AriaDisabled, AriaState("expanded")],
  (el) => {
    states(el, ["expandable"])
  }
)

export const AriaGrabbed = mixin(
  [AriaState("grabbed")],
  (el) => {
    states(el, ["draggable"])
  }
)

export const AriaInvalid = mixin(
  [AriaDisabled, AriaState("invalid")],
  (el) => {}
)

export const AriaModal = AriaState("modal")

export const AriaMultiSelectable = mixin(
  [AriaDisabled, AriaState("multiSelectable")],
  (el) => {
    const sMember = ":state(selectable)"
    const sSelected = "[aria-selected=true]"
    let anchor = $$(el, sSelected).at(-1) || $$(el, sMember).at(0)

    const toggle = (member) => {
      ariaState(member, "selected", !ariaState(member, "selected") || null)
      if (ariaState(member, "selected"))
        anchor = member
    }

    // TODO: ArrowDown and ArrowUp kind of rely on orientation
    // TODO: APG only explicitly recommends these for listbox and tree
    const hotkeys = hotkey({
      "Shift+ArrowDown": (e) => {
        toggle(document.activeElement)
      },
      "Shift+ArrowUp": (e) => {
        toggle(document.activeElement)
      },
      "Shift+ ": (e) => {
        const members = $$(el, sMember)
        const start = members.indexOf(anchor)
        const end = members.indexOf(document.activeElement)
        members.slice(
          Math.min(start, end),
          Math.max(start, end) + 1,
        ).forEach(m => ariaState(m, "selected", true))
        anchor = members.at(end)
      },
      "Ctrl+Shift+Home": (e) => {
        const members = $$(el, sMember)
        const start = members.indexOf(document.activeElement)
        members.slice(0, start).forEach(m => ariaState(m, "selected", true))
        anchor = members.at(0)
      },
      "Ctrl+Shift+End": (e) => {
        const members = $$(el, sMember)
        const start = members.indexOf(document.activeElement)
        members.slice(start).forEach(m => ariaState(m, "selected", true))
        anchor = members.at(-1)
      },
      "Ctrl+A": (e) => {
        const members = $$(el, sMember)
        const all = members.every(m => ariaState(m, "selected"))
        members.forEach(m => ariaState(m, "selected", !all || null))
        anchor = (all) ? members.at(0) : members.at(-1)
      },
    }, { halt: "default" })

    let keys
    on(el, "attribute:aria-multiselectable", (e) => {
      if (e.detail.value === "true") {
        keys = on(el, "keydown", hotkeys)
      } else if (keys)
        off(keys)
    })
  }
)

export const AriaOrientation = mixin(
  [AriaDisabled, AriaState("orientation", { defaultValue: "horizontal" })],
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
      states(el, {
        horizontal: ariaProperty(el, "orientation") === "horizontal",
        vertical: ariaProperty(el, "orientation") === "vertical",
      })
    })
  }
)

export const AriaPressed = mixin(
  [AriaDisabled, AriaExpanded, AriaState("pressed")],
  (el) => {
    states(el, ["pressable"])
  }
)

export const AriaSelected = mixin(
  [AriaDisabled, AriaState("selected")],
  (el) => {
    states(el, ["focusable", "selectable"])

    const selectionFollowsFocus = () => !el.matches(
      ":state(multiselectable) > *, :state(multiselectable) > :state(group) > *"
    )

    // TODO: This might be the responsibility of a select container
    on(el, "constructed", (e) => {
      const isSelected = (ariaState(el, "selected") || el.hasAttribute("selected"))
      el.tabIndex = (isSelected) ? 0 : -1
    })

    on(el, "focus", (e) => {
      if (selectionFollowsFocus())
        ariaState(el, "selected", true)
    })

    on(el, "blur", (e) => {
      if (selectionFollowsFocus() && el.closest(":state(focusgroup)").contains(e.relatedTarget))
        ariaState(el, "selected", null)
    })

    on(el, "click", (e) => {
      if (selectionFollowsFocus())
        ilog("How to remove ariaSelected frome existing el?")
      else
        ariaState(el, "selected", !ariaState(el, "selected") || null)
    })

    on(el, "keydown", (e) => {
      if (!selectionFollowsFocus() && e.key === " ") {
        halt("default propagation", e)
        ariaState(el, "selected", !ariaState(el, "selected") || null)
      }
    })

    on(el, "attribute:aria-selected", (e) => {
      dispatch(el, "changed", {}, { bubbles: true })
    })
  }
)
