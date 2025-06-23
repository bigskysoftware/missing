---
title: Components
url: ./components/
---

# Components

[[toc]]

## Box

The <dfn>`.box`</dfn> class creates a padded box with a border.

Boxes use the border and background color of the [colorway][].

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></sub-title>Box markup</figcaption>

  ~~~ html
  <div class="box warn">
    <strong>Warning</strong>: If you're putting <!-- ... -->
  </div>
  ~~~

  <hr>

  <div class="box warn">
  
  **Warning**:&emsp;If you're putting something in a box, make sure to clarify
  why it is in a box in some other way. For example, this box has "Warning" in
  bold, in addition to being yellow. This makes your page clearer and prevents
  accessibility failures.
  
  </div>

</figure>

The above box, in addition to being an example, is also a genuine warning.

The `<figure>`, `<details>` and `<dialog>` elements share their
appearance with the `.box` class.


## Titlebar

<dfn>`.titlebar`</dfn>: A titlebar for a `.box`.

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></sub-title>Titlebar markup</figcaption>

  ~~~ html
  <div class="box bad">
    <strong class="block titlebar">Error</strong>
    Task failed successfully
  </div>
  ~~~

  <hr>

  <div class="box bad">
    <strong class="block titlebar">Error</strong>
    Task failed successfully
  </div>

</figure>


## Subtitle

The <dfn>`<sub-title>`</dfn> custom element or the <dfn>`.sub-title`</dfn>
class is a subtitle for a heading. Visually hiding a colon with the `<v-h>` element can help screen readers parse the heading correctly.

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></sub-title>Sub-title after a heading</figcaption>

  ~~~ html
  <h4>
    Conference Talks Considered Harmful<v-h>:</v-h>
    <sub-title>How I Learned To Stop Worrying and Love Baz</sub-title>
  </h4>
  ~~~

  <hr>

  <h4>
    Conference Talks Considered Harmful<v-h>:</v-h>
    <sub-title>How I Learned To Stop Worrying and Love Cliché Titles</sub-title>
  </h4>

</figure>

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></sub-title>Sub-title before a heading</figcaption>

  ~~~ html
  <h4>
    <sub-title class="allcaps">Breaking<v-h>:</v-h></sub-title>
    Bad Thing Happens
  </h4>
  ~~~

  <hr>

  <h4>
    <sub-title class="allcaps">Breaking<v-h>:</v-h></sub-title>
    Bad Thing Happens
  </h4>

</figure>


## Section permalinks

Many pages, including these docs, have links that can be used to jump to a
section that appear when the heading is hovered. Missing.css provides this
as the <dfn>`.permalink-anchor`</dfn> class.

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></sub-title>Permalink markup (hover to reveal)</figcaption>

  ~~~ html
  <h2 id="section-permalinks" class="packed" tabindex="-1">
    <a class="permalink-anchor float:right" href="#section-permalinks">§</a>
    Section permalinks
  </h2>
  ~~~

  <hr>

  <h2 id="section-permalinks" class="packed" tabindex="-1">
    <a class="permalink-anchor float:right" href="#section-permalinks">§</a>
    Section permalinks
  </h2>

</figure>

## Toolbar

A <dfn>`.tool-bar`</dfn> is a horizontally laid-out collection of controls.
Alternatively, you can use `[role=toolbar]`.

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></sub-title>Toolbar markup</figcaption>

  ~~~ html
  <section role="toolbar">
    <button type=button>Cut</button>
    <button type=button>Copy</button>
    <button type=button>Paste</button>

    <hr aria-orientation="vertical">

    <label>Find: <input type=text></label>
  </section>
  ~~~

  <hr>

  <section role="toolbar">
    <button type=button>Cut</button>
    <button type=button>Copy</button>
    <button type=button>Paste</button>
    <hr aria-orientation="vertical">
    <label>Find: <input type=text></label>
  </section>

</figure>

[WAI: Toolbar]: https://www.w3.org/TR/wai-aria-practices/#toolbar


## Sidebar

Use the <dfn>`.sidebar-layout`</dfn> class to create a sidebar/main layout.
Put sidebar content in a `<header>` element directly inside `.sidebar-layout`, and the next
element will house the rest of the page. See this example:

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></sub-title>Sidebar markup</figcaption>

  ~~~ html
  <div class="sidebar-layout">
    <header>
      <ul role="list">
        <li><a href="/">Home</a></li>
        <li><a href="/">Profile</a></li>
        <li><a href="/">Settings</a></li>
        <!-- ... -->
      </ul>
    </header>

    <div>
      <main></main>
      <footer></footer>
    </div>
  </div>
  ~~~

**<a href="/demos/sidebar" class="<button>">Sidebar demo &rarr;</a>**

</figure>


## Breadcrumbs

Add <dfn>`.breadcrumbs`</dfn> to a `<nav>` element. Use an `<ul>` or  `<ol>` of
links inside. Don't forget to add an `aria-label`.

Add the attribute `aria-current=page` to the link representing the current page
(if any).

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></sub-title>Breadcrumbs markup</figcaption>

  ~~~ html
  <nav class=breadcrumbs aria-label="Breadcrumbs">
    <ol>
      <li><a href="#">Home</a></li>
      <li><a href="#">User</a></li>
      <li><a href="#">Advanced</a></li>
      <li><a href="#">New All</a></li>
      <li><a href="#" aria-current=page>Quit Sibelius</a></li>
    </ol>
  </nav>
  ~~~

  <hr>

  <nav class=breadcrumbs aria-label="Breadcrumbs">
    <ol>
      <li><a href="#">Home</a></li>
      <li><a href="#">User</a></li>
      <li><a href="#">Advanced</a></li>
      <li><a href="#">New All</a></li>
      <li><a href="#" aria-current=page>Quit Sibelius</a></li>
    </ol>
  </nav>
</figure>


## Chip

The <dfn>`<chip>`</dfn> class, or the <dfn>`.chip`</dfn> class, creates a
rounded chip, like what you might use for a tag list or contacts.

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></sub-title>Chip markup</figcaption>

  ~~~ html
  <chip class=info>#webdev</chip>
  <chip class=ok>⍻ Merged</chip>
  <chip>John Doe</chip>
  <chip class=warn>3 minute read</chip>  
  ~~~

  <hr>

  <chip class=info>#webdev</chip>
  <chip class=ok>⍻ Merged</chip>
  <chip>John Doe</chip>
  <chip class=warn>3 minute read</chip>  

</figure>


## Navbar

A navbar has the <dfn>`.navbar`</dfn> class --- see the following for a markup
example:

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></sub-title>Navbar markup</figcaption>

  ~~~ html
  <header class="navbar">
    <nav aria-label="Site sections">
      <ul role="list">
        <li><a href="/"><img alt="missing.js" src="/logo.png"></a>
        <li><a href="/docs">Docs</a>
        <li><a href="/docs">Contribute</a>
        <li><a href="/docs">Donate</a>
      </ul>
    </nav>
    <nav aria-label="Social media links">
      <ul role="list">
        <li><a href="/"><img alt=""></a>
        <li><a href="https://github.com/...">GitHub</a>
        <li><a href="https://discord.app/...">Discord</a>
      </ul>
    </nav>
  </header>
  ~~~

</figure>

To make your navbar expand/collapsible on smaller screens,
you can use [Missing.js &sect; Expand/collapse navbar](/docs/js#expand%2Fcollapse-navbar).

<div class="box info">

**Info**:&emsp;When you have multiple `<nav>` elements on a page, it's a good idea to put
`aria-label` attributes on them. This is because many assistive programs have
a feature to jump to the navigation part of a page, which does not work well if
the user can't tell which nav is which.

</div>


## Icon Button

<dfn>`.iconbutton`</dfn> creates a bare icon.

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></sub-title>Icon button markup</figcaption>

  ~~~ html
  <section class="f-row justify-content:space-between">
    <button class=iconbutton type=button>☰</button>
    <button class=iconbutton type=button>&rarr;</button>
    <button class=iconbutton type=button>✀</button>
    <button class=iconbutton type=button>✖</button>
    <button class=iconbutton type=button>⚧</button>
    <button class=iconbutton type=button>☻</button>
    <button class=iconbutton type=button>🎜</button>
  </section>
  ~~~

  <hr>

  <section class="f-row justify-content:space-between">
    <button class=iconbutton type=button>☰</button>
    <button class=iconbutton type=button>&rarr;</button>
    <button class=iconbutton type=button>✀</button>
    <button class=iconbutton type=button>✖</button>
    <button class=iconbutton type=button>⚧</button>
    <button class=iconbutton type=button>☻</button>
    <button class=iconbutton type=button>🎜</button>
  </section>

</figure>

[colorway]: /docs/colorways
