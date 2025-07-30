---
title: Forms
url: ./forms/
---

# Forms

<details>
  <summary>Contents:</summary>

  [[toc]]

</details>

Missing.css aims to style HTML nicely without authors needing to concern themselves over anything
other than using HTML tags with correct meanings, but this is not always feasible.
Forms are a particularly complex part of HTML, with multiple ways to mark up the same semantics.
For instance, you can label an element in multiple ways:

~~~ html
<form>
  <label>Name <input></label>
  <!-- or... -->
  <label for=adr>Address</label> <input id=adr>
</form>
~~~

Because of this, it's not really possible to write a stylesheet that will work with any HTML form.

Missing.css will work best on forms that follow these markup conventions:


## Inputs and labels

Inputs inside labels will be `display:inline`{.language-css}.
Inputs outside labels will be `display:block`{.language-css}.

<aside>Inputs without labels will cause nasal demons.</aside>

## Buttons

Wrap a `<button>`{.language-html} in a `<strong>`{.language-html} tag to get a primary button.
Buttons support the `aria-pressed`{.token .attr-name} and `aria-expanded`{.token .attr-name} attributes.

Buttons, `.<button>` [masquerades][], and `<input type=file>`{.language-html} all support [colorways][] as well.

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>: </v-h></sub-title>Button markup</figcaption>

  ~~~ html
  <script>
    const toggle = el => (el.ariaPressed = (el.ariaPressed !== 'true'))
  </script>

  <section tabindex=0 class="overflow:auto">
    <table id=button-table class="table">
    <caption>Button demonstration</caption>
    <thead>
      <tr><th><th><th><code>.ok</code><th><code>.info</code><th><code>.warn</code><th><code>.bad</code>
    <tbody>
      <tr><th scope=row><code>&lt;button&gt;</code>
          <td><button>Plain</button>
          <td><button class="ok">Open</button>
          <!-- ... -->
      <tr><th scope=row class="padding-inline-start"><code>:disabled</code>
          <td><button disabled>Plain</button>
          <td><button disabled class="ok">Open</button>
          <!-- ... -->
      <tr><th scope=row class="padding-inline-start"><code>[aria-pressed=true]</code>
          <td><button aria-pressed=true onclick="toggle(this)">Plain</button>
          <td><button aria-pressed=true class="ok" onclick="toggle(this)">Open</button>
          <!-- ... -->
      <tr><th scope=row><code>&lt;strong&gt;&lt;button&gt;</code>
          <td><strong><button>Plain</button></strong>
          <td><strong><button class="ok">Open</button></strong>
          <!-- ... -->
      <tr><th scope=row class="padding-inline-start"><code>:disabled</code>
          <td><strong><button disabled>Plain</button></strong>
          <td><strong><button disabled class="ok">Open</button></strong>
          <!-- ... -->
      <tr><th scope=row class="padding-inline-start"><code>[aria-pressed=true]</code>
          <td><strong><button aria-pressed=true onclick="toggle(this)">Plain</button></strong>
          <td><strong><button aria-pressed=true class="ok" onclick="toggle(this)">Open</button></strong>
          <!-- ... -->
      <tr><th scope=row><code>&lt;a class="&lt;button&gt;"&gt;</code>
          <td><a href=#button-table class="<button>">Plain</button>
          <td><a href=#button-table class="ok <button>">Open</button>
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

  <section tabindex=0 class="overflow:auto">
    <table id=button-table class="table">
    <caption>Button demonstration</caption>
    <thead>
      <tr><th><th><th><code>.ok</code><th><code>.info</code><th><code>.warn</code><th><code>.bad</code>
    <tbody>
      <tr><th scope=row><code>&lt;button&gt;</code>
          <td><button>Plain</button>
          <td><button class="ok">Open</button>
          <td><button class="info">Info</button>
          <td><button class="warn" type=reset>Reset</button>
          <td><button class="bad" formaction=dialog>Close</button>
      <tr><th scope=row class="padding-inline-start"><code>:disabled</code>
          <td><button disabled>Plain</button>
          <td><button disabled class="ok">Open</button>
          <td><button disabled class="info">Info</button>
          <td><button disabled class="warn" type=reset>Reset</button>
          <td><button disabled class="bad" formaction=dialog>Close</button>
      <tr><th scope=row class="padding-inline-start"><code>[aria-pressed=true]</code>
          <td><button aria-pressed=true onclick="toggle(this)">Plain</button>
          <td><button aria-pressed=true class="ok" onclick="toggle(this)">Open</button>
          <td><button aria-pressed=true class="info" onclick="toggle(this)">Info</button>
          <td><button aria-pressed=true class="warn" onclick="toggle(this)">Reset</button>
          <td><button aria-pressed=true class="bad" onclick="toggle(this)">Close</button>
      <tr><th scope=row><code>&lt;strong&gt;&lt;button&gt;</code>
          <td><strong><button>Plain</button></strong>
          <td><strong><button class="ok">Open</button></strong>
          <td><strong><button class="info">Info</button></strong>
          <td><strong><button class="warn" type=reset>Reset</button></strong>
          <td><strong><button class="bad" formaction=dialog>Close</button></strong>
      <tr><th scope=row class="padding-inline-start"><code>:disabled</code>
          <td><strong><button disabled>Plain</button></strong>
          <td><strong><button disabled class="ok">Open</button></strong>
          <td><strong><button disabled class="info">Info</button></strong>
          <td><strong><button disabled class="warn" type=reset>Reset</button></strong>
          <td><strong><button disabled class="bad" formaction=dialog>Close</button></strong>
      <tr><th scope=row class="padding-inline-start"><code>[aria-pressed=true]</code>
          <td><strong><button aria-pressed=true onclick="toggle(this)">Plain</button></strong>
          <td><strong><button aria-pressed=true class="ok" onclick="toggle(this)">Open</button></strong>
          <td><strong><button aria-pressed=true class="info" onclick="toggle(this)">Info</button></strong>
          <td><strong><button aria-pressed=true class="warn" onclick="toggle(this)">Reset</button></strong>
          <td><strong><button aria-pressed=true class="bad" onclick="toggle(this)">Close</button></strong>
      <tr><th scope=row><code>&lt;a class="&lt;button&gt;"&gt;</code>
          <td><a href=#button-table class="<button>">Plain</a></button>
          <td><a href=#button-table class="ok <button>">Open</a></button>
          <td><a href=#button-table class="info <button>">Info</a></button>
          <td><a href=#button-table class="warn <button>">Reset</a></button>
          <td><a href=#button-table class="bad <button>">Close</a></button>
    </table>
  </section>
</figure>

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>: </v-h></sub-title>File input button markup</figcaption>

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

You can use the `.table` and `.rows` classes to create a form with inputs lined up like cells of a table.

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>: </v-h></sub-title>Tabular form markup</figcaption>

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

The accepted way to label a group of radio buttons is to use `<fieldset>`{.language-html} and `<legend>`{.language-html}:

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

This works in missing.css, but these two elements are [notorious] for being hard to style.
You can use the following pattern instead, which will work with [tabular forms](#tabular-forms).
Note the `role`{.token .attr-name}, `aria-labelledby`{.token .attr-name} and the `id`{.token .attr-name} attributes on the label itself.


<figure>
<figcaption><sub-title class="allcaps">Example<v-h>: </v-h></sub-title>Radio group markup for tabular forms</figcaption>

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


## Progress bar

Create a progress bar using the `<progress>`{.language-html} element.
This element should be used to represent how much of a specific, ongoing process has been completed.
Be sure to add a `<label>`{.language-html} for accessibility (in conjunction with `.vh`{.language-css} or `<v-h>`{.language-html} if you like).

The element can be put in an indeterminate state by not including the `value`{.token .attr-name} attribute.
Indeterminate `<progress>`{.language-html} elements will show a pending animation if the user does not have `@prefers-reduced-motion`{.language-css} set.

The element can be styled by setting `--border-width`, `--border-style`, and `--border-radius` variables directly on the `<progress>`{.language-html} element.
When not explicitly set, the element inherits from `--interactive-border-width`, `--interactive-border-style`, and `--tab-border-radius`.

For full-width progress bars, use the `.width:100%` utility class.
[Colorways](colorways) are supported.


<figure>
<figcaption><sub-title class="allcaps">Example<v-h>: </v-h></sub-title>Progress bar markup</figcaption>

  ~~~ html
  <div class="flex-column">
     
    <label for=p1 class="vh">Upload progress...</label>
    <progress id=p1 value=0.5 class="width:100%"></progress>

    <label for=p2>LCARS Scan...</label>
    <progress id=p2 class="ok width:100%" value=0.25 style="height: 1.5em; --border-width: 6px; --border-style: double; --border-radius: 0 .5em"></progress>

    <label for=p3>Virus progress...</label>
    <progress id=p3 class="warn width:100%" value=0.75 style="--border-width: 3px; --border-style: inset; --border-radius: 0 .5rem .5rem .5rem"></progress>

    <label for=p4>Indeterminate Cylon</label>
    <progress id=p4 class="bad" style="width: 3em;">Indeterminate Cylon</progress>

  </div>
  ~~~

  <hr>

  <div class="flex-column">

    <label for=p1 class="vh">Upload progress...</label>
    <progress id=p1 value=0.5 class="width:100%"></progress>

    <label for=p2>LCARS Scan...</label>
    <progress id=p2 class="ok width:100%" value=0.25 style="height: 1.5em; --border-width: 6px; --border-style: double; --border-radius: 0 .5em"></progress>

    <label for=p3>Virus progress...</label>
    <progress id=p3 class="warn width:100%" value=0.75 style="--border-width: 3px; --border-style: inset; --border-radius: 0 .5rem .5rem .5rem"></progress>

    <label for=p4>Indeterminate Cylon</label>
    <progress id=p4 class="bad" style="width: 3em;">Indeterminate Cylon</progress>

  </div>

</figure>

## Meter

Use the `<meter>`{.language-html} element to create a meter guage.
This element is used to indicate a measurement within a known range and is semantically differen from the `<progress>`{.language-html} element.

Similar to the `<progress>`{.language-html} element, you can style a `<meter>`{.language-html} by setting `--border-width`, `--border-style`, and `--border-radius` directly on the element.
The `<meter>`{.language-html} element derives its colors from the `.ok`, `.warn`, and `.bad` [colorways]().

<div class="warn box">

**Warning**:&emsp;Due to cross-browser implementation differences, colorways are only fully supported in browsers that pass the `@supports (selector(:-moz-meter-optimum))`{.language-css} check.
The color of the meter bar is correctly set in all browsers according to the values of `--ok-fg`, `--warn-fg`, and `--bad-fg`.
However, only browsers passing the `@supports`{.language-css} rule will also have the appropriate colorway background and border colors.

A suitable fallback choice has been made for these colors (`--plain-bg` for the background and `--interactive-bg` for the border) until browser support improves.

</div>

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>: </v-h></sub-title>Value in optimum range</figcaption>

  ~~~html
  <strong>Disk usage (optimum is a medium amount of usage)</strong>
  <label for=disk1>60GB Used:</label>
  <meter id=disk1 min=0 max=100 value=60 low=30 high=70 optimum=50>60GB of 100GB</meter>

  <strong>Battery level (optimum is full)</strong>
  <label for=battery1>85% Charged:</label>
  <meter id=battery1 min=0 max=100 value=85 low=20 high=70 optimum=100>85% charged</meter>

  <strong>Temperature (optimum is low)</strong>
  <label for=temp1>15°C:</label>
  <meter id=temp1 min=0 max=50 value=15 low=20 high=30 optimum=0>15°C</meter>
  ~~~

  <hr>

  <strong>Disk usage (optimum is a medium amount of usage)</strong>
  <label for=disk1>60GB Used:</label>
  <meter id=disk1 min=0 max=100 value=60 low=30 high=70 optimum=50>60GB of 100GB</meter>

  <strong>Battery level (optimum is full)</strong>
  <label for=battery1>85% Charged:</label>
  <meter id=battery1 min=0 max=100 value=85 low=20 high=70 optimum=100>85% charged</meter>

  <strong>Temperature (optimum is low)</strong>
  <label for=temp1>15°C:</label>
  <meter id=temp1 min=0 max=50 value=15 low=20 high=30 optimum=0>15°C</meter>

</figure>

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>: </v-h></sub-title>Value in sub-optimum range</figcaption>

  ~~~html
  <strong>Disk usage (getting full)</strong>
  <label for=disk2>80GB Used:</label>
  <meter id=disk2 min=0 max=100 value=80 low=30 high=70 optimum=50>80GB of 100GB</meter>

  <strong>Battery level (getting low)</strong>
  <label for=battery2>25% Charged:</label>
  <meter id=battery2 min=0 max=100 value=25 low=20 high=70 optimum=100>15% charged</meter>

  <strong>Temperature (overheating)</strong>
  <label for=temp2>40°C:</label>
  <meter id=temp2 min=0 max=50 value=40 low=10 high=30 optimum=0>40°C</meter>

  <strong>Exam score (failing)</strong>
  <label for=exam1>20% Score:</label>
  <meter id=exam1 min=0 max=100 value=20 low=40 high=80 optimum=100>20% score</meter>
  ~~~

  <hr>

  <strong>Disk usage (getting full)</strong>
  <label for=disk2>80GB Used:</label>
  <meter id=disk2 min=0 max=100 value=80 low=30 high=70 optimum=50>80GB of 100GB</meter>

  <strong>Battery level (getting low)</strong>
  <label for=battery2>25% Charged:</label>
  <meter id=battery2 min=0 max=100 value=25 low=20 high=70 optimum=100>15% charged</meter>

  <strong>Temperature (overheating)</strong>
  <label for=temp2>40°C:</label>
  <meter id=temp2 min=0 max=50 value=40 low=10 high=30 optimum=0>40°C</meter>

  <strong>Exam score (failing)</strong>
  <label for=exam1>20% Score:</label>
  <meter id=exam1 min=0 max=100 value=20 low=40 high=80 optimum=100>20% score</meter>

</figure>

[masquerades]: /docs/utils/#masquerades
[colorways]: /docs/colorways
