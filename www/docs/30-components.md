---
title: Components
url: ./components/
---

# Components

<details>
  <summary>Contents:</summary>

  [[toc]]

</details>

## Box

The <dfn>`.box`</dfn> class creates a padded box with a border.

Boxes use the border and background color of the [colorway][].

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></sub-title>Box markup</figcaption>

  ~~~ html
  <div class="warn box">
    <strong>Warning</strong>: If you're putting <!-- ... -->
  </div>
  ~~~

  <hr>

  **Warning**:&emsp;If you're putting something in a box, make sure to clarify why it is in a box in some other way.
  For example, this box has "Warning" in bold, in addition to being yellow.
  This makes your page clearer and prevents accessibility failures.{.warn .box}

</figure>

The above box, in addition to being an example, is also a genuine warning.

The `<figure>`{.language-html}, `<details>`{.language-html}, and `<dialog>`{.language-html} elements share their appearance with the `.box` class.


## Titlebar

<dfn>`.titlebar`</dfn>: A titlebar for a `.box`{.language-css}.

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></sub-title>Titlebar markup</figcaption>

  ~~~ html
  <div class="bad box">
    <strong class="titlebar">Error</strong>
    <p>Task failed successfully
  </div>
  ~~~

  <hr>

  <div class="bad box">
    <strong class="titlebar">Error</strong>
    <p>Task failed successfully
  </div>

</figure>


## Subtitle

The <dfn>`<sub-title>`</dfn> custom element or the <dfn>`.sub-title`</dfn> class is a subtitle for a heading.
Visually hiding a colon with the `<v-h>`{.language-html} element can help screen readers parse the heading correctly.

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

Many pages, including these docs, have links that can be used to jump to a section that appear when the heading is hovered.
Missing.css provides this as the <dfn>`.permalink-anchor`</dfn> class.

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></sub-title>Permalink markup (hover to reveal)</figcaption>

  ~~~ html
  <h2 id=section-permalinks class="packed" tabindex=-1>
    <a class="permalink-anchor float:right" href=#section-permalinks>§</a>
    Section permalinks
  </h2>
  ~~~

  <hr>

  <h2 id=section-permalinks tabindex=-1 class="packed">
    <a href=#section-permalinks class="permalink-anchor float:right">§</a>
    Section permalinks
  </h2>

</figure>

## Toolbar

A <dfn>`.tool-bar`</dfn> is a horizontally laid-out collection of controls.
Alternatively, you can use `[role=toolbar]`{.token .attr-name}.

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
    <hr aria-orientation=vertical>
    <label>Find: <input type=text></label>
  </section>

</figure>

[WAI: Toolbar]: https://www.w3.org/TR/wai-aria-practices/#toolbar


## Sidebar

Use the <dfn>`.sidebar-layout`</dfn> class to create a sidebar/main layout.
Put sidebar content in a `<header>`{.language-html} element directly inside `.sidebar-layout`{.language-css}, and the next element will house the rest of the page.
See this example:

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></sub-title>Sidebar markup</figcaption>

  ~~~ html
  <div class="sidebar-layout">
    <header>
      <ul role="list">
        <li><a href=/>Home</a></li>
        <li><a href=/>Profile</a></li>
        <li><a href=/>Settings</a></li>
        <!-- ... -->
      </ul>
    </header>

    <div>
      <main></main>
      <footer></footer>
    </div>
  </div>
  ~~~

**<a href=/demos/sidebar class="<button>">Sidebar demo &rarr;</a>**

</figure>


## Breadcrumbs

Add <dfn>`.breadcrumbs`</dfn> to a `<nav>`{.language-html} element.
Use an `<ul>`{.language-html} or  `<ol>`{.language-html} of links inside.
Don't forget to add an `aria-label`{.token .attr-name} attribute.

Add the attribute `aria-current`{.token .attr-name} to the link representing the current page or step (if any).
The separator will be set to either `--breadcrumb-page` or `--breadcrumb-step` depending on whether its value is `page`{.token .attr-value} or `step`{.token .attr-value}.

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></sub-title>Breadcrumbs markup</figcaption>

  ~~~ html
  <nav class="breadcrumbs" aria-label="Breadcrumbs">
    <ol>
      <li><a href=#>Home</a></li>
      <li><a href=#>User</a></li>
      <li><a href=#>Advanced</a></li>
      <li><a href=#>New All</a></li>
      <li><a href=# aria-current=page>Quit Sibelius</a></li>
    </ol>
  </nav>
  ~~~

  <hr>

  <nav class="breadcrumbs" aria-label="Breadcrumbs">
    <ol>
      <li><a href=#>Home</a></li>
      <li><a href=#>User</a></li>
      <li><a href=#>Advanced</a></li>
      <li><a href=#>New All</a></li>
      <li><a href=# aria-current=page>Quit Sibelius</a></li>
    </ol>
  </nav>

</figure>

If you want to preserve the `<ol>`{.language-html} numbering, use the `type`{.token .attr-name} attribute.

<figure>

  ~~~ html
  <header class="packed">
    <strong class="<h1>">Checkout</strong>
    <nav class="breadcrumbs" aria-label="Breadcrumbs">
      <ol type=1>
        <li><a href=#>Cart</a></li>
        <li><a href=# aria-current=step>Account</a></li>
        <li>Info</li>
        <li>Payment</li>
        <li>Review</li>
      </ol>
    </nav>
  </header>
  ~~~

  <hr>

  <header class="packed">
    <strong class="<h1>">Checkout</strong>
    <nav class="breadcrumbs" aria-label="Breadcrumbs">
      <ol type=1>
        <li><a href=#>Cart</a></li>
        <li><a href=# aria-current=step>Account</a></li>
        <li>Info</li>
        <li>Payment</li>
        <li>Review</li>
      </ol>
    </nav>
  </header>
</figure>


## Chip

The <dfn>`<chip>`</dfn> class, or the <dfn>`.chip`</dfn> class, creates a rounded chip, like what you might use for a tag list or contacts.

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></sub-title>Chip markup</figcaption>

  ~~~ html
  <chip class="info">#webdev</chip>
  <chip class="ok">⍻ Merged</chip>
  <chip>John Doe</chip>
  <chip class="warn">3 minute read</chip>  
  ~~~

  <hr>

  <chip class="info">#webdev</chip>
  <chip class="ok">⍻ Merged</chip>
  <chip>John Doe</chip>
  <chip class="warn">3 minute read</chip>  

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
        <li><a href=/><img alt="missing.js" src="/logo.png"></a>
        <li><a href=/docs>Docs</a>
        <li><a href=/docs>Contribute</a>
        <li><a href=/docs>Donate</a>
      </ul>
    </nav>
    <nav aria-label="Social media links">
      <ul role="list">
        <li><a href=/><img alt=""></a>
        <li><a href=https://github.com/...>GitHub</a>
        <li><a href=https://discord.app/...>Discord</a>
      </ul>
    </nav>
  </header>
  ~~~

</figure>

To make your navbar expand/collapsible on smaller screens,
you can use [Missing.js &sect; Expand/collapse navbar](/docs/js#expand%2Fcollapse-navbar).

**Info**:&emsp;When you have multiple `<nav>`{.language-html} elements on a page, it's a good idea to put `aria-label`{.token .attr-name} attributes on them.
This is because many assistive programs have a feature to jump to the navigation part of a page, which does not work well if the user can't tell which nav is which.{.info .box}


## Icon Button

<dfn>`.iconbutton`</dfn> creates a bare icon; it even works with the `.<button>`{.language-css} masquerade!
[Colorways][colorway] are supported as well.
We recommend using <a href=https://lucide.dev>Lucide</a> for icons.

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></sub-title>Icon button markup</figcaption>

  ~~~ css
  /* style.css */
  svg:has(use[href$="-icon"]) { height: 1em; width: 1em; }
  ~~~

  ~~~ html
  <!-- sprite sheet -->
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <defs>
      <symbol id="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16"/><path d="M4 18h16"/><path d="M4 6h16"/></symbol>
      <!-- ... --->
    </defs>
  </svg>
  ~~~

  ~~~ html
  <!-- markup.html -->
  <section class="flex-row justify-content:space-between">
    <button class="iconbutton" type=button aria-label="Menu">
      <svg aria-hidden=true><use href=#menu-icon></use></svg>
    </button>
    <a class="info <button> iconbutton" aria-label="Next">
      <svg aria-hidden=true><use href=#next-icon></use></svg>
    </a>
    <!-- ... -->
  </section>
  ~~~

  <hr>

  <style>svg:has(use[href$="-icon"]) { height: 1em; width: 1em; }</style>
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <defs>
      <symbol id="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu-icon lucide-menu"><path d="M4 12h16"/><path d="M4 18h16"/><path d="M4 6h16"/></symbol>
      <symbol id="next-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-big-right-icon lucide-arrow-big-right"><path d="M6 9h6V5l7 7-7 7v-4H6V9z"/></symbol>
      <symbol id="cut-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-scissors-icon lucide-scissors"><circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/></symbol>
      <symbol id="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></symbol>
      <symbol id="trans-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-transgender-icon lucide-transgender"><path d="M12 16v6"/><path d="M14 20h-4"/><path d="M18 2h4v4"/><path d="m2 2 7.17 7.17"/><path d="M2 5.355V2h3.357"/><path d="m22 2-7.17 7.17"/><path d="M8 5 5 8"/><circle cx="12" cy="12" r="4"/></symbol>
      <symbol id="smile-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-smile-icon lucide-smile"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></symbol>
      <symbol id="music-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-music-icon lucide-music"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></symbol>
    </defs>
  </svg>
  <section class="flex-row justify-content:space-between">
    <button class="iconbutton" type=button aria-label="Menu">
      <svg aria-hidden=true><use href=#menu-icon></use></svg>
    </button>
    <a class="info <button> iconbutton" aria-label="Next">
      <svg aria-hidden=true><use href=#next-icon></use></svg>
    </a>
    <button class="ok iconbutton" type=button aria-label="Cut">
      <svg aria-hidden=true><use href=#cut-icon></use></svg>
    </button>
    <a class="warn <button> iconbutton" aria-label="Close">
      <svg aria-hidden=true><use href=#close-icon></use></svg>
    </a>
    <button class="bad iconbutton" type=button aria-label="Trans">
      <svg aria-hidden=true><use href=#trans-icon></use></svg>
    </button>
    <a class="info <button> iconbutton" aria-label="Smile">
      <svg aria-hidden=true><use href=#smile-icon></use></svg>
    </a>
    <button class="ok iconbutton" type=button aria-label="Music">
      <svg aria-hidden=true><use href=#music-icon></use></svg>
    </button>
  </section>

</figure>

[colorway]: /docs/colorways
