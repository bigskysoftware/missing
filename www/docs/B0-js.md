---
title: JS
url: ./js/
templateEngine: [vto, md]
---

# Missing.js

Missing.js is a JavaScript library implementing common UI patterns.

{{ set version = search.pages("release!=undefined")
    |> map(rel => rel.data.release)
    |> sortSemVer
    |> at(-1) }}


## Tabs

_See [ARIA &sect; Tabs](/docs/aria/#tabs)_

Add `tabs.js` **as a module script** to your page
and mark up your tabs with the appropriate ARIA roles.
Behavior will be added automatically.

<figure>

  ~~~ html
  <script type="module" src="https://unpkg.com/missing.css@{{ version }}/dist/js/tabs.js"></script>
  ~~~

</figure>

The tabs behavior emits these custom events:

- **`missing-switch-away`** on a tab after switching away from it.
  - `detail.to`: the newly active tab
- **`missing-switch-to`** on a tab when switching to it
  - `detail.from`: the previously active tab
- **`missing-change`** on the tablist element when changing tabs
  - `detail.to`, `detail.from`

<div class="info box">

### Initializing dynamic content {.titlebar}

For dynamically inserted content: initialize it as such:

<figure>

  ~~~ js
  import tabs from "https://unpkg.com/missing.css@{{ version }}/dist/js/tabs.js";
  // ... insert some content ...
  tabs(theContentIJustInserted);
  ~~~

<figcaption>Initializing a missing.js behavior on newly inserted content</figcaption>

</figure>

Any elements that are inside a shadow DOM will also need to be initialized explicitly this way.

All of our components will find elements that need initialization within the subtree you pass in ---
you could pass the whole `document` every time if you wanted to.

</div>


## Menu

_See [ARIA &sect; menu](/docs/aria/#menu)_

<figure>

  ~~~ html
  <script type="module" src="https://unpkg.com/missing.css@{{ version }}/dist/js/menu.js">
  ~~~

</figure>

or

<figure>

  ~~~js
  import { menu, menuButton } from "https://unpkg.com/missing.css@{{ version }}/dist/js/menu.js";
  ~~~

</figure>

All notes above about initializing dynamic content apply here.


## Feed

_See [ARIA &sect; feed](/docs/aria/#feed)_

<figure>

  ~~~ html
  <script type="module" src="https://unpkg.com/missing.css@{{ version }}/js/feed.js">
  ~~~

</figure>

or

<figure>

  ~~~js
  import { menu, menuButton } from "https://unpkg.com/missing.css@{{ version }}/js/feed.js";
  ~~~

</figure>

All notes above about initializing dynamic content apply here.




## Expand/collapse navbar

_See [Components &sect; Navbar](/docs/components/#navbar)_

<figure>

  ~~~ html
  <script type="module" src="https://unpkg.com/missing.css@{{ version }}/dist/js/overflow-nav.js">
  ~~~

</figure>

Make sure to add:

 - the `data-overflow-nav` attribute to your navbar.
 - inside that navbar, a button with a `data-nav-expander` attribute.

<figure>

  ~~~ html
  <header class="navbar" data-overflow-nav>
    <button class="iconbutton" data-nav-expander aria-hidden>
      &#x2630; <!-- trigram for heaven -->
    </button>
    <!-- rest of navbar... -->
  </header>
  ~~~

</figure>

The navbar will remain horizontally scrollable.

All notes above about initializing dynamic content apply here
(for all those times you dynamically add navbars to your page).
