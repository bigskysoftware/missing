---
layout: prose.vto
templateEngine: vto,md
url: /demos/
backTo: / Missing.css
renderOrder: 1
---

<header>
  <nav class="breadcrumbs" aria-label="Breadcrumbs">
    <ol><li><a href="/">Home</a>
        <li><a href="/demos/" aria-current="page">Demos</a>
    </ol>
  </nav>
  <h1><sub-title class="allcaps">missing.css</sub-title> Demos</h1>
</header>

{{ for demo of search.pages("url^=/demos/") |> filter((demo) => demo.page !== page) }}
 - [{{ demo.name }}]({{ demo.url }})
{{ /for }}
{.list-of-links .flow-gap}
