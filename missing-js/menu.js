/// <reference lib="es2022" />

import { $, $$, on, dispatch, attr, next, prev, hotkey, behavior, makelogger } from "./19.js"

const
ilog = makelogger("menu"),
sMenu = "[role=menu]",
sMenuitem = "[role=menuitem]",
firstItem = menu => $(menu, sMenuitem),
lastItem  = menu => $$(menu, sMenuitem).at(-1),
isOpen = menu => !menu.hidden;

export
const
menu = behavior(sMenu, (menu, { root }) => {
    if (!(menu instanceof HTMLElement)) return;
    
    let opener;
    $$(menu, sMenuitem).forEach(item => item.setAttribute("tabindex", "-1"));
    on(menu, "menu:open", e => {
        opener = e.detail.opener;
        menu.hidden = false;
        ilog("menu:open", menu.hidden);
        firstItem(menu).focus();
        ilog("menu:open 2", menu.hidden);
    });
    on(menu, "menu:close", _ => {
        ilog("menu:close", menu.hidden = true);
        opener?.focus();
    });
    on(menu, "focusout", e => {
        if (!isOpen(menu)) return;
        if (menu.contains(e.relatedTarget)) return;
        if (opener === e.relatedTarget) return;
        dispatch(menu, "menu:close");
    });
    on(menu, "keydown", e => {
        e.preventDefault();
        hotkey({
            "ArrowUp": _ => prev(menu, sMenuitem, root.activeElement).focus(), 
            "ArrowDown": _ => next(menu, sMenuitem, root.activeElement).focus(),
            "Space": _ => /** @type HTMLElement */ (root.activeElement?.closest(sMenuitem))?.click(),
            "Home": _ => firstItem(menu).focus(),
            "End": _ => lastItem(menu).focus(),
            "Escape": _ => dispatch(menu, "menu:close"),
        })(e);
    });
    on(window, "click", e => {
        if (!isOpen(menu)) return;
        if (opener === e.target) return;
        dispatch(menu, "menu:close");
    }, { addedBy: menu });
  
}),
menuButton = behavior("[aria-haspopup=menu]", (button, { root }) => {
    const
    menu = root.getElementById(attr(button, "aria-controls"));

    on(menu, "menu:close", _ => attr(button, "aria-expanded", "false"), { addedBy: button })
    on(menu, "menu:open", _ => attr(button, "aria-expanded", "true"), { addedBy: button })
    on(button, "click", () => dispatch(menu, isOpen(menu) ? "menu:close" : "menu:open", { opener: button }));
});

menu(document);
menuButton(document);
