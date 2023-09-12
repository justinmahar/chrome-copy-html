console.log('Script loaded!');

const button = document.getElementById('copy-html-button');
console.log('button', button);
button?.addEventListener('click', () => {
  console.log('Sending message...');
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs.length > 0) {
      const firstTab = tabs[0];
      chrome.tabs.sendMessage(firstTab.id ?? -1, { message: 'copy-html-action' });
    }
  });
});
