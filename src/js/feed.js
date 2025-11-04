//@deno-types=./19.ts
import { $, on, halts, hotkey, traverse, makelogger, tag } from "./19.js"
import { validate } from "./validate.js"
import { MutationMixin } from "./mutation.js"

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

const feed = tag(
  "aria-feed",
  {
    internals: {
      role: "feed",
      ariaLive: "polite",
      ariaRelevant: "additions",
      ariaKeyShortcuts: Object.keys(keyTable).join(" "),
    },
    mixins: [
      MutationMixin({ childList: true }),
      validate({ name: true, sChildren: ":is(article, [role=article])" }),
    ],
  },
  (feed) => {
    const register = (article, idx, articles) => {
      Object.assign(article, {
        tabIndex: 0,
        ariaAtomic: "true",
        ariaPosInSet: idx + 1,
        ariaSetSize: feed.hasAttribute("infinite") ? -1 : articles.length,
      })

      if (!article.hasAttribute("aria-labelledby"))
        console.error(article, "has no accessible name (aria-labelledby)")
      if (!article.hasAttribute("aria-describedby"))
        console.warn(article, "has no accessible description (aria-describedby)")
    }
    const update = () => [...feed.children].forEach(register)

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
        dest = traverse(direction, feed, sArticle, current, { wrap: false })
      else if (direction == "after" || direction == "before") {
        direction = { after: "next", before: "previous" }[direction]
        dest = traverse(direction, document.body, sFocusable, feed, { wrap: false })
      }
      dest?.focus()
    }

    on(feed, "connected", (e) => update())

    on(feed, "mutation:childList", (e) => update())

    on(feed, "keydown", hotkey(Object.fromEntries(
      Object.entries(keyTable).map(([key, value]) =>
        [key, halts("default propagation", (e) => focus(value))]
      )
    )))
  }
)

feed.define()
