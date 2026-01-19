//@deno-types=./19.ts
import { attr, internals, makelogger, on, tag } from "./19.js"
import { validate } from "./validate.js"
import { FocusGroupMixin } from "./focusgroup.js"
import { PopoverPositionMixin } from "./popover.js"
import { invokerOf, CommandRole } from "./command.js"

const ilog = makelogger("menu")

const MenuBar = tag(
  "aria-menubar",
  { mixins: [FocusGroupMixin] },
  (el) => {
    internals(el, { role: "menubar" })
  }
)

const MenuList = tag(
  "aria-menulist",
  { mixins: [FocusGroupMixin, PopoverPositionMixin] },
  (el) => {
    internals(el, {
			role: "menu",
			ariaOrientation: "vertical",
			ariaLabelledByElements: (el.popover) ? [invokerOf(el)] : null,
		})
    validate(el, { attrs: ["id"], sChildren: "aria-menuitem, hr, fieldset", when: "connected" })

    on(el, "toggle", (e) => {
			if (e.newState === "open")
        // Wait for PopoverPositionMixin
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.children[0].focus()
          })
        })
    })

		on(el, "focusout", (e) => {
      if (!el.contains(e.relatedTarget))
  			el.hidePopover()
		})
  }
)

const MenuItem = tag(
  "aria-menuitem",
  { mixins: [CommandRole] },
  (el) => {
    const type = attr(el, "type") || ""
    if (type && !(type === "radio" || type == "checkbox"))
      throw new Error(el, "Unexpected value for attribute 'type'.")

    internals(el, {
      role: `menuitem${type}`,
      ariaChecked: (type === "radio" || type === "checkbox") ? "false" : null,
      ariaHasPopup: (el.popoverTargetElement) ? "menu" : null,
      ariaExpanded: (el.popoverTargetElement) ? "false" : null,
    })
    validate(el, { sParent: ":is(aria-menubar, aria-menulist, fieldset)", when: "connected" })

    if (internals(el).ariaHasPopup === "menu") {
      // TODO: browserlist: .popoverTargetElement
      const submenu = el.popoverTargetElement
      if (internals(submenu).role != "menu")
        console.error("Menu button", el, "has no associated menu")

      // TODO: Use ariaRelatives
      if ('ariaControlsElements' in internals(el)) {
        internals(el).ariaControlsElements = [submenu]
        internals(submenu).ariaLabelledByElements = [el]
      } else {
        attr(el, 'aria-controls', identify(submenu))
        attr(submenu, 'aria-labelledby', identify(el))
      }
    }
  }
)

MenuList.define()
MenuItem.define()
MenuBar.define()
