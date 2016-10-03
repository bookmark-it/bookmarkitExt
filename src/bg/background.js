if (!store.enabled) {
    alert('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser.')
    return
  }
}

//example of using a message handler from the inject scripts
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
});

chrome.browserAction.onClicked.addListener(function(tab) {
	if (store.get('bk-it_token')) {
		injectWrapper(null, '/src/inject/login.js');
	} else {
		injectWrapper(null, '/src/inject/login.js');
	}
});

function bookmarkFlow(tab) {
	injectWrapper(tab.id, '/src/inject/bookmark.js');
	addBookmark(tab)
	// if success, send the bookmark to the popin
	.done(function(result) {
		chrome.tabs.sendMessage(tabId, {bookmark: result});
	})
	.fail(function() {
		// if error, send the error to the popin
		// if exists, send the bookmark info to the popin
		searchBookmark(url)
		.then(function(result){
			chrome.tabs.sendMessage(tabId, {bookmark: result});
		})
	})
}

function loginFlow(tab) {
	injectWrapper(tab.id, '/src/inject/login.js');
	// send login
	// if success, bookmarkFlow
	// if error, send the error to the popin
}
