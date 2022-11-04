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
 * Creates a logging function.
 * The {@link scope} will be prepended to each message logged.
 * 
 * We usually use `ilog` as a name for the resulting function.
 * It returns its last argument,
 * which makes it easier to log intermediate values in an expression:
 * 
 *     const x = a + ilog("b:", b); // x = a + b
 * 
 * @param {string} scope - The name of the component/module/etc. that will use this logger.
 * @returns {Logger} The `ilog` function.
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
 * Converts camelCase to kebab-case.
 * @param {string} s 
 * @returns string
 */
const camelToKebab = s => s.replace(/[A-Z]/g, (s) => "-" + s.toLowerCase())

/**
 * Build a function to traverse the DOM forward or backward from a starting point
 * to find an element matching some selector.
 * @param {("next" | "previous")} direction 
 * @returns {Traverse}
 * 
 * @callback Traverse
 * @param {ParentNode} root - The element within which to look for the next element, e.g. a menu.
 * @param {string} selector - The selector to look for, e.g. `"[role=menuitem]"`.
 * @param {Element | null} [current] - The element to start the search from, e.g. the currently selected menu item.
 *    If missing, the first or last matching element will be returned (depending on search direction).
 * @param {object} [options]
 * @param {boolean} [options.wrap] Whether to wrap around when the end/start of {@link root} is reached.
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
 * Wrapper for {@link scope}.querySelector({@link sel}).
 * Unlike jQuery, the scope is required to be specified.
 * @template {Element} [TElement=Element]
 * @param {ParentNode} scope
 * @param {string} sel
 * @returns {TElement | null}
 */
export const $ = (scope, sel) => scope.querySelector(sel)

/**
 * Wrapper for {@link scope}.querySelectorAll({@link sel}).
 * Unlike jQuery, the scope is required to be specified.
 * Returns an Array instead of a NodeList.
 * @template {Element} [TElement=Element]
 * @param {ParentNode} scope
 * @param {string} sel
 * @returns {TElement[]}
 */
export const $$ = (scope, sel) => Array.from(scope.querySelectorAll(sel))

/**
 * @typedef EventListenerToken
 * Returned by `on`, this is an object you can pass to `off` to remove an event listener,
 * saving the burden of keeping a handle on the listener function and options.
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
 * @template {string} TEventType
 * @param {EventTarget} target - The element (or other event target) to add the listener to.
 * @param {TEventType} type - The type of event to listen to, e.g. `"click"`.
 * @param {Listener<TEventType>} listener - The listener function.
 * @param {object} [options]
 * @param {Element} [options.addedBy] - If supplied, the listener will be removed when this element is not in the DOM.
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
 * @param {EventListenerToken} listenerToken - The return value of {@link on}.
 */
export const off = ({ target, type, listener, options }) => target.removeEventListener(type, listener, options)

/**
 * "Halt" an event -- convenient wrapper for `preventDefault`, `stopPropagation`, and `stopImmediatePropagation`.
 * @param {string} o How to halt. Space-separated list of "default", "bubbling" and "propagation".
 * @param {Event} e The event. 
 * @returns {void}
 */
export const halt = (o, e) => {
  for (const t of o.split(" ")) {
    if (t === "default") e.preventDefault();
    if (t === "bubbling") e.stopPropagation();
    if (t === "propagation") e.stopImmediatePropagation();
  }
}

/**
 * Decorator for any event listener to call {@link halt}.
 * 
 *     on(el, "click", halts("default", e => ...))
 *
 * @template {Event} T
 * @param {string} o See {@link halt~o}.
 * @param {(e: T) => void} f 
 * @returns {(e: T) => void}
 */
export const halts = (o, f) => e => { halt(o, e); f(e) };

/**
 * Dispatch a {@link CustomEvent}.
 * @param {EventTarget} el - the event target
 * @param {String} type - the event type, e.g. `"myapp:clear-cart"`
 * @param {any} [detail] - Event.detail
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
 * @param {string | object} name - The attribute name **or** a map of names to values.
 *   If an object is passed, camelCase attribute names will be converted to kebab-case.
 * @param  {any} value - The value of the attribute, when setting. Pass `null` to remove an attribute.
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
 * @returns {string}
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
 * 'Type "Element" cannot be assigned to type "HTMLElement"' SHUT UP
 * @param {*} [el] 
 * @returns {HTMLElement | null}
 */
export const asHtml = el => el instanceof HTMLElement ? el : null;

/**
 * Find the next element matching a given selector, searching deeply throughout the DOM.
 * @see Traverse
 */
export const next = traverse("next")

/**
 * Find the previous element matching a given selector, searching deeply throughout the DOM.
 * @see Traverse
 */
export const prev = traverse("previous")

/**
 * Create a handler for keyboard events using a keyboard shortcut DSL.
 * 
 * "ArrowLeft"
 * "Ctrl+Alt+3"
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
 * 
 * @template {*[]} TArgs
 * @param {number} t - The debounce time.
 * @param {(...args: TArgs) => void} f - The function.
 * @param {object} options 
 * @param {("leading" | "trailing")} [options.mode] - Leading or trailing debounce.
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
