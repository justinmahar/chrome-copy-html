"use strict";
/** Get the HTML as a string. */
const getHtml = () => {
    const htmlElements = document.getElementsByTagName('html');
    if (htmlElements.length > 0) {
        const htmlElement = htmlElements[0];
        return htmlElement.outerHTML;
    }
    return undefined;
};
/** Listen for a request from the popup for the HTML; send the HTML as a response to the popup. */
chrome.runtime.onMessage.addListener(function (payload, sender, sendResponse) {
    if (payload.message === 'copy-html-via-popup') {
        sendResponse(getHtml());
    }
});
