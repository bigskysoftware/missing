//@deno-types=./19.ts
import { $, $$, css, dispatch, makelogger, on, tag } from "./19.js"
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
    internals: { role: "listbox", ariaOrientation: "vertical", ariaMultiSelectable: "false" },
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
      if (listbox.hasAttribute("disabled"))
        return listbox.value = null

      const data = new FormData()
      $$(listbox, sSelected).forEach(o =>
        data.append(listbox.name, o.getAttribute("value")))
      listbox.value = data
    }

    on(listbox, "connected", (e) => {
      if (!$(listbox, "[aria-selected=true]"))
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
  {
    internals: { role: "group" },
    mixins: [validate({ sParent: "aria-listbox", sChildren: "aria-option" })],
    css: css`:host { display: flex; flex-direction: var(--flex-direction) }`,
    observedAttributes: ["tabindex"],
  },
  (optgroup) => {
    on(optgroup, "attribute:tabindex", (e) => {
      if (e.detail.value !== null) {
        optgroup.removeAttribute("tabindex")
        console.warn(optgroup, "do not support focus. The 'tabindex' attribute has been removed.")
      }
    })
  }
)

export const option = tag(
  "aria-option",
  {
    internals: { role: "option" },
    mixins: [
      SelectableMixin,
      validate({ sParent: ":is(aria-listbox, aria-optgroup)" }),
    ],
    observedAttributes: ["aria-selected"],
  },
  (option) => {
    on(option, "attribute:aria-selected", (e) => {
      dispatch(option, "changed", {}, { bubbles: true })
    })
  },
)

// Define nested elements first
option.define()
optgroup.define()
listbox.define()
