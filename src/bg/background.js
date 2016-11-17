if (!store.enabled) {
  alert('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser.')
}

//example of using a message handler from the inject scripts
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (!request) {
    return;
  }
  if (request.login) {
    login(request.data)
      .done(function(result) {
        setAuthentication(result.auth_token);
        bookmarkFlow(sender.tab);
      })
      .fail(function(error) {
        chrome.tabs.sendMessage(sender.tab.id, {
          error: true,
          data: error
        });
        return;
      })
  } else if (request.bookmark_update) {
    updateBookmark(request.data);
  } else if (request.bookmark_remove) {
    deleteBookmark(request.data)
      .done(function(result) {
        chrome.tabs.sendMessage(sender.tab.id, {
          bookmark_removed: true
        });
      });
  } else if (request.settings) {
    chrome.runtime.openOptionsPage();
  } else if (request.logout) {
    removeAuthentication();
    loginFlow(sender.tab);
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
    if (!request) {
      return;
    }
    if (request.loaded) {
      addBookmark({
        "title": tab.title,
        "url": tab.url,
        "favicon_url": tab.favIconUrl,
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
