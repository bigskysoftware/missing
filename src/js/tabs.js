/// a tabs library.

//@deno-types=./19.ts
import { $, $$, on, off, halts, attr, next, prev, asHtml, hotkey, identify, dispatch } from "./19.js"

// TODO: Do we need to worry about MutationObserver?
// TODO: Could we add null safety to attr()?
// TODO: Is there a better way to do display=block
export class ariaTablist extends HTMLElement {
  /* Custom element implementation of the Tabs Pattern as specified by the
   * ARIA Authoring Practices Guide (APG).
   *
   * https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
   *
   */

  static sTab = ":is(aria-tab, [role=tab])"
  static sCurrentTab = ":is(aria-tab, [role=tab])[aria-selected=true]"

  /**
   * @returns {HTMLElement[]}
   */
  get tabs() { return $$(this, ariaTablist.sTab) }

  /**
   * @returns {HTMLElement | null}
   */
  get currentTab() { return $(this, ariaTablist.sCurrentTab) }

  focusCurrentTab = () => this.currentTab?.focus()
  focusNextTab = e => asHtml(next(this, ariaTablist.sTab, asHtml(e.target)))?.focus()
  focusPrevTab = e => asHtml(prev(this, ariaTablist.sTab, asHtml(e.target)))?.focus()
  focusFirstTab = () => this.tabs.at(0)?.focus()
  focusLastTab = () => this.tabs.at(-1)?.focus()

  setAttributes = () => {
    this._internals.ariaRole = "tablist"
    this.tabIndex = 0
    if (!(this.hasAttribute("aria-labelledby") || this.hasAttribute("aria-label")))
      console.error("Tablist", this, "has no accessible name (aria-label or aria-labelledby)");
  }

  setInteractions = () => {
    this.eventListeners = {
      "focus": on(this, "focus", this.focusCurrentTab),
      "keydown": on(this, "keydown", hotkey({
        "ArrowRight": this.focusNextTab,
        "ArrowLeft": this.focusPrevTab,
        "Home": halts("default", this.focusFirstTab),
        "End": halts("default", this.focusLastTab),
      }))
    }
  }

  removeInteractions = () => {
    for (const eventType in this.eventListeners) {
      off(this.eventListeners[eventType])
      delete this.eventListeners[eventType]
    }
  }

  constructor() {
    super()
    this._internals = this.attachInternals()
  }

  connectedCallback() {
    this.setAttributes()
    this.setInteractions()

    this.currentTab?.switchTab({ focusTab: false })
  }

  disconnectedCallback() {
    this.removeInteractions()
  }

}

export class ariaTab extends HTMLElement {

  /**
   * @returns {HTMLElement | null}
   */
  get tablist() { return this.closest('aria-tablist') }

  /**
   * @returns {HTMLElement | null}
   */
  get tabpanel() { return document.getElementById(attr(this, "aria-controls")) }

  /**
   * @returns {void}
   */
  switchTab = ({ focusTab = true } = {}) => {
    const curtab = this.tablist?.currentTab

    if (curtab) {
      attr(curtab, { ariaSelected: false, tabindex: -1 })
      curtab.tabpanel?.setAttribute("hidden", true)
    }

    attr(this, { ariaSelected: true, tabindex: 0 })
    this.tabpanel?.removeAttribute("hidden")

    if (focusTab) this.focus()
    this.tablist?.setAttribute("tabindex", -1)

    dispatch(curtab, "missing-switch-away", { to: this })
    dispatch(this, "missing-switch-to", { from: curtab })
    dispatch(this.tablist, "missing-change", { from: curtab, to: this })
  }

  setAttributes = () => {
    this._internals.ariaRole = "tab"
    this.tabIndex = -1
    this.tabpanel?.setAttribute("aria-labelledby", identify(this))

    if (attr(this, "aria-controls") === null)
      console.error("Tab", this, "has no associated tabpanel");
  }

  setInteractions = () => {
    this.eventListeners = {
      "click": on(this, "click", this.switchTab),
      "focus": on(this, "focus", this.switchTab),
    }
  }

  removeInteractions = () => {
    for (const eventType in this.eventListeners) {
      off(this.eventListeners[eventType])
      delete this.eventListeners[eventType]
    }
  }

  constructor() {
    super()
    this._internals = this.attachInternals()
  }

  connectedCallback() {
    this.setAttributes()
    this.setInteractions()
  }

  disconnectedCallback() {
    this.removeInteractions()
  }

}

export class ariaTabPanel extends HTMLElement {

  setAttributes = () => {
    this._internals.ariaRole = "tabpanel"
    this.style.display = "block"
  }

  constructor() {
    super()
    this._internals = this.attachInternals()
  }

  connectedCallback() {
    this.setAttributes()
  }

}


// Must define elements in this order
customElements.define("aria-tabpanel", ariaTabPanel)
customElements.define("aria-tab", ariaTab)
customElements.define("aria-tablist", ariaTablist)
