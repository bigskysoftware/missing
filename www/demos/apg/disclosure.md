---
layout: demo.vto
title: Disclosure
templateEngine: [vento, md]
apg:
 quote: |
   A disclosure is a widget that enables content to be either collapsed (hidden) or expanded (visible).
   It has two elements&colon; a disclosure button and a section of content whose visibility is controlled by the button.
   When the controlled content is hidden, the button is often styled as a typical push button with a right-pointing arrow or triangle to hint that activating the button will display additional content.
   When the content is visible, the arrow or triangle typically points down.
 url: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
shortcuts:
 - keys: ["Enter"]
   text: Activate the disclosure control and toggle visibility of the disclosure content.
 - keys: ["Space"]
   text: Activate the disclosure control and toggle visibility of the disclosure content.
---


## Notes

Missing.css uses the `<details>`{ .language-html } element for disclosures.
Disclosures can be made into an [accordion](/demos/accordion/) by applying a fixed `name`{ .token .attr-name } attribute to each `<details>`{ .language-html } element.


{{ include "demo_kbd.vto" }}


## Example

<figure>
  <h3>Frequently Asked Questions</h3>
  <details>
    <summary>What is your name?</summary>
    <p>Sir Galahad of Camelot.</p>
  </details>
  <details>
    <summary>What is your quest?</summary>
    <p>I seek the Grail.</p>
  </details>
  <details>
    <summary>What is your favorite color?</summary>
    <p>Blue. No, yelloooooo—!</p>
  </details>
</figure>
