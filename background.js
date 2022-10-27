chrome.runtime.onInstalled.addListener(() => {
	// On install complete, set default config
	chrome.storage.local.set({ config: 'button' }, function () {});
});

// It'll listen to the message
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.type == 'notification')
		// open incognito window
		chrome.windows.create({ url: request.options.url, incognito: true });
	// callback
	sendResponse?.();
});
