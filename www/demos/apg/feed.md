---
layout: demo.vto
title: Feed
templateEngine: [vento, md]
apg:
 quote: |
   A feed is a section of a page that automatically loads new sections of content as the user scrolls.
   The sections of content in a feed are presented in article elements.
   So, a feed can be thought of as a dynamic list of articles that often appears to scroll infinitely.
 url: https://www.w3.org/WAI/ARIA/apg/patterns/feed/
shortcuts:
 - keys: ["PageDown"]
   text: Move focus to next article.
 - keys: ["PageUp"]
   text: Move focus to previous article.
 - keys: ["Ctrl", "End"]
   text: Move focus to the first focusable element after the feed.
 - keys: ["Ctrl", "Home"]
   text: Move focus to the first focusable element before the feed.
 - keys: ["Alt", "PageDown"]
   text: Move focus to the first article in nested feed.
 - keys: ["Alt", "PageUp"]
   text: Move focus from a nested feed to the parent article.
useTag: false
---


## Notes

<!-- Missing.css provides the `<aria-feed>`{ .language-html } custom element for feeds.-->
Missing.css uses the `<section role=feed>`{ .language-html } element to create feeds.


{{ include "demo_kbd.vto" }}


## Example

<noscript>

This example requires JavaScript to be activated.

</noscript>
<script type=module>
  import { attr, identify } from "/dist/js/19.js"
  document.querySelectorAll("article").forEach(article => {
    attr(article, 'aria-labelledby', identify(article.firstElementChild))
  })
</script>

<figure>
  <h3 id=feed-label>Blog Post Feed and with Nested Comment Feeds</h3>
  <a href=#>A focusable element before the feed</a>
  <section role=feed aria-labelledby=feed-label>
    <article class="crowded box">
      <h4>Blog Post 1</h4>
      <p>Some content for the blog post.</p>
      <a href=#>Read more...</a>
      <section role=feed>
        <article class="box ok">
          <h5 class="titlebar">Comment #1</h5>
          <p>Some content for the comment.</p>
          <a href=#>Edit</a> <a href=#>Delete</a>
        </article>
        <article class="box ok">
          <h5 class="titlebar">Comment #2</h5>
          <p>Some content for the comment.</p>
          <a href=#>Edit</a> <a href=#>Delete</a>
        </article>
        <article class="box ok">
          <h5 class="titlebar">Comment #3</h5>
          <p>Some content for the comment.</p>
          <a href=#>Edit</a> <a href=#>Delete</a>
        </article>
      </section role=feed>
    </article>
    <article class="crowded box">
      <h4>Blog Post 2</h4>
      <p>Some content for the blog post.</p>
      <a href=#>Read more...</a>
      <section role=feed>
        <article class="box ok">
          <h5 class="titlebar">Comment #1</h5>
          <p>Some content for the comment.</p>
          <a href=#>Edit</a> <a href=#>Delete</a>
        </article>
        <article class="box ok">
          <h5 class="titlebar">Comment #2</h5>
          <p>Some content for the comment.</p>
          <a href=#>Edit</a> <a href=#>Delete</a>
        </article>
        <article class="box ok">
          <h5 class="titlebar">Comment #3</h5>
          <p>Some content for the comment.</p>
          <a href=#>Edit</a> <a href=#>Delete</a>
        </article>
      </section role=feed>
    </article>
    <article class="crowded box">
      <h4>Blog Post 3</h4>
      <p>Some content for the blog post.</p>
      <a href=#>Read more...</a>
      <section role=feed>
        <article class="box ok">
          <h5 class="titlebar">Comment #1</h5>
          <p>Some content for the comment.</p>
          <a href=#>Edit</a> <a href=#>Delete</a>
        </article>
        <article class="box ok">
          <h5 class="titlebar">Comment #2</h5>
          <p>Some content for the comment.</p>
          <a href=#>Edit</a> <a href=#>Delete</a>
        </article>
        <article class="box ok">
          <h5 class="titlebar">Comment #3</h5>
          <p>Some content for the comment.</p>
          <a href=#>Edit</a> <a href=#>Delete</a>
        </article>
      </section role=feed>
    </article>
  </section role=feed>
  <a href=#>A focusable element after the second feed</a>
</figure>

<script type=module src=/dist/js/feed.js></script>
