/// <reference lib="es2022" />

import { $, $$, on, off, halts, next, prev, asHtml, hotkey } from './19.js'


export class ariaFeed extends HTMLElement {
  /* Custom element implementation of the Feed Pattern as specified by the
   * ARIA Authoring Practices Guide (APG).
   *
   * https://www.w3.org/WAI/ARIA/apg/patterns/feed/
   *
   */

  static sScopedArticle = ':scope > :is(article, [role=article])'
  static sArticle = 'article, [role=article]'
  static sFocusable = [
    '[tabindex]:not([tabindex="-1"])',
    ':is(a, area)[href]',
    ':is(audio, video)[controls]',
    ':is(img, object)[usemap]',
    ':is(button, details, embed, iframe, label, select, textarea):not([disabled])',
  ].join(', ')

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

  setAriaAttributes = () => {
    $$(this, ariaFeed.sScopedArticle).forEach((article, idx, articles) => {
      article.setAttribute('tabindex', '0')
      article.setAttribute('aria-posinset', idx + 1)
      article.setAttribute('aria-setsize', articles.length)
      if (!(article.hasAttribute('aria-labelledby') || article.hasAttribute('aria-label')))
        console.error(
          '<aria-feed>: Article has no accessible name (aria-label or aria-labelledby)',
          article
        )
    })
  }

  setAriaInteractions = () => {
    this.keydownListener = on(this, 'keydown', hotkey({
      'PageUp': halts('default propagation', _ => this.focusPreviousArticle()),
      'PageDown': halts('default propagation', _ => this.focusNextArticle()),
      'Ctrl+Home': halts('default propagation', _ => this.focusBeforeFeed()),
      'Ctrl+End': halts('default propagation', _ => this.focusAfterFeed()),
      'Alt+PageUp': halts('default', _ => this.focusOutsideNestedFeed()),
      'Alt+PageDown': halts('default', _ => this.focusInsideNestedFeed()),
    }))
  }

  removeAriaInteractions = () => {
    if (this.keydownListener) {
      off(this.keydownListener)
      this.keydownListener = null
    }
  }

  constructor() {
    super()
    this.observer = new MutationObserver(this.handleMutations.bind(this))
    this.observer.observe(this, {
      childList: true,
      attributes: false,
      characterData: false,
      subtree: true,
    });
  }

  connectedCallback() {
    this.setAttribute('role', 'feed')
    this.setAttribute('aria-live', 'polite')
    this.setAttribute('aria-busy', 'false')
    this.setAriaAttributes()
    this.setAriaInteractions()
  }

  disconnectedCallback() {
    this.observer.disconnect()
    this.removeAriaInteractions()
  }

  handleMutations(mutationsList) {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        this.setAriaAttributes()
        this.setAriaInteractions()
      }
    }
  }
}


customElements.define('aria-feed', ariaFeed)
