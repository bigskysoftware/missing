# Tests

Below is a list of tests that should be implemented.
This list is by no means comprehensive, just a place to store thoughts as they pop up during coding sessions.


- focus
  - focusgroup / toolbar should capture+halt events whose target matches `[aria-disabled=true], [aria-disabled=true] *`.
    These targets should still be focused on click.
  - typeahead's `validKey()` should work with international keyboards
