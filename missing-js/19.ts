/** 
 * a DOM helper library.
 * "1 US$ = 18.5842 TR₺ · Oct 16, 2022, 20:52 UTC"
 */

/// <reference lib="es2022" />

export type Behavior<TOptions> = (subtree: ParentNode, options?: Partial<TOptions>) => void;

export type BehaviorInit<TOptions> = (element: Element, context: BehaviorContext<TOptions>) => void;

export type BehaviorContext<TOptions> = {
  root: Root;
  options: Partial<TOptions>
}

export type Root = Document | ShadowRoot;

export type Logger = <T>(...args: [..._: any, last: T]) => T;

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
 * @param scope - The name of the component/module/etc. that will use this logger.
 * @returns The `ilog` function.
 */
export function makelogger(scope: string): Logger {
  return (...args) => {
    console.log("%c%s", "color:green", scope, ...args);
    return args.at(-1);
  };
}

const ilog = makelogger("19.js");

/**
 * Converts camelCase to kebab-case.
 */
function camelToKebab(s: string): string {
  return s.replace(/[A-Z]/g, (s) => "-" + s.toLowerCase());
}

/**
 * Traverse the DOM forward or backward from a starting point
 * to find an element matching some selector.
 * @param {("next" | "previous")} direction
 * @param {ParentNode} root - The element within which to look for the next element, e.g. a menu.
 * @param {string} selector - The selector to look for, e.g. `"[role=menuitem]"`.
 * @param {Element | null} [current] - The element to start the search from, e.g. the currently selected menu item.
 *    If missing, the first or last matching element will be returned (depending on search direction).
 * @param {object} [options]
 * @param {boolean} [options.wrap] Whether to wrap around when the end/start of {@link root} is reached.
 */
export function traverse(
  direction: "next" | "previous",
  root: ParentNode,
  selector: string,
  current: Element | null,
  options: { wrap?: boolean } = {},
) {
  const { wrap = true } = options;

  const advance = direction + "ElementSibling";

  const wrapIt = () => {
    // If wrapping is disabled.
    if (!wrap) return null;
    // Wrap in the correct direction.
    return direction === "next"
      ? $(root, selector)
      : $$(root, selector).at(-1);
  }
  
  if (!current) return wrapIt();
  
  // Traverse left to right, bottom to top.
  //
  //                                                  (begin ascii art diagram)
  //                           (R)
  //                         /     \   
  //                    (r)           (4) <- return value
  //                 /   |   \       /   \
  //    current -> (1)  (2)  (3)    (*) (*)
  //                                                              (end diagram)
  //
  // In the diagram above, 1, 2, 3 are tested by the selector (assuming we
  // start at 1). Then, having run out of siblings, we move up (as many times
  // as needed) before advancing, ending up at 4. 
  //
  // To "test" an element, ee call Element#matches, then if that returns false,
  // querySelector. The querySelector call is how the items marked with
  // asterisks can be checked. 
  let cursor = current;
  while (true) {
    while (cursor[advance] === null) { // 3
      cursor = cursor.parentElement as Element; // 1 to r
      if (cursor === root) return wrapIt();
    }
    cursor = cursor[advance]; // 1 to 2 to 3, r to 4
    const found = cursor.matches(selector)
      ? cursor // 4
      : $(cursor, selector); // asterisks
    if (found) return found;
  }
}

/**
 * Wrapper for {@link scope}.querySelector({@link sel}).
 * Unlike jQuery, the scope is required to be specified.
 */
export function $<TElement extends Element>(scope: ParentNode, sel: string): TElement | null {
  return scope.querySelector<TElement>(sel);
}

/**
 * Wrapper for {@link scope}.querySelectorAll({@link sel}).
 * Unlike jQuery, the scope is required to be specified.
 * Returns an Array instead of a NodeList.
 */
export function $$<TElement extends Element>(scope: ParentNode, sel: string): TElement[] {
  return Array.from(scope.querySelectorAll<TElement>(sel));
}

/**
 * Returned by `on`, this is an object you can pass to `off` to remove an event listener,
 * saving the burden of keeping a handle on the listener function and options.
 */
type EventListenerToken = {
  target: EventTarget;
  type: string;
  listener: EventListener;
  options: object;  
}

/** 
 * @callbListener
 * @param {unknown extends HTMLElementEventMap[TEventType] ? CustomEvent : HTMLElementEventMap[TEventType]} event
 */
type Listener<T extends string> = (event: T extends keyof HTMLElementEventMap ? HTMLElementEventMap[T] : CustomEvent) => void;

/**
 * Add an event listener.
 * @param target - The element (or other event target) to add the listener to.
 * @param type - The type of event to listen to, e.g. `"click"`.
 * @param listener - The listener function.
 * @param [options]
 * @param [options.addedBy] - If supplied, the listener will be removed when this element is not in the DOM.
 */
export function on<TEventType extends string>(
  target: EventTarget,
  type: TEventType,
  listener: Listener<TEventType>,
  options: { addedBy?: Element } = {}
): EventListenerToken {
  const listenerWrapper: Listener<TEventType> = e => {
    if (options.addedBy && !options.addedBy.isConnected)
      off({ target, type: type, listener: listenerWrapper as EventListener, options }); // self-cleaning listener
    return listener(e);
  };
  target.addEventListener(type, listenerWrapper as EventListener, options as AddEventListenerOptions);
  return { target, type: type, options, listener: listenerWrapper as EventListener };
}

/**
 * Remove an event listener.
 * @param listenerToken - The return value of {@link on}.
 */
export function off({ target, type, listener, options }: EventListenerToken) {
  return target.removeEventListener(type, listener, options);
}

/**
 * "Halt" an event -- convenient wrapper for `preventDefault`, `stopPropagation`, and `stopImmediatePropagation`.
 * @param o - How to halt. Space-separated list of "default", "bubbling" and "propagation".
 * @param e - The event. 
 */
export function halt(o: string, e: Event) {
  for (const t of o.split(" ")) {
    if (t === "default")
      e.preventDefault();
    if (t === "bubbling")
      e.stopPropagation();
    if (t === "propagation")
      e.stopImmediatePropagation();
  }
}

/**
 * Decorator for any event listener to call {@link halt}.
 * 
 *     on(el, "click", halts("default", e => ...))
 *
 * @param o - See {@link halt~o}.
 * @param f
 */
export function halts<T extends Event>(o: string, f: (e: T) => void): (e: T) => void {
  return e => { halt(o, e); f(e); };
}

/**
 * Dispatch a {@link CustomEvent}.
 * @param el - the event target
 * @param type - the event type, e.g. `"myapp:clear-cart"`
 * @param [detail] - Event.detail
 */
export function dispatch(el: EventTarget, type: string, detail?: any) {
  return el.dispatchEvent(new CustomEvent(type, { detail }));
}

/**
 * Get, remove or set an attribute.
 * 
 * - attr(el, "name") Get the attribute "name"
 * - attr(el, "name", "value") Set the attribute "name" to "value"
 * - attr(el, "name", null) Remove the attribute "name"
 * - attr(el, [ nameA: "valueA", nameB: "valueB" ]) Set the attributes name-a to "valueA", name-b to "valueB"
 * 
 * @param el 
 * @param name - The attribute name **or** a map of names to values.
 *   If an object is passed, camelCase attribute names will be converted to kebab-case.
 * @param value - The value of the attribute, when setting. Pass `null` to remove an attribute.
 */
export function attr(el: Element, name: string | object, value: any = undefined): string | null {
  if (typeof name === "object") {
    for (const at in name) el.setAttribute(camelToKebab(at), name[at]);
    return null;
  }
  const curValue = el.getAttribute(name);
  if (value === undefined)
    return el.getAttribute(name);
  else if (value === null)
    return el.removeAttribute(name), curValue;
  else
    return el.setAttribute(name, value), value;
}

/**
 * Convert a node to equivalent HTML.
 */
export function stringifyNode(node: Node): string {
  const tmp = document.createElement("div");
  tmp.append(node);
  return tmp.innerHTML;
}

/**
 * HTML-escape a string.
 * If given a DOM node, it will return **unescaped** HTML for it.
 * Returns empty string when given null or undefined.
 */
export function htmlescape(s: any): string {
  if (s === null || s === undefined)
    return "";
  if (s instanceof Node)
    return stringifyNode(s);
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("'", "&#x27;")
    .replaceAll("\"", "&quot;");
}


/**
 * Template literal that escapes HTML in interpolated values and returns a DocumentFragment.
 * Can also be called with a string to parse it as HTML.
 * To let trusted HTML through escaping, parse it first:
 * 
 *     html`<p>My trusted markup: ${html(trustedMarkup)}</p>`
 */
export function html(str: TemplateStringsArray | string, ...values: any[]): DocumentFragment {
  const tmpl = document.createElement("template");
  if (typeof str === "object" && "raw" in str)
    str = String.raw(str, ...values.map(htmlescape));
  tmpl.innerHTML = str;
  return tmpl.content;
}

/**
 * 'Type "Element" cannot be assigned to type "HTMLElement"' SHUT UP
 * @param {*} [el] 
 * @returns {HTMLElement | null}
 */
export function asHtml(el: any): HTMLElement | null {
  return el instanceof HTMLElement ? el : null;
}

/**
 * Find the next element matching a given selector, searching deeply throughout the DOM.
 * @see traverse
 * @param root - The element within which to look for the next element, e.g. a menu.
 * @param selector - The selector to look for, e.g. `"[role=menuitem]"`.
 * @param [current] - The element to start the search from, e.g. the currently selected menu item.
 *    If missing, the first or last matching element will be returned (depending on search direction).
 * @param [options]
 * @param [options.wrap] Whether to wrap around when the end/start of {@link root} is reached.
 */
export function next(
  root: ParentNode,
  selector: string, 
  current: Element | null, 
  options: { wrap?: boolean } = {}
) {
  return traverse("next", root, selector, current, options);
}

/**
 * Find the previous element matching a given selector, searching deeply throughout the DOM.
 * @see traverse
 * @param root - The element within which to look for the next element, e.g. a menu.
 * @param selector - The selector to look for, e.g. `"[role=menuitem]"`.
 * @param [current] - The element to start the search from, e.g. the currently selected menu item.
 *    If missing, the first or last matching element will be returned (depending on search direction).
 * @param [options]
 * @param [options.wrap] Whether to wrap around when the end/start of {@link root} is reached.
 */
 export function prev(
  root: ParentNode,
  selector: string,
  current: Element | null,
  options: { wrap?: boolean } = {}
) {
  return traverse("previous", root, selector, current, options);
}

type KeyboardEventListener = (e: KeyboardEvent) => void;

/**
 * Create a handler for keyboard events using a keyboard shortcut DSL.
 * 
 * - "ArrowLeft"
 * - "Ctrl+Alt+3"
 */
export function hotkey(hotkeys: Record<string, KeyboardEventListener>): KeyboardEventListener {
  const alt = 0b1, ctrl = 0b10, meta = 0b100, shift = 0b1000;
  const handlers = {}; // handlers[key][modifiers as bitfields]
  const modifiersOf = (e: KeyboardEvent) => ~~(e.altKey && alt) | ~~(e.ctrlKey && ctrl) | ~~(e.metaKey && meta) | ~~(e.shiftKey && shift);
  const parse = (hotkeySpec: string) => {
      const
        tokens = hotkeySpec.split("+"), key = tokens.pop()!;
      let modifiers = 0 | 0;
      for (const token in tokens)
        switch (token.toLowerCase()) {
          case "alt": modifiers |= alt; break;
          case "ctrl": modifiers |= ctrl; break;
          case "meta": modifiers |= meta; break;
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
 * @param t - The debounce time.
 * @param f - The function.
 * @param [options.mode] - Leading or trailing debounce.
 */
export function debounce<TArgs extends any[]>(t: number, f: (...args: TArgs) => void, { mode = "trailing" } = {}): typeof f {
  let timeout: number | null = null;
  return (...args: TArgs) => {
    if (timeout)
      clearTimeout(timeout);
    else if (mode === "leading")
      f(...args);
    timeout = setTimeout(() => {
      if (mode === "trailing")
        f(...args);
      timeout = null;
    }, t);
  };
}

/**
 * Create a behavior that applies to elements matching the given selector.
 * @returns A function that can be called to apply the behavior to new elements within a subtree.
 */
export function behavior<TOptions>(selector: string, init: BehaviorInit<TOptions>): Behavior<TOptions> {
  const initialized = new WeakSet;
  return (subtree = document, options = {}) => {
    const root = subtree.getRootNode() as Root;
    $$(subtree, selector).forEach(el => {
      if (initialized.has(el))
        return;
      initialized.add(el);
      init(el, { options, root });
    });
  };
}

type Repeater<TData> = {
  /**
   * Returns the HTML id for a given data value.
   * @param datum The data value.
   */
  idOf(datum: TData): string;

  /**
   * Createsa an element for a data value.
   * @param data The data value
   * @param ctx.id The id the returned element should have.
   */
  create(data: TData, ctx: { id: string }): Node;

  /**
   * 
   * @param el The current element.
   * @param data The new data value.
   */
  update?(el: Element, data: TData): void;
}

/**
 * Repeat an element such that the list can be updated when data changes.
 * 
 * @param {object} context
 * @param {(data: TData) => string} context.idOf
 * @param {(data: TData, ctx: { id: string }) => Node} context.create
 * @param {(el: Element, data: TData) => void} [context.update]
 * @returns 
 */
export function repeater<TData>(container: ParentNode, rep: Repeater<TData>) {
  return (dataset: any) => {
    let cursor: ChildNode | null = null;

    const append = (...nodes: any[]) => {
      const oldcursor = cursor;
      cursor = nodes.at(-1);
      if (cursor instanceof DocumentFragment)
        cursor = cursor.lastChild;
      if (oldcursor)
        oldcursor.after(...nodes);
      else
        container.prepend(...nodes);
    };
    const clearAfter = (cursor: Node | null) => {
      if (cursor)
        while (cursor.nextSibling)
          cursor.nextSibling.remove();
      else
        container.replaceChildren();
    };

    const root = container.getRootNode() as Root;

    // TODO: use an actual morphing algo
    for (const datum of dataset) {
      const
        id = rep.idOf(datum), existing = root.getElementById(id);
      if (existing)
        append(rep.update?.(existing, datum) ?? existing);
      else
        append(rep.create(datum, { id }));
    }
    clearAfter(cursor);
  };
}
