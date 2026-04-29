---
title: Grid
url: ./grid/
---

# Grid

To create CSS Grid-based layouts in missing.css, we offer a small but powerful collection of utility classes.

<details>
  <summary>Contents:</summary>

  [[toc]]

</details>

## Layout grid

<dfn>`.layout-grid`</dfn> is a responsive grid container that can be used for custom layouts.
Authors are responsible for defining `grid-template`{.token .attr-name} for the `.layout-grid` element,
as well as `grid-area`{.token .attr-name} on the grid cells.
On smaller screens, the container will stack its children vertically.

**Tip**:&emsp;In browsers that [support the new expanded `attr()` function][attr],
missing.css will set `grid-area`{.token .attr-name} values for you based on their `id`{.token .attr-name} attribute.
Until support is more widespread, we recommend setting `<el style="grid-area: foo">`{.language-html} on the grid cells.
{.info .box}

[attr]: https://caniuse.com/css3-attr

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>: </v-h></sub-title>Layout grid markup</figcaption>

  ~~~ html
  <article class="crowded info box layout-grid" style="
    grid-template:
      'image title' auto
      'image desc'  1fr
      /auto  1fr;
  ">
      <img style="grid-area: image" src="https://placebear.com/100/100" alt="Placeholder image">
      <h2  style="grid-area: title">Title</h2>
      <p   style="grid-area: desc">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec a diam lectus.
      Sed sit amet ipsum mauris.
      Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit.
      Donec et mollis dolor.
  </article>
  ~~~

  <hr>

  <article class="crowded info box layout-grid" style="
    grid-template:
      'image title' auto
      'image desc'  1fr
      /auto  1fr;
  ">
      <img style="grid-area: image" src="https://placebear.com/100/100" alt="Placeholder image">
      <h2  style="grid-area: title">Title</h2>
      <p   style="grid-area: desc">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec a diam lectus.
      Sed sit amet ipsum mauris.
      Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit.
      Donec et mollis dolor.
  </article>

</figure>

## Flow grid

The <dfn>`.flow-grid`</dfn> is an auto-wrapping grid container that can be used for cards.
Column size is determined by the `--cell-length` variable, which defaults to `--card-length`.
On smaller screens, the grid will collapse into a single column.

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>: </v-h></sub-title>Flow grid markup</figcaption>

  ~~~ html
  <style>
    .flow-grid > img { --border-radius: 50%; }
  </style>
  <div class="flow-grid" style="--cell-length: 20ch;">
    <article class="crowded info box flex-column align-items:center">
      <img src="https://placebear.com/100/100" alt="Profile picture" class="border">
      <h2>Bear Name</h2>
      <p class="<small>">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec a diam lectus.
      Sed sit amet ipsum mauris.
    </article>
    <!-- ... -->
  </div>
  ~~~

  <hr>

  <style>
    .flow-grid > img { --border-radius: 50%; }
  </style>
  <div class="flow-grid" style="--cell-length: 20ch;">
    <article class="crowded info box flex-column align-items:center">
      <img src="https://placebear.com/100/100" alt="Profile picture" class="border" style="--border-radius: 50%">
      <h2>Bear Name</h2>
      <p class="<small>">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec a diam lectus.
      Sed sit amet ipsum mauris.
    </article>
    <article class="crowded info box flex-column align-items:center">
      <img src="https://placebear.com/101/101" alt="Profile picture" class="border" style="--border-radius: 50%">
      <h2>Bear Name</h2>
      <p class="<small>">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec a diam lectus.
      Sed sit amet ipsum mauris.
    </article>
    <article class="crowded info box flex-column align-items:center">
      <img src="https://placebear.com/102/102" alt="Profile picture" class="border" style="--border-radius: 50%">
      <h2>Bear Name</h2>
      <p class="<small>">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec a diam lectus.
      Sed sit amet ipsum mauris.
    </article>
    <article class="crowded info box flex-column align-items:center">
      <img src="https://placebear.com/103/103" alt="Profile picture" class="border" style="--border-radius: 50%">
      <h2>Bear Name</h2>
      <p class="<small>">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec a diam lectus.
      Sed sit amet ipsum mauris.
    </article>
  </div>
</figure>

## Row grid
<dfn>`.row-grid`</dfn> can be used to create a compact row of equal-width cells.
On smaller screens, the items are stacked.
Can be combined with `.margin-block:auto` to center the items in the block direction.

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>: </v-h></sub-title>Row grid markup</figcaption>

  ~~~ html
  <div class="flex-column">
    <h1>Welcome to my call to action blurb!</h1>
    <p>
    This is the actual blurb of the call to action blurb.
    <!-- ... -->
    <div class="row-grid">
      <a href=# class="<big> ok <button>">Click me!</a>
      <a href=# class="<big> info <button>">No wait, click me</a>
    </div>
  </div>
  ~~~

  <hr>

  <div class="flex-column">
    <h1>Welcome to my call to action blurb!</h1>
    <p>
    This is the actual blurb of the call to action blurb.
    You can tell because it's blurb-y and you feel called to take action.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Donec a diam lectus.
    Sed sit amet ipsum mauris.
    Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit.
    Donec et mollis dolor.
    <p>
    So take action and click one of the action buttons below.
    <div class="row-grid">
      <a href=# class="<big> ok <button>">Click me!</a>
      <a href=# class="<big> info <button>">No wait, click me</a>
    </div>
  </div>

</figure>
