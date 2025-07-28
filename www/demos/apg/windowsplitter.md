---
draft: true
title: Window Splitter
templateEngine: [vento, md]
apg:
 quote: |
  A window splitter is a moveable separator between two sections, or panes, of a window that enables users to change the relative size of the panes.
 url: https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/
shortcuts:
 - keys: ["Left Arrow"]
   text: Moves a vertical splitter to the left.
 - keys: ["Right Arrow"]
   text: Moves a vertical splitter to the right.
 - keys: ["Up Arrow"]
   text: Moves a horizontal splitter up.
 - keys: ["Down Arrow"]
   text: Moves a horizontal splitter down.
 - keys: ["Enter"]
   text: If the primary pane is not collapsed, collapses the pane. If the pane is collapsed, restores the splitter to its previous position.
 - keys: ["Home"]
   text: Moves splitter to the position that gives the primary pane its smallest allowed size. This may completely collapse the primary pane.
 - keys: ["End"]
   text: Moves splitter to the position that gives the primary pane its largest allowed size. This may completely collapse the secondary pane.
 - keys: ["F6"]
   text: Cycle through window panes.
---


## Notes

**Dev Note:** ARIA 1.1 introduced changes to the separator role so it behaves as a widget when focusable.
While this pattern has been revised to match the ARIA 1.1 specification, the task force will not complete its review until a functional example that matches the ARIA 1.1 specification is complete.
Progress on this pattern is tracked by [issue 129](https://github.com/w3c/aria-practices/issues/129).
{ .warn .box }

{{ include "demo_kbd.vto" }}

## Example
