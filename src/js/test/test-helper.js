/**
 * @typedef {object} Test
 * @prop {Element} source
 * @prop {HTMLTemplateElement} template
 */

import { css, stylize, tag, on, html, dispatch } from "../19.js"

/**
 * @typedef {TestPass | TestFail} TestResult
 */

/**
 * @typedef {object} TestPass
 * @prop {"pass"} result
 */

/**
 * @typedef {object} TestFail
 * @prop {"fail"} result
 * @prop {Error} cause
 */

// UTILS

const AsyncFunction = (async _ => await _).constructor

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const withTimeout = (timeout, promise) => Promise.race([
  promise,
  wait(timeout).then(() => { throw new Error(`Timeout of ${timeout}ms exceeded`) })
])

// MOCK SERVER

const MockServer = class {
  constructor() {
    this.routes = new Map()
    this.originalFetch = window.fetch
    window.fetch = this.fetch
  }

  /**
   * @param {string} path
   * @param {string} content
   */
  addRoute(path, content) {
    this.routes.set(path, content)
  }

  /**
   * @param {RequestInfo | URL} input
   * @param {RequestInit} [init]
   * @returns {Promise<Response>}
   */
  fetch = (input, init) => {
    const url = input instanceof Request
      ? new URL(input.url)
      : new URL(String(input), window.location.href)
    const path = url.pathname

    if (this.routes.has(path)) {
      const content = this.routes.get(path)
      return new Response(content, { headers: { 'Content-Type': 'text/html' } })
    }

    return this.originalFetch.call(window, input, init)
  }

  restore() {
    window.fetch = this.originalFetch
  }
}

// TESTS

/**
 * @returns {TestPass}
 */
const pass = () => ({ result: "pass" })
/**
 * @param {Error} e
 * @returns {TestFail}
 */
const fail = (e) => ({ result: "fail", cause: e })

/**
 * @param {Test} test
 */
const runTestImpl = async (test) => {
  const mockServer = new MockServer()
  test.source.testRoutes.forEach(route =>
    mockServer.addRoute(route.dataset.path, route.innerHTML))

  const content = test.template.content.cloneNode(true)
  const script = content.querySelector('script')
  if (!script) throw new Error("Test lacks a script", test.source)
  script.remove()

  const testbed = document.createElement('div')
  testbed.className = "test-bed"
  testbed.hidden = true
  test.source.append(testbed)
  testbed.replaceChildren(content)
  testbed.dispatchEvent(new CustomEvent("test:init-testbed", { bubbles: true }))

  const testContext = { testbed, mockServer, nextEvent, assert, wait }
  const testFunction = new AsyncFunction(...Object.keys(testContext), script.textContent)

  try {
    await withTimeout(2000, testFunction(...Object.values(testContext)))
    return pass()
  } catch (e) {
    return fail(e instanceof Error ? e : new Error(e))
  } finally {
    mockServer.restore()
  }
}

let startTests;
const started = new Promise((resolve) => startTests = resolve)
let testQueue = started

const runTest = (test) =>
  testQueue = testQueue.then(() => runTestImpl(test))

// HTML API

export const TestCase = tag("test-case", (el) => {
  stylize(el, css`
    :host {
      display: block;
      margin-block: var(--gap);
    }
  `)

  on(el, "connected", async () => {
    await started;
    dispatch(el, "test:init", {}, { bubbles: true })

    const resultIndicator = document.createElement('data')
    resultIndicator.textContent = "...."
    resultIndicator.className = "chip mono-font margin-inline-end"
    el.prepend(resultIndicator)

    const result = await runTest({
      source: el,
      template: el.querySelector(':scope > template')
    })

    if (result.result == "pass") {
      resultIndicator.classList.add("ok")
      resultIndicator.textContent = "PASS"
      dispatch(el, "test:pass", {}, { bubbles: true })
    } else {
      resultIndicator.classList.add("bad")
      resultIndicator.textContent = "FAIL"

      el.append(html`
        <details>
          <summary>
            <samp class="bad color">${result.cause.message}</samp>
          </summary>
          <pre><samp class="bad color">${result.cause.stack}</samp></pre>
        </details>
      `)

      dispatch(el, "test:fail", result.cause, { bubbles: true })
    }
  })

  Object.defineProperty(el, "testRoutes", {
    get() { return Array.from(el.querySelectorAll("test-route")) }
  })
})

export const TestResults = tag("test-results", (el) => {
  const stats = {
    total: new Set(),
    remaining: new Set(),
    passed: new Set(),
    failed: new Set(),
  }

  const update = () => {
    el.querySelector('[data-TOTAL]').textContent = stats.total.size
    el.querySelector('[data-REMAIN]').textContent = stats.remaining.size
    el.querySelector('[data-PASS]').textContent = stats.passed.size
    el.querySelector('[data-FAIL]').textContent = stats.failed.size

    const favicon = `
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <text x="10" y="10" font-size="8" text-anchor="middle">
          <tspan fill="#88ff88">${stats.passed.size}</tspan>
          <tspan fill="#ff8888">${stats.failed.size}</tspan>
        </text>
        <text x="10" y="20" font-size="8" text-anchor="middle" fill="#ff88ff">
          ${stats.remaining.size}/${stats.total.size}
        </text>
      </svg>
    `
    const dataUri = `data:image/svg+xml,${encodeURIComponent(favicon)}`
    document.querySelector("link[rel=icon]").href = dataUri
  }

  on(el, "connected", () => {
    el.append(html`
      <div class="flex-row">
        <span class="chip mono-font ok">PASS <data class="value" data-PASS>-</data></span>
        <span class="chip mono-font bad">FAIL <data class="value" data-FAIL>-</data></span>
        <span class="chip mono-font">REMAIN <data class="value" data-REMAIN>-</data></span>
        <span class="chip mono-font">TOTAL <data class="value" data-TOTAL>-</data></span>
      </div>
    `)
    startTests()
  })

  on(window, "test:init", (e) => {
    stats.total.add(e.target)
    stats.remaining.add(e.target)
    update()
  }, { addedBy: el })

  on(window, "test:pass", (e) => {
    stats.passed.add(e.target)
    stats.remaining.delete(e.target)
    update()
  }, { addedBy: el })

  on(window, "test:fail", (e) => {
    stats.failed.add(e.target)
    stats.remaining.delete(e.target)
    update()
  }, { addedBy: el })

})

export const TestRoute = tag("test-route", (el) => {
  stylize(el, css`:host { display: none; }`)
})

TestCase.define()
TestResults.define()
TestRoute.define()

const nextEvent = (target, type) => new Promise((resolve) =>
  target.addEventListener(type, resolve, { once: true }))

const assert = (...funcs) => {
  for (const func of funcs) {
    let result
    try {
      result = func()
    } catch (e) {
      const err = new Error(`Assertion crashed: ${func} // ${e.message}`)
      err.cause = e
      throw err
    }
    if (!result) throw new Error(`Assertion failed: ${func}`)
  }
}

export { nextEvent, assert, wait }
