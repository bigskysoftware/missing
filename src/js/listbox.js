// @deno-types=./19.ts
// @deno-types=./43.ts
import { $, $$, attr, css, dispatch, makelogger, on } from "./19.js"
import { internals, states, stylize, tag, validate } from "./43.js"
import { FormElementMixin } from "./forms.js"
import { TypeAheadMixin } from "./typeahead.js"
import { ariaState, AriaActions, AriaMultiSelectable, AriaSelected } from "./aria.js"

const ilog = makelogger("listbox")

export const ListBox = tag(
  "aria-listbox",
  { mixins: [FormElementMixin, TypeAheadMixin, AriaMultiSelectable] },
  (el) => {
    internals(el, { role: "listbox", ariaOrientation: "vertical" })
    stylize(el, css`:host { display: block; }`)
    validate(el, {
      sChildren: ":is(aria-group, aria-option)",
      when: "connected"
    })

    const sMember = "aria-option"
    const sSelected = "aria-option[aria-selected=true]"

    const setDefault = () => {
      $$(el, sMember).forEach(o => {
        const isSelected = o.hasAttribute("selected")
        ariaState(o, "selected", isSelected || null)
        attr(o, "tabindex", isSelected ? 0 : null)
      })
    }
    const setValue = () => {
      const data = new FormData()
      $$(el, sSelected).forEach(o =>
        data.append(el.name, o.getAttribute("value")))
      el.value = data
    }

    on(el, "connected", (e) => {
      if (!$(el, "[aria-selected=true]"))
        setDefault()
      setValue()
    })

    on(el, "slotchange", (e) => {
      setValue()
      const options = $$(el, sMember)
      const current = options.find(o =>
        o.tabIndex == 0 || ariaState(o, "selected")
      ) || options[0]
      current.tabIndex = 0
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

    on(el, "change", (e) => {
      setValue()
    })

  }
)

export const Option = tag(
  "aria-option",
  { mixins: [AriaActions, AriaSelected] },
  (el) => {
    internals(el, { role: "option" })
    validate(el, { sParent: ":is(aria-listbox, aria-group)", when: "connected" })

    on(el, "attribute:aria-selected", (e) => {
      // TODO: This fires on soft (not hard) refresh. How to only fire once el is upgraded?
      if (el.isConnected)
        dispatch(el.closest("aria-listbox"), "change", {}, { bubbles: true })
    })
  }
)

Option.define()
ListBox.define()
