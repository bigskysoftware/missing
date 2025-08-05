---
draft: true
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
   text: Move focus to the previous item.
 - keys: ["Right Arrow"]
   text: Move focus to the next item.
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


{{ include "demo_kbd.vto" }}


## Example

<noscript>

This example requires JavaScript to be activated.

</noscript>

<figure>
	<div class="container flex-column">
		<a href=#>Focusable element before the toolbar</a>
		<section class="tool-bar">
			<button type=button>Cut</button>
			<button type=button>Copy</button>
			<button type=button>Paste</button>
			<hr aria-orientation=vertical>
			<label>Find: <input type=text></label>
		</section>
		<a href=#>Focusable element after the toolbar</a>
	</div>
</figure>
