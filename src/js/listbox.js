//@deno-types=./19.ts
import { $, $$, css, internals, makelogger, observeAttributes, on, stylize, tag } from "./19.js"
import { validate } from "./validate.js"
import { FormElementMixin} from "./forms.js"
import { TypeAheadMixin } from "./typeahead.js"
import { SelectableMixin } from "./selectable.js"
import { MultiSelectMixin } from "./multiselect.js"

const ilog = makelogger("listbox")

export const ListBox = tag(
  "aria-listbox",
  { mixins: [FormElementMixin, TypeAheadMixin, MultiSelectMixin] },
  (el) => {
    const sMember = "aria-option"
    const sSelected = "aria-option[aria-selected=true]"

    const setDefault = () => {
      // TODO: initChildren?
      $$(el, sMember).forEach(o =>
        o.ariaSelected = o.hasAttribute("selected") ? "true" : null)
    }

    const setValue = () => {
      const data = new FormData()
      $$(el, sSelected).forEach(o =>
        data.append(el.name, o.getAttribute("value")))
      el.value = data
    }

    internals(el, { role: "listbox", ariaOrientation: "vertical", ariaMultiSelectable: "false" })
    stylize(el, css`:host { display: block; }`)

    on(el, "connected", (e) => {
      validate(el, { label: true, sChildren: ":is(aria-optgroup, aria-option)" })
      if (!$(el, "[aria-selected=true]"))
        setDefault()
      setValue()
    })

    on(el, "formDisabled", (e) => {
      el.ariaDisabled = (e.detail.disabled) ? "true" : null
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
          o.ariaSelected = values.includes(o.getAttribute("value")) ? "true" : null)
        setValue()
      }
    })

    on(el, "changed", (e) => setValue())
  }
)

export const OptGroup = tag(
  "aria-optgroup",
  { mixins: [observeAttributes("tabindex")] },
  (el) => {
    stylize(el, css`:host { display: flex; flex-direction: var(--flex-direction) }`)
    internals(el, { role: "group" })

    on(el, "connected", (e) =>
      validate(el, { sParent: "aria-listbox", sChildren: "aria-option" }))

    on(el, "attribute:tabindex", (e) => {
      if (e.detail.value !== null) {
        el.removeAttribute("tabindex")
        console.warn(el, "does not support focus. The 'tabindex' attribute has been removed.")
      }
    })
  }
)

export const Option = tag(
  "aria-option",
  { mixins: [SelectableMixin] },
  (el) => {
    internals(el, { role: "option" })
    stylize(el, css`:host { display: block; }`)

    on(el, "connected", (e) =>
      validate(el, { sParent: ":is(aria-listbox, aria-optgroup)" }))
  }
)

// Define nested elements first
Option.define()
OptGroup.define()
ListBox.define()
