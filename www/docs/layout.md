
# Layout

Mechanisms of creating layouts.

[[toc]]

## Basic Grid

Applying the <dfn>`.basicgrid`</dfn> class to an element creates a grid with a
minimum column width of 15ch.

You can use the <dfn>`.col-width-*`</dfn> classes to adjust the minimum width
for columns or manually set the <dfn>`--col-width`</dfn> variable.

| Class                   | Column width         |
|-------------------------|----------------------|
| <dfn>`colwidth-s`</dfn> | `--col-width` = 15ch |
| <dfn>`colwidth-m`</dfn> | `--col-width` = 24ch |
| <dfn>`colwidth-l`</dfn> | `--col-width` = 35ch |

If you want an element to take up multiple columns, use the <dfn>`col-*`</dfn>
classes:

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

Use <dfn>`.col-inf`</dfn> to make an element expand as much as possible. This
will set the column count to an absurdly high number. To set minimum widths on
other columns (to prevent them from disappearing), you can use the 
<dfn>`.minwidth-*`</dfn> classes:

| Class                   | Minimum width      |
|-------------------------|--------------------|
| <dfn>`minwidth-s`</dfn> | `min-width` = 15ch |
| <dfn>`minwidth-m`</dfn> | `min-width` = 24ch |
| <dfn>`minwidth-l`</dfn> | `min-width` = 35ch |

The values are the same as the <dfn>`.colwidth-*`</dfn> classes, but these
classes are placed on individual columns as opposed to the whole grid.

There are also matching <dfn>`.minwidth-*`</dfn> classes: <dfn>`minwidth-s`</dfn>, <dfn>`minwidth-m`</dfn> and <dfn>`minwidth-l`</dfn>.


## Text Columns

The <dfn>`.textcolumns`</dfn> class creates multi-column text using the CSS
[`column-width`][] property. The column width can be set with the `.colwidth-*`
classes.

[`column-width`]: https://developer.mozilla.org/en-US/docs/Web/CSS/column-width


## Full Bleed

Add the <dfn>`.full-bleed`</dfn> class to make an element go outside its
container and span the whole width of the viewport.


## Padding & Margin

Add some padding with <dfn>`.pad`</dfn>, or a margin with <dfn>`.margin`</dfn>.


## Pseudo-tables

The <dfn>`.table`</dfn> class makes an element act like a table for the purposes of layout. The <dfn>`.row`</dfn> class can be used to create a table row, or you can make all descendants of an element into rows with <dfn>`.rows`</dfn>.

  <figure><figcaption>A form with aligned labels and inputs.</figcaption>

  ~~~ html
  <form class="table rows">
    <p>
        <label for=name>Name</label>
        <input type=text id=name name=name>
    </p>
    <p>
        <label for=adr>Address</label>
        <input type=text id=adr name=adr>
    </p>
  </form>
  ~~~

  </figure>


## Positioning

<dfn>`.fixed`</dfn>
:   Set `position: fixed`.

<dfn>`.sticky`</dfn>
:   Set `position: sticky`.

<dfn>`.top`</dfn>
:   Set `top: 0`. Use together with `.fixed` or `.sticky`.

<dfn>`.right`</dfn>
:   Set `right: 0`. See `.top`.

<dfn>`.bottom`</dfn>
:   Set `bottom: 0`. See `.top`.

<dfn>`.left`</dfn>
:   Set `left: 0`. See `.top`.

<dfn>`.float<`</dfn>
:   Set `float: left`.

<dfn>`.float>`</dfn>
:   Set `float: right`.

