---
layout: demo.vto
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
  <div class="packed flex-column" style="--border-radius: 0;">
    <aria-menubar aria-label="Text Formatting" class="crowded ok box with flex-row">
      <aria-menuitem type=parent>Font</aria-menuitem>
      <aria-menu hidden>
        <aria-menuitem type=radio>Sans-serif</aria-menuitem>
        <aria-menuitem type=radio>Serif</aria-menuitem>
        <aria-menuitem type=radio>Monospace</aria-menuitem>
      </aria-menu>
      <aria-menuitem type=parent>Style/Color</aria-menuitem>
      <aria-menu hidden>
        <aria-menuitem type=group>
          <aria-menuitem type=checkbox>Bold</aria-menuitem>
          <aria-menuitem type=checkbox>Italic</aria-menuitem>
        </aria-menuitem>
        <aria-menuitem type=separator></aria-menuitem>
        <aria-menuitem type=group>
          <aria-menuitem type=radio>Black</aria-menuitem>
          <aria-menuitem type=radio>Blue</aria-menuitem>
          <aria-menuitem type=radio>Red</aria-menuitem>
          <aria-menuitem type=radio>Green</aria-menuitem>
        </aria-menuitem>
      </aria-menu>
      <aria-menuitem type=parent>Text Align</aria-menuitem>
      <aria-menu hidden>
        <aria-menuitem type=radio>Left</aria-menuitem>
        <aria-menuitem type=radio>Center</aria-menuitem>
        <aria-menuitem type=radio>Right</aria-menuitem>
        <aria-menuitem type=radio>Justify</aria-menuitem>
      </aria-menu>
      <aria-menuitem type=parent>Size</aria-menuitem>
      <aria-menu hidden>
        <aria-menuitem type=parent>Relative</aria-menuitem>
        <aria-menu hidden>
          <aria-menuitem>Smaller</aria-menuitem>
          <aria-menuitem>Larger</aria-menuitem>
        </aria-menu>
        <aria-menuitem type=parent>Absolute</aria-menuitem>
        <aria-menu hidden>
          <aria-menuitem type=radio>X-Small</aria-menuitem>
          <aria-menuitem type=radio>Small</aria-menuitem>
          <aria-menuitem type=radio>Medium</aria-menuitem>
          <aria-menuitem type=radio>Large</aria-menuitem>
          <aria-menuitem type=radio>X-Large</aria-menuitem>
        </aria-menu>
      </aria-menu>
      <aria-menuitem>Reset</aria-menuitem>
      <aria-menuitem>Quit</aria-menuitem>
    </aria-menubar>
    <textarea style="width:100%; resize:none; height:200px; --interactive-border-radius:0;">
Let me explain something to you.
Um, I am not Mr. Lebowski.
You're Mr. Lebowski.
I'm the Dude.
So that’s what you call me.
You know, that or, uh, His Dudeness, or uh, Duder, or El Duderino if you’re not into the whole brevity thing.
    </textarea>
  </div>
</figure>

<script type=module src=/dist/js/menu.js></script>
