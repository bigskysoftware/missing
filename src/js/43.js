/**
 * a custom element library.
 * "1 US$ = 43.2678 TR₺ · Jan 19, 2026, 19:12 UTC"
 */
// @deno-types=./19.ts
// @deno-types=./aria.ts
import { $$, css, dispatch, halt, hotkey, off, on } from "./19.js"
import { ariaProperty, ariaRelatives } from "./aria.js"

// @ts-check

// @deno-types=./19.ts
/// <reference lib="es2022" />
/// <reference lib="dom" />

/**
 * @template TKey
 * @template {any[]} TRest
 * @param {(key: TKey, ...rest: TRest) => any} f
 * @returns {(key: TKey, ...rest: TRest) => any}
 */
export function memoize(f) {
  const map = new Map()
  return (key, ...args) => {
    if (map.has(key)) return map.get(key)
    const result = f(key, ...args)
    map.set(key, result)
    return result
  }
}

/**
 * Get or create the shadow root of an element.
 * By default, the shadow root will be populated by a single <slot>.
 * Will throw an error if:
 * - the element has a shadow root with mode: "closed".
 * - options were specified, but the shadow root already exists.
 * @param {Element} host
 * @param {ShadowRootInit} [options]
 * @returns {ShadowRoot}
 */
export function shadow(host, options) {
  if (options && host.shadowRoot)
    throw new Error("Cannot apply options to already existing shadow root.")
  let shadow = host.shadowRoot
  if (!shadow) {
    shadow = host.attachShadow({ ...(options ?? {}), mode: "open" })
    shadow.append(document.createElement("slot"))
  }
  return shadow
}

/**
 * @type {WeakMap<HTMLElement, ElementInternals>}
 */
const internalsMap = new WeakMap()

/**
 * Get ElementInternals for an element.
 *
 * If {@linkcode options} is passed:
 * - The internals will be created if needed,
 * - options will be Object.assign'ed to it.
 * - If the element has internals that weren't attached by this function,
 *   this function will throw.
 *
 * Otherwise, if the element has internals attached by this function,
 * it will be returned, otherwise `null` will be returned.
 * @param {Element} el
 * @param {Partial<ElementInternals>} [options]
 * @returns {ElementInternals | null}
 */
export function internals(el, options) {
  if (!(el instanceof HTMLElement)) return null
  let ints = internalsMap.get(el)
  if (options) {
    if (!ints) internalsMap.set(el, ints = el.attachInternals())
    Object.assign(ints, options)
  }
  return ints ?? null
}

/**
 * Set Custom Element States on an element.
 * @param {HTMLElement} el
 * @param {string[] | Record<string, boolean>} states
 */
export function states(el, states) {
  const ints = internals(el)
  if (!ints) throw new Error(`Could not get internals of ${el}`)
  if (Array.isArray(states)) {
    for (const state of states) ints.states.add(state)
  } else {
    for (const key in states) {
      if (states[key]) ints.states.add(key)
      else ints.states.delete(key)
    }
  }
}

/**
 * Apply a stylesheet to an element's shadow root.
 * @param {Element} el
 * @param {CSSStyleSheet} css
 */
export function stylize(el, css) {
  shadow(el).adoptedStyleSheets.push(css)
}

const and = new Intl.ListFormat("en", { type: "conjunction" })
const or = new Intl.ListFormat("en", { type: "disjunction" })

/**
 * Validate author generated markup.
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
      (ariaRelatives(el, "labelledBy").length
        || el.hasAttribute("aria-labelledby")
        || ariaProperty(el, "label")) ||
      (el.constructor.formAssociated && internals(el)?.labels.length)
    )
    if (!validLabel)
      console.error(el, "has no accessible name.")
  }

  if (sParent && !el.matches(`${sParent} > *`))
    console.error(el, "parent must match '${sParent}'.")

  if (sChildren && !el.matches(`:not(:has(> :not(${sChildren})))`))
    console.error(el, "children must match '${sChildren}'.")

  if (roles?.length && !roles.includes(role(el)))
    console.error(el, "role must be one of ${or.format(roles)}.")

  if (attrs?.length && !el.matches(attrs.map(a => `[${a}]`).join("")))
    console.error(el, "requires attributes ${and.format(attrs)}.")
}

/**
 * Get the specified role of an element (will not get HTML implied role).
 * @param {HTMLElement} el
 * @returns {string | null}
 */
export function role(el) {
  return internals(el)?.role ?? el.role
}

/**
 * @typedef {(Base: typeof HTMLElement) => typeof HTMLElement} Mixin
 */

/**
 * Apply mixins to a base class
 * @param {typeof HTMLElement} Base
 * @param {Mixin[]} mixins
 * @returns {typeof HTMLElement}
 */
function applyMixins(Base, mixins) {
  return mixins.reduce((Class, Mixin) => Mixin(Class), Base)
}

/**
 * @typedef {object} ElementDefinition
 * @property {typeof HTMLElement} [base=HTMLElement]
 * @property {Mixin[]} [mixins=[]]
 */

/**
 * Define a custom element.
 * @param {string} name
 * @param {ElementDefinition | ((el: HTMLElement) => void)} options
 * @param {((el: HTMLElement) => void)} [init]
 * @overload
 * @param {string} name
 * @param {ElementDefinition} options
 * @param {((el: HTMLElement) => void)} init
 * @returns {typeof HTMLElement}
 * @overload
 * @param {string} name
 * @param {ElementDefinition} options
 * @param {((el: HTMLElement) => void)} init
 * @returns {typeof HTMLElement}
 */
export function tag(name, options, init) {
  if (typeof options === "function") { init = options; options = {} }
  const { mixins = [], base = HTMLElement } = options
  const Base = applyMixins(base, mixins)
  return class extends Base {
    static name = name
    static observedAttributes = Base.observedAttributes || []

    constructor() {
      super()
      init(this)
      this.constructor.observedAttributes
        .filter((/** @type {string} */ attr) => !this.hasAttribute(attr))
        .forEach((/** @type {string} */ attr) =>
          dispatch(this, `attribute:${attr}`, { value: null }))
      dispatch(this, 'constructed')
    }

    connectedCallback() { dispatch(this, 'connected') }
    disconnectedCallback() { dispatch(this, 'disconnected') }
    connectedMoveCallback() { dispatch(this, 'connectedMove') }
    adoptedCallback() { dispatch(this, 'adopted') }

    /**
     *
     * @param {string} name
     * @param {string} oldValue
     * @param {string} newValue
     */
    attributeChangedCallback(name, oldValue, newValue) {
      dispatch(this, 'attributeChanged', { name, oldValue, newValue })
      dispatch(this, `attributeChanged:${name}`, { oldValue, newValue })
      dispatch(this, `attribute:${name}`, { value: newValue })
    }

    static define() { customElements.define(name, this) }
  }
}

/**
 * Define a mixin for a custom element.
 * @param {((el: HTMLElement) => void) | Mixin[]} mixins
 * @param {(el: HTMLElement) => void} [init]
 * @overload
 * @param {(el: HTMLElement) => void} mixins
 * @returns {Mixin}
 * @overload
 * @param {Mixin[]} mixins Base mixins.
 * @param {(el: HTMLElement) => void} init
 * @returns {Mixin}
 */
export function mixin(mixins, init) {
  if (typeof mixins === "function") { init = mixins; mixins = [] }

  /**
   * @param {typeof HTMLElement} Super
   */
  return (Super) =>
    class extends applyMixins(Super, mixins) {
      constructor() { super(); init(this) }
    }
}

/**
 * Mixin to add observedAttributes for a custom element.
 * @param {...string} attrs
 * @returns {Mixin}
 */
export function observeAttributes(...attrs) {
  return (/** @type {typeof HTMLElement} */ Base) => class extends Base {
    static observedAttributes = [
      ...("observedAttributes" in Base && Array.isArray(Base.observedAttributes) ? Base.observedAttributes : []),
      ...attrs.flat(),
    ]
  }
}
