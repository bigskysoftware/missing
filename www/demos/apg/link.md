---
title: Link
templateEngine: [vento, md]
apg:
 quote: |
  A link widget provides an interactive reference to a resource.
  The target resource can be either external or local, i.e., either outside or within the current page or application.
 url: https://www.w3.org/WAI/ARIA/apg/patterns/link/
shortcuts:
 - keys: ["Enter"]
   text: Executes the link and moves focus to the link target (when focused).
---


## Notes

Missing.css uses the `<a>`{ .language-html } element for links.

When an `<a>`{ .language-html } tag is used to link to content on the same page, missing.css will provide the following visual context:

Heading elements (`<h1>`{ .language-html }, `<h2>`{ .language-html }, etc...)
:	A `:before`{ .language-css } pseudo-element whose color is determined by the `--accent`{ .language-css } CSS variable.

Details elements
:   On [supported browsers][], the `<details>` element will be opened.

Other elements (aka the current `:target`{ .language-css })
:	An outline of the element whose color is determined by the `--fg`{ .language-css } CSS variable.

See the example below for visual reference.

{{ include "demo_kbd.vto" }}


## Example

<figure>
	<div>

		<strong>Menu:</strong>
		<ul role=list class="packed">
		<li><a href=#section-label>Jump to Heading</a>
		<li><a href=#list>Jump to List</a>
        <li><a href=#details>Jump to details and open</a>
		<li><a href=#>Jump to top</a>
		</ul>

		<section aria-labelledby=section-label>
			<h3 id=section-label>Section Heading</h3>
			<p>
			This is some content.
		</section>
		<ul id=list>
			<li>Apples
			<li>Mangos
			<li>Bananas
		</ul>
        <details id=details>
          <summary>Details Heading</summary>
          <p>
          This is some content.
          If your browser supports `::details-content`, then clicking the link above will display this.
        </details>
	</div>
</figure>

[supported browsers]: https://caniuse.com/?search=%3A%3Adetails-content
