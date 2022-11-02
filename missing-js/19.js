/** 
 * a DOM helper library.
 * "1 US$ = 18.5842 TR₺ · Oct 16, 2022, 20:52 UTC"
 */

/// <reference lib="es2022" />

/**
 * @template {object} TOptions
 * @callback Behavior
 * @arg {ParentNode} subtree
 * @arg {Partial<TOptions>} [options]
 */

/**
 * @template {object} TOptions
 * @callback BehaviorInit
 * @arg {Element} element
 * @arg {BehaviorContext<TOptions>} context
 */

/**
 * @template {object} TOptions
 * @typedef {Object} BehaviorContext
 * @prop {Root} root
 * @prop {Partial<TOptions>} options
 */

/**
 * @template TOptions
 * @typedef {object} BehaviorInitOptions
 * @prop {Root} root
 * @prop {TOptions} options
 */

/**
 * @typedef {Document | ShadowRoot} Root
 */

/**
 * @param {string} scope
 * @returns {Logger}
 * 
 * @typedef {<T>(...args: [..._: any, last: T]) => T} Logger
 */
export const makelogger = (scope) =>
  (...args) => {
    console.log("%c%s", "color:green", scope, ...args)
    return args.at(-1);
  };

const ilog = makelogger("19.js");

/**
 * Converts camelCase to kebab-case
 * @param {string} s 
 * @returns string
 */
const camelToKebab = s => s.replace(/[A-Z]/g, (s) => "-" + s.toLowerCase())

/**
 * Build a function to traverse the DOM forward or backward to find an element.
 * @param {("next" | "previous")} direction 
 * @returns {Traverse}
 * 
 * @callback Traverse
 * @param {ParentNode} root
 * @param {string} selector
 * @param {Element | null} [current]
 * @param {object} [options]
 * @param {boolean} [options.wrap]
 */
const traverse = (direction) => {
  const advance = direction + "ElementSibling";
  const wrapIt = direction === "next"
    ? (root, selector) => $(root, selector)
    : (root, selector) => $$(root, selector).at(-1);
  return (root, selector, current, { wrap = true } = {}) => {
    if (!current) return wrap ? wrapIt(root, selector) : null;
    let cursor = current;
    while (true) {
      while (cursor[advance] === null) {
        cursor = /** @type {Element} */ (cursor.parentElement);
        if (cursor === root) return wrap ? wrapIt(root, selector) : null;
      }
      cursor = cursor[advance];
      const found = cursor.matches(selector) ? cursor : $(cursor, selector);
      if (found) return found;
    }
    return cursor;
  };
};

/**
 * @template {Element} [TElement=Element]
 * @param {ParentNode} scope
 * @param {string} sel
 * @returns {TElement | null}
 */
export const $ = (scope, sel) => scope.querySelector(sel)

/**
 * @template {Element} [TElement=Element]
 * @param {ParentNode} scope
 * @param {string} sel
 * @returns {TElement[]}
 */
export const $$ = (scope, sel) => Array.from(scope.querySelectorAll(sel))

/**
 * @typedef EventListenerToken
 * @property {EventTarget} target
 * @property {string} type
 * @property {EventListener} listener
 * @property {object} options
 */

/** 
 * @template {string} TEventType
 * @callback Listener
 * @param {unknown extends HTMLElementEventMap[TEventType] ? CustomEvent : HTMLElementEventMap[TEventType]} event
 */

/**
 * Add an event listener.
 * 
 * @template {string} TEventType
 * @param {EventTarget} target
 * @param {TEventType} type
 * @param {Listener<TEventType>} listener
 * @param {object} [options]
 * @param {Element} [options.addedBy] If supplied, the listener will be removed when this element is not in the DOM.
 * @returns {EventListenerToken}
 */
export const on = (target, type, listener, options = {}) => {
  const listenerWrapper = e => {
    if (options.addedBy && !options.addedBy.isConnected) off({ target, type: type, listener: listenerWrapper, options }); // self-cleaning listener
    return listener(e);
  }
  target.addEventListener(type, /** @type {EventListener} */ (listener), /** @type {AddEventListenerOptions} */ (options));
  return { target, type: type, options, listener: listenerWrapper }
}

/**
 * Remove an event listener.
 * @param {EventListenerToken} listenerToken The return value of {@link on}.
 */
export const off = ({ target, type, listener, options }) => target.removeEventListener(type, listener, options)

/**
 * @template {Event | EventListener} T
 * @param {string} o How to halt
 * @param {T} f 
 * @returns {T}
 */
export const halt = (o, f) => {
  if (f instanceof Function) {
    return /** @type {T} */ ((e) => { halt(o, e); f(e); });
  }

  // f is event:
  for (const t of o.split(" ")) {
    if (t === "default") f.preventDefault();
    if (t === "bubbling") f.stopPropagation();
    if (t === "propagation") f.stopImmediatePropagation();
  }
  return f;
}

/**
 * Dispatch a {@link CustomEvent}.
 * @param {EventTarget} el
 * @param {String} type
 * @param {any} [detail]
 */
export const dispatch = (el, type, detail) => el.dispatchEvent(new CustomEvent(type, { detail }))

/**
 * Get, remove or set an attribute.
 * 
 * - attr(el, "name") Get the attribute "name"
 * - attr(el, "name", "value") Set the attribute "name" to "value"
 * - attr(el, "name", null) Remove the attribute "name"
 * - attr(el, [ nameA: "valueA", nameB: "valueB" ]) Set the attributes name-a to "valueA", name-b to "valueB"
 * 
 * @param {Element} el 
 * @param {string | object} name 
 * @param  {any} value 
 * @returns {string | null}
 */
export const attr = (el, name, value = undefined) => {
  const curValue = el.getAttribute(name);
  if (typeof name === "object") {
    for (const at in name) el.setAttribute(camelToKebab(at), name[at]);
    return null;
  }
  else if (value === undefined) return el.getAttribute(name);
  else if (value === null)      return el.removeAttribute(name), curValue;
  else                          return el.setAttribute(name, value), value;
}

/**
 * Convert a node to equivalent HTML.
 * @param {Node} node 
 * @returns {string}
 */
export const stringifyNode = node => {
  const tmp = document.createElement("div");
  tmp.append(node);
  return tmp.innerHTML;
}

/**
 * HTML-escape a string.
 * If given a DOM node, it will return **unescaped** HTML for it.
 * Returns empty string when given null or undefined.
 * @param {any} s 
 * @returns string
 */
export const htmlescape = s => {
  if (s === null || s === undefined) return "";
  if (s instanceof Node) return stringifyNode(s);
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("'", "&#x27;")
    .replaceAll("\"", "&quot;")
}

/**
 * Template literal that escapes HTML in interpolated values and returns a DocumentFragment.
 * Can also be called with a string to parse it as HTML.
 * To let trusted HTML through escaping, parse it first:
 *     html`<p>My trusted markup: ${html(trustedMarkup)}</p>`
 * 
 * @param {TemplateStringsArray | string} str 
 * @param  {...any} values 
 * @returns {DocumentFragment}
 */
export const html = (str, ...values) => {
  // template literal case
  if (typeof str === "object" && "raw" in str) str = String.raw(str, ...values.map(htmlescape))
  const tmpl = document.createElement("template");
  tmpl.innerHTML = str;
  return tmpl.content;
}

/**
 * Find the next element matching a given selector, searching deeply throughout the DOM.
 */
export const next = traverse("next")

/**
 * Find the previous element matching a given selector, searching deeply throughout the DOM.
 */
export const prev = traverse("previous")

/**
 * Create a handler for keyboard events using a keyboard shortcut DSL.
 * 
 * @param {Hotkeys} hotkeys 
 * @returns {KeyboardEventListener}
 * 
 * @typedef {Record<string, KeyboardEventListener>} Hotkeys
 * 
 * @callback KeyboardEventListener
 * @param {KeyboardEvent} event
 */
export const hotkey = (hotkeys) => {
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
}

/**
 * Debounce a function.
 * @template {*[]} TArgs
 * @param {number} t 
 * @param {(...args: TArgs) => void} f 
 * @param {object} options 
 * @param {("leading" | "trailing")} [options.mode] 
 * @returns {(...args: TArgs) => void}
 */
export const debounce = (t, f, { mode = "trailing" } = {}) => {
  let timeout;
  return (...args) => {
    if (timeout) clearTimeout(timeout);
    else if (mode === "leading") f(...args);
    timeout = setTimeout(() => {
      if (mode === "trailing") f(...args);
      timeout = null;
    }, t);
  }
}

/**
 * Create a behavior that applies to elements matching the given selector.
 * 
 * @template {object} TOptions
 * @param {string} selector 
 * @param {BehaviorInit<TOptions>} init 
 * @returns {Behavior<TOptions>} A function that can be called to apply the behavior to new elements within a subtree.
 */
export const behavior = (selector, init) => {
  const initialized = new WeakSet
  return (subtree = document, options = {}) => {
    const root = /** @type {Document|ShadowRoot} */ (subtree.getRootNode());
    $$(subtree, selector).forEach(el => {
      if (initialized.has(el)) return;    
      initialized.add(el);
      init(el, { options, root });
    });
  };
};

/**
 * Repeat an element such that the list can be updated when data changes.
 * 
 * @template TData
 * @param {ParentNode} container 
 * @param {object} context
 * @param {(data: TData) => string} context.idOf
 * @param {(data: TData, ctx: { id: string }) => Node} context.create
 * @param {(el: Element, data: TData) => void} [context.update]
 * @returns 
 */
export const repeater = (container, { idOf, create, update }) => {
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
    clearAfter = cursor => {
      if (cursor) while (cursor.nextSibling) cursor.nextSibling.remove();
      else container.replaceChildren();
    };

    const root = /** @type {Root} */ (container.getRootNode());

    // TODO: use an actual morphing algo
    for (const datum of dataset) {
      const
      id = idOf(datum),
      existing = root.getElementById(id);
      if (existing) append(update?.(existing, datum) ?? existing);
      else append(create(datum, { id }));
    }
    clearAfter(cursor);
  }
}
