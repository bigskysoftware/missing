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
	<h3>The different types of buttons</h3>
	<div class="flex-column">
    <div>
  		<button onclick="alert('You clicked an ordinary button that had an `onclick` handler.')">
  			Ordinary
  		</button>
    </div>
    <div>
  		<button aria-pressed=false onclick="this.ariaPressed = (this.ariaPressed !== 'true')">
  			Toggle
  		</button>
    </div>
    <div>
      <button aria-haspopup=menu aria-controls=my-menu aria-expanded=false>
        Menu
      </button>
      <div role=menu hidden id=my-menu>
        <a role=menuitem>View</a>
        <a role=menuitem>Edit</a>
        <a role=menuitem>Delete</a>
      </div>
    </div>
    <div>
  		<button disabled>
  			Disabled
  		</button>
    </div>
	</div>
</figure>

<script type=module src=/dist/js/menu.js></script>
