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
  }
});

chrome.browserAction.onClicked.addListener(function(tab) {
	if (store.get('bk-it_token')) {
	   bookmarkFlow(tab);
	} else {
    loginFlow(tab);
	}
});

function setAuthentication(token) {
  store.set('bk-it_token', token);
}

function bookmarkFlow(tab) {
	injectWrapper(tab.id, '/src/inject/bookmark.js');
  console.log('tab', tab);
	addBookmark({
    "title": tab.title,
    "url": tab.url,
    "categories": [],
    "keywords": []
  })
	// if success, send the bookmark to the popin
	.done(function(result) {
    console.log('result', result);
		chrome.tabs.sendMessage(tab.id, {bookmark: true, data: result});
	})
	.fail(function(error) {
    console.log('error', error);
		// if error, send the error to the popin
		// if exists, send the bookmark info to the popin
		searchBookmark(tab.url)
  	.then(function(result){
  		chrome.tabs.sendMessage(tab.id, {bookmark: true, data: result});
  	})
	})
}

function loginFlow(tab) {
	injectWrapper(tab.id, '/src/inject/login.js');
	// send login
	// if success, bookmarkFlow
	// if error, send the error to the popin
}
