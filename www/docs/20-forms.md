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

Input placeholders are styled with `text-align:end`{.language-css} to better distinguish them from actual input.

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>: </v-h></sub-title>Placeholder markup</figcaption>

  ~~~ html
  <form class="flex-switch">
    <div>
      <label for=category>Category:</label>
      <select id=category placeholder="Select a category...">
        <option>Blues
        <!-- ... -->
      </select>
    </div>
    <div>
      <label for=search>Search:</label>
      <input id=search type=search placeholder="Search...">
    </div>
    <div>
      <label for=text>Text:</label>
      <input id=text type=text placeholder="Type...">
    </div>
  </form>
  ~~~

  <hr>

  <form class="flex-switch">
    <div>
      <label for=category>Category:</label>
      <select id=category placeholder="Select a category...">
        <option>Blues
        <option>Dixieland
        <option>Swing
        <option>Bebop
        <option>Cool
        <option>Modal
      </select>
    </div>
    <div>
      <label for=search>Search:</label>
      <input id=search type=search placeholder="Search...">
    </div>
    <div>
      <label for=text>Text:</label>
      <input id=text type=text placeholder="Type...">
    </div>
  </form>

</figure>


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
      <tr><th><th><th><code>.info</code><th><code>.ok</code><th><code>.warn</code><th><code>.bad</code>
    <tbody>
      <tr><th scope=row><code>&lt;button></code>
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
      <tr><th scope=row><code>&lt;strong>&lt;button></code>
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
      <tr><th scope=row><code>&lt;a class="&lt;button>"></code>
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
      <tr><th><th><th><code>.info</code><th><code>.ok</code><th><code>.warn</code><th><code>.bad</code>
    <tbody>
      <tr><th scope=row><code>&lt;button></code>
          <td><button>Plain</button>
          <td><button class="info">Info</button>
          <td><button class="ok">Open</button>
          <td><button class="warn" type=reset>Reset</button>
          <td><button class="bad" formaction=dialog>Close</button>
      <tr><th scope=row class="padding-inline-start"><code>:disabled</code>
          <td><button disabled>Plain</button>
          <td><button disabled class="info">Info</button>
          <td><button disabled class="ok">Open</button>
          <td><button disabled class="warn" type=reset>Reset</button>
          <td><button disabled class="bad" formaction=dialog>Close</button>
      <tr><th scope=row class="padding-inline-start"><code>[aria-pressed=true]</code>
          <td><button aria-pressed=true onclick="toggle(this)">Plain</button>
          <td><button aria-pressed=true class="info" onclick="toggle(this)">Info</button>
          <td><button aria-pressed=true class="ok" onclick="toggle(this)">Open</button>
          <td><button aria-pressed=true class="warn" onclick="toggle(this)">Reset</button>
          <td><button aria-pressed=true class="bad" onclick="toggle(this)">Close</button>
      <tr><th scope=row><code>&lt;strong>&lt;button></code>
          <td><strong><button>Plain</button></strong>
          <td><strong><button class="info">Info</button></strong>
          <td><strong><button class="ok">Open</button></strong>
          <td><strong><button class="warn" type=reset>Reset</button></strong>
          <td><strong><button class="bad" formaction=dialog>Close</button></strong>
      <tr><th scope=row class="padding-inline-start"><code>:disabled</code>
          <td><strong><button disabled>Plain</button></strong>
          <td><strong><button disabled class="info">Info</button></strong>
          <td><strong><button disabled class="ok">Open</button></strong>
          <td><strong><button disabled class="warn" type=reset>Reset</button></strong>
          <td><strong><button disabled class="bad" formaction=dialog>Close</button></strong>
      <tr><th scope=row class="padding-inline-start"><code>[aria-pressed=true]</code>
          <td><strong><button aria-pressed=true onclick="toggle(this)">Plain</button></strong>
          <td><strong><button aria-pressed=true class="info" onclick="toggle(this)">Info</button></strong>
          <td><strong><button aria-pressed=true class="ok" onclick="toggle(this)">Open</button></strong>
          <td><strong><button aria-pressed=true class="warn" onclick="toggle(this)">Reset</button></strong>
          <td><strong><button aria-pressed=true class="bad" onclick="toggle(this)">Close</button></strong>
      <tr><th scope=row><code>&lt;a class="&lt;button>"></code>
          <td><a href=#button-table class="<button>">Plain</a></button>
          <td><a href=#button-table class="info <button>">Info</a></button>
          <td><a href=#button-table class="ok <button>">Open</a></button>
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
      <input type=file class="info">
      <input type=file class="ok">
      <input type=file class="warn">
      <input type=file class="bad">
    </div>
    <div class="flex-column">
      <strong><input type=file></strong>
      <strong><input type=file class="info"></strong>
      <strong><input type=file class="ok"></strong>
      <strong><input type=file class="warn"></strong>
      <strong><input type=file class="bad"></strong>
    </div>
  </section>

</figure>


## Tabular forms

You can use the `.table` and `.rows` classes to create a form with inputs lined up like cells of a table.
Tabular forms default to wide inputs, but can be overridden with the `.narrow-inputs` utility class.

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
    <p><label for=tf-text-2>Text</label> <input id=tf-text-2></p>
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
Notice that the wrapper has `role=radiogroup`{.token .attr-name} and its `aria-labelledby`{.token .attr-name} value refers to the `id`{.token .attr-name} of the label for the whole radiogroup.

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>: </v-h></sub-title>Radio group markup for tabular forms</figcaption>

  ~~~ html
  <form class="table rows narrow-inputs">
    <div>
      <label for=item>Item</label>
      <select id=item>
        <option>Wallet
        ...
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
  ~~~

  <hr>

  <form class="table rows narrow-inputs">
    <div>
      <label for=item>Item</label>
      <select id=item>
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


## Selects

Missing.css will attempt to style `<select>`{.language-html} elements consistently across browsers.
Support for the new [customizable select][] API is implemented, as are [colorways][].

**Warning**:&emsp;While [browser support][] is improving, please be aware that many browsers still force their native dropdown select picker styles.
In the spirit of progressive enhancement, missing.css implements a few hacks to add partial colorway support to unsupported browsers.
Once a browser supports `appearance: base-select`{.language-css}, appearance will be standardized.
Please be sure to review your implementation across multiple browsers.{.warn .box}

**Tip**:&emsp;Closing tags for `<optgroup>`{.language-html} and `<option>`{.language-html} can typically be omitted.
You can also use `<optgroup disabled>`{.language-html} to disable an entire group of `<options>`{.language-html}.{.info .box}

Depending on the attributes specified, `<select>`{.language-html} elements can be divided into the following categories:

- single-select dropdowns,
- single-select listboxes,
- multi-select listboxes, and
- multi-select dropdowns.

Checkmarks can be enabled by using the `.checks` or `.checkboxes` variant classes on the `<select>`{.language-html} (provided the viewer's browser supports them).
Checkmarks will be placed on the inline-start side unless the `.flip`{.language-css} utility class is also added to the `<select>`{.language-html}.
By default, `<options>`{.language-html} inside of a single-select will be rendered without their `::checkmark`{.language-css} pseudo-element and multi-selects will be equivalent to `<select multiple class="checks">`.

Each of the examples below highlights a different combination of these classes and attributes.

### Single-select dropdowns

Select elements without the `multiple`{.token .attr-name} or `size`{.token .attr-name} attributes will render as single-select dropdowns.

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>: </v-h></sub-title>Single-select dropdown markup</figcaption>

  ~~~ html
  <form class="flex-row flex-wrap:wrap">
    <!-- ... -->
    <div>
    <label for=single:dropdown:warn:bg>Warn:</label>
    <select id=single:dropdown:warn:bg class="warn bg flip checkboxes">
      <optgroup label="Enabled">
        <option>One
        <option>Three
        <!-- ... -->
      <optgroup label="Disabled" disabled>
        <option>Two
        <option>Four
        <!-- ... -->
    </select>
    </div>
    <!-- ... -->
  </form>
  ~~~

  <hr>

  <form class="flex-row flex-wrap:wrap">
    <div>
    <label for=single:dropdown:none>None:</label>
    <select id=single:dropdown:none>
      <optgroup label="Enabled">
        <option>One
        <option>Three
        <option>Five
        <option>Seven
        <option>Nine
      <optgroup label="Disabled" disabled>
        <option>Two
        <option>Four
        <option>Six
        <option>Eight
        <option>Ten
    </select>
    </div>
    <div>
    <label for=single:dropdown:info>Info:</label>
    <select id=single:dropdown:info class="info checks">
      <optgroup label="Enabled">
        <option>One
        <option>Three
        <option>Five
        <option>Seven
        <option>Nine
      <optgroup label="Disabled" disabled>
        <option>Two
        <option>Four
        <option>Six
        <option>Eight
        <option>Ten
    </select>
    </div>
    <div>
    <label for=single:dropdown:ok>OK:</label>
    <select id=single:dropdown:ok class="ok flip checks">
      <optgroup label="Enabled">
        <option>One
        <option>Three
        <option>Five
        <option>Seven
        <option>Nine
      <optgroup label="Disabled" disabled>
        <option>Two
        <option>Four
        <option>Six
        <option>Eight
        <option>Ten
    </select>
    </div>
    <div>
    <label for=single:dropdown:warn>Warn:</label>
    <select id=single:dropdown:warn class="warn flip checkboxes">
      <option>One
      <option>Three
      <option>Five
      <option>Seven
      <option disabled>Disabled 1
      <option>Two
      <option>Four
      <option disabled>Disabled 2
      <option>Eight
      <option>Ten
    </select>
    </div>
    <div>
    <label for=single:dropdown:bad>Bad:</label>
    <select id=single:dropdown:bad class="bad checkboxes">
      <optgroup label="Enabled">
        <option>One
        <option>Three
        <option>Five
        <option>Seven
        <option>Nine
      <optgroup label="Disabled" disabled>
        <option>Two
        <option>Four
        <option>Six
        <option>Eight
        <option>Ten
      <optgroup label="Scrollbar">
        <option>Attempt
        <option>to
        <option>overflow
        <option>the
        <option>popover
        <option>so
        <option>that
        <option>a
        <option>wild
        <option>scrollbar
        <option>appears
    </select>
    </div>
    <div>
    <label for=single:dropdown:plain:bg>Plain (Color):</label>
    <select id=single:dropdown:plain:bg class="plain bg color">
      <optgroup label="Enabled">
        <option>One
        <option>Three
        <option>Five
        <option>Seven
        <option>Nine
      <optgroup label="Disabled" disabled>
        <option>Two
        <option>Four
        <option>Six
        <option>Eight
        <option>Ten
    </select>
    </div>
    <div>
    <label for=single:dropdown:info:bg>Info (Color):</label>
    <select id=single:dropdown:info:bg class="info bg color checks">
      <optgroup label="Enabled">
        <option>One
        <option>Three
        <option>Five
        <option>Seven
        <option>Nine
      <optgroup label="Disabled" disabled>
        <option>Two
        <option>Four
        <option>Six
        <option>Eight
        <option>Ten
    </select>
    </div>
    <div>
    <label for=single:dropdown:ok:bg>OK (Color):</label>
    <select id=single:dropdown:ok:bg class="ok bg color flip checks">
      <optgroup label="Enabled">
        <option>One
        <option>Three
        <option>Five
        <option>Seven
        <option>Nine
      <optgroup label="Disabled" disabled>
        <option>Two
        <option>Four
        <option>Six
        <option>Eight
        <option>Ten
    </select>
    </div>
    <div>
    <label for=single:dropdown:warn:bg>Warn (Color):</label>
    <select id=single:dropdown:warn:bg class="warn bg color flip checkboxes">
      <option>One
      <option>Three
      <option>Five
      <option>Seven
      <option disabled>Disabled 1
      <option>Two
      <option>Four
      <option disabled>Disabled 2
      <option>Eight
      <option>Ten
    </select>
    </div>
    <div>
    <label for=single:dropdown:bad:bg>Bad (Color):</label>
    <select id=single:dropdown:bad:bg class="bad bg color checkboxes">
      <optgroup label="Enabled">
        <option>One
        <option>Three
        <option>Five
        <option>Seven
        <option>Nine
      <optgroup label="Disabled" disabled>
        <option>Two
        <option>Four
        <option>Six
        <option>Eight
        <option>Ten
      <optgroup label="Scrollbar">
        <option>Attempt
        <option>to
        <option>overflow
        <option>the
        <option>popover
        <option>so
        <option>that
        <option>a
        <option>wild
        <option>scrollbar
        <option>appears
    </select>
    </div>
  </form>

</figure>

### Select listboxes

Selects with either `size`{ .token .attr-name } or `multiple`{.token .attr-name} attributes will be styled as listboxes.
In the following subsection, we discuss the special case of `<select multiple size=1>`{.language-html}.

**Info**:&emsp;Keep in mind that `<option selected>`{.language-html} specifies which option(s) should be selected by default.
When updating selection with JavaScript, use the `el.checked`{.language-js } property to ensure the `:checked`{.token .attr-name} pseudo-class triggers correctly.
Avoid toggling the `selected`{.token .attr-name} or `aria-selected=true`{.token .attr-name} HTML attributes in the DOM for dynamic updates.{.info .box}

**Warning**:&emsp;Browsers that support `appearance: base-select` utilize a different set of keyboard controls.
The updated controls are designed to be more accessible and result in a single tab stop that moves focus into the `<select>`{.language-html} element.
This allows keyboard users to navigate between the options with arrow keys and activate them using <kbd><kbd>Space</kbd></kbd> or <kbd><kbd>Enter</kbd></kbd>.
The older style of navigation relied on <kbd><kbd>Ctrl + Arrow</kbd></kb> to navigate between `<options>`{.language-html} while the `<select>`{.language-html} maintains focus.{.warn .box}

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>: </v-h></sub-title>Single- and multi-select listbox markup</figcaption>

  ~~~ html
  <div class="flex-switch wide-inputs">
    <!-- ... -->
    <div>
      <label for=multi:listbox:bad>Mathematicians:</label>
      <select id=multi:listbox:bad multiple size=8 class="bad flip checkboxes"
        <optgroup label="Analysts">
          <option>Stefan Banach
          <option selected>Augustin Cauchy
          <!-- ... -->
      </select>
      <p class="<small> crowded">Choose multiple</p>
    </div>
    <!-- ... -->
  </div>
  ~~~

  <hr>

  <div class="flex-switch wide-inputs">
    <div>
      <label for=single:listbox:none>Mathematicians:</label>
      <select id=single:listbox:none size=8>
        <optgroup label="Analysts">
          <option>Stefan Banach
          <option selected>Augustin Cauchy
          <option>Leonhard Euler
          <option>Joseph Fourier
          <option>David Hilbert
          <option>Karl Weierstrass
        <optgroup label="Algebrists" disabled>
          <option>Niels Abel
          <option>Arthur Cayley
          <option>Évariste Galois
          <option>Sophus Lie
          <option>Emmy Noether
        <optgroup label="Topologists">
          <option>Felix Hausdorff
          <option>Felix Klein
          <option>August Möbius
          <option>Henri Poincaré
          <option>Bernhard Riemann
          <option>Andrei Tychonoff
      </select>
      <p class="<small> crowded">Choose one</p>
    </div>
    <div>
      <label for=single:listbox:ok>Mathematicians:</label>
      <select id=single:listbox:ok size=8 class="ok checks">
        <optgroup label="Analysts">
          <option>Stefan Banach
          <option selected>Augustin Cauchy
          <option>Leonhard Euler
          <option>Joseph Fourier
          <option>David Hilbert
          <option>Karl Weierstrass
        <optgroup label="Algebrists" disabled>
          <option>Niels Abel
          <option>Arthur Cayley
          <option>Évariste Galois
          <option>Sophus Lie
          <option>Emmy Noether
        <optgroup label="Topologists">
          <option>Felix Hausdorff
          <option>Felix Klein
          <option>August Möbius
          <option>Henri Poincaré
          <option>Bernhard Riemann
          <option>Andrei Tychonoff
      </select>
      <p class="<small> crowded">Choose one</p>
    </div>
    <div>
      <label for=single:listbox:info>Mathematicians:</label>
      <select id=single:listbox:info size=8 class="info color bg flip checks">
        <optgroup label="Analysts">
          <option>Stefan Banach
          <option selected>Augustin Cauchy
          <option>Leonhard Euler
          <option>Joseph Fourier
          <option>David Hilbert
          <option>Karl Weierstrass
        <optgroup label="Algebrists" disabled>
          <option>Niels Abel
          <option>Arthur Cayley
          <option>Évariste Galois
          <option>Sophus Lie
          <option>Emmy Noether
        <optgroup label="Topologists">
          <option>Felix Hausdorff
          <option>Felix Klein
          <option>August Möbius
          <option>Henri Poincaré
          <option>Bernhard Riemann
          <option>Andrei Tychonoff
      </select>
      <p class="<small> crowded">Choose one</p>
    </div>
  </div>
  <div class="flex-switch wide-inputs">
    <div>
      <label for=single:listbox:plain:bg>Mathematicians:</label>
      <select id=single:listbox:plain:bg multiple size=8 class="plain bg color">
        <option>Stefan Banach
        <option selected>Augustin Cauchy
        <option>Leonhard Euler
        <option>Joseph Fourier
        <option>David Hilbert
        <option>Karl Weierstrass
        <option>Niels Abel
        <option>Arthur Cayley
        <option>Évariste Galois
        <option>Sophus Lie
        <option>Emmy Noether
        <option>Felix Hausdorff
        <option>Felix Klein
        <option>August Möbius
        <option>Henri Poincaré
        <option>Bernhard Riemann
        <option>Andrei Tychonoff
      </select>
      <p class="<small> crowded">Choose multiple</p>
    </div>
    <div>
      <label for=multi:listbox:warn:bg>Mathematicians:</label>
      <select id=multi:listbox:warn:bg multiple size=8 class="warn color bg checkboxes">
        <optgroup label="Analysts">
          <option>Stefan Banach
          <option selected>Augustin Cauchy
          <option>Leonhard Euler
          <option>Joseph Fourier
          <option>David Hilbert
          <option>Karl Weierstrass
        <optgroup label="Algebrists" disabled>
          <option>Niels Abel
          <option>Arthur Cayley
          <option>Évariste Galois
          <option>Sophus Lie
          <option>Emmy Noether
        <optgroup label="Topologists">
          <option>Felix Hausdorff
          <option>Felix Klein
          <option>August Möbius
          <option>Henri Poincaré
          <option>Bernhard Riemann
          <option>Andrei Tychonoff
      </select>
      <p class="<small> crowded">Choose multiple</p>
    </div>
    <div>
      <label for=multi:listbox:bad>Mathematicians:</label>
      <select id=multi:listbox:bad multiple size=8 class="bad flip checkboxes">
        <optgroup label="Analysts">
          <option>Stefan Banach
          <option selected>Augustin Cauchy
          <option>Leonhard Euler
          <option>Joseph Fourier
          <option>David Hilbert
          <option>Karl Weierstrass
        <optgroup label="Algebrists" disabled>
          <option>Niels Abel
          <option>Arthur Cayley
          <option>Évariste Galois
          <option>Sophus Lie
          <option>Emmy Noether
        <optgroup label="Topologists">
          <option>Felix Hausdorff
          <option>Felix Klein
          <option>August Möbius
          <option>Henri Poincaré
          <option>Bernhard Riemann
          <option>Andrei Tychonoff
      </select>
      <p class="<small> crowded">Choose multiple</p>
    </div>
  </div>
</figure>

### Multi-select dropdowns

Some browsers render `<select multiple size=1>`{.language-html} as a multi-select dropdown.
Support for this implementation will improve as customizable select continues to roll out.
Until then, consider erring on the side of caution since browsers could render an otherwise unusable widget.

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>: </v-h></sub-title>Multi-select dropdown markup</figcaption>

  ~~~ html
  <div class="flex-switch wide-inputs">
    <!-- ... -->
    <div>
      <label for=multi:dropdown:ok>Categorized:</label>
      <select id=multi:dropdown:ok size=1 multiple class="ok">
        <optgroup label="Analysts">
          <option>Stefan Banach
          <option selected>Augustin Cauchy
          <!-- ... -->
      </select>
      <p class="<small> crowded">Choose multiple</p>
    </div>
    <!-- ... -->
  </div>
  ~~~

  <hr>

  <div class="flex-switch wide-inputs">
    <div>
      <label for=multi:dropdown:ok>Categorized:</label>
      <select id=multi:dropdown:ok size=1 multiple class="ok">
        <optgroup label="Analysts">
          <option>Stefan Banach
          <option selected>Augustin Cauchy
          <option>Leonhard Euler
          <option>Joseph Fourier
          <option>David Hilbert
          <option selected>Karl Weierstrass
        <optgroup label="Algebrists" disabled>
          <option>Niels Abel
          <option>Arthur Cayley
          <option selected>Évariste Galois
          <option>Sophus Lie
          <option>Emmy Noether
        <optgroup label="Topologists">
          <option>Felix Hausdorff
          <option>Felix Klein
          <option>August Möbius
          <option>Henri Poincaré
          <option>Bernhard Riemann
          <option>Andrei Tychonoff
      </select>
      <p class="<small> crowded">Choose multiple</p>
    </div>
    <div>
      <label for=multi:dropdown:warn:bg>Uncategorized:</label>
      <select id=multi:dropdown:warn:bg size=1 multiple class="warn bg checkboxes">
        <option>Stefan Banach
        <option selected>Augustin Cauchy
        <option>Leonhard Euler
        <option>Joseph Fourier
        <option>David Hilbert
        <option selected>Karl Weierstrass
        <option disabled>Niels Abel
        <option disabled>Arthur Cayley
        <option selected>Évariste Galois
        <option>Sophus Lie
        <option>Emmy Noether
        <option disabled>Felix Hausdorff
        <option disabled>Felix Klein
        <option>August Möbius
        <option>Henri Poincaré
        <option>Bernhard Riemann
        <option>Andrei Tychonoff
      </select>
      <p class="<small> crowded">Choose multiple</p>
    </div>
    <div>
      <label for=multi:dropdown:bad>Categorized:</label>
      <select id=multi:dropdown:bad size=1 multiple class="bad flip">
        <optgroup label="Analysts">
          <option>Stefan Banach
          <option selected>Augustin Cauchy
          <option>Leonhard Euler
          <option>Joseph Fourier
          <option>David Hilbert
          <option selected>Karl Weierstrass
        <optgroup label="Algebrists">
          <option>Niels Abel
          <option>Arthur Cayley
          <option selected>Évariste Galois
          <option>Sophus Lie
          <option>Emmy Noether
        <optgroup label="Topologists" disabled>
          <option>Felix Hausdorff
          <option>Felix Klein
          <option>August Möbius
          <option>Henri Poincaré
          <option>Bernhard Riemann
          <option>Andrei Tychonoff
      </select>
      <p class="<small> crowded">Choose multiple</p>
    </div>
  </div>
</figure>


### New parsing rules

Finally, missing.css will not interfere with the new `<selectedcontent>`{.language-html} element, if authors wish to use it.
The customizable select API also allows the `<legend>`{.language-html} element to be used to provide a label inside of an `<optgroup>`{.language-html} instead of the `label`{.token .attr-name} attribute.
We suggest retaining the `label`{.token .attr-name} attribute for backwards compatibility with older parsers.

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>: </v-h></sub-title>Expanded select markup</figcaption>

  ~~~ html
  <select>
    <button>
    Selected:&nbsp;<selectedcontent></selectedcontent>
    </button>
    <optgroup label="Saxophonists">
      <legend>Saxophonists</legend>
      <option>Coleman Hawkins
      <option>Charlie Parker
      <option>John Coltrane
      <option>Sonny Rollins
      <option>Hank Mobley
    <optgroup label="Trumpeters">
      <legend>Trumpeters</legend>
      <option>Buddy Bolden
      <option>Louis Armstrong
      <option>Dizzy Gillespie
      <option>Miles Davis
  </select>
  ~~~
</figure>

[browser support]: https://caniuse.com/mdn-css_properties_appearance_base-select
[customizable select]: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select


## Progress bars

Create a progress bar using the `<progress>`{.language-html} element.
This element should be used to represent how much of a specific, ongoing process has been completed.
Be sure to add a `<label>`{.language-html} for accessibility (in conjunction with `.vh`{.language-css} or `<v-h>`{.language-html} if you like).

The element can be put in an indeterminate state by not including the `value`{.token .attr-name} attribute.
Indeterminate `<progress>`{.language-html} elements will show a pending animation if the user does not have `@prefers-reduced-motion`{.language-css} set.
When utilizing a vertical writing-mode, the indeterminate animation can be fixed by adding the `.vertical`{.language-css} class.

The element can be styled by setting `--border-width`, `--border-style`, and `--border-radius` variables directly on the `<progress>`{.language-html} element.
When not explicitly set, the element inherits from `--interactive-border-width`, `--interactive-border-style`, and `--tab-border-radius`.

For full-width progress bars, use the `.inline-size:100%` utility class.
[Colorways][] are supported.


<figure>
<figcaption><sub-title class="allcaps">Example<v-h>: </v-h></sub-title>Progress bar markup</figcaption>

  ~~~ html
  <div class="flex-column">
     
    <label for=p1 class="vh">Upload progress...</label>
    <progress id=p1 value=0.5 class="inline-size:100%"></progress>

    <label for=p2>LCARS Scan...</label>
    <progress id=p2 class="ok inline-size:100%" value=0.25 style="block-size: 1.5em; --border-width: 6px; --border-style: double; --border-radius: 0 .5em"></progress>

    <label for=p3>Virus progress...</label>
    <progress id=p3 class="warn inline-size:100%" value=0.75 style="--border-width: 3px; --border-style: inset; --border-radius: 0 .5rem .5rem .5rem"></progress>

    <label for=p4>Indeterminate Cylon</label>
    <progress id=p4 class="bad" style="inline-size: 3em;">Indeterminate Cylon</progress>

  </div>
  ~~~

  <hr>

  <div class="flex-column">

    <label for=p1 class="vh">Upload progress...</label>
    <progress id=p1 value=0.5 class="inline-size:100%"></progress>

    <label for=p2>LCARS Scan...</label>
    <progress id=p2 class="ok inline-size:100%" value=0.25 style="block-size: 1.5em; --border-width: 6px; --border-style: double; --border-radius: 0 .5em"></progress>

    <label for=p3>Virus progress...</label>
    <progress id=p3 class="warn inline-size:100%" value=0.75 style="--border-width: 3px; --border-style: inset; --border-radius: 0 .5rem .5rem .5rem"></progress>

    <label for=p4>Indeterminate Cylon</label>
    <progress id=p4 class="bad" style="inline-size: 3em;">Indeterminate Cylon</progress>

  </div>

</figure>

## Meters

Use the `<meter>`{.language-html} element to create a meter gauge.
This element is used to indicate a measurement within a known range and is semantically different from the `<progress>`{.language-html} element.

Similar to the `<progress>`{.language-html} element, you can style a `<meter>`{.language-html} by setting `--border-width`, `--border-style`, and `--border-radius` directly on the element.
The `<meter>`{.language-html} element derives its colors from the `.ok`, `.warn`, and `.bad` [colorways][].

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
