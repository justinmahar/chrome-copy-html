"use strict";
const button = document.getElementById('copy-html-button');
let clickDisabled = false;
if (button) {
    button.addEventListener('click', () => {
        if (!clickDisabled) {
            const successMessage = '✅ Copied!';
            const errorMessage = '❌ Error';
            const buttonText = 'Copy HTML';
            const timeoutDelay = 2000;
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                if (tabs.length > 0) {
                    const firstTab = tabs[0];
                    chrome.tabs.sendMessage(firstTab.id ?? -1, { message: 'copy-html-action' }, (response) => {
                        clickDisabled = true;
                        navigator.clipboard
                            .writeText(response ?? '')
                            .then(() => {
                            button.innerText = successMessage;
                            setTimeout(() => {
                                button.innerText = buttonText;
                                clickDisabled = false;
                            }, timeoutDelay);
                        })
                            .catch((e) => {
                            button.innerText = errorMessage;
                            clickDisabled = false;
                            console.error(errorMessage, e);
                            setTimeout(() => {
                                button.innerText = buttonText;
                            }, timeoutDelay);
                        });
                    });
                }
            });
        }
    });
}
