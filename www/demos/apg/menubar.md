---
title: Menubar
templateEngine: [vento, md]
apg:
 quote: |
  A menu that is visually persistent is a menubar.
  A menubar is typically horizontal and is often used to create a menu bar similar to those found near the top of the window in many desktop applications, offering the user quick access to a consistent set of commands.
 url: https://www.w3.org/WAI/ARIA/apg/patterns/menubar/
shortcuts:
 - keys: ["Tab"]
   text: Tab in and out of the menubar, remembering previous focus.
 - keys: ["Shift", "Tab"]
   text: Tab in and out of the menubar, remembering previous focus.
 - keys: ["Left Arrow"]
   text: Move focus to the previous menuitem.
 - keys: ["Right Arrow"]
   text: Move focus to the next menuitem.
 - keys: ["Home"]
   text: Move focus to the first menuitem.
 - keys: ["End"]
   text: Move focus to the last menuitem.
 - keys: ["Enter"]
   text: Selects the focused menuitem or opens a submenu.
 - keys: ["Space"]
   text: Selects the focused menuitem or opens a submenu.
---


## Notes

Missing.js provides the following custom elements for menubars:
 - `<aria-menubar>`{ .language-html }
 - `<aria-menulist>`{ .language-html }
 - `<aria-menuitem>`{ .language-html }

See [Missing.js &sect; Menubar](/docs/js#menubar).

 - Don't forget to set an accessible label for the `<aria-menubar>`{ .language-html }.
 - Use `<aria-menubar wrap>`{ .language-html } if you want the menubar to wrap.


{{ include "demo_kbd.vto" }}


## Example

<noscript>

This example requires JavaScript to be activated.

</noscript>
<script type=module>
	import { on } from "/dist/js/19.js"
    const cmds = {
        "--font-sans": { fontFamily: "sans-serif" },
        "--font-serif": { fontFamily: "serif" },
        "--font-mono": { fontFamily: "monospace" },
        "--font-style-b": { fontWeight: "bold" },
        "--font-style-i": { fontStyle: "italic" },
        "--style-color-b": { color: "blue" }, 
        "--style-color-r": { color: "red" },
        "--style-color-g": { color: "green" },
        "--align-l": { textAlign: "left" },
        "--align-c": { textAlign: "center" },
        "--align-r": { textAlign: "right" },
        "--relative-size-sm": { },
        "--relative-size-lg": { },
        "--absolute-size-xs": { fontSize: "0.5em" },
        "--absolute-size-sm": { fontSize: "0.8em" },
        "--absolute-size-md": { fontSize: "1em" },
        "--absolute-size-lg": { fontSize: "1.2em" },
        "--absolute-size-xl": { fontSize: "1.5em" },
        "--reset": { fontFamily: null, fontWeight: null, fontStyle: null, color: null, textAlign: null, fontSize: null },
    }
	const el = document.getElementById("editor")
    on(el, "command", (e) => {
        if (e.command === "--quit")
          return alert("You have quit the editor.")
        Object.assign(el.style, cmds[e.command])
    })
</script>

<figure>
	<aria-menubar aria-label="Text Formatting">
		<aria-menuitem commandfor=font-menu command=toggle-menu>Font</aria-menuitem>
		<aria-menuitem commandfor=style-menu command=toggle-menu>Style/Color</aria-menuitem>
		<aria-menuitem commandfor=align-menu command=toggle-menu>Text Align</aria-menuitem>
		<aria-menuitem commandfor=size-menu command=toggle-menu>Size</aria-menuitem>
		<aria-menuitem commandfor=editor command=--reset>Reset</aria-menuitem>
		<aria-menuitem commandfor=editor command=--quit>Quit</aria-menuitem>
	</aria-menubar>
	<aria-menulist id=font-menu popover>
		<aria-menuitem type=radio commandfor=editor command=--font-sans>Sans-serif</aria-menuitem>
		<aria-menuitem type=radio commandfor=editor command=--font-serif>Serif</aria-menuitem>
		<aria-menuitem type=radio commandfor=editor command=--font-mono>Monospace</aria-menuitem>
	</aria-menulist>
	<aria-menulist id=style-menu popover>
		<fieldset>
			<aria-menuitem type=checkbox commandfor=editor command=--style-font-b>Bold</aria-menuitem>
			<aria-menuitem type=checkbox commandfor=editor command=--style-font-i>Italic</aria-menuitem>
		</fieldset>
		<hr>
		<fieldset>
			<aria-menuitem type=radio commandfor=editor command=--style-color-b>Blue</aria-menuitem>
			<aria-menuitem type=radio commandfor=editor command=--style-color-r>Red</aria-menuitem>
			<aria-menuitem type=radio commandfor=editor command=--style-color-g>Green</aria-menuitem>
		</fieldset>
	</aria-menulist>
	<aria-menulist id=align-menu popover>
		<aria-menuitem type=radio commandfor=editor command=--align-l>Left</aria-menuitem>
		<aria-menuitem type=radio commandfor=editor command=--align-c>Center</aria-menuitem>
		<aria-menuitem type=radio commandfor=editor command=--align-r>Right</aria-menuitem>
	</aria-menulist>
	<aria-menulist id=size-menu popover>
		<aria-menuitem commandfor=relative-size-menu command=toggle-menu>Relative</aria-menuitem>
		<aria-menuitem commandfor=absolute-size-menu command=toggle-menu>Absolute</aria-menuitem>
	</aria-menulist>
	<aria-menulist id=relative-size-menu popover>
		<aria-menuitem commandfor=editor command=--relative-size-sm>Smaller</aria-menuitem>
		<aria-menuitem commandfor=editor command=--relative-size-lg>Larger</aria-menuitem>
	</aria-menulist>
	<aria-menulist id=absolute-size-menu popover>
		<aria-menuitem type=radio commandfor=editor command=--absolute-size-xs>X-Small</aria-menuitem>
		<aria-menuitem type=radio commandfor=editor command=--absolute-size-sm>Small</aria-menuitem>
		<aria-menuitem type=radio commandfor=editor command=--absolute-size-md>Medium</aria-menuitem>
		<aria-menuitem type=radio commandfor=editor command=--absolute-size-lg>Large</aria-menuitem>
		<aria-menuitem type=radio commandfor=editor command=--absolute-size-xl>X-Large</aria-menuitem>
	</aria-menulist>
	<textarea id=editor style="width:100%; resize:none; height:200px; --interactive-border-radius: 0;">
Let me explain something to you.
Um, I am not Mr. Lebowski.
You're Mr. Lebowski.
I'm the Dude.
So that’s what you call me.
You know, that or, uh, His Dudeness, or uh, Duder, or El Duderino if you’re not into the wole brevity thing.
	</textarea>
</figure>

<script type=module src=/dist/js/menu.js></script>
