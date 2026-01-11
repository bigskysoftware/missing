// @ts-check
//@deno-types=./19.ts
import { $, halts, hotkey, internals, makelogger, observe, on, tag, traverse } from "./19.js"
import { validate } from "./validate.js"

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
  ":is(button, details, embed, iframe, label, select, textarea):not([disabled])"
].join(", "))

const Feed = tag(
  "aria-feed",
  (el) => {
    const observer = observe(el, { childList: true })
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

    on(el, "connected", (e) => {
      validate(el, { label: true, sChildren: ":is(article, [role=article])" })
      update()  // TODO: initChildren?
    })

    on(el, "mutation:childList", (e) => update())

    on(el, "keydown", hotkey(Object.fromEntries(
      Object.entries(keyTable).map(([key, value]) =>
        [key, (e) => focus(value)]
      )
    ), { halt: "default propagation" }))
  }
)

Feed.define()
