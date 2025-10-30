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
- `<aria-optgroup>`{ .language-html }
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
		<aria-option value=accordion>Accordion</aria-option>
		<aria-option value=alert>Alert</aria-option>
		<aria-option value=alertdialog aria-selected=true>Alert and Message Dialogs</aria-option>
		<aria-option value=breadcrumb>Breadcrumb</aria-option>
		<aria-option value=button>Button</aria-option>
		<aria-option value=carousel>Carousel</aria-option>
		<aria-option value=checkbox>Checkbox</aria-option>
		<aria-option value=combobox>Combobox</aria-option>
		<aria-option value=dialog>Dialog (Modal)</aria-option>
		<aria-option value=disclosure>Disclosure</aria-option>
		<aria-option value=feed>Feed</aria-option>
		<aria-option value=grid>Grid</aria-option>
		<aria-option value=landmarks>Landmarks</aria-option>
		<aria-option value=link>Link</aria-option>
		<aria-option value=listbox selected>Listbox</aria-option>
		<aria-option value=menubar>Menu and Menubar</aria-option>
		<aria-option value=menubutton>Menu Button</aria-option>
		<aria-option value=meter>Meter</aria-option>
		<aria-option value=radio>Radio Group</aria-option>
		<aria-option value=slider>Slider</aria-option>
		<aria-option value=slider-multi>Slider (Multi-Thumb)</aria-option>
		<aria-option value=spinbutton>Spinbutton</aria-option>
		<aria-option value=switch>Switch</aria-option>
		<aria-option value=table>Table</aria-option>
		<aria-option value=tabs>Tabs</aria-option>
		<aria-option value=toolbar>Toolbar</aria-option>
		<aria-option value=tooltip>Tooltip</aria-option>
		<aria-option value=treeview>Tree View</aria-option>
		<aria-option value=treegrid>Treegrid</aria-option>
		<aria-option value=window-splitter>Window Splitter</aria-option>
	</aria-listbox>
	<label for=multi-listbox>Multiple Select Listbox</label>
	<aria-listbox id=multi-listbox name=multi aria-multiselectable=true class="box">
		<aria-optgroup label="Programming Languages">
			<aria-option value=javascript>JavaScript</aria-option>
			<aria-option value=typescript selected>TypeScript</aria-option>
			<aria-option value=python>Python</aria-option>
			<aria-option value=java>Java</aria-option>
			<aria-option value=go selected>Go</aria-option>
			<aria-option value=rust aria-selected=true>Rust</aria-option>
		</aria-optgroup>
		<aria-optgroup label="Bagels">
			<aria-option value=plain>Plain</aria-option>
			<aria-option value=everything>Everything</aria-option>
			<aria-option value=blueberry selected>Blueberry</aria-option>
			<aria-option value=cinnamon-raisin>Cinnamon Raisin</aria-option>
			<aria-option value=sesame aria-selected=true>Sesame</aria-option>
			<aria-option value=asiago>Asiago</aria-option>
		</aria-optgroup>
	</aria-listbox>
	<div class="flex-row">
		<button type=reset>Reset</button>
		<button type=submit>Submit</button>
	</div>
	</form>
</figure>

<script type=module src=/dist/js/listbox.js></script>
