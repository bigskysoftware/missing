---
layout: layout.eta
templateEngine: eta,md
---

<main>

# Demos

<ul class='list-of-links'>
<% for (const demo of search.pages("demo")) { _%>
<li><p><a href="<%= demo.data.url %>"><%= demo.data.name %></a>
<% } %>
</ul>

</main>

