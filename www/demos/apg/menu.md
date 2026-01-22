---
title: Menu
templateEngine: [vento, md]
apg:
 quote: |
  A menu is a widget that offers a list of choices to the user, such as a set of actions or functions.
  Menu widgets behave like native operating system menus, such as the menus that pull down from the menubars commonly found at the top of many desktop application windows.
 url: https://www.w3.org/WAI/ARIA/apg/patterns/menubar/
shortcuts:
 - keys: ["Up Arrow"]
   text: Move focus to the previous menuitem.
 - keys: ["Down Arrow"]
   text: Move focus to the next menuitem.
 - keys: ["Escape"]
   text: Closes the menu.
---

<!-- Submenu keys: not supported yet
 - keys: ["Right Arrow"]
   text: If a parent menuitem is focused, opens the submenu and focuses the first menuitem.
 - keys: ["Left Arrow"]
   text: If focus in a nested submenu, closes the submenu and focuses the previously focused parent menuitem.
 - keys: ["Escape"]
   text: Closes all menus (and submenus) and returns focus to the parent menuitem.
-->

## Notes

Missing.css provides the following custom elements:
 - `<aria-menubar>`{ .language-html },
 - `<aria-menulist>`{ .language-html }, and
 - `<aria-menuitem>`{ .language-html }.

 - Don't forget to set an accessible label for the `<aria-menubar>`{ .language-html }.
 - A menuitem that opens up a submenu is called a <em>parent menuitem</em> (and is specified using `role=parent`{ .token .attr-name });
		the next sibling of a parent menuitem must be an `<aria-menu>`{ .language-html } element.

Don't forget to set an accessible label for `<aria-menulist>`{ .language-html }, either by specifying `aria-label`{.token .attr-name} or by setting `aria-labelledby`{.token .attr-name} to the menu button that controls its display.


{{ include "demo_kbd.vto" }}


## Example

<noscript>

This example requires JavaScript to be activated.

</noscript>

<figure>
	<button popovertarget=m>Options</button>
	<aria-menulist id=m popover>
		<aria-menuitem onclick="alert(`You clicked ${this.innerText}`)">Edit</aria-menuitem>
		<aria-menuitem onclick="alert(`You clicked ${this.innerText}`)">View</aria-menuitem>
		<aria-menuitem onclick="alert(`You clicked ${this.innerText}`)">Delete</aria-menuitem>
	</aria-menulist>
</figure>

<script type=module src=/dist/js/command.js></script>
<script type=module src=/dist/js/menu.js></script>
