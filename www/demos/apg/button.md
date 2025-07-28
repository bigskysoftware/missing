---
title: Button
templateEngine: [vento, md]
apg:
 quote: |
  A button is a widget that enables users to trigger an action or event, such as submitting a form, opening a dialog, canceling an action, or performing a delete operation.
 url: https://www.w3.org/WAI/ARIA/apg/patterns/button/
shortcuts:
 - keys: ["Enter"]
   text: Activate the button (when focused).
 - keys: ["Space"]
   text: Activate the button (when focused).
---


## Notes

Missing.css uses the `<button>`{ .language-html } element for buttons.
Buttons can be one of the following types:

Ordinary button
:	The basic button can trigger an action or event.

Toggle button
:	A two-state button that can be either off (not pressed) or on (pressed).
	State is determined by the `aria-pressed`{ .token .attr-name } attribute.

Menu button
:	A button that reveals a hidden menu.
	<!-- Can be used with missing.js' `<aria-menu>`{ .language-html } custom element.-->

Any of the above buttons can also be disabled using the `disabled`{ .token .attr-name } attribute.


{{ include "demo_kbd.vto" }}


## Example

<noscript>

This example requires JavaScript to be activated.

</noscript>

<figure>
	<script type=module src=/dist/js/menu.js></script>

	<div>
		<h3>The different types of buttons</h3>

		<button onclick="alert('You clicked an ordinary button that had an `onclick` handler.')">
			Ordinary
		</button>

		<button aria-pressed=false onclick="this.ariaPressed = (this.ariaPressed !== 'true')">
			Toggle
		</button>

		<button aria-controls=my-menu>
			Menu 1
		</button>
		<aria-menu id=my-menu hidden>
			<aria-menuitem>Create</aria-menuitem>
			<aria-menuitem>Read</aria-menuitem>
			<aria-menuitem>Update</aria-menuitem>
			<aria-menuitem>Delete</aria-menuitem>
		</aria-menu>

		<button aria-controls=my-menu>
			Menu 2
		</button>
		<menu id=my-menu hidden>
			<li>Create
			<li>Read
			<li>Update
			<li>Delete
		</menu>

		<button disabled>
			Disabled
		</button>


	</div>
</figure>
