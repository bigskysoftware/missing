
# Layout

Mechanisms of creating layouts.

[[toc]]

## Basic Grid

Applying the <dfn>`.basicgrid`</dfn> class to an element creates a grid with a
minimum column width of 15ch.

You can use the following classes to adjust the minimum width for columns or
manually set the <dfn>`--col-width`</dfn> variable.

| Class                   | Column width                              |
|-------------------------|-------------------------------------------|
| <dfn>`colwidth-s`</dfn> | `--col-width` = 15ch (same as default)    |
| <dfn>`colwidth-m`</dfn> | `--col-width` = 24ch                      |
| <dfn>`colwidth-l`</dfn> | `--col-width` = 35ch                      |

If you want an element to take up multiple columns, use the `col-*` classes:

 * <dfn>`.col-2`</dfn>
 * <dfn>`.col-3`</dfn>
 * <dfn>`.col-4`</dfn>
 * <dfn>`.col-5`</dfn>
 * <dfn>`.col-6`</dfn>
 * <dfn>`.col-7`</dfn>
 * <dfn>`.col-8`</dfn>
 * <dfn>`.col-9`</dfn>
 * <dfn>`.col-10`</dfn>
 * <dfn>`.col-11`</dfn>
 * <dfn>`.col-12`</dfn>

There's also <dfn>`.col-0`</dfn>, which makes an element take on its intrinsic
size without regard for the column grid, and <dfn>`.col-1`</dfn>, just for
completeness' sake.


## Text Columns

The <dfn>`.textcolumns`</dfn> class creates multi-column text using the CSS
[`column-width`][] property. The column width can be set with the `.colwidth-*`
classes.

[`column-width`]: https://developer.mozilla.org/en-US/docs/Web/CSS/column-width


## Full Bleed

Add the <dfn>`.full-bleed`</dfn> class to make an element go outside its
container and span the whole width of the viewport.

## Pad

Add some padding with <dfn>`.pad`</dfn>.

## Center

<dfn>`.center`</dfn> does what you'd expect, in both axes.

## Fixed Positioning

<dfn>`fixed`</dfn>
:   Set `position: fixed`.

<dfn>`sticky`</dfn>
:   Set `position: sticky`.

<dfn>`top`</dfn>
:   Set `top: 0`. Use together with `.fixed` or `.sticky`.

<dfn>`right`</dfn>
:   Set `right: 0`. See `.top`.

<dfn>`bottom`</dfn>
:   Set `bottom: 0`. See `.top`.

<dfn>`left`</dfn>
:   Set `left: 0`. See `.top`.


