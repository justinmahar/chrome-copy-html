"use strict";
const showToast = (message) => {
    const bodyElements = document.getElementsByTagName("body");
    if (bodyElements.length > 0) {
        const bodyEl = bodyElements[0];
        const toast = document.createElement("div");
        // Use the same styling as the publish information in an article's header
        toast.setAttribute("style", "background: white; color: black; padding: 5px 10px 5px 10px; position: fixed; top: 5px; right: 5px; border: solid 1px #aaaaaa; border-radius: 5px; font-size: 20px; font-family: Arial, Helvetica, sans-serif; box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1); z-index: 99999;");
        toast.textContent = message;
        bodyEl.appendChild(toast);
        setTimeout(() => {
            bodyEl.removeChild(toast);
        }, 2000);
    }
};
const copy = (text) => {
    navigator.clipboard
        .writeText(text)
        .then(() => {
        showToast(`📋 HTML Copied!`);
    })
        .catch((e) => {
        showToast(`❌ Failed to copy`);
        console.error(`❌ Failed to copy:`, e);
    });
};
const copyHtml = () => {
    const htmlElements = document.getElementsByTagName("html");
    if (htmlElements.length > 0) {
        const htmlElement = htmlElements[0];
        console.log(htmlElement.outerHTML);
        copy(htmlElement.outerHTML);
    }
};
let ctrlDown = false;
let shiftDown = false;
let altDown = false;
let metaDown = false;
document.addEventListener("keydown", (e) => {
    console.log(e.key);
    if (e.key === "Control") {
        ctrlDown = true;
    }
    if (e.key === "Shift") {
        shiftDown = true;
    }
    if (e.key === "Alt") {
        altDown = true;
    }
    if (e.key === "Meta") {
        metaDown = true;
    }
    if (ctrlDown && shiftDown && altDown && !metaDown && e.code === "KeyH") {
        copyHtml();
    }
});
document.addEventListener("keyup", (e) => {
    if (e.key === "Control") {
        ctrlDown = false;
    }
    if (e.key === "Shift") {
        shiftDown = false;
    }
    if (e.key === "Alt") {
        altDown = false;
    }
    if (e.key === "Meta") {
        metaDown = false;
    }
});
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
        const date = article.querySelector("time")?.parentNode;
        (date ?? heading).insertAdjacentElement("afterend", badge);
    }
}
