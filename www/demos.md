---
layout: layout.html
---

<main>

# Demos

<ul class='list-of-links'>
{% for demo in collections.demos -%}
<li><p><a href="{{demo.url}}">{{demo.data.name}}</a>
{% endfor %}
</ul>

</main>

