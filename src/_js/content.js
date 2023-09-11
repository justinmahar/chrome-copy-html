"use strict";
/** Show a toast message in the upper right corner */
const showToast = (message) => {
    const bodyElements = document.getElementsByTagName("body");
    if (bodyElements.length > 0) {
        const bodyEl = bodyElements[0];
        const toast = document.createElement("div");
        toast.setAttribute("style", "background: white; color: black; padding: 5px 10px 5px 10px; position: fixed; top: 5px; right: 5px; border: solid 1px #aaaaaa; border-radius: 5px; font-size: 20px; font-family: Arial, Helvetica, sans-serif; box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1); z-index: 99999;");
        toast.textContent = message;
        bodyEl.appendChild(toast);
        setTimeout(() => {
            bodyEl.removeChild(toast);
        }, 2000);
    }
};
/** Copy the provided text to the clipboard, and show a toast message with the results. */
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
/** Copy the document HTML to the clipboard. */
const copyHtml = () => {
    const htmlElements = document.getElementsByTagName("html");
    if (htmlElements.length > 0) {
        const htmlElement = htmlElements[0];
        copy(htmlElement.outerHTML);
    }
};
/** Shortcut listener */
document.addEventListener("keydown", (e) => {
    /** Ctrl+Shift+Alt+H shortcut */
    if (e.ctrlKey && e.shiftKey && e.altKey && !e.metaKey && e.code === "KeyH") {
        copyHtml();
    }
});
