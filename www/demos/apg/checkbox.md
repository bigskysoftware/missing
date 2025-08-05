---
title: Checkbox
templateEngine: [vento, md]
apg:
 quote: |
  WAI-ARIA supports two types of checkbox widgets&colon; dual-state checkboxes toggle between two choices&mdash;checked and not checked&mdash;and tri-state checkboxes, which allow an additional third state known as partially checked.
 url: https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/
shortcuts:
 - keys: ["Tab"]
   text: Moves focus to the next item.
 - keys: ["Space"]
   text: Changes the state of the checkbox (when focused).
---

## Notes

Missing.css uses the `<input type=checkbox>`{ .language-html } element for checkboxes.


{{ include "demo_kbd.vto" }}


## Example

<figure>
	<fieldset>
		<legend>Sandwich Condiments</legend>
			<label><input type=checkbox name=all> All Condiments</label>
			<ul role=list class="margin-inline">
			<li><label><input type=checkbox name=lettuce> Lettuce</label>
			<li><label><input type=checkbox name=tomato> Tomato</label>
			<li><label><input type=checkbox name=mustard> Mustard</label>
			<li><label><input type=checkbox name=sprouts> Sprouts</label>
			</ul>
		</ul>
	</fieldset>
</figure>

</main>
