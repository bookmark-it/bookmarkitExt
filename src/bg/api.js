var api_url = "http://bk-it.herokuapp.com/api",
		search_url = "http://bk-it.herokuapp.com/bookmarks/search/",
    bookmarks_url = api_url + "/bookmarks",
    login_url = api_url + "/auth/login/";

function searchBookmark (url) {
	request({
		url: search_url,
		data: {
			"query": url
		}
	});
}

function addBookmark (data) {
	return request({
    url: bookmarks_url,
    type: "POST",
    data: JSON.stringify(data)
	});
};

function updateBookmark (bookmark) {
  request({
    url: bookmarks_url + '/' + bookmark.id,
    type: "put",
    data: JSON.stringify(bookmark)
  });
};

function deleteBookmark (bookmark) {
  request({
    url: bookmarks_url + '/' + bookmark.id,
    type: "delete"
  });
};
