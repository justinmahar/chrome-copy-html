"use strict";
// Saves options to chrome.storage
const saveOptions = () => {
    const autoCopyCheckbox = document.getElementById('auto-copy-checkbox');
    const autoCopy = !!autoCopyCheckbox?.checked;
    chrome.storage.sync.set({ autoCopy }, () => {
        // Update status to let user know options were saved.
        const status = document.getElementById('status');
        if (status) {
            status.textContent = '✅ Options saved';
            setTimeout(() => {
                status.textContent = '';
            }, 2000);
        }
    });
};
// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
    chrome.storage.sync.get({ autoCopy: true }, (items) => {
        const autoCopyCheckbox = document.getElementById('auto-copy-checkbox');
        if (autoCopyCheckbox) {
            autoCopyCheckbox.checked = items.autoCopy;
        }
    });
};
document.addEventListener('DOMContentLoaded', restoreOptions);
const saveButtonElement = document.getElementById('save-button');
saveButtonElement?.addEventListener('click', saveOptions);
