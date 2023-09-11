"use strict";
var _a;
const article = document.querySelector("article");
// `document.querySelector` may return null if the selector doesn't match anything.
if (article) {
    const text = article.textContent;
    if (typeof text === "string") {
        const wordMatchRegExp = /[^\s]+/g; // Regular expression
        const words = text.matchAll(wordMatchRegExp);
        // matchAll returns an iterator, convert to array to get word count
        const wordCount = [...words].length;
        const readingTime = Math.round(wordCount / 200);
        const badge = document.createElement("p");
        // Use the same styling as the publish information in an article's header
        badge.classList.add("color-secondary-text", "type--caption");
        badge.textContent = `⏱️ ${readingTime} min read`;
        // Support for API reference docs
        const heading = article.querySelector("h1");
        // Support for article docs with date
        const date = (_a = article.querySelector("time")) === null || _a === void 0 ? void 0 : _a.parentNode;
        (date !== null && date !== void 0 ? date : heading).insertAdjacentElement("afterend", badge);
    }
}
