const requestHtml = (onSuccess?: () => void, onError?: (e: any) => void) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs.length > 0) {
      const firstTab = tabs[0];
      chrome.tabs.sendMessage(firstTab.id ?? -1, { message: 'copy-html-via-popup' }, (response: any) => {
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
const buttonLabel = document.getElementById('copy-html-button-label');

const handleCopy = () => {
  if (button && buttonLabel) {
    const buttonSuccessText = '✅ HTML Copied!';
    const buttonErrorText = '❌ Error';
    const buttonRegularText = 'Copy HTML';

    const buttonLabelRegularText = 'To copy HTML, press:';
    const buttonLabelSuccessText = 'HTML copied to clipboard!';
    const buttonLabelErrorText = 'An error occurred: ';

    const timeoutDelay = 2000;
    const onSuccess = () => {
      button.innerText = buttonSuccessText;
      buttonLabel.innerText = buttonLabelSuccessText;
      setTimeout(() => {
        button.innerText = buttonRegularText;
        buttonLabel.innerText = buttonLabelRegularText;
        clickDisabled = false;
      }, timeoutDelay);
    };
    const onError = (e: any) => {
      button.innerText = buttonErrorText;
      buttonLabel.innerText = buttonLabelErrorText + `${e.message ?? e}`;
      clickDisabled = false;
      console.error(buttonErrorText, e);
      setTimeout(() => {
        button.innerText = buttonRegularText;
        buttonLabel.innerText = buttonLabelRegularText;
      }, timeoutDelay);
    };
    requestHtml(onSuccess, onError);
  }
};

let clickDisabled = false;
if (button) {
  button.addEventListener('click', () => {
    if (!clickDisabled) {
      handleCopy();
    }
  });
}

chrome.storage.sync.get({ autoCopy: true }, (items) => {
  if (items.autoCopy) {
    handleCopy();
  }
});
