---
backTo: ~
url: ./
title: Intro
templateEngine: [eta,md]
---

# Welcome to missing.css!

Missing.css is a simple CSS library that can be used in many ways — you could:

 - Simply drop it into a page and call it a day.
 - Enhance your design with components and utility classes.
 - Create your own look by customizing CSS variables.
 - Write your own CSS on top of it.

Install it on your website if you haven't already:

<% const version = filters.sortSemVer(
    search.pages("release"),
    page => page.data.release,
  ).at(-1).data.release; %>

<figure>

  ~~~ html
  <link rel="stylesheet" href="https://unpkg.com/missing.css@<%= version %>/dist/missing.min.css">
  <!-- Prism theme (https://prismjs.com/): -->
  <link rel="stylesheet" href="https://unpkg.com/missing.css@<%= version %>/dist/missing-prism.min.css">
  ~~~

</figure>

You can also install it into an npm project with `npm i -s missing.css`.

This will make your page look a bit like the one you are reading right now,
without applying any classes.

Then, see how you can go beyond classless CSS with its features.
