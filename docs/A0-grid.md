---
title: Grid
url: ./grid/
---

# Grid

To create a CSS Grid-based layout in missing.css, use the <dfn>`.grid`</dfn> class.

By default, the grid will have equal-width columns but uneven rows.
To override these, you have the <dfn>`.grid-even-rows`</dfn> and <dfn>`.grid-uneven-cols`</dfn> classes.

To specify the row and column an element should occupy, use the `data-cols` and `data-rows` attributes:

 - `data-cols="1"` Element will take up first column, next available row
 - `data-cols="1 3"` Element will take up columns 1 to 3 (both 1 and 3 included), next available row
 - `data-cols="1 3" data-rows="2 3"` Element will take up a 3&times;2 space, with a 1 column gap above
