
import { nanoid } from "https://esm.sh/nanoid/non-secure/index.js";
import { $, attr, next, prev, debounce, behavior, html, on, repeater, makelogger, hotkey, halt } from "./19.js";
import * as pagefind from "/_pagefind/pagefind.js";

// TODO: add listbox styling to missing.css

const
ilog = makelogger("searchbox"),
loadResults = results => Promise.all(results.slice(0, 5).map(async r => ({ ...r, data: await r.data() }))),
fixPagefindExcerpt = exc => exc.replace(/<(?!\/?mark)/g, "&lt;"),
createResultItem = (result, { id }) => html`
    <li id="${id}" role="option" onclick="this.querySelector('a').click()" style="border-radius: var(--border-radius);">
        <header>
            <a class="bold" style="text-decoration:underline" href="${result.data.url}" tabindex="-1">${result.data.meta.title}</a>
            <code style="font-size: .8em;">${result.data.url}</code>
        </header>
        <p style="font-size: .8em;">${html(fixPagefindExcerpt(result.data.excerpt))}</p>
    </li>`,
updateResultItem = (item, result) => {
    $(item, "a").textContent = result.data.meta.title;
    $(item, "code").textContent = result.data.url;
    $(item, "p").innerHTML = fixPagefindExcerpt(result.data.excerpt);
    return item;
}

const searchbox = behavior("[data-pagefind-search]", (container, { root }) => {
    const popupId = nanoid();
    container.replaceChildren(html`
        <div>
            <label class="bold">
                Search
                <input role="combobox" aria-controls="${popupId}" aria-expanded="false">
            </label>
            <ul role="listbox" class="box flow-gap" id="${popupId}" hidden
                style="
                    list-style: none;
                    width: min(100%, 30em);
                    position: absolute;
                    z-index: 10;"></ul>
        </div>
    `)
    const input = $(container, "input"), popup = $(container, "ul");
    
    
    const
    showSearchResults = repeater(popup, {
        idOf(result) { return result.id },
        create: createResultItem,
        update: updateResultItem,
    }),
    togglePopup = (on = popup.hidden) => {
        if (on) {
            popup.hidden = false;
            attr(input, "aria-expanded", true);
        } else {
            popup.hidden = true;
            attr(input, "aria-expanded", false);
        }
    },
    selectedItem = () => root.getElementById(attr(popup, "aria-activedescendant")),
    selectItem = (item) => {
        selectedItem()?.classList.remove("active");
        if (!item) {
            popup.removeAttribute("aria-activedescendant");
            return;
        }
        item.classList.add("active");
        attr(popup, "aria-activedescendant", item.id);
        item.scrollIntoView({ block: "nearest" })
    },
    positionPopup = () => {
        const rect = input.getBoundingClientRect();
        popup.style.top = rect.bottom + "px";
        popup.style.left = rect.left + "px";
    };
    
    on(window, "resize", positionPopup, { addedBy: container })

    on(input, "blur", _ => togglePopup(false));

    on(input, "input", _ => pagefind.preload(input.value));
    on(input, "input", debounce(300, async _ => {
        if (input.value === "") {
            togglePopup(false)
            return;
        }
        togglePopup(true);
        console.log(input.value);
        const search = await pagefind.search(input.value);
        showSearchResults(await loadResults(search.results.slice(5)));
    }))

    on(input, "keydown", hotkey({
        "Escape": halt("default", _ => togglePopup(false)),
        "ArrowDown": halt("default", _ => {
            const item = next(popup, "[role=option]", selectedItem());
            if (item) selectItem(item);
        }),
        "ArrowUp": halt("default", _ => {
            const item = prev(popup, "[role=option]", selectedItem(), { wrap: false });
            if (item) selectItem(item);
            else selectItem(null);
        }),
        "Enter": halt("default", _ => selectedItem().click()),
        "ArrowLeft": _ => selectItem(null),
        "ArrowRight": _ => selectItem(null),
        "Home": _ => selectItem(null),
        "End": _ => selectItem(null),
    }))
});

export default searchbox;
searchbox();
