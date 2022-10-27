const links = document.querySelectorAll('a[href^="https://medium.com/"]');

const getBadge = (isLink) => {
	const badge = document.createElement(isLink ? 'a' : 'span');
	isLink && badge.setAttribute('data-freedium', 'fm');
	badge.textContent = `FM`;
	badge.classList.add('badge');

	return badge;
};

const addClickListner = (element) => {
	element.addEventListener('click', (e) => {
		// If item have dataset
		if (e.currentTarget.dataset.freedium == 'fm') {
			// prevent default behaviour
			e.preventDefault();
			// get link from anchor tag
			const url = e.currentTarget.getAttribute('href');
			// send message to the background.js
			// we are passing url to open new incognito window
			chrome.runtime.sendMessage({
				type: 'notification',
				options: {
					url,
				},
			});
		}
	});
};

// When any site loaded
// we are getting user's config from chrome storage and the updating page
chrome.storage.local.get(['config'], function (result) {
	updateGooglePage(result.config);
});

const updateGooglePage = (preconfig) => {
	// If user has selected these to type
	if (preconfig === 'button' || preconfig === 'invisible') {
		// then create new link element (we can add other element too) [nested anchor tag is not good practice]
		const link = getBadge(true);
		// add new link besides all medium link
		links.forEach((mediumLink) => {
			link.href = mediumLink.getAttribute('href');
			mediumLink.innerHTML += link.outerHTML;
		});
		// add event listner to new links
		const buttons = document.querySelectorAll('[data-freedium="fm"]');
		buttons.forEach((button) => {
			button.classList.add(preconfig);
			addClickListner(button);
		});
		return;
	}

	// const badge = getBadge();
	// mediumLink.innerHTML += badge.outerHTML;

	// If it's direct type
	// then add event listner to the main link
	links.forEach((mediumLink) => {
		mediumLink.setAttribute('data-freedium', 'fm');
		addClickListner(mediumLink);
	});
};
