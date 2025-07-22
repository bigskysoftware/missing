---
title: Grid
url: ./grid/
---

# Grid

To create a CSS Grid-based layout in missing.css, use the <dfn>`.grid`</dfn> class.

By default, the grid will have equal-width columns but uneven rows.
To override these, you have the <dfn>`.grid-even-rows`</dfn> and <dfn>`.grid-variable-cols`</dfn> classes.

To specify the row and column an element should occupy, use the `data-cols`{.token .attr-name} and `data-rows`{.token .attr-name} attributes:

`data-cols="1"`
:   Element will take up first column, next available row

`data-cols="1 3"`
:   Element will take up columns 1 to 3 (both 1 and 3 included), next available row

`data-cols="1 3" data-rows="2 3"`
:   Element will take up a 3&times;2 space, with a 1 column gap above

**Warning**:&emsp;Our column specifications are based on _rows_, not _lines_.
This means `<div data-cols="1 2">`{.language-html} spans two columns, as opposed to `grid-column: 1 / 2;`{.language-css} which spans only one.
{.box .warn}

We support columns up to 12.

To change the layout based on viewport size,
add `@s` (small, &le;768px) or `@l` (large, &ge;1024px) to the end of the attributes:

`data-cols@s="1" data-cols="1 2" data-cols@l="1 3"`
:   Element will take 1 column in small screens, 2 columns on medium screens and 3 on large screens.

To change the layout for printing, add `@p` to the end of the attributes.

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></sub-title>Grid markup for even rows</figcaption>

  ~~~ html
  <div class="grid grid-even-rows">
    <div class="box info" data-cols="1 2" data-rows="1 2">Sidebar  </div>
    <div class="box info" data-cols="3 5" data-rows="1 3">Main     </div>
    <div class="box info" data-cols="6" data-rows="2" data-cols@s="3 5" data-rows@s="4">Aux</div>
  </div>
  ~~~

  <hr>

  <div class="grid grid-even-rows">
    <div class="box info" data-cols="1 2" data-rows="1 2">Sidebar  </div>
    <div class="box info" data-cols="3 5" data-rows="1 3">Main     </div>
    <div class="box info" data-cols="6" data-rows="2" data-cols@s="3 5" data-rows@s="4">Aux</div>
  </div>

</figure>
