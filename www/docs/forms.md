
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

Because of this, it's near impossible to write a stylesheet that will work with
any HTML form.

Missing.css will work well on forms that follow these markup conventions:

[[toc]]


## Inputs and labels

Inputs inside labels will be `display: inline`. Inputs outside labels will be
`display: block`.

<aside>Inputs without labels will cause nasal demons.</aside>


## Tabular forms {#tabular-form}

You can use the `.table` and `.rows` classes to create a form with inputs lined up.

  ~~~ html
  <form class="table rows">
    <p><label for=inp>Label</label> <input></p>
    ...
  ~~~

<figure>
  <figcaption>A tabular form</figcaption>
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
hard to style. You can use the following pattern instead:

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

The above will work with [tabular forms](#tabular-form):

<figure>
  <figcaption>A radiogroup in a tabular form</figcaption>
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