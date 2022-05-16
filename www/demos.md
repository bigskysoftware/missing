---
layout: layout.eta
templateEngine: eta,md
---

<main>

# Demos

<ul class='list-of-links'>
<% for (const demo in search.pages("demo")) { _%>
<li><p><a href="<%= demo.url %>"><%= demo.name %></a>
<% } %>
</ul>

</main>

