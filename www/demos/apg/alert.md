---
layout: demo.vto
title: Alert
templateEngine: [vento, md]
apg:
 quote: |
   An alert is an element that displays a brief, important message in a way that attracts the user's attention without interrupting the user's task.
   Dynamically rendered alerts are automatically announced by most screen readers, and in some operating systems, they may trigger an alert sound.
   It is important to note that, at this time, screen readers do not inform users of alerts that are present on the page before page load completes.
 url: https://www.w3.org/WAI/ARIA/apg/patterns/alert/
---


## Notes

Missing.css uses the `<div role=alert class=box>`{ .language-html } element for alerts.
You can use colorways to provide some visual context to the alert, but be sure to also spell it out in writing.


{{ include "demo_kbd.vto" }}


## Example

<noscript>

This example requires JavaScript to be activated.

</noscript>

<figure>
  <style>[role=alert]:empty { display: none; }</style>
  <script>
    function showAlert() {
      document.getElementById('alert').innerHTML = document.getElementById('alert-template').innerHTML
    }
    function resetAlert() {
      document.getElementById('alert').innerHTML = ""
    }
  </script>
  <script type=text/template id=alert-template>
    <p>
      <strong>Warning</strong>:
      If you're putting something in a box, make sure to clarify why it is in a box in some other way.
      For example, this box has "Warning" in bold, in addition to being yellow.
      This makes your page clearer and prevents accessibility failures.
    </p>
  </script>

  <button onclick="showAlert()">Trigger Alert</button>
  <button onclick="resetAlert()">Reset</button>
  <div id=alert role=alert class="warn box"></div>
</figure>
