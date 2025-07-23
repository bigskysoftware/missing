---
layout: demo.vto
title: Dialog (Modal)
templateEngine: [vento, md]
apg:
 quote: |
   A dialog is a window overlaid on either the primary window or another dialog window.
   Windows under a modal dialog are inert.
   That is, users cannot interact with content outside an active dialog window.
   Inert content outside an active dialog is typically visually obscured or dimmed so it is difficult to discern, and in some implementations, attempts to interact with the inert content cause the dialog to close.
 url: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
shortcuts:
 - keys: ["Tab"]
   text: Move focus to the next focusable element in the dialog, with wrap-around.
 - keys: ["Shift", "Tab"]
   text: Move focus to the previous focusable element in the dialog, with wrap-around.
 - keys: ["Escape"]
   text: Closes the dialog.
---


## Notes

Missing.css uses the `<dialog>`{ .language-html } element for dialogs (modals).

Until the `commandfor`{ .token .attr-name } attribute gains wider implementation, visibility must be controlled by JavaScript using the `.showModal()`{ .language-html } and `.close()`{ .language-html } methods.
While `<dialog id=my-dialog popover>`{ .language-html } and `<button popovertarget=my-dialog>`{ .language-html } might appear to work, the Popover API does not render the dialog as a <em>modal</em>, that is to say it will not block interaction with the rest of the page until the dialog is closed.

Don't forget to add an ARIA label to the `<dialog>`{ .language-html } element.


{{ include "demo_kbd.vto" }}


## Example

<figure>
  <button onclick="this.nextElementSibling.showModal();">Edit Profile</button>
  <dialog aria-labelledby=user-info-label>
    <strong id=user-info-label class="block titlebar">User Information</strong>
    <div class="table rows with padding-block">
      <p>
        <label for=name>Name</label>
        <input type=text id=name name=name value="Tim Berners-Lee">
      <p>
        <label for=email>Email</label>
        <input type=email id=email name=email value="timbl@www.com">
      <p>
        <label for=occupation>Occupation</label>
        <input type=text id=occupation name=occupation value="Wizard">
    </div>
    <div class="flex-row justify-content:end">
      <button onclick="this.closest('dialog').close()">Update</button>
      <button onclick="this.closest('dialog').close()">Close</button>
    </div>
  </dialog>
  <button onclick="this.nextElementSibling.showModal();">Read Terms</button>
  <dialog aria-labelledby=terms-label>
    <strong id=terms-label class="block titlebar">Terms of Use</strong>
    <p>
    By clicking "Disagree" you confirm that you actually do agree with these terms of service.
    <div class="flex-row justify-content:end">
      <button onclick="this.closest('dialog').close()">Agree</button>
      <button onclick="this.closest('dialog').close()">Disagree</button>
    </div>
  </dialog>
</figure>
