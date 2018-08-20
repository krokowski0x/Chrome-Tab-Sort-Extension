// Container for all tabs
let domains = [];
// Sort only current window tabs
const params = {
	currentWindow: true
};

// Chrome extension event listener
chrome.browserAction.onClicked.addListener(sortingTriggered);

// When sorting has been triggered
sortingTriggered = () => {
	// Clear previous container
	domains = [];
	// Rearrange tabs in current window
	chrome.tabs.query(params, sortTabs);
};

sortTabs = tabs => {
	// For each tab
	for (tab of tabs) {
		// Parse it from url to domain name
		const domain = {
			domain: tab.url.replace(/^(https||http)\:\/\/(www\.||)(.*?)\..*/g, "$3"),
			isPDF: /.pdf$/g.test(tab.url),
			id: tab.id
		};
		domains.push(domain);
	}
	// Sort domains
	domains.sort((prev, next) => prev.domain > next.domain);
	// Rearrange tabs
	for (const [index, domain] of domains.entries()) {
		// If it's PDF, move it to the end
		if (domain.isPDF) chrome.tabs.move(domain.id, { index: -1 });
		else chrome.tabs.move(domain.id, { index });
	}
};
