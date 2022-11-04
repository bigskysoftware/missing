import { $, asHtml, attr, behavior, makelogger, on } from "./19.js";

const ilog = makelogger("overflow-nav");

/**
 * @type {import("./19.js").Behavior<{ expandedClass: string }>}
 */
const overflowNav = behavior("[data-overflow-nav]", (navbar, {
    options: { expandedClass = "expanded" }
}) => {
    const expandToggle = asHtml($(navbar, "[data-nav-expander]"));

    if (expandToggle === null) return ilog("Expand toggle missing from navbar ", navbar);

    /*
        "The scrollWidth value is equal to the minimum width the element would
        require in order to fit all the content in the viewport without using a
        horizontal scrollbar. The width is measured in the same way as
        clientWidth: it includes the element's padding, but not its border,
        margin or vertical scrollbar (if present). It can also include the
        width of pseudo-elements such as ::before or ::after. If the element's
        content can fit without a need for horizontal scrollbar, its
        scrollWidth is equal to clientWidth"
    -- MDN, "Element.scrollWidth", https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight
     */
    const overflows = () => navbar.scrollWidth > navbar.clientWidth;

    const isExpanded = () => navbar.classList.contains(expandedClass);

    const toggleExpansion = (expand = !isExpanded()) => {
        if (expand) {
            navbar.classList.add(expandedClass);
            attr(expandToggle, "aria-pressed", true);
            expandToggle.textContent = "×";
        } else {
            navbar.classList.remove(expandedClass);
            attr(expandToggle, "aria-pressed", false);
            expandToggle.textContent = "☰";
        }
    };

    const update = () => {
        const wasHidden = expandToggle.hidden
        expandToggle.hidden = !overflows();
        if (wasHidden != expandToggle.hidden) toggleExpansion(false);
    };

    on(expandToggle, "click", () => toggleExpansion());

    update();

    on(window, "resize", () => update(), { addedBy: navbar });
})

export default overflowNav;
overflowNav(document);
