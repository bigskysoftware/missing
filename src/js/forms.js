//@deno-types=./19.ts
import { dispatch, internals, makelogger } from "./19.js"

const ilog = makelogger("forms")

/**
 * @template T
 * @param {T} Super
 * @returns {T}
 */
export const FormElementMixin = (Super) => class extends Super {
  static formAssociated = true
  #value = ""

  constructor() { super(); internals(this, {}) }

  get value() { return this.hasAttribute("disabled") ? null : this.#value }
  set value(value) { internals(this).setFormValue(this.#value = value) }
  get form() { return internals(this).form }
  get name() { return this.getAttribute('name') }
  get type() { return this.localName }
  get validity() { return internals(this).validity }
  get validationMessage() { return internals(this).validationMessage }
  get willValidate() { return internals(this).willValidate }
  checkValidity() { return internals(this).checkValidity() }
  reportValidity() { return internals(this).reportValidity() }

  formAssociatedCallback(form) { dispatch(this, 'formAssociated', { form }) }
  formDisabledCallback(disabled) { dispatch(this, 'formDisabled', { disabled }) }
  formResetCallback() { dispatch(this, 'formReset') }
  formStateRestoreCallback(state, mode) {
    dispatch(this, 'formStateRestore', { state, mode }) }
}
