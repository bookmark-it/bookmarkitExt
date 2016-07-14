var url = "http://bk-it.herokuapp.com/api/";

chrome.browserAction.onClicked.addListener(function (tab) { //Fired when User Clicks ICON
	console.log('tab.url', tab.url);
	$.ajax({
        url: url + "bookmarks",
        type: "post",
        dataType: "json",
        data:JSON.stringify({
        	"user": 1,
		    "title": "",
		    "categories": [],
		    "favorite": false,
		    "source": "",
		    "tosort": false,
		    "toread": false,
		    "url": tab.url
        }),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
        },
        error: function() {
            $('#res').html('An error occurred');
        }
	}); 	
});