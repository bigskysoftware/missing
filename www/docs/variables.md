
# CSS Variables

We use several CSS variables that you can override to customize your site. You
can create multiple classes that set these variables and switch between them to
create multiple themes, or use the `prefers-color-scheme` @media query to
create a dark theme.

This is a reference of all the variables you can set on the root `<html>`
element. There are a few more that are used with specific components or utility
classes; these will be listed in the documentation for that class.

## Colors

--fg
:   The text color.

--muted-fg
:   Text color for disabled or de-emphasized elements. It's important that this
    color is readable against all of the background colors.

--faded-fg
:   De-emphasized or disabled graphical elements. Will not be used as a text color.

--info-fg:
:   --

--ok-fg: #060;
:   --

--bad-fg: #a00;
:   --

--warn-fg: #550;
:   --

--bg
:   Page background.

--bg-2
:   Background for blocks: cards, admonitions etc.

--bg-3
:   Background for interactive elements


--bg-4
:   Background for pressed interactive elements

--info-bg
:   --

--ok-bg
:   --

--bad-bg
:   --

--warn-bg
:   --

--shadow
:   Box shadows.

--accent
:   Accent color. It's important that this
    color is readable against all of the background colors.

--muted-accent
:   Less vivid version of accent color. Will not be used for text.


## Lengths

--rhythm
:   Vertical rhythm, line height.

--line-length
:   Maximum line length for prose.

## Fonts

--main-font
:   The main font family for text.

--display-font
:   A secondary text font. It's a good idea to specify a sans-serif font as it
    will be used for buttons.

--mono-font
:   Monospace font for code, preformatted text, computer input and output.

    ::: box {.info}
    **Tip**: Browsers shrink monospace fonts. You can suppress this behavior by
    specifying `monospace` _twice_:

      ~~~ css
      --mono-font: "Cascadia Code", monospace, monospace
      ~~~
    :::

## Density

--density
:   --