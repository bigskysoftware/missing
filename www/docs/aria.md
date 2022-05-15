
# ARIA Patterns 

Missing.css will style markup based on ARIA roles. We often reference the
[<cite>WAI-ARIA Authoring Practices</cite>][WAI].


## Tabs

Mark up your tabs using the `tablist`, `tab` and `tabpanel` roles
appropriately — see [WAI: Tabs][].

  ~~~ html
  <div role="tablist">
    <button role="tab" aria-controls="servers" aria-active="true"
      >Servers</button>
    <button role="tab" aria-controls="channels"
      >Channels</button>
    <button role="tab" aria-controls="users"
      >Users</button>
  </div>
  
  <div id="servers"  role="tabpanel">...</div>
  <div id="channels" role="tabpanel">...</div>
  <div id="users"    role="tabpanel">...</div>
  ~~~

[WAI]: https://www.w3.org/TR/wai-aria-practices/
[WAI: Tabs]: https://www.w3.org/TR/wai-aria-practices/#tabpanel


