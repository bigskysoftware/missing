---
title: ARIA
url: ./aria/
---

# ARIA Patterns 

Missing.css will style markup based on ARIA roles. We often reference the
[<cite>WAI-ARIA Authoring Practices</cite>][WAI].

[WAI]: https://www.w3.org/TR/wai-aria-practices/


## Tabs

Mark up your tabs using the `tablist`, `tab` and `tabpanel` roles
appropriately — see [WAI: Tabs][].

To get the actual behavior of an accessible tabset, you can use [Missing.js &sect; Tabs](/docs/js#tabs).

  ~~~ html
  <div role="tablist" aria-label="Tabs example">
    <button role="tab" aria-controls="servers" aria-selected="true"
      >Servers</button>
    <button role="tab" aria-controls="channels"
      >Channels</button>
    <button role="tab" aria-controls="users"
      >Users</button>
  </div>
  
  <div id="servers"  role="tabpanel">...</div>
  <div id="channels" role="tabpanel">...</div>
  <div id="users"    role="tabpanel">...</div>
  ~~~

<script type="module" src="/missing-js/tabs.js"></script>

<div role="tablist" aria-label="Tabs example">
  <button role="tab" aria-controls="servers" aria-selected="true"
    >Servers</button>
  <button role="tab" aria-controls="channels"
    >Channels</button>
  <button role="tab" aria-controls="users"
    >Users</button>
</div>

<div id="servers"         role="tabpanel">This is tab 1. <strong>JavaScript sold separately!</strong></div>
<div id="channels" hidden role="tabpanel">You are enjoying tab 2.</div>
<div id="users"    hidden role="tabpanel"><img alt="placeholder cat" src="https://biber.denizaksimsek.com/img/IMG_2022-07-05_07-16-48-400.webp"></div>

[WAI: Tabs]: https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/


## Menu

Use `menu` and `menuitem` roles — see [WAI: Menu][].

To get the actual behavior of an accessible menu, you can use [Missing.js &sect; Menu](/docs/js#menu).

<figure>

  ~~~ html
  <div role="menu" hidden id="my-menu">
    <a role="menuitem">View</a>
    <a role="menuitem">Edit</a>
    <a role="menuitem">Delete</a>
  </div>
  ~~~

  <div>
  <script type="module" src="/missing-js/menu.js"></script>
  <button aria-haspopup="menu" aria-controls="my-menu" aria-expanded="false">Open menu</button>
  <div role="menu" hidden id="my-menu">
    <a role="menuitem">View</a>
    <a role="menuitem">Edit</a>
    <a role="menuitem">Delete</a>
  </div>
  </div>

</figure>

[WAI: Menu]: https://www.w3.org/WAI/ARIA/apg/patterns/menu/


## Listbox

Use `listbox` and `option` ARIA roles. [WAI: Listbox][].

<figure>

  ~~~ html
  <ul role="listbox" class="box flow-gap">
    <li role="option" aria-selected="true" class="crowded">
      <strong>Pick me!</strong>
      <p>I'm clearly the best option.</p>
    </li>
    <li role="option" class="crowded">
      <strong>Pick me instead!</strong>
      <p>Don't listen to that other guy.</p>
    </li>
  </ul>
  ~~~

  <ul role="listbox" class="box flow-gap">
    <li role="option" aria-selected="true" class="crowded">
      <strong>Pick me!</strong>
      <p>I'm clearly the best option.</p>
    </li>
    <li role="option" class="crowded">
      <strong>Pick me instead!</strong>
      <p>Don't listen to that other guy.</p>
    </li>
  </ul>

</figure>

[WAI: Listbox]: https://www.w3.org/WAI/ARIA/apg/patterns/listbox/


## Toolbar

Any element with the `toolbar` role will have the same styles as a `.tool-bar`.
The fiex direction will be set based on `aria-orientation`.

<figure>

  ~~~ html
  <p class="tool-bar">
    <button type="button">Cut</button>
    <button type="button">Copy</button>
    <button type="button">Paste</button>
  </p>
  ~~~

  <p class="tool-bar">
    <button type="button">Cut</button>
    <button type="button">Copy</button>
    <button type="button">Paste</button>
  </p>

</figure>

<figure>

  ~~~ html
  <p class="tool-bar" aria-orientation="vertical">
    <button type="button">Cut</button>
    <button type="button">Copy</button>
    <button type="button">Paste</button>
  </p>
  ~~~

  <p class="tool-bar" aria-orientation="vertical">
    <button type="button">Cut</button>
    <button type="button">Copy</button>
    <button type="button">Paste</button>
  </p>

</figure>
