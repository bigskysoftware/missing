// @deno-types=./19.ts
// @deno-types=./43.ts
import { css, makelogger, on } from "./19.js"
import { internals, observeAttributes, shadow, stylize, tag } from "./43.js"

const ilog = makelogger("icons")
const cache = new Map()

// ref: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
const minSize = 24

const latest = "0.552.0"  // Avoid CDN redirect
const url = `https://unpkg.com/lucide-static@${latest}/icons/`

export const icon = tag(
  "aria-icon",
  { mixins: [observeAttributes("name", "aria-label", "aria-labelledby")] },
  (icon) => {

    const fetchIcon = async (name) => {
      if (name) name = name.replace("lucide-", "")
      else return ""

      if (cache.has(name)) {
        const cached = cache.get(name)
        return (typeof cached === "string") ? cached : await cached
      }

      const result = (async () => {
        let str = ""
        try {
          const response = await fetch(`${url}${name}.svg`)
          if (response.ok)
            str = await response.text()
          else throw new Error(`HTTP Error ${response.status}: ${response.url}.`)
        } catch (error) {
          console.error(`Failed to load icon "${name}".`, error)
        }
        cache.set(name, str)
        return str
      })()

      cache.set(name, result)
      return result
    }

    const useIcon = (name) => `
      <!-- @license lucide-static v0.552.0 - ISC -->
      <svg
        class="lucide lucide-${name}"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <!-- TODO: really only need to define this once... -->
        <style>symbol[id^=lucide] > * {
          fill: var(--icon-fill, none);
          stroke: var(--icon-stroke, currentColor);
          stroke-width: var(--icon-stroke-width, 2px);
          stroke-linecap: var(--icon-stroke-linecap, round);
          stroke-linejoin: var(--icon-stroke-linejoin, round);
        }</style>
        <use href="#${name}"/>
      </svg>`

    const validate = () => {
      const clickable = icon.parentElement
      if (!(clickable instanceof HTMLButtonElement || clickable instanceof HTMLAnchorElement))
        return

      const rect = clickable.getBoundingClientRect()
      if (rect.width < minSize || rect.height < minSize)
        console.warn(icon.parentElement,
          `WCAG 2.2 minimum target size is ${minSize}px x ${minSize}px.`
        )
      if (!(clickable.hasAttribute("aria-label") || clickable.textContent.trim()))
        console.error(clickable,
          "has no accessible label (aria-label or text content)."
        )
    }

    const render = async () => {
      const name = icon.getAttribute("name")
      if (icon.hasAttribute("fetch"))
        shadow(icon).innerHTML = await fetchIcon(name)
      else
        // <use href> can't resolve in ShadowDOM :(
        icon.innerHTML = useIcon(name)
    }

    const label = (value) => {
      internals(icon, {
        ariaHidden: (value) ? "false" : "true",
        role: (value) ? "img" : null,
      })
    }

    internals(icon, { ariaHidden: "true" })
    stylize(icon, css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: inherit;
        line-height: 1;
        width: 1em;
        height: 1em;
      }
      svg {
        width: 100%;
        height: 100%;
        fill: var(--icon-fill, none);
        stroke: var(--icon-stroke, currentColor);
        stroke-width: var(--icon-stroke-width, 2px);
        stroke-linecap: var(--icon-stroke-linecap, round);
        stroke-linejoin: var(--icon-stroke-linejoin, round);
      }
    `)
    on(icon, "connected", (e) => validate())
    on(icon, "attribute:name", (e) => render())
    on(icon, "attribute:aria-label", (e) => label(e.detail.value))
    on(icon, "attribute:aria-labelledby", (e) => label(e.detail.value))
  }
)

icon.define()
