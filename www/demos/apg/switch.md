---
title: Switch
templateEngine: [vento, md]
apg:
 quote: |
  A switch is an input widget that allows users to choose one of two values&colon; "on" or "off".
  Switches are similar to checkboxes and toggle buttons, which can also serve as binary inputs.
  One difference, however, is that switches can only be used for binary input while checkboxes and toggle buttons allow implementations the option of supporting a third middle state.
 url: https://www.w3.org/WAI/ARIA/apg/patterns/switch/
shortcuts:
 - keys: ["Space"]
   text: When focus is on the switch, changes the state of the switch.
---


## Notes


Missing.css uses the `<input type=checkbox role=switch>`{ .language-html } element for switches.

Indeterminate state cannot be set by attributes, JavaScript is required.
There is [ongoing discussion](https://github.com/w3c/aria-practices/issues/2647) about whether switches should support indeterminate state and whether they imply instanteous action.


{{ include "demo_kbd.vto" }}


## Example

<figure>
	<div class="flex-switch">
		<fieldset class="flex-column">
			<legend>Connectivity</legend>
			<label>
				<input type=checkbox role=switch name=internet>Internet
			</label>
			<label>
				<input type=checkbox role=switch name=bluetooth checked>Bluetooth
			</label>
			<label>
				<input type=checkbox role=switch name=dnd class="indeterminate">Location
			</label>
		</fieldset>
		<fieldset class="flex-column">
			<legend>Utilities</legend>
			<label class="justify-content:space-between">
				Do Not Disturb<input type=checkbox role=switch name=dnd>
			</label>
			<label class="justify-content:space-between">
				Flashlight<input type=checkbox role=switch name=flashlight checked>
			</label>
			<label class="justify-content:space-between">
				Battery Saver<input type=checkbox role=switch name=battery-saver class="indeterminate">
			</label>
		</fieldset>
	</div>
</figure>

<script>
	document.querySelectorAll('.indeterminate').forEach(el => {el.indeterminate = true;})
</script>
