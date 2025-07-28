---
draft: true
title: Treegrid
templateEngine: [vento, md]
apg:
 quote: |
  A treegrid widget presents a hierarchical data grid consisting of tabular information that is editable or interactive.
  Any row in the hierarchy may have child rows, and rows with children may be expanded or collapsed to show or hide the children.
 url: https://www.w3.org/WAI/ARIA/apg/patterns/treegrid/
shortcuts:
 - keys: ["Enter"]
   text:  If cell-only focus is enabled and focus is on the first cell with the aria-expanded property, opens or closes the child rows. Otherwise, performs the default action for the cell.
 - keys: ["Tab"]
   text: If the row containing focus contains focusable elements (e.g., inputs, buttons, links, etc.), moves focus to the next input in the row. If focus is on the last focusable element in the row, moves focus out of the treegrid widget to the next focusable element.
---


## Notes

**Dev Note:**  The current keyboard specification listed on this page is incomplete.
Refer to the APG page when implementing this pattern.
{ .warn .box }

{{ include "demo_kbd.vto" }}

## Example
