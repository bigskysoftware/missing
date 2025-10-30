//@deno-types=./19.ts
import { attr, identify, on, halt, halts, behavior, makelogger } from "./19.js"

const ilog = makelogger("command-button")

const commandTable = /** @type {const} */ ({
  // ref: https://html.spec.whatwg.org/#attr-button-command
  "toggle-popover": "togglePopover",
  "show-popover": "showPopover",
  "hide-popover": "hidePopover",
  "close": "close",
  "request-close": "requestClose",
  "show-modal": "showModal",
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

export const commandButton = behavior(
  "button[command][commandfor]",
  (button, { root }) => {

    // Polyfill not necessary if UA implements the functionality
    if ("command" in button && "commandForElement" in button) return

    // Submit and reset buttons cannot invoke a command
    if (button.form && button.type !== "button") {
      console.warn(
        "Buttons associated with forms that include command or commandfor attributes are ambiguous, " +
        "and require a type=button attribute. No action will be taken."
      )
      on(button, "click", (e) => halt("default propagation", e))
    }

    // Reflect attributes
    Object.defineProperties(button, {
      command: {
        get: () => attr(button, "command") || "",
        set: (value) => attr(button, "command", value),
        configurable: true, enumerable: true,
      },
      commandForElement: {
        get: () => button.getRootNode().getElementById(attr(button, "commandfor")),
        set: (el) => attr(button, "commandfor", el instanceof Element ? identify(el) : null),
        configurable: true, enumerable: true,
      }
    })

    // Handle ARIA
    // ref: https://www.w3.org/TR/html-aam-1.0/#att-command-popovers
    //      https://www.w3.org/TR/html-aam-1.0/#att-command-dialogs
    //      https://www.w3.org/TR/html-aam-1.0/#att-commandfor
    if (
      button.command.endsWith("popover")
      && button.commandForElement?.matches("[popover]")
      && !button.commandForElement?.contains(button)
    ) {
      attr(button, {
        "aria-expanded": String(button.commandForElement.matches(":popover-open")),
        "aria-details": button.commandForElement.id,
      })
      on(button.commandForElement, "toggle", (e) =>
        button.ariaExpanded = String(e.newState === "open"))
    }

    // Handle events
    on(button, "click", halts("default", (e) => {
      if (!button.commandForElement) return

      // Attempt to perform the command via method calling
      const method = button.commandForElement[commandTable[button.command]]
      if (typeof method === "function")
        method.call(button.commandForElement)
      else if (!button.command.startsWith("--"))
        ilog(`WARNING: unsupported value for "command" attribute: "${button.command}"`)

      // Always dispatch the event
      const options = { command: button.command, source: button }
      button.commandForElement.dispatchEvent(new CommandEvent("command", options))

    }))

  },
)

commandButton(document)
