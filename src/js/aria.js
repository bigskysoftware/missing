// @deno-types=./19.ts
// @deno-types=./43.ts
import { $, $$, css, dispatch, halt, hotkey, html, makelogger, off, on } from "./19.js"
import { accName, internals, memoize, mixin, role, shadow, states, stylize, tag, validate } from "./43.js"

const ilog = makelogger("aria")

/* ARIA Helpers:
 *
 *
 *
 */
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

export const ariaLabel = (el, value) => {
  if (value === undefined)
    return ariaProperty(el, "label") || ariaRelatives(el, "labelledBy")?.map(accName).join(" ")
  else if (value instanceof HTMLElement)
    internals(el, { ariaLabelledByElements: [value] })
  else
    ariaProperty(el, "label", value)
}

/* ARIA States:
 *
 *
 *
 */
const globalAttribute = [];
const stateTable = /** @type {const} */ ({
  busy: globalAttribute,
  checked: [
    "checkbox", "menuitemcheckbox", "menuitemradio", "option", "radio", "switch",
    "switch", "treeitem",
  ],
  current: globalAttribute,
  disabled: [
    "application", "button", "composite", "gridcell", "group", "input", "link", "menuitem", "scrollbar", "separator", "tab",
    "checkbox", "columnheader", "combobox", "grid", "listbox", "menu", "menubar", "menuitemcheckbox", "menuitemradio", "option", "radio", "radiogroup", "row", "rowheader", "searchbox", "select", "slider", "spinbutton", "switch", "tablist", "textbox", "toolbar", "tree", "treegrid", "treeitem",
  ],
  expanded: [
    "application", "button", "checkbox", "combobox", "gridcell", "link", "listbox", "menuitem", "row", "rowheader", "tab", "treeitem",
    "columnheader", "menuitemcheckbox", "menuitemradio", "rowheader", "switch",
  ],
  grabbed: globalAttribute,
  invalid: [
    "application", "checkbox", "combobox", "gridcell", "listbox", "radiogroup", "slider", "spinbutton", "textbox", "tree",
    "columnheader", "rowheader", "searchbox", "switch", "treegrid",
  ],
  pressed: [
    "button",
  ],
  selected: [
    "gridcell", "option", "row", "tab",
    "columnheader", "rowheader", "treeitem",
  ],
})

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
  }
)

export const AriaCurrent = AriaState("current")

export const AriaExpanded = mixin(
  [AriaDisabled, AriaState("expanded")],
  (el) => {
    states(el, ["expandable"])
    on(el, "attribute:aria-expanded", (e) => {
      states(el, { collapsed: !ariaState(el, "expanded") })
    })
  }
)

export const AriaGrabbed = mixin(
  [AriaState("grabbed")],
  (el) => states(el, ["draggable"])
)

export const AriaInvalid = mixin(
  [AriaDisabled, AriaState("invalid")],
  (el) => {}
)

export const AriaPressed = mixin(
  [AriaDisabled, AriaExpanded, AriaState("pressed")],
  (el) => states(el, ["pressable"])
)

export const AriaSelected = mixin(
  [AriaDisabled, AriaState("selected")],
  (el) => {
    states(el, ["focusable", "selectable"])
    el.tabIndex = -1

    const focusgroup = () => el.closest(":state(focusgroup)")
    const sMultiSelectable = `
      :state(multiselectable) *,
      :state(multiselectable) :state(group) *
    `
    const sExceptions = `
      aria-treeitem
    `
    const selectionFollowsFocus = () => !el.matches(sMultiSelectable) && !el.matches(sExceptions)

    on(el, "focus", (e) => {
      if (selectionFollowsFocus()) {
        const prev = $(focusgroup(), "[aria-selected=true]")
        ariaState(prev, "selected", null)
        ariaState(el, "selected", true)
      }
    })

    on(el, "click", (e) => {
      if (!selectionFollowsFocus())
        ariaState(el, "selected", !ariaState(el, "selected") || null)
    })

    on(el, "keydown", hotkey({
      " ": (e) => dispatch(el, "click", {}, { bubbles: true }),
    }, { halt: "default" }))
  }
)

/* ARIA Properties:
 *
 *
 *
 */
const propertyTable = /** @type {const } */ ({
  controls: globalAttribute,
  modal: [
    "window",
    "alertdialog", "dialog"
  ],
  multiSelectable: [
    "grid", "listbox", "tablist", "tree",
    "treegrid",
  ],
  orientation: [
    "scrollbar", "select", "separator", "slider", "tablist", "toolbar",
    "listbox", "menu", "menubar", "radiogroup", "tree", "treegrid",
  ],
})

export const AriaProperty = (aria, { defaultValue = "false" } = {}) => {
  return (Base) => class extends Base {
    constructor() {
      super()
      internals(this, { [ariaPropertyName(aria)]: defaultValue })
      validate(this, { roles: propertyTable[aria], when: "connected" })
    }
  }
}

export const AriaActions = mixin(
  (el) => {

    stylize(el, css`
      :host {
        display: flex;
        align-items: center;
        width: 100%;
        white-space: nowrap;
      }
      slot[name=leading] {
        display: flex;
        flex-shrink: 0;
      }
      slot[name=leading]::slotted(*) {
        display: inline-flex;
        width: 24px;
        height: 24px;
      }
      slot:not([name]) {
        flex-grow: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      slot[name=trailing] {
        display: flex;
        flex-shrink: 0;
        margin-left: auto;
      }
      slot[name=trailing]::slotted(*) {
        display: inline-flex;
      }
    `)
    shadow(el).replaceChildren(html`
      <slot name=leading></slot>
      <slot></slot>
      <slot name=trailing></slot>
    `)

    const inert = (value) => {
      //const a = $(el, "aria-actions")
      const a = $(shadow(el), "slot[name=trailing]")
      if (a) a.inert = value
    }

    on(el, "constructed", (e) => inert(true))
    on(el, "focusin", (e) => inert(false))
    on(el, "focusout", (e) => inert(!el.contains(e.relatedTarget)))
  }
)

// TODO: Work in progress.
export const AriaControls = mixin(
  [AriaProperty("controlsElements", { defaultValue: [] })],
  (el) => {
    const sLandmark = `
      :is(
        [role=banner], header,
        [role=complementary], aside,
        [role=contentinfo], footer,
        [role=form], form,
        [role=main], main,
        [role=navigation], nav,
        [role=region], section[aria-label], section[aria-labelledby],
        [role=search], search
      )
    `

    on(el, "connected", (e) => {
      ariaRelatives(el, "controls")?.forEach(target => {
        const targetRole = role(target)
        if (target.matches(sLandmark) && !ariaLabel(target))
          ariaRelatives(target, "labelledBy", el)
        else if (targetRole == "menu" || targetRole == "tab")
          ariaRelatives(target, "labelledBy", el)
        else if (targetRole == "tooltip")
          ariaRelatives(el, "describedBy", target)
      })
    })
  }
)

export const AriaModal = AriaProperty("modal")


// TODO: Halt "Ctrl+A" on single select? Implement click+drag?
export const AriaMultiSelectable = mixin(
  [AriaDisabled, AriaProperty("multiSelectable")],
  (el) => {
    const sMember = ":state(selectable)"
    const sSelected = "[aria-selected=true]"
    let anchor = $$(el, sSelected).at(-1) || $$(el, sMember).at(0)

    const toggle = (member) => {
      ariaState(member, "selected", !ariaState(member, "selected") || null)
      if (ariaState(member, "selected"))
        anchor = member
    }

    // TODO: Implement arrowTable, c.f. focus.keyTable and toolbar.js
    const arrow = (ariaProperty(el, "orientation") === "horizontal")
      ? { next: "ArrowRight", prev: "ArrowLeft" }
      : { next: "ArrowDown", prev: "ArrowUp" }

    const hotkeys = hotkey({
      [`Shift+${arrow.next}`]: (e) => {
        toggle(document.activeElement)
      },
      [`Shift+${arrow.prev}`]: (e) => {
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
        members.slice(0, start + 1).forEach(m => ariaState(m, "selected", true))
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
    on(el, "connected", (e) => {
      if (ariaProperty(el, "multiSelectable") !== "true") return

      states(el, ["multiselectable"])

      switch (role(el)) {
        case "listbox":
        case "tree":
          keys = on(el, "keydown", hotkeys)
          break
        case "tablist":
          [...el.children].forEach(tab => {
            internals(tab, { ariaExpanded: "false" })
            ariaState(tab, "expanded", ariaState(tab, "selected"))
          })
          break
      }
    })

    on(el, "disconnected", (e) => {
      keys = keys ? off(keys) : undefined
    })
  }
)

export const AriaOrientation = mixin(
  [AriaDisabled, AriaProperty("orientation", { defaultValue: "horizontal" })],
  (el) => {
    stylize(el, css`
      :host {
        display: flex;
        flex-direction: var(--flex-direction, row);
        inline-size: fit-content;
      }
      :host(:state(horizontal)) { --flex-direction: row; }
      :host(:state(vertical))   { --flex-direction: column; }
    `)
    on(el, "connected", (e) => {
      states(el, ["orientable", ariaProperty(el, "orientation")])
    })
  }
)

export const AriaGroup = tag(
  "aria-group",
  { mixins: [AriaDisabled] },
  (el) => {
    internals(el, { role: "group" })
    states(el, ["group"])
    stylize(el, css`:host { display: flex; flex-direction: var(--flex-direction) }`)
    validate(el, {
      sParent: ":is(aria-listbox, aria-menulist, aria-treeitem)",
      sChildren: ":is(aria-option, aria-menuitem, aria-treeitem)",
      attrs: { "tabindex": false },
      when: "connected",
    })

    on(el, "slotchange", (e) => {
      dispatch(el.parentElement, "slotchange", { host: el, elements: e.detail.elements })
    })
  }
)

export const AriaSeparator = tag(
  "aria-separator",
  (el) => {
    internals(el, { role: "separator" })

    on(el, "connected", (e) => {
      const orthogonal = getComputedStyle(el).getPropertyValue("--flex-direction") === "horizontal"
        ? "vertical"
        : "horizontal"
      el.innerHTML = `<hr aria-orientation=${orthogonal}>`
    })
  }
)
