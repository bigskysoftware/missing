// @deno-types=./19.ts
// @deno-types=./43.ts
import { $$, attr, html, makelogger, on } from "./19.js"
import { internals, shadow, tag, validate } from "./43.js"
import { AriaOrientation, AriaGroup, AriaSeparator } from "./aria.js"
import { FocusGroupMixin } from "./focus.js"
import { PopoverPositionMixin } from "./popover.js"
import { invokerOf, CommandRole } from "./command.js"

const ilog = makelogger("menu")

const MenuBar = tag(
  "aria-menubar",
  { mixins: [FocusGroupMixin] },
  (el) => {
    internals(el, { role: "menubar" })

    on(el, "slotchange", (e) => {
      const menuitems = e.detail.elements
      const current = menuitems.find(t => t.tabIndex == 0) || menuitems[0]
      current.tabIndex = 0
    })
  }
)

const MenuList = tag(
  "aria-menulist",
  { mixins: [FocusGroupMixin, PopoverPositionMixin, AriaOrientation] },
  (el) => {
    internals(el, {
			role: "menu",
			ariaOrientation: "vertical",
			ariaLabelledByElements: (el.popover) ? [invokerOf(el)] : null,
		})
    validate(el, { attrs: ["id"], sChildren: "aria-menuitem, aria-group, aria-separator", when: "connected" })

    on(el, "slotchange", (e) => {
      const menuitems = $$(el, "aria-menuitem")
      const current = menuitems.find(t => t.tabIndex == 0) || menuitems[0]
      current.tabIndex = 0
    })

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
    shadow(el).replaceChildren(html`
      <slot name=leading></slot>
      <slot></slot>
      <slot name=trailing></slot>
    `)
    validate(el, { sParent: ":is(aria-menubar, aria-menulist, aria-group)", when: "connected" })

    if (internals(el).ariaHasPopup === "menu") {
      const submenu = el.popoverTargetElement
      if (internals(submenu).role != "menu")
        console.error("Menu button", el, "has no associated menu")

      internals(el).ariaControlsElements = [submenu]
      internals(submenu).ariaLabelledByElements = [el]
    }
  }
)

MenuList.define()
MenuItem.define()
MenuBar.define()
AriaGroup.define()
AriaSeparator.define()
