import { $, on, mixin, makelogger } from "./19.js"
import { invokerOf } from "./command.js"

const ilog = makelogger("popover-position")

export const PopoverPositionMixin = mixin(
  (el) => {
		const position = () => {
			const invoker = invokerOf(el)
			const viewport = document.documentElement

			if (!invoker || !el.matches(":popover-open")) return

			const invokerRect = invoker.getBoundingClientRect()
			const popoverRect = el.getBoundingClientRect()

			let top = invokerRect.bottom + window.scrollY
			let left = invokerRect.left + window.scrollX

			const spaceBelow = viewport.clientHeight - invokerRect.bottom
			if (popoverRect.height > spaceBelow && invokerRect.top > popoverRect.height)
				top = invokerRect.top - popoverRect.height + window.scrollY

			const spaceRight = viewport.clientWidth - invokerRect.left
			if (popoverRect.width > spaceRight)
				left = invokerRect.right - popoverRect.width + window.scrollX

			el.style.position = "absolute"
			el.style.top = `${top}px`
			el.style.left=  `${left}px`
		}

		on(el, "toggle", (e) => {
			if (e.newState === "open")
				requestAnimationFrame(position)
		})
		on(window, "resize", () => position())
		on(document, "scroll", (e) => {
			if (e.target.contains(el) || e.target === document)
				position()
		}, { capture: true })
	}
)
