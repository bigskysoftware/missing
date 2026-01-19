//@deno-types=./19.ts
import { $, $$, css, internals, makelogger, observeAttributes, on, states, stylize, tag } from "./19.js"
import { validate } from "./validate.js"
import { FormElementMixin} from "./forms.js"
import { TypeAheadMixin } from "./typeahead.js"
import { AriaSelected } from "./selectable.js"
import { AriaMultiSelectable } from "./multiselect.js"
import { AriaDisabled } from "./disableable.js"
import { ariaState } from "./aria.js"

const ilog = makelogger("listbox")

// TODO: Should we halt "Ctrl+A" on Single Select Listbox? Click/Drag?
export const ListBox = tag(
  "aria-listbox",
  { mixins: [FormElementMixin, TypeAheadMixin, AriaMultiSelectable] },
  (el) => {
    const sMember = "aria-option"
    const sSelected = "aria-option[aria-selected=true]"

    const setDefault = () => {
      // TODO: initChildren?
      $$(el, sMember).forEach(o =>
        ariaState(o, "selected", o.hasAttribute("selected") || null))
    }

    const setValue = () => {
      const data = new FormData()
      $$(el, sSelected).forEach(o =>
        data.append(el.name, o.getAttribute("value")))
      el.value = data
    }

    internals(el, { role: "listbox", ariaOrientation: "vertical", ariaMultiSelectable: "false" })
    stylize(el, css`:host { display: block; }`)
    validate(el, {
      label: true,
      sChildren: ":is(aria-optgroup:not([tabindex]), aria-option)", // TODO: add [tabindex] test
      when: "connected"
    })

    on(el, "connected", (e) => {
      if (!$(el, "[aria-selected=true]"))
        setDefault()
      setValue()
    })

    on(el, "formDisabled", (e) => {
      ariaState(el, "disabled", e.detail.disabled || null)
      setValue()
    })

    on(el, "formReset", (e) => {
      setDefault()
      setValue()
    })

    on(el, "formStateRestore", (e) => {
      if (e.detail.mode === "restore") {
        const values = [...e.detail.state.values()]
        $$(el, sMember).forEach(o =>
          ariaState(o, "selected", values.includes(o.getAttribute("value")) || null))
        setValue()
      }
    })

    on(el, "changed", (e) => setValue())
  }
)

export const OptGroup = tag(
  "aria-optgroup",
  { mixins: [AriaDisabled] },
  (el) => {
    internals(el, { role: "group" })
    states(el, ["group"])
    stylize(el, css`:host { display: flex; flex-direction: var(--flex-direction) }`)
    validate(el, { sParent: "aria-listbox", sChildren: "aria-option", when: "connected" })
  }
)

export const Option = tag(
  "aria-option",
  { mixins: [AriaDisabled, AriaSelected] },
  (el) => {
    internals(el, { role: "option" })
    stylize(el, css`:host { display: block; }`)
    validate(el, { sParent: ":is(aria-listbox, aria-optgroup)", when: "connected" })
  }
)

Option.define()
OptGroup.define()
ListBox.define()
