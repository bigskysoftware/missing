
# Layout

Mechanisms of creating layouts.

## Basic Grid

Applying the <dfn>`.basicgrid`</dfn> class to an element creates a grid with a
minimum column width of 15ch.

You can use the following classes to adjust the minimum width for columns or
manually set the <dfn>`--column-width`</dfn> variable.

| Class                   | Column width                              |
|-------------------------|-------------------------------------------|
| <dfn>`colwidth-s`</dfn> | `--column-width` = 15ch (same as default) |
| <dfn>`colwidth-m`</dfn> | `--column-width` = 24ch                   |
| <dfn>`colwidth-l`</dfn> | `--column-width` = 35ch                   |

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


## Full Bleed

Add the <dfn>`.full-bleed`</dfn> class to make an element go outside its
container and span the whole width of the viewport.

## Pad

Add some padding with <dfn>`.pad`</dfn>.

