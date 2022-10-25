const links = document.querySelectorAll('a[href^="https://medium.com/"]');

const badge = document.createElement('span');
badge.textContent = `FM`;
badge.style.color = 'coral';
badge.style.border = '1px solid coral';
badge.style.padding = '2px';

links.forEach((mediumLink) => {
	mediumLink.innerHTML += badge.outerHTML;
	mediumLink.addEventListener('click', (e) => {
		e.preventDefault();
		const url = e.currentTarget.getAttribute('href');
		chrome.runtime.sendMessage({
			type: 'notification',
			options: {
				url,
			},
		});
	});
});

// todo: When user directly open medium site, show them popup with open in incognito option