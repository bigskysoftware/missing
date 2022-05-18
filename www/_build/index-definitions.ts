
import { Page, Site } from "lume/core.ts";



/**
 * Matches:
 *     <dfn>`.class`</dfn>
 *     <dfn>`--var`</dfn>
 *     <dfn>`<elt>`</dfn>
 */
 const definitionRE = /<dfn>`([^`]+)`/g

export default () => {
    return (site: Site) => {
        const definitionsIndex: Record<string, string> = {}
        
        site.preprocess([".md"], (page: Page) => {
            if (!page.data.content) return
            for (const definition of getDefinitions(page.data.content as string)) {
                definitionsIndex[definition] = page.data.url as string
            }
        })
        
        site.process([".md"], (page: Page) => {
            const document = page.document!
            document.getElementsByTagName("dfn").forEach(el => {
                el.id ||= el.innerText
            })
            document.getElementsByTagName("code").forEach(el => {
                if (!(el.childNodes[0].textContent in definitionsIndex)) return
                if (el.parentElement?.tagName === "DFN") return
                const a = document.createElement("a")
                a.setAttribute("href", definitionsIndex[el.innerText] + "#" + el.innerText)
                el.before(a)
                a.append(el)
            })
        })

        site.addEventListener("afterBuild", e => console.log(definitionsIndex))
    }
}

function* getDefinitions(content: string): Iterable<string> {
    let match
    while (match = definitionRE.exec(content)) {
        yield match[1]
    }
}

