// @ts-check
//@deno-types=./19.ts
import { internals, makelogger, on, role } from "./19.js"
import { ariaProperty, ariaRelatives } from "./aria.js"

const ilog = makelogger("validate")

const and = new Intl.ListFormat("en", { type: "conjunction" })
const or = new Intl.ListFormat("en", { type: "disjunction" })

/**
 * Validate author generated markup.
 *
 * @param {Element} el
 * @param {object} [options]
 * @param {boolean} [options.label] Whether to validate if an accessible label exists.
 * @param {string} [options.sParent] The selector to validate parentElement against.
 * @param {string} [options.sChildren] The selector to validate children against.
 * @param {string[]} [options.roles] A list of acceptable roles to validate against.
 * @param {string[]} [options.attrs] A list of required attributes to validate against.
 * @param {string | null} [options.when] Perform validation when this event is fired.
 */
export function validate(el, options = {}) {
  const { label, sParent, sChildren, roles, attrs, when } = options
  
  if (when) {
    const options_ = { ...options, when: null }
    on(el, when, () => validate(el, options_))
    return
  }

  if (label) {
    // TODO: Create labelOf() helper?
    const validLabel = (
      (ariaRelatives(el, "labelledby")?.length
        || el.hasAttribute("aria-labelledby")
        || ariaProperty(el, "label")) ||
      (el.constructor.formAssociated && internals(el)?.labels.length)
    )
    if (!validLabel)
      throw new Error(`${el} has no accessible name.`)
  }

  if (sParent && !el.matches(`${sParent} > *`))
    throw new Error(`${el} parent must match "${sParent}".`)

  if (sChildren && !el.matches(`:not(:has(> :not(${sChildren})))`))
    throw new Error(`${el} children must match "${sChildren}".`)

  if (roles?.length && !roles.includes(role(el)))
    throw new Error(`${el} role must be one of ${or.format(roles)}".`)

  if (attrs?.length && !el.matches(attrs.map(a => `[${a}]`).join("")))
    throw new Error(`${el} requires attributes ${and.format(attrs)}".`)
}
