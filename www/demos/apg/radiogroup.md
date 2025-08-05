---
title: Radio Group
templateEngine: [vento, md]
apg:
 quote: |
  A radio group is a set of checkable buttons, known as radio buttons, where no more than one of the buttons can be checked at a time.
  Some implementations may initialize the set with all buttons in the unchecked state in order to force the user to check one of the buttons before moving past a certain point in the workflow.
 url: https://www.w3.org/WAI/ARIA/apg/patterns/radio/
shortcuts:
 - keys: ["Space"]
   text: Selects the radioselect (when focused but unselected).
 - keys: ["Down Arrow"]
   text: Moves focus to the next radioselect and selects it.
 - keys: ["Up Arrow"]
   text: Moves focus to the previous radioselect and selects it.
---


## Notes

Missing.css uses the `<fieldset role=radiogroup>`{ .language-html } and `<input type=radio name=foo>`{ .language-html } elements for radio groups.
We also provide an [alternative markup][] for radiogroups used in [tabular forms][].

[alternative markup]: /docs/forms/#labeling-radio-buttons
[tabular forms]: /docs/forms/#tabular-forms


{{ include "demo_kbd.vto" }}


## Example

<figure>
	<fieldset role=radiogroup>
		<legend>Color</legend>
		<ul role=list>
			<li><label><input type=radio name=color value="ff0000"> Red</label>
			<li><label><input type=radio name=color value="00ff00"> Green</label>
			<li><label><input type=radio name=color value="0000ff"> Blue</label>
		</ul>
	</fieldset>
	<hr>
	<form class="table rows">
		<div role=radiogroup aria-labelledby=color-lbl>
			<span id=color-lbl>Color</span>
			<div>
				<div><label><input type=radio name=color value="ff0000"> Red</label></div>
				<div><label><input type=radio name=color value="00ff00"> Green</label></div>
				<div><label><input type=radio name=color value="0000ff"> Blue</label></div>
			</div>
		</div>
	</form>
</figure>
