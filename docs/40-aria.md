---
title: ARIA
url: ./aria/
---

# ARIA Patterns 

Missing.css will style markup based on ARIA roles. We often reference the
[<cite>WAI-ARIA Authoring Practices</cite>][WAI].

[WAI]: https://www.w3.org/TR/wai-aria-practices/


## Tabs

Mark up your tabs using the `tablist`, `tab` and `tabpanel` roles
appropriately — see [WAI: Tabs][].

  ~~~ html
  <div role="tablist">
    <button role="tab" aria-controls="servers" aria-selected="true"
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

<script type="module" src="/js/tabs.js"></script>

<div role="tablist">
  <button role="tab" aria-controls="servers" aria-selected="true"
    >Servers</button>
  <button role="tab" aria-controls="channels"
    >Channels</button>
  <button role="tab" aria-controls="users"
    >Users</button>
</div>

<div id="servers"         role="tabpanel">This is tab 1. <strong>JavaScript sold separately!</strong></div>
<div id="channels" hidden role="tabpanel">You are enjoying tab 2.</div>
<div id="users"    hidden role="tabpanel"><img alt="placeholder cat" src="https://placekitten.com/200/200"></div>

[WAI: Tabs]: https://www.w3.org/TR/wai-aria-practices/#tabpanel


## Menu

Use `menu` and `menuitem` roles — see [WAI: Menu][].

~~~ html
<div role="menu" hidden id="my-menu">
  <a role="menuitem">View</a>
  <a role="menuitem">Edit</a>
  <a role="menuitem">Delete</a>
</div>
~~~

<div>
<script type="module" src="/js/menu.js"></script>
<button aria-haspopup="menu" aria-controls="my-menu" aria-expanded="false">Open menu</button>
<div role="menu" hidden id="my-menu">
  <a role="menuitem">View</a>
  <a role="menuitem">Edit</a>
  <a role="menuitem">Delete</a>
</div>
</div>


## Listbox
