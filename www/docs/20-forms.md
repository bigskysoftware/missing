---
title: Forms
url: ./forms/
---

# Forms

Missing.css aims to style HTML nicely without authors needing to concern
themselves over anything other than using HTML tags with correct meanings, but
this is not always feasible. Forms are a particularly complex part of HTML,
with multiple ways to mark up the same semantics. For instance, you can label
an element in multiple ways:

  ~~~ html
  <form>
    <label>Name <input></label>
    <!-- or... -->
    <label for="adr">Address</label> <input id="adr">
  </form>
  ~~~

Because of this, it's not really possible to write a stylesheet that will work with
any HTML form.

Missing.css will work best on forms that follow these markup conventions:

[[toc]]


## Inputs and labels

Inputs inside labels will be `display: inline`. Inputs outside labels will be
`display: block`.

<aside>Inputs without labels will cause nasal demons.</aside>

## Buttons

Wrap a `<button>` in a `<strong>` tag to get a primary button.
Buttons support the `[aria-pressed]` and `[aria-expanded]` attributes.

Buttons, `.<button>` [masquerades][], and `<input type=file>` all support [colorways][] as well.

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></sub-title>Button markup</figcaption>

  ~~~ html
  <script>
    const toggle = el => (el.ariaPressed = (el.ariaPressed !== 'true'))
  </script>

  <section tabindex=0 class=overflow:auto>
    <table id=button-table class=table>
    <caption>Button demonstration</caption>
    <thead>
      <tr><th><th><th><code>.ok</code><th><code>.info</code><th><code>.warn</code><th><code>.bad</code>
    <tbody>
      <tr><th scope=row><code>&lt;button&gt;</code>
          <td><button>Plain</button>
          <td><button class=ok>Open</button>
          <!-- ... -->
      <tr><th scope=row class="padding-inline-start"><code>:disabled</code>
          <td><button disabled>Plain</button>
          <td><button disabled class=ok>Open</button>
          <!-- ... -->
      <tr><th scope=row class="padding-inline-start"><code>[aria-pressed=true]</code>
          <td><button aria-pressed=true onclick="toggle(this)">Plain</button>
          <td><button aria-pressed=true class=ok onclick="toggle(this)">Open</button>
          <!-- ... -->
      <tr><th scope=row><code>&lt;strong&gt;&lt;button&gt;</code>
          <td><strong><button>Plain</button></strong>
          <td><strong><button class=ok>Open</button></strong>
          <!-- ... -->
      <tr><th scope=row class="padding-inline-start"><code>:disabled</code>
          <td><strong><button disabled>Plain</button></strong>
          <td><strong><button disabled class=ok>Open</button></strong>
          <!-- ... -->
      <tr><th scope=row class="padding-inline-start"><code>[aria-pressed=true]</code>
          <td><strong><button aria-pressed=true onclick="toggle(this)">Plain</button></strong>
          <td><strong><button aria-pressed=true class=ok onclick="toggle(this)">Open</button></strong>
          <!-- ... -->
      <tr><th scope=row><code>&lt;a class="&lt;button&gt;"&gt;</code>
          <td><a href="#button-table" class="<button>">Plain</button>
          <td><a href="#button-table" class="ok <button>">Open</button>
          <!-- ... -->
    </table>
  </section>
  ~~~

  <hr>

  <style>
    #button-table tr > * { padding-block: 0.25em }
    #button-table th { font-weight: normal }
  </style>
  <script>
    const toggle = el => (el.ariaPressed = (el.ariaPressed !== 'true'))
  </script>

  <section tabindex=0 class=overflow:auto>
    <table id=button-table class=table>
    <caption>Button demonstration</caption>
    <thead>
      <tr><th><th><th><code>.ok</code><th><code>.info</code><th><code>.warn</code><th><code>.bad</code>
    <tbody>
      <tr><th scope=row><code>&lt;button&gt;</code>
          <td><button>Plain</button>
          <td><button class=ok>Open</button>
          <td><button class=info>Info</button>
          <td><button class=warn type=reset>Reset</button>
          <td><button class=bad formaction=dialog>Close</button>
      <tr><th scope=row class="padding-inline-start"><code>:disabled</code>
          <td><button disabled>Plain</button>
          <td><button disabled class=ok>Open</button>
          <td><button disabled class=info>Info</button>
          <td><button disabled class=warn type=reset>Reset</button>
          <td><button disabled class=bad formaction=dialog>Close</button>
      <tr><th scope=row class="padding-inline-start"><code>[aria-pressed=true]</code>
          <td><button aria-pressed=true onclick="toggle(this)">Plain</button>
          <td><button aria-pressed=true class=ok onclick="toggle(this)">Open</button>
          <td><button aria-pressed=true class=info onclick="toggle(this)">Info</button>
          <td><button aria-pressed=true class=warn onclick="toggle(this)">Reset</button>
          <td><button aria-pressed=true class=bad onclick="toggle(this)">Close</button>
      <tr><th scope=row><code>&lt;strong&gt;&lt;button&gt;</code>
          <td><strong><button>Plain</button></strong>
          <td><strong><button class=ok>Open</button></strong>
          <td><strong><button class=info>Info</button></strong>
          <td><strong><button class=warn type=reset>Reset</button></strong>
          <td><strong><button class=bad formaction=dialog>Close</button></strong>
      <tr><th scope=row class="padding-inline-start"><code>:disabled</code>
          <td><strong><button disabled>Plain</button></strong>
          <td><strong><button disabled class=ok>Open</button></strong>
          <td><strong><button disabled class=info>Info</button></strong>
          <td><strong><button disabled class=warn type=reset>Reset</button></strong>
          <td><strong><button disabled class=bad formaction=dialog>Close</button></strong>
      <tr><th scope=row class="padding-inline-start"><code>[aria-pressed=true]</code>
          <td><strong><button aria-pressed=true onclick="toggle(this)">Plain</button></strong>
          <td><strong><button aria-pressed=true class=ok onclick="toggle(this)">Open</button></strong>
          <td><strong><button aria-pressed=true class=info onclick="toggle(this)">Info</button></strong>
          <td><strong><button aria-pressed=true class=warn onclick="toggle(this)">Reset</button></strong>
          <td><strong><button aria-pressed=true class=bad onclick="toggle(this)">Close</button></strong>
      <tr><th scope=row><code>&lt;a class="&lt;button&gt;"&gt;</code>
          <td><a href="#button-table" class="<button>">Plain</button>
          <td><a href="#button-table" class="ok <button>">Open</button>
          <td><a href="#button-table" class="info <button>">Info</button>
          <td><a href="#button-table" class="warn <button>">Reset</button>
          <td><a href="#button-table" class="bad <button>">Close</button>
    </table>
  </section>
</figure>

<figure>
<figcaption><sub-title class=allcaps>Example<v-h>:</v-h></sub-title>File input buttons</figcaption>

  <section class="crowded flex-switch">
    <div class="flex-column">
      <input type=file>
      <input type=file class="ok">
      <input type=file class="info">
      <input type=file class="warn">
      <input type=file class="bad">
    </div>
    <div class="flex-column">
      <strong><input type=file></strong>
      <strong><input type=file class="ok"></strong>
      <strong><input type=file class="info"></strong>
      <strong><input type=file class="warn"></strong>
      <strong><input type=file class="bad"></strong>
    </div>
  </section>

</figure>


## Tabular forms

You can use the `.table` and `.rows` classes to create a form with inputs lined
up like cells of a table.

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></sub-title>Tabular form markup</figcaption>

  ~~~ html
  <form class="table rows">
    <p><label for=inp>Label</label> <input id=inp></p>
    ...
  ~~~

  <hr>

  <form class="table rows">
    <p><label for=tf-text>Text</label> <input id=tf-text></p>
    <p><label for=tf-sel>Select</label> <select id=tf-sel><option>Option</select></p>
    <p><label for=tf-textarea>Textarea</label> <textarea id=tf-textarea rows=4></textarea></p>
    <p><label for=tf-text>Text</label> <input id=tf-text></p>
  </form>
</figure>


## Labeling radio buttons

The accepted way to label a group of radio buttons is to use `<fieldset>` and
`<legend>`:

  ~~~ html
  <fieldset>
    <legend>Color</legend>
    <ul>
      <li><label><input type=radio name=color value="ff0000">Red</label>
      <li><label><input type=radio name=color value="00ff00">Green</label>
      <li><label><input type=radio name=color value="0000ff">Blue</label>
    </ul>
  </fieldset>
  ~~~

This works in missing.css, but these two elements are [notorious] for being
hard to style. You can use the following pattern instead, which will work with
[tabular forms](#tabular-forms). Note the role, aria-labelledby and the ID on
the label itself.


<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></sub-title>Radio group markup for tabular forms</figcaption>

  ~~~ html
  <div role=radiogroup aria-labelledby=color-lbl>
    <span id=color-lbl>Color</span>
    <div>
      <div><label><input type=radio name=color value="ff0000"> Red</label></div>
      <div><label><input type=radio name=color value="00ff00"> Green</label></div>
      <div><label><input type=radio name=color value="0000ff"> Blue</label></div>
    </div>
  </div>
  ~~~

  <hr>

  <form class="table rows">
    <div>
      <label for="item">Item</label>
      <select>
        <option>Wallet
        <option>Skyscraper
        <option>Typewriter
      </select>
    </div>
    <div role=radiogroup aria-labelledby=color-lbl>
      <span id=color-lbl>Color</span>
      <div>
        <div><label><input type=radio name=color value="ff0000"> Red</label></div>
        <div><label><input type=radio name=color value="00ff00"> Green</label></div>
        <div><label><input type=radio name=color value="0000ff"> Blue</label></div>
      </div>
    </div>
  </form>
</figure>


[masquerades]: /docs/utils/#masquerades
[colorways]: /docs/colorways
