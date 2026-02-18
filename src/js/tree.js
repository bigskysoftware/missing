// @deno-types=./19.ts
// @deno-types=./43.ts
import { $, css, dispatch, halts, html, hotkey, makelogger, on } from "./19.js"
import { internals, role, shadow, states, stylize, tag, validate } from "./43.js"
import { FocusGroupMixin } from "./focus.js"
import { ariaState, AriaExpanded, AriaGroup, AriaMultiSelectable, AriaSelected } from "./aria.js"
import { TypeAheadMixin } from "./typeahead.js"

const ilog = makelogger("tree")

const getLevel = (group) => {
  const tree = group.closest("aria-tree")
  let level = 1
  let current = group
  while (current !== tree) {
    if (role(current) === "group") level++
    current = current.parentElement
  }
  return level
}

const register = (e) => {
  e.detail.elements.forEach((treeitem, idx, treeitems) => {
    internals(treeitem, {
      ariaLevel: getLevel(e.target),
      ariaPosInSet: String(idx+1),
      ariaSetSize: String(treeitems.length),
    })
  })

  const current = e.detail.elements.find(ti =>
    ti.tabIndex === 0 || ariaState(ti, "selected")
  ) || e.detail.elements[0]
  current.tabIndex = 0
}

export const Tree = tag(
  "aria-tree",
  { mixins: [AriaMultiSelectable, TypeAheadMixin] },
  (el) => {
    internals(el, { role: "tree", ariaOrientation: "vertical" })
    stylize(el, css`:host { display: block; }`)
    validate(el, { sChildren: "aria-treeitem", when: "connected" })

    on(el, "slotchange", register)
  }
)

export const TreeItem = tag(
  "aria-treeitem",
  { mixins: [AriaExpanded, AriaSelected] },
  (el) => {

    internals(el, { role: "treeitem" })
    // TODO: Why is <style> in tree-view.md neccessary?
    stylize(el, css`
      :host {
        display: list-item;
        list-style-type: var(--marker, "-");
        padding-left: 0.5rem;
      }
      :host(:state(expanded))  { --marker: "-"; }
      :host(:state(collapsed)) { --marker: "+"; }
      :host(:state(collapsed):not(:has(aria-group))) { --marker: ""; }
      :host(:state(collapsed)) > aria-group { display: none; }
    `)
    shadow(el).replaceChildren(html`
      <slot name=leading></slot>
      <slot></slot>
      <slot name=trailing></slot>
    `)
    validate(el, { sParent: ":is(aria-tree, aria-group)", when: "connected" })

    const isExpanded = () => states(el).has("expandable")
      ? ariaState(el, "expanded")
      : null


    // TODO: Can AriaExpanded mixin be defined to allow for undefined?
    // TODO: Can (should?) ariaState also return undefined instead of just bool?
    on(el, "slotchange", (e) => {
      const expandable = !!$(el, ":scope > aria-group")
      states(el, { "expandable": expandable })
      if (expandable) {
        internals(el, { ariaExpanded: "false" })
        on($(el, "aria-group"), "slotchange", register)
      }
    })

    on(el, "click", halts("default propagation", (e) => {
      ariaState(el, "selected", ariaState(el, "selected") || null)
      if (states(el).has("expandable"))
        ariaState(el, "expanded", !ariaState(el, "expanded"))
    }))

    on(el, "keydown", hotkey({
      " ": (e) => dispatch(el, "click"),
      "Space": (e) => dispatch(el, "click"),
      "ArrowRight": (e) => {
        if (isExpanded() === false) {
          ariaState(el, "expanded", true)
        } else {
          const target = $(el, "aria-treeitem")
          if (target) {
            target.tabIndex = 0
            target.focus()
          }
        }
      },
      "ArrowLeft": (e) => {
        if (isExpanded() === true) {
          ariaState(el, "expanded", false)
        } else {
          const target = el.closest("aria-treeitem")
          if (target) {
            target.tabIndex = 0
            target.focus()
          }
        }
      },
    }, { halt: "default propagation" }))

    on(el, "attribute:aria-selected", (e) => {
      if (ariaState(el, "selected")) {
        dispatch(el.closest("aria-tree"), "change", { selected: el })
      }

      // TODO: Does MultiSelectable do anything?
      const multiselect = el.matches(":state(multiselectable) > *")
    })
  }
)

TreeItem.define()
AriaGroup.define()
Tree.define()
