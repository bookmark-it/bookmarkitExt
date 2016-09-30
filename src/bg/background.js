var api_url = "http://bk-it.herokuapp.com/api/",
		search_url = "http://bk-it.herokuapp.com/bookmarks/search/";

function searchBookmark (tab, token) {
	$.ajax({
		url: search_url,
		contentType: "application/json; charset=utf-8",
		data: {
			"query": tab.url
		},
		headers: {
			"Authorization": "Token " + token
		},
		success: function (result) {
			if (result.length > 0) {
				injectSaveBookmark(tab.id, result[0]);
			}
		},
		error: function(error) {
			console.log('error');
		}
	});
}

function addBookmark (tab, token) {
	$.ajax({
        url: api_url + "bookmarks",
        type: "post",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
  		    "title": tab.title,
  		    "url": tab.url,
          "categories": [],
          "keywords": []
        }),
        headers: {
          "Authorization": "Token " + token
        },
        success: function (result) {
          injectSaveBookmark(tab.id, result);
        },
        error: function(error) {
          searchBookmark(tab, token);
        }
	});
};

function updateBookmark (tab, bookmark) {
	chrome.storage.local.get('bk-it_token', function(token) {
    if (token && token['bk-it_token']) {
			$.ajax({
				url: api_url + "bookmarks/" + bookmark.id,
				type: "put",
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify(bookmark),
				headers: {
					"Authorization": "Token " + token['bk-it_token']
				},
				success: function (result) {
					chrome.tabs.sendMessage(tab.id, {bookmark: result})
				},
				error: function(error) {
					console.log('error', error);
				}
			});
		}
	})
};

function injectSaveBookmark(tabId, bookmark) {
  chrome.tabs.executeScript(tabId, { file: "js/jquery.min.js" }, function() {
    chrome.tabs.insertCSS(tabId, { file: "css/styles.css" });
    chrome.tabs.executeScript(tabId, { file: "src/inject/save_bookmark.js" }, function() {
			chrome.tabs.sendMessage(tabId, {bookmark: bookmark})
		});
  });
}

function injectLogin() {
  chrome.tabs.executeScript(null, { file: "/js/jquery.min.js" }, function() {
    chrome.tabs.insertCSS(null, { file: "/css/styles.css" });
    chrome.tabs.executeScript(null, { file: "/src/inject/login.js" });
  });
}

//example of using a message handler from the inject scripts
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	if (request['bk-it_token']) {
			sendResponse({done: true});
			chrome.storage.local.set({
				'bk-it_token': request['bk-it_token']
			}, function() {
        addBookmark(sender.tab, request['bk-it_token']);
      });
		} else if (request.update) {
			sendResponse({sending: true});
			updateBookmark(sender.tab, request.update);
		}
  });

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.storage.local.get('bk-it_token', function(token) {
      if (token && token['bk-it_token']) {
          addBookmark(tab, token['bk-it_token'])
      } else {
          injectLogin();
      }
  });
});
