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
   text: Move focus to the previous (horizontal) tab.
 - keys: ["Right Arrow"]
   text: Move focus to the next (horizontal) tab.
 - keys: ["Up Arrow"]
   text: Move focus to the previous (vertical) tab.
 - keys: ["Down Arrow"]
   text: Move focus to the next (vertical) tab.
 - keys: ["Home"]
   text: Move focus to the first tab.
 - keys: ["End"]
   text: Move focus to the last tab.
 - keys: ["Space"]
   text: Activate tab (for multi-select tabs).
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
   The component will associate an accessible label with the tabpanel based on the controlling tab.

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
			<aria-tab id=hs-tab-1 aria-controls=hs-panel-1 aria-actions=hs-actions-1>
				<aria-icon fetch name=home></aria-icon> Tab 1
				<button id=hs-actions-1 commandfor=hs-tab-1 command="--close" class="bad iconbutton margin-inline-start" aria-label="Close tab 1">
					<aria-icon fetch name=x></aria-icon>
				</button>
			</aria-tab>
			<aria-tab id=hs-tab-2 aria-controls=hs-panel-2 aria-actions=hs-actions-2>
				<aria-icon fetch name=book></aria-icon> Tab 2
				<button id=hs-actions-2 commandfor=hs-tab-2 command="--close" class="bad iconbutton margin-inline-start" aria-label="Close tab 2">
					<aria-icon fetch name=x></aria-icon>
				</button>
			</aria-tab>
			<aria-tab id=hs-tab-3 aria-controls=hs-panel-3 aria-actions=tab-hs-3a>
				<aria-icon fetch name=database></aria-icon> Tab 3
				<button id=hs-actions-3 commandfor=hs-tab-3 command="--close" class="bad iconbutton margin-inline-start" aria-label="Close tab 3">
					<aria-icon fetch name=x></aria-icon>
				</button>
			</aria-tab>
		</aria-tablist>
		<aria-tabpanel id=hs-panel-1><p>This is the content for the first tab.</p></aria-tabpanel>
		<aria-tabpanel id=hs-panel-2><p>This is the content for the second tab.</p></aria-tabpanel>
		<aria-tabpanel id=hs-panel-3><p>This is the content for the third tab.</p></aria-tabpanel>
	</aria-tabset>
	<p>A horizontal tablist with end tabs and big icons.</p>
	<aria-tabset>
		<aria-tabpanel id=he-panel-1><p>This is the content for the first tab.</p></aria-tabpanel>
		<aria-tabpanel id=he-panel-2><p>This is the content for the second tab.</p></aria-tabpanel>
		<aria-tabpanel id=he-panel-3><p>This is the content for the third tab.</p></aria-tabpanel>
		<aria-tablist aria-label="Example">
			<aria-tab aria-controls=he-panel-1 aria-actions=he-actions-1>
				<aria-icon fetch name=home class="<big>"></aria-icon> Tab 1
				<button id=he-actions-1 popovertarget=he-actions-1-menu class="iconbutton margin-inline-start" aria-label="Actions for tab 1">
					<aria-icon fetch name=ellipsis-vertical></aria-icon>
				</button>
				<aria-menulist id=he-actions-1-menu popover aria-labelledby=he-actions-1>
					<aria-menuitem onclick="alert(`You clicked ${this.innerText}`)">Move forward</aria-menuitem>
					<aria-menuitem onclick="alert(`You clicked ${this.innerText}`)">Move backwards</aria-menuitem>
					<aria-menuitem onclick="alert(`You clicked ${this.innerText}`)">Close</aria-menuitem>
				</aria-menulist>
			</aria-tab>
			<aria-tab aria-controls=he-panel-2 aria-actions=he-actions-2>
				<aria-icon fetch name=book class="<big>"></aria-icon> Tab 2
				<button id=he-actions-2 popovertarget=he-actions-2-menu class="iconbutton margin-inline-start" aria-label="Actions for tab 2">
					<aria-icon fetch name=ellipsis-vertical></aria-icon>
				</button>
				<aria-menulist id=he-actions-2-menu popover aria-labelledby=he-actions-2>
					<aria-menuitem onclick="alert(`You clicked ${this.innerText}`)">Move forward</aria-menuitem>
					<aria-menuitem onclick="alert(`You clicked ${this.innerText}`)">Move backwards</aria-menuitem>
					<aria-menuitem onclick="alert(`You clicked ${this.innerText}`)">Close</aria-menuitem>
				</aria-menulist>
			</aria-tab>
			<aria-tab aria-controls=he-panel-3 aria-actions=he-actions-3>
				<aria-icon fetch name=database class="<big>"></aria-icon> Tab 3
				<button id=he-actions-3 popovertarget=he-actions-3-menu class="iconbutton margin-inline-start" aria-label="Actions for tab 3">
					<aria-icon fetch name=ellipsis-vertical></aria-icon>
				</button>
				<aria-menulist id=he-actions-3-menu popover aria-labelledby=he-actions-3>
					<aria-menuitem onclick="alert(`You clicked ${this.innerText}`)">Move forward</aria-menuitem>
					<aria-menuitem onclick="alert(`You clicked ${this.innerText}`)">Move backwards</aria-menuitem>
					<aria-menuitem onclick="alert(`You clicked ${this.innerText}`)">Close</aria-menuitem>
				</aria-menulist>
			</aria-tab>
		</aria-tablist>
	</aria-tabset>
	<p>A vertical tablist with start tabs.</p>
	<aria-tabset>
		<aria-tablist aria-label="Example" aria-orientation="vertical">
			<aria-tab aria-controls=vs-panel-1 aria-selected=true><aria-icon fetch name=home></aria-icon> Tab 1</aria-tab>
			<aria-tab aria-controls=vs-panel-2><aria-icon fetch name=book></aria-icon> Tab 2</aria-tab>
			<aria-tab aria-controls=vs-panel-3><aria-icon fetch name=database></aria-icon> Tab 3</aria-tab>
		</aria-tablist>
		<aria-tabpanel id=vs-panel-1><p>The first tab for the vertical tablist.</p></aria-tabpanel>
		<aria-tabpanel id=vs-panel-2><p>The second tab for the vertical tablist.</p></aria-tabpanel>
		<aria-tabpanel id=vs-panel-3><p>The third tab for the vertical tablist.</p></aria-tabpanel>
	</aria-tabset>
	<p>A vertical tablist with end tabs and big tabs.</p>
	<aria-tabset>
		<aria-tabpanel id=ve-panel-1><p>The first tab for the vertical tablist.</p></aria-tabpanel>
		<aria-tabpanel id=ve-panel-2><p>The second tab for the vertical tablist.</p></aria-tabpanel>
		<aria-tabpanel id=ve-panel-3><p>The third tab for the vertical tablist.</p></aria-tabpanel>
		<aria-tablist aria-label="Example" aria-orientation="vertical">
			<aria-tab class="<big>" aria-controls=ve-panel-1 aria-selected=true>Tab 1<aria-icon fetch name=home class="<big>"></aria-icon></aria-tab>
			<aria-tab class="<big>" aria-controls=ve-panel-2>Tab 2 <aria-icon fetch name=book class="<big>"></aria-icon></aria-tab>
			<aria-tab class="<big>" aria-controls=ve-panel-3>Tab 3 <aria-icon fetch name=database class="<big>"></aria-icon></aria-tab>
		</aria-tablist>
	</aria-tabset>
	<p>A multi-selectable tablist.</p>
	<aria-tabset>
		<aria-tablist aria-label="Example" aria-multiselectable="true">
			<aria-tab aria-controls=panel-7><aria-icon fetch name=home></aria-icon> Tab 1</aria-tab>
			<aria-tab aria-controls=panel-8 aria-selected=true><aria-icon fetch name=book></aria-icon>Tab 2</aria-tab>
			<aria-tab aria-controls=panel-9 aria-selected=true><aria-icon fetch name=database></aria-icon>Tab 3</aria-tab>
		</aria-tablist>
		<aria-tabpanel id=panel-7><p>This is the content for the first tab.</p></aria-tabpanel>
		<aria-tabpanel id=panel-8><p>This is the content for the second tab.</p></aria-tabpanel>
		<aria-tabpanel id=panel-9><p>This is the content for the third tab.</p></aria-tabpanel>
	</aria-tabset>
</figure>

<script type=module src=/dist/js/icon.js></script>
<script type=module src=/dist/js/tabs.js></script>
<script type=module src=/dist/js/command.js></script>
<script type=module src=/dist/js/menu.js></script>
