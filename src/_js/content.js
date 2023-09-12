"use strict";
/** Show a notification in the upper right corner */
const showNotification = (message) => {
    const bodyElements = document.getElementsByTagName('body');
    if (bodyElements.length > 0) {
        const bodyEl = bodyElements[0];
        const notification = document.createElement('div');
        notification.setAttribute('style', 'background: white; color: black; padding: 5px 10px 5px 10px; position: fixed; top: 5px; right: 5px; border: solid 1px #aaaaaa; border-radius: 5px; font-size: 20px; font-family: Arial, Helvetica, sans-serif; box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1); z-index: 99999;');
        notification.textContent = message;
        bodyEl.appendChild(notification);
        // Remove notification after a moment
        setTimeout(() => {
            bodyEl.removeChild(notification);
        }, 2000);
    }
};
const successMessage = `✅ HTML Copied!`;
const failureMessage = `❌ Failed to copy`;
/** Copy the provided text to the clipboard, and show a notification with the results. */
const copy = (text, legacy = false) => {
    if (!legacy) {
        navigator.clipboard
            .writeText(text)
            .then(() => {
            showNotification(successMessage);
        })
            .catch((e) => {
            showNotification(failureMessage);
            console.error(failureMessage, e);
        });
    }
    else {
        legacyCopy(text);
    }
};
/** Copy the document HTML to the clipboard. */
const copyHtml = (legacy = false) => {
    const htmlElements = document.getElementsByTagName('html');
    if (htmlElements.length > 0) {
        const htmlElement = htmlElements[0];
        copy(htmlElement.outerHTML, legacy);
    }
};
/** Shortcut listener */
document.addEventListener('keydown', (e) => {
    /** Ctrl+Shift+Alt+H shortcut */
    if (e.ctrlKey && e.shiftKey && e.altKey && !e.metaKey && e.code === 'KeyH') {
        copyHtml();
    }
});
const legacyCopy = (text) => {
    showNotification('⏳ Copying...');
    setTimeout(() => {
        const textArea = document.createElement('textarea');
        textArea.setAttribute('style', 'position: fixed; top: 5px; right: 5px; z-index: -99999; opacity: 0;');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification(successMessage);
    }, 50);
};
chrome.runtime.onMessage.addListener(function (payload, sender) {
    if (payload.message === 'copy-html-action') {
        copyHtml(true);
    }
});
