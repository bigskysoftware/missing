import { $, attr, behavior, makelogger, on } from "./19.js";

export
const overflowNav = behavior("[data-overflow-nav]", (navbar, { options }) => {
    const {
        expandedClass = "expanded"
    } = options;

    const
    expandToggle = $(navbar, "[data-nav-expander]");

    const
    ilog = makelogger("overflow-nav"),

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
    overflows = () => navbar.scrollWidth > navbar.clientWidth,

    isExpanded = () => navbar.classList.contains(expandedClass),

    toggleExpansion = (expand = !isExpanded()) => {
        ilog("toggleExpansion", expand);
        if (expand) {
            navbar.classList.add(expandedClass);
            attr(expandToggle, "aria-pressed", true);
            expandToggle.textContent = "×";
        } else {
            navbar.classList.remove(expandedClass);
            attr(expandToggle, "aria-pressed", false);
            expandToggle.textContent = "☰";
        }
    },

    update = () => {
        ilog("update");
        const wasHidden = expandToggle.hidden
        expandToggle.hidden = !overflows();
        if (wasHidden != expandToggle.hidden) toggleExpansion(false);
    };

    on(expandToggle, "click", () => {
        toggleExpansion()
    });

    update();

    on(window, "resize", () => update(), { addedBy: navbar });
})

overflowNav(document);
