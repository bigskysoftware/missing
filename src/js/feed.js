// https://www.w3.org/WAI/ARIA/apg/patterns/feed/examples/feed/

/// <reference lib="es2022" />

import { $, $$, on, dispatch, halts, attr, next, prev, asHtml, hotkey, behavior, makelogger } from "./19.js"

const ilog = makelogger("feed");
const sFeed = "[role=feed]";
const sScopedArticle = ":scope > article, :scope > [role=article]";
const sArticle = "article, [role=article]";
const sFocusable = "a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex='-1'])";
const sFirstNested = "[aria-posinset='1']"

/**
 * @param {HTMLElement} feed
 * @returns {HTMLElement[]}
 */
const articles = feed => $$(feed, sScopedArticle);


/**
 * @param {HTMLElement} feed
 * @returns {null}
 */
const focusPreviousArticle = (feed, activeElement) => asHtml(prev(feed, sArticle, activeElement, {}))?.focus();


/**
 * @param {HTMLElement} feed
 * @returns {null}
 */
const focusNextArticle = (feed, activeElement) => asHtml(next(feed, sArticle, activeElement, {}))?.focus();


/**
 * @param {HTMLElement} feed
 * @returns {null}
 */
const focusFirstNested = (feed, activeElement) => asHtml(next(feed, sFirstNested, activeElement, {wrap: false}))?.focus();


/**
 * @param {HTMLElement} feed
 * @returns {null}
 */
const focusBeforeFeed = feed => asHtml(prev(document.body, sFocusable, feed, {}))?.focus();


/**
 * @param {HTMLElement} feed
 * @returns {null}
 */
const focusAfterFeed = feed => asHtml(next(document.body, sFocusable, feed, {}))?.focus();


/* TODO: How to rerun this when more are loaded? */
export const feed = behavior(sFeed, (feed, { root }) => {
    if (!(feed instanceof HTMLElement)) return;

    feed.setAttribute("aria-busy", "false");

    articles(feed).forEach((article, idx, articles) => {
      article.setAttribute("tabindex", "0");
      article.setAttribute("aria-posinset", idx + 1);
      article.setAttribute("aria-setsize", articles.length);
      if (!(article.hasAttribute("aria-labelledby") || article.hasAttribute("aria-label")))
          console.error("Article", article, "has no accessible name (aria-label or aria-labelledby)");
    });

    on(feed, "keydown", hotkey({
        "PageDown": halts("default", _ => focusNextArticle(feed, root.activeElement)),
        "PageUp": halts("default", _ => focusPreviousArticle(feed, root.activeElement)),
        /* TODO: Commands with + are not working */
        "Alt+PageDown": halts("default", _ => focusFirstNested(feed, root.activeElement)),
        "Control+End": halts("default", _ => focusAfterFeed(feed)),
        "Control+Home": halts("default", _ => focusBeforeFeed(feed)),
    }));
});

feed(document);
