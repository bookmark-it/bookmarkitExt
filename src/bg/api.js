var api_url = "http://bk-it.herokuapp.com/api",
    bookmarks_url = api_url + "/bookmarks",
    login_url = api_url + "/auth/login/";

function addBookmark (data) {
	return request({
    url: bookmarks_url,
    type: "POST",
    data: JSON.stringify(data)
	});
};

function updateBookmark (bookmark) {
  return request({
    url: bookmarks_url + '/' + bookmark.id,
    type: "PUT",
    data: JSON.stringify(bookmark)
  });
};

function deleteBookmark (bookmark) {
  return request({
    url: bookmarks_url + '/' + bookmark.id,
    type: "DELETE"
  });
};

function login (data) {
  return request({
    url: login_url,
    type: "POST",
    data: JSON.stringify(data),
		noToken: true
  });
};
