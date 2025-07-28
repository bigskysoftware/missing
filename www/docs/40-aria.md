---
title: ARIA
url: ./aria/
---

# ARIA Patterns

Missing.css will style markup based on ARIA roles.
We often reference the [<cite>WAI-ARIA Authoring Practices</cite>][WAI].

[WAI]: https://www.w3.org/TR/wai-aria-practices/

<details>
  <summary>Contents:</summary>

  [[toc]]

</details>


## Tabs

Mark up your tabs using the `tablist`{.token .attr-value}, `tab`{.token .attr-value} and `tabpanel`{.token .attr-value} roles appropriately — see [WAI: Tabs][].

To get the actual behavior of an accessible tabset, you can use [Missing.js &sect; Tabs](/docs/js#tabs).

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></sub-title>Tab markup</figcaption>

  ~~~ html
  <script type=module src=/dist/js/tabs.js></script>

  <div role=tablist aria-label="Tabs example">
    <button role=tab aria-controls=servers aria-selected=true
      >Servers</button>
    <button role=tab aria-controls=channels
      >Channels</button>
    <button role=tab aria-controls=users
      >Users</button>
  </div>

  <div id=servers         role=tabpanel>...</div>
  <div id=channels hidden role=tabpanel>...</div>
  <div id=users    hidden role=tabpanel>...</div>
  ~~~

  <hr>

  <script type=module src=/dist/js/tabs.js></script>

  <div role=tablist aria-label="Tabs example">
    <button role=tab aria-controls=servers aria-selected=true
      >Servers</button>
    <button role=tab aria-controls=channels
      >Channels</button>
    <button role=tab aria-controls=users
      >Users</button>
  </div>
  
  <div id=servers         role=tabpanel>This is tab 1. <strong>JavaScript sold separately!</strong></div>
  <div id=channels hidden role=tabpanel>You are enjoying tab 2.</div>
  <div id=users    hidden role=tabpanel><img alt="placeholder cat" src=https://biber.denizaksimsek.com/img/IMG_2022-07-05_07-16-48-400.webp></div>

</figure>


[WAI: Tabs]: https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/


## Menu

Use `menu`{.token .attr-value} and `menuitem`{.token .attr-value} roles — see [WAI: Menu][].

To get the actual behavior of an accessible menu, you can use [Missing.js &sect; Menu](/docs/js#menu).

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></sub-title>Menu markup</figcaption>

  ~~~ html
  <script type=module src=/dist/js/menu.js></script>

  <button aria-haspopup=menu aria-controls=my-menu aria-expanded=false
    >Open menu</button>
  <div role=menu hidden id=my-menu>
    <a role=menuitem>View</a>
    <a role=menuitem>Edit</a>
    <a role=menuitem>Delete</a>
  </div>
  ~~~

  <hr>

  <script type=module src=/dist/js/menu.js></script>
  <div>
  <button aria-haspopup=menu aria-controls=my-menu aria-expanded=false
    >Open menu</button>
  <div role=menu hidden id=my-menu>
    <a role=menuitem>View</a>
    <a role=menuitem>Edit</a>
    <a role=menuitem>Delete</a>
  </div>
  </div>

</figure>

[WAI: Menu]: https://www.w3.org/WAI/ARIA/apg/patterns/menu/


<!--
## Listbox

Use `listbox`{.token .attr-value} and `option`{.token .attr-value} ARIA roles. [WAI: Listbox][].

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></sub-title>Listbox markup</figcaption>

  ~~~ html
  <ul role=listbox class="box flow-gap">
    <li role=option aria-selected=true class="crowded">
      <strong>Pick me!</strong>
      <p>I'm clearly the best option.</p>
    </li>
    <li role=option class="crowded">
      <strong>Pick me instead!</strong>
      <p>Don't listen to that other guy.</p>
    </li>
  </ul>
  ~~~

  <ul role=listbox class="box flow-gap">
    <li role=option aria-selected=true class="crowded">
      <strong>Pick me!</strong>
      <p>I'm clearly the best option.</p>
    </li>
    <li role=option class="crowded">
      <strong>Pick me instead!</strong>
      <p>Don't listen to that other guy.</p>
    </li>
  </ul>

</figure>

[WAI: Listbox]: https://www.w3.org/WAI/ARIA/apg/patterns/listbox/
-->

## Toolbar

Any element with the `toolbar`{.token .attr-value} role will have the same styles as a `.tool-bar`.
The flex direction will be set based on the `aria-orientation`{.token .attr-value} attribute.

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></sub-title>Horizontal toolbar markup</figcaption>

  ~~~ html
  <p role=toolbar>
    <button type=button>Cut</button>
    <button type=button>Copy</button>
    <button type=button>Paste</button>
  </p>
  ~~~

  <hr>

  <p role=toolbar>
    <button type=button>Cut</button>
    <button type=button>Copy</button>
    <button type=button>Paste</button>
  </p>

</figure>

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></sub-title>Vertical toolbar markup</figcaption>

  ~~~ html
  <p role=toolbar aria-orientation=vertical>
    <button type=button>Cut</button>
    <button type=button>Copy</button>
    <button type=button>Paste</button>
  </p>
  ~~~

  <hr>

  <p role=toolbar aria-orientation=vertical>
    <button type=button>Cut</button>
    <button type=button>Copy</button>
    <button type=button>Paste</button>
  </p>

</figure>


## Feed

Use `feed`{.token .attr-value} role with `<article>`{.language-html} children  — see [WAI: Feed][].
Nested feeds are supported.

To get the actual behavior of an accessible feed, you can use [Missing.js &sect; Feed](/docs/js#feed).

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></sub-title>Feed markup</figcaption>

  ~~~ html
  <script type=module src=/dist/js/feed.js></script>
  <div role=feed>
    <article class="box" aria-labelledby=article-1-label>
      <h2 id=article-1-label>Article Title 1</h2>
      <p>Article content</p>
    </article>
    <article class="box" aria-labelledby=article-2-label>
      <h2 id=article-2-label>Article Title 2</h2>
      <p>Article content</p>
    </article>
  </div>
  ~~~

  <hr>

  <div>
  <script type=module src=/dist/js/feed.js></script>
  <div role=feed>
    <article class="box" aria-labelledby=article-1-label>
      <h2 id=article-1-label>Article Title 1</h2>
      <p>Article content</p>
    </article>
    <article class="box" aria-labelledby=article-2-label>
      <h2 id=article-2-label>Article Title 2</h2>
      <p>Article content</p>
    </article>
  </div>

</figure>

[WAI: Feed]: https://www.w3.org/WAI/ARIA/apg/patterns/feed/


## Toggle Switch

Use `switch`{.token .attr-value} role with `<input type=checkbox>`{.language-html}.
The indeterminate state is supported, but it must be set with JavaScript.

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></sub-title>Toggle switch markup</figcaption>

  ~~~ html
  <div class="flex-switch">
    <fieldset class="flex-column">
      <legend>Toggles inside labels</legend>
      <label><input type=checkbox role=switch>Toggle me</label>
      <label><input type=checkbox role=switch checked>But not me</label>
      <label><input type=checkbox role=switch class="indeterminate">I'm not sure</label>
    </fieldset>
    <fieldset class="flex-column">
      <legend>Toggles inside labels, flipped</legend>
      <label class="justify-content:space-between">Toggle me<input type=checkbox role=switch></label>
      <label class="justify-content:space-between">But not me <input type=checkbox role=switch checked></label>
      <label class="justify-content:space-between">I'm not sure <input type=checkbox role=switch class="indeterminate"></label>
    </fieldset>

    <script>
      document.querySelectorAll('.indeterminate').forEach(
        el => {el.indeterminate = true;}
      )
    </script>
  </div>
  ~~~

  <div class="flex-switch">
    <fieldset class="flex-column">
      <legend>Toggles inside labels</legend>
      <label><input type=checkbox role=switch>Toggle me</label>
      <label><input type=checkbox role=switch checked>But not me</label>
      <label><input type=checkbox role=switch class="indeterminate">I'm not sure</label>
    </fieldset>
    <fieldset class="flex-column">
      <legend>Toggles inside labels, flipped</legend>
      <label class="justify-content:space-between">Toggle me<input type=checkbox role=switch></label>
      <label class="justify-content:space-between">But not me <input type=checkbox role=switch checked></label>
      <label class="justify-content:space-between">I'm not sure <input type=checkbox role=switch class="indeterminate"></label>
    </fieldset>
  </div>

  ~~~ html
  <div class="flex-switch">
    <fieldset class="table rows">
      <legend>Toggles before labels</legend>
      <div>
        <input id=toggle-1 type=checkbox role=switch>
        <label for=toggle-1>Toggle me</label>
      </div>
      <div>
        <input id=toggle-2type=checkbox role=switch checked>
        <label for=toggle-2>But not me</label>
      </div>
      <div>
        <input id=toggle-3 type=checkbox role=switch class="indeterminate">
        <label for=toggle-3>I'm not sure</label>
      </div>
    </fieldset>
    <fieldset class="table rows">
      <legend>Toggles after labels</legend>
      <div>
        <label for=toggle-4>Toggle me</label>
        <input id=toggle-4 type=checkbox role=switch>
      </div>
      <div>
        <label for=toggle-5>But not me</label>
        <input id=toggle-5 type=checkbox role=switch checked>
      </div>
      <div>
        <label for=toggle-6>I'm not sure</label>
        <input id=toggle-6 type=checkbox role=switch class="indeterminate">
      </div>
    </fieldset>
    <script>
      document.querySelectorAll('.indeterminate').forEach(
        el => {el.indeterminate = true;}
      )
    </script>
  </div>
  ~~~

  <div class="flex-switch">
    <fieldset class="table rows">
      <legend>Toggles before labels</legend>
      <div>
        <input id=toggle-1 type=checkbox role=switch>
        <label for=toggle-1>Toggle me</label>
      </div>
      <div>
        <input id=toggle-2 type=checkbox role=switch checked>
        <label for=toggle-2>But not me</label>
      </div>
      <div>
        <input id=toggle-3 type=checkbox role=switch class="indeterminate">
        <label for=toggle-3>I'm not sure</label>
      </div>
    </fieldset>
    <fieldset class="table rows">
      <legend>Toggles after labels</legend>
      <div>
        <label for=toggle-4>Toggle me</label>
        <input id=toggle-4 type=checkbox role=switch>
      </div>
      <div>
        <label for=toggle-5>But not me</label>
        <input id=toggle-5 type=checkbox role=switch checked>
      </div>
      <div>
        <label for=toggle-6>I'm not sure</label>
        <input id=toggle-6 type=checkbox role=switch class="indeterminate">
      </div>
    </fieldset>
  </div>

  <script>document.querySelectorAll('.indeterminate').forEach(el => {el.indeterminate = true;})</script>
</figure>
