import type { Site } from "lume/core.ts";

/**
 * Includes the filters:
 *   - `peekHtml` for generating a text extract from HTML
 *   - `repeat`, a loop with extra features
 */
export default () => {
    return (site: Site) => {
        site.filter("peekHtml", peekHtml)
        site.filter("repeat", repeat)
    }
}

function peekHtml(html: string, n: number = 80) {
    const text = html.replace(/<\/?[^>]+(>|$)/g, "").replace(/\s+/g, " ")
    if (text.length < n) return text
    else return text.slice(0, n - 1) + "…"
}

interface LoopContext {
    i: number
    first: boolean
    last?: boolean
    sep(s: string): string
}

function repeat<T>(
    root: Iterable<T>,
    cb: (t: T, loop: LoopContext) => void
): void {
    // deno-lint-ignore no-explicit-any
    function hasLength(a: any): a is { length: number } {
        return "length" in a && typeof a.length === "number"
    }
    
    let i = 0
    for (const t of root) {
        const ctx: LoopContext = {
            i,
            first: i === 0,
            sep(s) {
                return this.last ? "" : s
            }
        }
    
        if (hasLength(root)) {
            ctx.last = i === root.length - 1
        }
    
        cb(t, ctx)
        i++
    }
}

