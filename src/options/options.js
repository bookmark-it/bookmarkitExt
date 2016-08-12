function logout() {
  chrome.storage.sync.remove('bk-it_token');
}

function disableLogout() {
  $('#logout').attr("disabled", true);
}

$('#logout').click(function(){
  logout();
  disableLogout();
})

chrome.storage.sync.get('bk-it_token', function(token) {
  if (!token['bk-it_token']) {
    disableLogout();
  }
});
