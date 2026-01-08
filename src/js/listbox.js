//@deno-types=./19.ts
import { $, $$, css, internals, makelogger, observeAttributes, on, stylize, tag } from "./19.js"
import { validate } from "./validate.js"
import { FormElementMixin} from "./forms.js"
import { FocusGroupMixin } from "./focusgroup.js"
import { TypeAheadMixin } from "./typeahead.js"
import { SelectableMixin } from "./selectable.js"
import { MultiSelectMixin } from "./multiselect.js"

const ilog = makelogger("listbox")

export const listbox = tag(
  "aria-listbox",
  {
    mixins: [
      FormElementMixin,
      FocusGroupMixin,
      TypeAheadMixin,
      MultiSelectMixin,
      validate({ name: true, sChildren: ":is(aria-optgroup, aria-option)" }),
    ],
  },
  (listbox) => {
    const sMember = "aria-option"
    const sSelected = "aria-option[aria-selected=true]"

    const setDefault = () => {
      $$(listbox, sMember).forEach(o =>
        o.ariaSelected = o.hasAttribute("selected") ? "true" : null)
    }

    const setValue = () => {
      const data = new FormData()
      $$(listbox, sSelected).forEach(o =>
        data.append(listbox.name, o.getAttribute("value")))
      listbox.value = data
    }
    
    internals(listbox, { role: "listbox", ariaOrientation: "vertical", ariaMultiSelectable: "false" })
    stylize(listbox, css`:host { display: block; }`)

    internals(el, { role: "listbox", ariaOrientation: "vertical", ariaMultiSelectable: "false" })
    stylize(el, css`:host { display: block; }`)

    on(el, "connected", (e) => {
      validate(el, { label: true, sChildren: ":is(aria-optgroup, aria-option)" })
      if (!$(el, "[aria-selected=true]"))
        setDefault()
      setValue()
    })

    on(listbox, "formDisabled", (e) => {
      listbox.ariaDisabled = (e.detail.disabled) ? "true" : null
      setValue()
    })

    on(listbox, "formReset", (e) => {
      setDefault()
      setValue()
    })

    on(listbox, "formStateRestore", (e) => {
      if (e.detail.mode === "restore") {
        const values = [...e.detail.state.values()]
        $$(listbox, sMember).forEach(o =>
          o.ariaSelected = values.includes(o.getAttribute("value")) ? "true" : null)
        setValue()
      }
    })

    on(listbox, "changed", (e) => setValue())
  }
)

export const optgroup = tag(
  "aria-optgroup",
  { mixins: [observeAttributes("tabindex")] },
  (el) => {
    stylize(el, css`:host { display: flex; flex-direction: var(--flex-direction) }`)
    internals(el, { role: "group" })

    on(el, "connected", (e) =>
      validate(el, { sParent: "aria-listbox", sChildren: "aria-option" }))

    on(el, "attribute:tabindex", (e) => {
      if (e.detail.value !== null) {
        optgroup.removeAttribute("tabindex")
        console.warn(optgroup, "does not support focus. The 'tabindex' attribute has been removed.")
      }
    })
  }
)

export const option = tag(
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
option.define()
optgroup.define()
listbox.define()
