---
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
---


## Notes

Missing.css provides the `<aria-feed>`{ .language-html } custom element for feeds.

 - The author is responsible for loading new content based on user interaction.
   Be sure to set `<aria-feed aria-busy=true>`{ .language-html } during this process.
   After your feed is updated, be sure to remove the attribute.

 - The `<aria-feed>`{ .language-html } element uses MutationObserver to update the following attributes on `<article>`{ .language-html } or `[role=article]`{ .token .attr-name } elements when new content is appended:
    - `tabindex`{ .token .attr-name },
    - `aria-posinset`{ .token .attr-name }, and
    - `aria-setsize`{ .token .attr-name }.

   It will also validate that the articles contain `aria-labelledby`{ .token .attr-name } and `aria-describedby`{ .token .attr-name } attributes.

 - If the total number of `<article>`{ .language-html } elements is extremely large, indefinite, or changes often, authors may use the `<aria-feed infinite>`{ .language-html } attribute, which sets `<article aria-setsize="-1">`{ .language-html } on child elements in order to communicate the unknown size of the set to assistive technologies.

{{ include "demo_kbd.vto" }}


## Example

<noscript>

This example requires JavaScript to be activated.

</noscript>
<script type=module>
	import { $, $$, attr, identify, on } from "/dist/js/19.js"
	function label(article) {
		attr(article, {
			'aria-labelledby': identify(article.firstElementChild),
			'aria-describedby': identify($(article, 'p')),
		})
	}
	const feed = $(document, "aria-feed")
	$$(feed, "article").forEach(label)
	let count = feed.children.length
	on($(document, "button"), "click", (e) => {
		feed.ariaBusy = "true"
		count++
		const article = $(document, "template").content.cloneNode(true).firstElementChild
		$(article, "h4").textContent = `Blog Post ${count}`
		label(article)
		$$(article, "article").forEach(label)
		feed.appendChild(article)
		feed.ariaBusy = null
	})
</script>

<figure>
	<template>
		<article class="crowded box">
			<h4>Blog Post 1</h4>
			<p>Some content for the blog post.</p>
			<a href=#>Read more...</a>
			<aria-feed aria-label="Comment Feed 1">
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
			</aria-feed>
		</article>
	</template>
	<h3 id=feed-label>Blog Post Feed and with Nested Comment Feeds</h3>
	<button id="load-article">Load an article</button>
	<p><a href=#>A focusable element before the feed</a></p>
	<aria-feed aria-labelledby=feed-label>
		<article class="crowded box">
			<h4>Blog Post 1</h4>
			<p>Some content for the blog post.</p>
			<a href=#>Read more...</a>
			<aria-feed aria-label="Comment Feed 1">
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
			</aria-feed>
		</article>
		<article class="crowded box">
			<h4>Blog Post 2</h4>
			<p>Some content for the blog post.</p>
			<a href=#>Read more...</a>
			<aria-feed aria-label="Comment Feed 2">
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
			</aria-feed>
		</article>
		<article class="crowded box">
			<h4>Blog Post 3</h4>
			<p>Some content for the blog post.</p>
			<a href=#>Read more...</a>
			<aria-feed aria-label="Comment Feed 3">
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
			</aria-feed>
		</article>
	</aria-feed>
	<p><a href=#>A focusable element after the second feed</a></p>
</figure>

<script type=module src=/dist/js/feed.js></script>
