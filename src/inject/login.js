function getTemplate(url) {
  return new Promise(function(resolve, reject) {
      $.ajax({
          type: "GET",
          url: chrome.extension.getURL(url),
          success: resolve
      });
  })
}

getTemplate('templates/login.html')
  .then(function(html) {
    var el = $(html);
    $('body').append(el);
    main();
  });

function main () {
  var login_url = "//bk-it.herokuapp.com/auth/login/";

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
}
