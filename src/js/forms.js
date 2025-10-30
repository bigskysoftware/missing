//@deno-types=./19.ts
import { dispatch, makelogger } from "./19.js"

const ilog = makelogger("forms")

/**
 * @template T
 * @param {T} Super
 * @returns {T}
 */
export const FormElementMixin = (Super) => class extends Super {

  static formAssociated = true
  #value = ""

  constructor() {
    super()
    if (!this.internals) this.internals = this.attachInternals()
  }

  get value() { return this.#value }
  set value(value) { this.internals.setFormValue(this.#value = value) }
  get form() { return this.internals.form }
  get name() { return this.getAttribute('name') }
  get type() { return this.localName }
  get validity() { return this.internals.validity }
  get validationMessage() { return this.internals.validationMessage }
  get willValidate() { return this.internals.willValidate }
  checkValidity() { return this.internals.checkValidity() }
  reportValidity() { return this.internals.reportValidity() }

  formAssociatedCallback(form) { dispatch(this, 'formAssociated', { form }) }
  formDisabledCallback(disabled) { dispatch(this, 'formDisabled', { disabled }) }
  formResetCallback() { dispatch(this, 'formReset') }
  formStateRestoreCallback(state, mode) {
    dispatch(this, 'formStateRestore', { state, mode }) }
}
