import { internals, memoize, on, states } from "./19.js"

const ariaAttributeName = aria => `aria-${aria.toLowerCase()}`
const ariaPropertyName = aria => `aria${aria.replace(/^./, c => c.toUpperCase())}`
const ariaEventName = aria => `attribute:${ariaAttributeName(aria)}`

const getInSelfOrInternals = (el, prop) => el[prop] ?? internals(el)?.[prop]
const setOrGet = (el, prop, value) => value === undefined
  ? getInSelfOrInternals(el, prop)
  : el[prop] = value

export const ariaProperty = (el, aria, value) =>
  setOrGet(el, ariaPropertyName(aria), value)
export const ariaRelative = (el, aria, value) =>
  setOrGet(el, `${ariaPropertyName(aria)}Element`, value)
export const ariaRelatives = (el, aria, value) =>
  setOrGet(el, `${ariaPropertyName(aria)}Elements`, value)
export const ariaState = (el, aria, value) => {
  if (value === undefined) {
    const val = ariaProperty(el, aria)
    // TODO: do all ARIA booleans default to false?
    return val === "true" ? true : val === "false" ? false : false
  } else {
    el[ariaPropertyName(aria)] = value
  }
}

// Either a mixin
export const AriaState = memoize((aria) => {
  return (Base) => class extends Base {
    static observedAttributes = [ariaAttributeName(aria)]
      .concat(Base.observedAttributes ?? [])
    constructor() {
      super()
      internals(this, { [ariaPropertyName(aria)]: false })
      on(this, ariaEventName(aria), (e) => states(this, { [aria]: ariaState(this, aria) }))
    }
  }
})
