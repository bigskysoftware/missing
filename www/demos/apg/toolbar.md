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

<script>
</script>
<form class="flex-row">
	<div>
	<label for=writing-mode>Writing Mode:</label>
	<select id=writing-mode onchange="document.getElementById('ex').style.writingMode = this.value">
		<option value=horizontal-tb selected>Horizontal
		<option value=vertical-rl>Vertical (Right-to-Left)
		<option value=vertical-lr>Vertical (Left-to-Right)
	</select>
	</div>
	<div>
	<label for=dir>Direction:</label>
	<select id=dir onchange="document.getElementById('ex').dir = this.value">
		<option value=ltr selected>Left to right
		<option value=rtl>Right to left
	</select>
	</div>
</form>
<figure id=ex dir=ltr style="writing-mode: horizontal-tb">
	<figcaption><sub-title class="allcaps">Example<v-h>: </v-h></sub-title>Toolbar</figcaption>
	<p><a href=#>Focusable element before the toolbar</a></p>
	<aria-toolbar class="tool-bar" aria-label="Edit">
		<button type=button tabindex=-1><aria-icon fetch name=scissors></aria-icon></button>
		<button type=button tabindex=-1><aria-icon fetch name=clipboard-copy></aria-icon></button>
		<button type=button tabindex=-1><aria-icon fetch name=clipboard-paste></aria-icon></button>
		<hr aria-orientation=vertical>
		<button type=button tabindex=-1><aria-icon fetch name=text-align-start></aria-icon></button>
		<button type=button tabindex=-1><aria-icon fetch name=text-align-center></aria-icon></button>
		<button type=button tabindex=-1><aria-icon fetch name=text-align-end></aria-icon></button>
		<button type=button tabindex=-1><aria-icon fetch name=text-align-justify></aria-icon></button>
		<hr aria-orientation=vertical>
		<select aria-label="Font Size">
		  <option>8pt
		  <option>12pt
		  <option>16pt
		  <option>24pt
		</select>
		<hr aria-orientation=vertical>
		<label>Find: <input type=text tabindex=-1></label>
	</aria-toolbar>
	<p><a href=#>Focusable element between the toolbars</a></p>
	<aria-toolbar class="tool-bar" aria-orientation=vertical aria-label="Edit">
		<button type=button tabindex=-1><aria-icon fetch name=scissors></aria-icon></button>
		<button type=button tabindex=-1 disabled class="bad"><aria-icon fetch name=clipboard-copy></aria-icon></button>
		<button type=button tabindex=-1><aria-icon fetch name=clipboard-paste></aria-icon></button>
		<hr>
		<button type=button tabindex=-1><aria-icon fetch name=text-align-start></aria-icon></button>
		<button type=button tabindex=-1><aria-icon fetch name=text-align-center></aria-icon></button>
		<button type=button tabindex=-1 aria-disabled class="bad"><aria-icon fetch name=text-align-end></aria-icon></button>
		<button type=button tabindex=-1><aria-icon fetch name=text-align-justify></aria-icon></button>
	</aria-toolbar>
	<p><a href=#>Focusable element after the toolbar</a></p>
</figure>
<script type=module src=/dist/js/icon.js></script>
<script type=module src=/dist/js/toolbar.js></script>
