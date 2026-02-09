// @deno-types=./19.ts
// @deno-types=./43.ts
import { $$, css, dispatch, halt, hotkey, makelogger, off, on } from "./19.js"
import { internals, memoize, mixin, role, states, stylize, tag, validate } from "./43.js"

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
  setOrGet(el, `${ariaPropertyName(aria)}Elements`, value) || []
export const ariaState = (el, aria, value) => {
  if (value === undefined) {
    const val = ariaProperty(el, aria)
    return val === "true" ? true : val === "false" ? false : false
  } else {
    el[ariaPropertyName(aria)] = value
  }
}
export const ariaLabel = (el, value) => {
  if (value === undefined) {
    // TODO: Calculate accessible label using:
    // - ariaRelatives("labelledBy") content
    // - ariaProperty("label") value
    // - internals(el)?.labels content (if el.constructor.formAssociated)
    // - heading tags
    console.error("Calculating accessible name not implemented yet")
  } else if (value instanceof HTMLElement) {
    internals(el, { ariaLabelledByElements: [value] })
  } else {
    ariaProperty(el, "label", value)
  }
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

    on(el, "attribute:aria-checked", (e) => {
      dispatch(el, "changed", {}, { bubbles: true })
    })
  }
)

export const AriaCurrent = AriaState("current")

export const AriaExpanded = mixin(
  [AriaDisabled, AriaState("expanded")],
  (el) => states(el, ["expandable"])
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

    // TODO: How to define this once, on "connected"?
    const selectionFollowsFocus = () => !el.matches(
      ":state(multiselectable) > *, :state(multiselectable) > :state(group) > *"
    )

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

// TODO: Could/should ariaRelatives use internals?
// TODO: Still a work in progress
export const AriaControls = mixin(
  [AriaProperty("controls")],
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
      ariaRelatives(el, "controls").forEach(target => {
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

    // TODO: Should these also change based on writing-mode / dir?
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
    states(el, ["orientable", ariaProperty(el, "orientation")])
    stylize(el, css`
      :host {
        display: flex;
        flex-direction: var(--flex-direction, row);
        inline-size: fit-content;
      }
      :host(:state(horizontal)) { --flex-direction: row; }
      :host(:state(vertical))   { --flex-direction: column; }
    `)
  }
)

export const AriaGroup = tag(
  "aria-group",
  { mixins: [AriaDisabled] },
  (el) => {
    internals(el, { role: "group" })
    states(el, ["group"])
    stylize(el, css`:host { display: flex; flex-direction: var(--flex-direction) }`)
    // validate(el, { sParent: "aria-listbox", sChildren: "aria-option", when: "connected" })

    //on(el, "connected", (e) => el.removeAttribute("tabindex"))

  }
)

export const AriaSeparator = tag(
  "aria-separator",
  (el) => {
    internals(el, { role: "separator" })

    on(el, "connected", (e) => {
      const orthogonal = el.closest(":state(orientable)").matches(":state(horizontal)")
        ? "vertical"
        : "horizontal"
      el.innerHTML = `<hr aria-orientation=${orthogonal}>`
    })
  }
)
