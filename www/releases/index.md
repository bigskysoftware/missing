---
layout: prose.vto
templateEngine: [vto, md]
renderOrder: 1
url: ./
backTo: / Missing.css
---

<header>
  <nav class="breadcrumbs" aria-label="Breadcrumbs">
    <ol><li><a href="/">Home</a>
        <li><a href="/releases/" aria-current="page">Releases</a>
    </ol>
  </nav>
  <h1><sub-title class="allcaps">Missing.css</sub-title> Releases</h1>
</header>

{{ set releases = search.pages("release!=undefined")
  |> sortSemVer(page => page.release)
  |> reverse }}

<ul role="list" class="list-of-links flex-row flex-wrap:wrap">
{{ for rel of releases }}
<li class="mono-font" style="flex-basis:18ch">
  <a href="{{ rel.url }}">{{ rel.release }}</a>
{{ /for }}
</ul>
