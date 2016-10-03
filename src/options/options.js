function logout() {
  store.remove('bk-it_token');
}

function disableLogout() {
  $('#logout').attr("disabled", true);
}

$('#logout').click(function(){
  logout();
  disableLogout();
})

chrome.storage.local.get('bk-it_token', function(token) {
  if (!token['bk-it_token']) {
    disableLogout();
  }
});
