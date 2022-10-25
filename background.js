chrome.runtime.onInstalled.addListener(() => {
	// chrome.action.setBadgeText({
	//   text: "OFF",
	// });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.type == 'notification')
		chrome.windows.create({ url: request.options.url, incognito: true });
	sendResponse();
});
