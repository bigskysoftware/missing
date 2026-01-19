// @deno-types=./19.ts
// @deno-types=./43.ts
import { attr, behavior, dispatch, halt, halts, hotkey, identify, makelogger, on } from "./19.js"
import { internals, mixin, observeAttributes, states, validate } from "./43.js"
import { ariaState, AriaDisabled } from "./aria.js"

const ilog = makelogger("command")

const commandTable = /** @type {const} */ ({
  // ref: https://html.spec.whatwg.org/#attr-button-command
  "toggle-popover": "togglePopover",
  "show-popover": "showPopover",
  "hide-popover": "hidePopover",
  "close": "close",
  "request-close": "requestClose",
  "show-modal": "showModal",
	// OpenUI polyfill
	"toggle-menu": "togglePopover",
  "show-menu": "showPopover",
  "hide-menu": "hidePopover",
})

export class CommandEvent extends Event {
  constructor(type, options = { cancelable: true }) {
    const { command, source } = options
    super("command", options)
    Object.defineProperties(this, {
      command: { value: command, configurable: false, enumerable: false, writable: false },
      source:  { value: source,  configurable: false, enumerable: false, writable: false },
    })
  }
}

const roles = /** @type {const} */ ([
  "button",
  "link",
  "menuitem",
  "menuitemcheckbox",
  "menuitemradio",
])

// ref: https://www.w3.org/TR/wai-aria-1.3/#command
export const CommandRole = mixin(
  [AriaDisabled],
  (el) => {
		states(el, ["command"])
    validate(el, { roles, when: "connected" })

    // Reflect attributes
    Object.defineProperties(el, {
      command: {
        get: () => attr(el, "command") || "",
        set: (value) => attr(el, "command", value),
        configurable: true, enumerable: true,
      },
      commandForElement: {
        get: () => el.getRootNode().getElementById(attr(el, "commandfor")),
        set: (el) => attr(el, "commandfor", el instanceof Element ? identify(el) : null),
        configurable: true, enumerable: true,
      }
    })

    // Handle ARIA
    // ref: https://www.w3.org/TR/html-aam-1.0/#att-command-popovers
    //      https://www.w3.org/TR/html-aam-1.0/#att-command-dialogs
    //      https://www.w3.org/TR/html-aam-1.0/#att-commandfor
    if (
      el.command.endsWith("popover")
      && el.commandForElement?.matches("[popover]")
      && !el.commandForElement?.contains(el)
    ) {
      internals(el, {
        ariaExpanded: String(el.commandForElement.matches(":popover-open")),
        ariaDetailsElements: [el.commandForElement],
      })
      on(el.commandForElement, "toggle", (e) =>
        internals(el, { ariaExpanded: String(e.newState === "open") }))
    }

    // Handle events
    on(el, "constructed", (e) => {
			el.tabIndex = -1
		})

    on(el, "keydown", hotkey({
      " ": (e) => dispatch(el, "click", {}, { bubbles: true }),
      "Enter": (e) => dispatch(el, "click", {}, { bubbles: true }),
    }, { halt: "default" }))

    on(el, "click", (e) => {
      if (el.hasAttribute("disabled") || ariaState(el, "disabled") || !el.commandForElement)
        return halt("default bubbling propagation", e)

      // Attempt to perform the command via method calling
      const method = el.commandForElement[commandTable[el.command]]
      if (typeof method === "function")
        method.call(el.commandForElement)
      else if (!el.command.startsWith("--"))
        console.warn(`Unsupported value for "command" attribute: "${el.command}"`)

      // Always dispatch the event
      const options = { command: el.command, source: el }
      el.commandForElement.dispatchEvent(new CommandEvent("command", options))
    })
  }
)

export const commandButton = behavior(
  "button[command][commandfor]",
  (el, { root }) => {

    // Polyfill not necessary if UA implements the functionality
    if ("command" in el && "commandForElement" in el) return

    // Submit and reset buttons cannot invoke a command
    if (el.form && el.type !== "button") {
      console.warn(
        "Buttons associated with forms that include command or commandfor attributes are ambiguous, " +
        "and require a type=button attribute. No action will be taken."
      )
      on(el, "click", (e) => halt("default propagation", e))
    }

    // Reflect attributes
    Object.defineProperties(el, {
      command: {
        get: () => attr(el, "command") || "",
        set: (value) => attr(el, "command", value),
        configurable: true, enumerable: true,
      },
      commandForElement: {
        get: () => el.getRootNode().getElementById(attr(el, "commandfor")),
        set: (value) => attr(el, "commandfor", value instanceof Element ? identify(value) : null),
        configurable: true, enumerable: true,
      }
    })

    // Handle ARIA
    // ref: https://www.w3.org/TR/html-aam-1.0/#att-command-popovers
    //      https://www.w3.org/TR/html-aam-1.0/#att-command-dialogs
    //      https://www.w3.org/TR/html-aam-1.0/#att-commandfor
    if (
      el.command.endsWith("popover")
      && el.commandForElement?.matches("[popover]")
      && !el.commandForElement?.contains(el)
    ) {
      attr(el, {
        "aria-expanded": String(el.commandForElement.matches(":popover-open")),
        "aria-details": el.commandForElement.id,
      })
      on(el.commandForElement, "toggle", (e) =>
        ariaState(el, "expanded", e.newState === "open"))
    }

    // Handle events
    on(el, "click", halts("default", (e) => {
      if (el.hasAttribute("disabled") || ariaState(el, "disabled") || !el.commandForElement)
        return halt("default bubbling propagation", e)

      // Attempt to perform the command via method calling
      const method = el.commandForElement[commandTable[el.command]]
      if (typeof method === "function")
        method.call(el.commandForElement)
      else if (!el.command.startsWith("--"))
        console.warn(`Unsupported value for "command" attribute: "${el.command}"`)

      // Always dispatch the event
      const options = { command: el.command, source: el }
      el.commandForElement.dispatchEvent(new CommandEvent("command", options))

    }))

  },
)
commandButton(document)

export const invokerOf = (el) => (el.id)
	  ? el.getRootNode().querySelector(`[popovertarget="${el.id}"], [commandfor="${el.id}"]`)
		: null
