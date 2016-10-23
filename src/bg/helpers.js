function injectWrapper(tabId, file, callback) {
  chrome.tabs.insertCSS(tabId, { file: "/css/material.css" }, function() {
    chrome.tabs.insertCSS(tabId, { file: "/css/login.css" }, function() {});
    chrome.tabs.insertCSS(tabId, { file: "/css/bookmark.css" });
    chrome.tabs.insertCSS(tabId, { file: "/css/shared.css" }, function() {
      chrome.tabs.executeScript(tabId, { file: "/js/jquery.min.js" }, function() {
        chrome.tabs.executeScript(tabId, { file: "/js/material.min.js" }, function() {
          chrome.tabs.executeScript(tabId, { file: "/js/hogan.min.js" }, function() {
            chrome.tabs.executeScript(tabId, { file: "/src/inject/utils.js" }, function() {
              chrome.tabs.executeScript(tabId, { file: file }, callback);
            });
          });
        });
      });
    });
  });
}

function setAuthentication(token) {
  store.set('bk-it_token', token);
}

function removeAuthentication() {
  store.remove('bk-it_token');
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

  return $.ajax(params)
    .catch(function(error) {
      if (error.status === 401) {
        removeAuthentication();
        loginFlow();
      }
    });
}
