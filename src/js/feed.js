// @ts-check
// @deno-types=./19.ts
// @deno-types=./43.ts
import { $, halts, hotkey, makelogger, observe, on, traverse } from "./19.js"
import { internals, tag, validate } from "./43.js"
import { AriaBusy } from "./aria.js"

const ilog = makelogger("feed")

const keyTable = /** @type {const} */ ({
  "PageDown": "next",
  "PageUp": "previous",
  "Ctrl+End": "after",
  "Ctrl+Home": "before",
  "Alt+PageUp": "outside",
  "Alt+PageDown": "inside",
})

const sFocusable = /** @type {const} */ ([
  "[tabindex]:not([tabindex='-1'])",
  ":is(a, area)[href]",
  ":is(audio, video)[controls]",
  ":is(img, object)[usemap]",
  ":is(button, details, embed, iframe, input, label, select, textarea):not([disabled])",
  ":state(focusable)",
].join(", "))

const Feed = tag(
  "aria-feed",
  { mixins: [AriaBusy] },
  (el) => {
    const register = (article, idx, articles) => {
      Object.assign(article, {
        tabIndex: 0,
        ariaAtomic: "true",
        ariaPosInSet: idx + 1,
        ariaSetSize: el.hasAttribute("infinite") ? -1 : articles.length,
      })
      validate(article, { label: true, attrs: ["aria-describedby"] })
    }
    const update = () => [...el.children].forEach(register)

    const sArticle = "article, [role=article]"
    const focus = (direction) => {
      const current = document.activeElement.closest(sArticle)
      if (!current) return

      let dest = null

      if (direction == "inside")
        dest = $(current, sArticle)
      else if (direction == "outside")
        dest = current.parentElement.closest(sArticle)
      else if (direction == "next" || direction == "previous")
        dest = traverse(direction, el, sArticle, current, { wrap: false })
      else if (direction == "after" || direction == "before") {
        direction = { after: "next", before: "previous" }[direction]
        dest = traverse(direction, document.body, sFocusable, el, { wrap: false })
      }
      dest?.focus()
    }

    internals(el, {
      role: "feed",
      ariaLive: "polite",
      ariaRelevant: "additions",
      ariaKeyShortcuts: Object.keys(keyTable).join(" "),
    })
    validate(el, { label: true, sChildren: ":is(article, [role=article])", when: "connected" })

    on(el, "attribute:aria-busy", (e) => {
      if (e.detail.value !== "true")
        Array.from(el.children).forEach(register)
    })

    on(el, "keydown", hotkey(Object.fromEntries(
      Object.entries(keyTable).map(([key, value]) =>
        [key, (e) => focus(value)]
      )
    ), { halt: "default propagation" }))
  }
)

Feed.define()
