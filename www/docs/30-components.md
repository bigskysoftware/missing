---
title: Components
url: ./components/
---

# Components

[[toc]]

## Box

<table>
<th scope="row">Class<td><dfn><code>.box</code></dfn>
</table>

The <dfn>`.box`</dfn> class creates a padded box with a border.

Boxes use the border and background color of the [colorway][].

<figure>

  ~~~ html
  <div class="box warn">
    <strong>Warning</strong>: If you're putting <!-- ... -->
  </div>
  ~~~

</figure>

<div class="box warn">

**Warning**: If you're putting something in a box, make sure to clarify
why it is in a box in some other way. For example, this box has "Warning" in
bold, in addition to being yellow. This makes your page clearer and prevents
accessibility failures.

</div>

The above box, in addition to being an example, is also a genuine warning.

The `<figure>`, `<aside>`, `<details>` and `<dialog>` elements share their
appearance with the `.box` class.


## Titlebar

<dfn>`.titlebar`</dfn>: A titlebar for a `.box`.

<figure>

  ~~~ html
  <div class="box bad">
    <strong class="block titlebar">Error</strong>
    Task failed successfully
  </div>
  ~~~

  <div class="box bad">
    <strong class="block titlebar">Error</strong>
    Task failed successfully
  </div>

</figure>


## Subtitle

The <dfn>`<sub-title>`</dfn> custom element or the <dfn>`.sub-title`</dfn>
class is a subtitle for a heading.

<figure>

  ~~~ html
  <h4>
    Conference Talks Considered Harmful<v-h>:</v-h>
    <sub-title>How I Learned To Stop Worrying and Love Baz</sub-title>
  </h4>
  ~~~

<h4>
  Conference Talks Considered Harmful<v-h>:</v-h>
  <sub-title>How I Learned To Stop Worrying and Love Cliché Titles</sub-title>
</h4>

</figure>

<figure>

  ~~~ html
  <h4>
    <sub-title class="allcaps">Breaking<v-h>: </v-h></sub-title>
    Bad Thing Happens
  <h4>
  ~~~

<h4>
  <sub-title class="allcaps">Breaking<v-h>: </v-h></sub-title>
  Bad Thing Happens
<h4>

</figure>


## Section permalinks

Many pages, including these docs, have links that can be used to jump to a
section that appear when the heading is hovered. Missing.css provides this
as the <dfn>`.permalink-anchor`</dfn> class.


## Toolbar

A <dfn>`.tool-bar`</dfn> is a horizontally laid-out collection of controls.

<figure>

  ~~~ html
  <section class="tool-bar">
    <button type=button>Cut</button>
    <button type=button>Copy</button>
    <button type=button>Paste</button>

    <hr aria-orientation="vertical">

    <label>Find: <input type=text></label>
  </section>
  ~~~


  <section class="tool-bar">
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
Put the sidebar in a `<header>` element directly inside it, and the next
element will house the rest of the page. See this example:

<figure>

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

    <div class="col-4">
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

Add the attribute `aria-current=page` (or `step`) to the link representing the current
page or step (if any).

<figure>

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

If you want to preserve the `<ol>` numbering, use the `type` attribute.

<figure>

  ~~~ html
  <header class="packed">
    <strong class="<h1>">Checkout</strong>
    <nav class=breadcrumbs aria-label="Breadcrumbs">
      <ol type="i">
        <li><a href="#">Cart</a></li>
        <li><a href="#" aria-current=step>Account</a></li>
        <li>Info</li>
        <li>Payment</li>
        <li>Review</li>
      </ol>
    </nav>
  </header>
  ~~~

  <header class="packed">
    <strong class="<h1>">Checkout</strong>
    <nav class=breadcrumbs aria-label="Breadcrumbs">
      <ol type="i">
        <li><a href="#">Cart</a></li>
        <li><a href="#" aria-current=step>Account</a></li>
        <li>Info</li>
        <li>Payment</li>
        <li>Review</li>
      </ol>
    </nav>
  </header>
</figure>


## Chip

The <dfn>`<chip>`</dfn> class, or the <dfn>`.chip`</dfn> class, creates a
rounded chip, like what you might use for a tag list or contacts.

<figure>

  ~~~ html
  <a class="chip" href="/@jdoe"><img src="profiles/jdoe.webp"> John Doe</a>
  <chip>#webdev</chip><chip>#design</chip><chip>#css</chip>
  ~~~

<chip class=info>#webdev</chip> <chip class=ok>⍻ Merged</chip> <chip>John Doe</chip> <chip class=warn>3 minute read</chip>  

</figure>


## Navbar

A navbar has the <dfn>`.navbar`</dfn> class --- see the following for a markup
example:

<figure>
<figcaption>Code: Navbars</figcaption>

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

When you have multiple `<nav>` elements on a page, it's a good idea to put
`aria-label` attributes on them. This is because many assistive programs have
a feature to jump to the navigation part of a page, which does not work well if
the user can't tell which nav is which.

</div>


## Icon Button

<dfn>`.iconbutton`</dfn> creates a bare icon.

<figure class="f-row justify-content:space-between">
<button class=iconbutton type=button>☰</button>
<button class=iconbutton type=button>&rarr;</button>
<button class=iconbutton type=button>✀</button>
<button class=iconbutton type=button>✖</button>
<button class=iconbutton type=button>⚧</button>
<button class=iconbutton type=button>☻</button>
<button class=iconbutton type=button>🎜</button>
</figure>

[colorway]: /docs/colorways
