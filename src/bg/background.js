var api_url = "http://bk-it.herokuapp.com/api/";

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
          console.log('result', result);
        },
        error: function(error) {
          console.log('error', error);
        }
	});
};

//example of using a message handler from the inject scripts
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	if (request['bk-it_token']) {
			chrome.storage.sync.set({
				'bk-it_token': request['bk-it_token']
			}, function() {
        addBookmark(sender.tab, request['bk-it_token']);
      });
      sendResponse({done: true});
		}
  });

	chrome.browserAction.onClicked.addListener(function(tab) {
		chrome.storage.sync.get('bk-it_token', function(token) {
			if (token && token['bk-it_token']) {
				// save bookmark
				//on success
				chrome.tabs.executeScript(null, { file: "js/jquery/jquery.min.js" }, function() {
					chrome.tabs.insertCSS(null, { file: "src/inject/save_bookmark.css" });
				  chrome.tabs.executeScript(null, { file: "src/inject/save_bookmark.js" });
				});
			} else {
				chrome.tabs.executeScript(null, { file: "js/jquery/jquery.min.js" }, function() {
					chrome.tabs.insertCSS(null, { file: "src/inject/login.css" });
					chrome.tabs.executeScript(null, { file: "src/inject/login.js" });
				});
			}
		});
	});
