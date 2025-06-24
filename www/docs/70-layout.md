---
title: Layout
url: ./layout/
---

# Layout

Mechanisms of creating layouts.

[[toc]]


## Centering

An element with class <dfn>`.center`</dfn> centers a single child element using `display: grid; place-items: center`{.lang-css}.

<dfn>`.text-align:center`</dfn> center-aligns text.


## Text columns

The <dfn>`.textcolumns`</dfn> class creates multi-column text using the CSS [`column-width`][] property.
The column width can be set with the `--col-width` variable.
Protip: consider using the `ch` unit to set column widths.

[`column-width`]: https://developer.mozilla.org/en-US/docs/Web/CSS/column-width


## Flow gap

The <dfn>`.flow-gap`</dfn> class adds vertical margins between its children.


## Full-size

Add the <dfn>`.fullbleed`</dfn> class to make an element go outside its
container and span the whole width of the viewport.

The <dfn>`.fullscreen`</dfn> class will size an element to fill the screen.


## Layout utilities

Add some padding with <dfn>`.padding`</dfn>, or a margin with
<dfn>`.margin`</dfn>.

Add padding or margin in specific axes with these classes:

 - <dfn>`.margin`</dfn>
 - <dfn>`.margin-inline`</dfn>
 - <dfn>`.margin-inline-start`</dfn>
 - <dfn>`.margin-inline-end`</dfn>
 - <dfn>`.margin-block`</dfn>
 - <dfn>`.margin-block-start`</dfn>
 - <dfn>`.margin-block-end`</dfn>
 - <dfn>`.padding`</dfn>
 - <dfn>`.padding-inline`</dfn>
 - <dfn>`.padding-inline-start`</dfn>
 - <dfn>`.padding-inline-end`</dfn>
 - <dfn>`.padding-block`</dfn>
 - <dfn>`.padding-block-start`</dfn>
 - <dfn>`.padding-block-end`</dfn>
{.textcolumns}

Make an element full-width with the <dfn>`.width:100%`</dfn> class.
Similarly with <dfn>`.height:100%`</dfn>.

* * *

The <dfn>`.big`</dfn> class makes things bigger, with special treatment for
some elements:

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></sub-title>Using the <code>.big</code> class</figcaption>

  ~~~ html
  <p>The following is a big paragraph:
  <p class=big>The following is a big button:

  <div class="flex-row align-items:center">
    <button class=big>Buy</button>
    <button>Maybe later</button>
  </div>

  <aside class="big">
    An `&lt;aside&gt;` with the `.big` class becomes a pull quote.
  </aside>
  ~~~

  <hr>

  <p>The following is a big paragraph:
  <p class=big>The following is a big button:

  <div class="flex-row align-items:center">
    <button class=big>Buy</button>
    <button>Maybe later</button>
  </div>

  <aside class="big">
    An `&lt;aside&gt;` with the `.big` class becomes a pull quote.
  </aside>

</figure>

To get a smaller font size, use the `.<small>` masquerade.

***

The <dfn>`.nested-list`</dfn> class removes extraneous margins in nested lists.

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></sub-title>Nested lists</figcaption>

  ~~~html
  <div class="flex-switch">
    <div>
      <strong>Regular list</strong>
      <ul><li>Items
          <ul><li>Item 1
              <li>Item 2</ul>
          <li>Widgets
          <ul><li>Widget 1
              <li>Widget 2</ul>
      </ul>
    </div>
    <div>
      <strong>Nested list</strong>
      <ul class="nested-list">
        <li>Items
          <ul><li>Item 1
              <li>Item 2</ul>
        <li>Widgets
          <ul><li>Widget 1
              <li>Widget 2</ul>
      </ul>
    </div>
  </div>
  ~~~

  <div class="flex-switch">
    <div>
      <strong>Regular list</strong>
      <ul><li>Items
          <ul><li>Item 1
              <li>Item 2</ul>
          <li>Widgets
          <ul><li>Widget 1
              <li>Widget 2</ul>
      </ul>
    </div>
    <div>
      <strong>Nested list</strong>
      <ul class="nested-list">
        <li>Items
          <ul><li>Item 1
              <li>Item 2</ul>
        <li>Widgets
          <ul><li>Widget 1
              <li>Widget 2</ul>
      </ul>
    </div>
  </div>

</figure>


## Scrolling

Set the `overflow` property with these utility classes:

<dfn>`.overflow:auto`</dfn>  
:   Show scrollbars if needed

<dfn>`.overflow:scroll`</dfn>
:   Always show scrollbars   


## Pseudo-tables

The <dfn>`.table`</dfn> class makes an element act like a table for the purposes of layout. The <dfn>`.row`</dfn> class can be used to create a table row, or you can make all descendants of an element into rows with <dfn>`.rows`</dfn>.

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></sub-title>Using pseudo-tables to align forms</figcaption>

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

  <hr>

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

</figure>


## Positioning

<dfn>`.block`</dfn>
:   Set `display: block`.

<dfn>`.inline`</dfn>
:   Set `display: inline`.

<dfn>`.contents`</dfn>
:   Set `display: contents`.

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

<dfn>`.float:left`</dfn>
:   Set `float: left`.

<dfn>`.float:right`</dfn>
:   Set `float: right`.

