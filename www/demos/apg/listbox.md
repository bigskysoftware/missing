---
layout: demo.vto
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

Missing.css provides the `<aria-listbox>`{ .language-html } custom element for listboxes.


{{ include "demo_kbd.vto" }}


## Example

<noscript>

This example requires JavaScript to be activated.

</noscript>

<figure>
  <style>
    [role=listbox] {
      max-height: 200px;
      overflow: auto;
    }
  </style>
  <strong>ARIA Patterns</strong>
  <ul role=listbox class="crowded box with flow-gap">
    <li role=option>Accordion
    <li role=option>Alert
    <li role=option>Alert and Message Dialogs
    <li role=option>Breadcrumb
    <li role=option>Button
    <li role=option>Carousel
    <li role=option>Checkbox
    <li role=option>Combobox
    <li role=option>Dialog (Modal)
    <li role=option>Disclosure
    <li role=option>Feed
    <li role=option>Grid
    <li role=option>Landmarks
    <li role=option>Link
    <li role=option aria-selected=true>Listbox
    <li role=option>Menu and Menubar
    <li role=option>Menu Button
    <li role=option>Meter
    <li role=option>Radio Group
    <li role=option>Slider
    <li role=option>Slider (Multi-Thumb)
    <li role=option>Spinbutton
    <li role=option>Switch
    <li role=option>Table
    <li role=option>Tabs
    <li role=option>Toolbar
    <li role=option>Tooltip
    <li role=option>Tree View
    <li role=option>Treegrid
    <li role=option>Window Splitter
  </ul>
</figure>
