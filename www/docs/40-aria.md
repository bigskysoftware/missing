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

<figure>

  ~~~ html
  <div role="tablist" aria-label="Tabs example">
    <button role="tab" aria-controls="servers" aria-selected="true"
      >Servers</button>
    <button role="tab" aria-controls="channels"
      >Channels</button>
    <button role="tab" aria-controls="users"
      >Users</button>
  </div>

  <div id="servers"         role="tabpanel">...</div>
  <div id="channels" hidden role="tabpanel">...</div>
  <div id="users"    hidden role="tabpanel">...</div>
  ~~~

</figure>

<script type="module" src="/dist/js/tabs.js"></script>

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
  <script type="module" src="/dist/js/menu.js"></script>
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


## Feed

Use `feed` role with `<article>` children  — see [WAI: Feed][]. Nested feeds are supported.

To get the actual behavior of an accessible feed, you can use [Missing.js &sect; Feed](/docs/js#feed).

<figure>

  ~~~ html
  <div role="feed">
    <article class="box" aria-labelledby="article-1-label">
      <h2 id="article-1-label">Article Title 1</h2>
      <p>Article content</p>
    </article>
    <article class="box" aria-labelledby="article-2-label">
      <h2 id="article-2-label">Article Title 2</h2>
      <p>Article content</p>
    </article>
  </div>
  ~~~

  <div>
  <script type="module" src="/dist/js/feed.js"></script>
  <div role="feed">
    <article class="box" aria-labelledby="article-1-label">
      <h2 id="article-1-label">Article Title 1</h2>
      <p>Article content</p>
    </article>
    <article class="box" aria-labelledby="article-2-label">
      <h2 id="article-2-label">Article Title 2</h2>
      <p>Article content</p>
    </article>
  </div>

</figure>
[WAI: Feed]: https://www.w3.org/WAI/ARIA/apg/patterns/feed/


## Toggle Switch

Use `switch` role with `<input type="checkbox">` or `aria-pressed` with `<button>`.

If using `<button>`, you must provide the JavaScript to toggle `[aria-pressed]`.

Using `<input>` degrades nicely in the absense of JavaScript and also allows for an "indeterminate" state.

<figure>
<figcaption>Code: Toggle Switches</figcaption>

  ~~~ html
  <div class="f-switch">
    <fieldset class="f-col">
      <legend>Toggles inside labels</legend>
      <label>
        <input type="checkbox" role="switch"> Toggle me
      </label>
      <label>
        <input type="checkbox" role="switch" checked> But not me
      </label>
      <label>
        <input type="checkbox" role="switch"> I'm not sure
      </label>
    </fieldset>
    <fieldset class="f-col">
      <legend>Toggles inside labels, flipped</legend>
      <label>
        Toggle me <input type="checkbox" role="switch">
      </label>
      <label>
        But not me <input type="checkbox" role="switch" checked>
      </label>
      <label>
        I'm not sure <input type="checkbox" role="switch">
      </label>
    </fieldset>
  </div>
  ~~~

  <div class="f-switch">
    <fieldset class="f-col">
      <legend>Toggles inside labels</legend>
      <label>
        <input type="checkbox" role="switch"> Toggle me
      </label>
      <label>
        <input type="checkbox" role="switch" checked> But not me
      </label>
      <label>
        <input type="checkbox" role="switch"> I'm not sure
      </label>
    </fieldset>
    <fieldset class="f-col">
      <legend>Toggles inside labels, flipped</legend>
      <label>
        Toggle me <input type="checkbox" role="switch">
      </label>
      <label>
        But not me <input type="checkbox" role="switch" checked>
      </label>
      <label>
        I'm not sure <input type="checkbox" role="switch">
      </label>
    </fieldset>
  </div>

  ~~~ html
  <div class="f-switch">
    <fieldset class="f-col">
      <legend>Toggles before labels</legend>
      <div class="f-row">
        <input id="toggle-1" type="checkbox" role="switch">
        <label for="toggle-1">Toggle me</label>
      </div>
      <div class="f-row">
        <input id="toggle-2"type="checkbox" role="switch" checked>
        <label for="toggle-2">But not me</label>
      </div>
      <div class="f-row">
        <input if="toggle-3" type="checkbox" role="switch">
        <label for="toggle-3">I'm not sure</label>
      </div>
    </fieldset>
    <fieldset class="f-col">
      <legend>Toggles after labels</legend>
      <div class="f-row justify-content:space-between">
        <label for="toggle-4">Toggle me</label>
        <input id="toggle-4" type="checkbox" role="switch">
      </div>
      <div class="f-row justify-content:space-between">
        <label for="toggle-5">But not me</label>
        <input id="toggle-5" type="checkbox" role="switch" checked>
      </div>
      <div class="f-row justify-content:space-between">
        <label for="toggle-6">I'm not sure</label>
        <input id="toggle-6" type="checkbox" role="switch">
      </div>
    </fieldset>
  </div>
  ~~~

  <div class="f-switch">
    <fieldset class="f-col">
      <legend>Toggles before labels</legend>
      <div class="f-row">
        <input id="toggle-1" type="checkbox" role="switch">
        <label for="toggle-1">Toggle me</label>
      </div>
      <div class="f-row">
        <input id="toggle-2"type="checkbox" role="switch" checked>
        <label for="toggle-2">But not me</label>
      </div>
      <div class="f-row">
        <input if="toggle-3" type="checkbox" role="switch">
        <label for="toggle-3">I'm not sure</label>
      </div>
    </fieldset>
    <fieldset class="f-col">
      <legend>Toggles after labels</legend>
      <div class="f-row justify-content:space-between">
        <label for="toggle-4">Toggle me</label>
        <input id="toggle-4" type="checkbox" role="switch">
      </div>
      <div class="f-row justify-content:space-between">
        <label for="toggle-5">But not me</label>
        <input id="toggle-5" type="checkbox" role="switch" checked>
      </div>
      <div class="f-row justify-content:space-between">
        <label for="toggle-6">I'm not sure</label>
        <input id="toggle-6" type="checkbox" role="switch">
      </div>
    </fieldset>
  </div>


  ~~~ html
  <div class="f-switch">
    <fieldset class="f-col">
      <legend>Button toggles</legend>
      <button type="button" aria-pressed="false">
        Toggle me
      </button>
      <button type="button" aria-pressed="true">
        But not me
      </button>
    </fieldset>
    <fieldset class="f-col">
      <legend>Button toggles, flipped</legend>
      <button type="button" aria-pressed="false" onclick="this.ariaPressed = this.ariaPressed != 'true'">
        Toggle me
      </button>
      <button type="button" aria-pressed="true" onclick="this.ariaPressed = this.ariaPressed != 'true'">
        But not me
      </button>
    </fieldset>
  </div>
  ~~~

  <div class="f-switch">
    <fieldset class="f-col">
      <legend>Button toggles</legend>
      <button type="button" aria-pressed="false">
        Toggle me
      </button>
      <button type="button" aria-pressed="true">
        But not me
      </button>
    </fieldset>
    <fieldset class="f-col">
      <legend>Button toggles, flipped</legend>
      <button type="button" aria-pressed="false" onclick="this.ariaPressed = this.ariaPressed != 'true'">
        Toggle me
      </button>
      <button type="button" aria-pressed="true" onclick="this.ariaPressed = this.ariaPressed != 'true'">
        But not me
      </button>
    </fieldset>
  </div>

  <strong>TODO</strong>
  <ul>
  <li>RTL
  <li>Indeterminate state
  </ul>
</figure>