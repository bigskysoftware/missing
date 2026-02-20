// @deno-types=./19.ts
// @deno-types=./43.ts
import { $, $$, halt, hotkey, makelogger, observe, on, traverse } from "./19.js"
import { internals, states, tag, validate } from "./43.js"
import { ariaProperty, ariaState, AriaOrientation } from "./aria.js"
import { INACTIVE_TABINDEX, sFocusable, keyTable } from "./focus.js"

const ilog = makelogger("toolbar")

export const Toolbar = tag(
  "aria-toolbar",
	{ mixins: [AriaOrientation] },
  (el) => {
    internals(el, { role: "toolbar" })
    states(el, ["focusgroup"])
    validate(el, { label: true, when: "connected" })

    const writingMode = () => getComputedStyle(el).writingMode
    const direction = () => getComputedStyle(el).direction
    const orientation = () => ariaProperty(el, "orientation")
    const wrapping = ()  => el.hasAttribute("wrap")

    const movement = (key) =>
      keyTable[writingMode()][direction()][orientation()][key]

    const sMember = sFocusable
    const members = () => $$(el, sMember)
    const current = () => el.contains(document.activeElement)
      ? document.activeElement
      : null

    const focusTo = (dest) => {
      const ms = members()
      if (!ms.includes(dest)) return
      ms.filter(
				m => m.tabIndex != -1
			).forEach(
			  m => m.tabIndex = INACTIVE_TABINDEX
			)
			//if (dest.tabIndex !== -1)
      dest.tabIndex = 0
      dest.focus()
    }

	  const update = () => {
      if (current()) return
      const ms = members()
      if (!ms.length) return
      const preferred = ms.find(
        m => ariaState(m, "checked") || ariaState(m, "selected")
      ) || ms[0]
      preferred.tabIndex = 0
    }

    observe(el, { subtree: true, childList: true }, update)
    on(el, "connected", (e) => update())

    on(el, "focusin", (e) => focusTo(e.target))

    on(el, "keydown", hotkey({
      "Home": (e) => focusTo($(el, sMember)),
      "End":  (e) => focusTo(members().at(-1)),
    }, { halt: "default propagation" }))

    on(el, "keydown", (e) => {
      const mvt = e.key.startsWith("Arrow") && movement(e.key.slice(5))
      if (mvt) {
        halt("default", e)
        focusTo(traverse(mvt, el, sMember, current(), { wrap: wrapping() }))
      }
    })

    on(el, "click", (e) => {
      const sDisabled = "[aria-disabled=true], [aria-disabled=true] *"
      if (e.target.matches(sDisabled))
        halt("propagation", e)
    }, { capture: true })
  }
)

export const InputButton = tag(
  "input-button",
	(el) => {
    internals(el, { role: "button" })
    states(el, ["focusable"])

		let input
		const sInput = `:is(
		  input,
			select,
			textarea,
		`

		const focusgroup = () => el.closest(":state(focusgroup)")
		// TODO: Implement arrowTable, c.f. focus.keyTable and aria.AriaMultiSelectable
    const arrow = (ariaProperty(focusgroup(), "orientation") === "horizontal")
      ? { next: "ArrowRight", prev: "ArrowLeft", before: "ArrowUp", after: "ArrowDown" }
      : { next: "ArrowDown", prev: "ArrowUp", before: "ArrowLeft", after: "ArrowRight" }

		// TODO: This actually doesn't work bc our events are not isTrusted
	  const forward = (el, e) => {
			input.dispatchEvent(new KeyboardEvent("keydown", {
				key: e.key,
				ctrlKey: e.ctrlKey,
				metaKey: e.metaKey,
				shiftKey: e.shiftKey,
			}))
		}

		on(el, "connected", (e) => {
		  input = $(el, sInput)
			if (input) input.tabIndex = -1
		})

		on(el, "keydown", hotkey({
			"Escape": (e) => el.focus(),
			"Enter": (e) => input.focus(),
			[arrow.prev]: (e) => { if (e.target !== el) halt("propagation", e) },
			[arrow.next]: (e) => { if (e.target !== el) halt("propagation", e) },
			[arrow.before]: (e) => forward(el, e),
			[arrow.after]: (e) => forward(el, e),
		}, { halts: "default" }))

		on(el, "focusin", (e) => {
			if (e.target === input)
  			halt("propagation", e)  // Prevent focusTo()
		})
	}
)

Toolbar.define()
InputButton.define()
