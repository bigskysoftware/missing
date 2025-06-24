---
title: Utilities
url: ./utils/
---

# Utilities

For the minor alterations to the default look that make all the difference,
missing.css has a collection of classes and custom elements.

[[toc]]

## Visually hidden content

<dfn>`.vh`</dfn>, <dfn>`<v-h>`</dfn>
:   Visually hide content without hiding it from assistive software.

This is often used in conjunction with the `<sub-title>` element.
Other uses include providing instructions for interactive elements or detailed descriptions of complex charts.


## Container

`<div class="container">`

The <dfn>`.container`</dfn> class imposes a maximum width on an element and 
centers it. The `<main>` element does the same, but carries semantic baggage
that might not be appropriate for all contexts.


## Density {#density}

The density utilities set the <dfn>`--density`</dfn> [CSS variable][], which
controls the amount of spacing between elements. The default value of
`--density` is `1`, which means the spacing between paragraphs is
equal to the height of 1 line.

We provide three utility classes that set `--density`:

| Class                     | Density                                    |
|---------------------------|--------------------------------------------|
| <dfn>`.packed`</dfn>      | `--density` = 0                            |
| <dfn>`.crowded`</dfn>     | `--density` = 0.5                          |
| <dfn>`.dense`</dfn>       | `--density` = 1 (same as default)          |
| <dfn>`.spacious`</dfn>    | `--density` = 2                            |
| <dfn>`.airy`</dfn>        | `--density` = 3                            |
| <dfn>`.autodensity`</dfn> | sets density based on viewport width       |

You can set `--density` yourself in inline styles or your own CSS:

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></sub-title>Setting <code>--density</code> with inline styles</figcaption>

  ~~~ html
  <section id="tagline" style="--density: 2">
    <h1>So easy, even a programmer can do it.</h1>
    <p>
        missing.css makes it easy to ship beautiful applications without
        locking yourself into classless libraries.
    </p>
  </section>
  ~~~
</figure>

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></sub-title>Setting <code>--density</code> in a stylesheet</figcaption>

  ~~~ css
  .link-embed {
      --density: .5; /* Embeds shouldn't take up too much space */
  }
  ~~~

</figure>


## Typography

<dfn>`.bold`</dfn>
:   Sets text in boldface.

<dfn>`.italic`</dfn>
:   Sets text in italics. Nested italic elements
    (`em`, `cite`, `dfn`, `var`, `i`, `address`) will be set in roman instead.

<dfn>`.allcaps`</dfn>
:   Sets text in all caps and adds appropriate letter spacing.

<dfn>`.main-font`</dfn>
:   Renders the text in the main font (`--main-font`).

<dfn>~~`.primary-font`~~</dfn>
:   **Deprecated:**{.bad .color} Will be removed in version 2.0. Use `.main-font` instead.

<dfn>`.secondary-font`</dfn>
:   Renders the text in the secondary font (`--secondary-font`).

<dfn>`.display-font`</dfn>
:   Renders the text in the display font (`--display-font`).

<dfn>`.mono-font`</dfn>
:   Renders the text in the monospace font (`--mono-font`).

<dfn>`.massivetext`</dfn>
:   Makes the font size really big. Scales based on line length.

<dfn>`.background-clip:text`</dfn>
:   Clips the background to the foreground text. <strong class="info color">Note:</strong> You must specify the background using either the `background-color` or `background-image` properties; using the short-hand `background` property will result in overwriting the `background-clip` property set by the class.

<dfn>`.text-stroke`</dfn>
:   Adds a stroke to the text, dictated by the `--stroke-width` and `--stroke-color` variables. By default, `--stroke-color` attempts to calculate a color with sufficient contrast to the `currentcolor` of the text, but you might need to set it explicitly. <strong class="warn color">Warning:</strong> Due to the current browser implementation of `-webkit-text-stroke`, the resulting effect is highly dependent on the particular font used.

<dfn>`.aestheticbreak`</dfn>
:   A line break added for aesthetic purposes. Usage: `<span class="aestheticbreak"></span>`{.language-html}

<dfn>`.list-of-links`</dfn>
:   Removes underlines from all links inside an element -- sometimes advisable for lists of links.

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></sub-title>Background clip</figcaption>

  ~~~ css
  .gradient {
    background-image: linear-gradient(
      90deg,
      rgba(42, 123, 155, 1) 0%,
      rgba(87, 199, 133, 1) 50%,
      rgba(237, 221, 83, 1) 100%
    ); /* Note: must use the `background-image` property, not just `background` */

    --stroke-width: 2px;
    --stroke-color: black;
  }
  ~~~
  ~~~ html
  <div class="packed" style="color: var(--bg); --display-font: Georgia">
    <h2 class="massivetext text-stroke background-clip:text gradient display-font">
      Serif stroke
    </h2>
    <h2 class="massivetext text-stroke background-clip:text gradient mono-font">
      Mono stroke
    </h2>
  </div>
  ~~~

  <hr>

  <style>
    .gradient {
      background-image: linear-gradient(
        90deg,
        rgba(42, 123, 155, 1) 0%,
        rgba(87, 199, 133, 1) 50%,
        rgba(237, 221, 83, 1) 100%
      );
      --stroke-width: 2px;
      --stroke-color: black;
    }
  </style>
  <div class="packed" style="color: var(--bg); --display-font: Georgia">
    <h2 class="massivetext text-stroke background-clip:text gradient display-font">
      Serif stroke
    </h2>
    <h2 class="massivetext text-stroke background-clip:text gradient mono-font">
      Mono stroke
    </h2>
  </div>


</figure>


## Masquerades

The following classes can be used to make one element look like another:

 - <dfn>`.<h1>`</dfn>
 - <dfn>`.<h2>`</dfn>
 - <dfn>`.<h3>`</dfn>
 - <dfn>`.<h4>`</dfn>
 - <dfn>`.<h5>`</dfn>
 - <dfn>`.<h6>`</dfn>
 - <dfn>`.<button>`</dfn>
 - <dfn>`.<a>`</dfn>
 - <dfn>`.<small>`</dfn>
 - <dfn>`.<big>`</dfn>
 {role="list" .tool-bar}

To get a smaller font size, use the `.<small>` masquerade.

The <dfn>`.<big>`</dfn> class makes things bigger, with special treatment for some elements.
<strong class="bad color">Deprecated:</strong> We have converted our `.big` class to a masquerade in honor of W3C deprecating the `<big>` HTML tag.
The <dfn>`.big`</dfn> class will be removed in version 2.0.

<figure>
<figcaption><sub-title class="allcaps">Example<v-h>:</v-h></subtitle>Masquerade markups</figcaption>

  ~~~ html
  <p>This is a paragraph.</p>
  <p class="<big>">This is a big paragraph.</p>
 
  <div class="f-row align-items:center">
    <button class="<big>">Big Button</button>
    <a class="<button>" href="#">&lt;a&gt; Button</a>
  </div>
  
  <aside class="<big>">
    An `<aside>` with the `.<big>` class becomes a pull quote.
  </aside>
  ~~~

  <hr>

  <p>This is a paragraph</p>
  <p class="<big>">This is a big paragraph</p>
 
  <div class="f-row align-items:center">
    <button class="<big>">Big Button</button>
    <a class="<button>" href="#">&lt;a&gt; Button</a>
  </div>
  
  <aside class="<big>">

    An `<aside>` with the `.<big>` class becomes a pull quote.

  </aside>

</figure>


## Theme selection

Missing.css, by default applies a light or dark theme based on `prefers-color-scheme`.
To customize the theme independently of the `prefers-color-scheme` you can use
the following classes:

<dfn>`.-dark-theme`</dfn>
:   Add to your root element (e.g. `<html class="-dark-theme">`) to use the dark theme.

<dfn>`.-no-dark-theme`</dfn>
:   Add to your root element (e.g. `<html class="-no-dark-theme">`) to use the light theme.

## Reset

~~Use the <dfn>`.all:initial`</dfn> class to reset all CSS properties on an
element and return it to its browser-default styles.~~

**Deprecated:**{.bad .color} Will be removed in version 2.0.



[CSS variable]: /docs/variables
