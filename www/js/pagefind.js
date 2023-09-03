
/// <reference lib="es2022" />

// @deno-types="../../src/js/19.js"
import { $, attr, next, prev, behavior, html, on, repeater, makelogger, hotkey, halts } from "/src/js/19.js";
import * as pagefind from "/_pagefind/pagefind.js";

// TODO: add listbox styling to missing.css

const
ilog = makelogger("searchbox"),
loadResults = results => Promise.all(results.map(async r => ({ ...r, data: await r.data() }))),
fixPagefindExcerpt = exc => exc.replace(/<(?!\/?mark)/g, "&lt;")

const // HTML components
createResultItem = (result, { id }) => html`
    <li id="${id}" role="option" onclick="this.querySelector('a').click()">
        <strong><a href="${result.data.url}" tabindex="-1">${result.data.meta.title}</a></strong>
        <code style="font-size: .8em;">${result.data.url}</code>
        <p style="font-size: .8em;">${html(fixPagefindExcerpt(result.data.excerpt))}</p>
    </li>`,
updateResultItem = (item, result) => {
    $(item, "a").textContent = result.data.meta.title;
    $(item, "code").textContent = result.data.url;
    $(item, "p").innerHTML = fixPagefindExcerpt(result.data.excerpt);
    return item;
},
searchDialog = () => {
    const markup = (html`
        <dialog class="margin f-col" style="max-width: 100%; width: 30em; max-height: 100%; height: 40em; padding-bottom: 0;">
            <label for="search-input" class="titlebar" style="margin-inline: calc(-1*var(--gap))">
                Search
            </label>
            <p><input autofocus id="search-input" class="block width:100%"></p>
            <div role="listbox" aria-label="results" class="flow-gap padding-inline" style="overflow-y: auto; margin-inline: calc(-1*var(--gap))"></div>
        </dialog>
    `);

    const dialog = $(markup, "dialog"), input = $(dialog, "input"), results = $(dialog, "[role=listbox]");
    
    const
    showSearchResults = repeater(results, {
        idOf(result) { return result.id },
        create: createResultItem,
        update: updateResultItem,
    }),
    selectedItem = () => $(results, "#" + attr(results, "aria-activedescendant")),
    selectItem = (item) => {
        selectedItem()?.classList.remove("active");
        if (!item) {
            results.removeAttribute("aria-activedescendant");
            return;
        }
        item.classList.add("active");
        attr(results, "aria-activedescendant", item.id);
        item.scrollIntoView({ block: "nearest" })
    }
    
    on(input, "input", _ => pagefind.preload(input.value));
    on(input, "input", async _ => {
        const search = await pagefind.search(ilog(input.value));
        showSearchResults(await loadResults(search.results.slice(0, 5)));
    })

    on(input, "keydown", hotkey({
        "ArrowDown": halts("default", _ => {
            const item = next(results, "[role=option]", selectedItem());
            if (item) selectItem(item);
        }),
        "ArrowUp": halts("default", _ => {
            const item = prev(results, "[role=option]", selectedItem());
            if (item) selectItem(item);
        }),
        "Enter": halts("default", _ => selectedItem()?.click()),
        "ArrowLeft": _ => selectItem(null),
        "ArrowRight": _ => selectItem(null),
        "Home": _ => selectItem(null),
        "End": _ => selectItem(null),
    }))

    document.body.append(dialog);

    return dialog;
};

const searchbox = behavior("[data-pagefind-search]", (search) => {
    const dialog = searchDialog()
    on(search, "click", _ => dialog.showModal())
});

export default searchbox;
searchbox();
