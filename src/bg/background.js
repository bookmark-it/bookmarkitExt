if (!store.enabled) {
  alert('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser.')
}

//example of using a message handler from the inject scripts
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.login) {
    login(request.data)
      .done(function(result) {
        setAuthentication(result.auth_token);
        bookmarkFlow(sender.tab);
      })
  } else if (request.bookmark_update) {
    updateBookmark(request.data)
  }
});

chrome.browserAction.onClicked.addListener(function(tab) {
  if (store.get('bk-it_token')) {
    bookmarkFlow(tab);
  } else {
    loginFlow(tab);
  }
});

function bookmarkFlow(tab) {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.loaded) {
      addBookmark({
        "title": tab.title,
        "url": tab.url,
        "image_url": tab.favIconUrl,
        "categories": [],
        "keywords": []
      })
      // if success, send the bookmark to the popin
      .done(function(result) {
        chrome.tabs.sendMessage(tab.id, {
          bookmark: true,
          data: result
        });
      })
    }
  });

  injectWrapper(tab.id, '/src/inject/bookmark.js');
}

function loginFlow(tab) {
  injectWrapper(tab ? tab.id : null, '/src/inject/login.js');
  // send login
  // if success, bookmarkFlow
  // if error, send the error to the popin
}
