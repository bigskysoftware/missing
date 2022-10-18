/// a DOM helper library.
/// "1 US$ = 18.5842 TR₺ · Oct 16, 2022, 20:52 UTC"
export
const makelogger = (scope) =>
  (...args) => {
    console.log("%c%s", "color:green", scope, ...args)
    return args.at(-1);
  };

const
ilog = makelogger("19.js"),
uncamel = s => s.replace(/[A-Z]/g, (s) => "-" + s.toLowerCase()),
traverse = (direction) => {
  const advance = direction + "ElementSibling";
  const wrapIt = direction === "next"
    ? (root, selector) => $(root, selector)
    : (root, selector) => $$(root, selector).at(-1);
  return (root, selector, current, { wrap = true } = {}) => {
    if (!current) return wrap ? wrapIt(root, selector) : null;
    let cursor = current;
    while (true) {
      while (cursor[advance] === null) {
        cursor = cursor.parentElement;
        if (cursor === root) return wrap ? wrapIt(root, selector) : null;
      }
      cursor = cursor[advance];
      const found = cursor.matches(selector) ? cursor : $(cursor, selector);
      if (found) return found;
    }
    return cursor;
  };
};

export
const
$ = (scope, sel) => scope.querySelector(sel),
$$ = (scope, sel) => Array.from(scope.querySelectorAll(sel)),
on = (target, event, listener, options) => {
  const listenerWrapper = e => {
    if (options.addedBy && !options.addedBy.isConnected) off({ target, listenerWrapper, options }); // self-cleaning listener
    return listener(e);
  }
  target.addEventListener(event, listener, options);
  return { target, event, listener: listenerWrapper }
},
off = ({ target, event, listener }) => target.removeEventListener(event, listener, options),
dispatch = (el, type, detail) => el.dispatchEvent(new CustomEvent(type, { detail })),
attr = (el, name, ...args) => {
  if (typeof name === "object") for (at in name) el.setAttribute(uncamel(name), value);
  else if (args.length > 0) return el.setAttribute(name, args[0]);
  else return el.getAttribute(name);
},
htmlescape = s => {
  if (s === null || s === undefined) return "";
  if (s instanceof Node) return s.outerHTML;
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("'", "&#x27;")
    .replaceAll("\"", "&quot;")
},
html = (str, ...values) => {
  // template literal case
  if ("raw" in str) str = String.raw(str, ...values.map(htmlescape))
  const tmpl = document.createElement("template");
  tmpl.innerHTML = str;
  return tmpl.content;
},
next = traverse("next"),
prev = traverse("previous"),
hotkey = (hotkeys) => {
  const alt = 0b1, ctrl = 0b10, meta = 0b100, shift = 0b1000;
  const
  handlers = {}, // handlers[key][modifiers as bitfields]
  modifiersOf = e => 0 | (e.altKey && alt) | (e.ctrlKey && ctrl) | (e.metaKey && meta) | (e.shiftKey && shift),
  parse = hotkeySpec => {
    const
    tokens = hotkeySpec.split("+"),
    key = tokens.pop();
    let modifiers = 0 | 0;
    for (const token in tokens) switch (token.toLowerCase()) {
    case "alt":   modifiers |= alt;   break;
    case "ctrl":  modifiers |= ctrl;  break;
    case "meta":  modifiers |= meta;  break;
    case "shift": modifiers |= shift; break;
    }
    return [key, modifiers];
  };

  for (const [hotkeySpec, handler] of Object.entries(hotkeys)) {
    const [key, modifiers] = parse(hotkeySpec);
    (handlers[key] ??= new Array(8))[modifiers] = handler;
  }

  return e => handlers[e.key]?.[modifiersOf(e)]?.(e);
},
debounce = (t, f, { mode = "trailing" } = {}) => {
  let timeout;
  return (...args) => {
    if (timeout) clearTimeout(timeout);
    else if (mode === "leading") f(...args);
    timeout = setTimeout(() => {
      if (mode === "trailing") f(...args);
      timeout = null;
    }, t);
  }
},
behavior = (selector, init) => {
  const initialized = new WeakSet
  
  return (subtree = document, options) => {
    const root = subtree.getRootNode();
    $$(subtree, selector).forEach(el => {
      if (initialized.has(el)) return;    
      initialized.add(el);
      init(el, { options, root });
    });
  };
};
export
const
repeater = (container, { idOf, create, update }) => {
  return (dataset) => {
    let cursor;

    const
    append = (...nodes) => {
      const oldcursor = cursor;
      cursor = nodes.at(-1);
      if (cursor instanceof DocumentFragment) cursor = cursor.lastChild;
      if (oldcursor) oldcursor.after(...nodes);
      else container.prepend(...nodes);
    },
    clearAfter = () => {
      if (cursor) while (cursor.nextSibling) cursor.nextSibling.remove();
      else container.replaceChildren();
    };

    const root = container.getRootNode();

    // TODO: use an actual morphing algo
    for (const datum of dataset) {
      const
      id = idOf(datum),
      existing = root.getElementById(id);
      if (existing) append(update?.(existing) ?? existing);
      else append(create(datum, { id }));
    }
    clearAfter(cursor);
  }
}
