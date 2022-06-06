
# Components

[[toc]]

## Box

<table>
<th scope="row">Class<td><dfn><code>.box</code></dfn>
</table>

The <dfn>`.box`</dfn> class creates a padded box with a border.

Boxes use the border and background color of the [colorway][].

<figure>

  ~~~ html
  <div class="box warn">
    <strong>Warning</strong>: If you're putting <!-- ... -->
  </div>
  ~~~

</figure>

::: box {.warn}
**Warning**: If you're putting something in a box, make sure to clarify
why it is in a box in some other way. For example, this box has "Warning" in
bold, in addition to being yellow. This makes your page clearer and prevents
accessibility failures.
:::

The above box, in addition to being an example, is also a genuine warning.

The `<figure>`, `<aside>`, `<details>` elements share their appearance with the
`.box` class.


## Subtitle

The <dfn>`<sub-title>`</dfn> custom element subtitle for a heading.

<figure>

  ~~~ html
  <h2>
    Conference Talks Considered Harmful<v-h>:</v-h>
    <sub-title>How I Learned To Stop Worrying and Love Baz</sub-title>
  </h2>
  ~~~

<h4 class=h2>
  Conference Talks Considered Harmful<v-h>:</v-h>
  <sub-title>How I Learned To Stop Worrying and Love Cliché Titles</sub-title>
</h4>

</figure>

<figure>

  ~~~ html
  <h2>
    <sub-title class="allcaps">Breaking</sub-title><v-h>:</v-h>
    Bad Thing Happens
  <h2>
  ~~~

<h4 class=h2>
  <sub-title class="allcaps">Breaking</sub-title><v-h>:</v-h>
  Bad Thing Happens
<h4>

</figure>


## Toolbar

A <dfn>`.tool-bar`</dfn> horizontally laid-out collection of controls.

::: box {.warn}
**Warning**: This is not a substitute for the `toolbar` ARIA role, see
[WAI: Toolbar][] for that.
:::

<figure>

  ~~~ html
  <section class="tool-bar">
    <button type=button>Cut</button>
    <button type=button>Copy</button>
    <button type=button>Paste</button>

    <hr aria-orientation="vertical">

    <label>Find: <input type=text></label>
  </section>
  ~~~


  <section class="tool-bar">
    <button type=button>Cut</button>
    <button type=button>Copy</button>
    <button type=button>Paste</button>
    <hr aria-orientation="vertical">
    <label>Find: <input type=text></label>
  </section>

</figure>

[WAI: Toolbar]: https://www.w3.org/TR/wai-aria-practices/#toolbar


## Breadcrumbs

Add <dfn>`.breadcrumbs`</dfn> to a `<nav>` element. Use an `<ul>` or  `<ol>` of
links inside. Don't forget to add an `aria-label`.

Add the attribute `aria-current=page` to the link representing the current page
(if any).

<figure>
  <nav class=breadcrumbs aria-label="Breadcrumbs">
    <ol>
      <li><a href="#">Home</a></li>
      <li><a href="#">User</a></li>
      <li><a href="#">Advanced</a></li>
      <li><a href="#">New All</a></li>
      <li><a href="#" aria-current=page>Quit Sibelius</a></li>
    </ol>
  </nav>
</figure>


## Chip

The <dfn>`<chip>`</dfn> class, or the <dfn>`.chip`</dfn> class, creates a
rounded chip, like what you might use for a tag list or contacts.

<figure>

  ~~~ html
  <a class="chip" href="/@jdoe"><img src="profiles/jdoe.webp"> John Doe</a>
  <chip>#webdev</chip><chip>#design</chip><chip>#css</chip>
  ~~~

<chip class=info>#webdev</chip> <chip class=ok>⍻ Merged</chip> <chip>John Doe</chip> <chip class=warn>3 minute read</chip>  

</figure>


## Navbar

<figure>
<figcaption>Code: Navbars</figcaption>

  ~~~ html
  <header is="navbar">
    <nav aria-label="Site sections">
      <ul role="list">
        <li><a href="/"><img alt="missing.js" src="/logo.png"></a>
        <li><a href="/docs">Docs</a>
        <li><a href="/docs">Contribute</a>
        <li><a href="/docs">Donate</a>
      </ul>
    </nav>
    <nav aria-label="Social media links">
      <ul role="list">
        <li><a href="/"><img alt=""></a>
        <li><a href="https://github.com/...">GitHub</a>
        <li><a href="https://discord.app/...">Discord</a>
      </ul>
    </nav>
  </header>
  ~~~

</figure>

::: box {.info}
When you have multiple `<nav>` elements on a page, it's a good idea to put
`aria-label` attributes on them. This is because many assistive programs have
a feature to jump to the navigation part of a page, which does not work well if
the user can't tell which nav is which.
:::


[colorway]: /docs/colorways
