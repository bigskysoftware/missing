//@deno-types=./19.ts
import { css, makelogger, on, tag } from "./19.js"

const ilog = makelogger("icons")
const cache = new Map()

// https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
// https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
const min_size = 24  // TODO: Use WCAG21 or WCAG22? 24px or 44px?

export const icon = tag(
  "aria-icon",
  {
    internals: { ariaHidden: "true" },
    observedAttributes: ["name", "size", "fetch"],
    css: css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: inherit;
        line-height: 1;
        width: 1em; height: 1em;  // Avoid reflow
      }
      svg {
        width: 1em;
        height: 1em;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
    `,
  },
  (icon) => {

    async function fetchIcon(name) {
      if (!name) return
      if (cache.has(name)) {
        const cached = cache.get(name)
        return (typeof cached === "string") ? cached : await cached
      }

      const url = `https://unpkg.com/lucide-static@latest/icons/${name}.svg`

      const pendingFetch = (async () => {
        try {
          const response = await fetch(url)

          if (!response.ok)
            return console.error(`Icon "${name}" not found (${url}).`), ""

          const svg = await response.text()
          cache.set(name, svg)
          return svg
        } catch (error) {
          console.error(`Failed to fetch "${url}"`, error)
          cache.set(name, "")
          return ""
        }
      })()

      cache.set(name, pendingFetch)
      return pendingFetch
    }

    const validate = () => {
      const button = icon.parentElement
      if (!(button instanceof HTMLButtonElement || button.getAttribute("role") === "button"))
        return

      const rect = button.getBoundingClientRect()
      if (rect.width < min_size || rect.height < min_size)
        console.warn(icon.parentElement, `The recommended touch target size is ${min_size}px x ${min_size}px.`)
      if (!(button.hasAttribute("aria-label") || button.textContent.trim()))
        console.error(button, "has no accessible label (aria-label or text content).")
    }

    const render = async () => {
      validate()
      const name = icon.getAttribute("name")
      const svg = (icon.hasAttribute("fetch"))
        ? await fetchIcon(name)
        : `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <use href="#${name}"/>
          </svg>
        `
      icon.innerHTML = svg

      // TODO: Strip outer `<svg>` when fetching to eliminate need to resize?
      if (icon.hasAttribute("fetch"))
        resize()
    }

    const resize = () => {
      validate()
      const size = icon.getAttribute("size") || "1em"
      const svg = icon.querySelector("svg")
      if (svg)
        svg.style.width = svg.style.height = size
    }

    on(icon, "connected", validate)
    on(icon, "attribute:name", render)
    on(icon, "attribute:fetch", render)
    on(icon, "attribute:size", resize)
  }
)

icon.define()
