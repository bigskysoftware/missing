---
draft: true
title: Spinbutton
templateEngine: [vento, md]
apg:
 quote: |
  A spinbutton is an input widget that restricts its value to a set or range of discrete values.
 url: https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/
shortcuts:
 - keys: ["Up Arrow"]
   text: Increases the value.
 - keys: ["Down Arrow"]
   text: Decreases the value.
 - keys: ["Home"]
   text: If the spinbutton has a minimum value, sets the value to its minimum.
 - keys: ["End"]
   text: If the spinbutton has a maximum value, sets the value to its maximum.
 - keys: ["Page Up"]
   text: Increase the value by an amount larger than the step change.
 - keys: ["Page Down"]
   text: Decrease the value by an amount larger than the step change.
---


## Notes

**Dev Note:** This is more than just `<input type=numeric>`{ .language-html }, see the APG guide.
From a impl standpoint, this pattern shares similar keyboard input to the slider pattern. { .warn .box }

{{ include "demo_kbd.vto" }}

## Example
