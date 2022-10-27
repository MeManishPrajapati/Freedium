// Get save button
const button = document.getElementById('saveButton');

// Add click listner
button.addEventListener('click', (e) => {
	// prevent default submit behaviour
	e.preventDefault();
	// Get selected radio button
	const value = document.querySelector('input[name="config"]:checked')?.value;
	if (value)
		// set value in chrome storage
		chrome.storage.local.set({ config: value }, function () {
			// Change button text
			button.innerText = 'Updated';
			// After two second refresh the page
			setTimeout(() => {
				button.innerText = 'Save';
				chrome.tabs.reload(function () {});
			}, 2000);
		});
});

// When extestion loads the script,
// get selected config from chrome storage
// then set form radio button
// default is button
chrome.storage.local.get(['config'], function (result) {
	const selectedConfig = result?.config ?? 'button';
	document.getElementById(selectedConfig).checked = true;
});
