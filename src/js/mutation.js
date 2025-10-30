//@deno-types=./19.ts
import { dispatch, mixin, on } from "./19.js"

export const MutationMixin = (mutationOptions) => mixin((el) => {
  on(el, "connect", (e) => {
    el.observer = new MutationObserver((records, observer) =>
      records.forEach(r => dispatch(this, `mutation:${r.type}`, r)))
    el.observer.observe(el, mutationOptions)
  })

  on(el, "disconnected", (e) =>
    el.observer?.disconnect())
})
