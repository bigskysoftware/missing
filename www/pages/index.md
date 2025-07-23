---
layout: layout.vto
url: /
templateEngine: [vento, md]
---

<header>

# <span class=allcaps>missing<wbr>.css<v-h>:</v-h></span> <sub-title>The Missing CSS Stylesheet</sub-title>

<nav>

[Docs](/docs/) 
[Demo](/demos/) 
[Playground](/playground/) 
[Releases](/releases/) 
[GitHub](https://github.com/bigskysoftware/missing) 
[Discord](https://htmx.org/discord)
{.tool-bar}

</nav>

</header>

<main>

{{ set version = search.pages("release!=undefined") |>
    map(rel => rel.release) |> sortSemVer |> at(-1) }}

missing.css is the CSS library we wished already existed.
Add it to your website:

`<link rel=stylesheet href=https://unpkg.com/missing.css@{{version}}>`{.language-html}

 * It starts with decent default styling for vanilla HTML, akin to **classless CSS** libraries, that can be customized with **CSS variables.** {.box}
 * It offers a small set of **components** based on well-known, semantic markup patterns, with ARIA where appropriate. {.box}
 * Finally, it offers a small & curated set of **utility classes** and **custom elements** for the things HTML hasn't caught up with yet. {.box}
{.flex-switch .dense .align-items:stretch role=list}

The goal of missing.css is to reduce needed intervention in HTML. It lets
authors

 - start with a good out-of-the-box experience,
 - customize it easily, even create multiple themes,
 - build common components using plain, semantic HTML,
 - create unique sites by applying utility classes as needed.

{.flow-gap .dense}

Though it's quite early, there are a few sites using missing.css:

 - <https://hyperscript.org>
 - <https://denizaksimsek.com>
 - <https://github.com/chapmandu/cfwheels-htmx-crud>
 - <https://www.davidaflood.com>

Missing.css is a notch on the complexity slider that's just right for small projects and personal sites where 
 classless CSS is not enough,
 Tailwind is too much, and
 Bootstrap just doesn't have the right vibe.

We also have a [JavaScript library](/docs/js) and a [Prism](https://prismjs.com) syntax theme.

</main>
