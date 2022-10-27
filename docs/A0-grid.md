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

We support columns up to 12.

To change the layout based on viewport size, add `@s` or `@l` to the end of the attributes:

 - `data-cols@s="1" data-cols="1 2" data-cols@l="1 3"` Element will take 1 column in small screens,
   2 columns on medium screens and 3 on large screens

<figure>

~~~ html
<div class="grid grid-even-rows">
    <div class="box info" data-cols="1 2" data-rows="1 2">Sidebar  </div>
    <div class="box info" data-cols="2 4" data-rows="1 3">Main     </div>
    <div class="box info" data-cols="5 6" data-rows="2" data-cols@s="2 4" data-rows@s="4">Auxiliary</div>
</div>
~~~

<div class="grid grid-even-rows">
    <div class="box info" data-cols="1 2" data-rows="1 2">Sidebar  </div>
    <div class="box info" data-cols="3 5" data-rows="1 3">Main     </div>
    <div class="box info" data-cols="6" data-rows="2" data-cols@s="3 5" data-rows@s="4">Aux</div>
</div>

</figure>
