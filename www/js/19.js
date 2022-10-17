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
    return listener();
  }
  target.addEventListener(event, listener, options);
  return { target, event, listener: listenerWrapper }
},
off = ({ target, event, listener }) => target.removeEventListener(event, listener, options),
dispatch = (el, type, detail) => el.dispatchEvent(new CustomEvent(type, { detail })),
attr = (el, name, ...args) => args.length > 0 ? el.setAttribute(name, args[0]) : el.getAttribute(name),
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

