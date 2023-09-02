---
layout: prose.eta
templateEngine: eta,md
url: /demos/
backTo: / Missing.css
---

<main>

# Demos

<% for (const demo of search.pages("demo")) { _%>
<% if (demo === page) continue; %>
 - [<%= demo.data.name %>](<%= demo.data.url %>)
<% } %>
{.list-of-links .flow-gap}

</main>
