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
        isPDF: (/.pdf$/g).test(tab.url),
        id: tab.id,
      }
      domains.push(domain);
    }
    domains.sort((prev,next) => (prev.domain > next.domain));
    for (const [index, domain] of domains.entries()) {
      if (domain.isPDF) {
        chrome.tabs.move(domain.id,{index: -1});
      } else {
      chrome.tabs.move(domain.id,{index: index});
      }
    }
  }
