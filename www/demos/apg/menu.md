---
layout: demo.vto
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
 - keys: ["Right Arrow"]
   text: If a parent menuitem is focused, opens the submenu and focuses the first menuitem.
 - keys: ["Left Arrow"]
   text: If focus in a nested submenu, closes the submenu and focuses the previously focused parent menuitem.
 - keys: ["Escape"]
   text: Closes all menus (and submenus) and returns focus to the parent menuitem.
---


## Notes

Missing.css provides `<aria-menubar>`{ .language-html } and `<aria-menu>`{ .language-html } custom elements.

 - Don't forget to set an accessible label for the `<aria-menubar>`{ .language-html }.
 - A menuitem that opens up a submenu is called a <em>parent menuitem</em> (and is specified using `role=parent`{ .token .attr-name });
   the next sibling of a parent menuitem must be an `<aria-menu>`{ .language-html } element.


{{ include "demo_kbd.vto" }}


## Example

<noscript>

This example requires JavaScript to be activated.

</noscript>

<figure>
  <!--
  <button type=button aria-haspopup=menu aria-controls=my-menu aria-expanded=false>Options</button>
  <aria-menu id=my-menu hidden>
    <aria-menuitem onclick="alert(`You clicked {this.innerText}`)">Edit</aria-menuitem>
    <aria-menuitem onclick="alert(`You clicked {this.innerText}`)">View</aria-menuitem>
    <aria-menuitem onclick="alert(`You clicked {this.innerText}`)">Delete</aria-menuitem>
  </aria-menu>
  -->
  <button type=button aria-haspopup=menu aria-controls=my-menu aria-expanded=false>Options</button>
  <div role=menu id=my-menu hidden>
    <a role=menuitem href=javascript:void(0)>Edit</a>
    <a role=menuitem href=javascript:void(0)>View</a>
    <a role=menuitem href=javascript:void(0)>Delete</a>
  </div>
</figure>

<script type=module src=/dist/js/menu.js></script>
