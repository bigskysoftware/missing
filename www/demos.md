---
layout: layout.eta
---

<main>

# Demos

<ul class='list-of-links'>
<% for (const demo in collections.demos _%>
<li><p><a href="<%= demo.url %>"><%= demo.data.name %></a>
<% } %>
</ul>

</main>

