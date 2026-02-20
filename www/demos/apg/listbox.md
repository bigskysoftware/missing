---

title: Listbox
templateEngine: [vento, md]
apg:
 quote: |
  A listbox widget presents a list of options and allows a user to select one or more of them.
  A listbox that allows a single option to be chosen is a single-select listbox; one that allows multiple options to be selected is a multi-select listbox.
 url: https://www.w3.org/WAI/ARIA/apg/patterns/listbox/
shortcuts:
 - keys: ["Down Arrow"]
   text: Moves focus to the next option.
 - keys: ["Up Arrow"]
   text: Moves focus to the previous option.
 - keys: ["Home"]
   text: Moves focus to first option.
 - keys: ["End"]
   text: Moves focus to last option.
---


## Notes

Missing.css provides the following custom elements for listboxes:

- `<aria-listbox>`{ .language-html }
- `<aria-group>`{ .language-html }
- `<aria-option>`{ .language-html }

`<aria-listbox>`{ .language-html } is a [Form Associated Custom Element][face] and can be used with or without a `<form>`{ .language-html }.

Similar to the [`selected`{ .token .attr-name } HTML attribute][selected] for `<option>`{ .language-html } elements,
default state can be specified using `<aria-option selected>`{ .language-html }.
To actually set the selected state of an `<aria-option>`{ .language-html }, the `[aria-selected=true]`{ .token .attr-name } HTML attribute should be used.
When a listbox contains both elements with `[selected]`{ .token .attr-name } and elements with `[aria-selected=true]`{ .token .attr-name }, the latter ones will take precedence in order to preserve state when a live DOM tree is stringified and restored.
This can be observed by clicking the "reset" button below.

[face]: https://html.spec.whatwg.org/dev/custom-elements.html#form-associated-custom-element
[selected]: https://html.spec.whatwg.org/multipage/form-elements.html#attr-option-selected

{{ include "demo_kbd.vto" }}


## Example

<noscript>

This example requires JavaScript to be activated.

</noscript>

<figure>
	<style>
		aria-listbox.box {
			padding-block: 0;
			margin-block-start: 0;
			/*overflow: auto;
			max-height: 300px;*/
		}
	</style>
	<script>
		function logFormData() {
			event.preventDefault()
			const data = new FormData(event.target)
			console.log([...data.entries()])
			alert('Form data has been logged to console.')
		}
	</script>
	<p class="bad box">
		<strong>NOTE:</strong> On Firefox, <code>aria-listbox { overflow: auto; max-height: 300px }</code> must be disabled.
		More information is avaiable at <a href="https://codepen.io/dr_ironbeard/pen/pvgOzrG">this CodePen</a>.
	</p>
	<form onsubmit="logFormData()">
	<label for=single-listbox>ARIA APG Patterns</label>
	<aria-listbox id=single-listbox name=single class="box">
		<aria-option id=o1 value=accordion>
			<aria-icon fetch slot=leading name=check></aria-icon>
			<span>Accordion</span>
			<aria-actions slot=trailing>
			<button type=button commandfor=o1 command=--move-up aria-label="Move up" class="info">
				<aria-icon fetch slot=icon name=move-up></aria-icon>
			</button>
			<button type=button commandfor=o1 command=--move-down aria-label="Move down" class="info">
				<aria-icon fetch slot=icon name=move-down></aria-icon>
			</button>
			<button type=button commandfor=o1 command=--delete aria-label="Delete" class="bad">
				<aria-icon fetch slot=icon name=trash></aria-icon>
			</button>
			</aria-actions>
		</aria-option>
		<aria-option id=o2 value=alert>
			<aria-icon fetch slot=leading name=check></aria-icon>
			<span>Alert</span>
			<aria-actions slot=trailing>
				<button type=button commandfor=o2 command=--move-up aria-label="Move up" class="info">
					<aria-icon fetch slot=icon name=move-up></aria-icon>
				</button>
				<button type=button commandfor=o2 command=--move-down aria-label="Move down" class="info">
					<aria-icon fetch slot=icon name=move-down></aria-icon>
				</button>
				<button type=button commandfor=o2 command=--delete aria-label="Delete" class="bad">
					<aria-icon fetch slot=icon name=trash></aria-icon>
				</button>
			</aria-actions>
		</aria-option>
		<aria-option id=o3 value=alertdialog aria-selected=true>
			<aria-icon fetch slot=leading name=check></aria-icon>
			<span>Alert and Message Dialogs</span>
			<aria-actions slot=trailing>
				<button type=button commandfor=o3 command=--move-up aria-label="Move up" class="info">
					<aria-icon fetch slot=icon name=move-up></aria-icon>
				</button>
				<button type=button commandfor=o3 command=--move-down aria-label="Move down" class="info">
					<aria-icon fetch slot=icon name=move-down></aria-icon>
				</button>
				<button type=button commandfor=o3 command=--delete aria-label="Delete" class="bad">
					<aria-icon fetch slot=icon name=trash></aria-icon>
				</button>
			</aria-actions>
		</aria-option>
		<aria-option id=o4 value=breadcrumb>
			Breadcrumb
			<aria-actions slot=trailing>
				<button type=button commandfor=o4 command=--move-up aria-label="Move up" class="info">
					<aria-icon fetch slot=icon name=move-up></aria-icon>
				</button>
				<button type=button commandfor=o4 command=--move-down aria-label="Move down" class="info">
					<aria-icon fetch slot=icon name=move-down></aria-icon>
				</button>
				<button type=button commandfor=o4 command=--delete aria-label="Delete" class="bad">
					<aria-icon fetch slot=icon name=trash></aria-icon>
				</button>
			</aria-actions>
		</aria-option>
		<aria-option id=o5 value=button>
			Button
			<aria-actions slot=trailing>
				<button type=button commandfor=o5 command=--move-up aria-label="Move up" class="info">
					<aria-icon fetch slot=icon name=move-up></aria-icon>
				</button>
				<button type=button commandfor=o5 command=--move-down aria-label="Move down" class="info">
					<aria-icon fetch slot=icon name=move-down></aria-icon>
				</button>
				<button type=button commandfor=o5 command=--delete aria-label="Delete" class="bad">
					<aria-icon fetch slot=icon name=trash></aria-icon>
				</button>
			</aria-actions>
		</aria-option>
		<aria-option id=o6 value=carousel>
			Carousel
			<aria-actions slot=trailing>
				<button type=button commandfor=o6 command=--move-up aria-label="Move up" class="info">
					<aria-icon fetch slot=icon name=move-up></aria-icon>
				</button>
				<button type=button commandfor=o6 command=--move-down aria-label="Move down" class="info">
					<aria-icon fetch slot=icon name=move-down></aria-icon>
				</button>
				<button type=button commandfor=o6 command=--delete aria-label="Delete" class="bad">
					<aria-icon fetch slot=icon name=trash></aria-icon>
				</button>
			</aria-actions>
		</aria-option>
		<aria-option id=o7 value=checkbox>
			Checkbox
			<aria-actions slot=trailing>
				<button type=button commandfor=o7 command=--move-up aria-label="Move up" class="info">
					<aria-icon fetch slot=icon name=move-up></aria-icon>
				</button>
				<button type=button commandfor=o7 command=--move-down aria-label="Move down" class="info">
					<aria-icon fetch slot=icon name=move-down></aria-icon>
				</button>
				<button type=button commandfor=o7 command=--delete aria-label="Delete" class="bad">
					<aria-icon fetch slot=icon name=trash></aria-icon>
				</button>
			</aria-actions>
		</aria-option>
		<aria-option id=o8 value=combobox>
			Combobox
			<aria-actions slot=trailing>
				<button type=button commandfor=o8 command=--move-up aria-label="Move up" class="info">
					<aria-icon fetch slot=icon name=move-up></aria-icon>
				</button>
				<button type=button commandfor=o8 command=--move-down aria-label="Move down" class="info">
					<aria-icon fetch slot=icon name=move-down></aria-icon>
				</button>
				<button type=button commandfor=o8 command=--delete aria-label="Delete" class="bad">
					<aria-icon fetch slot=icon name=trash></aria-icon>
				</button>
			</aria-actions>
		</aria-option>
		<aria-option id=o9 value=dialog>
			Dialog (Modal)
			<aria-actions slot=trailing>
				<button type=button commandfor=o9 command=--move-up aria-label="Move up" class="info">
					<aria-icon fetch slot=icon name=move-up></aria-icon>
				</button>
				<button type=button commandfor=o9 command=--move-down aria-label="Move down" class="info">
					<aria-icon fetch slot=icon name=move-down></aria-icon>
				</button>
				<button type=button commandfor=o9 command=--delete aria-label="Delete" class="bad">
					<aria-icon fetch slot=icon name=trash></aria-icon>
				</button>
			</aria-actions>
		</aria-option>
		<aria-option id=o10 value=disclosure>
			Disclosure
			<aria-actions slot=trailing>
				<button type=button commandfor=o10 command=--move-up aria-label="Move up" class="info">
					<aria-icon fetch slot=icon name=move-up></aria-icon>
				</button>
				<button type=button commandfor=o10 command=--move-down aria-label="Move down" class="info">
					<aria-icon fetch slot=icon name=move-down></aria-icon>
				</button>
				<button type=button commandfor=o10 command=--delete aria-label="Delete" class="bad">
					<aria-icon fetch slot=icon name=trash></aria-icon>
				</button>
			</aria-actions>
		</aria-option>
		<aria-option id=o11 value=feed>
			Feed
			<aria-actions slot=trailing>
				<button type=button commandfor=o11 command=--move-up aria-label="Move up" class="info">
					<aria-icon fetch slot=icon name=move-up></aria-icon>
				</button>
				<button type=button commandfor=o11 command=--move-down aria-label="Move down" class="info">
					<aria-icon fetch slot=icon name=move-down></aria-icon>
				</button>
				<button type=button commandfor=o11 command=--delete aria-label="Delete" class="bad">
					<aria-icon fetch slot=icon name=trash></aria-icon>
				</button>
			</aria-actions>
		</aria-option>
		<aria-option id=o12 value=grid>
			Grid
			<aria-actions slot=trailing>
				<button type=button commandfor=o12 command=--move-up aria-label="Move up" class="info">
					<aria-icon fetch slot=icon name=move-up></aria-icon>
				</button>
				<button type=button commandfor=o12 command=--move-down aria-label="Move down" class="info">
					<aria-icon fetch slot=icon name=move-down></aria-icon>
				</button>
				<button type=button commandfor=o12 command=--delete aria-label="Delete" class="bad">
					<aria-icon fetch slot=icon name=trash></aria-icon>
				</button>
			</aria-actions>
		</aria-option>
		<aria-option id=o13 value=landmarks>
			Landmarks
			<aria-actions slot=trailing>
				<button type=button commandfor=o13 command=--move-up aria-label="Move up" class="info">
					<aria-icon fetch slot=icon name=move-up></aria-icon>
				</button>
				<button type=button commandfor=o13 command=--move-down aria-label="Move down" class="info">
					<aria-icon fetch slot=icon name=move-down></aria-icon>
				</button>
				<button type=button commandfor=o13 command=--delete aria-label="Delete" class="bad">
					<aria-icon fetch slot=icon name=trash></aria-icon>
				</button>
			</aria-actions>
		</aria-option>
		<aria-option id=o14 value=link>
			Link
			<aria-actions slot=trailing>
				<button type=button commandfor=o14 command=--move-up aria-label="Move up" class="info">
					<aria-icon fetch slot=icon name=move-up></aria-icon>
				</button>
				<button type=button commandfor=o14 command=--move-down aria-label="Move down" class="info">
					<aria-icon fetch slot=icon name=move-down></aria-icon>
				</button>
				<button type=button commandfor=o14 command=--delete aria-label="Delete" class="bad">
					<aria-icon fetch slot=icon name=trash></aria-icon>
				</button>
			</aria-actions>
		</aria-option>
		<aria-option id=o15 value=listbox selected>
			Listbox
			<aria-actions slot=trailing>
				<button type=button commandfor=o15 command=--move-up aria-label="Move up" class="info">
					<aria-icon fetch slot=icon name=move-up></aria-icon>
				</button>
				<button type=button commandfor=o15 command=--move-down aria-label="Move down" class="info">
					<aria-icon fetch slot=icon name=move-down></aria-icon>
				</button>
				<button type=button commandfor=o15 command=--delete aria-label="Delete" class="bad">
					<aria-icon fetch slot=icon name=trash></aria-icon>
				</button>
			</aria-actions>
		</aria-option>
		<aria-option id=o16 value=menubar>
			Menu and Menubar
			<aria-actions slot=trailing>
				<button type=button commandfor=o16 command=--move-up aria-label="Move up" class="info">
					<aria-icon fetch slot=icon name=move-up></aria-icon>
				</button>
				<button type=button commandfor=o16 command=--move-down aria-label="Move down" class="info">
					<aria-icon fetch slot=icon name=move-down></aria-icon>
				</button>
				<button type=button commandfor=o16 command=--delete aria-label="Delete" class="bad">
					<aria-icon fetch slot=icon name=trash></aria-icon>
				</button>
			</aria-actions>
		</aria-option>
		<aria-option id=o17 value=menubutton>
			Menu Button
			<aria-actions slot=trailing>
				<button type=button commandfor=o17 command=--move-up aria-label="Move up" class="info">
					<aria-icon fetch slot=icon name=move-up></aria-icon>
				</button>
				<button type=button commandfor=o17 command=--move-down aria-label="Move down" class="info">
					<aria-icon fetch slot=icon name=move-down></aria-icon>
				</button>
				<button type=button commandfor=o17 command=--delete aria-label="Delete" class="bad">
					<aria-icon fetch slot=icon name=trash></aria-icon>
				</button>
			</aria-actions>
		</aria-option>
		<aria-option id=o18 value=meter
			>Meter
			<aria-actions slot=trailing>
				<button type=button commandfor=o18 command=--move-up aria-label="Move up" class="info">
					<aria-icon fetch slot=icon name=move-up></aria-icon>
				</button>
				<button type=button commandfor=o18 command=--move-down aria-label="Move down" class="info">
					<aria-icon fetch slot=icon name=move-down></aria-icon>
				</button>
				<button type=button commandfor=o18 command=--delete aria-label="Delete" class="bad">
					<aria-icon fetch slot=icon name=trash></aria-icon>
				</button>
			</aria-actions>
		</aria-option>
		<aria-option id=o19 value=radio>
			Radio Group
			<aria-actions slot=trailing>
				<button type=button commandfor=o19 command=--move-up aria-label="Move up" class="info">
					<aria-icon fetch slot=icon name=move-up></aria-icon>
				</button>
				<button type=button commandfor=o19 command=--move-down aria-label="Move down" class="info">
					<aria-icon fetch slot=icon name=move-down></aria-icon>
				</button>
				<button type=button commandfor=o19 command=--delete aria-label="Delete" class="bad">
					<aria-icon fetch slot=icon name=trash></aria-icon>
				</button>
			</aria-actions>
		</aria-option>
		<aria-option id=o20 value=slider>
			Slider
			<aria-actions slot=trailing>
				<button type=button commandfor=o20 command=--move-up aria-label="Move up" class="info">
					<aria-icon fetch slot=icon name=move-up></aria-icon>
				</button>
				<button type=button commandfor=o20 command=--move-down aria-label="Move down" class="info">
					<aria-icon fetch slot=icon name=move-down></aria-icon>
				</button>
				<button type=button commandfor=o20 command=--delete aria-label="Delete" class="bad">
					<aria-icon fetch slot=icon name=trash></aria-icon>
				</button>
			</aria-actions>
		</aria-option>
		<aria-option id=o21 value=slider-multi>
			Slider (Multi-Thumb)
			<aria-actions slot=trailing>
				<button type=button commandfor=o21 command=--move-up aria-label="Move up" class="info">
					<aria-icon fetch slot=icon name=move-up></aria-icon>
				</button>
				<button type=button commandfor=o21 command=--move-down aria-label="Move down" class="info">
					<aria-icon fetch slot=icon name=move-down></aria-icon>
				</button>
				<button type=button commandfor=o21 command=--delete aria-label="Delete" class="bad">
					<aria-icon fetch slot=icon name=trash></aria-icon>
				</button>
			</aria-actions>
		</aria-option>
		<aria-option id=o22 value=spinbutton>
			Spinbutton
			<aria-actions slot=trailing>
				<button type=button commandfor=o22 command=--move-up aria-label="Move up" class="info">
					<aria-icon fetch slot=icon name=move-up></aria-icon>
				</button>
				<button type=button commandfor=o22 command=--move-down aria-label="Move down" class="info">
					<aria-icon fetch slot=icon name=move-down></aria-icon>
				</button>
				<button type=button commandfor=o22 command=--delete aria-label="Delete" class="bad">
					<aria-icon fetch slot=icon name=trash></aria-icon>
				</button>
			</aria-actions>
		</aria-option>
		<aria-option id=o23 value=switch>
			Switch
			<aria-actions slot=trailing>
				<button type=button commandfor=o23 command=--move-up aria-label="Move up" class="info">
					<aria-icon fetch slot=icon name=move-up></aria-icon>
				</button>
				<button type=button commandfor=o23 command=--move-down aria-label="Move down" class="info">
					<aria-icon fetch slot=icon name=move-down></aria-icon>
				</button>
				<button type=button commandfor=o23 command=--delete aria-label="Delete" class="bad">
					<aria-icon fetch slot=icon name=trash></aria-icon>
				</button>
			</aria-actions>
		</aria-option>
		<aria-option id=o24 value=table>
			Table
			<aria-actions slot=trailing>
				<button type=button commandfor=o24 command=--move-up aria-label="Move up" class="info">
					<aria-icon fetch slot=icon name=move-up></aria-icon>
				</button>
				<button type=button commandfor=o24 command=--move-down aria-label="Move down" class="info">
					<aria-icon fetch slot=icon name=move-down></aria-icon>
				</button>
				<button type=button commandfor=o24 command=--delete aria-label="Delete" class="bad">
					<aria-icon fetch slot=icon name=trash></aria-icon>
				</button>
			</aria-actions>
		</aria-option>
		<aria-option id=o25  value=tabs>
			Tabs
			<aria-actions slot=trailing>
				<button type=button commandfor=o25 command=--move-up aria-label="Move up" class="info">
					<aria-icon fetch slot=icon name=move-up></aria-icon>
				</button>
				<button type=button commandfor=o25 command=--move-down aria-label="Move down" class="info">
					<aria-icon fetch slot=icon name=move-down></aria-icon>
				</button>
				<button type=button commandfor=o25 command=--delete aria-label="Delete" class="bad">
					<aria-icon fetch slot=icon name=trash></aria-icon>
				</button>
			</aria-actions>
		</aria-option>
		<aria-option id=o26  value=toolbar>
			Toolbar
			<aria-actions slot=trailing>
				<button type=button commandfor=o26 command=--move-up aria-label="Move up" class="info">
					<aria-icon fetch slot=icon name=move-up></aria-icon>
				</button>
				<button type=button commandfor=o26 command=--move-down aria-label="Move down" class="info">
					<aria-icon fetch slot=icon name=move-down></aria-icon>
				</button>
				<button type=button commandfor=o26 command=--delete aria-label="Delete" class="bad">
					<aria-icon fetch slot=icon name=trash></aria-icon>
				</button>
			</aria-actions>
		</aria-option>
		<aria-option id=o27 value=tooltip>
			Tooltip
			<aria-actions slot=trailing>
				<button type=button commandfor=o27 command=--move-up aria-label="Move up" class="info">
					<aria-icon fetch slot=icon name=move-up></aria-icon>
				</button>
				<button type=button commandfor=o27 command=--move-down aria-label="Move down" class="info">
					<aria-icon fetch slot=icon name=move-down></aria-icon>
				</button>
				<button type=button commandfor=o27 command=--delete aria-label="Delete" class="bad">
					<aria-icon fetch slot=icon name=trash></aria-icon>
				</button>
			</aria-actions>
		</aria-option>
		<aria-option id=o28 value=treeview>
			Tree View
			<aria-actions slot=trailing>
				<button type=button commandfor=o28 command=--move-up aria-label="Move up" class="info">
					<aria-icon fetch slot=icon name=move-up></aria-icon>
				</button>
				<button type=button commandfor=o28 command=--move-down aria-label="Move down" class="info">
					<aria-icon fetch slot=icon name=move-down></aria-icon>
				</button>
				<button type=button commandfor=o28 command=--delete aria-label="Delete" class="bad">
					<aria-icon fetch slot=icon name=trash></aria-icon>
				</button>
			</aria-actions>
		</aria-option>
		<aria-option id=o29 value=treegrid>
			Treegrid
			<aria-actions slot=trailing>
				<button type=button commandfor=o29 command=--move-up aria-label="Move up" class="info">
					<aria-icon fetch slot=icon name=move-up></aria-icon>
				</button>
				<button type=button commandfor=o29 command=--move-down aria-label="Move down" class="info">
					<aria-icon fetch slot=icon name=move-down></aria-icon>
				</button>
				<button type=button commandfor=o29 command=--delete aria-label="Delete" class="bad">
					<aria-icon fetch slot=icon name=trash></aria-icon>
				</button>
			</aria-actions>
		</aria-option>
		<aria-option id=o30 value=window-splitter>
			Window Splitter
			<aria-actions slot=trailing>
				<button type=button commandfor=o30 command=--move-up aria-label="Move up" class="info">
					<aria-icon fetch slot=icon name=move-up></aria-icon>
				</button>
				<button type=button commandfor=o30 command=--move-down aria-label="Move down" class="info">
					<aria-icon fetch slot=icon name=move-down></aria-icon>
				</button>
				<button type=button commandfor=o30 command=--delete aria-label="Delete" class="bad">
					<aria-icon fetch slot=icon name=trash></aria-icon>
				</button>
			</aria-actions>
		</aria-option>
	</aria-listbox>
	<label for=multi-listbox>Multiple Select Listbox</label>
	<aria-listbox id=multi-listbox name=multi aria-multiselectable=true class="box">
		<aria-group label="Programming Languages">
			<aria-option value=javascript>JavaScript</aria-option>
			<aria-option value=typescript selected>TypeScript</aria-option>
			<aria-option value=python>Python</aria-option>
			<aria-option value=java>Java</aria-option>
			<aria-option value=go selected>Go</aria-option>
			<aria-option value=rust aria-selected=true>Rust</aria-option>
		</aria-group>
		<aria-group label="Bagels">
			<aria-option value=plain>Plain</aria-option>
			<aria-option value=everything>Everything</aria-option>
			<aria-option value=blueberry selected>Blueberry</aria-option>
			<aria-option value=cinnamon-raisin>Cinnamon Raisin</aria-option>
			<aria-option value=sesame aria-selected=true>Sesame</aria-option>
			<aria-option value=asiago>Asiago</aria-option>
		</aria-group>
	</aria-listbox>
	<div class="flex-row">
		<button type=reset>Reset</button>
		<button type=submit>Submit</button>
	</div>
	</form>
</figure>

<script>
document.querySelectorAll("aria-option[id]").forEach(o => {
	o.addEventListener("command", (e) => alert(`${o.id}: ${e.command}`))
})
</script>
<script type=module src=/dist/js/icon.js></script>
<script type=module src=/dist/js/listbox.js></script>
