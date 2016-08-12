var login_url = "//bk-it.herokuapp.com/auth/login/",
    template = '<div id="bkit">' +
      '<form class="form">' +
        'Username: <input type="text" name="username"><br>' +
        'Password: <input type="password" name="password"><br>' +
        '<input type="submit" value="Submit">' +
      '</form>' +
    '</div>';

function destroyPopup() {
  $('#bkit').remove();
}

$('body').append(template);

$('#bkit form').submit(function(e){
  e.preventDefault();
  var data = {
    username: $(this).find('[name=username]').val(),
    password: $(this).find('[name=password]').val(),
  }
  console.log('data bef', data );
  $.post(login_url, data, function( response ) {
    chrome.runtime.sendMessage({
      'bk-it_token': response.auth_token
    }, function(response) {
      if (response.done === true) {
        destroyPopup();
      }
    });
  });
})
