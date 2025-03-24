/// <reference lib="es2022" />

import { $, $$, on, off, halts, attr, next, prev, asHtml, hotkey } from "./19.js"


export class ariaFeed extends HTMLElement {
  /* Custom element implementation of the Feed Pattern as specified by the
   * ARIA Authoring Practices Guide (APG).
   *
   * https://www.w3.org/WAI/ARIA/apg/patterns/feed/
   *
   */

  static sScopedArticle = ":scope > :is(article, [role=article])"
  static sArticle = "article, [role=article]"
  static sFocusable = [
    "[tabindex]:not([tabindex='-1'])",
    ":is(a, area)[href]",
    ":is(audio, video)[controls]",
    ":is(img, object)[usemap]",
    ":is(button, details, embed, iframe, label, select, textarea):not([disabled])",
  ].join(", ")

  focusPreviousArticle = () => asHtml(
    prev(this, ariaFeed.sArticle, document.activeElement, {wrap: false})
  )?.focus()

  focusNextArticle = () => asHtml(
    next(this, ariaFeed.sArticle, document.activeElement.closest(ariaFeed.sArticle), {wrap: false})
  )?.focus()

  focusOutsideNestedFeed = () => asHtml(
    document.activeElement.parentElement.closest(ariaFeed.sArticle)
  )?.focus()

  focusInsideNestedFeed = () => asHtml(
    $(document.activeElement.closest(ariaFeed.sArticle), ariaFeed.sArticle)
  )?.focus()

  focusBeforeFeed = () => asHtml(
    prev(document.body, ariaFeed.sFocusable, this, {})
  )?.focus()

  focusAfterFeed = () => asHtml(
    next(document.body, ariaFeed.sFocusable, this, {})
  )?.focus()

  setChildAttributes = () => {
    $$(this, ariaFeed.sScopedArticle).forEach((article, idx, articles) => {
      attr(article, { ariaPosInSet: idx + 1, ariaSetSize: articles.length, tabindex: 0 })
      if (!(article.hasAttribute("aria-labelledby") || article.hasAttribute("aria-label")))
        console.error("Article", this, "has no accessible name (aria-label or aria-labelledby)");
    })
    this._internals.ariaBusy = "false"
  }

  setAttributes = () => {
    this._internals.ariaRole = "feed"
    this._internals.ariaLive = "polite"
    this.setChildAttributes()
  }

  setInteractions = () => {
    this.keydownListener = on(this, "keydown", hotkey({
      "PageUp": halts("default propagation", this.focusPreviousArticle),
      "PageDown": halts("default propagation", this.focusNextArticle),
      "Ctrl+Home": halts("default propagation", this.focusBeforeFeed),
      "Ctrl+End": halts("default propagation", this.focusAfterFeed),
      "Alt+PageUp": halts("default", this.focusOutsideNestedFeed),
      "Alt+PageDown": halts("default", this.focusInsideNestedFeed),
    }))
  }

  removeInteractions = () => {
    if (this.keydownListener) {
      off(this.keydownListener)
      this.keydownListener = null
    }
  }

  handleMutations = (mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        this.setChildAttributes()
        this.setInteractions()
      }
    }
  }

  constructor() {
    super()
    this._internals = this.attachInternals()

    this.observer = new MutationObserver(this.handleMutations)
    this.observer.observe(this, {
      childList: true,
      attributes: false,
      characterData: false,
      subtree: true,
    })
  }

  connectedCallback() {
    this.setAttributes()
    this.setInteractions()
  }

  disconnectedCallback() {
    this.observer.disconnect()
    this.removeInteractions()
  }

}


customElements.define("aria-feed", ariaFeed)
