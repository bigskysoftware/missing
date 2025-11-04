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

Missing.css provides the following custom elements for tabs:

- `<aria-tablist>`{ .language-html }
- `<aria-tab>`{ .language-html }
- `<aria-tabpanel>`{ .language-html }

See [Missing.js &sect; Tabs](/docs/js#tabs).

 - Don't forget to set an accessible label for the `<aria-tablist>`{ .language-html }.

 - You must establish the relationship between `<aria-tab>`{ .language-html } and `<aria-tabpanel>`{ .language-html } elements by providing `aria-controls`{ .token .attr-name } attributes to each `<aria-tab>`{ .language-html }.
   The component will set the reverse `aria-labelledby`{ .token .attr-name } attributes (generating unique ids if necessary).

 - It is highly recommended you set the initial state with `<aria-tab aria-selected=true>`{ .language-html } and `<aria-tabpanel hidden>`{ .language-html }.
   If initial state is not provided, the custom element will select the first tab, likely resulting in a DOM reflow as the remaining `<aria-tabpanel>`{ .language-html } instances are hidden.


{{ include "demo_kbd.vto" }}


## Example

<noscript>

This example requires JavaScript to be activated.

</noscript>

<figure>
	<a href=#>A focusable element before the tabs</a></p>
    <p>A horizontal tablist.</p>
	<aria-tablist aria-label="Example">
		<aria-tab aria-controls=panel-1>Tab 1</aria-tab>
		<aria-tab aria-controls=panel-2>Tab 2</aria-tab>
		<aria-tab aria-controls=panel-3>Tab 3</aria-tab>
	</aria-tablist>
	<aria-tabpanel id=panel-1>This is the content for the first tab.</p></aria-tabpanel>
	<aria-tabpanel id=panel-2>This is the content for the second tab.</p></aria-tabpanel>
	<aria-tabpanel id=panel-3>This is the content for the third tab.</p></aria-tabpanel>
	<a href=#>A focusable element between the tabs</a></p>
    <p>A vertical tablist.</p>
	<aria-tablist aria-label="Example" aria-orientation="vertical">
		<aria-tab aria-controls=panel-4 aria-selected=true>Tab 1</aria-tab>
		<aria-tab aria-controls=panel-5>Tab 2</aria-tab>
		<aria-tab aria-controls=panel-6>Tab 3</aria-tab>
	</aria-tablist>
	<aria-tabpanel id=panel-4>The first tab for the vertical tablist.</p></aria-tabpanel>
	<aria-tabpanel id=panel-5>The second tab for the vertical tablist.</p></aria-tabpanel>
	<aria-tabpanel id=panel-6>The third tab for the vertical tablist.</p></aria-tabpanel>
	<a href=#>A focusable element after the tabs</a></p>
    <p>A multi-selectable tablist.</p>
	<aria-tablist aria-label="Example" aria-multiselectable="true">
		<aria-tab aria-controls=panel-7>Tab 1</aria-tab>
		<aria-tab aria-controls=panel-8 aria-selected=true>Tab 2</aria-tab>
		<aria-tab aria-controls=panel-9 aria-selected=true>Tab 3</aria-tab>
	</aria-tablist>
	<aria-tabpanel id=panel-7>This is the content for the first tab.</p></aria-tabpanel>
	<aria-tabpanel id=panel-8>This is the content for the second tab.</p></aria-tabpanel>
	<aria-tabpanel id=panel-9>This is the content for the third tab.</p></aria-tabpanel>
</figure>

<script type=module src=/dist/js/tabs.js></script>
