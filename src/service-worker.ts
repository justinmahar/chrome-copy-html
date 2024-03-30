chrome.commands.onCommand.addListener((command) => {
  if (command === 'copy-html') {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs.length > 0) {
        const firstTab = tabs[0];
        chrome.tabs.sendMessage(firstTab.id ?? -1, { message: 'copy-html-shortcut' });
      }
    });
  }
});
