---
layout: demo.vto
title: Accordion
templateEngine: [vento, md]
apg:
 quote: |
   An accordion is a vertically stacked set of interactive headings that each contain a title, content snippet, or thumbnail representing a section of content.
   The headings function as controls that enable users to reveal or hide their associated sections of content.
   Accordions are commonly used to reduce the need to scroll when presenting multiple sections of content on a single page.
 url: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
shortcuts:
 - keys: ["Enter"]
   text: Expand or collapse the associated panel.
 - keys: ["Space"]
   text: Expand or collapse the associated panel.
 - keys: ["Tab"]
   text: Move focus to the next focusable element; all headers in the accordion are included in the page Tab sequence.
 - keys: ["Shift", "Tab"]
   text: Move focus to the previous focusable element.
---


## Notes

Missing.css uses the `<details name=foo>`{ .language-html } element for accordions.


{{ include "demo_kbd.vto" }}


## Example

<figure>
  <div>
    <h3>Frequently Asked Questions</h3>
    <details name=faq>
      <summary>What is your name?</summary>
      <p>Sir Galahad of Camelot.</p>
    </details>
    <details name=faq>
      <summary>What is your quest?</summary>
      <p>I seek the Grail.</p>
    </details>
    <details name=faq>
      <summary>What is your favorite color?</summary>
      <p>Blue. No, yelloooooo—!</p>
    </details>
  </div>
</figure>
