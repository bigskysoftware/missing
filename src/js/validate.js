//@deno-types=./19.ts
import { makelogger, mixin } from "./19.js"

const ilog = makelogger("validate")

/**
 * Validate author generated markup.
 * @param {object} [options]
 * @param {boolean} [options.label] Whether to validate if an accessible label exists.
 * @param {string} [options.sParent] The selector to validate parentElement against.
 * @param {string} [options.sChildren] The selector to validate children against.
 */
export const validate = (options) => mixin((el) => {
  const {
    name = false,
    sParent = "",
    sChildren = "",
  } = options

  // TODO: See ilog() below. At the time validate() is run, Firefox has associated
  // the label with el.internals, but Chrome hasn't.
  const validName = () => (
    (el.hasAttribute("aria-labelledby") || el.hasAttribute("aria-label")) ||
    (el.constructor.formAssociated && ilog(el.internals.labels)?.length)
  )
  const validParent = () => el.matches(`${sParent} > *`)
  const validChildren = () => el.matches(`:not(:has(> :not(${sChildren})))`)

  if (name && !validName())
    console.warn(el, "has no accessible name (aria-label or aria-labelledby).")

  if (sParent && !validParent())
    console.error(el, `must be contained in an element matching the selector "${sParent}".`)

  if (sChildren && !validChildren())
    return console.error(el, `can only contain elements matching the selector "${sChildren}".`)
})
