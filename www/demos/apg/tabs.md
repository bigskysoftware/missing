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

- `<aria-tabset>`{ .language-html }
- `<aria-tablist>`{ .language-html }
- `<aria-tab>`{ .language-html }
- `<aria-tabpanel>`{ .language-html }

See [Missing.js &sect; Tabs](/docs/js#tabs).

 - The `<aria-tabset>`{ .language-html } element provides positioning support for `<aria-tablist>`{ .language-html } and `<aria-tabpanel>`{ .language-html }.
   It does not have have an ARIA role.
 - Don't forget to set an accessible label for the `<aria-tablist>`{ .language-html }.

 - You must establish the relationship between `<aria-tab>`{ .language-html } and `<aria-tabpanel>`{ .language-html } elements by providing `aria-controls`{ .token .attr-name } attributes to each `<aria-tab>`{ .language-html }.
   The component will set the reverse `aria-labelledby`{ .token .attr-name } attributes (generating unique ids if necessary).

 - It is highly recommended you set the initial state with `<aria-tab aria-selected=true>`{ .language-html } and `<aria-tabpanel hidden>`{ .language-html }.
   If initial state is not provided the first tab will be selected, resulting in a DOM reflow as the remaining `<aria-tabpanel>`{ .language-html } instances are hidden.


{{ include "demo_kbd.vto" }}


## Example

<noscript>

This example requires JavaScript to be activated.

</noscript>

<figure>
	<p>A horizontal tablist with start tabs.</p>
	<aria-tabset>
		<aria-tablist aria-label="Example">
			<aria-tab aria-controls=panel-1s><aria-icon fetch name=home></aria-icon> Tab 1</aria-tab>
			<aria-tab aria-controls=panel-2s><aria-icon fetch name=book></aria-icon> Tab 2</aria-tab>
			<aria-tab aria-controls=panel-3s><aria-icon fetch name=database></aria-icon> Tab 3</aria-tab>
		</aria-tablist>
		<aria-tabpanel id=panel-1s>This is the content for the first tab.</p></aria-tabpanel>
		<aria-tabpanel id=panel-2s>This is the content for the second tab.</p></aria-tabpanel>
		<aria-tabpanel id=panel-3s>This is the content for the third tab.</p></aria-tabpanel>
	</aria-tabset>
	<p>A horizontal tablist with end tabs and big icons.</p>
	<aria-tabset>
		<aria-tabpanel id=panel-1e>This is the content for the first tab.</p></aria-tabpanel>
		<aria-tabpanel id=panel-2e>This is the content for the second tab.</p></aria-tabpanel>
		<aria-tabpanel id=panel-3e>This is the content for the third tab.</p></aria-tabpanel>
		<aria-tablist aria-label="Example">
			<aria-tab aria-controls=panel-1e><aria-icon fetch name=home class="<big>"></aria-icon> Tab 1</aria-tab>
			<aria-tab aria-controls=panel-2e><aria-icon fetch name=book class="<big>"></aria-icon> Tab 2</aria-tab>
			<aria-tab aria-controls=panel-3e><aria-icon fetch name=database class="<big>"></aria-icon> Tab 3</aria-tab>
		</aria-tablist>
	</aria-tabset>
	<p>A vertical tablist with start tabs.</p>
	<aria-tabset>
		<aria-tablist aria-label="Example" aria-orientation="vertical">
			<aria-tab aria-controls=panel-4s aria-selected=true><aria-icon fetch name=home></aria-icon> Tab 1</aria-tab>
			<aria-tab aria-controls=panel-5s><aria-icon fetch name=book></aria-icon> Tab 2</aria-tab>
			<aria-tab aria-controls=panel-6s><aria-icon fetch name=database></aria-icon> Tab 3</aria-tab>
		</aria-tablist>
		<aria-tabpanel id=panel-4s>The first tab for the vertical tablist.</p></aria-tabpanel>
		<aria-tabpanel id=panel-5s>The second tab for the vertical tablist.</p></aria-tabpanel>
		<aria-tabpanel id=panel-6s>The third tab for the vertical tablist.</p></aria-tabpanel>
	</aria-tabset>
	<p>A vertical tablist with end tabs and big tabs.</p>
	<aria-tabset>
		<aria-tabpanel id=panel-4e>The first tab for the vertical tablist.</p></aria-tabpanel>
		<aria-tabpanel id=panel-5e>The second tab for the vertical tablist.</p></aria-tabpanel>
		<aria-tabpanel id=panel-6e>The third tab for the vertical tablist.</p></aria-tabpanel>
		<aria-tablist aria-label="Example" aria-orientation="vertical">
			<aria-tab class="<big>" aria-controls=panel-4e aria-selected=true>Tab 1<aria-icon fetch name=home class="<big>"></aria-icon></aria-tab>
			<aria-tab class="<big>" aria-controls=panel-5e>Tab 2 <aria-icon fetch name=book class="<big>"></aria-icon></aria-tab>
			<aria-tab class="<big>" aria-controls=panel-6e>Tab 3 <aria-icon fetch name=database class="<big>"></aria-icon></aria-tab>
		</aria-tablist>
	</aria-tabset>
	<p>A multi-selectable tablist.</p>
	<aria-tabset>
		<aria-tablist aria-label="Example" aria-multiselectable="true">
			<aria-tab aria-controls=panel-7><aria-icon fetch name=home></aria-icon> Tab 1</aria-tab>
			<aria-tab aria-controls=panel-8 aria-selected=true><aria-icon fetch name=book></aria-icon>Tab 2</aria-tab>
			<aria-tab aria-controls=panel-9 aria-selected=true><aria-icon fetch name=database></aria-icon>Tab 3</aria-tab>
		</aria-tablist>
		<aria-tabpanel id=panel-7>This is the content for the first tab.</p></aria-tabpanel>
		<aria-tabpanel id=panel-8>This is the content for the second tab.</p></aria-tabpanel>
		<aria-tabpanel id=panel-9>This is the content for the third tab.</p></aria-tabpanel>
	</aria-tabset>
</figure>

<script type=module src=/dist/js/tabs.js></script>
<script type=module src=/dist/js/icon.js></script>
