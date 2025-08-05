---
title: Tabs
templateEngine: [vento, md]
apg:
 quote: |
  Tabs are a set of layered sections of content, known as tab panels, that display one panel of content at a time.
  Each tab panel has an associated tab element, that when activated, displays the panel.
  The list of tab elements is arranged along one edge of the currently displayed panel, most commonly the top edge.
 url: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
shortcuts:
 - keys: ["Tab"]
   text: Tab in and out of the tablist, remembering previous focus.
 - keys: ["Shift", "Tab"]
   text: Tab in and out of the tablist, remembering previous focus.
 - keys: ["Left Arrow"]
   text: Move focus to the previous tab.
 - keys: ["Right Arrow"]
   text: Move focus to the next tab.
 - keys: ["Home"]
   text: Move focus to the first tab.
 - keys: ["End"]
   text: Move focus to the last tab.
---


## Notes

Missing.css uses `<div role=tablist>`{ .language-html }, `<button role=tab>`{ .language-html }, and `<div role=tabpanel>`{ .language-html } for tabs.
To get the actual behavior of an accessible tabset, you can use [Missing.js &sect; Tabs](/docs/js#tabs).

 - Don't forget to set an accessible label for the tablist.
 - You must establish the relationship between `<button role=tab>`{ .language-html } and `<div role=tabpanel>`{ .language-html } elements by including `aria-controls`{ .token .attr-name } attributes on each `<button role=tab>`{ .language-html }.
   The JavaScript behavior will set the reverse `aria-labelledby`{ .token .attr-name } attributes (generating unique ids if necessary).
 - You must set the initial state with `<button role=tab aria-selected=true>`{ .language-html } and `<div role=tabpanel hidden>`{ .language-html }).

<!--
Missing.css provides the `<aria-tablist>`{ .language-html }, `<aria-tab>`{ .language-html }, and `<aria-tabpanel>`{ .language-html } custom elements for tabs.

 - Don't forget to set an accessible label for the `<aria-tablist>`{ .language-html }.
 - You must establish the relationship between `<aria-tab>`{ .language-html } and `<aria-tabpanel>`{ .language-html } elements by providing `aria-controls`{ .token .attr-name } attributes to each `<aria-tab>`{ .language-html }.
		The component will set the reverse `aria-labelledby`{ .token .attr-name } attributes (generating unique ids if necessary).
 - You must set the initial state with `<aria-tab aria-selected=true>`{ .language-html } and `<aria-tabpanel hidden>`{ .language-html }).
-->

{{ include "demo_kbd.vto" }}


## Example

<noscript>

This example requires JavaScript to be activated.

</noscript>

<figure>
	<a href=#>A focusable element before the tabs</a></p>
	<div>
		<div role=tablist>
			<button role=tab id=tab-1 aria-controls=panel-1 aria-selected=true>Tab 1</button>
			<button role=tab id=tab-2 aria-controls=panel-2>Tab 2</button>
			<button role=tab id=tab-3 aria-controls=panel-3>Tab 3</button>
		</div>
		<div role=tabpanel id=panel-1 aria-labelledby=tab-1><p>This is the content for the first tab</div>
		<div role=tabpanel id=panel-2 aria-labelledby=tab-2 hidden><p>This is the content for the second tab</div>
		<div role=tabpanel id=panel-3 aria-labelledby=tab-3 hidden><p>This is the content for the third tab</div>
	</div>
	<!--
	<aria-tablist aria-label="Example">
		<aria-tab aria-controls=panel-1                   >Tab 1</aria-tab>
		<aria-tab aria-controls=panel-2 aria-selected=true>Tab 2</aria-tab>
		<aria-tab aria-controls=panel-3                   >Tab 3</aria-tab>
	</aria-tablist>
	<aria-tabpanel id=panel-1 hidden>This is the content for the first tab.</p></aria-tabpanel>
	<aria-tabpanel id=panel-2       >This is the content for the second tab.</p></aria-tabpanel>
	<aria-tabpanel id=panel-3 hidden>This is the content for the third tab.</p></aria-tabpanel>
	-->
	<a href=#>A focusable element after the tabs</a></p>
</figure>

<script type=module src=/dist/js/tabs.js></script>
