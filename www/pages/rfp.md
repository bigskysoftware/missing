---
url: /rfp/
---

# missing CSS Library RFP


untitled.css is a CSS library that

* starts with good default styling, akin to classless CSS libraries
* offers components based on purely semantic HTML, utilizing ARIA where appropriate (e.g. tabs)
* finally, offers a small & curated set of class-based utilities for tweaking

untitled.css aims to minimize intervention in the HTML by allowing developers to start with a good out of the box experience,
 then build common components using plain, semantic HTML and only when they need to go beyond that, apply a minimized \
 number of classes to achieve what they want.


missing CSS Library is a CSS library that, so far as I can tell, does not exist.

It offers the following features:

* Classless CSS - It renders well out of the box with Vanilla HTML, like a classless CSS library such as pico
* Semantic Power Structure  - It takes advantage of semantic, lesser used tags such as `nav`, `main` and `section` to allow for more elaborate layouts
  in pure HTML
* Aria-Driven Components - It offers "High Power" arias that capture high level components on, as much as is possible, a *single* CSS element
* Utility Classes - It offers a set of [utility classes](https://cube.fyi/utility.html) that captures the 80/20 of libraries like tailwinds

It does not attempt to

* Be super small
* Offer much beyond what is mentioned above (layer something like tailwinds on top)

# Details

## Rendering Well OOTB

There are many CSS libraries that provide an excellent rendering experience with plain HTML.  pico.css is a cannonical example.
missing CSS Library will, similarly, offer this functionality.

## Opinionated Styling of Less Commonly Used Element

In keeping with the concept of rendering (and encouraging) semantic, vanilla CSS, missing CSS will render less commonly used
tags in a more opinionated manner.

For example, the `main` tag will act like `container` does in many CSS frameworks: it will auto-center and set a max-width
within it.

`section` tags will pad `p` tags within them to properly indent content

`nav` tags with a `ul` inside of it will render as a horizontal nav element.

All this without additional classes needed: missing CSS takes interpretive advantage of semantic HTML.

## A Few High Power Component Classes

In addition to the pure-HTML styling mentioned above, missing CSS will provide a small number of "high power" component
classes.

The term "High Power" means that the components will not require multiple uses of classes, but rather a single class
on a parent element.  An example clarifies.

Consider the [aligned form](https://purecss.io/forms/#aligned-form) example from the excellent pure.css library:

```html
<form class="pure-form pure-form-aligned">
    <fieldset>
        <div class="pure-control-group">
            <label for="aligned-name">Username</label>
            <input type="text" id="aligned-name" placeholder="Username" />
            <span class="pure-form-message-inline">This is a required field.</span>
        </div>
        ...
```

Note that there are a total of four classes required to achieve the aligned layout.

In missing CSS, this will be styled like so:

```html
<form class="aligned">
    <fieldset>
        <div>
            <label for="aligned-name">Username</label>
            <input type="text" id="aligned-name" placeholder="Username" />
            <span>This is a required field.</span>
        </div>
        ...
```

A single "high powered" class, `aligned` will be applied to the form and will flow through the entire structure without
the need for additional classes.

Similarly, we would like a [`card` class](https://piccalil.li/blog/cube-css/):

```html
<article class="card">
  <img alt="" />
  <div>
    <!-- our content in here will auto-flow now -->
  </div>
</article>
```

which acts like the responsive card specified here, but without any additional classes on sub-elements.

(Perhaps `article` becomes a card in pure HTML?)

We would like to see the following high-power CSS classes:

* cards
* tabs
* row
  * no need to specify columns: auto break based on # of children and width of viewport
* container (?)
* modal (?)
* fix-to-top (?)
* fix-to-left (?)

## Utility Classes

Finally, for the small tweaks that make a website "feel right", we would like to offer a reasonably small number of
utility classes that allow for pragmatic adjustments of elements.

Tailwinds is an inspiration here, but take the 20 of the 80/20, simplifying things.

If you need something beyond that, we encourage people to use CSS.

# RFP

We are looking for a senior CSS developer who is interested in leading this project.  Other developers are interested in
working on the project, but we do not have the CSS expertise necessary to ensure a high quality library.

The project will be open source and freely available under a BSD license.

The lead position will be modestly paid.  We have two corporate sponsors lined up, and will solicit additional corporate
and community funds for the project.

We would like to do the project in [less.css](https://lesscss.org/)

# Inspiration

The following libraries provide

* [pico.css](https://picocss.com/)
* [purecss.css](https://purecss.io/)
* [cube.css](https://cube.fyi/)
