function injectWrapper(tabId, file, data) {
  chrome.tabs.insertCSS(tabId, { file: "/css/styles.css" });
  chrome.tabs.insertCSS(tabId, { file: "/css/material.css" });
  // chrome.tabs.insertCSS(tabId, { file: "/css/reset.css" });
  chrome.tabs.executeScript(tabId, { file: "/js/jquery.min.js" }, function() {
    chrome.tabs.executeScript(tabId, { file: "/js/material.min.js" }, function() {
      chrome.tabs.executeScript(tabId, { file: "/js/hogan.min.js" }, function() {
        chrome.tabs.executeScript(tabId, { file: file });
      });
    });
  });
}

function request(options) {
  return $.ajax({
    url: options.url,
    type: options.type || 'get',
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: options.data || null,
    headers: {
      "Authorization": "Token " + store.get('bk-it_token')
    }
  });
}
