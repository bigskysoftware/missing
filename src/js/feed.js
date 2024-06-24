/// <reference lib="es2022" />

import { $, $$, on, dispatch, halts, attr, next, prev, asHtml, hotkey, behavior, makelogger } from "./19.js"

const ilog = makelogger("feed");
const sFeed = "[role=feed]";
const sScopedArticle = ":scope > article, :scope > [role=article]";
const sArticle = "article, [role=article]";
const sFocusable = ":is(a, area)[href], :is(button, details, embed, iframe, label, select, textarea):not([disabled]), :is(audio, video)[controls], :is(img, object)[usemap], [tabindex]:not([tabindex='-1'])"

/**
 * @param {HTMLElement} feed
 * @returns {HTMLElement[]}
 */
const articles = feed => $$(feed, sScopedArticle);


/**
 * @param {HTMLElement} feed
 * @param {HTMLElement} activeElement
 * @returns {null}
 */
const focusPreviousArticle = (feed, activeElement) => asHtml(prev(feed, sArticle, activeElement, {wrap: false}))?.focus();


/**
 * @param {HTMLElement} feed
 * @param {HTMLElement} activeElement
 * @returns {null}
 */
const focusNextArticle = (feed, activeElement) => asHtml(next(feed, sArticle, activeElement.closest(sArticle), {wrap: false}))?.focus();


/**
 * @param {HTMLElement} article
 * @returns {null}
 */
const focusOutsideFeed = article => asHtml(article.parentElement.closest(sArticle))?.focus();


/**
 * @param {HTMLElement} article
 * @returns {null}
 */
const focusInsideFeed = activeElement => asHtml($(activeElement.closest(sArticle), sArticle))?.focus();


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
        "PageUp": halts("default propagation", _ => focusPreviousArticle(feed, root.activeElement)),
        "PageDown": halts("default propagation", _ => focusNextArticle(feed, root.activeElement)),
        "Alt+PageUp": halts("default", _ => focusOutsideFeed(root.activeElement)),
        "Alt+PageDown": halts("default", _ => focusInsideFeed(root.activeElement)),
        "Ctrl+Home": halts("default propagation", _ => focusBeforeFeed(feed)),
        "Ctrl+End": halts("default propagation", _ => focusAfterFeed(feed)),
    }));
});

feed(document);
