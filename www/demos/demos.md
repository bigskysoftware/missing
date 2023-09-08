---
layout: prose.vto
templateEngine: vto,md
url: /demos/
backTo: / Missing.css
renderOrder: 1
---

<main>

# Demos

{{ for demo of search.pages("url^=/demos/") |> filter((demo) => demo !== page) }}
 - [{{ demo.data.name }}]({{ demo.data.url }})
{{ /for }}
{.list-of-links .flow-gap}

</main>
