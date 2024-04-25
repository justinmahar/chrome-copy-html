/** Get the HTML as a string. */
const getHtml = (): string | undefined => {
  const htmlElements = document.getElementsByTagName('html');
  if (htmlElements.length > 0) {
    const htmlElement = htmlElements[0];
    return htmlElement.outerHTML;
  }
  return undefined;
};

/** Listen for a request from the popup for the HTML; send the HTML as a response to the popup. */
chrome.runtime.onMessage.addListener(function (
  payload: any,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: any) => void,
) {
  if (payload.message === 'copy-html-via-popup') {
    sendResponse(getHtml());
  }
});
