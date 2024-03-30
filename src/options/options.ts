// Saves options to chrome.storage
const saveOptions = () => {
  const showCopyNotificationCheckbox = document.getElementById('show-copy-notification-checkbox') as
    | HTMLInputElement
    | undefined;
  const showCopyNotification = !!showCopyNotificationCheckbox?.checked;

  chrome.storage.sync.set({ showCopyNotification }, () => {
    // Update status to let user know options were saved.
    const status = document.getElementById('status');
    if (status) {
      status.textContent = '✅ Options saved.';
      setTimeout(() => {
        status.textContent = '';
      }, 2000);
    }
  });
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.sync.get({ showCopyNotification: true }, (items) => {
    const showCopyNotificationCheckbox = document.getElementById('show-copy-notification-checkbox') as
      | HTMLInputElement
      | undefined;
    if (showCopyNotificationCheckbox) {
      showCopyNotificationCheckbox.checked = items.showCopyNotification;
    }
  });
};

document.addEventListener('DOMContentLoaded', restoreOptions);
const saveButtonElement = document.getElementById('save-button');
saveButtonElement?.addEventListener('click', saveOptions);
