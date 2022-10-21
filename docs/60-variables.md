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
classes; these will be listed in the documentation for that class.

[[toc]]

## Colors

<dfn>`--bg`</dfn> {#var-bg}
:   Page background.

<dfn>`--fg`</dfn> {#var-fg}
:   The text color.

<dfn>`--muted-fg`</dfn> {#var-muted-fg}
:   Text color for disabled or de-emphasized elements. It's important that this
    color is readable against all of the background colors.

<dfn>`--faded-fg`</dfn> {#var-faded-fg}
:   De-emphasized graphical elements. Borders. Will not be used as a text color.

<dfn>`--box-bg`</dfn> {#var-bg-2}
:   Background for blocks: cards, admonitions etc.

<dfn>`--interactive-bg`</dfn> {#var-bg-3}
:   Background for interactive elements

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

<dfn>`--plain-faded-fg`</dfn> {#var-plain-faded-fg}
:   Graphical elements (i.e. borders) color for the `.plain` [colorway][].

<dfn>`--info-faded-fg`</dfn> {#var-info-faded-fg}
:   Graphical elements (i.e. borders) color for the `.info` [colorway][].

<dfn>`--ok-faded-fg`</dfn> {#var-ok-faded-fg}
:   Graphical elements (i.e. borders) color for the `.ok` [colorway][].

<dfn>`--bad-faded-fg`</dfn> {#var-bad-faded-fg}
:   Graphical elements (i.e. borders) color for the `.bad` [colorway][].

<dfn>`--warn-faded-fg`</dfn> {#var-warn-faded-fg}
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

<dfn>`--secondary-font`</dfn> {#var-display-font}
:   A secondary text font. It's a good idea to specify a sans-serif font as it
    will be used for buttons.

<dfn>`--mono-font`</dfn> {#var-mono-font}
:   Monospace font for code, preformatted text, computer input and output.
    <div class="box info crowded">

    **Tip**&emsp;Browsers shrink monospace fonts. You can suppress this behavior by
    specifying `monospace` _twice_:

    ~~~ css
    --mono-font: "Cascadia Code", monospace, monospace
    ~~~
    
    </div>

## Density

<dfn>`--density`</dfn> {#var-density}
:   The amount of space between elements (i.e. gaps between paragraphs, padding
    of boxes), as a multiplier of the line height (`--rhythm`). See
    [Utilities / Density](/docs/util#density).


[colorway]: /docs/colorways
