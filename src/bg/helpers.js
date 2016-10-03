function injectWrapper(tabId, file, data) {
  chrome.tabs.insertCSS(tabId, { file: "/css/material.css" }, function() {
    chrome.tabs.insertCSS(tabId, { file: "/css/styles.css" }, function() {
      chrome.tabs.executeScript(tabId, { file: "/js/jquery.min.js" }, function() {
        chrome.tabs.executeScript(tabId, { file: "/js/material.min.js" }, function() {
          chrome.tabs.executeScript(tabId, { file: "/js/hogan.min.js" }, function() {
            chrome.tabs.executeScript(tabId, { file: "/src/inject/utils.js" }, function() {
              chrome.tabs.executeScript(tabId, { file: file });
            });
          });
        });
      });
    });
  });
}

function request(options) {
  var params = {
    url: options.url,
    type: options.type || 'get',
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: options.data || null,
  }

  if (!options.noToken) {
    params.headers = {
      "Authorization": "Token " + store.get('bk-it_token')
    }
  }

  return $.ajax(params);
}
