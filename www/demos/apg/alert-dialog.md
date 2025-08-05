---
title: Alert and Message Dialog
templateEngine: [vento, md]
apg:
 quote: |
  An alert dialog is a modal dialog that interrupts the user's workflow to communicate an important message and acquire a response.
  Examples include action confirmation prompts and error message confirmations.
  The alertdialog role enables assistive technologies and browsers to distinguish alert dialogs from other dialogs so they have the option of giving alert dialogs special treatment, such as playing a system alert sound.
 url: https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/
shortcuts:
 - keys: ["Tab"]
   text: Move focus to the next focusable element in the dialog, with wrap-around.
 - keys: ["Shift", "Tab"]
   text: Move focus to the previous focusable element in the dialog, with wrap-around.
 - keys: ["Escape"]
   text: Closes the dialog.
---

## Notes

Missing.css uses the `<dialog role=alertdialog>`{ .language-html } element for alert dialogs.
You can use colorways to provide some visual context to the alert, but be sure to also spell it out in writing.

Until the `commandfor`{.token .attr-name} attribute gains wider implementation, visibility must be controlled by JavaScript using the `.showModal()`{ .language-js } and `.close()`{ .language-js } methods.
While `<dialog id=my-dialog popover>`{ .language-html } and `<button popovertarget=my-dialog>`{ .language-html } might appear to work, the Popover API does not render the dialog as a <em>modal</em>, that is to say it will not block interaction with the rest of the page until the dialog is closed.

Don't forget to add an ARIA label to the `<dialog>`{ .language-html } element.
The `<dialog>`{ .language-html } element should also contain a `aria-describedby`{ .token .attr-name } reference to the element containing the alert message.


{{ include "demo_kbd.vto" }}


## Example

<noscript>

This example requires JavaScript to be activated.

</noscript>

<figure>
	<button onclick="this.nextElementSibling.showModal();">Delete</button>
	<dialog role=alertdialog class="bad bg" aria-labelledby=alert-label aria-describedby="alert-description">
		<strong id=alert-label class="block titlebar">Confirmation</strong>
		<p id=alert-description>
			Are you sure you want to delete this?
		</p>
		<div class="flex-row justify-content:end">
			<button onclick="this.closest('dialog').close()">Cancel</button>
			<strong><button onclick="this.closest('dialog').close()">Delete</button></strong>
		</div>
	</dialog>
</figure>
