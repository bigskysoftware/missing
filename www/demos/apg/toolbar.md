---
title: Toolbar
templateEngine: [vento, md]
apg:
 quote: |
  A toolbar is a container for grouping a set of controls, such as buttons, menubuttons, or checkboxes.

  When a set of controls is visually presented as a group, the toolbar role can be used to communicate the presence and purpose of the grouping to screen reader users.
  Grouping controls into toolbars can also be an effective way of reducing the number of tab stops in the keyboard interface.
 url: https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/
shortcuts:
 - keys: ["Tab"]
   text: Tab in and out of the toolbar, remembering previous focus.
 - keys: ["Shift", "Tab"]
   text: Tab in and out of the toolbar, remembering previous focus.
 - keys: ["Left Arrow"]
   text: Move focus to the previous item (dependent on writing mode / direction).
 - keys: ["Right Arrow"]
   text: Move focus to the next item (dependent on writing mode / direction).
 - keys: ["Home"]
   text: Move focus to the first item.
 - keys: ["End"]
   text: Move focus to the last item.
 - keys: ["Enter"]
   text: Activates the currently focused item.
 - keys: ["Space"]
   text: Activates the currently focused item.
---


## Notes

Missing.css provides the `<aria-toolbar>`{ .language-html } custom element for toolbars.

Arrow key navigation of toolbar items takes into account the `dir`{ .token .attr-name } HTML attribute and `writing-mode`{ .token .attr-name } CSS property.

- If you wish for disabled items to remain focusable for discovery purposes, use the `aria-disabled`{ .token .attr-name } attribute instead of `disabled`{ .token .attr-name }.
  For more information, see [focusability of disabled controls](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_disabled_controls).


{{ include "demo_kbd.vto" }}


## Example

<noscript>

This example requires JavaScript to be activated.

</noscript>

<div style="writing-mode: horizontal-tb">
	<figure dir=ltr>
		<figcaption><sub-title class="allcaps">Example<v-h>: </v-h></sub-title>horizontal-tb, ltr</figcaption>
		<p><a href=#>Focusable element before the toolbar</a></p>
		<aria-toolbar class="tool-bar" aria-label="Edit">
			<button type=button tabindex=-1>Cut</button>
			<button type=button tabindex=-1>Copy</button>
			<button type=button tabindex=-1>Paste</button>
			<hr aria-orientation=vertical>
			<label>Find: <input type=text tabindex=-1></label>
		</aria-toolbar>
		<p><a href=#>Focusable element between the toolbars</a></p>
		<aria-toolbar class="tool-bar" aria-orientation=vertical aria-label="Edit">
			<button type=button tabindex=-1>Cut</button>
			<button type=button tabindex=-1 disabled class="bad">Copy</button>
			<button type=button tabindex=-1>Paste</button>
		</aria-toolbar>
		<p><a href=#>Focusable element after the toolbar</a></p>
	</figure>
	
	<figure dir=rtl>
		<figcaption><sub-title class="allcaps">Example<v-h>: </v-h></sub-title>horizontal-tb, rtl</figcaption>
		<p><a href=#>Focusable element before the toolbar</a></p>
		<aria-toolbar class="tool-bar" aria-label="Edit">
			<button type=button tabindex=-1>Cut</button>
			<button type=button tabindex=-1>Copy</button>
			<button type=button tabindex=-1>Paste</button>
			<hr aria-orientation=vertical>
			<label>Find: <input type=text tabindex=-1></label>
		</aria-toolbar>
		<p><a href=#>Focusable element between the toolbars</a></p>
		<aria-toolbar class="tool-bar" aria-orientation=vertical aria-label="Edit">
			<button type=button tabindex=-1>Cut</button>
			<button type=button tabindex=-1 aria-disabled=true class="bad">Copy</button>
			<button type=button tabindex=-1>Paste</button>
		</aria-toolbar>
		<p><a href=#>Focusable element after the toolbar</a></p>
	</figure>
</div>
<div style="writing-mode: vertical-lr">
	<figure dir=ltr>
		<figcaption><sub-title class="allcaps">Example<v-h>: </v-h></sub-title>vertical-rl, ltr</figcaption>
		<p><a href=#>Focusable element before the toolbar</a></p>
		<aria-toolbar class="tool-bar" aria-label="Edit">
			<button type=button tabindex=-1>Cut</button>
			<button type=button tabindex=-1>Copy</button>
			<button type=button tabindex=-1>Paste</button>
			<hr aria-orientation=vertical>
			<label>Find: <input type=text tabindex=-1></label>
		</aria-toolbar>
		<p><a href=#>Focusable element between the toolbars</a></p>
		<aria-toolbar class="tool-bar" aria-orientation=vertical aria-label="Edit">
			<button type=button tabindex=-1>Cut</button>
			<button type=button tabindex=-1>Copy</button>
			<button type=button tabindex=-1>Paste</button>
		</aria-toolbar>
		<p><a href=#>Focusable element after the toolbar</a></p>
	</figure>
</div>
<div style="writing-mode: vertical-lr">
	<figure dir=rtl>
	<figcaption><sub-title class="allcaps">Example<v-h>: </v-h></sub-title>vertical-rl, rtl</figcaption>
		<p><a href=#>Focusable element before the toolbar</a></p>
		<aria-toolbar class="tool-bar" aria-label="Edit">
			<button type=button tabindex=-1>Cut</button>
			<button type=button tabindex=-1>Copy</button>
			<button type=button tabindex=-1>Paste</button>
			<hr aria-orientation=vertical>
			<label>Find: <input type=text tabindex=-1></label>
		</aria-toolbar>
		<p><a href=#>Focusable element between the toolbars</a></p>
		<aria-toolbar class="tool-bar" aria-orientation=vertical aria-label="Edit">
			<button type=button tabindex=-1>Cut</button>
			<button type=button tabindex=-1>Copy</button>
			<button type=button tabindex=-1>Paste</button>
		</aria-toolbar>
		<p><a href=#>Focusable element after the toolbar</a></p>
	</figure>
</div>
<div style="writing-mode: vertical-rl">
	<figure dir=ltr>
		<figcaption><sub-title class="allcaps">Example<v-h>: </v-h></sub-title>vertical-rl, ltr</figcaption>
		<p><a href=#>Focusable element before the toolbar</a></p>
		<aria-toolbar class="tool-bar" aria-label="Edit">
			<button type=button tabindex=-1>Cut</button>
			<button type=button tabindex=-1>Copy</button>
			<button type=button tabindex=-1>Paste</button>
			<hr aria-orientation=vertical>
			<label>Find: <input type=text tabindex=-1></label>
		</aria-toolbar>
		<p><a href=#>Focusable element between the toolbars</a></p>
		<aria-toolbar class="tool-bar" aria-orientation=vertical aria-label="Edit">
			<button type=button tabindex=-1>Cut</button>
			<button type=button tabindex=-1>Copy</button>
			<button type=button tabindex=-1>Paste</button>
		</aria-toolbar>
		<p><a href=#>Focusable element after the toolbar</a></p>
	</figure>
</div>
<div style="writing-mode: vertical-rl">
	<figure dir=rtl>
		<figcaption><sub-title class="allcaps">Example<v-h>: </v-h></sub-title>vertical-rl, rtl</figcaption>
		<p><a href=#>Focusable element before the toolbar</a></p>
		<aria-toolbar class="tool-bar" aria-label="Edit">
			<button type=button tabindex=-1>Cut</button>
			<button type=button tabindex=-1>Copy</button>
			<button type=button tabindex=-1>Paste</button>
			<hr aria-orientation=vertical>
			<label>Find: <input type=text tabindex=-1></label>
		</aria-toolbar>
		<p><a href=#>Focusable element between the toolbars</a></p>
		<aria-toolbar class="tool-bar" aria-orientation=vertical aria-label="Edit">
			<button type=button tabindex=-1>Cut</button>
			<button type=button tabindex=-1>Copy</button>
			<button type=button tabindex=-1>Paste</button>
		</aria-toolbar>
		<p><a href=#>Focusable element after the toolbar</a></p>
	</figure>
</div>

<script type=module src=/dist/js/toolbar.js></script>
