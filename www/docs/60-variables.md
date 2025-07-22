---
title: Variables
url: ./variables/
---

# CSS Variables

We use several CSS variables that you can override to customize your site. You
can create multiple classes that set these variables and switch between them to
create multiple themes, or use the `prefers-color-scheme` @media query to
create a dark theme.

This is a reference of all the variables you can set on the root `<html>`
element. There are a few more that are used with specific components or utility
classes; these are grouped together at the bottom, in addition to being mentioned
in the documentation for their respective class or component.

[[toc]]

## Colors

<dfn>`--bg`</dfn> {#var-bg}
:   Page background.

<dfn>`--fg`</dfn> {#var-fg}
:   The text color.

<dfn>`--link-fg`</dfn> {#var-link-fg}
:   The color used for hyperlinks. Defaults to `--accent`.

<dfn>`--muted-fg`</dfn> {#var-muted-fg}
:   Text color for disabled or de-emphasized elements. It's important that this
    color is readable against all of the background colors.

<dfn>`--faded-fg`</dfn> {#var-faded-fg}
:   Text for disabled interactive components.

<dfn>`--graphical-fg`</dfn> {#var-graphical-fg}
:   Graphical elements like borders. Not text.

<dfn>`--box-bg`</dfn> {#var-bg-2}
:   Background for blocks: cards, admonitions etc.

<dfn>`--interactive-bg`</dfn> {#var-bg-3}
:   Background for interactive elements.

<dfn>`--pressed-interactive-bg`</dfn> {#var-pressed-interactive-bg}
:   Background for interactive elements with `[aria-pressed=true]`.

<dfn>`--accent`</dfn> {#var-accent}
:   Accent color. It's important that this
    color is readable against all of the background colors.

<dfn>`--muted-accent`</dfn> {#var-muted-accent}
:   Less vivid version of accent color. Will not be used for text.

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

<dfn>`--rhythm`</dfn> {#var-rhythm}
:   Vertical rhythm, line height.

<dfn>`--line-length`</dfn> {#var-line-length}
:   Maximum line length for prose.

<dfn>`--border-radius`</dfn> {#var-border-radius}
:   Border radius. Set to 0 for sharp corners.


## Fonts

<dfn>`--main-font`</dfn> {#var-main-font}
:   The main font family for text.

<dfn>`--secondary-font`</dfn> {#var-secondary-font}
:   A secondary text font. It's a good idea to specify a sans-serif font as it
    will be used for buttons and captions.

<dfn>`--display-font`</dfn> {#var-display-font}
:   A display font used for headings.

<dfn>`--mono-font`</dfn> {#var-mono-font}
:   Monospace font for code, preformatted text, computer input and output.
    <div class="box info crowded">

    **Tip**:&emsp;Browsers shrink monospace fonts. You can suppress this behavior by
    specifying `monospace` _twice_:

    ~~~ css
    --mono-font: "Cascadia Code", monospace, monospace
    ~~~
    
    </div>


## Density

<dfn>`--density`</dfn> {#var-density}
:   The amount of space between elements (i.e. gaps between paragraphs, padding
    of boxes), as a multiplier of the line height (`--rhythm`). See
    [Utilities / Density](/docs/utils/#density).


## Component-specific variables

<dfn>`--flex-switch-threshold`</dfn> {#var-flex-switch-threshold}
:   Sets the threshold at which `.flex-switch` switches from row to column. Default is `15ch`.

<dfn>`--col-width`</dfn> {#var-col-width}
:   Sets the width of a column for `.textcolumns`. Default is `30ch`.

<dfn>`--grid-row-width`</dfn> {#var-grid-row-width}
:   Sets the width of a row in a `.grid`. Default is `1fr`.

<dfn>`--grid-col-width`</dfn> {#var-grid-col-width}
:   Sets the width of a column in a `.grid`. Default is `1fr`. 

<dfn>`--sidenote-width`</dfn> {#var-sidenote-width}
:   Sets the width of a `<small role="note">` sidenote. Default is `20ch`.

[colorway]: /docs/colorways
