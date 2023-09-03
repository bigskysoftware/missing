---
layout: prose.vto
templateEngine: vto,md
url: /demos/
backTo: / Missing.css
---

<main>

# Demos

{{ for demo of search.pages("demo") |> filter((demo) => demo !== page) }}
 - [{{ demo.data.name }}]({{ demo.data.url }})
{{ /for }}
{.list-of-links .flow-gap}

</main>
