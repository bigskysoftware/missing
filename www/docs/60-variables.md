---
title: Variables
url: ./variables/
---

# CSS Variables

We use several CSS variables that you can override to customize your site.
You can create multiple classes that set these variables and switch between them to create multiple themes.
When overriding color variables, be sure to use the `light-dark()`{.language-css} CSS function in order to preserve the light/dark theme functionality.

This is a reference of all the variables you can set on the root `<html>`{.language-html} element.
There are a few more that are used with specific components or utility classes;
these are grouped together at the bottom, in addition to being mentioned in the documentation for their respective class or component.

[[toc]]

## Colors

<dfn>`--bg`</dfn> {#var-bg}
:   Page background.

<dfn>`--fg`</dfn> {#var-fg}
:   The text color.

<dfn>`--link-fg`</dfn> {#var-link-fg}
:   The color used for hyperlinks. Defaults to `--accent`.

<dfn>`--muted-fg`</dfn> {#var-muted-fg}
:   Text color for disabled or de-emphasized elements.
    It's important that this color is readable against all of the background colors.

<dfn>`--faded-fg`</dfn> {#var-faded-fg}
:   Text for disabled interactive components.

<dfn>`--graphical-fg`</dfn> {#var-graphical-fg}
:   Graphical elements like borders. Not text.

<dfn>`--box-bg`</dfn> {#var-box-bg}
:   Background for blocks: cards, admonitions etc.

<dfn>`--interactive-bg`</dfn> {#var-interactive-bg}
:   Background for interactive elements.

<dfn>`--pressed-interactive-bg`</dfn> {#var-pressed-interactive-bg}
:   Background for interactive elements with `[aria-pressed=true]`{.token .attr-value} or `[aria-expanded=true]`{.token .attr-value}.

<dfn>`--accent`</dfn> {#var-accent}
:   Accent color.
    It's important that this color is readable against all of the background colors.

<dfn>`--muted-accent`</dfn> {#var-muted-accent}
:   Less vivid version of accent color.
    Will not be used for text.

### Colorways

<dfn>`--plain-fg`</dfn> {#var-plain-fg}
:   Foreground color for the `.plain` [colorway][].

<dfn>`--info-fg`</dfn> {#var-info-fg}
:   Foreground color for the `.info` [colorway][].

<dfn>`--ok-fg`</dfn> {#var-ok-fg}
:   Foreground color for the `.ok` [colorway][].

<dfn>`--bad-fg`</dfn> {#var-bad-fg}
:   Foreground color for the `.bad` [colorway][].

<dfn>`--warn-fg`</dfn> {#var-warn-fg}
:   Foreground color for the `.warn` [colorway][].

<dfn>`--plain-graphical-fg`</dfn> {#var-plain-graphical-fg}
:   Graphical elements (i.e. borders) color for the `.plain` [colorway][].

<dfn>`--info-graphical-fg`</dfn> {#var-info-graphical-fg}
:   Graphical elements (i.e. borders) color for the `.info` [colorway][].

<dfn>`--ok-graphical-fg`</dfn> {#var-ok-graphical-fg}
:   Graphical elements (i.e. borders) color for the `.ok` [colorway][].

<dfn>`--bad-graphical-fg`</dfn> {#var-bad-graphical-fg}
:   Graphical elements (i.e. borders) color for the `.bad` [colorway][].

<dfn>`--warn-graphical-fg`</dfn> {#var-warn-graphical-fg}
:   Graphical elements (i.e. borders) color for the `.warn` [colorway][].

<dfn>`--plain-bg`</dfn> {#var-plain-bg}
:   Background color for the `.plain` [colorway][].

<dfn>`--info-bg`</dfn> {#var-info-bg}
:   Background color for the `.info` [colorway][].

<dfn>`--ok-bg`</dfn> {#var-ok-bg}
:   Background color for the `.ok` [colorway][].

<dfn>`--bad-bg`</dfn> {#var-bad-bg}
:   Background color for the `.bad` [colorway][].

<dfn>`--warn-bg`</dfn> {#var-warn-bg}
:   Background color for the `.warn` [colorway][].


## Lengths

<dfn>~~`--rhythm`~~</dfn> {#var-rhythm}
:   ~~Vertical rhythm, line height.~~ **Deprecated:**{.bad .color} Will be removed in version 2.0.
    Set a value for the `line-height` property on the `html` element instead.

<dfn>`--line-length`</dfn> {#var-line-length}
:   Maximum line length for prose.


## Borders
   
<dfn>`--border-width`</dfn> {#var-border-width}
:   Shortcut for uniform border widths on various `.box` related components.
    Defaults to `unset`.

<dfn>`--border-block-start-width`</dfn> {#var-border-block-start-width}
:   Width of the "top" border.
    Defaults to `--border-width` if it is set, otherwise `1px`.

<dfn>`--border-block-end-width`</dfn> {#var-border-block-end-width}
:   Width of the "bottom" border.
    Defaults to `--border-width` if it is set, otherwise `1px`.

<dfn>`--border-inline-start-width`</dfn> {#var-border-inline-start-width}
:   Width of the "left" border.
    Defaults to `--border-width` if it is set, otherwise `1px`.

<dfn>`--border-inline-end-width`</dfn> {#var-border-inline-end-width}
:   Width of the "right" border.
    Defaults to `--border-width` if it is set, otherwise `1px`.

<dfn>`--border-style`</dfn> {#var-border-style}
:   Shortcut for uniform border styles on various `.box` related components.
    Defaults to `unset`.

<dfn>`--border-block-start-style`</dfn> {#var-border-block-start-style}
:   Style of the "top" border.
    Defaults to `--border-style` if it is set, otherwise `1px`.

<dfn>`--border-block-end-style`</dfn> {#var-border-block-end-style}
:   Style of the "bottom" border.
    Defaults to `--border-style` if it is set, otherwise `1px`.

<dfn>`--border-inline-start-style`</dfn> {#var-border-inline-start-style}
:   Style of the "left" border.
    Defaults to `--border-style` if it is set, otherwise `1px`.

<dfn>`--border-inline-end-style`</dfn> {#var-border-inline-end-style}
:   Style of the "right" border.
    Defaults to `--border-style` if it is set, otherwise `1px`.

<dfn>`--border-radius`</dfn> {#var-border-radius}
:   Border radius for various `.box` related components.
    Accepts any valid CSS value, e.g. `1em 2em` or `50% 20% / 10% 40%`.
    Defaults to 0.2rem.

<dfn>`--interactive-border-width`</dfn> {#var-interactive-border-width}
:   Border width used in buttons, inputs, etc.
    Must be a single value; defaults to `1px`.

<dfn>`--interactive-border-style`</dfn> {#var-interactive-border-style}
:   Border style used in buttons, inputs, etc.
    Must be a single value; defaults to `solid`.

<dfn>`--interactive-border-radius`</dfn> {#var-interactive-border-radius}
:   Border radius used in buttons, inputs, etc.
    Must be a single value; defaults to `.2rem`.

<dfn>`--tab-border-radius`</dfn> {#var-tab-border-radius}
:   Border radius for the ARIA tabs component.
    Must be a single value; defaults to 0.4em.


## Button Shadows

<dfn>`--shadow`</dfn> {#var-shadow}
:   The value for the `box-shadow` property on buttons.

<dfn>`--shadow-focus`</dfn> {#var-shadow-focus}
:   The value for the `box-shadow` property on button with `:hover` or `:focus-visible` state.

<dfn>`--shadow-active`</dfn> {#var-shadow-active}
:   The value for the `box-shadow` property on button with `:active` state.

<dfn>`--shadow-disabled`</dfn> {#var-shadow-disabled}
:   The value for the `box-shadow` property on button with `:disabled` state.

<dfn>`--pressed-shadow`</dfn> {#var-pressed-shadow}
:   The value for the `box-shadow` property on buttons with `[aria-pressed=true]` or `[aria-expended=true]`.

<dfn>`--pressed-shadow-focus`</dfn> {#var-pressed-shadow-focus}
:   The value for the `box-shadow` property on buttons with `[aria-pressed=true]` or `[aria-expended=true]` in the `:hover` or `:focus-visible` state.

<dfn>`--pressed-shadow-active`</dfn> {#var-pressed-shadow-active}
:   The value for the `box-shadow` property on buttons with `[aria-pressed=true]` or `[aria-expended=true]` in the `:active` state.


## Fonts

<dfn>`--main-font`</dfn> {#var-main-font}
:   The main font family for text.

<dfn>`--secondary-font`</dfn> {#var-secondary-font}
:   A secondary text font.
    It's a good idea to specify a sans-serif font as it will be used for buttons and captions.

<dfn>`--display-font`</dfn> {#var-display-font}
:   A display font used for headings.

<dfn>`--mono-font`</dfn> {#var-mono-font}
:   Monospace font for code, preformatted text, computer input and output.
    <div class="crowded info box">

    **Tip**:&emsp;Browsers shrink monospace fonts.
    You can suppress this behavior by specifying `monospace` _twice_:

    ~~~ css
    --mono-font: "Cascadia Code", monospace, monospace
    ~~~
    
    </div>


## Markers

<dfn>`--breadcrumb-page`</dfn> {#var-breadcrumb-page}
:   The default separator for breadcrumbs.

<dfn>`--breadcrumb-step`</dfn> {#var-breadcrumb-step}
:   The separator for breadcrumbs that use `[aria-current=step]`.

## Density

<dfn>`--density`</dfn> {#var-density}
:   The amount of space between elements (i.e. gaps between paragraphs, padding of boxes), as a multiplier of the root line height.
    See [Utilities / Density](/docs/util#density).


## Component-specific variables

<dfn>`--flex-switch-threshold`</dfn> {#var-flex-switch-threshold}
:   Sets the threshold at which `.flex-switch` switches from row to column.
    Default is `15ch`.

<dfn>`--col-width`</dfn> {#var-col-width}
:   Sets the width of a column for `.textcolumns`.
    Default is `30ch`.

<dfn>`--grid-row-width`</dfn> {#var-grid-row-width}
:   Sets the width of a row in a `.grid`.
    Default is `1fr`.

<dfn>`--grid-col-width`</dfn> {#var-grid-col-width}
:   Sets the width of a column in a `.grid`.
    Default is `1fr`. 

<dfn>`--sidenote-width`</dfn> {#var-sidenote-width}
:   Sets the width of a `<small role=note>`{.language-html} sidenote.
    Default is `20ch`.

[colorway]: /docs/colorways
