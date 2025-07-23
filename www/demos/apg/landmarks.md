---
layout: demo.vto
title: Landmarks
templateEngine: [vento, md]
apg:
 quote: |
   Landmarks are a set of eight roles that identify the major sections of a page.
   Each landmark role enables assistive technology users to perceive the start and end of a feature of the high-level page structure that is usually conveyed visually with placement, spacing, color, or borders.
 url: https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/
---


# Notes

Missing.css relies on the implicit landmark roles for HTML sectioning elements.

<!-- TODO: How to add <caption>Implicit ARIA Landmark Roles</caption> in markup? -->

| Landmark      | HTML Element                                      |
|---------------|---------------------------------------------------|
| Main          | `<main>`{ .language-html  }                       |
| Navigation    | `<nav>`{ .language-html }                         |
| Search        | `<search>`{ .language-html }                      |
| Banner        | `<body><header>`{ .language-html }                |
| Contentinfo   | `<body><footer>`{ .language-html }                |
| Complementary | `<aside>`{ .language-html }                       |
| Form          | `<form>`{ .language-html }                        |
| Region        | `<section aria-label=required>`{ .language-html } |

{ .table }

The `<header>`{ .language-html } and `<footer>`{ .language-html } elements are only given landmark roles when they are direct descendants of the `<body>`{ .language-html } element.
Note that in order for a `<section>`{ .language-html } element to be an implicit landmark role, it must be given a valid `aria-label`{ .token .attr-name } or `aria-labelledby`{ .token .attr-name } attribute.

For best practices, please refer to the <a href=https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/>APG's Landmark Regions</a> page.


{{ include "demo_kbd.vto" }}


## Example

<figure>
  <p>
  Visit the official <a href=/demos/landing-page/>landing page</a> example and view the source code.
</figure>
