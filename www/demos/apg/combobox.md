---
draft: true
title: Combobox
templateEngine: [vento, md]
apg:
 quote: |
  A combobox is an input widget that has an associated popup.
  The popup enables users to choose a value for the input from a collection.
  The popup may be a listbox, grid, tree, or dialog.
 url: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
shortcuts:
 - keys: ["Down Arrow"]
   text: If the popup is available, moves focus into the popup
 - keys: ["Up Arrow"]
   text: If the popup is available, places focus on the last focusable element in the popup.
 - keys: ["Escape"]
   text: Dismisses the popup if it is visible. Optionally, if the popup is hidden before Escape is pressed, clears the combobox.
 - keys: ["Enter"]
   text: If the combobox is editable and an autocomplete suggestion is selected in the popup, accepts the suggestion either by placing the input cursor at the end of the accepted value in the combobox or by performing a default action on the value.
 - keys: ["Alt", "Down Arrow"]
   text: (Optional, if the popup is available but not displayed) Displays the popup without moving focus.
 - keys: ["Alt", "Up Arrow"]
   text: (Optional, if the popup is displayed) Returns focus to the combobox (if the popup contains focus), otherwise closes the popup.
---


## Notes

**Dev Note:** Refer to the APG when implementing keyboard shortcuts, they might differ depending on whether the popup is a listbox, grid, tree, or dialog.{ .warn .box }

{{ include "demo_kbd.vto" }}

## Example
