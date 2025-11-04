//@deno-types=./19.ts
import { dispatch, makelogger, mixin, on } from "./19.js"

const ilog = makelogger("mutation")

export const MutationMixin = (mutationOptions) => mixin((el) => {
  on(el, "connected", (e) => {
    el.observer = new MutationObserver((records, observer) =>
      records.forEach(r => dispatch(el, `mutation:${r.type}`, r)))
    el.observer.observe(el, mutationOptions)
  })

  on(el, "disconnected", (e) =>
    el.observer?.disconnect())
})
