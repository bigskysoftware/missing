---
title: Layout
url: ./layout/
---

# Layout

Mechanisms of creating layouts.

[[toc]]


## Centering

<dfn>`.text-align:center`</dfn> center-aligns text.

An element with class <dfn>`.center`</dfn> centers a single child element using `display: grid; place-items: center`{.lang-css}.

<dfn>`.align-content:center`</dfn> vertically aligns content in the center of the alignment container. Flexbox no longer required!
We also provide <dfn>`.align-content:end`</dfn>.


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

Add padding or margin in specific axes with these classes.
The amount of margin or padding is determined by the [density utilities][].

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

Automatic margin is provided with the following:

 - <dfn>`.margin-inline:auto`</dfn>
 - <dfn>`.margin-inline-start:auto`</dfn>
 - <dfn>`.margin-inline-end:auto`</dfn>
 - <dfn>`.margin-block:auto`</dfn>
 - <dfn>`.margin-block-start:auto`</dfn>
 - <dfn>`.margin-block-end:auto`</dfn>
{.textcolumns}

To remove padding or margin, use one of the following classes:

 - <dfn>`.margin:0`</dfn>
 - <dfn>`.margin-inline:0`</dfn>
 - <dfn>`.margin-inline-start:0`</dfn>
 - <dfn>`.margin-inline-end:0`</dfn>
 - <dfn>`.margin-block:0`</dfn>
 - <dfn>`.margin-block-start:0`</dfn>
 - <dfn>`.margin-block-end:0`</dfn>
 - <dfn>`.padding:0`</dfn>
 - <dfn>`.padding-inline:0`</dfn>
 - <dfn>`.padding-inline-start:0`</dfn>
 - <dfn>`.padding-inline-end:0`</dfn>
 - <dfn>`.padding-block:0`</dfn>
 - <dfn>`.padding-block-start:0`</dfn>
 - <dfn>`.padding-block-end:0`</dfn>
{.textcolumns}

Make an element full-width with the <dfn>`.width:100%`</dfn> class.
Similarly with <dfn>`.height:100%`</dfn>.

[density utilities]: /docs/utils/#density


## Border utilities

Add a border with <dfn>`.border`</dfn>; you can target specific axes with these classes:

 - <dfn>`.border-inline`</dfn>
 - <dfn>`.border-inline-start`</dfn>
 - <dfn>`.border-inline-end`</dfn>
 - <dfn>`.border-block`</dfn>
 - <dfn>`.border-block-start`</dfn>
 - <dfn>`.border-block-end`</dfn>
{.textcolumns}

Borders can be removed by using <dfn>`.border:none`</dfn> or one of the following classes:

 - <dfn>`.border-inline:none`</dfn>
 - <dfn>`.border-inline-start:none`</dfn>
 - <dfn>`.border-inline-end:none`</dfn>
 - <dfn>`.border-block:none`</dfn>
 - <dfn>`.border-block-start:none`</dfn>
 - <dfn>`.border-block-end:none`</dfn>
{.textcolumns}


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


## Aspect Ratio

To set the aspect ratio of an element, use the `aspect-ratio` CSS property:

<figure>

  ~~~html
  <style>#aspect-ratio-example > .box { height: 10vh }</style>
  <div id="aspect-ratio-example" class="f-row flex-wrap:wrap">
    <div class="box" style="aspect-ratio: 1/1">1:1</div>
    <div class="box" style="aspect-ratio: 4/3">4:3</div>
    <div class="box" style="aspect-ratio: 16/9">16:9</div>
    <div class="box" style="aspect-ratio: 2/1">2:1</div>
    <div class="box" style="aspect-ratio: 2/3">2:3</div>
    <div class="box" style="aspect-ratio: 16/10">16:10</div>
    <div class="box" style="aspect-ratio: 21/9">21:9</div>
    <div class="box" style="aspect-ratio: 4/1">4:1</div>
  </div>
  ~~~

  <style>#aspect-ratio-example > .box { height: 10vh }</style>
  <div id="aspect-ratio-example" class="f-row flex-wrap:wrap">
    <div class="box" style="aspect-ratio: 1/1">1:1</div>
    <div class="box" style="aspect-ratio: 4/3">4:3</div>
    <div class="box" style="aspect-ratio: 16/9">16:9</div>
    <div class="box" style="aspect-ratio: 2/1">2:1</div>
    <div class="box" style="aspect-ratio: 2/3">2:3</div>
    <div class="box" style="aspect-ratio: 16/10">16:10</div>
    <div class="box" style="aspect-ratio: 21/9">21:9</div>
  </div>

</figure>


## Scrolling

Set the `overflow` property with these utility classes:

<dfn>`.overflow:auto`</dfn>  
:   Show scrollbars if needed

<dfn>`.overflow:scroll`</dfn>
:   Always show scrollbars   

<dfn>`.overflow:clip`</dfn>
:   Overflow content is clipped at the element's padding box. Can be extended using the `overflow-clip-margin` property.


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
