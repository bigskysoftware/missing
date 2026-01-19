//@deno-types=./19.ts
import { halt, makelogger, mixin, on } from "./19.js"
import { ariaState, AriaState } from "./aria.js"

const ilog = makelogger("aria")

export const AriaDisabled = mixin(
  [AriaState("disabled")],
  (el) => {
    on(el, "click", (e) => {
      if (ariaState(el, "disabled"))
        halt("default bubbling propagation", ilog("inhibited event:", e))
    })
  }
)
