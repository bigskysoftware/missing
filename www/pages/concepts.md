---
url: /concepts/
---

# Concepts

Below are some basic concepts/ideas for the CSS library, split into individual components and discussed individually

## Classless CSS

### Concept

missing renders well out of the box with Vanilla HTML, like a classless CSS library such as [pico.css]

### Examples

[pico.css] provides a good base for what we are looking for:

https://picocss.com/examples/preview/

[pico.css]: https://picocss.com

## Semantic HTML Power Structures

### Concept

missing takes advantage of semantic, lesser used tags such as `nav`, `main` and `section` to allow for more elaborate layouts in pure HTML

Moving beyond the pico level of styling typically requires adding classes to the DOM.  To avoid this, we want to
instead offer "Power Structures" which are opinionated uses of semantic HTML that will be rendered in what, in
other CSS libraries, would typically require components.

### Examples

The `main` tag would auto-center and pad at a reasonable (configurable) max-width, similar to a Bootstrap
`container`, though not necessarily relying on fixed breakpoints:

```html
<main>
  ... content that will be centered and max-widthed
</main>
```

Using a `nav` element with inline sub-elements will create a horizontal nav bar

```html
<nav>
  <span>Foo Company LLC</span> | <a href="/foo">Foo</a> | <a href="/foo">Foo</a> | <a href="/foo">Foo</a>
</nav>
```

Using a `nav` element with block sub-elements will create a vertical nav bar

```html
<nav>
  <ul>
    <li>Foo Company LLC</li>
    <li><a href="/foo">Foo</a></li>
    <li><a href="/foo">Foo</a></li>
    <li><a href="/foo">Foo</a></li>
  </ul>
</nav>
```

Using a `form` element with inline sub-elements will create a horizontal form (taken from pure.css)

```html
<form>
    <fieldset>
        <legend>A compact inline form</legend>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <label for="default-remember">
            <input type="checkbox" id="default-remember" /> Remember me
        </label>
        <button type="submit">Sign in</button>
    </fieldset>
</form>

```

Using a `form` element with block sub-elements will create a horizontal, label aligned form (taken from pure.css)

(Maybe label should be nested in all cases?)

```html
<form>
    <fieldset>
        <p>
            <label for="aligned-name">Username</label>
            <input type="text" id="aligned-name" placeholder="Username" />
            <span>This is a required field.</span>
        <p>
            <label for="aligned-password">Password</label>
            <input type="password" id="aligned-password" placeholder="Password" />
        <p>
            <label for="aligned-email">Email Address</label>
            <input type="email" id="aligned-email" placeholder="Email Address" />
        <p>
            <label for="aligned-foo">Supercalifragilistic Label</label>
            <input type="text" id="aligned-foo" placeholder="Enter something here..." />
        <p>
            <label for="aligned-cb" class="pure-checkbox">
                <input type="checkbox" id="aligned-cb" /> I&#x27;ve read the terms and conditions
            </label>
            <button type="submit">Submit</button>
    </fieldset>
</form>
```

##  Components

### Concept

missing offers "High Power" classes that capture high level components on, as much as is possible, a *single* CSS element.
These classes may change the appearance of descendant elements. They should either be designed for use with a small amount
of content, or restrict their reach into their children with `>`, etc. They can be expanded when `@scope` becomes standard
and widespread.

Here is a card:

```html
<div role="card">
  <img alt="" />
  <div>
    <!-- our content in here will auto-flow now -->
  </div>
</div>
```

would render as a card element, as [defined here](https://piccalil.li/blog/cube-css/):

### ARIA-based

In cases where it's applicable, implementations of the patterns described in [WAI-ARIA Authoring Guidelines]
would be styled appropriately. Take tabs for example:

```html
<div role="tablist">
  <a role="tab" href="/foo">Tab 1</a>
  <a role="tab" href="/foo">Tab 2</a>
  <a role="tab" href="/foo">Tab 3</a>
</div>
```

[WAI-ARIA Authoring Guidelines]: https://www.w3.org/TR/wai-aria-practices-1.2/

### Built-in components

We would like to see the following components:

* cards
* tabs
* rows
  * no need to specify cols? auto break based on # of children and width of viewport
* container (?)
* modal (?)
* fix-to-top (?)
* fix-to-left (?)

## Utility Classes

### Concept

missing offers a set of [utility classes](https://cube.fyi/utility.html) that captures the 80/20 of libraries like tailwinds

TODO: good examples of utility class usage
