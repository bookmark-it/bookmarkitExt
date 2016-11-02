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

if (!store.get('bk-it_token')) {
  disableLogout();
}
