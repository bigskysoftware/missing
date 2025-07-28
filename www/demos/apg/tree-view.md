---
draft: true
title: Tree View
templateEngine: [vento, md]
apg:
 quote: |
  A tree view widget presents a hierarchical list.
  Any item in the hierarchy may have child items, and items that have children may be expanded or collapsed to show or hide the children.
 url: https://www.w3.org/WAI/ARIA/apg/patterns/treeview/
shortcuts:
 - keys: ["Down Arrow"]
   text: Moves focus to the next node that is focusable without opening or closing a node.
 - keys: ["Up Arrow"]
   text: Moves focus to the previous node that is focusable without opening or closing a node.
 - keys: ["Home"]
   text: Moves focus to the first node in the tree without opening or closing a node.
 - keys: ["End"]
   text: Moves focus to the last node in the tree that is focusable without opening a node.
 - keys: ["Enter"]
   text: Activates a node, i.e., performs its default action. For parent nodes, one possible default action is to open or close the node.
---


## Notes

**Dev Note:**  The current keyboard specification listed on this page is incomplete.
Refer to the APG page when implementing this pattern.
{ .warn .box }

{{ include "demo_kbd.vto" }}

## Example
