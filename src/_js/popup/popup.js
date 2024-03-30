"use strict";
const requestHtml = (onSuccess, onError) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length > 0) {
            const firstTab = tabs[0];
            chrome.tabs.sendMessage(firstTab.id ?? -1, { message: 'copy-html-popup-button' }, (response) => {
                navigator.clipboard
                    .writeText(response ?? '')
                    .then(() => {
                    if (onSuccess) {
                        onSuccess();
                    }
                })
                    .catch((e) => {
                    if (onError) {
                        onError(e);
                    }
                });
            });
        }
    });
};
const button = document.getElementById('copy-html-button');
let clickDisabled = false;
if (button) {
    button.addEventListener('click', () => {
        if (!clickDisabled) {
            const successMessage = '✅ Copied!';
            const errorMessage = '❌ Error';
            const buttonText = 'Copy HTML';
            const timeoutDelay = 2000;
            const onSuccess = () => {
                button.innerText = successMessage;
                setTimeout(() => {
                    button.innerText = buttonText;
                    clickDisabled = false;
                }, timeoutDelay);
            };
            const onError = (e) => {
                button.innerText = errorMessage;
                clickDisabled = false;
                console.error(errorMessage, e);
                setTimeout(() => {
                    button.innerText = buttonText;
                }, timeoutDelay);
            };
            requestHtml(onSuccess, onError);
        }
    });
}
