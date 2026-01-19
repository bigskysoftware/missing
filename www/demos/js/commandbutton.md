---
title: Command Button
templateEngine: [vento, md]
shortcuts:
 - keys: ["Enter"]
   text: Trigger the command on the specified element.
 - keys: ["Space"]
   text: Trigger the command on the specified element.
---


## Notes

Missing.js provides a behavior polyfill for the [Invoker Commands API][invoker-api-mdn].

Pressing a `<button command=--foo commandfor=id>`{ .language-html } will trigger a (polyfilled) [`CommandEvent`][whatwg-commandevent] on the element whose id matches the `commandfor`{ .token .attr-name } attribute.
The `command`{ .token .attr-name } attribute is an [enumerated attribute][whatwg-command]:

| Value              | Method                     |
|--------------------|----------------------------|
| `toggle-popover`   | `.togglePopover()`         |
| `show-popover`     | `.showPopover()`           |
| `hide-popover`     | `.hidePopover()`           |
| `close`            | `.close()`                 |
| `request-close`    | `.requestClose()`          |
| `show-modal`       | `.showModal()`             |
| `--custom-command` | Must be prefixed with `--` |

{ .width:100% }

If the `command`{ .token .attr-name } value corresponds with an enumerated method, then the method will be called on the target.
The `CommandEvent`{ .language-js } will be fired regardless.

If `commandfor`{ .token .attr-name } references an element with the `popover`{ .token .attr-name } attribute,
the polyfill will correctly set `aria-expands`{ .token .attr-name } and `aria-details`{ .token .attr-name } as
outlined in the [HTML Accessibility API Mappings][html-aria-mapping].

TODO: Discuss re-initialization of dynamic content.

[invoker-api-mdn]: https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API
[whatwg-commandevent]: https://html.spec.whatwg.org/multipage/interaction.html#commandevent
[whatwg-command]: https://html.spec.whatwg.org/multipage/form-elements.html#attr-button-command
[html-aria-mapping]: https://www.w3.org/TR/html-aam-1.0/#att-command-popovers

{{ include "demo_kbd.vto" }}


## Example

<noscript>

This example requires JavaScript to be activated.

</noscript>

<figure>
	<div role=toolbar>
		<button commandfor=dialog command=show-modal>
			Modal
		</button>
		<button commandfor=popover-dialog command=show-popover>
			Popover
		</button>
		<button commandfor=custom command=--my-custom-command>
			Custom
		</button>
	</div>
	<dialog id=dialog class="info" style="width: 48ch;">
		<strong class="titlebar">Info</strong>
		<p>Wow, that was easy!
        <p>This dialog is not a popover, so it will require a "Close" button or pressing "Escape".
		<div class="flex-row justify-content:end">
			<button commandfor=dialog command=close>
				Close
			</button>
		</div>
	</dialog>
	<dialog id=popover-dialog class="ok" popover style="width: 48ch;">
		<strong class="titlebar">Popover Dialog</strong>
		<p>This dialog uses the Popover API and has "light dismiss" available by clicking outside the dialog.
        <p>The "Close" button is not required, but could be used with the <code class="token attr-value">hide-popover</code> command.
		<div class="flex-row justify-content:end">
			<button commandfor=popover-dialog command=hide-popover>
				Close
			</button>
		</div>
	</dialog>
	<div id=custom hidden>
		<script>
			document.getElementById("custom").addEventListener("command", (e) => {
				alert(`The custom command "${e.command}" was triggered by "${e.source}"`)
			})
		</script>
	</div>
</figure>

<script type=module src=/dist/js/command.js></script>
