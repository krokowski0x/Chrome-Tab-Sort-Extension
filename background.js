  let domains = [];

  chrome.browserAction.onClicked.addListener(sortingTriggered);

  function sortingTriggered() {
    domains = [];
    chrome.tabs.query(params, sortTabs);
  }

  const params = {
    currentWindow: true
  };

  function sortTabs(tabs) {
    for (tab of tabs) {
      const domain = {
        domain: tab.url.replace(/^(https||http)\:\/\/(www\.||)(.*?)\..*/g,'$3'),
        id: tab.id,
        oldIndex: tab.index
      }
      domains.push(domain);
    }
    domains.sort((prev,next) => (prev.domain > next.domain));
    console.log(domains);
    for (let i = 0; i < domains.length; i++) {
      chrome.tabs.move(domains[i].id,{index: i});
    }
  }
