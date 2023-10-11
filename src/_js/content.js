'use strict';
/** Show a notification in the upper right corner */
const showNotification = (message) => {
  const bodyElements = document.getElementsByTagName('body');
  if (bodyElements.length > 0) {
    const bodyEl = bodyElements[0];
    const notification = document.createElement('div');
    notification.setAttribute(
      'style',
      'background: white; color: black; padding: 5px 10px 5px 10px; position: fixed; top: 5px; right: 5px; border: solid 1px #aaaaaa; border-radius: 5px; font-size: 20px; font-family: Arial, Helvetica, sans-serif; box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1); z-index: 99999;',
    );
    notification.textContent = message;
    bodyEl.appendChild(notification);
    // Remove notification after a moment
    setTimeout(() => {
      bodyEl.removeChild(notification);
    }, 2000);
  }
};
/** Copy the provided text to the clipboard, and show a notification with the results. */
const copy = (text) => {
  const successMessage = `✅ HTML Copied!`;
  const failureMessage = `❌ Failed to copy`;
  navigator.clipboard
    .writeText(text)
    .then(() => {
      showNotification(successMessage);
    })
    .catch((e) => {
      showNotification(failureMessage);
      console.error(failureMessage, e);
    });
};
/** Get the HTML as a string. */
const getHtml = () => {
  const htmlElements = document.getElementsByTagName('html');
  if (htmlElements.length > 0) {
    const htmlElement = htmlElements[0];
    return htmlElement.outerHTML;
  }
  return undefined;
};
/** Copy the document HTML to the clipboard. */
const copyHtml = () => {
  const html = getHtml();
  if (html) {
    copy(html);
  }
};
/** Shortcut listener */
document.addEventListener('keydown', (e) => {
  /** Ctrl+Shift+Alt+H shortcut */
  if (e.ctrlKey && e.shiftKey && e.altKey && !e.metaKey && e.code === 'KeyC') {
    copyHtml();
  }
});
chrome.runtime.onMessage.addListener(function (payload, sender, sendResponse) {
  if (payload.message === 'copy-html-action') {
    sendResponse(getHtml());
  }
});
